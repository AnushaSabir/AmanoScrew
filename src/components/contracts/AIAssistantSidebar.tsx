import React from 'react';
import { Sparkles, AlertTriangle, Info, CheckCircle, FileSearch, ShieldAlert } from 'lucide-react';

interface AIAssistantSidebarProps {
  status: string;
}

export default function AIAssistantSidebar({ status }: AIAssistantSidebarProps) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-slate-800 bg-slate-900/50 flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg border border-primary/30">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-white">Amano AI</h3>
          <p className="text-xs font-medium text-slate-400">Contract Intelligence</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-6 overflow-y-auto flex-1">
        
        {/* Summarization */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <FileSearch className="h-4 w-4" /> Summary
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-xl border border-slate-800">
            This is a standard web development contract for $4,500. The delivery timeline is 14 days. Funds will be released upon production deployment and bug verification.
          </p>
        </div>

        {/* Risk Analysis */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" /> Risk Analysis
          </h4>
          <div className="space-y-3">
            <div className="bg-amber-900/20 border border-amber-900/50 rounded-xl p-3 flex gap-3">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-amber-500">Timeline Conflict</div>
                <div className="text-xs text-amber-500/80 mt-1">14 days might be too short for the specified scope. Consider extending to 21 days.</div>
              </div>
            </div>
            <div className="bg-emerald-900/20 border border-emerald-900/50 rounded-xl p-3 flex gap-3">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-emerald-500">Clear Conditions</div>
                <div className="text-xs text-emerald-500/80 mt-1">Fund release conditions are well-defined and measurable.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Recommendations */}
        {status !== 'Active Contract' && status !== 'Completed' && (
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Info className="h-4 w-4" /> Recommendations
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                <span>Add a clause for revision rounds (e.g. max 2 revisions included).</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                <span>Specify who owns the intellectual property before final payment.</span>
              </li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
