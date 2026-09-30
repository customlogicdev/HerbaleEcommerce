import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const subject = body.subject?.trim() ?? "Hello from the garden";
    const message = body.message?.trim() ?? "";
    if (name.length < 2 || !email.includes("@") || message.length < 8) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }
    await db.insert(contactMessages).values({ name, email, subject, message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
