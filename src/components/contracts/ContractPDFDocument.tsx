import React from 'react';
import { Download, ShieldCheck } from 'lucide-react';

interface ContractPDFDocumentProps {
  contractId: string;
  amount: string;
  status: string;
}

export default function ContractPDFDocument({ contractId, amount, status }: ContractPDFDocumentProps) {
  const isPrintable = ['Active Contract', 'Proof Uploaded', 'Buyer Approved', 'Completed'].includes(status);

  const handlePrint = () => {
    window.print();
  };

  if (!isPrintable) return null;

  return (
    <>
      {/* UI Button */}
      <button 
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 text-sm font-bold rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
      >
        <Download className="h-4 w-4" /> Download PDF
      </button>

      {/* Print-only Layout */}
      <div className="hidden print:block fixed inset-0 bg-white z-[9999] p-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-12 pb-8 border-b-2 border-slate-200">
            <div>
              <div className="text-3xl font-extrabold tracking-tighter text-slate-900 mb-2">AMANO</div>
              <div className="text-sm font-bold text-slate-500">Secure Escrow Agreement</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-slate-800">{contractId}</div>
              <div className="text-sm text-slate-500 mt-1">Generated: {new Date().toLocaleDateString()}</div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-accent bg-green-50 px-2 py-1 rounded mt-2 border border-green-200">
                <ShieldCheck className="h-3 w-3" /> SECURELY LOCKED
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">1. Parties</h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-sm font-bold text-slate-500 mb-1">Buyer</div>
                  <div className="text-lg text-slate-900">TechNova Inc.</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-500 mb-1">Seller</div>
                  <div className="text-lg text-slate-900">John Doe Development</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">2. Transaction Details</h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-sm font-bold text-slate-500 mb-1">Amount Escrowed</div>
                  <div className="text-2xl font-bold text-slate-900">{amount}</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">3. Signatures & Digital Locks</h2>
              <p className="text-sm text-slate-600 mb-6">
                This document is a cryptographic representation of a legally binding smart contract established on the Amano Secure Escrow Platform. Both parties have cryptographically signed and approved these terms.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div className="border-t-2 border-slate-300 pt-4">
                  <div className="text-sm font-bold text-slate-800">Buyer Authorized Signature</div>
                  <div className="text-xs text-slate-500 mt-1">Digital Lock ID: 0x8A7F...3B9C</div>
                </div>
                <div className="border-t-2 border-slate-300 pt-4">
                  <div className="text-sm font-bold text-slate-800">Seller Authorized Signature</div>
                  <div className="text-xs text-slate-500 mt-1">Digital Lock ID: 0x2E1D...9F4A</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
