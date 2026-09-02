"use client";
import { use, useState, useRef, useCallback } from "react";
import Link from "next/link";

const TOOLS: Record<string, { icon: string; title: string; desc: string; accept: string; hint: string; placeholder: string; color: string }> = {
  "document-scanner": { icon: "📄", title: "Document Scanner", desc: "Extract text, tables, and data from any file", accept: ".csv,.txt,.pdf,.png,.jpg,.jpeg", hint: "CSV, TXT, PDF, Images", placeholder: "", color: "from-blue-500 to-blue-600" },
  "ai-excel": { icon: "📊", title: "AI to Excel", desc: "Turn your data into a clean spreadsheet", accept: ".csv,.txt,.pdf,.png,.jpg,.jpeg", hint: "CSV, TXT, Images, PDF", placeholder: "", color: "from-emerald-500 to-emerald-600" },
  "report-generator": { icon: "📝", title: "Report Generator", desc: "Create a professional report from your data", accept: ".csv,.txt,.pdf,.docx,.xlsx", hint: "Any data file", placeholder: "What kind of report? (e.g. monthly summary, executive brief)", color: "from-purple-500 to-purple-600" },
  "invoice-processor": { icon: "💰", title: "Invoice Processor", desc: "Read invoices and extract all the details", accept: ".csv,.txt,.pdf,.png,.jpg,.jpeg", hint: "Invoice files", placeholder: "", color: "from-amber-500 to-amber-600" },
  "expense-tracker": { icon: "🧾", title: "Expense Tracker", desc: "Categorize expenses and create a report", accept: ".csv,.txt,.pdf,.png,.jpg,.jpeg", hint: "Receipts, expense files", placeholder: "", color: "from-orange-500 to-orange-600" },
  "data-cleaner": { icon: "🧹", title: "Data Cleaner", desc: "Fix messy data — duplicates, names, dates", accept: ".csv,.txt", hint: "CSV or TXT files", placeholder: "", color: "from-rose-500 to-rose-600" },
  "email-generator": { icon: "✉️", title: "Email / Letter", desc: "Write a professional email or letter", accept: "", hint: "", placeholder: "What should it say? Who is it to?", color: "from-cyan-500 to-cyan-600" },
  "meeting-minutes": { icon: "📋", title: "Meeting Minutes", desc: "Turn notes into structured meeting minutes", accept: ".csv,.txt,.docx,.pdf", hint: "Meeting notes, transcripts", placeholder: "", color: "from-pink-500 to-pink-600" },
  "document-compare": { icon: "🔍", title: "Document Compare", desc: "Find the differences between two files", accept: ".csv,.txt,.pdf,.docx", hint: "Upload 2 files", placeholder: "", color: "from-indigo-500 to-indigo-600" },
  "ai-assistant": { icon: "🤖", title: "AI Assistant", desc: "Tell me what you need — I'll figure it out", accept: ".csv,.txt,.pdf,.docx,.xlsx,.png,.jpg,.jpeg", hint: "Any file, or just type", placeholder: "What do you want done?", color: "from-violet-500 to-violet-600" },
  "handwriting-extractor": { icon: "✍️", title: "Handwriting Extractor", desc: "Convert handwritten notes into digital text", accept: ".png,.jpg,.jpeg,.bmp,.webp", hint: "Images of handwriting", placeholder: "What should I extract? (e.g. all text, specific fields)", color: "from-teal-500 to-teal-600" },
  "receipt-scanner": { icon: "🧾", title: "Receipt Scanner", desc: "Scan receipts and extract merchant, items, total", accept: ".png,.jpg,.jpeg,.pdf", hint: "Receipt images or PDFs", placeholder: "", color: "from-lime-500 to-lime-600" },
  "bank-statement": { icon: "🏦", title: "Bank Statement", desc: "Process bank statements into spending categories", accept: ".csv,.txt,.pdf,.png,.jpg,.jpeg", hint: "Bank statement files", placeholder: "", color: "from-sky-500 to-sky-600" },
  "budget-calculator": { icon: "🧮", title: "Budget Calculator", desc: "Create a budget plan from your income and expenses", accept: ".csv,.txt", hint: "Income/expense data (optional)", placeholder: "What's your monthly income? Any fixed expenses?", color: "from-fuchsia-500 to-fuchsia-600" },
};

async function readText(file: File): Promise<string> {
  return new Promise((ok, fail) => {
    const r = new FileReader();
    r.onload = () => ok(r.result as string);
    r.onerror = () => fail(new Error("Cannot read file"));
    r.readAsText(file);
  });
}

function dl(content: string, name: string, type: string) {
  const b = new Blob([content], { type });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(b);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

function toExcel(csv: string): string {
  const lines = csv.trim().split("\n");
  let h = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"></head><body><table border="1">';
  lines.forEach((l, i) => {
    h += "<tr>";
    l.split(",").forEach(c => { h += `<${i===0?"th":"td"}>${c.replace(/"/g,"").trim()}</${i===0?"th":"td"}>`; });
    h += "</tr>";
  });
  return h + "</table></body></html>";
}

function toWord(text: string): string {
  const html = text
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/^([A-Z][A-Z\s]+)$/gm, '<h2 style="font-size:14pt;margin-top:16pt;margin-bottom:8pt;">$1</h2>');
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="UTF-8"></head><body style="font-family:Calibri;font-size:11pt;line-height:1.5">${html}</body></html>`;
}

export default function ToolPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const tool = TOOLS[name];
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  if (!tool) return (
    <div className="text-center py-20 animate-fade-in">
      <span className="text-6xl block mb-4">❓</span>
      <h1 className="text-2xl font-bold mb-3">Tool not found</h1>
      <Link href="/tools" className="text-indigo-400 hover:text-indigo-300 transition">← Back to Tools</Link>
    </div>
  );

  const handleProcess = useCallback(async () => {
    setLoading(true);
    setResult("");
    setDone(false);

    const fileContents: string[] = [];
    for (const f of files) {
      try { fileContents.push(`FILE: ${f.name}\n${await readText(f)}`); } catch { fileContents.push(`FILE: ${f.name}\n[unreadable]`); }
    }

    const textarea = document.getElementById("user-input") as HTMLTextAreaElement;
    const extra = textarea?.value?.trim() || "";
    let msg = "";
    if (files.length > 0 && !extra) msg = `Process ${files.map(f=>f.name).join(", ")}`;
    else if (files.length > 0 && extra) msg = extra;
    else msg = extra || `Help me with ${tool.title}`;

    try {
      const r = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: msg, tool: name, fileContents }) });
      const d = await r.json();
      setResult(d.reply);
    } catch (e: any) { setResult("Error: " + e.message); }
    setLoading(false);
    setDone(true);
  }, [files, name, tool.title]);

  function download(fmt: string) {
    const ts = new Date().toISOString().slice(0, 10);
    const n = name.replace(/-/g, "_");
    if (fmt === "txt") dl(result, `${n}_${ts}.txt`, "text/plain");
    else if (fmt === "csv") dl(result.replace(/\|/g, ","), `${n}_${ts}.csv`, "text/csv");
    else if (fmt === "excel") dl(toExcel(result.replace(/\|/g, ",")), `${n}_${ts}.xls`, "application/vnd.ms-excel");
    else if (fmt === "word") dl(toWord(result), `${n}_${ts}.doc`, "application/msword");
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Link href="/tools" className="text-slate-500 hover:text-white text-sm mb-6 inline-flex items-center gap-1 transition group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Tools
      </Link>

      <div className="text-center mb-10 animate-fade-up">
        <div className={`w-20 h-20 bg-gradient-to-br ${tool.color} rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-xl animate-pulse-glow`}>
          {tool.icon}
        </div>
        <h1 className="text-3xl font-bold mb-2">{tool.title}</h1>
        <p className="text-slate-400">{tool.desc}</p>
      </div>

      {/* Upload Zone */}
      {tool.accept && (
        <div className="mb-6 animate-fade-up delay-100">
          <div className="step-label rounded-xl px-4 py-2 inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center text-xs font-bold">1</span>
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Upload file</span>
          </div>
          <div
            className={`upload-zone border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragOver ? "drag-over border-indigo-500 bg-indigo-500/5" : "border-slate-700 hover:border-indigo-500/50"}`}
            onClick={() => ref.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]); }}>
            <input ref={ref} type="file" multiple accept={tool.accept} className="hidden" onChange={e => { if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)]); }} />
            <span className="text-4xl block mb-3">📤</span>
            <p className="text-slate-300 font-medium mb-1">Drop file here or click to browse</p>
            <p className="text-slate-500 text-sm">{tool.hint}</p>
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mb-6 space-y-2 animate-fade-in">
          {files.map((f, i) => (
            <div key={i} className="glass border border-slate-700/50 rounded-xl px-4 py-3 text-sm flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-lg">📄</span>
                <div>
                  <p className="font-medium text-slate-200">{f.name}</p>
                  <p className="text-xs text-slate-500">{(f.size/1024).toFixed(0)} KB</p>
                </div>
              </div>
              <button onClick={() => setFiles(p => p.filter((_,j)=>j!==i))}
                className="w-8 h-8 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition flex items-center justify-center">
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Extra Input */}
      {tool.placeholder && (
        <div className="mb-6 animate-fade-up delay-200">
          <div className="step-label rounded-xl px-4 py-2 inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center text-xs font-bold">{files.length > 0 ? 2 : 1}</span>
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Extra details (optional)</span>
          </div>
          <textarea id="user-input" rows={2} placeholder={tool.placeholder}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm resize-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition placeholder:text-slate-500" />
        </div>
      )}

      {/* Process Button */}
      <div className="mb-8 animate-fade-up delay-300">
        <div className="step-label rounded-xl px-4 py-2 inline-flex items-center gap-2 mb-3">
          <span className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center text-xs font-bold">{tool.placeholder ? 3 : 2}</span>
          <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Process</span>
        </div>
        <button onClick={handleProcess} disabled={loading}
          className="w-full py-4 btn-primary rounded-2xl font-bold text-base text-white disabled:opacity-50 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3">
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>⚡ Process Now</>
          )}
        </button>
      </div>

      {/* Result */}
      {done && result && (
        <div className="result-box rounded-2xl p-6 animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-sm">✓</span>
              <h3 className="text-emerald-400 font-bold">Done</h3>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/30 rounded-xl p-5 text-sm leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto mb-5 font-mono">
            {result}
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={() => download("txt")} className="btn-success px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2">
              <span>📄</span> TXT
            </button>
            <button onClick={() => download("csv")} className="btn-success px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2">
              <span>📊</span> CSV
            </button>
            <button onClick={() => download("excel")} className="btn-success px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2">
              <span>📗</span> Excel
            </button>
            <button onClick={() => download("word")} className="btn-success px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2">
              <span>📘</span> Word
            </button>
            <button onClick={() => { navigator.clipboard.writeText(result); }}
              className="px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-slate-300 hover:border-indigo-500 hover:text-white transition flex items-center gap-2">
              <span>📋</span> Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
