
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  User,
  Sparkles,
  LoaderCircle,
} from "lucide-react";

import api from "../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!formData.username.trim() || !formData.password) {
    setError("Please enter both username and password.");
    return;
  }

  try {
    setLoading(true);

    const response = await api.post("/api/admin/auth/login", {
      username: formData.username.trim(),
      password: formData.password,
    });

    console.log("Login successful:", response.data);

    navigate("/admin/dashboard", { replace: true });

  } catch (err) {
    console.error("Login error:", err);

    setError(
      err.response?.data?.message ||
      "Login failed. Please check your credentials."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#161316] px-5 py-12 text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-[#ff6d29]/15 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#453027]/70 blur-[140px]" />

      {/* Back button */}
      <Link
        to="/"
        className="absolute left-6 top-7 z-10 flex items-center gap-2 text-sm text-[#bababa] transition hover:text-[#ff8a55] sm:left-10"
      >
        <ArrowLeft size={17} />
        Back to home
      </Link>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[460px] rounded-[28px] border border-white/10 bg-[#201a18]/90 p-7 shadow-[0_20px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-10"
      >

        {/* Logo */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff6d29] text-[#161316]">
            <BookOpen size={25} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold">
              Book<span className="text-[#ff6d29]">Hub.</span>
            </h2>
            <p className="text-[9px] tracking-[3px] text-[#bababa]">
              RESOURCE CENTER
            </p>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <motion.div
            initial={{ rotate: -15, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#ff6d29]/30 bg-[#ff6d29]/10 text-[#ff8a55]"
          >
            <ShieldCheck size={29} />
          </motion.div>

          <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[3px] text-[#ff8a55]">
            <Sparkles size={14} />
            ADMINISTRATION
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Welcome back.
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#bababa]">
            Sign in to access your administrative workspace and manage
            your organization's book library.
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#e7ded9]">
              Username
            </label>

            <div className="flex items-center rounded-xl border border-white/10 bg-[#161316] px-4 transition focus-within:border-[#ff6d29] focus-within:ring-2 focus-within:ring-[#ff6d29]/10">
              <User size={19} className="text-[#bababa]" />

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
                className="w-full bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-[#777]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#e7ded9]">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-white/10 bg-[#161316] px-4 transition focus-within:border-[#ff6d29] focus-within:ring-2 focus-within:ring-[#ff6d29]/10">
              <LockKeyhole size={19} className="text-[#bababa]" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-[#777]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#bababa] transition hover:text-[#ff8a55]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {typeof error === "string"
                ? error
                : "Login failed. Please check your credentials."}
            </motion.div>
          )}
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#ff6d29] py-4 font-semibold text-[#161316] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(255,109,41,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle size={19} className="animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in to dashboard
                <ArrowRight
                  size={19}
                  className="transition group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </form>

        {/* Security note */}
        <div className="mt-8 flex items-center justify-center gap-2 border-t border-white/10 pt-6 text-xs text-[#bababa]">
          <LockKeyhole size={14} className="text-[#ff8a55]" />
          Secure administrator access
        </div>

      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-5 text-center text-xs text-[#777]">
        © {new Date().getFullYear()} BookHub. Built for knowledge.
      </div>
    </main>
  );
}
