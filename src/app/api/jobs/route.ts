import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const jobs: Record<string, any[]> = {};

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = session.user.id;
  return NextResponse.json(jobs[userId] || []);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = session.user.id;
  const body = await req.json();
  const job = {
    id: Date.now().toString(),
    toolName: body.tool_name,
    status: "processing",
    inputFiles: body.files || [],
    createdAt: new Date().toISOString(),
  };
  if (!jobs[userId]) jobs[userId] = [];
  jobs[userId].unshift(job);
  return NextResponse.json(job);
}
