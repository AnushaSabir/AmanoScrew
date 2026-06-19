"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: any | null; // We use any to accommodate the profile data
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string, mobile?: string, kycData?: { type: string; frontUrl: string; backUrl?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (authUser: User) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();
    
    if (data) {
      setUser({ ...authUser, name: data.full_name || authUser.user_metadata?.full_name, profile: data });
    } else {
      // Fallback if profile doesn't exist yet
      setUser({ ...authUser, name: authUser.user_metadata?.full_name });
    }
  };

  useEffect(() => {
    // Initial session fetch
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await fetchProfile(session.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchProfile(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });
      if (error) throw error;
      
      if (data.user) {
        const { data: profile } = await supabase.from('profiles').select('kyc_status').eq('id', data.user.id).single();
        if (profile && profile.kyc_status === 'Pending') {
          await supabase.auth.signOut();
          return { success: false, error: 'Your account is pending admin verification. Please check back later.' };
        }
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name: string, email: string, pass: string, mobile?: string, kycData?: { type: string; frontUrl: string; backUrl?: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            full_name: name,
          }
        }
      });
      if (error) throw error;
      
      // If user was created, insert into profiles table
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: email,
            full_name: name,
            phone: mobile?.trim() || null,
            kyc_status: kycData ? 'Pending' : 'Unverified',
            kyc_doc_type: kycData?.type,
            kyc_doc_front: kycData?.frontUrl,
            kyc_doc_back: kycData?.backUrl
          });
          
        if (profileError) {
          console.error("Error creating profile:", profileError);
        }
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
