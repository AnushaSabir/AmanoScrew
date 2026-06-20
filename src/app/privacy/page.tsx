import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Privacy() {
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
          
          {/* Privacy Policy */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8">Privacy Policy</h1>
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Information We Collect</h2>
                <p className="mb-2">Amano may collect:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>National ID information when required</li>
                  <li>Payment information</li>
                  <li>Transaction details</li>
                  <li>Communication records</li>
                  <li>Device and browser information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">How We Use Information</h2>
                <p className="mb-2">We use collected information to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide and improve our services</li>
                  <li>Process transactions</li>
                  <li>Verify user identity</li>
                  <li>Prevent fraud and abuse</li>
                  <li>Resolve disputes</li>
                  <li>Comply with legal obligations</li>
                  <li>Communicate important account updates</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Information Sharing</h2>
                <p className="mb-2 font-medium text-slate-800">Amano does not sell personal information.</p>
                <p className="mb-2">Information may be shared:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>When required by law</li>
                  <li>With payment service providers</li>
                  <li>During dispute investigations</li>
                  <li>To prevent fraud or illegal activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Data Security</h2>
                <p>Amano uses reasonable technical and organizational measures to protect user information from unauthorized access, loss, or misuse.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Data Retention</h2>
                <p>Information may be retained as long as necessary for legal, operational, security, and regulatory purposes.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">User Rights</h2>
                <p>Users may request access, correction, or deletion of personal information where permitted by applicable law.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Changes to This Policy</h2>
                <p>Amano may update this Privacy Policy from time to time. Continued use of the platform constitutes acceptance of any revisions.</p>
              </section>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Cookie Policy */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8">Cookie Policy</h1>
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">What Are Cookies</h2>
                <p>Cookies are small files stored on your device that help websites function properly and improve user experience.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">How Amano Uses Cookies</h2>
                <p className="mb-2">Cookies may be used to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Maintain user sessions</li>
                  <li>Improve security</li>
                  <li>Analyze website performance</li>
                  <li>Remember user preferences</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Managing Cookies</h2>
                <p className="mb-2">Users may modify browser settings to reject or delete cookies.</p>
                <p>Some website features may not function correctly if cookies are disabled.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Changes</h2>
                <p>Amano may update this Cookie Policy periodically.</p>
              </section>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
