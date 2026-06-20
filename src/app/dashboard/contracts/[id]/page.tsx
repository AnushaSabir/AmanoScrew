"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, UserCircle } from 'lucide-react';
import Link from 'next/link';
import ContractNegotiationView from '@/components/contracts/ContractNegotiationView';
import AIAssistantSidebar from '@/components/contracts/AIAssistantSidebar';
import ContractPDFDocument from '@/components/contracts/ContractPDFDocument';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

type Status = 'Pending Approval' | 'Revision Requested' | 'Approved' | 'Payment Pending' | 'Payment Verifying' | 'Active Contract' | 'Proof Uploaded' | 'Buyer Approved' | 'Rejected' | 'Completed';

export default function ContractDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [contractId, setContractId] = useState<string>('');
  const { user } = useAuth();
  const [currentUserRole, setCurrentUserRole] = useState<'Buyer' | 'Seller'>('Buyer');
  const [contractStatus, setContractStatus] = useState<Status>('Pending Approval');
  const [contractData, setContractData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(p => {
      setContractId(p.id);
      fetchContract(p.id);
    });
  }, [params]);

  const fetchContract = async (id: string) => {
    try {
      // Allow searching by exact ID or just showing mock if not found (for legacy testing)
      if (id === 'AM-8842' || id === 'test-id-123') {
        setContractData({
          id: id,
          title: "Website Development Phase 1",
          buyerName: "TechNova Inc.",
          sellerName: "John Doe Development",
          amount: "4500.00",
          currency: "USD",
          scope: "Full-stack development of the main corporate website.",
          timeline: "14 days after approval",
          conditions: "Funds will be released upon successful deployment.",
          status: "Pending Approval",
          creatorRole: "Buyer",
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('contracts')
        .select(`
          *,
          buyer:profiles!buyer_id(full_name),
          seller:profiles!seller_id(full_name)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        const currentUserName = user?.name || user?.email || 'Current User';
        const buyerName = data.buyer?.full_name
          || (data.initiator_role === 'Buyer' ? currentUserName : data.counterparty_name)
          || 'Buyer';
        const sellerName = data.seller?.full_name
          || (data.initiator_role === 'Seller' ? currentUserName : data.counterparty_name)
          || 'Seller';

        // Transform DB data to match ContractData interface
        setContractData({
          id: data.id,
          title: data.title,
          buyerName,
          sellerName,
          amount: Number(data.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          currency: data.currency,
          scope: data.scope || data.nature_of_deal || 'No scope provided',
          timeline: data.timeline || 'TBD',
          conditions: data.conditions || 'Standard terms apply',
          status: data.status,
          creatorRole: data.initiator_role,
        });
        setContractStatus(data.status as Status);
        
        // Auto-assign role based on login
        if (user?.id === data.seller_id) {
          setCurrentUserRole('Seller');
        } else {
          setCurrentUserRole('Buyer');
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading contract details...</div>;
  if (!contractData) return <div className="p-20 text-center">Contract not found.</div>;

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-8 pb-20">
      
      {/* Header & Dev Tools */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Contract Details</h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <div className="text-xs font-bold text-slate-400 px-2 uppercase tracking-wider hidden sm:block">Testing Tools:</div>
          <button 
            onClick={() => setCurrentUserRole(prev => prev === 'Buyer' ? 'Seller' : 'Buyer')}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors"
          >
            <UserCircle className="h-4 w-4 text-primary" />
            View as: {currentUserRole}
          </button>
          
          <ContractPDFDocument 
            contractId={contractData.id.split('-')[0]} 
            title={contractData.title}
            buyerName={contractData.buyerName}
            sellerName={contractData.sellerName}
            amount={`${contractData.currency} ${contractData.amount}`}
            scope={contractData.scope}
            timeline={contractData.timeline}
            conditions={contractData.conditions}
            status={contractStatus} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3">
          <ContractNegotiationView 
            initialData={contractData}
            currentUserRole={currentUserRole}
            onStatusChange={async (newStatus) => {
              setContractStatus(newStatus);
              // Optimistically update DB
              if (contractData.id !== 'AM-8842' && contractData.id !== 'test-id-123') {
                 await supabase.from('contracts').update({ status: newStatus }).eq('id', contractData.id);
              }
            }}
          />
        </div>
        <div className="xl:col-span-1 h-[600px] xl:h-auto">
          <AIAssistantSidebar status={contractStatus} />
        </div>
      </div>

    </div>
  );
}
