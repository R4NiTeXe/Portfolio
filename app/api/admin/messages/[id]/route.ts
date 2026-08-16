import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { Message } from "@/lib/models/Message";
import { isAdminRequest } from "@/lib/admin-auth";

type Params = Promise<{ id: string }>;

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  if (request.headers.get("x-admin-csrf") !== "1") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await connectToDatabase();

  const deleted = await Message.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}