import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Disputes() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary tracking-tight">AMANO</span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-primary">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 md:p-12 shadow-sm space-y-12">
          
          {/* Dispute Resolution Policy */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8">Dispute Resolution Policy</h1>
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Filing a Dispute</h2>
                <p>A dispute may be submitted when a transaction does not proceed according to the agreed terms.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Required Evidence</h2>
                <p className="mb-2">Parties may submit:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Contracts</li>
                  <li>Screenshots</li>
                  <li>Emails</li>
                  <li>Chat records</li>
                  <li>Delivery confirmations</li>
                  <li>Invoices</li>
                  <li>Other supporting materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Investigation Process</h2>
                <p>Amano will review all submitted evidence in a fair and neutral manner.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">User Cooperation</h2>
                <p>Users must provide truthful and complete information during dispute investigations.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Resolution</h2>
                <p className="mb-2">After reviewing available evidence, Amano may:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Release funds to the seller</li>
                  <li>Refund the buyer</li>
                  <li>Split funds when appropriate</li>
                  <li>Take any other reasonable action supported by the evidence</li>
                </ul>
                <p className="mt-2 font-medium text-slate-800">Amano's decision shall be final unless otherwise required by law.</p>
              </section>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Refund Policy */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8">Refund Policy</h1>
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Eligibility for Refunds</h2>
                <p className="mb-2">Refund requests may be considered when:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Seller fails to deliver agreed services or products.</li>
                  <li>Both parties agree to cancel the transaction.</li>
                  <li>Fraudulent activity is confirmed.</li>
                  <li>A dispute decision favors the buyer.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Non-Refundable Situations</h2>
                <p className="mb-2">Refunds may be denied when:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Services have been completed as agreed.</li>
                  <li>Buyer approves completion and funds are released.</li>
                  <li>Evidence supports the seller's performance.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Refund Review</h2>
                <p className="mb-2">Amano may request:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Contracts</li>
                  <li>Screenshots</li>
                  <li>Messages</li>
                  <li>Delivery records</li>
                  <li>Invoices</li>
                  <li>Other relevant evidence</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Processing Time</h2>
                <p>Approved refunds will be processed within a reasonable period depending on the payment method used.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Fraudulent Claims</h2>
                <p className="font-medium text-slate-800">Submitting false refund requests may result in account suspension or termination.</p>
              </section>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Seller Protection Policy */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8">Seller Protection Policy</h1>
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Purpose</h2>
                <p>Amano aims to protect sellers from fraudulent claims and unfair disputes.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Seller Protection Requirements</h2>
                <p className="mb-2">To qualify for protection, sellers should:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Clearly define deliverables.</li>
                  <li>Maintain communication records.</li>
                  <li>Deliver services or products as agreed.</li>
                  <li>Retain proof of completion or delivery.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Investigation</h2>
                <p>When a dispute arises, Amano may review all available evidence before making a decision.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Exclusions</h2>
                <p className="mb-2">Seller protection may not apply where:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Fraud is detected.</li>
                  <li>Deliverables differ materially from agreed terms.</li>
                  <li>Seller violates platform policies.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Decision Authority</h2>
                <p>Amano reserves the right to determine eligibility for seller protection based on available evidence.</p>
              </section>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Buyer Protection Policy */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8">Buyer Protection Policy</h1>
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Purpose</h2>
                <p>Amano aims to protect buyers by ensuring funds are not released before agreed transaction conditions are satisfied.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Buyer Protection Coverage</h2>
                <p className="mb-2">Protection may apply when:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Products or services are not delivered.</li>
                  <li>Deliverables significantly differ from agreed terms.</li>
                  <li>Fraudulent conduct is identified.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Buyer Responsibilities</h2>
                <p className="mb-2">Buyers must:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Clearly communicate requirements.</li>
                  <li>Review deliverables promptly.</li>
                  <li>Provide evidence when disputes are filed.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Exclusions</h2>
                <p className="mb-2">Buyer protection may not apply where:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Buyer approves completion of the transaction.</li>
                  <li>Claims are unsupported by evidence.</li>
                  <li>Buyer violates platform policies.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Resolution</h2>
                <p>When buyer protection applies, Amano may issue refunds or take other appropriate action based on the facts of the case.</p>
              </section>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
