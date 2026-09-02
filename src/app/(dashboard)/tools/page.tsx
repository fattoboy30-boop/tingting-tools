"use client";
import Link from "next/link";

const TOOLS = [
  { slug: "document-scanner", icon: "📄", title: "Document Scanner", desc: "Extract text, tables, and data from any file", color: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/20" },
  { slug: "ai-excel", icon: "📊", title: "AI to Excel", desc: "Turn data into clean, formula-ready spreadsheets", color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-500/20" },
  { slug: "report-generator", icon: "📝", title: "Report Generator", desc: "Write professional reports in seconds", color: "from-purple-500 to-purple-600", shadow: "shadow-purple-500/20" },
  { slug: "invoice-processor", icon: "💰", title: "Invoice Processor", desc: "Read invoices and extract every detail", color: "from-amber-500 to-amber-600", shadow: "shadow-amber-500/20" },
  { slug: "expense-tracker", icon: "🧾", title: "Expense Tracker", desc: "Categorize receipts and track spending", color: "from-orange-500 to-orange-600", shadow: "shadow-orange-500/20" },
  { slug: "data-cleaner", icon: "🧹", title: "Data Cleaner", desc: "Fix duplicates, names, and dates instantly", color: "from-rose-500 to-rose-600", shadow: "shadow-rose-500/20" },
  { slug: "email-generator", icon: "✉️", title: "Email / Letter", desc: "Write emails and letters that sound like you", color: "from-cyan-500 to-cyan-600", shadow: "shadow-cyan-500/20" },
  { slug: "meeting-minutes", icon: "📋", title: "Meeting Minutes", desc: "Turn notes into structured action items", color: "from-pink-500 to-pink-600", shadow: "shadow-pink-500/20" },
  { slug: "document-compare", icon: "🔍", title: "Document Compare", desc: "Find every difference between two files", color: "from-indigo-500 to-indigo-600", shadow: "shadow-indigo-500/20" },
  { slug: "ai-assistant", icon: "🤖", title: "AI Assistant", desc: "Tell me what to do — I'll figure it out", color: "from-violet-500 to-violet-600", shadow: "shadow-violet-500/20" },
  { slug: "handwriting-extractor", icon: "✍️", title: "Handwriting Extractor", desc: "Convert handwritten notes into digital text", color: "from-teal-500 to-teal-600", shadow: "shadow-teal-500/20" },
  { slug: "receipt-scanner", icon: "🧾", title: "Receipt Scanner", desc: "Scan receipts and extract all details", color: "from-lime-500 to-lime-600", shadow: "shadow-lime-500/20" },
  { slug: "bank-statement", icon: "🏦", title: "Bank Statement", desc: "Process statements into spending categories", color: "from-sky-500 to-sky-600", shadow: "shadow-sky-500/20" },
  { slug: "budget-calculator", icon: "🧮", title: "Budget Calculator", desc: "Create a budget from income and expenses", color: "from-fuchsia-500 to-fuchsia-600", shadow: "shadow-fuchsia-500/20" },
];

export default function ToolsPage() {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12 animate-fade-up">
        <h1 className="text-4xl font-bold mb-3">What do you need done?</h1>
        <p className="text-slate-400 text-lg">Pick a tool. Upload a file. Click process. Done.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TOOLS.map((t, i) => (
          <Link key={t.slug} href={`/tool/${t.slug}`}
            className="card-hover glass border border-slate-700/50 rounded-2xl p-6 group animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${t.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg ${t.shadow} group-hover:scale-110 transition-transform flex-shrink-0`}>
                {t.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-indigo-400 transition">{t.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t.desc}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-slate-500 group-hover:text-indigo-400 transition">
              <span>Open tool</span>
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
