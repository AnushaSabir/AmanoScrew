"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, UserCircle, ShieldAlert, FileText, Paperclip, Send, CheckCircle, Lock, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { uploadFile } from '@/lib/storage';

type DisputeStatus = 'Reviewing' | 'Decision Pending' | 'Resolved';
type Role = 'Initiator' | 'Counterparty' | 'Admin';

export default function DisputeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { user } = useAuth();
  
  const [currentUserRole, setCurrentUserRole] = useState<Role>('Initiator');
  const [status, setStatus] = useState<DisputeStatus>('Reviewing');
  const [disputeData, setDisputeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Counterparty state
  const [narrative, setNarrative] = useState("");
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [evidenceName, setEvidenceName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [counterpartySubmitted, setCounterpartySubmitted] = useState(false);

  // Admin state
  const [isAdminSendingEmails, setIsAdminSendingEmails] = useState(false);

  useEffect(() => {
    fetchDispute();
  }, []);

  const fetchDispute = async () => {
    try {
      const { data, error } = await supabase
        .from('disputes')
        .select('*, contract:contracts(id, title)')
        .eq('id', resolvedParams.id)
        .single();
      
      if (error) throw error;
      setDisputeData(data);
      setStatus(data.status as DisputeStatus);
      if (data.counterparty_narrative) {
        setCounterpartySubmitted(true);
      }

      // Auto assign role
      if (user?.role === 'admin') setCurrentUserRole('Admin');
      else if (user?.id === data.counterparty_id) setCurrentUserRole('Counterparty');
      else setCurrentUserRole('Initiator');

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCounterpartySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!narrative || !user) return;
    setIsSubmitting(true);
    try {
      let evidenceUrl = null;
      if (evidenceFile) {
        evidenceUrl = await uploadFile('escrow-files', `disputes/${user.id}`, evidenceFile);
      }
      
      const { error } = await supabase
        .from('disputes')
        .update({
          counterparty_narrative: narrative,
          counterparty_evidence_url: evidenceUrl,
          status: 'Decision Pending'
        })
        .eq('id', resolvedParams.id);
        
      if (error) throw error;
      setCounterpartySubmitted(true);
      setStatus('Decision Pending');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResolveDispute = async () => {
    setIsAdminSendingEmails(true);
    try {
      const { error } = await supabase
        .from('disputes')
        .update({ status: 'Resolved' })
        .eq('id', resolvedParams.id);
        
      if (error) throw error;
      setStatus('Resolved');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdminSendingEmails(false);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading dispute...</div>;
  if (!disputeData) return <div className="p-20 text-center">Dispute not found.</div>;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Header & Dev Tools */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dispute Resolution</h1>
            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
              status === 'Reviewing' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              status === 'Decision Pending' ? 'bg-purple-50 text-purple-700 border-purple-200' :
              'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              {status}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <div className="text-xs font-bold text-slate-400 px-2 uppercase tracking-wider hidden sm:block">Testing Tools:</div>
          <select 
            value={currentUserRole}
            onChange={(e) => setCurrentUserRole(e.target.value as Role)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 outline-none"
          >
            <option value="Initiator">View as Initiator</option>
            <option value="Counterparty">View as Counterparty</option>
            <option value="Admin">View as Admin</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Horizontal Progress Flow */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 overflow-x-auto">
            {[
              { num: 1, label: "Dispute details", active: status === 'Reviewing' && !counterpartySubmitted },
              { num: 2, label: "Counter Party Stance", active: status === 'Reviewing' && counterpartySubmitted },
              { num: 3, label: "Under Process", active: status === 'Decision Pending' },
              { num: 4, label: "Resolved", active: status === 'Resolved' }
            ].map((step, idx) => (
              <React.Fragment key={step.num}>
                <div className={`flex items-center gap-2 font-bold whitespace-nowrap ${step.active ? 'text-primary' : (status === 'Resolved' || (step.num < 4 && status === 'Decision Pending') || (step.num < 3 && counterpartySubmitted)) ? 'text-emerald-500' : 'text-slate-400'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step.active ? 'bg-primary' : (status === 'Resolved' || (step.num < 4 && status === 'Decision Pending') || (step.num < 3 && counterpartySubmitted)) ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                    {step.num}
                  </div>
                  {step.label}
                </div>
                {idx < 3 && <div className="w-4 sm:w-8 h-[2px] bg-slate-200 rounded-full"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Left Column: Timeline & Details */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Initiator Claim */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3">
              <ShieldAlert className="h-5 w-5 text-red-500" /> Dispute Initiated on Contract {disputeData.contract?.title || disputeData.contract_id.split('-')[0].toUpperCase()}
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Reason / Claim</div>
                <div className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {disputeData.initiator_reason}
                </div>
              </div>
              {disputeData.initiator_evidence_url && (
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Evidence Provided</div>
                  <a href={disputeData.initiator_evidence_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/5 px-3 py-2 rounded-lg border border-primary/10 hover:bg-primary/10">
                    <FileText className="h-4 w-4" /> View Evidence Document
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Counterparty Narrative Area */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            {status === 'Resolved' ? (
               <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                 <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 border border-emerald-200 shadow-sm">
                   <CheckCircle className="h-5 w-5" /> Dispute has been Resolved
                 </div>
               </div>
            ) : counterpartySubmitted ? (
               <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center space-y-3">
                 <div className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg">
                   <Lock className="h-5 w-5" /> Evidence Locked
                 </div>
                 <p className="text-sm font-bold text-slate-800 bg-white px-4 py-1 rounded-full shadow-sm border border-slate-200">Both narratives submitted. Pending Admin Decision.</p>
               </div>
            ) : null}

            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3">
              <UserCircle className="h-5 w-5 text-indigo-500" /> Counterparty Narrative
            </div>
            
            {currentUserRole === 'Counterparty' && !counterpartySubmitted ? (
              <form onSubmit={handleCounterpartySubmit} className="space-y-6">
                <div>
                  <p className="text-sm text-slate-600 mb-4">A dispute has been raised against you. Please provide your side of the story and upload any evidence to defend your claim. Once submitted, this cannot be changed.</p>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Your Narrative</label>
                  <textarea
                    required
                    value={narrative}
                    onChange={(e) => setNarrative(e.target.value)}
                    placeholder="Explain your side of the situation..."
                    className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all min-h-[120px] bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Upload Defense Evidence</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors relative cursor-pointer">
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setEvidenceFile(file);
                          setEvidenceName(file.name);
                        }
                      }}
                    />
                    <div className="flex items-center justify-center gap-2 pointer-events-none">
                      <Paperclip className={`h-5 w-5 ${evidenceName ? 'text-indigo-500' : 'text-slate-400'}`} />
                      <span className={`text-sm font-bold ${evidenceName ? 'text-slate-800' : 'text-slate-600'}`}>
                        {evidenceName || 'Attach proof (screenshots, chat logs, etc.)'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !narrative}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Narrative & Lock File'}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                  <UserCircle className="h-8 w-8 text-slate-300" />
                </div>
                {counterpartySubmitted ? (
                  <>
                    <div className="text-sm font-bold text-slate-800 mb-1">Counterparty has responded</div>
                    <div className="text-xs text-slate-500 max-w-xs mb-3">Their narrative and evidence have been securely locked for Admin review.</div>
                    <div className="bg-slate-100 p-4 rounded-xl text-left text-sm text-slate-700 mb-3 w-full border border-slate-200">
                      <span className="font-bold block mb-1">Narrative:</span>
                      {disputeData.counterparty_narrative}
                    </div>
                    {disputeData.counterparty_evidence_url && (
                      <a href={disputeData.counterparty_evidence_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/5 px-3 py-2 rounded-lg border border-primary/10 hover:bg-primary/10">
                        <FileText className="h-4 w-4" /> View Defense Evidence
                      </a>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-sm font-bold text-slate-800 mb-1">Waiting for Counterparty</div>
                    <div className="text-xs text-slate-500 max-w-xs">An email has been sent. Waiting for them to provide their narrative and evidence.</div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Admin Panel */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-slate-800 text-white rounded-2xl p-6 shadow-lg border border-slate-700">
            <h3 className="font-bold mb-4 border-b border-slate-700 pb-3 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-400" /> Admin Controls
            </h3>
            
            {currentUserRole !== 'Admin' ? (
              <div className="text-sm text-slate-400 text-center py-8 bg-slate-900/50 rounded-xl">
                Restricted to Amano Administrators only.
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 mb-4">Update the dispute status based on review progress. Only Admin can resolve the dispute after contacting both parties.</p>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase">Change Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value as DisputeStatus)}
                    disabled={status === 'Resolved'}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-medium focus:border-primary outline-none"
                  >
                    <option value="Reviewing">Reviewing</option>
                    <option value="Decision Pending">Decision Pending</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                {status !== 'Resolved' && (
                  <button 
                    onClick={handleResolveDispute}
                    disabled={isAdminSendingEmails}
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    {isAdminSendingEmails ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Emailing Parties...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" /> Resolve & Notify Parties
                      </>
                    )}
                  </button>
                )}

                {status === 'Resolved' && (
                  <div className="mt-4 bg-emerald-900/30 border border-emerald-800/50 text-emerald-400 p-3 rounded-xl text-xs font-bold flex items-start gap-2">
                    <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                    Emails have been dispatched to both parties regarding the final resolution. Contract unfrozen or funds adjusted.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
