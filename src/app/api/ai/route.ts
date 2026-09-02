import { NextRequest, NextResponse } from "next/server";
import { AGENTS } from "@/lib/agents";

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY!;
const PRIMARY_MODEL = "minimax/minimax-m3:free";
const FALLBACK_MODEL = "z-ai/glm-5.2:free";

const AGENT_MAP: Record<string, string> = {
  "document-scanner": "document-agent",
  "ai-excel": "excel-agent",
  "report-generator": "report-agent",
  "invoice-processor": "finance-agent",
  "expense-tracker": "finance-agent",
  "data-cleaner": "data-agent",
  "email-generator": "email-agent",
  "meeting-minutes": "meeting-agent",
  "document-compare": "compare-agent",
  "ai-assistant": "automation-agent",
  "handwriting-extractor": "handwriting-agent",
  "receipt-scanner": "receipt-agent",
  "bank-statement": "bank-agent",
  "budget-calculator": "budget-agent",
};

function getSystemPrompt(tool: string): string {
  const agentId = AGENT_MAP[tool];
  if (agentId) {
    const agent = AGENTS.find(a => a.id === agentId);
    if (agent) return agent.systemPrompt;
  }

  return "You are a helpful AI assistant. Read any data given to you and do what the user asks. Write like a normal person. Return results as CSV if there's tabular data. Keep it short and useful.";
}

async function callOpenRouter(messages: { role: string; content: string }[], model: string) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_KEY}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "TingTing Tools",
    },
    body: JSON.stringify({ model, messages, max_tokens: 4096, temperature: 0.7 }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
  return data;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message, tool, fileContents } = body;
  if (!message) return NextResponse.json({ error: "Message required" }, { status: 400 });

  const sysMsg = getSystemPrompt(tool);

  let userMessage = message;
  if (fileContents && fileContents.length > 0) {
    userMessage = message + "\n\n--- FILE DATA ---\n" + fileContents.join("\n\n--- NEXT FILE ---\n") + "\n--- END FILE DATA ---";
  }

  const messages = [
    { role: "system", content: sysMsg },
    { role: "user", content: userMessage },
  ];

  try {
    const result = await callOpenRouter(messages, PRIMARY_MODEL);
    return NextResponse.json({ reply: result.choices?.[0]?.message?.content || "No response.", model: PRIMARY_MODEL });
  } catch {
    try {
      const result = await callOpenRouter(messages, FALLBACK_MODEL);
      return NextResponse.json({ reply: result.choices?.[0]?.message?.content || "No response.", model: FALLBACK_MODEL });
    } catch (err: any) {
      return NextResponse.json({ reply: `AI temporarily unavailable. Please retry. (${err.message})`, model: "none" });
    }
  }
}
