import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Supabase server configuration is missing.' }, { status: 500 });
    }

    const contractData = await request.json();

    // Self-healing logic: Check if user profile exists to prevent foreign key violations
    const userId = contractData.buyer_id || contractData.seller_id;
    if (userId) {
      const { data: profile } = await supabaseAdmin.from('profiles').select('id').eq('id', userId).single();
      if (!profile) {
        // Fetch user from auth to get email
        const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(userId);
        if (authUser && authUser.user) {
          // Create missing profile
          await supabaseAdmin.from('profiles').insert({
            id: userId,
            email: authUser.user.email,
            full_name: authUser.user.user_metadata?.full_name || 'User',
            role: 'user'
          });
          console.log(`Created missing profile for user ${userId}`);
        }
      }
    }

    let isExistingCounterparty = false;
    let counterpartyIdToUse = null;

    if (contractData.counterparty_email) {
      const email = contractData.counterparty_email.trim().toLowerCase();
      const { data: counterpartyProfile } = await supabaseAdmin
        .from('profiles')
        .select('id, username')
        .eq('email', email)
        .single();
        
      // Only treat them as an existing user if they have finished registration and claimed a username
      if (counterpartyProfile && counterpartyProfile.username) {
        isExistingCounterparty = true;
        counterpartyIdToUse = counterpartyProfile.id;
        
        // Update the payload to link the existing user
        if (contractData.initiator_role === 'Buyer') {
          contractData.seller_id = counterpartyIdToUse;
        } else {
          contractData.buyer_id = counterpartyIdToUse;
        }
      }
    }

    const { data, error } = await supabaseAdmin.from('contracts').insert(contractData).select('id').single();

    if (!error && isExistingCounterparty && counterpartyIdToUse) {
      // Send Dashboard Notification
      const title = 'New Contract Invite';
      const message = `You have been invited to a new contract: "${contractData.title || 'Untitled Deal'}".`;
      const link = `/dashboard/contracts/${data.id}`;
      
      await supabaseAdmin.from('notifications').insert({
        user_id: counterpartyIdToUse,
        title,
        message,
        link,
      });
    }

    if (error) {
      console.error('Insert Error in API route:', error);
      return NextResponse.json({
        error: error.message || 'Failed to create contract',
        code: error.code,
        details: error.details,
        hint: error.hint,
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id, isExistingUser: isExistingCounterparty });
  } catch (error: any) {
    console.error('Unexpected error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
