"use client";

import React, { useState, useEffect } from 'react';
import { Bot, ShieldCheck, Download, ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

// Mock data (in a real app, fetch based on params.id)
const MOCK_CONTRACT = {
  id: "AM-8842",
  title: "Website Development Phase 1",
  buyerName: "TechNova Inc.",
  sellerName: "John Doe Development",
  amount: "4500.00",
  currency: "USD",
  scope: "Full-stack development of the main corporate website including landing page, about us, and contact forms. Must be responsive and use Next.js.",
  timeline: "14 days after approval",
  conditions: "Funds will be released upon successful deployment to production environment and verification of zero critical bugs.",
};

export default function DraftContractPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedContract, setGeneratedContract] = useState<{ id: string, content: string } | null>(null);

  useEffect(() => {
    // Simulate algorithm fetching details and AI drafting
    const timer = setTimeout(() => {
      const uniqueId = `AMANO-PK-INTL-${Math.floor(10000 + Math.random() * 90000)}`;
      const legalDraft = `
CONTRACT OF AGREEMENT
Reference ID: ${uniqueId}
Date: ${new Date().toLocaleDateString()}

This legally binding contract is electronically generated and executed via the Amano Secure Escrow platform. It complies with the electronic transaction laws of Pakistan (Electronic Transactions Ordinance, 2002) and international digital contract standards.

PARTIES:
Buyer: ${MOCK_CONTRACT.buyerName}
Seller: ${MOCK_CONTRACT.sellerName}

1. CONSIDERATION & PAYMENT
The agreed transaction amount is ${MOCK_CONTRACT.currency} ${MOCK_CONTRACT.amount}. These funds have been verified and secured in the Amano Escrow vault.

2. SCOPE OF WORK / OBLIGATIONS
${MOCK_CONTRACT.scope}

3. TIMELINE & DELIVERY
The Seller agrees to complete the delivery within: ${MOCK_CONTRACT.timeline}.

4. CONDITIONS OF RELEASE
${MOCK_CONTRACT.conditions}

5. DISPUTE RESOLUTION
Any dispute arising out of this agreement shall be subject to the mediation and arbitration services provided by Amano Escrow.

By their electronic approval on the platform, both parties assent to these terms.
      `.trim();
      setGeneratedContract({ id: uniqueId, content: legalDraft });
      setIsGenerating(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && generatedContract) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Contract - ${generatedContract.id}</title>
            <style>
              body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; color: #000; }
              h1 { text-align: center; font-size: 24px; text-decoration: underline; margin-bottom: 30px; }
              .header { margin-bottom: 40px; font-weight: bold; }
              .content { white-space: pre-wrap; font-size: 14px; }
              .footer { margin-top: 50px; border-top: 1px solid #ccc; padding-top: 20px; font-size: 12px; text-align: center; color: #666; }
            </style>
          </head>
          <body>
            <h1>OFFICIAL CONTRACT OF AGREEMENT</h1>
            <div class="header">
              Document ID: ${generatedContract.id}<br>
              Issued by: Amano Secure Escrow System
            </div>
            <div class="content">${generatedContract.content}</div>
            <div class="footer">
              This document is electronically generated and holds legal validity under international electronic signature frameworks.
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <Link href={`/dashboard/contracts/${id}`} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Contract Overview
        </Link>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">AI Contract Generation</h1>
        <p className="text-slate-500 mt-2">Payment verified. Drafting official document for Contract {id}</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 md:p-10 rounded-3xl border border-indigo-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 border border-indigo-100 text-indigo-600">
            <Bot className="h-8 w-8" />
          </div>
          <div className="flex-1 w-full">
            <h3 className="text-xl font-bold text-slate-800 mb-2">AI Legal Contract Generator</h3>
            <p className="text-slate-600 mb-6">
              Our AI algorithm is fetching details including names, deal details, and payment confirmation to draft a legally binding contract (compliant in Pakistan and internationally).
            </p>
            
            {isGenerating ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-indigo-600 font-bold px-5 py-4 bg-white rounded-xl border border-indigo-100 shadow-sm w-fit">
                  <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  Fetching details & drafting contract...
                </div>
                {/* Simulated Skeleton/Loading states */}
                <div className="bg-white/50 rounded-xl p-6 border border-indigo-50 space-y-4 animate-pulse">
                  <div className="h-4 bg-indigo-100 rounded w-1/3"></div>
                  <div className="h-4 bg-indigo-100 rounded w-full"></div>
                  <div className="h-4 bg-indigo-100 rounded w-5/6"></div>
                  <div className="h-4 bg-indigo-100 rounded w-2/3"></div>
                </div>
              </div>
            ) : (
              <div className="mt-4 bg-white p-6 md:p-8 rounded-2xl border border-indigo-100 shadow-md space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-sm font-bold text-slate-500 flex items-center gap-2 mb-1">
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      Unique Document ID
                    </div>
                    <div className="text-lg font-bold text-indigo-600 font-mono tracking-tight">{generatedContract?.id}</div>
                  </div>
                  <button 
                    onClick={handleDownloadPDF} 
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-sm transition-colors"
                  >
                    <Download className="h-5 w-5" /> Download PDF
                  </button>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm text-slate-700 whitespace-pre-wrap font-mono leading-relaxed max-h-96 overflow-y-auto">
                  {generatedContract?.content}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
