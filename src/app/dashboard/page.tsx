"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Wallet, 
  FileText, 
  Clock, 
  CheckCircle, 
  ShieldCheck,
  MoreVertical,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Download
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [contracts, setContracts] = useState<any[]>([]);
  const [loadingContracts, setLoadingContracts] = useState(true);

  useEffect(() => {
    if (user) {
      fetchContracts();
    }
  }, [user]);

  const fetchContracts = async () => {
    try {
      const { data, error } = await supabase
        .from('contracts')
        .select(`
          id,
          title,
          status,
          amount,
          initiator_role,
          buyer:profiles!buyer_id(full_name),
          seller:profiles!seller_id(full_name)
        `)
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContracts(data || []);
    } catch (error) {
      console.error('Error fetching contracts:', error);
    } finally {
      setLoadingContracts(false);
    }
  };

  if (isLoading) {
    return <div className="p-10 flex justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  }

  if (!user) {
    return <div className="p-10 text-center text-slate-500">Please log in to view your dashboard.</div>;
  }

  const activeContractsCount = contracts.filter(c => c.status !== 'Completed').length;
  const totalBalance = contracts.reduce((acc, curr) => acc + Number(curr.amount), 0); // Mock balance based on contracts for now

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome back, {user?.name || user?.email?.split('@')[0]}</h1>
            <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 border border-green-200">
              <ShieldCheck className="h-3 w-3" /> Verified
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Here is what's happening with your escrow accounts today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
            <Download className="h-4 w-4" /> Export
          </button>
          <Link href="/dashboard/contracts/create" className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-primary/20 flex items-center gap-2">
            <Plus className="h-4 w-4" /> Create New Deal
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Value Locked</h3>
            <div className="p-2 bg-blue-50 text-secondary rounded-lg border border-blue-100">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-4xl font-extrabold text-slate-900">${totalBalance.toLocaleString()}</span>
          </div>
          <p className="text-xs font-medium text-slate-400">Locked in Amano Vault (Simulated)</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Contracts</h3>
            <div className="p-2 bg-primary/5 text-primary rounded-lg border border-primary/10">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-4xl font-extrabold text-slate-900">{activeContractsCount}</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-primary w-2/3 h-full rounded-full"></div>
          </div>
          <p className="text-xs font-medium text-slate-400 mt-2">Currently processing</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-shadow relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/5 rounded-full blur-xl"></div>
          <div className="flex items-center justify-between mb-6 relative">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Security Status</h3>
            <div className="p-2 bg-green-50 text-accent rounded-lg border border-green-100">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-center gap-3 mb-2 relative">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-accent" />
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">Fully Protected</div>
              <p className="text-xs font-medium text-slate-500">AI monitoring active</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Transactions List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 text-lg">Recent Deals</h2>
            <button className="text-sm text-secondary font-bold hover:underline px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">View All</button>
          </div>
          <div className="divide-y divide-slate-100 flex-1">
            {loadingContracts ? (
              <div className="p-10 flex justify-center text-slate-400 text-sm font-bold">Loading contracts...</div>
            ) : contracts.length === 0 ? (
              <div className="p-10 flex flex-col items-center justify-center text-center">
                <FileText className="h-10 w-10 text-slate-300 mb-3" />
                <div className="text-slate-500 font-bold">No contracts found</div>
                <div className="text-sm text-slate-400">Create a new deal to get started</div>
              </div>
            ) : contracts.map((tx) => {
              const displayId = tx.id.split('-')[0].toUpperCase();
              let colorClass = "text-amber-600 bg-amber-50 border-amber-200";
              if (tx.status === 'Completed') colorClass = "text-accent bg-green-50 border-green-200";
              if (tx.status === 'Funds Deposited') colorClass = "text-secondary bg-blue-50 border-blue-200";

              return (
                <Link href={`/dashboard/contracts/${tx.id}`} key={tx.id} className="p-6 flex items-center justify-between hover:bg-slate-50/80 transition-colors group cursor-pointer block">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-slate-300 transition-colors">
                      <FileText className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-0.5">{tx.title}</h4>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <span>{tx.initiator_role}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-slate-400">ID: {displayId}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <div className="font-bold text-slate-900">${tx.amount}</div>
                      <div className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border mt-1 ${colorClass}`}>
                        {tx.status === 'Completed' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {tx.status}
                      </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Column: Actions & Alerts */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-slate-800 text-lg mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/dashboard/contracts/create" className="w-full text-left flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all group shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-primary text-white rounded-lg shadow-sm">
                    <Plus className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Create Contract</div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5">Start a new secure deal</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
              </Link>
              <button className="w-full text-left flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all group shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white border border-slate-200 text-secondary rounded-lg shadow-sm">
                    <Wallet className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Deposit Funds</div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5">Add to escrow balance</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-secondary transition-colors" />
              </button>
            </div>
          </div>

          {/* Dispute Center Placeholder */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-secondary/30 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="p-2 bg-white/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              </div>
              <h3 className="font-bold text-lg">Dispute Center</h3>
            </div>
            <p className="text-sm text-slate-300 font-medium leading-relaxed mb-6 relative z-10">
              Having trouble with a transaction? Our team and AI mediators are here to help resolve issues fairly.
            </p>
            <Link href="/dashboard/disputes" className="w-full block text-center py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl backdrop-blur-md transition-colors relative z-10">
              Open a Dispute
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
