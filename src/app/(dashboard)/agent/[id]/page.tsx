"use client";
import { use, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { AGENTS } from "@/lib/agents";

const AGENT_COLORS: Record<string, string> = {
  "document-agent": "from-blue-500 to-blue-600",
  "excel-agent": "from-emerald-500 to-emerald-600",
  "report-agent": "from-purple-500 to-purple-600",
  "finance-agent": "from-amber-500 to-amber-600",
  "email-agent": "from-cyan-500 to-cyan-600",
  "data-agent": "from-rose-500 to-rose-600",
  "meeting-agent": "from-pink-500 to-pink-600",
  "compare-agent": "from-indigo-500 to-indigo-600",
  "analysis-agent": "from-orange-500 to-orange-600",
  "automation-agent": "from-violet-500 to-violet-600",
  "handwriting-agent": "from-teal-500 to-teal-600",
  "receipt-agent": "from-lime-500 to-lime-600",
  "bank-agent": "from-sky-500 to-sky-600",
  "budget-agent": "from-fuchsia-500 to-fuchsia-600",
};

async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function generateExcelFromCSV(csvContent: string): string {
  const lines = csvContent.trim().split("\n");
  let html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"></head><body><table border="1">';
  lines.forEach((line, i) => {
    html += "<tr>";
    const cells = line.split(",");
    cells.forEach((cell) => {
      const tag = i === 0 ? "th" : "td";
      html += `<${tag}>${cell.replace(/"/g, "").trim()}</${tag}>`;
    });
    html += "</tr>";
  });
  html += "</table></body></html>";
  return html;
}

function generateWordDoc(text: string): string {
  const html = text
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/^([A-Z][A-Z\s]+)$/gm, '<h2 style="font-size:14pt;margin-top:16pt;margin-bottom:8pt;">$1</h2>');
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="UTF-8"></head><body style="font-family:Calibri;font-size:11pt;line-height:1.5">${html}</body></html>`;
}

export default function AgentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const agent = AGENTS.find(a => a.id === id);
  const [files, setFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "skills">("chat");
  const fileRef = useRef<HTMLInputElement>(null);

  if (!agent) return (
    <div className="text-center py-20 animate-fade-in">
      <span className="text-6xl block mb-4">❓</span>
      <h1 className="text-2xl font-bold mb-3">Agent not found</h1>
      <Link href="/agents" className="text-indigo-400 hover:text-indigo-300 transition">← Back to Agents</Link>
    </div>
  );

  function handleFiles(newFiles: FileList | null) {
    if (newFiles) setFiles((prev) => [...prev, ...Array.from(newFiles)]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  const handleSend = useCallback(async (overrideMessage?: string) => {
    const msg = overrideMessage || input.trim();
    if (!msg && files.length === 0) return;

    const fileContents: string[] = [];
    for (const file of files) {
      try {
        const text = await readFileAsText(file);
        fileContents.push(`FILE: ${file.name}\n${text}`);
      } catch {
        fileContents.push(`FILE: ${file.name}\n[Could not read file]`);
      }
    }

    let fullMsg = msg;
    if (files.length > 0) {
      fullMsg = (msg ? msg : `Please process these files: ${files.map(f => f.name).join(", ")}`);
    }

    setInput("");
    setFiles([]);
    setMessages(prev => [...prev, { role: "user", content: fullMsg + (fileContents.length > 0 ? ` (${fileContents.length} file(s))` : "") }, { role: "assistant", content: "Working on it..." }]);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: fullMsg, tool: "ai-assistant", agentId: agent.id, fileContents }),
      });
      const data = await res.json();
      setMessages(prev => { const m = [...prev]; m[m.length - 1] = { role: "assistant", content: data.reply }; return m; });
    } catch (err: any) {
      setMessages(prev => { const m = [...prev]; m[m.length - 1] = { role: "assistant", content: "Error: " + err.message }; return m; });
    }
  }, [input, files, agent.id]);

  function downloadAs(format: string) {
    const lastMsg = messages[messages.length - 1]?.content || "";
    const timestamp = new Date().toISOString().slice(0, 10);
    const safeName = agent.name.toLowerCase().replace(/\s+/g, "-");

    if (format === "txt") downloadFile(lastMsg, `${safeName}-${timestamp}.txt`, "text/plain");
    else if (format === "csv") downloadFile(lastMsg.replace(/\|/g, ","), `${safeName}-${timestamp}.csv`, "text/csv");
    else if (format === "excel") downloadFile(generateExcelFromCSV(lastMsg.replace(/\|/g, ",")), `${safeName}-${timestamp}.xls`, "application/vnd.ms-excel");
    else if (format === "word") downloadFile(generateWordDoc(lastMsg), `${safeName}-${timestamp}.doc`, "application/msword");
  }

  const color = AGENT_COLORS[agent.id] || "from-slate-500 to-slate-600";

  return (
    <div className="max-w-4xl animate-fade-in">
      <Link href="/agents" className="text-slate-500 hover:text-white text-sm mb-6 inline-flex items-center gap-1 transition group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Agents
      </Link>

      <div className="flex gap-5 items-start mb-8 animate-fade-up">
        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-3xl shadow-xl flex-shrink-0`}>
          {agent.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">{agent.title}</h1>
          <p className="text-slate-400 text-sm mb-3">{agent.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {agent.skills.map((s, i) => (
              <span key={i} className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 text-xs rounded-lg border border-indigo-500/10">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-slate-900/50 border border-slate-700/30 rounded-xl p-1 w-fit animate-fade-up delay-100">
        <button onClick={() => setActiveTab("chat")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "chat" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 hover:text-white"}`}>
          Chat
        </button>
        <button onClick={() => setActiveTab("skills")}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "skills" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 hover:text-white"}`}>
          Skills & Examples
        </button>
      </div>

      {activeTab === "skills" ? (
        <div className="glass border border-slate-700/50 rounded-2xl p-6 animate-fade-up">
          <h2 className="text-lg font-bold mb-5">What I Can Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {agent.skills.map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/30 rounded-xl px-4 py-3">
                <span className="w-7 h-7 bg-emerald-500/15 rounded-lg flex items-center justify-center text-emerald-400 text-xs">✓</span>
                <span className="text-sm text-slate-200">{s}</span>
              </div>
            ))}
          </div>
          <h3 className="text-md font-bold mb-4">Try Asking</h3>
          <div className="space-y-2">
            {agent.examples.map((ex, i) => (
              <button key={i} onClick={() => { setActiveTab("chat"); setInput(ex); }}
                className="w-full text-left bg-slate-800/50 hover:bg-slate-800 border border-slate-700/30 hover:border-indigo-500/50 rounded-xl px-4 py-3 text-sm transition-all group">
                <span className="text-slate-500 group-hover:text-indigo-400 transition">💬</span>{" "}
                <span className="text-slate-300 group-hover:text-white transition">{ex}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass border border-slate-700/50 rounded-2xl overflow-hidden animate-fade-up">
          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-5 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-xl`}>
                  {agent.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">Hi, I&apos;m {agent.title}</h3>
                <p className="text-slate-400 text-sm mb-5">Upload a file or ask me something.</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {agent.examples.map((ex, i) => (
                    <button key={i} onClick={() => handleSend(ex)}
                      className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700/30 hover:border-indigo-500/50 rounded-xl px-4 py-2.5 text-xs text-slate-300 hover:text-white transition-all">
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-sm shadow-lg shadow-indigo-500/20"
                    : "bg-slate-800/80 text-slate-200 rounded-tl-sm border border-slate-700/30"
                }`}
                  dangerouslySetInnerHTML={{ __html: m.content.replace(/\n/g, "<br>") }} />
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-700/30 space-y-3">
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {files.map((f, i) => (
                  <span key={i} className="bg-slate-800/50 border border-slate-700/30 rounded-xl px-3 py-1.5 text-xs flex items-center gap-2">
                    📄 {f.name} ({(f.size / 1024).toFixed(1)} KB)
                    <button onClick={() => removeFile(i)} className="text-red-400 hover:text-red-300">×</button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={() => fileRef.current?.click()}
                className="px-3 py-2.5 bg-slate-800/50 border border-slate-700/30 rounded-xl text-sm hover:border-indigo-500 hover:bg-slate-800 transition-all">
                📎
              </button>
              <input ref={fileRef} type="file" multiple accept=".csv,.txt,.pdf,.docx,.xlsx,.png,.jpg,.jpeg" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
              <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={1}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder={`Ask ${agent.title} to do something...`}
                className="flex-1 px-4 py-2.5 bg-slate-800/50 border border-slate-700/30 rounded-xl text-sm resize-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition placeholder:text-slate-500" />
              <button onClick={() => handleSend()} disabled={processing}
                className="px-5 py-2.5 btn-primary rounded-xl text-sm font-semibold text-white disabled:opacity-50 shadow-lg shadow-indigo-500/20">
                {processing ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Bar */}
      {messages.length > 0 && activeTab === "chat" && (
        <div className="mt-4 result-box rounded-2xl p-4 animate-fade-up">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => downloadAs("txt")} className="btn-success px-3 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5">
              <span>📄</span> TXT
            </button>
            <button onClick={() => downloadAs("csv")} className="btn-success px-3 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5">
              <span>📊</span> CSV
            </button>
            <button onClick={() => downloadAs("excel")} className="btn-success px-3 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5">
              <span>📗</span> Excel
            </button>
            <button onClick={() => downloadAs("word")} className="btn-success px-3 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5">
              <span>📘</span> Word
            </button>
            <button onClick={() => navigator.clipboard.writeText(messages[messages.length - 1].content)}
              className="px-3 py-2 bg-slate-800/50 border border-slate-700/30 rounded-xl text-xs text-slate-300 hover:border-indigo-500 hover:text-white transition flex items-center gap-1.5">
              <span>📋</span> Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
