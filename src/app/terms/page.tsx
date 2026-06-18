import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Terms() {
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
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-8">Amano Terms of Service</h1>
          
          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">1. Definition of Amano's Service</h2>
              <p>Amano provides a digital transaction management platform that helps buyers and sellers conduct transactions securely. Amano temporarily holds funds until the agreed transaction conditions are met and verified by the parties involved. Amano acts solely as a neutral transaction facilitator and does not act as a buyer, seller, agent, contractor, guarantor, employer, or partner in any transaction.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">2. User Eligibility</h2>
              <p className="mb-2">To use Amano's services, users must:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Be at least 18 years of age.</li>
                <li>Have the legal capacity to enter into binding contracts.</li>
                <li>Provide accurate and truthful information during registration and verification.</li>
                <li>Comply with all applicable laws and regulations of Pakistan.</li>
                <li>Not be restricted from using financial or digital transaction services by any competent authority.</li>
              </ul>
              <p className="mt-2">Amano reserves the right to refuse service to any person who does not meet these requirements.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">3. Account Registration Requirements</h2>
              <p className="mb-2">Users may be required to create an Amano account before using certain services. Users agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate and complete registration information.</li>
                <li>Maintain the confidentiality of account credentials.</li>
                <li>Notify Amano immediately of unauthorized account access.</li>
                <li>Keep contact information updated.</li>
                <li>Complete identity verification procedures when requested.</li>
              </ul>
              <p className="mt-2">Users are solely responsible for activities conducted through their accounts.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">4. How Amano Transactions Work</h2>
              <p className="mb-2">The general transaction process is as follows:</p>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Buyer and seller agree on transaction terms.</li>
                <li>Buyer submits payment through the approved payment method.</li>
                <li>Amano confirms receipt of funds.</li>
                <li>Seller provides the agreed product, service, or deliverable.</li>
                <li>Buyer confirms satisfactory completion.</li>
                <li>Amano releases funds to the seller.</li>
              </ol>
              <p className="mt-2">If a dispute arises, funds may be temporarily held until dispute resolution is completed. Amano may request evidence from either party before releasing funds.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">5. Buyer Responsibilities</h2>
              <p className="mb-2">Buyers agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate transaction information.</li>
                <li>Submit payment through approved channels.</li>
                <li>Clearly communicate transaction requirements.</li>
                <li>Inspect and review delivered goods or services promptly.</li>
                <li>Raise disputes honestly and in good faith.</li>
                <li>Not misuse Amano's dispute process.</li>
              </ul>
              <p className="mt-2 font-medium text-slate-800">False claims or fraudulent disputes may result in account suspension.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">6. Seller Responsibilities</h2>
              <p className="mb-2">Sellers agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Deliver products or services as described.</li>
                <li>Fulfill obligations within agreed timelines.</li>
                <li>Maintain professional communication with buyers.</li>
                <li>Provide evidence of delivery or completion when requested.</li>
                <li>Comply with all applicable laws and regulations.</li>
              </ul>
              <p className="mt-2 font-medium text-slate-800">Misrepresentation, fraud, or failure to fulfill agreed obligations may result in account suspension or termination.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">7. Payment Release Process</h2>
              <p className="mb-2">Funds may be released when:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The buyer confirms successful completion of the transaction.</li>
                <li>The agreed review period expires without dispute.</li>
                <li>A dispute decision requires release of funds.</li>
                <li>Both parties jointly authorize the release.</li>
              </ul>
              <p className="mt-2">Amano reserves the right to delay payment release for security reviews, fraud prevention, legal compliance, or dispute investigations.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">8. Dispute Process</h2>
              <p className="mb-2">If a disagreement arises:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Either party may submit a dispute request.</li>
                <li>Amano may request supporting evidence from both parties.</li>
                <li>Evidence may include contracts, messages, invoices, screenshots, delivery records, or other relevant documents.</li>
                <li>Amano will review available information in a fair and neutral manner.</li>
                <li>A decision will be made based on the evidence provided.</li>
              </ul>
              <p className="mt-2">Failure to provide requested information may affect the outcome of a dispute. Amano's decision shall be final unless otherwise required by law.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">9. Prohibited Transactions</h2>
              <p className="mb-2">The following transactions are prohibited:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Illegal products or services.</li>
                <li>Fraudulent schemes.</li>
                <li>Money laundering activities.</li>
                <li>Terrorism financing.</li>
                <li>Stolen goods.</li>
                <li>Counterfeit products.</li>
                <li>Weapons, explosives, or restricted items.</li>
                <li>Adult or obscene content prohibited by law.</li>
                <li>Transactions violating intellectual property rights.</li>
                <li>Transactions intended to evade taxes or regulations.</li>
                <li>Any activity prohibited under Pakistani law.</li>
              </ul>
              <p className="mt-2 font-medium text-slate-800">Amano may suspend or terminate transactions involving prohibited activities without prior notice.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">10. Refund Policy</h2>
              <p className="mb-2">Refunds are not automatic and are determined based on transaction status and dispute outcomes. Refunds may be issued when:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Both parties agree to cancel the transaction.</li>
                <li>The seller fails to deliver the agreed product or service.</li>
                <li>A dispute investigation supports the buyer's claim.</li>
                <li>Amano determines that fraud or unauthorized activity has occurred.</li>
              </ul>
              <p className="mt-2">Approved refunds will be processed through the original payment method whenever reasonably possible.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">11. Account Suspension and Termination</h2>
              <p className="mb-2">Amano may suspend, restrict, or terminate accounts for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Violations of these Terms.</li>
                <li>Fraudulent activity.</li>
                <li>Providing false information.</li>
                <li>Abuse of the platform or dispute process.</li>
                <li>Legal or regulatory requirements.</li>
                <li>Security concerns.</li>
              </ul>
              <p className="mt-2">Suspension or termination does not remove a user's obligation to resolve outstanding transactions.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">12. Limitation of Liability</h2>
              <p className="mb-2">Amano provides its services on an "as available" basis. To the maximum extent permitted by law:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Amano is not responsible for the quality, legality, safety, or suitability of products or services exchanged between users.</li>
                <li>Amano is not liable for indirect, incidental, consequential, or special damages.</li>
                <li>Amano is not responsible for losses resulting from user misconduct, inaccurate information, technical failures, third-party services, or events beyond its reasonable control.</li>
              </ul>
              <p className="mt-2">Amano's role is limited to facilitating transaction management and dispute review.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">13. Governing Law</h2>
              <p>These Terms shall be governed by and interpreted in accordance with the laws of the Islamic Republic of Pakistan. Any legal dispute arising from the use of Amano's services shall be subject to the jurisdiction of the competent courts of Pakistan.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">14. Changes to Terms</h2>
              <p>Amano may update these Terms from time to time. Updated Terms become effective upon publication on the Amano website or platform. Continued use of Amano's services after changes are published constitutes acceptance of the revised Terms. Users are encouraged to review these Terms periodically.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
