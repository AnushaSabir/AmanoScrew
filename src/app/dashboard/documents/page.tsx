import React from 'react';
import { Upload, FileText } from 'lucide-react';

export default function DocumentsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Documents</h1>
          <p className="text-sm text-slate-500 mt-1">Securely store and manage your transaction related files.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors">
          <Upload className="h-4 w-4" /> Upload Document
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
          <FileText className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">No documents found</h3>
        <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
          Upload identification documents, invoices, or other files needed for your escrow transactions.
        </p>
      </div>
    </div>
  );
}
