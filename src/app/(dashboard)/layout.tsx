"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: "◈" },
    { href: "/tools", label: "Tools", icon: "⚡" },
    { href: "/agents", label: "Agents", icon: "◆" },
  ];

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 glass border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-3 font-bold text-lg group">
            <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center text-sm shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition">
              TT
            </span>
            <span className="gradient-text">TingTing</span>
          </Link>

          <div className="flex items-center gap-1">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  pathname === l.href || (l.href !== "/dashboard" && pathname.startsWith(l.href))
                    ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}>
                <span className="text-xs">{l.icon}</span>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-xl">
              <span className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-xs font-bold">
                {(session?.user?.name || session?.user?.email || "U")[0].toUpperCase()}
              </span>
              <span className="text-xs text-slate-300 hidden sm:block">{session?.user?.name || session?.user?.email || "User"}</span>
            </div>
            <button onClick={() => signOut({ fetchOptions: { onSuccess: () => window.location.href = "/login" } })}
              className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 rounded-xl text-xs text-red-400 font-medium transition-all">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
