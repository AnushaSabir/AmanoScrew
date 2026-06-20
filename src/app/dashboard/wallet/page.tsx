import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

export default function EscrowWalletPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Escrow Wallet</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your funds and view transaction history securely.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-white/10 p-2 rounded-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-bold bg-white/10 px-2.5 py-1 rounded-full text-slate-200">USD</span>
          </div>
          <div className="text-sm font-medium text-slate-400 mb-1">Available Balance</div>
          <div className="text-3xl font-bold">$0.00</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
            <ArrowDownRight className="h-6 w-6 text-emerald-500" />
          </div>
          <div className="text-sm font-bold text-slate-800">Deposit Funds</div>
          <p className="text-xs text-slate-500 mt-1">Add money to your escrow balance</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
            <ArrowUpRight className="h-6 w-6 text-blue-500" />
          </div>
          <div className="text-sm font-bold text-slate-800">Withdraw Funds</div>
          <p className="text-xs text-slate-500 mt-1">Transfer to your bank account</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Recent Transactions</h2>
        </div>
        <div className="p-6 sm:p-10 md:p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
            <DollarSign className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">No transaction history</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Your transaction history will appear here once you start dealing on the platform.
          </p>
        </div>
      </div>
    </div>
  );
}
