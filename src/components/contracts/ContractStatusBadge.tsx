import React from 'react';
import { Clock, Edit3, CheckCircle, ShieldCheck, XCircle, FileText } from 'lucide-react';

type Status = 
  | 'Pending Approval' 
  | 'Revision Requested' 
  | 'Approved' 
  | 'Payment Pending'
  | 'Payment Verifying'
  | 'Active Contract' 
  | 'Proof Uploaded'
  | 'Buyer Approved'
  | 'Rejected' 
  | 'Completed';

interface ContractStatusBadgeProps {
  status: Status;
  className?: string;
}

export default function ContractStatusBadge({ status, className = "" }: ContractStatusBadgeProps) {
  const styles = {
    'Pending Approval': {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      icon: <Clock className="h-3 w-3" />
    },
    'Revision Requested': {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: <Edit3 className="h-3 w-3" />
    },
    'Approved': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: <CheckCircle className="h-3 w-3" />
    },
    'Payment Pending': {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      icon: <Clock className="h-3 w-3" />
    },
    'Payment Verifying': {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
      icon: <ShieldCheck className="h-3 w-3" />
    },
    'Active Contract': {
      bg: 'bg-green-50',
      text: 'text-accent',
      border: 'border-green-200',
      icon: <ShieldCheck className="h-3 w-3" />
    },
    'Proof Uploaded': {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      icon: <FileText className="h-3 w-3" />
    },
    'Buyer Approved': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: <CheckCircle className="h-3 w-3" />
    },
    'Rejected': {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      icon: <XCircle className="h-3 w-3" />
    },
    'Completed': {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-300',
      icon: <FileText className="h-3 w-3" />
    }
  };

  const style = styles[status];

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${style.bg} ${style.text} ${style.border} ${className}`}>
      {style.icon}
      {status}
    </div>
  );
}
