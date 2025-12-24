"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { AuthCard } from "@/components/auth/AuthCard";
import { Mail, Lock, Loader2, GraduationCap, Shield, Eye, EyeOff, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";

type LoginMode = "student" | "staff";

function LoginContent() {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get("mode") as LoginMode) || "student";
  
  const [mode, setMode] = useState<LoginMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();
  const { isAuthenticated, loginCredentials, loginGoogle, user, loading: authLoading } = useAuth();

  // Handle Redirects
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      const roleRedirects = {
        ADMIN: '/admin-dashboard',
        STAFF: '/staff/dashboard',
        STUDENT: '/student/dashboard'
      };
      router.push(roleRedirects[user.role as keyof typeof roleRedirects] || '/admin-dashboard');
    }
  }, [isAuthenticated, user, authLoading, router]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCredentialLogin = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const result = await loginCredentials(email, password);
      if (result.success) toast.success("Welcome back!");
      else toast.error(result.error || "Invalid credentials");
    } catch  {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ hd: process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAIN || "*" });
      await signInWithPopup(auth, provider);
      await loginGoogle();
    } catch  {
      toast.error( "Google Sign-In failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Campus CMS"
      description={mode === "student" ? "Access your student portal" : "Staff & Admin access"}
    >
      {/* 1. Mode Switcher */}
      <div className="grid w-full grid-cols-2 p-1 bg-secondary rounded-lg mb-8" role="tablist">
        <button
          onClick={() => setMode("student")}
          className={`flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-md transition-all ${
            mode === "student" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
          role="tab"
          aria-selected={mode === "student"}
        >
          <GraduationCap size={16} /> Student
        </button>
        <button
          onClick={() => setMode("staff")}
          className={`flex items-center justify-center gap-2 py-3 text-sm font-medium rounded-md transition-all ${
            mode === "staff" ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
          role="tab"
          aria-selected={mode === "staff"}
        >
          <Shield size={16} /> Staff
        </button>
      </div>

      <div className="space-y-6">
        {/* 2. Google Login for Students - High Prominence */}
        {mode === "student" && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-md border py-3 hover:bg-accent transition-all font-medium disabled:opacity-50"
              aria-label="Sign in with Google"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                   <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              Continue with College Email
            </button>
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t"></div>
              <span className="flex-shrink mx-4 text-xs uppercase text-muted-foreground">Or credentials</span>
              <div className="flex-grow border-t"></div>
            </div>
          </motion.div>
        )}

        {/* 3. Credential Inputs */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
              <input
                id="email"
                type="email"
                placeholder="name@college.edu"
                className={`w-full rounded-md border bg-background px-10 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all ${errors.email ? 'border-red-500' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" aria-hidden="true" />}
            </div>
            {errors.email && <p id="email-error" className="text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
              <Link href="/forgot-password" className="text-xs text-primary hover:underline" title="Reset password">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`w-full rounded-md border bg-background px-10 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all ${errors.password ? 'border-red-500' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCredentialLogin()}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-10 top-3 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.password && <AlertCircle className="absolute right-3 top-3 h-4 w-4 text-red-500" aria-hidden="true" />}
            </div>
            {errors.password && <p id="password-error" className="text-xs text-red-500">{errors.password}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="rememberMe" className="text-sm text-muted-foreground">Remember me</label>
          </div>
        </div>

        <button
          onClick={handleCredentialLogin}
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:brightness-110 transition-all flex items-center justify-center disabled:opacity-50"
          aria-label="Sign in"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
        </button>
      </div>
    </AuthCard>
  );
}

export default LoginContent;