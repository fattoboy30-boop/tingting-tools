"use client";
import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirm = form.get("confirm") as string;
    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    const result = await signUp.email({
      name: form.get("username") as string,
      email: form.get("email") as string,
      password,
    });
    setLoading(false);
    if (result.error) {
      setError(result.error.message || "Registration failed");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="glass border border-slate-700/50 rounded-3xl p-8 shadow-2xl animate-fade-up">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-indigo-500/20">TT</div>
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-slate-400 text-sm mt-1">Join TingTing Tools today</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Username</label>
          <input name="username" type="text" required minLength={3} placeholder="Choose a username"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition placeholder:text-slate-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
          <input name="email" type="email" required placeholder="your@email.com"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition placeholder:text-slate-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
          <input name="password" type="password" required minLength={6} placeholder="At least 6 characters"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition placeholder:text-slate-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Confirm Password</label>
          <input name="confirm" type="password" required placeholder="Repeat your password"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition placeholder:text-slate-500" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-3.5 btn-primary rounded-xl font-semibold text-sm text-white disabled:opacity-50 shadow-lg shadow-indigo-500/20">
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-slate-400 text-sm mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition">Sign in</Link>
      </p>
    </div>
  );
}
