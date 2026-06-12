"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { 
  Shield, 
  LayoutDashboard, 
  FileSignature, 
  Wallet, 
  Upload, 
  AlertTriangle,
  LogOut,
  Settings,
  Bell
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between md:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" fill="currentColor" />
            <span className="text-xl font-bold text-primary tracking-tight">AMANO</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">Main</div>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/5 text-primary font-bold transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Overview
          </Link>
          <Link href="/dashboard/contracts" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium">
            <FileSignature className="h-5 w-5" />
            Contracts
          </Link>
          {/* Hidden for now: Wallet feature planned for future use
          <Link href="/dashboard/wallet" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium">
            <Wallet className="h-5 w-5" />
            Escrow Wallet
          </Link>
          */}
          <Link href="/dashboard/documents" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium">
            <Upload className="h-5 w-5" />
            Documents
          </Link>

          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 mt-8 px-3">Support</div>
          <Link href="/dashboard/disputes" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Dispute Center
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm uppercase">
              {user.name.substring(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">Verified User</p>
            </div>
          </div>
          <button 
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors font-medium text-sm"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="font-semibold text-slate-800">Dashboard</div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" /> Secure Session
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
