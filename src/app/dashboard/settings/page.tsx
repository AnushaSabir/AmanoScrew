import React from 'react';
import { Settings, User, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account preferences and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 text-primary font-bold rounded-xl text-sm border border-slate-200">
            <User className="h-4 w-4" /> Profile Information
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-xl text-sm transition-colors border border-transparent hover:border-slate-200">
            <Shield className="h-4 w-4" /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-medium rounded-xl text-sm transition-colors border border-transparent hover:border-slate-200">
            <Bell className="h-4 w-4" /> Notifications
          </button>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Profile Information</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Enter first name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Enter last name" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Enter email address" />
            </div>
            <div className="pt-4 flex justify-end">
              <button className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
