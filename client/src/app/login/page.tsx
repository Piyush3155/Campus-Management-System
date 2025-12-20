"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { AuthCard } from "@/components/auth/AuthCard";
import { Mail, Lock, Loader2, User, GraduationCap, Shield, Briefcase } from "lucide-react";
import { toast } from "sonner";

type LoginMode = "student" | "staff";

function LoginContent() {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get("mode") as LoginMode) || "student";
  
  const [mode, setMode] = useState<LoginMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated, loginCredentials, loginGoogle, user, loading: authLoading } = useAuth();

  // Redirect based on role if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      redirectToDashboard(user.role);
    }
  }, [isAuthenticated, user, authLoading]);

  const redirectToDashboard = (role: string) => {
    switch (role) {
      case "ADMIN":
        router.push("/admin-dashboard");
        break;
      case "STAFF":
        router.push("/staff");
        break;
      case "STUDENT":
        router.push("/student");
        break;
      default:
        router.push("/");
    }
  };

  /**
   * Handle Staff/Admin Login with credentials
   */
  const handleCredentialLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setLoading(true);
    try {
      const result = await loginCredentials(email, password);
      
      if (result.success) {
        toast.success("Logged in successfully");
        // Redirect will happen via useEffect
      } else {
        toast.error(result.error || "Invalid credentials");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Student Login with Google
   */
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Step 1: Firebase Google Sign-In
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        hd: process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAIN?.replace("@", "") || "college.edu",
      });
      
      await signInWithPopup(auth, provider);
      
      // Step 2: Authenticate with backend
      const result = await loginGoogle();
      
      if (result.success) {
        toast.success("Logged in successfully");
        // Redirect will happen via useEffect
      } else {
        toast.error(result.error || "Authentication failed");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Handle specific Firebase errors
        if (error.message.includes("popup-closed-by-user")) {
          toast.error("Sign-in cancelled");
        } else if (error.message.includes("account-exists-with-different-credential")) {
          toast.error("An account already exists with this email");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error("Failed to sign in with Google");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AuthCard
      title="Welcome to Campus CMS"
      description={
        mode === "student" 
          ? "Sign in with your college Google account" 
          : "Enter your credentials to access your account"
      }
      footer={
        <div className="space-y-4">
          {mode === "student" ? (
            <>
              {/* Google Sign-In Button for Students */}
              <button
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
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
                    Continue with Google
                  </>
                )}
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Credential Login Button for Staff/Admin */}
              <button
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                onClick={handleCredentialLogin}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
              </button>
              
              <div className="text-center text-xs text-muted-foreground">
                <Link
                  href="/forgot-password"
                  className="font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
            </>
          )}
          
          {/* Mode Toggle */}
          <button
            type="button"
            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={() => setMode(mode === "student" ? "staff" : "student")}
          >
            {mode === "student" ? (
              <>
                <Briefcase className="h-4 w-4" />
                Staff / Admin Login
              </>
            ) : (
              <>
                <GraduationCap className="h-4 w-4" />
                Student Login
              </>
            )}
          </button>
        </div>
      }
    >
      {/* Mode Indicator */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            mode === "student"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
          }`}
        >
          {mode === "student" ? (
            <>
              <GraduationCap className="h-4 w-4" />
              Student Portal
            </>
          ) : (
            <>
              <Shield className="h-4 w-4" />
              Staff / Admin Portal
            </>
          )}
        </div>
      </div>

      {mode === "student" ? (
        /* Student Login - Info */
        <div className="space-y-4 text-center">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
            <GraduationCap className="mx-auto h-8 w-8 text-blue-600 dark:text-blue-400" />
            <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              Use your official college email address to sign in with Google.
            </p>
          </div>
        </div>
      ) : (
        /* Staff/Admin Login - Credentials Form */
        <>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                id="email"
                type="email"
                className="flex h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCredentialLogin()}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                id="password"
                type="password"
                className="flex h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCredentialLogin()}
              />
            </div>
          </div>
        </>
      )}
    </AuthCard>
  );
}

function LoginFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  );
}
