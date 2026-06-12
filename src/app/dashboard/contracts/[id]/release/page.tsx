"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, FileText, ShieldCheck, UserCircle } from 'lucide-react';

type Role = 'Buyer' | 'Seller' | 'Admin';
type Status = 'Active Contract' | 'Proof Uploaded' | 'Buyer Approved' | 'Completed';

export default function ReleasePaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  const [currentUserRole, setCurrentUserRole] = useState<Role>('Seller');
  const [status, setStatus] = useState<Status>('Active Contract');
  
  const [proofFileName, setProofFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isAIChecking, setIsAIChecking] = useState(false);

  const handleUploadProof = () => {
    if (!proofFileName) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsAIChecking(true);
      setTimeout(() => {
        setIsAIChecking(false);
        setStatus('Proof Uploaded');
      }, 3000);
    }, 1500);
  };

  const handleBuyerApprove = () => {
    setStatus('Buyer Approved');
  };

  const handleAdminRelease = () => {
    setStatus('Completed');
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Header & Dev Tools */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href={`/dashboard/contracts/${resolvedParams.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Contract
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Payment Release Workflow</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Contract {resolvedParams.id}</p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <div className="text-xs font-bold text-slate-400 px-2 uppercase tracking-wider hidden sm:block">Testing Tools:</div>
          <select 
            value={currentUserRole}
            onChange={(e) => setCurrentUserRole(e.target.value as Role)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 outline-none"
          >
            <option value="Seller">View as Seller</option>
            <option value="Buyer">View as Buyer</option>
            <option value="Admin">View as Admin</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        
        {/* Step 1: Seller uploads proof */}
        <div className={`p-6 rounded-2xl border ${status === 'Active Contract' ? 'bg-indigo-50/50 border-indigo-200' : 'bg-slate-50 border-slate-200'} mb-6 transition-colors`}>
          <h3 className={`font-bold mb-4 flex items-center gap-2 ${status === 'Active Contract' ? 'text-indigo-800' : 'text-slate-600'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${status === 'Active Contract' ? 'bg-indigo-600' : 'bg-slate-400'}`}>1</div>
            Upload Proof of Work (Seller)
          </h3>
          
          {status === 'Active Contract' ? (
            <div className="pl-8">
              {currentUserRole === 'Seller' ? (
                <>
                  <p className="text-sm text-slate-600 mb-4">Task completed? Upload screenshots of your work to demand payment release. Our AI will cross-check the demands.</p>
                  {isAIChecking ? (
                    <div className="flex items-center gap-3 text-indigo-600 font-bold p-4 bg-indigo-100 rounded-xl">
                      <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                      AI is cross-checking proof against contract conditions...
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="file" 
                        className="text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                        onChange={(e) => setProofFileName(e.target.files?.[0]?.name || "")}
                        disabled={isUploading}
                      />
                      <button 
                        onClick={handleUploadProof} 
                        disabled={!proofFileName || isUploading}
                        className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl disabled:bg-slate-300 transition-colors"
                      >
                        {isUploading ? 'Uploading...' : 'Upload & Demand Release'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-slate-500">Waiting for Seller to complete the task and upload proof of work.</p>
              )}
            </div>
          ) : (
             <div className="pl-8 flex items-center gap-2 text-sm font-bold text-emerald-600">
               <CheckCircle className="h-5 w-5" /> Proof uploaded and AI-verified.
             </div>
          )}
        </div>

        {/* Step 2: Buyer Approves */}
        <div className={`p-6 rounded-2xl border ${status === 'Proof Uploaded' ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50 border-slate-200'} mb-6 transition-colors`}>
          <h3 className={`font-bold mb-4 flex items-center gap-2 ${status === 'Proof Uploaded' ? 'text-blue-800' : 'text-slate-600'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${status === 'Proof Uploaded' ? 'bg-blue-600' : 'bg-slate-400'}`}>2</div>
            Buyer Approval
          </h3>
          
          <div className="pl-8">
            {status === 'Active Contract' && (
              <p className="text-sm text-slate-400">Locked until Seller uploads proof.</p>
            )}
            
            {status === 'Proof Uploaded' && (
              <div>
                {currentUserRole === 'Buyer' ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-slate-600">The Seller has submitted the work. Please review and approve the payment release.</p>
                    <button 
                      onClick={handleBuyerApprove}
                      className="w-fit px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors shadow-md shadow-primary/20"
                    >
                      Approve Payment Release
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Waiting for Buyer to review and approve payment release.</p>
                )}
              </div>
            )}
            
            {(status === 'Buyer Approved' || status === 'Completed') && (
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                <CheckCircle className="h-5 w-5" /> Buyer has approved the release.
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Admin Final Release */}
        <div className={`p-6 rounded-2xl border ${status === 'Buyer Approved' ? 'bg-purple-50/50 border-purple-200' : 'bg-slate-50 border-slate-200'} transition-colors`}>
          <h3 className={`font-bold mb-4 flex items-center gap-2 ${status === 'Buyer Approved' ? 'text-purple-800' : 'text-slate-600'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${status === 'Buyer Approved' ? 'bg-purple-600' : 'bg-slate-400'}`}>3</div>
            Admin Final Release
          </h3>
          
          <div className="pl-8">
            {(status === 'Active Contract' || status === 'Proof Uploaded') && (
              <p className="text-sm text-slate-400">Locked until Buyer approves.</p>
            )}
            
            {status === 'Buyer Approved' && (
              <div>
                <p className="text-sm text-slate-600 mb-4">Notification sent to Admin. Waiting for final verification and transfer.</p>
                {currentUserRole === 'Admin' && (
                  <button 
                    onClick={handleAdminRelease}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors shadow-md shadow-purple-600/20 flex items-center gap-2"
                  >
                    <ShieldCheck className="h-5 w-5" /> Finalize Payment Transfer
                  </button>
                )}
              </div>
            )}
            
            {status === 'Completed' && (
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <CheckCircle className="h-6 w-6" /> Payment Released Successfully! Contract is now closed.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
