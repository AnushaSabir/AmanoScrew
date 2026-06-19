"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
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
  RefreshCw,
  Eye,
  EyeOff,
  X
} from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // KYC States
  const [docType, setDocType] = useState<"CNIC" | "Passport">("CNIC");
  const [cnicFrontName, setCnicFrontName] = useState("");
  const [cnicBackName, setCnicBackName] = useState("");
  const [passportName, setPassportName] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  
  // Captcha State
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [isVerifyingCaptcha, setIsVerifyingCaptcha] = useState(false);

  // Terms State
  const [termsChecked, setTermsChecked] = useState(false);
  
  const [isRegistering, setIsRegistering] = useState(false);
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

    setIsRegistering(true);

    try {
      let frontUrl = "";
      let backUrl = "";

      const uploadFile = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { data, error } = await supabase.storage.from('kyc-documents').upload(fileName, file);
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage.from('kyc-documents').getPublicUrl(fileName);
        return publicUrl;
      };

      if (docType === "CNIC") {
        const frontFile = cnicFrontRef.current?.files?.[0];
        const backFile = cnicBackRef.current?.files?.[0];
        if (frontFile) frontUrl = await uploadFile(frontFile);
        if (backFile) backUrl = await uploadFile(backFile);
      } else {
        const passportFile = passportRef.current?.files?.[0];
        if (passportFile) frontUrl = await uploadFile(passportFile);
      }

      const kycData = {
        type: docType,
        frontUrl,
        backUrl: backUrl || undefined
      };

      const { success, error: authError } = await register(name, email, password, mobile, kycData);
      if (success) {
        try {
          await fetch('/api/auth/welcome-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: email,
              name: name,
              date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            })
          });
        } catch (emailErr) {
          console.error("Failed to send welcome email", emailErr);
        }

        // Logout immediately so they cannot access dashboard until approved
        await supabase.auth.signOut();
        router.push("/pending-approval");
      } else {
        setError(authError || "An account with this email already exists.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload documents. Please try again.");
    } finally {
      setIsRegistering(false);
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
        <Shield className="h-10 w-10 text-blue-600" fill="currentColor" />
        <span className="text-3xl font-bold text-blue-600 tracking-tight">AMANO</span>
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
                  inputMode="tel"
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
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
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
                I agree to the Amano Escrow <button type="button" onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }} className="text-primary hover:underline font-bold">Terms & Conditions</button> and <a href="#" className="text-primary hover:underline font-bold">Privacy Policy</a>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!captchaChecked || !termsChecked || isRegistering}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 group mt-2"
          >
            {isRegistering ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-primary/80 font-bold transition-colors">
            Sign in
          </Link>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">Amano Terms of Service</h2>
              <button 
                onClick={() => setShowTermsModal(false)}
                className="p-2 bg-white text-slate-400 hover:text-slate-600 rounded-full shadow-sm border border-slate-200 hover:border-slate-300 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-slate-600">
              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">1. Definition of Amano's Service</h3>
                <p>Amano provides a digital transaction management platform that helps buyers and sellers conduct transactions securely. Amano temporarily holds funds until the agreed transaction conditions are met and verified by the parties involved. Amano acts solely as a neutral transaction facilitator and does not act as a buyer, seller, agent, contractor, guarantor, employer, or partner in any transaction.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">2. User Eligibility</h3>
                <p className="mb-2">To use Amano's services, users must:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Be at least 18 years of age.</li>
                  <li>Have the legal capacity to enter into binding contracts.</li>
                  <li>Provide accurate and truthful information during registration and verification.</li>
                  <li>Comply with all applicable laws and regulations of Pakistan.</li>
                  <li>Not be restricted from using financial or digital transaction services by any competent authority.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">3. Account Registration Requirements</h3>
                <p className="mb-2">Users may be required to create an Amano account before using certain services. Users agree to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provide accurate and complete registration information.</li>
                  <li>Maintain the confidentiality of account credentials.</li>
                  <li>Notify Amano immediately of unauthorized account access.</li>
                  <li>Keep contact information updated.</li>
                  <li>Complete identity verification procedures when requested.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">4. How Amano Transactions Work</h3>
                <p className="mb-2">The general transaction process is as follows:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Buyer and seller agree on transaction terms.</li>
                  <li>Buyer submits payment through the approved payment method.</li>
                  <li>Amano confirms receipt of funds.</li>
                  <li>Seller provides the agreed product, service, or deliverable.</li>
                  <li>Buyer confirms satisfactory completion.</li>
                  <li>Amano releases funds to the seller.</li>
                </ol>
                <p className="mt-2">If a dispute arises, funds may be temporarily held until dispute resolution is completed. Amano may request evidence from either party before releasing funds.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">5. Buyer Responsibilities</h3>
                <p className="mb-2">Buyers agree to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Provide accurate transaction information.</li>
                  <li>Submit payment through approved channels.</li>
                  <li>Clearly communicate transaction requirements.</li>
                  <li>Inspect and review delivered goods or services promptly.</li>
                  <li>Raise disputes honestly and in good faith.</li>
                  <li>Not misuse Amano's dispute process.</li>
                </ul>
                <p className="mt-2 text-slate-800 font-medium">False claims or fraudulent disputes may result in account suspension.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">6. Seller Responsibilities</h3>
                <p className="mb-2">Sellers agree to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Deliver products or services as described.</li>
                  <li>Fulfill obligations within agreed timelines.</li>
                  <li>Maintain professional communication with buyers.</li>
                  <li>Provide evidence of delivery or completion when requested.</li>
                  <li>Comply with all applicable laws and regulations.</li>
                </ul>
                <p className="mt-2 text-slate-800 font-medium">Misrepresentation, fraud, or failure to fulfill agreed obligations may result in account suspension or termination.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">7. Payment Release Process</h3>
                <p className="mb-2">Funds may be released when:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The buyer confirms successful completion of the transaction.</li>
                  <li>The agreed review period expires without dispute.</li>
                  <li>A dispute decision requires release of funds.</li>
                  <li>Both parties jointly authorize the release.</li>
                </ul>
                <p className="mt-2">Amano reserves the right to delay payment release for security reviews, fraud prevention, legal compliance, or dispute investigations.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">8. Dispute Process</h3>
                <p className="mb-2">If a disagreement arises:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Either party may submit a dispute request.</li>
                  <li>Amano may request supporting evidence from both parties.</li>
                  <li>Evidence may include contracts, messages, invoices, screenshots, delivery records, or other relevant documents.</li>
                  <li>Amano will review available information in a fair and neutral manner.</li>
                  <li>A decision will be made based on the evidence provided.</li>
                </ul>
                <p className="mt-2">Failure to provide requested information may affect the outcome of a dispute. Amano's decision shall be final unless otherwise required by law.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">9. Prohibited Transactions</h3>
                <p className="mb-2">The following transactions are prohibited:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Illegal products or services.</li>
                  <li>Fraudulent schemes.</li>
                  <li>Money laundering activities.</li>
                  <li>Terrorism financing.</li>
                  <li>Stolen goods.</li>
                  <li>Counterfeit products.</li>
                  <li>Weapons, explosives, or restricted items.</li>
                  <li>Adult or obscene content prohibited by law.</li>
                  <li>Transactions violating intellectual property rights.</li>
                  <li>Transactions intended to evade taxes or regulations.</li>
                  <li>Any activity prohibited under Pakistani law.</li>
                </ul>
                <p className="mt-2 text-slate-800 font-medium">Amano may suspend or terminate transactions involving prohibited activities without prior notice.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">10. Refund Policy</h3>
                <p className="mb-2">Refunds are not automatic and are determined based on transaction status and dispute outcomes. Refunds may be issued when:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Both parties agree to cancel the transaction.</li>
                  <li>The seller fails to deliver the agreed product or service.</li>
                  <li>A dispute investigation supports the buyer's claim.</li>
                  <li>Amano determines that fraud or unauthorized activity has occurred.</li>
                </ul>
                <p className="mt-2">Approved refunds will be processed through the original payment method whenever reasonably possible.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">11. Account Suspension and Termination</h3>
                <p className="mb-2">Amano may suspend, restrict, or terminate accounts for:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Violations of these Terms.</li>
                  <li>Fraudulent activity.</li>
                  <li>Providing false information.</li>
                  <li>Abuse of the platform or dispute process.</li>
                  <li>Legal or regulatory requirements.</li>
                  <li>Security concerns.</li>
                </ul>
                <p className="mt-2">Suspension or termination does not remove a user's obligation to resolve outstanding transactions.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">12. Limitation of Liability</h3>
                <p className="mb-2">Amano provides its services on an "as available" basis. To the maximum extent permitted by law:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Amano is not responsible for the quality, legality, safety, or suitability of products or services exchanged between users.</li>
                  <li>Amano is not liable for indirect, incidental, consequential, or special damages.</li>
                  <li>Amano is not responsible for losses resulting from user misconduct, inaccurate information, technical failures, third-party services, or events beyond its reasonable control.</li>
                </ul>
                <p className="mt-2">Amano's role is limited to facilitating transaction management and dispute review.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">13. Governing Law</h3>
                <p>These Terms shall be governed by and interpreted in accordance with the laws of the Islamic Republic of Pakistan. Any legal dispute arising from the use of Amano's services shall be subject to the jurisdiction of the competent courts of Pakistan.</p>
              </section>

              <section>
                <h3 className="font-bold text-slate-800 text-base mb-2">14. Changes to Terms</h3>
                <p>Amano may update these Terms from time to time. Updated Terms become effective upon publication on the Amano website or platform. Continued use of Amano's services after changes are published constitutes acceptance of the revised Terms. Users are encouraged to review these Terms periodically.</p>
              </section>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-white">
              <label className="flex items-center gap-3 cursor-pointer group mb-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50 hover:bg-blue-50 transition-colors">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                    className="w-5 h-5 appearance-none border-2 border-slate-300 rounded-md checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                  />
                  {termsChecked && <CheckSquare className="absolute w-4 h-4 text-white pointer-events-none" strokeWidth={3} />}
                </div>
                <span className="text-sm font-bold text-slate-700">
                  I have read and agree to the Amano Terms of Service
                </span>
              </label>
              
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
