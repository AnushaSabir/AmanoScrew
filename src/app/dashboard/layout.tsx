"use client";

import { useEffect, useState } from "react";
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
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("amano-notifications-read") === "true";
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const markAllNotificationsRead = () => {
    setNotificationsRead(true);
    localStorage.setItem("amano-notifications-read", "true");
  };

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col md:flex-row font-sans overflow-x-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0 md:h-screen md:sticky md:top-0">
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between md:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-[#0B1F3A]" fill="currentColor" />
            <span className="text-xl font-bold text-[#0B1F3A] tracking-tight">AMANO</span>
          </Link>
        </div>
        
        <nav className="md:flex-1 px-4 py-3 md:py-6 md:space-y-1 overflow-x-auto md:overflow-y-auto flex md:block gap-2">
          <div className="hidden md:block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">Main</div>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/5 text-primary font-bold transition-colors whitespace-nowrap">
            <LayoutDashboard className="h-5 w-5" />
            Overview
          </Link>
          <Link href="/dashboard/contracts" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium whitespace-nowrap">
            <FileSignature className="h-5 w-5" />
            Contracts
          </Link>
          {/* Hidden for now: Wallet feature planned for future use
          <Link href="/dashboard/wallet" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium">
            <Wallet className="h-5 w-5" />
            Escrow Wallet
          </Link>
          */}
          <Link href="/dashboard/documents" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium whitespace-nowrap">
            <Upload className="h-5 w-5" />
            Documents
          </Link>

          <div className="hidden md:block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 mt-8 px-3">Support</div>
          <Link href="/dashboard/disputes" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium whitespace-nowrap">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Dispute Center
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium whitespace-nowrap">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 hidden md:block">
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
      <main className="flex-1 flex flex-col min-h-screen md:h-screen overflow-hidden">
        {/* Top Header */}
        <header className="min-h-16 bg-white border-b border-slate-200 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-8 py-3 shrink-0">
          <div className="font-semibold text-slate-800">Dashboard</div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 transition-colors rounded-lg ${showNotifications ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Bell className="h-5 w-5" />
                {!notificationsRead && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-80 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
                    <button
                      type="button"
                      onClick={markAllNotificationsRead}
                      disabled={notificationsRead}
                      className="text-xs text-primary font-bold hover:underline disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed"
                    >
                      {notificationsRead ? "All read" : "Mark all read"}
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
                    <div className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${notificationsRead ? 'bg-white' : 'bg-blue-50/50'}`}>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <Bell className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">Welcome to Amano!</p>
                          <p className="text-xs text-slate-500 mt-0.5">Your account is ready for secure escrow transactions.</p>
                          <p className="text-[10px] text-slate-400 mt-2 font-medium">Just now</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
            <div className="hidden sm:flex text-sm font-semibold text-slate-600 items-center gap-2">
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
