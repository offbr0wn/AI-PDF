// app/api/webhooks/route.ts
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { PrismaClient } from "@prisma/client";

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
const prisma = new PrismaClient();

const app = new Hono().basePath("/api/webhooks");

app.post("/", async (c) => {
  try {
    const rawBody = await c.req.json();

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET!);

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id")!;
    const svix_timestamp = headerPayload.get("svix-timestamp")!;
    const svix_signature = headerPayload.get("svix-signature")!;

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return c.json({ error: "Missing svix headers" }, 401);
    }

    const secret_key = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
    if (!secret_key) {
      return c.json({ error: "Missing secret key" }, 401);
    }

    const svixHeaders = {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    } as const;

    const event = wh.verify(
      JSON.stringify(rawBody),
      svixHeaders
    ) as WebhookEvent;

    if (!event) {
      return c.json({ error: "Invalid webhook signature" }, 401);
    }

    switch (event.type) {
      case "user.created":
        const { id, email_addresses, first_name, last_name } = event?.data;
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ clerkId: id }, { email: email_addresses[0]?.email_address }],
          },
        });
        if (existingUser) {
          // If user exists, update their record
          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              clerkId: id, // In case they logged in with a different method
              firstName: first_name || existingUser.firstName,
              lastName: last_name || existingUser.lastName,
              updatedAt: new Date(),
            },
          });
          console.log(`Updated existing user: ${id}`);
          break;
        }
        await prisma.user.create({
          data: {
            clerkId: id,
            email: email_addresses[0]?.email_address || "",
            firstName: first_name,
            lastName: last_name,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        console.log(`Created new user: ${id}`);
        break;

      case "user.updated":
        const { updated_at } = event.data;
        await prisma.user.update({
          where: { clerkId: event.data.id },
          data: { updatedAt: new Date(updated_at) },
        });
        console.log(`User ${event.data.id} updated successfully`);
        break;

      case "user.deleted":
        const user = await prisma.user.findUnique({
          where: { clerkId: event.data.id },
        });
        if (user) {
          await prisma.user.delete({
            where: { clerkId: event.data.id },
          });
          console.log(`User ${event.data.id} deleted successfully`);
        } else {
          console.log(`User ${event.data.id} not found`);
        }
        console.log(`User ${event.data.id} deleted successfully`);
        break;
    }

    return c.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export const POST = handle(app);
