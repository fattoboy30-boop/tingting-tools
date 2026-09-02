"use client";
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

const AGENT_SHADOWS: Record<string, string> = {
  "document-agent": "shadow-blue-500/20",
  "excel-agent": "shadow-emerald-500/20",
  "report-agent": "shadow-purple-500/20",
  "finance-agent": "shadow-amber-500/20",
  "email-agent": "shadow-cyan-500/20",
  "data-agent": "shadow-rose-500/20",
  "meeting-agent": "shadow-pink-500/20",
  "compare-agent": "shadow-indigo-500/20",
  "analysis-agent": "shadow-orange-500/20",
  "automation-agent": "shadow-violet-500/20",
  "handwriting-agent": "shadow-teal-500/20",
  "receipt-agent": "shadow-lime-500/20",
  "bank-agent": "shadow-sky-500/20",
  "budget-agent": "shadow-fuchsia-500/20",
};

export default function AgentsPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-10 animate-fade-up">
        <h1 className="text-4xl font-bold mb-3">AI Workers</h1>
        <p className="text-slate-400 text-lg">Professional agents that handle specific office tasks</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {AGENTS.map((a, i) => (
          <Link key={a.id} href={`/agent/${a.id}`}
            className="card-hover glass border border-slate-700/50 rounded-2xl p-6 group flex flex-col animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${AGENT_COLORS[a.id] || "from-slate-500 to-slate-600"} rounded-2xl flex items-center justify-center text-2xl shadow-lg ${AGENT_SHADOWS[a.id] || ""} group-hover:scale-110 transition-transform`}>
                {a.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold group-hover:text-indigo-400 transition">{a.title}</h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm flex-1 mb-5 leading-relaxed">{a.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {a.skills.slice(0, 3).map((s, j) => (
                <span key={j} className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 text-xs rounded-lg border border-indigo-500/10">{s}</span>
              ))}
              {a.skills.length > 3 && (
                <span className="px-2.5 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-lg border border-slate-700/30">+{a.skills.length - 3}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
