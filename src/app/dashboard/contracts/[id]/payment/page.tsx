"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building, QrCode, ShieldCheck, Smartphone, CheckCircle, Copy } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type PaymentContract = {
  id: string;
  title: string;
  amount: number;
  currency: string;
};

export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [contract, setContract] = useState<PaymentContract | null>(null);
  const [isLoadingContract, setIsLoadingContract] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [adminVerified, setAdminVerified] = useState(false);

  useEffect(() => {
    const fetchContract = async () => {
      const { data, error } = await supabase
        .from('contracts')
        .select('id,title,amount,currency')
        .eq('id', id)
        .single();

      if (!error && data) {
        setContract({
          id: data.id,
          title: data.title,
          amount: Number(data.amount),
          currency: data.currency || 'PKR',
        });
      }

      setIsLoadingContract(false);
    };

    fetchContract();
  }, [id]);

  const formattedAmount = contract
    ? `${contract.currency} ${contract.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : 'Loading...';

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    supabase.from('contracts').update({ status: 'Payment Verifying' }).eq('id', id).then(() => {});
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
      
      // Simulate sending SMS to admin
      setTimeout(() => {
        setAlertSent(true);
      }, 1000);
    }, 2000);
  };

  const handleSimulateAdminVerify = () => {
    setAdminVerified(true);
    supabase.from('contracts').update({ status: 'Active Contract' }).eq('id', id).then(() => {});
    // After admin verifies, navigate to draft page
    setTimeout(() => {
      router.push(`/dashboard/contracts/${id}/draft`);
    }, 1500);
  };

  if (isLoadingContract) {
    return <div className="p-20 text-center">Loading payment details...</div>;
  }

  if (!contract) {
    return <div className="p-20 text-center">Contract not found.</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-4xl mx-auto space-y-8 pb-20">
      
      <div>
        <Link href={`/dashboard/contracts/${id}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Contract
        </Link>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Deposit Funds into Escrow</h1>
        <p className="text-slate-500 mt-2">Securely deposit the agreed amount for {contract.title}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-bold text-slate-800">Amano Secure Vault</div>
              <div className="text-xs text-slate-500">Funds are held securely until conditions are met</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">Amount Due</div>
            <div className="text-2xl font-bold text-slate-900">{formattedAmount}</div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {!paymentDone ? (
            <>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 mb-6 text-slate-700 font-bold border-b border-slate-200 pb-4">
                  <Building className="h-5 w-5 text-primary" /> Company Bank Transfer Details
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Bank Name</div>
                      <div className="font-medium text-slate-800">Bank Alfalah Limited</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Account Title</div>
                      <div className="font-medium text-slate-800">Amano</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Account Number</div>
                      <div className="flex items-center gap-2">
                        <code className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-sm text-slate-800">59135002922584</code>
                        <button className="p-1.5 text-slate-400 hover:text-primary transition-colors bg-white border border-slate-200 rounded-lg"><Copy className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center space-y-3 p-4 bg-white rounded-xl border border-slate-200 shrink-0">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scan to Pay</div>
                    <div className="w-32 h-32 bg-slate-100 flex items-center justify-center rounded-lg border border-slate-200 overflow-hidden relative">
                      {/* Using standard img tag, user must place qr-code.jpg in public folder */}
                      <img src="/qr-code.jpg" alt="Bank Alfalah QR Code" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden') }} />
                      <QrCode className="h-12 w-12 text-slate-300 absolute hidden" />
                    </div>
                    <div className="text-xs text-slate-400 text-center max-w-[150px]">Use your banking app to scan and pay directly.</div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex gap-3 text-amber-800 text-sm">
                <ShieldCheck className="h-5 w-5 shrink-0 text-amber-600" />
                <p><strong>Note:</strong> Please ensure you deposit the exact amount of <strong>{formattedAmount}</strong>. After making the transfer, click the button below. Your payment will be manually verified by our team.</p>
              </div>

              <button 
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Marking as Paid...
                  </>
                ) : (
                  <>Confirm, I have paid {formattedAmount}</>
                )}
              </button>
            </>
          ) : (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Payment Notified!</h2>
              <p className="text-slate-600 max-w-md mx-auto">
                We have notified the admin. Your funds will be marked as secured in the Amano Escrow vault as soon as the admin verifies the receipt in the bank.
              </p>

              {/* Simulated SMS Alert */}
              <div className={`mt-8 max-w-sm mx-auto bg-slate-800 text-white p-4 rounded-xl shadow-lg transition-all duration-500 transform ${alertSent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 hidden'}`}>
                <div className="flex items-start gap-3">
                  <Smartphone className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-left">
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Simulated SMS to Admin</div>
                    <div className="text-sm">User marked {formattedAmount} as paid for Contract {id} via Bank Transfer. Please verify receipt in Admin Panel.</div>
                  </div>
                </div>
              </div>

              {alertSent && !adminVerified && (
                <div className="pt-8 border-t border-slate-100 mt-8">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Testing Tools</div>
                  <button 
                    onClick={handleSimulateAdminVerify}
                    className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl shadow-md hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
                  >
                    <ShieldCheck className="h-5 w-5" /> Simulate Admin Verification
                  </button>
                  <p className="text-xs text-slate-500 mt-3 max-w-sm mx-auto">
                    In production, the Admin would see the SMS, log into the Admin panel, and click verify. Clicking this simulates that action.
                  </p>
                </div>
              )}

              {adminVerified && (
                <div className="pt-8 flex flex-col items-center gap-3 text-purple-600 font-bold">
                  <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  Admin Verified! Redirecting to AI Contract Generator...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
