"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { User, Shield, Bell, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({ full_name: '', email: '', phone: '' });
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (!error && data) {
        setProfileData({
          full_name: data.full_name || user.name || '',
          email: data.email || user.email || '',
          phone: data.phone || ''
        });
      } else {
        setProfileData({
          full_name: user.name || '',
          email: user.email || '',
          phone: ''
        });
      }
    } catch (err) {
      console.error(err);
      setProfileData({
        full_name: user.name || '',
        email: user.email || '',
        phone: ''
      });
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account preferences and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 font-bold rounded-xl text-sm transition-colors border ${activeTab === 'profile' ? 'bg-slate-50 text-primary border-slate-200' : 'text-slate-600 border-transparent hover:bg-slate-50 hover:border-slate-200'}`}
          >
            <User className="h-4 w-4" /> Profile Information
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 font-bold rounded-xl text-sm transition-colors border ${activeTab === 'security' ? 'bg-slate-50 text-primary border-slate-200' : 'text-slate-600 border-transparent hover:bg-slate-50 hover:border-slate-200'}`}
          >
            <Shield className="h-4 w-4" /> Security
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 font-bold rounded-xl text-sm transition-colors border ${activeTab === 'notifications' ? 'bg-slate-50 text-primary border-slate-200' : 'text-slate-600 border-transparent hover:bg-slate-50 hover:border-slate-200'}`}
          >
            <Bell className="h-4 w-4" /> Notifications
          </button>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-sm min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : activeTab === 'profile' ? (
            <>
              <h2 className="text-lg font-bold text-slate-800 mb-6">Profile Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name / Username</label>
                  <input type="text" disabled value={profileData.full_name} className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed" />
                  <p className="text-xs text-slate-400 mt-2">Username cannot be changed after account creation.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" disabled value={profileData.email} className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile Number</label>
                  <input 
                    type="tel" 
                    disabled
                    value={profileData.phone || 'Not provided'}
                    className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-400 mt-2">Mobile number cannot be changed after account creation.</p>
                </div>
              </div>
            </>
          ) : activeTab === 'security' ? (
            <>
              <h2 className="text-lg font-bold text-slate-800 mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="p-4 border border-slate-200 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Change Password</h3>
                      <p className="text-xs text-slate-500 mt-1">Update your account password</p>
                    </div>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50">Update</button>
                  </div>
                </div>
                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Two-Factor Authentication (2FA)</h3>
                      <p className="text-xs text-slate-500 mt-1">Currently using Email verification</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-sm font-bold">
                      <CheckCircle className="h-4 w-4" /> Enabled
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-slate-800 mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Email Notifications</h3>
                    <p className="text-xs text-slate-500 mt-1">Receive updates about your contracts and disputes</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                </label>
                <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Marketing Emails</h3>
                    <p className="text-xs text-slate-500 mt-1">Receive news, special offers, and platform updates</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-primary" />
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
