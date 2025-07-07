import { Hono } from "hono";
import { handle } from "hono/vercel";
import { dbMiddleware } from "./middleware";
import OpenAI from "openai";
import { inngest } from "@/lib/inngest";
import { serve } from "inngest/hono";
import { pdfParserFunction } from "@/inngest/chatAgent";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "@/lib/db";

const app = new Hono().basePath("/api");
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Connect to the database
app.use("*", dbMiddleware);

// Connect to Inngest
app.on(
  ["GET", "PUT", "POST"],
  "/inngest",
  serve({
    client: inngest,

    functions: [pdfParserFunction],
  })
);

// Routes

app.get("/", async (c) => {
  return c.json({ message: "Hello, world!" });
});

app.get("AI", async (c) => {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPEN_ROUTER_API_KEY,
  });
  const response = await openai.chat.completions.create({
    model: "deepseek/deepseek-chat-v3-0324:free",
    messages: [
      {
        role: "system",
        content:
          "You are a weather app keep it 20 words or less and present it in json format.",
      },
      {
        role: "user",
        content: " whats the weather like today in east london ,east ham",
      },
    ],
  });
  //   console.log(response.choices[0].message.content);
  return c.json({ message: response.choices[0].message.content });
});

app.post("/process-pdf", async (c) => {
  try {
   
    const formData = await c.req.formData();

    //   const { pdfUrl } = await c.req.json();
    const userId = formData.get("userId") as string;
    const fileURL = formData.get("fileURL") as string;
    const fileName = formData.get("fileName") as string;
    // const fileSizeInMB = formData.get("fileSizeInMB") as string;
    if (!fileURL) {
      return c.json({ error: "PDF URL is required" }, 400);
    }

    if (!userId) {
      return c.json({ error: "User ID is required" }, 400);
    }
    console.log("-----------------------Document created-----------------------");

    const document = await prisma.document.create({
      data: {
        user: {
          connect: { clerkId: userId },
        },
        documentType: "pdf",
        fileUrl: fileURL,
        fileName: fileName.trim(),
      },
    });
    console.log("Document created",document);

    // Trigger Inngest event
    const event = await inngest.send({
      name: "app/pdf",
      data: {
        fileURL,
        userId,
        fileName: fileName.trim(),
        documentId: document.id,
      },
    });

    return c.json({
      success: true,
      message: "PDF processing started",
      eventId: event.ids[0],
    });
  } catch (error) {
    console.error("PDF processing error:", error);
    return c.json(
      {
        success: false,
        error: "Failed to process PDF",
      },
      500
    );
  }
});

app.post("/upload-pdf", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file) {
      return c.json({ success: false, error: "No file provided" }, 400);
    }

    // Convert file to buffer
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);
    const fileSizeInBytes = buffer.byteLength;
    const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);

    // Generate a unique file name
    const paidUserBucket = `Paid User Bucket/${userId}/${Date.now()}-${
      file.name
    }`;
    const freeUserBucket = `Free User Bucker/${Date.now()}-${file.name}`;
    const fileName = userId ? paidUserBucket : freeUserBucket;

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    await s3Client.send(command);

    // Generate a pre-signed URL that expires in 1 hour
    const presignedUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME || "Free User Bucker",
        Key: fileName,
      }),
      { expiresIn: 50600 } // 1 hour in seconds
    );

    return c.json({
      success: true,
      presignedUrl,
      fileSizeInMB,
      fileName,
    });
  } catch (error) {
    console.error("PDF upload error:", error);
    return c.json(
      {
        success: false,
        error: "Failed to upload PDF",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

app.get("/user/document/:userId", async (c) => {
  const userId = c.req.param("userId");
  const data = await prisma.user.findUnique({
    where: {
      clerkId: userId ?? "",
    },
    include: {
      documents: true,
    },
  });
  return c.json(data);
});

app.get("/user/get-document/:documentId", async (c) => {
  const documentId = c.req.param("documentId");
  console.log(documentId);
  if (!documentId) {
    return c.json({ error: "Document ID is required" }, 400);
  }
  const data = await prisma.document.findUnique({
    where: {
      id: documentId,
    },
  });

  return c.json(data);
});

app.get("/user/subscription-type/:userId", async (c) => {
  const userId = c.req.param("userId");
  const data = await prisma.user.findUnique({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      subscriptionType: true,
    },
  });

  return c.json(data?.subscriptionType);
});

app.delete("/user/document/:userId", async (c) => {
  const userId = c.req.param("userId");
  const { fileId } = await c.req.json();

  if (!userId) {
    return c.json({ success: false, error: "User ID is required" }, 400);
  }
  const data = await prisma.user.findUnique({
    where: {
      clerkId: userId ?? "",
    },
  });

  if (!data) {
    return c.json({ success: false, message: "User not found" }, 404);
  }

  try {
    await prisma.document.delete({
      where: {
        id: fileId ?? "",
      },
    });

    return c.json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    return c.json(
      { success: false, message: "Failed to delete document" + error },
      500
    );
  }
});
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
