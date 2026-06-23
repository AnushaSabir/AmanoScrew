import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, title, inviterName, isExistingUser } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const actionLink = "https://www.amanoescrow.com/login";
    const subject = isExistingUser 
      ? 'Action Required: You have a new deal on Amano'
      : 'You have been invited to a secure deal on Amano';
      
    const buttonText = isExistingUser
      ? 'Log in to View Deal'
      : 'Create an Account to View Deal';

    const { data, error } = await resend.emails.send({
      from: 'Amano Escrow <support@useamano.com>', 
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0f172a;">Amano Secure Escrow</h2>
          <p style="color: #475569; font-size: 16px;">Hello,</p>
          <p style="color: #475569; font-size: 16px;"><strong>${inviterName || 'A user'}</strong> has created a new contract titled "<strong>${title || 'Untitled Deal'}</strong>" and invited you to participate as the counterparty.</p>
          <div style="margin: 30px 0;">
            <a href="${actionLink}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">${buttonText}</a>
          </div>
          <p style="color: #94a3b8; font-size: 12px;">Amano is a secure escrow service that protects both buyers and sellers. If you don't know the inviter, you can safely ignore this email.</p>
        </div>
      `
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send invite email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Invite sent successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
