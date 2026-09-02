"use client";
import Link from "next/link";

const FEATURES = [
  { icon: "📄", title: "Document Scanner", desc: "Extract text, tables, and data from any file instantly — PDFs, images, scans." },
  { icon: "📊", title: "AI to Excel", desc: "Turn raw data into clean, formula-ready spreadsheets in one click." },
  { icon: "📝", title: "Report Generator", desc: "Write professional business reports from your data in seconds." },
  { icon: "💰", title: "Invoice Processor", desc: "Read invoices and extract every detail — amounts, dates, suppliers." },
  { icon: "✍️", title: "Handwriting Extractor", desc: "Convert handwritten notes and forms into digital text." },
  { icon: "🧾", title: "Receipt Scanner", desc: "Scan receipts, extract items, prices, and categorize spending." },
  { icon: "🏦", title: "Bank Statement", desc: "Process bank statements into categorized spending reports." },
  { icon: "🧮", title: "Budget Calculator", desc: "Create a budget plan from your income and expenses." },
  { icon: "🧹", title: "Data Cleaner", desc: "Fix duplicates, standardize names, clean dates instantly." },
  { icon: "✉️", title: "Email Writer", desc: "Write professional emails and letters that sound like you." },
  { icon: "📋", title: "Meeting Minutes", desc: "Turn messy notes into structured minutes with action items." },
  { icon: "🔍", title: "Document Compare", desc: "Find every difference between two documents." },
];

const STEPS = [
  { num: "1", title: "Upload", desc: "Drop your file — any format. CSV, PDF, images, scans. We handle it all.", icon: "📤" },
  { num: "2", title: "Click Process", desc: "One click. Our AI reads, analyzes, and transforms your data automatically.", icon: "⚡" },
  { num: "3", title: "Download", desc: "Get your result as TXT, CSV, Excel, or Word. Copy-paste ready.", icon: "📥" },
];

const TESTIMONIALS = [
  { name: "Sarah K.", role: "Office Manager", text: "I used to spend 2 hours a week cleaning spreadsheets. Now it takes 30 seconds. TingTing Tools changed how I work." },
  { name: "Michael R.", role: "Accountant", text: "The receipt scanner and bank statement tools saved me hours during tax season. Everything categorizes automatically." },
  { name: "Lisa M.", role: "Project Manager", text: "Meeting minutes used to be my least favorite task. Now I just upload my notes and get perfect minutes every time." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 font-bold text-lg">
            <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center text-sm shadow-lg shadow-indigo-500/20">TT</span>
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">TingTing Tools</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="px-4 py-2 text-sm text-slate-400 hover:text-white transition">Sign In</Link>
            <Link href="/register" className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-xl text-sm font-semibold transition shadow-lg shadow-indigo-500/20">Start Free Trial</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-sm text-indigo-300 mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            AI-Powered Office Automation
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
            Stop Doing <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Manual Work</span>
            <br />Let AI Handle It
          </h1>
          <p className="text-xl sm:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            14 professional AI tools that read your documents, clean your data, write your reports, and process your finances — in seconds, not hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-2xl font-bold text-lg transition shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2">
              Start Free Trial →
            </Link>
            <a href="#how-it-works" className="px-8 py-4 bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-2">
              See How It Works
            </a>
          </div>
          <p className="text-sm text-slate-500 mt-4">No credit card required · Free for 30 days · Cancel anytime</p>
        </div>
      </section>

      {/* LOGOS / TRUST */}
      <section className="py-12 border-y border-slate-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-slate-500 mb-6">Trusted by teams who value their time</p>
          <div className="flex flex-wrap justify-center gap-8 text-slate-600 text-lg font-semibold">
            <span>Accounting Firms</span>
            <span>·</span>
            <span>Legal Offices</span>
            <span>·</span>
            <span>Healthcare Admin</span>
            <span>·</span>
            <span>Small Businesses</span>
            <span>·</span>
            <span>Freelancers</span>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Sound Familiar?</h2>
            <p className="text-slate-400 text-lg">These tasks eat your time every single day.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { problem: "Spending hours cleaning messy CSV files and spreadsheets", time: "2-3 hours/week" },
              { problem: "Manually extracting data from receipts and invoices", time: "4-5 hours/week" },
              { problem: "Writing the same type of emails and reports over and over", time: "1-2 hours/week" },
              { problem: "Comparing documents line by line looking for changes", time: "1-2 hours/week" },
              { problem: "Turning handwritten notes into digital documents", time: "1-2 hours/week" },
              { problem: "Creating budgets and financial summaries from scratch", time: "2-3 hours/week" },
            ].map((item, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 flex items-start gap-4">
                <span className="text-2xl mt-1">😤</span>
                <div>
                  <p className="text-slate-200 font-medium mb-1">{item.problem}</p>
                  <p className="text-red-400 text-sm font-semibold">Wasting {item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-slate-300">
              That&apos;s <span className="text-red-400">11-17 hours</span> every week on tasks AI can do in <span className="text-emerald-400">seconds</span>.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Three Steps. That&apos;s It.</h2>
            <p className="text-slate-400 text-lg">No learning curve. No complicated setup. Just results.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/20 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6">
                  {s.icon}
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full text-sm font-bold mb-4">
                  {s.num}
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">14 AI Tools. One Platform.</h2>
            <p className="text-slate-400 text-lg">Every office task, handled by a specialist AI.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 hover:border-indigo-500/30 transition-all hover:-translate-y-1 group">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Before vs After TingTing</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-red-400 mb-6">❌ Before</h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3"><span className="text-red-400 mt-1">✗</span> Manually cleaning CSV files row by row</li>
                <li className="flex items-start gap-3"><span className="text-red-400 mt-1">✗</span> Typing out data from receipts and invoices</li>
                <li className="flex items-start gap-3"><span className="text-red-400 mt-1">✗</span> Writing reports from scratch every time</li>
                <li className="flex items-start gap-3"><span className="text-red-400 mt-1">✗</span> Comparing documents side by side manually</li>
                <li className="flex items-start gap-3"><span className="text-red-400 mt-1">✗</span> Organizing meeting notes into action items</li>
                <li className="flex items-start gap-3"><span className="text-red-400 mt-1">✗</span> Spending 11-17 hours per week on repetitive tasks</li>
              </ul>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-emerald-400 mb-6">✅ After</h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3"><span className="text-emerald-400 mt-1">✓</span> Upload file → AI cleans it in seconds</li>
                <li className="flex items-start gap-3"><span className="text-emerald-400 mt-1">✓</span> Scan receipts → data extracted automatically</li>
                <li className="flex items-start gap-3"><span className="text-emerald-400 mt-1">✓</span> Click one button → professional report ready</li>
                <li className="flex items-start gap-3"><span className="text-emerald-400 mt-1">✓</span> Upload two files → differences highlighted</li>
                <li className="flex items-start gap-3"><span className="text-emerald-400 mt-1">✓</span> Drop notes → structured minutes with action items</li>
                <li className="flex items-start gap-3"><span className="text-emerald-400 mt-1">✓</span> Save 11-17 hours every week</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">People Love It</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6">
                <div className="flex gap-1 mb-4 text-amber-400">★★★★★</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">&quot;{t.text}&quot;</p>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start Free. Upgrade When You&apos;re Ready.</h2>
            <p className="text-slate-400 text-lg">No credit card required for the free trial.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Free */}
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-3xl p-8">
              <h3 className="text-lg font-bold mb-2">Free Trial</h3>
              <p className="text-slate-400 text-sm mb-6">Try everything for 30 days</p>
              <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-slate-400 font-normal">/month</span></div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> All 14 AI tools</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> 50 processing credits</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Download as TXT, CSV</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Email support</li>
              </ul>
              <Link href="/register" className="block w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500 rounded-xl text-center font-semibold transition">
                Start Free Trial
              </Link>
            </div>
            {/* Pro */}
            <div className="bg-gradient-to-b from-indigo-500/10 to-cyan-500/5 border border-indigo-500/30 rounded-3xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full text-xs font-bold">MOST POPULAR</div>
              <h3 className="text-lg font-bold mb-2">Pro</h3>
              <p className="text-slate-400 text-sm mb-6">For power users and teams</p>
              <div className="text-4xl font-bold mb-6">$19<span className="text-lg text-slate-400 font-normal">/month</span></div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Everything in Free</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Unlimited processing credits</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Download as Excel, Word</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Priority AI processing</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Team collaboration</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Priority support</li>
              </ul>
              <Link href="/register" className="block w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-xl text-center font-semibold transition shadow-lg shadow-indigo-500/20">
                Start Free Trial →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Stop Wasting Time</span>?
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who replaced hours of manual work with seconds of AI. Start your free trial today.
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-2xl font-bold text-xl transition shadow-xl shadow-indigo-500/25">
            Start Free Trial →
          </Link>
          <p className="text-sm text-slate-500 mt-4">No credit card required · 30-day free trial · Cancel anytime</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 font-bold">
              <span className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center text-sm">TT</span>
              TingTing Tools
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
              <Link href="/login" className="hover:text-white transition">Sign In</Link>
              <Link href="/register" className="hover:text-white transition">Get Started</Link>
            </div>
            <p className="text-xs text-slate-500">© 2026 TingTing Tools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
