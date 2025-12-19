"use client";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
        toast.error("Please enter your email");
        return;
    }
    setMessage("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
      toast.success("Reset link sent");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Forgot Password"
      description="Enter your email to receive a password reset link"
      footer={
        <>
          <button
            className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            onClick={handleReset}
            disabled={loading}
          >
             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Reset Link"}
          </button>
          <div className="text-center text-xs text-muted-foreground">
            <Link href="/login" className="inline-flex items-center justify-center gap-1 font-medium text-primary hover:underline">
              <ArrowLeft className="h-3 w-3" /> Back to Login
            </Link>
          </div>
        </>
      }
    >
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            id="email"
            type="email"
            className="flex h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {message && <p className="text-sm text-green-600 dark:text-green-400">{message}</p>}
      </div>
    </AuthCard>
  );
}
