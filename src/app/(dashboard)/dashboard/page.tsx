"use client";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const QUICK_TOOLS = [
  { href: "/tool/document-scanner", icon: "📄", title: "Scan Document", desc: "Extract text from any file", color: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/20" },
  { href: "/tool/ai-excel", icon: "📊", title: "Make Excel", desc: "Turn data into spreadsheets", color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-500/20" },
  { href: "/tool/report-generator", icon: "📝", title: "Write Report", desc: "Professional reports in seconds", color: "from-purple-500 to-purple-600", shadow: "shadow-purple-500/20" },
  { href: "/tool/data-cleaner", icon: "🧹", title: "Clean Data", desc: "Fix duplicates and errors", color: "from-rose-500 to-rose-600", shadow: "shadow-rose-500/20" },
  { href: "/tool/email-generator", icon: "✉️", title: "Write Email", desc: "Professional emails instantly", color: "from-cyan-500 to-cyan-600", shadow: "shadow-cyan-500/20" },
  { href: "/tool/invoice-processor", icon: "💰", title: "Invoices", desc: "Process invoices automatically", color: "from-amber-500 to-amber-600", shadow: "shadow-amber-500/20" },
  { href: "/tool/expense-tracker", icon: "🧾", title: "Expenses", desc: "Track and categorize spending", color: "from-orange-500 to-orange-600", shadow: "shadow-orange-500/20" },
  { href: "/tool/meeting-minutes", icon: "📋", title: "Minutes", desc: "Turn notes into action items", color: "from-pink-500 to-pink-600", shadow: "shadow-pink-500/20" },
  { href: "/tool/document-compare", icon: "🔍", title: "Compare", desc: "Find differences between files", color: "from-indigo-500 to-indigo-600", shadow: "shadow-indigo-500/20" },
  { href: "/tool/ai-assistant", icon: "🤖", title: "AI Assistant", desc: "Tell me what to do", color: "from-violet-500 to-violet-600", shadow: "shadow-violet-500/20" },
  { href: "/tool/handwriting-extractor", icon: "✍️", title: "Handwriting", desc: "Extract text from handwritten notes", color: "from-teal-500 to-teal-600", shadow: "shadow-teal-500/20" },
  { href: "/tool/receipt-scanner", icon: "🧾", title: "Receipts", desc: "Scan and extract receipt data", color: "from-lime-500 to-lime-600", shadow: "shadow-lime-500/20" },
  { href: "/tool/bank-statement", icon: "🏦", title: "Bank Statement", desc: "Process bank statements", color: "from-sky-500 to-sky-600", shadow: "shadow-sky-500/20" },
  { href: "/tool/budget-calculator", icon: "🧮", title: "Budget", desc: "Calculate your budget", color: "from-fuchsia-500 to-fuchsia-600", shadow: "shadow-fuchsia-500/20" },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/jobs").then(r => r.json()).then(d => { if (Array.isArray(d)) setJobs(d); });
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12 animate-fade-up">
        <h1 className="text-4xl font-bold mb-3">
          Hi, {session?.user?.name || session?.user?.email || "there"} <span className="inline-block animate-pulse">👋</span>
        </h1>
        <p className="text-slate-400 text-lg">What do you need done today?</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {QUICK_TOOLS.map((t, i) => (
          <Link key={t.href} href={t.href}
            className={`card-hover glass border border-slate-700/50 rounded-2xl p-5 text-center group animate-fade-up`}
            style={{ animationDelay: `${i * 0.05}s` }}>
            <div className={`w-14 h-14 bg-gradient-to-br ${t.color} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg ${t.shadow} group-hover:scale-110 transition-transform`}>
              {t.icon}
            </div>
            <h3 className="font-bold text-sm mb-0.5 group-hover:text-white transition">{t.title}</h3>
            <p className="text-slate-500 text-xs">{t.desc}</p>
          </Link>
        ))}
      </div>

      {jobs.length > 0 && (
        <div className="animate-fade-up delay-300">
          <h2 className="text-lg font-bold mb-4 text-slate-300">Recent Activity</h2>
          <div className="space-y-2">
            {jobs.slice(0, 5).map((j, i) => (
              <div key={j.id} className="glass border border-slate-700/30 rounded-xl px-4 py-3 text-sm flex justify-between items-center animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}>
                <span className="text-slate-300">{j.toolName}</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">{j.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
