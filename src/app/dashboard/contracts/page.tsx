import React from 'react';
import { FileSignature, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ContractsPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Contracts</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and view your active and past agreements.</p>
        </div>
        <Link 
          href="/dashboard/contracts/create" 
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> New Contract
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-0">
          <Link href="/dashboard/contracts/AM-8842" className="block hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                  <FileSignature className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-500">AM-8842</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Pending Approval</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Website Development Phase 1</h3>
                  <p className="text-sm text-slate-500 mt-1">Buyer: TechNova Inc. • Seller: John Doe Development</p>
                </div>
              </div>
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 w-full md:w-auto">
                <div className="text-lg font-bold text-slate-800">$4500.00</div>
                <div className="text-sm font-semibold text-primary">View Contract &rarr;</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
