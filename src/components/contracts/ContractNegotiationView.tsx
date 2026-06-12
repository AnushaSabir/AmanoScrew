import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle, 
  XCircle, 
  Edit3, 
  MessageSquare, 
  History, 
  Lock, 
  Download,
  AlertCircle,
  DollarSign,
  ShieldCheck,
  Bot,
  FileText,
  ArrowRight
} from 'lucide-react';
import ContractStatusBadge from './ContractStatusBadge';

type Role = 'Buyer' | 'Seller';
type Status = 'Pending Approval' | 'Revision Requested' | 'Approved' | 'Payment Pending' | 'Payment Verifying' | 'Active Contract' | 'Proof Uploaded' | 'Buyer Approved' | 'Rejected' | 'Completed';

interface ContractData {
  id: string;
  title: string;
  buyerName: string;
  sellerName: string;
  amount: string;
  currency: string;
  scope: string;
  timeline: string;
  conditions: string;
  status: Status;
  creatorRole: Role;
}

interface ContractNegotiationViewProps {
  initialData: ContractData;
  currentUserRole: Role;
  onStatusChange: (newStatus: Status) => void;
}

export default function ContractNegotiationView({ initialData, currentUserRole, onStatusChange }: ContractNegotiationViewProps) {
  const router = useRouter();
  const [data, setData] = useState<ContractData>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<ContractData>(initialData);
  const [comments, setComments] = useState<{author: string, text: string, time: string}[]>([
    { author: "System", text: "Contract created and sent for review.", time: "2 hours ago" }
  ]);
  const [newComment, setNewComment] = useState("");

  const isCounterparty = currentUserRole !== data.creatorRole;
  const isLocked = ['Active Contract', 'Proof Uploaded', 'Buyer Approved', 'Completed', 'Rejected'].includes(data.status);

  // States for Release Workflow
  const [proofFileName, setProofFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isAIChecking, setIsAIChecking] = useState(false);

  const handleAccept = () => {
    // If the counterparty accepts, it goes to "Approved" (waiting for final lock) or directly to "Active Contract"
    // Let's implement the "Final Approval Lock" phase.
    if (data.status === 'Pending Approval' || data.status === 'Revision Requested') {
      onStatusChange('Approved');
      setData(prev => ({ ...prev, status: 'Approved' }));
      addComment("System", `${currentUserRole} has accepted the terms. Waiting for final lock.`);
    } else if (data.status === 'Approved') {
      onStatusChange('Payment Pending');
      setData(prev => ({ ...prev, status: 'Payment Pending' }));
      addComment("System", `Contract terms locked. Waiting for payment.`);
    }
  };

  const handleMakePayment = () => {
    // Route to payment page
    router.push(`/dashboard/contracts/${data.id}/payment`);
  };

  const handleAdminVerify = () => {
    onStatusChange('Active Contract');
    setData(prev => ({ ...prev, status: 'Active Contract' }));
    addComment("System", `Payment verified by Admin. Contract is now ACTIVE.`);
    // In a real app, this would route to draft after verifying
    router.push(`/dashboard/contracts/${data.id}/draft`);
  };

  const handleReject = () => {
    onStatusChange('Rejected');
    setData(prev => ({ ...prev, status: 'Rejected' }));
    addComment("System", `${currentUserRole} has rejected the contract.`);
  };

  const handleRequestRevision = () => {
    setIsEditing(true);
  };

  const submitRevision = () => {
    setData({ ...editData, status: 'Revision Requested' });
    setIsEditing(false);
    onStatusChange('Revision Requested');
    addComment(currentUserRole, `Requested revisions to the contract.`);
  };

  // --- Payment Release Workflow ---
  const handleUploadProof = () => {
    if (!proofFileName) return;
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setIsAIChecking(true);
      // Simulate AI cross-checking demands
      setTimeout(() => {
        setIsAIChecking(false);
        onStatusChange('Proof Uploaded');
        setData(prev => ({ ...prev, status: 'Proof Uploaded' }));
        addComment("System", `AI Algorithm verified uploaded proof matches contract demands. Requesting Buyer Approval.`);
      }, 3000);
    }, 1500);
  };

  const handleBuyerApprove = () => {
    onStatusChange('Buyer Approved');
    setData(prev => ({ ...prev, status: 'Buyer Approved' }));
    addComment("System", `Buyer approved payment release. SMS/Email notification sent to Admin.`);
  };

  const handleAdminRelease = () => {
    onStatusChange('Completed');
    setData(prev => ({ ...prev, status: 'Completed' }));
    addComment("System", `Admin finalized payment release. Funds transferred to Seller. Contract Completed.`);
  };



  const addComment = (author: string, text: string) => {
    setComments(prev => [...prev, { author, text, time: "Just now" }]);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(currentUserRole, newComment);
      setNewComment("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Contract Area */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Actions Bar */}
        {!isLocked && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Your Action Required:</span>
            </div>
            
            <div className="flex gap-3">
              {data.status === 'Approved' && (
                <button onClick={handleAccept} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors">
                  <Lock className="h-4 w-4" /> Final Approve & Lock
                </button>
              )}
              
              {data.status === 'Payment Pending' && (
                <button onClick={handleMakePayment} className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-bold rounded-xl shadow-md shadow-accent/20 hover:bg-accent/90 transition-colors">
                  <DollarSign className="h-4 w-4" /> Make Payment
                </button>
              )}

              {data.status === 'Payment Verifying' && (
                <button onClick={handleAdminVerify} className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white text-sm font-bold rounded-xl shadow-md shadow-purple-600/20 hover:bg-purple-700 transition-colors">
                  <ShieldCheck className="h-4 w-4" /> Simulate Admin Verification
                </button>
              )}

              {(data.status === 'Pending Approval' || data.status === 'Revision Requested') && (
                <>
                  <button onClick={handleReject} className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 text-sm font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                  
                  {!isEditing && (
                    <button onClick={handleRequestRevision} className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 text-sm font-bold rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
                      <Edit3 className="h-4 w-4" /> Request Revision
                    </button>
                  )}
                  
                  {!isEditing && (
                    <button onClick={handleAccept} className="flex items-center gap-2 px-5 py-2 bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-500/20 hover:bg-emerald-600 transition-colors">
                      <CheckCircle className="h-4 w-4" /> Accept Terms
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {isLocked && (
          <div className="bg-green-50 p-4 rounded-2xl border border-green-200 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-green-800">
              <Lock className="h-5 w-5" />
              <div>
                <div className="font-bold">Contract Immutable</div>
                <div className="text-sm font-medium text-green-700/80">This agreement is securely locked.</div>
              </div>
            </div>

            {/* Release Workflow Link */}
            <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm mt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-bold text-slate-800">Ready to release funds?</div>
                <div className="text-sm text-slate-500">Go to the dedicated Payment Release page to upload proof, review work, and finalize payment.</div>
              </div>
              <Link 
                href={`/dashboard/contracts/${data.id}/release`}
                className="px-6 py-2.5 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl transition-colors shadow-md shadow-accent/20 flex items-center gap-2 whitespace-nowrap"
              >
                Go to Payment Release <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}



        {/* Contract Document */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 p-6 sm:p-8 flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Contract ID: {data.id}</div>
              <h2 className="text-2xl font-bold text-slate-800">{data.title}</h2>
            </div>
            <ContractStatusBadge status={data.status} className="text-sm px-3 py-1.5" />
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Parties</h4>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-500">Buyer</span>
                    <span className="text-sm font-bold text-slate-800">{data.buyerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-slate-500">Seller</span>
                    <span className="text-sm font-bold text-slate-800">{data.sellerName}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Transaction</h4>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-500">Amount</span>
                    {isEditing ? (
                      <input 
                        type="number" 
                        value={editData.amount}
                        onChange={e => setEditData({...editData, amount: e.target.value})}
                        className="w-24 px-2 py-1 text-sm border border-primary rounded"
                      />
                    ) : (
                      <span className="text-sm font-bold text-slate-800">{data.currency} {data.amount}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Scope of Work</h4>
              {isEditing ? (
                <textarea 
                  value={editData.scope}
                  onChange={e => setEditData({...editData, scope: e.target.value})}
                  className="w-full p-3 border border-primary rounded-xl min-h-[100px] text-sm"
                />
              ) : (
                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{data.scope}</div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Delivery Timeline</h4>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editData.timeline}
                    onChange={e => setEditData({...editData, timeline: e.target.value})}
                    className="w-full p-2 border border-primary rounded-xl text-sm"
                  />
                ) : (
                  <div className="text-sm font-medium text-slate-800">{data.timeline}</div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Conditions for Fund Release</h4>
              {isEditing ? (
                <textarea 
                  value={editData.conditions}
                  onChange={e => setEditData({...editData, conditions: e.target.value})}
                  className="w-full p-3 border border-primary rounded-xl min-h-[100px] text-sm"
                />
              ) : (
                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100">{data.conditions}</div>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
                <button onClick={submitRevision} className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors">Submit Revisions</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar: Timeline & Comments */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="p-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
            <History className="h-4 w-4 text-slate-400" />
            <h3 className="font-bold text-slate-800 text-sm">Negotiation History</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {comments.map((comment, idx) => (
              <div key={idx} className={`flex flex-col ${comment.author === 'System' ? 'items-center' : (comment.author === currentUserRole ? 'items-end' : 'items-start')}`}>
                {comment.author === 'System' ? (
                  <div className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full my-2">
                    {comment.text}
                  </div>
                ) : (
                  <div className={`max-w-[85%] rounded-2xl p-3 ${comment.author === currentUserRole ? 'bg-primary text-white rounded-tr-sm' : 'bg-slate-100 text-slate-800 rounded-tl-sm'}`}>
                    <div className="text-xs font-bold mb-1 opacity-70">{comment.author}</div>
                    <div className="text-sm">{comment.text}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Add a comment or note..."
                className="flex-1 text-sm p-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                onKeyDown={e => e.key === 'Enter' && handleAddComment()}
              />
              <button 
                onClick={handleAddComment}
                className="p-2.5 bg-primary text-white rounded-xl shadow-sm hover:bg-primary/90 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
