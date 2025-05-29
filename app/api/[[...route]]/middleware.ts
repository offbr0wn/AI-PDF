// middleware.ts
import type { Context, Next } from "hono";
import { checkDatabaseConnection } from "@/lib/db";

export async function dbMiddleware(c: Context, next: Next) {
  try {
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      console.error("⚠️ Database connection failed");
      return c.json(
        {
          status: "error",
          message: "Database connection failed",
          timestamp: new Date().toISOString(),
        },
        500
      );
    }
    await next();
  } catch (err) {
    console.error("🔥 DB middleware caught:", err);
    return c.json(
      {
        status: "error",
        message: "Database connection failed",
        error: err instanceof Error ? err.message : String(err),
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
}
