"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { uploadFile } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  CheckCircle, 
  FileText, 
  User, 
  Clock, 
  DollarSign,
  ShieldCheck,
  Paperclip
} from "lucide-react";

export default function CreateContractWizard() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    dealType: "",
    yourName: "",
    counterpartyName: "",
    counterpartyEmail: "",
    counterpartyMobile: "",
    role: "Buyer",
    amount: "",
    currency: "PKR",
    scope: "",
    timeline: "",
    milestones: "",
    conditions: "",
    notes: "",
    natureOfDeal: "",
    itemPictureName: ""
  });
  const [itemPictureFile, setItemPictureFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [createdContractId, setCreatedContractId] = useState("");

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      const needsItemPicture = formData.dealType === 'Online Shopping' || formData.dealType === 'Online Buy/Sell';
      if (needsItemPicture && !formData.itemPictureName) {
        setError("Please upload a picture of the item before proceeding. This is compulsory for E-commerce/Online Marketplace deals.");
        return;
      }
    }
    setError("");
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to create a contract.");
      return;
    }

    const amount = Number(formData.amount);
    if (!formData.title.trim()) {
      setError("Please enter a contract title.");
      return;
    }
    if (!formData.dealType) {
      setError("Please select a deal type.");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Please enter a valid contract amount.");
      return;
    }
    if (!formData.counterpartyEmail.trim() && !formData.counterpartyMobile.trim()) {
      setError("Please enter the counterparty email or mobile number.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      let itemPictureUrl = null;
      if (itemPictureFile) {
        itemPictureUrl = await uploadFile('escrow-files', `items/${user.id}`, itemPictureFile);
        if (!itemPictureUrl) {
          throw new Error("Failed to upload item picture.");
        }
      }

      // We no longer check profiles locally here; the API route handles linking existing users safely.
      const buyerId = formData.role === 'Buyer' ? user.id : null;
      const sellerId = formData.role === 'Seller' ? user.id : null;

      const contractPayload = {
        title: formData.title,
        status: 'Pending Approval',
        deal_type: formData.dealType,
        nature_of_deal: formData.natureOfDeal,
        amount,
        currency: formData.currency,
        buyer_id: buyerId,
        seller_id: sellerId,
        initiator_role: formData.role,
        counterparty_email: formData.counterpartyEmail,
        counterparty_phone: formData.counterpartyMobile,
        counterparty_name: formData.counterpartyName,
        scope: formData.scope,
        timeline: formData.timeline,
        milestones: formData.milestones,
        conditions: formData.conditions,
        notes: formData.notes,
        item_picture_url: itemPictureUrl
      };

      const res = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractPayload),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || 'Failed to create contract');
      }

      setCreatedContractId(responseData.id);
      
      // If the user does not exist (or hasn't fully registered with a username), send an invite email
      // Existing users with a username will get a dashboard notification directly via the API.
      if (formData.counterpartyEmail && !responseData.isExistingUser) {
        try {
          await fetch('/api/invite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: formData.counterpartyEmail.trim().toLowerCase(),
              title: formData.title,
              inviterName: formData.yourName || user.email,
              isExistingUser: responseData.isExistingUser
            })
          });
        } catch (inviteErr) {
          console.error("Failed to send email notification", inviteErr);
        }
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while creating the contract.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center max-w-2xl mx-auto shadow-sm">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Contract Created Successfully</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Your contract "{formData.title || 'Untitled'}" has been sent to {formData.counterpartyName || 'the other party'} for review. The status is now <span className="font-semibold text-slate-700">Pending Approval</span>.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="px-6 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Back to Dashboard
          </button>
          <button 
            onClick={() => window.location.href = `/dashboard/contracts/${createdContractId}`}
            className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors"
          >
            View Contract
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Progress Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Create New Contract</h2>
        <div className="flex items-center justify-between relative overflow-x-auto pb-8">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>
          
          {[
            { step: 1, label: "Basics", icon: User },
            { step: 2, label: "Details", icon: FileText },
            { step: 3, label: "Conditions", icon: ShieldCheck },
            { step: 4, label: "Review", icon: CheckCircle }
          ].map((s) => (
            <div key={s.step} className="relative z-10 flex flex-col items-center group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${
                currentStep >= s.step 
                  ? "bg-primary border-primary text-white" 
                  : "bg-white border-slate-300 text-slate-400"
              }`}>
                <s.icon className="h-4 w-4" />
              </div>
              <span className={`absolute -bottom-6 text-xs font-bold whitespace-nowrap ${
                currentStep >= s.step ? "text-slate-800" : "text-slate-400"
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 sm:p-8 mt-4">
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Contract Basics</h3>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Contract Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => updateForm('title', e.target.value)}
                placeholder="e.g. Website Development Phase 1"
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Type Of Your deal</label>
              <select 
                value={formData.dealType}
                onChange={(e) => updateForm('dealType', e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none bg-white"
              >
                <option value="" disabled>Select deal type</option>
                <option value="Freelance">Freelance</option>
                <option value="Online Shopping">Online Shopping</option>
                <option value="Online Buy/Sell">Online Buy/Sell</option>
                <option value="Visa Process">Visa Process</option>
                <option value="Other">Other</option>
              </select>
              {formData.dealType === 'Other' && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nature of Deal</label>
                  <input 
                    type="text" 
                    value={formData.natureOfDeal}
                    onChange={(e) => updateForm('natureOfDeal', e.target.value)}
                    placeholder="Specify the nature of your deal..."
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              )}
              {(formData.dealType === 'Online Shopping' || formData.dealType === 'Online Buy/Sell') && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Item Picture <span className="text-red-500">*Compulsory</span></label>
                  <p className="text-xs text-slate-500 mb-3">A clear picture of the item is required to help Admin verify the item condition before releasing payments later.</p>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*"
                      required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setItemPictureFile(file);
                          updateForm('itemPictureName', file.name);
                        }
                      }}
                    />
                    <div className="flex flex-col items-center justify-center pointer-events-none">
                      <Paperclip className={`h-6 w-6 mb-2 ${formData.itemPictureName ? 'text-primary' : 'text-slate-400'}`} />
                      <span className={`text-sm font-bold ${formData.itemPictureName ? 'text-slate-800' : 'text-slate-600'}`}>
                        {formData.itemPictureName || 'Click or drag item picture here'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
                <input 
                  type="text" 
                  value={formData.yourName}
                  onChange={(e) => updateForm('yourName', e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">My Role</label>
                <div className="flex rounded-xl overflow-hidden border border-slate-200 p-1 bg-slate-50">
                  <button 
                    type="button"
                    onClick={() => updateForm('role', 'Buyer')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${formData.role === 'Buyer' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Buyer
                  </button>
                  <button 
                    type="button"
                    onClick={() => updateForm('role', 'Seller')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${formData.role === 'Seller' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Seller
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mt-6">
              <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <User className="h-4 w-4 text-primary" /> Counterparty Details
              </h4>
              <p className="text-xs text-slate-500 mb-4">Provide details of the other party. We'll invite them if they don't have an account.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.counterpartyEmail}
                    onChange={(e) => updateForm('counterpartyEmail', e.target.value)}
                    placeholder="user@example.com"
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                  <input 
                    type="tel" 
                    value={formData.counterpartyMobile}
                    onChange={(e) => updateForm('counterpartyMobile', e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Name / Username</label>
                  <input 
                    type="text" 
                    value={formData.counterpartyName}
                    onChange={(e) => updateForm('counterpartyName', e.target.value)}
                    placeholder="Company or Individual Name"
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                  </div>
                  <input 
                    type="number" 
                    value={formData.amount}
                    onChange={(e) => updateForm('amount', e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-9 p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Currency</label>
                <select 
                  value={formData.currency}
                  onChange={(e) => updateForm('currency', e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none bg-white"
                >
                  <option value="PKR">PKR - Pakistani Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Project Details</h3>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Scope of Work / Product Details</label>
              <textarea 
                value={formData.scope}
                onChange={(e) => updateForm('scope', e.target.value)}
                placeholder="Describe exactly what is being delivered, required features, and specifications..."
                className="w-full p-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[150px]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Delivery Timeline</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  value={formData.timeline}
                  onChange={(e) => updateForm('timeline', e.target.value)}
                  placeholder="e.g. 14 days after contract approval, or specific date"
                  className="w-full pl-9 p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Conditions & Milestones</h3>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Conditions for Fund Release</label>
              <textarea 
                value={formData.conditions}
                onChange={(e) => updateForm('conditions', e.target.value)}
                placeholder="What exactly needs to happen for the funds to be released? (e.g., Code deployed to production and verified working without critical bugs)"
                className="w-full p-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[120px]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Milestones (Optional)</label>
              <textarea 
                value={formData.milestones}
                onChange={(e) => updateForm('milestones', e.target.value)}
                placeholder="Break down the payment into milestones if applicable..."
                className="w-full p-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[120px]"
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Review & Submit</h3>
            
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-4">
              <div className="flex justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Contract Title</div>
                  <div className="font-bold text-slate-800">{formData.title || 'Not specified'}</div>
                  <div className="text-sm text-slate-500 mb-1 mt-2">Deal Type</div>
                  <div className="font-bold text-slate-800">
                    {formData.dealType === 'Other' ? formData.natureOfDeal || 'Other' : (formData.dealType || 'Not specified')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500 mb-1">Amount</div>
                  <div className="font-bold text-slate-800">{formData.currency} {formData.amount || '0.00'}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Your Name</div>
                  <div className="font-bold text-slate-800">{formData.yourName || 'Not specified'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">My Role</div>
                  <div className="font-bold text-slate-800">{formData.role}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Other Party</div>
                  <div className="font-bold text-slate-800">{formData.counterpartyName || 'Not specified'}</div>
                  <div className="text-xs text-slate-500 mt-1">{formData.counterpartyEmail || formData.counterpartyMobile || 'No contact provided'}</div>
                </div>
                {(formData.dealType === 'Online Shopping' || formData.dealType === 'Online Buy/Sell') && (
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Item Picture</div>
                    <div className="inline-flex items-center gap-1 font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                      <Paperclip className="h-3 w-3" /> {formData.itemPictureName}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="text-sm text-slate-500 mb-1">Timeline</div>
                <div className="font-medium text-slate-800">{formData.timeline || 'Not specified'}</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Attachments (Optional)</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <Paperclip className="h-6 w-6 text-slate-400 mb-2" />
                <div className="font-bold text-slate-700 text-sm">Upload Proof Files or Reference Docs</div>
                <div className="text-xs text-slate-500 mt-1">PDF, DOCX, PNG, JPG up to 10MB</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Special Notes</label>
              <textarea 
                value={formData.notes}
                onChange={(e) => updateForm('notes', e.target.value)}
                placeholder="Any private notes or special terms..."
                className="w-full p-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[100px]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative">
        {currentStep > 1 ? (
          <button 
            type="button" 
            onClick={prevStep}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        ) : (
          <button 
            type="button" 
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-400 cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <button 
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Save className="h-4 w-4" /> Save Draft
          </button>
          
          {error && (
            <div className="max-w-sm bg-red-100 text-red-600 text-xs font-bold px-4 py-2 rounded-lg shadow-sm border border-red-200 animate-in fade-in slide-in-from-bottom-2">
              {error}
            </div>
          )}
          
          {currentStep < 4 ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-accent rounded-xl hover:bg-accent/90 transition-colors shadow-md shadow-accent/20 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" /> Create Contract
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
