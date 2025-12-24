"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../lib/firebase"
import { useAuth } from "@/context/AuthContext"
import { AuthCard } from "@/components/auth/AuthCard"
import { Mail, Lock, Loader2, GraduationCap, Shield, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import Link from "next/link"

type LoginMode = "student" | "staff"

function LoginContent() {
  const searchParams = useSearchParams()
  const initialMode = (searchParams.get("mode") as LoginMode) || "student"

  const [mode, setMode] = useState<LoginMode>(initialMode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const router = useRouter()
  const { isAuthenticated, loginCredentials, loginGoogle, user, loading: authLoading } = useAuth()

  // Handle Redirects
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      const roleRedirects = {
        ADMIN: "/admin-dashboard",
        STAFF: "/staff/dashboard",
        STUDENT: "/student/dashboard",
      }
      router.push(roleRedirects[user.role as keyof typeof roleRedirects] || "/admin-dashboard")
    }
  }, [isAuthenticated, user, authLoading, router])

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) newErrors.email = "Email is required"
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format"

    if (!password) newErrors.password = "Password is required"
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCredentialLogin = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const result = await loginCredentials(email, password)
      if (result.success) {
        toast.success("Welcome back!")
      } else {
        toast.error(result.error || "Invalid credentials")
      }
    } catch {
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ hd: process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAIN || "*" })
      await signInWithPopup(auth, provider)
      await loginGoogle()
    } catch (error) {
      console.error("Google Sign-In error:", error)
      toast.error("Google Sign-In failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Campus CMS" description={mode === "student" ? "Welcome back, student" : "Staff & Admin Portal"}>
      {/* Mode Switcher - Enhanced */}
      <div className="space-y-4 mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Login as</p>
        <div className="grid w-full grid-cols-2 gap-3">
          <motion.button
            onClick={() => setMode("student")}
            className={`relative py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              mode === "student"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
            role="tab"
            aria-selected={mode === "student"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <GraduationCap size={16} />
            <span>Student</span>
          </motion.button>

          <motion.button
            onClick={() => setMode("staff")}
            className={`relative py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              mode === "staff"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
            role="tab"
            aria-selected={mode === "staff"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Shield size={16} />
            <span>Staff</span>
          </motion.button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Google Login for Students */}
        {mode === "student" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <motion.button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="relative w-full group flex items-center justify-center gap-3 py-3 rounded-lg border-2 border-border bg-card hover:bg-accent/5 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Sign in with Google"
              whileHover={{ y: -2 }}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Continue with College Email</span>
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative flex items-center gap-4">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Or</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>
          </motion.div>
        )}

        {/* Form Inputs */}
        <div className="space-y-5">
          {/* Email Input */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors"
                aria-hidden="true"
              />
              <input
                id="email"
                type="email"
                placeholder={mode === "student" ? "you@college.edu" : "staff@college.edu"}
                className={`w-full rounded-lg border-2 bg-card px-10 py-3 text-sm font-medium transition-all duration-200 placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${
                  errors.email ? "border-destructive focus:ring-destructive/30" : "border-border hover:border-input"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {!errors.email && email && (
                <CheckCircle
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-accent"
                  aria-hidden="true"
                />
              )}
              {errors.email && (
                <AlertCircle
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive"
                  aria-hidden="true"
                />
              )}
            </div>
            {errors.email && (
              <p id="email-error" className="text-xs text-destructive font-medium flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email}
              </p>
            )}
          </motion.div>

          {/* Password Input */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:text-primary/80 font-medium transition-colors hover:underline"
                title="Reset password"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors"
                aria-hidden="true"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full rounded-lg border-2 bg-card px-10 py-3 text-sm font-medium transition-all duration-200 placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${
                  errors.password ? "border-destructive focus:ring-destructive/30" : "border-border hover:border-input"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCredentialLogin()}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-xs text-destructive font-medium flex items-center gap-1">
                <AlertCircle size={12} /> {errors.password}
              </p>
            )}
          </motion.div>

          {/* Remember Me */}
          <motion.div
            className="flex items-center space-x-3 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-2 border-border bg-card cursor-pointer accent-primary transition-all"
            />
            <label
              htmlFor="rememberMe"
              className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            >
              Remember me
            </label>
          </motion.div>
        </div>

        {/* Sign In Button */}
        <motion.button
          onClick={handleCredentialLogin}
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110"
          aria-label="Sign in"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>Signing in...</span>
            </>
          ) : (
            "Sign In"
          )}
        </motion.button>

        {/* Sign Up Link */}
        {/* <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary font-semibold hover:underline transition-colors">
            Sign up here
          </Link>
        </p> */}
      </div>
    </AuthCard>
  )
}

export default LoginContent
