"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { 
  Shield, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  Phone, 
  UploadCloud, 
  CheckSquare, 
  Square,
  FileImage,
  RefreshCw
} from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  
  // KYC States
  const [docType, setDocType] = useState<"CNIC" | "Passport">("CNIC");
  const [cnicFrontName, setCnicFrontName] = useState("");
  const [cnicBackName, setCnicBackName] = useState("");
  const [passportName, setPassportName] = useState("");
  
  // Captcha State
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [isVerifyingCaptcha, setIsVerifyingCaptcha] = useState(false);

  // Terms State
  const [termsChecked, setTermsChecked] = useState(false);
  
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  // Hidden file inputs refs
  const cnicFrontRef = useRef<HTMLInputElement>(null);
  const cnicBackRef = useRef<HTMLInputElement>(null);
  const passportRef = useRef<HTMLInputElement>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!captchaChecked) {
      setError("Please verify that you are not a robot.");
      return;
    }
    
    // Basic file validation mock
    if (docType === "CNIC" && (!cnicFrontName || !cnicBackName)) {
      setError("Please upload both front and back pictures of your CNIC.");
      return;
    }
    if (docType === "Passport" && !passportName) {
      setError("Please upload your Passport picture.");
      return;
    }

    const { success, error: authError } = await register(name, email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError(authError || "An account with this email already exists.");
    }
  };

  const handleCaptchaClick = () => {
    if (captchaChecked) return;
    setIsVerifyingCaptcha(true);
    setTimeout(() => {
      setIsVerifyingCaptcha(false);
      setCaptchaChecked(true);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden py-12">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white -z-10"></div>
      
      <Link href="/" className="flex items-center gap-2 mb-10">
        <Shield className="h-10 w-10 text-primary" fill="currentColor" />
        <span className="text-3xl font-bold text-primary tracking-tight">AMANO</span>
      </Link>

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 relative z-10 my-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Create Account</h2>
        <p className="text-slate-500 mb-8 font-medium text-sm text-center">Join Amano Secure Escrow to protect your transactions.</p>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                  placeholder="+92 300 1234567"
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
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Identity Verification Section */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Identity Verification (KYC)
            </h3>
            
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input 
                  type="radio" 
                  name="docType" 
                  checked={docType === "CNIC"} 
                  onChange={() => setDocType("CNIC")}
                  className="accent-primary"
                /> 
                Pakistani CNIC
              </label>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input 
                  type="radio" 
                  name="docType" 
                  checked={docType === "Passport"} 
                  onChange={() => setDocType("Passport")}
                  className="accent-primary"
                /> 
                Passport
              </label>
            </div>

            {docType === "CNIC" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CNIC Front */}
                <div 
                  onClick={() => cnicFrontRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-primary bg-slate-50 hover:bg-primary/5 rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[120px]"
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={cnicFrontRef}
                    onChange={(e) => setCnicFrontName(e.target.files?.[0]?.name || "")}
                  />
                  {cnicFrontName ? (
                    <>
                      <FileImage className="h-8 w-8 text-emerald-500 mb-2" />
                      <span className="text-xs font-bold text-slate-700 truncate w-full px-2">{cnicFrontName}</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-8 w-8 text-slate-400 mb-2" />
                      <span className="text-sm font-bold text-slate-600">Upload CNIC Front</span>
                      <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                    </>
                  )}
                </div>

                {/* CNIC Back */}
                <div 
                  onClick={() => cnicBackRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-primary bg-slate-50 hover:bg-primary/5 rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[120px]"
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={cnicBackRef}
                    onChange={(e) => setCnicBackName(e.target.files?.[0]?.name || "")}
                  />
                  {cnicBackName ? (
                    <>
                      <FileImage className="h-8 w-8 text-emerald-500 mb-2" />
                      <span className="text-xs font-bold text-slate-700 truncate w-full px-2">{cnicBackName}</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-8 w-8 text-slate-400 mb-2" />
                      <span className="text-sm font-bold text-slate-600">Upload CNIC Back</span>
                      <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div 
                onClick={() => passportRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-primary bg-slate-50 hover:bg-primary/5 rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[120px]"
              >
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={passportRef}
                  onChange={(e) => setPassportName(e.target.files?.[0]?.name || "")}
                />
                {passportName ? (
                  <>
                    <FileImage className="h-8 w-8 text-emerald-500 mb-2" />
                    <span className="text-sm font-bold text-slate-700 truncate w-full max-w-xs">{passportName}</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-8 w-8 text-slate-400 mb-2" />
                    <span className="text-sm font-bold text-slate-600">Upload Passport Page</span>
                    <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Captcha Section */}
          <div className="pt-4 pb-2">
            <div 
              onClick={handleCaptchaClick}
              className={`flex items-center justify-between p-4 rounded-lg border shadow-sm cursor-pointer transition-all ${captchaChecked ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
            >
              <div className="flex items-center gap-3">
                {isVerifyingCaptcha ? (
                  <RefreshCw className="h-6 w-6 text-primary animate-spin" />
                ) : captchaChecked ? (
                  <CheckSquare className="h-6 w-6 text-emerald-500" />
                ) : (
                  <Square className="h-6 w-6 text-slate-400" />
                )}
                <span className={`text-sm font-bold ${captchaChecked ? 'text-emerald-700' : 'text-slate-600'}`}>
                  {captchaChecked ? 'Verified' : 'I am not a robot'}
                </span>
              </div>
              <div className="flex flex-col items-center opacity-60">
                <Shield className="h-5 w-5 text-slate-500 mb-0.5" />
                <span className="text-[9px] font-bold text-slate-500 uppercase">reCAPTCHA</span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="pt-2 pb-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input 
                  type="checkbox" 
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                  className="w-5 h-5 appearance-none border-2 border-slate-300 rounded-md checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                />
                {termsChecked && <CheckSquare className="absolute w-4 h-4 text-white pointer-events-none" strokeWidth={3} />}
              </div>
              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
                I agree to the Amano Escrow <a href="#" className="text-primary hover:underline font-bold">Terms & Conditions</a> and <a href="#" className="text-primary hover:underline font-bold">Privacy Policy</a>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!captchaChecked || !termsChecked}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 group mt-2"
          >
            Create Account
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-primary/80 font-bold transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
