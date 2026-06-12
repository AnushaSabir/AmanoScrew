import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase-admin';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate 6 digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiration to 10 minutes from now
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Save to database
    const { error: dbError } = await supabaseAdmin
      .from('otps')
      .insert({
        email,
        code,
        expires_at: expiresAt.toISOString(),
      });

    if (dbError) {
      console.error('DB Error:', dbError);
      return NextResponse.json({ error: 'Failed to generate OTP' }, { status: 500 });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Amano Escrow <support@useamano.com>', 
      to: email,
      subject: 'Your Amano Login Security Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0f172a;">Amano Security Code</h2>
          <p style="color: #475569; font-size: 16px;">Here is your 2-Factor Authentication code to securely log in to your escrow dashboard:</p>
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #3b82f6;">${code}</span>
          </div>
          <p style="color: #94a3b8; font-size: 12px;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
