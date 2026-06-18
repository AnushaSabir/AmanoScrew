"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  ShieldCheck,
  Lock,
  RefreshCcw,
  CheckCircle,
  FileText,
  CreditCard,
  Send,
  Building,
  Mail,
  HelpCircle,
  ArrowRight,
  Shield,
  Bot,
  Users,
  Award,
  Star,
  ChevronRight,
  Activity
} from "lucide-react";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full glass-card border-b border-slate-200/50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-500" fill="currentColor" />
            <span className="text-2xl font-bold text-blue-500 tracking-tight">AMANO</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">How it Works</Link>
            <Link href="#security" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Security</Link>
            <Link href="#reviews" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Testimonials</Link>
            <Link href="#about" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">About</Link>
          </nav>
          <div className="flex items-center gap-5">
            {user ? (
              <Link
                href="/dashboard"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors hidden sm:block">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* SECTION 1 - HERO */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative">
        {/* Abstract Premium Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-white -z-20"></div>
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
        
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 font-semibold text-xs mb-8">
                <Lock className="h-3 w-3 text-accent" />
                <span>SSL Secured & Bank-Grade Encryption</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-6 leading-[1.1] tracking-tight">
                Secure Payments <br />
                Between <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-400">Buyers & Sellers</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Amano is an AI-powered escrow platform that protects online transactions through secure payment holding, verification, and fraud prevention.
              </p>

              <div className="flex flex-col items-center lg:items-start gap-6 mb-12">
                <Link
                  href={user ? "/dashboard" : "/login"}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 md:px-16 py-4 md:py-6 rounded-full text-lg md:text-2xl font-black tracking-wide transition-all shadow-2xl shadow-primary/40 flex items-center justify-center gap-4 hover:-translate-y-1.5 hover:shadow-primary/50"
                >
                  START A DEAL
                  <ArrowRight className="h-8 w-8" />
                </Link>
                <div className="flex items-center justify-center lg:justify-start gap-4 px-2 opacity-90">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 z-30">JD</div>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 z-20">SM</div>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-xs font-bold text-green-600 z-10">+2k</div>
                  </div>
                  <div className="text-sm font-semibold text-slate-600 text-left leading-tight">
                    Trusted by <br/>verified users
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive/Floating Graphics */}
            <div className="relative h-[500px] hidden lg:block">
              {/* Main Floating Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 glass-card rounded-2xl p-6 z-20 animate-[float_6s_ease-in-out_infinite]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-xl">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Transaction Protected</div>
                      <div className="text-xs text-slate-500 font-medium">Escrow ID: #AM-8842</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Amount</span>
                    <span className="font-bold text-slate-800">$4,500.00</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-accent w-3/4 h-full rounded-full relative">
                      <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                    <span>Deposited</span>
                    <span className="text-accent">Awaiting Completion</span>
                  </div>
                </div>
              </div>

              {/* Smaller floating element 1 */}
              <div className="absolute top-20 right-10 w-48 glass-card rounded-xl p-4 z-10 animate-[float_8s_ease-in-out_infinite_1s]">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-1.5 rounded-full">
                    <CheckCircle className="h-4 w-4 text-accent" />
                  </div>
                  <div className="text-xs font-bold text-slate-700">AI Verified Identity</div>
                </div>
              </div>

              {/* Smaller floating element 2 */}
              <div className="absolute bottom-24 left-4 w-56 glass-card rounded-xl p-4 z-30 animate-[float_7s_ease-in-out_infinite_2s]">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Lock className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-700">Funds Secured</div>
                    <div className="text-[10px] text-slate-500">In Amano Vault</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: STATISTICS */}
      <section className="py-12 border-y border-slate-200 bg-white relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <div className="text-center px-4">
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">$50M+</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Protected Volume</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">99.9%</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Fraud Prevention</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">24/7</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Dispute Support</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">10k+</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Verified Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - HOW IT WORKS (Modern Flow) */}
      <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-secondary text-sm font-bold mb-4">
              <Activity className="h-4 w-4" /> Seamless Process
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">Transaction Flow</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">A frictionless, 5-step process designed to eliminate risk for both parties.</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-slate-200 via-secondary/30 to-slate-200 -z-10 rounded-full"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-4">
              {[
                { icon: FileText, title: "Create Agreement", desc: "Define terms & price." },
                { icon: CreditCard, title: "Deposit Funds", desc: "Securely locked in vault." },
                { icon: Bot, title: "Verification", desc: "AI checks parties & terms." },
                { icon: CheckCircle, title: "Task Completion", desc: "Deliver goods/services." },
                { icon: Send, title: "Release Payment", desc: "Funds sent instantly." }
              ].map((step, idx) => (
                <div key={idx} className="relative group flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 border-slate-100 flex items-center justify-center mb-6 group-hover:border-secondary group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)] transition-all duration-300 relative z-10">
                    <step.icon className="h-8 w-8 text-primary group-hover:text-secondary transition-colors" />
                    {/* Number Badge */}
                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold border-2 border-white shadow-sm">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 font-medium px-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - SECURITY & TRUST */}
      <section id="security" className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-sm font-bold mb-6 backdrop-blur-sm">
                <Shield className="h-4 w-4 text-accent" /> Enterprise Security
              </div>
              <h2 className="text-4xl font-extrabold mb-6 leading-tight">Bank-Grade Trust Architecture</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                We combine AI-driven monitoring with institutional-grade escrow vaults to ensure your money never moves until you say so.
              </p>
              <ul className="space-y-4 mb-8">
                {['End-to-End Encryption', 'Regulatory Compliant', 'Automated Fraud Detection'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-slate-200">
                    <CheckCircle className="h-5 w-5 text-accent" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Shield, title: "Zero Fraud Risk", desc: "Eliminate the risk of non-payment or non-delivery." },
                { icon: Lock, title: "Secure Vaults", desc: "Payments are encrypted and stored in partnered bank vaults." },
                { icon: ShieldCheck, title: "Buyer Protection", desc: "Get exactly what you paid for, or your money back." },
                { icon: Building, title: "Seller Protection", desc: "Never begin work without knowing funds are secured." }
              ].map((item, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-2xl hover:bg-slate-800/80 transition-all border border-slate-700/50 group">
                  <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: TESTIMONIALS */}
      <section id="reviews" className="py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">Trusted by Professionals</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Don't just take our word for it. Here's what our verified users have to say.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Michael T.", role: "Freelance Developer", text: "Amano completely removed the stress of chasing payments. I know the money is there before I write a single line of code.", type: "Seller" },
              { name: "Sarah L.", role: "Agency Owner", text: "We use Amano for all our client onboarding. The AI verification step makes our clients feel incredibly secure.", type: "Buyer" },
              { name: "David K.", role: "Digital Asset Trader", text: "The cleanest escrow platform I've used. Fast resolution, zero clutter, and the transaction tracking is flawless.", type: "Buyer & Seller" }
            ].map((review, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  <Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" /><Star className="h-5 w-5 fill-current" />
                </div>
                <p className="text-slate-700 italic mb-8 leading-relaxed font-medium">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold border border-primary/20">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 flex items-center gap-1">
                      {review.name} <ShieldCheck className="h-4 w-4 text-secondary" />
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold uppercase">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 - FINAL CTA */}
      <section className="py-24 relative overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white -z-10"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-8 border border-slate-100">
            <Lock className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 tracking-tight">
            Ready for Safe Transactions?
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium">
            Join the platform that guarantees your funds and peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={user ? "/dashboard" : "/login"}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-primary/20 hover:-translate-y-1"
            >
              Start A Deal
            </Link>
            <Link
              href="#contact"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 px-10 py-4 rounded-full text-lg font-bold transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7 - COMPANY DETAILS (FOOTER) */}
      <footer id="contact" className="bg-slate-950 text-slate-400 py-16 px-4">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-8 w-8 text-white" fill="currentColor" />
              <span className="text-2xl font-bold text-white tracking-tight">AMANO</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm font-medium mb-6">
              Building trust in digital transactions through AI-powered escrow protection and secure payment systems.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 w-fit px-3 py-1.5 rounded-full">
              <Lock className="h-3 w-3 text-accent" /> 256-bit SSL Encryption
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company Details</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li className="flex items-start gap-2">
                <Building className="h-4 w-4 mt-0.5 shrink-0" />
                <div>
                  <div className="text-white font-bold">Amano</div>
                  <div className="text-xs mt-1">Registration: 1720149078309</div>
                  <div className="text-xs text-accent mt-0.5">Registered With FBR</div>
                </div>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer pt-2">
                <Mail className="h-4 w-4" /> support@useamano.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal & Security</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disputes" className="hover:text-white transition-colors">Dispute Policy</Link></li>
              <li><Link href="/licenses" className="hover:text-white transition-colors">Licenses & Registration</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} Amano Secure Escrow. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Fraud Protected</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-accent" /> AI Verified</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
