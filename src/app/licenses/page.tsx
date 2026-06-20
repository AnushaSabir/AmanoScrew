import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Licenses() {
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
          
          {/* AML & KYC Policy */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8">AML & KYC Policy</h1>
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Purpose</h2>
                <p>Amano is committed to preventing money laundering, terrorism financing, fraud, and other illegal activities.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Customer Verification</h2>
                <p className="mb-2">Amano may request:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>National ID card</li>
                  <li>Passport</li>
                  <li>Business registration documents</li>
                  <li>Proof of ownership of payment methods</li>
                  <li>Additional verification documents</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Risk Monitoring</h2>
                <p className="mb-2">Transactions may be reviewed for:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Unusual activity</li>
                  <li>High-risk behavior</li>
                  <li>Suspicious payment patterns</li>
                  <li>Regulatory concerns</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Reporting Obligations</h2>
                <p>Where required by law, Amano may report suspicious activities to relevant authorities.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Refusal of Service</h2>
                <p>Amano may refuse, suspend, or terminate services if identity verification requirements are not satisfied.</p>
              </section>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Acceptable Use Policy */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8">Acceptable Use Policy</h1>
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Prohibited Uses</h2>
                <p className="mb-2">Users must not use Amano for:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Illegal activities</li>
                  <li>Fraudulent transactions</li>
                  <li>Money laundering</li>
                  <li>Stolen goods</li>
                  <li>Counterfeit products</li>
                  <li>Unauthorized financial services</li>
                  <li>Intellectual property violations</li>
                  <li>Terrorism financing</li>
                  <li>Harassment or abuse of other users</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">User Obligations</h2>
                <p>Users must provide accurate information and cooperate during investigations.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Policy Violations</h2>
                <p className="font-medium text-slate-800">Violation of this policy may result in immediate suspension or termination of services.</p>
              </section>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Additional Legal Clauses */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8">Additional Legal Clauses</h1>
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">No Guarantee Clause</h2>
                <p>Amano does not guarantee the quality, legality, safety, delivery, performance, or outcome of any goods or services exchanged between users. Users are solely responsible for evaluating and conducting transactions with one another.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Liability Cap</h2>
                <p>To the maximum extent permitted by law, Amano's total liability arising from any transaction shall not exceed the total fees paid to Amano for that specific transaction.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Evidence Clause</h2>
                <p>Users are responsible for maintaining and providing accurate records, communications, contracts, screenshots, invoices, and other evidence necessary to support their claims during dispute investigations.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Force Majeure Clause</h2>
                <p>Amano shall not be liable for delays, interruptions, or failures caused by events beyond its reasonable control, including banking outages, internet failures, power disruptions, cyberattacks, government actions, natural disasters, or other force majeure events.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Neutral Platform Clause</h2>
                <p>Amano acts solely as a neutral transaction management and dispute-resolution platform. Amano is not a buyer, seller, employer, employee, contractor, agent, guarantor, or representative of any user or transaction.</p>
              </section>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
