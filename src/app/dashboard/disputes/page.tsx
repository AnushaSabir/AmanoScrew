"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function DisputesPage() {
  const { user } = useAuth();
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDisputes();
    }
  }, [user]);

  const fetchDisputes = async () => {
    try {
      const { data, error } = await supabase
        .from('disputes')
        .select(`
          *,
          contract:contracts(id, title),
          initiator:profiles!initiator_id(full_name),
          counterparty:profiles!counterparty_id(full_name)
        `)
        .or(`initiator_id.eq.${user.id},counterparty_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDisputes(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dispute Center</h1>
        <p className="text-sm text-slate-500 mt-1">Manage and resolve disagreements with the help of Amano AI and human mediators.</p>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="p-10 text-center text-slate-500 font-bold">Loading disputes...</div>
        ) : disputes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm">
            <AlertTriangle className="h-10 w-10 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700">No active disputes</h3>
            <p className="text-sm text-slate-500 mt-1">You don't have any ongoing disputes at the moment.</p>
          </div>
        ) : (
          disputes.map((dispute) => {
            const counterpartyName = user?.id === dispute.initiator_id 
              ? dispute.counterparty?.full_name 
              : dispute.initiator?.full_name;

            return (
              <Link href={`/dashboard/disputes/${dispute.id}`} key={dispute.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-primary/50 hover:shadow-md transition-all group block">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 group-hover:bg-amber-100 transition-colors">
                      <AlertTriangle className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors">Dispute for Contract {dispute.contract?.title || dispute.contract_id.split('-')[0].toUpperCase()}</h3>
                      <p className="text-sm text-slate-500 font-medium">Counterparty: {counterpartyName || 'Unknown'}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${
                    dispute.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    'bg-purple-50 text-purple-700 border-purple-200'
                  }`}>
                    {dispute.status}
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-600 line-clamp-2">
                    <span className="font-bold text-slate-700">Reason:</span> {dispute.initiator_reason}
                  </p>
                </div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  );
}
