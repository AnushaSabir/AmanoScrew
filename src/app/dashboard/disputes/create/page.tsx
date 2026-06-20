"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldAlert, ArrowLeft, Search, FileText, Send, User, Paperclip } from 'lucide-react';

export default function CreateDisputePage() {
  const [contractId, setContractId] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [contractDetails, setContractDetails] = useState<any>(null);
  
  const [reason, setReason] = useState("");
  const [evidenceName, setEvidenceName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleFetchContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractId) return;
    
    setIsFetching(true);
    setContractDetails(null);
    
    // Simulate AI/Algorithm fetching contract details
    setTimeout(() => {
      setIsFetching(false);
      setContractDetails({
        id: contractId.toUpperCase(),
        title: "Website Development Phase 1",
        amount: "4500.00",
        currency: "USD",
        counterparty: "John Doe Development"
      });
    }, 1500);
  };

  const handleSubmitDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return;

    setIsSubmitting(true);
    // Simulate API submission and email notification
    setTimeout(() => {
      setIsSubmitting(false);
      // Pass the contract ID to the detail page (mock)
      router.push(`/dashboard/disputes/${contractDetails.id}?created=true`);
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-3xl mx-auto space-y-8 pb-20">
      <div>
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Arise a Dispute</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Register a dispute on an active contract before payment release.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
        
        {/* Step 1: Fetch Contract */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-slate-700 mb-2">1. Enter Contract ID</label>
          <form onSubmit={handleFetchContract} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                required
                value={contractId}
                onChange={(e) => setContractId(e.target.value)}
                placeholder="e.g. AM-8842"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
              />
            </div>
            <button 
              type="submit"
              disabled={isFetching || !contractId}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isFetching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Fetching...
                </>
              ) : 'Fetch Details'}
            </button>
          </form>
        </div>

        {/* Step 2: Contract Details & Dispute Form */}
        {contractDetails && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Contract Details Fetched</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Contract ID</div>
                  <div className="font-bold text-slate-800 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" /> {contractDetails.id}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Title</div>
                  <div className="font-bold text-slate-800">{contractDetails.title}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Amount Escrowed</div>
                  <div className="font-bold text-emerald-600">{contractDetails.currency} {contractDetails.amount}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Counterparty</div>
                  <div className="font-bold text-slate-800 flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" /> {contractDetails.counterparty}
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitDispute} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">2. Reason for Dispute</label>
                <textarea
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain exactly why you are arising this dispute. What went wrong?"
                  className="w-full p-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[150px] bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">3. Upload Evidence</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative cursor-pointer">
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setEvidenceName(e.target.files?.[0]?.name || "")}
                  />
                  <div className="flex flex-col items-center justify-center pointer-events-none">
                    <Paperclip className={`h-8 w-8 mb-2 ${evidenceName ? 'text-primary' : 'text-slate-400'}`} />
                    <span className={`text-sm font-bold ${evidenceName ? 'text-slate-800' : 'text-slate-600'}`}>
                      {evidenceName || 'Click or drag files to upload evidence'}
                    </span>
                    {!evidenceName && <span className="text-xs text-slate-400 mt-1">Screenshots, PDFs, or Docx</span>}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-500 max-w-sm">
                  Submitting this will freeze the contract. The counterparty will be notified via email to respond with their narrative.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting || !reason}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Notifying Counterparty...
                    </>
                  ) : (
                    <>
                      Register Dispute <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
