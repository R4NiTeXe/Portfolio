import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Message } from "@/lib/models/Message";
import { isAdminRequest } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const messages = await Message.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  return NextResponse.json(
    messages.map((message) => ({
      id: message._id.toString(),
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      status: message.status,
      createdAt: message.createdAt,
    })),
  );
}