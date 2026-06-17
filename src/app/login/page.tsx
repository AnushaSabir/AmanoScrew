"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { Shield, Lock, Mail, ArrowRight, Key, MapPin, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [locationAlert, setLocationAlert] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { success, error: authError } = await login(email, password);
    if (success) {
      // Send the real OTP
      try {
        const res = await fetch('/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) {
          throw new Error("Failed to send OTP email.");
        }
        setStep("2fa");
      } catch (err: any) {
        setError(err.message || "Failed to send 2FA code.");
      }
    } else {
      setError(authError || "Invalid email or password");
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }
    setError("");
    setIsVerifying(true);
    
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid code");
      }
      
      setLocationAlert(true);
      
      // Simulate reading alert before redirecting
      setTimeout(() => {
        router.push("/dashboard");
      }, 4000);
      
    } catch (err: any) {
      setError(err.message || "Verification failed");
      setIsVerifying(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white -z-10"></div>
      
      <Link href="/" className="flex items-center gap-2 mb-10">
        <Shield className="h-10 w-10 text-blue-600" fill="currentColor" />
        <span className="text-3xl font-bold text-blue-600 tracking-tight">AMANO</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 relative z-10">
        {step === "credentials" ? (
          <>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
            <p className="text-slate-500 mb-8 font-medium text-sm">Sign in to your secure escrow dashboard.</p>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                Sign In
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-slate-500">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:text-primary/80 font-bold transition-colors">
                Create an account
              </Link>
            </div>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Two-Factor Auth</h2>
            <p className="text-slate-500 mb-8 font-medium text-sm">Please enter the 6-digit verification code sent to your registered email or phone.</p>

            {locationAlert ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 animate-in zoom-in-95 duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-800">Unusual Location Detected</h4>
                    <p className="text-xs text-amber-700 mt-1">We noticed a login from an unusual place (e.g., Karachi, PK). A security alert email has been sent.</p>
                    <div className="mt-3 text-xs font-bold text-amber-600 flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                      Redirecting to Dashboard...
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold text-center">
                    {error}
                  </div>
                )}
                <form onSubmit={handleVerify2FA} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Security Code</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-lg font-mono tracking-widest focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                        placeholder="000000"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-70"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                    {!isVerifying && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
              </>
            )}
            
            {!locationAlert && (
              <div className="mt-8 text-center text-sm font-medium text-slate-500">
                <button onClick={() => setStep("credentials")} className="text-primary hover:text-primary/80 font-bold transition-colors">
                  Back to login
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
