import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and code are required' }, { status: 400 });
    }

    // Find the latest valid OTP for this email
    const { data: otps, error } = await supabaseAdmin
      .from('otps')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1);

    if (error || !otps || otps.length === 0) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 });
    }

    // Delete the OTP so it can't be reused
    await supabaseAdmin
      .from('otps')
      .delete()
      .eq('id', otps[0].id);

    return NextResponse.json({ success: true, message: 'Code verified successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
