import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, name, date } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Amano Escrow <support@useamano.com>', 
      to: email,
      subject: 'Welcome to Amano Secure Escrow!',
      text: `Dear ${name || 'User'},

Welcome to Amano!

Thank you for signing up. Your Amano account has been successfully created, and you are now ready to access our secure escrow and transaction management platform.

At Amano, we help buyers and sellers transact with confidence by providing a secure environment where funds are protected until agreed conditions are met.

Your Account Details

- Name: ${name || 'User'}
- Email: ${email}
- Registration Date: ${date}

To begin using Amano, please log in to your account and complete any required profile verification steps.

If you did not create this account, please contact our support team immediately.

Thank you for choosing Amano. We look forward to helping you transact safely and securely.

Best Regards,

The Amano Team
useamano.com
support@useamano.com

This is an automated message. Please do not reply directly to this email.`
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send welcome email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Welcome email sent successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
