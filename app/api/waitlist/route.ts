import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, source = 'landing' } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Save to Supabase waitlist table
    const { error: dbError } = await supabase
      .from('waitlist')
      .insert({ email: email.toLowerCase().trim(), source })
      .select()
      .single();

    // Ignore duplicate emails gracefully
    if (dbError && dbError.code !== '23505') {
      console.error('Supabase error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Send welcome email via Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "You're on the Whyze beta list 🎉",
      html: `
        <div style="font-family: 'DM Sans', sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #0F1F3D;">
          <h1 style="font-size: 28px; font-weight: 900; margin-bottom: 16px;">
            You're in. 🧠
          </h1>
          <p style="font-size: 16px; line-height: 1.6; color: #6B7280; margin-bottom: 24px;">
            Thanks for joining the Whyze beta waitlist. We're opening spots in small cohorts
            to make sure every user gets a great experience.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #6B7280; margin-bottom: 24px;">
            When your spot opens, you'll get free access to the full platform — no credit card required.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #6B7280; margin-bottom: 32px;">
            In the meantime — what's the one thing that frustrates you most about studying for your exam?
            Just reply to this email. I read every response.
          </p>
          <p style="font-size: 14px; color: #6B7280;">
            — The Whyze Team
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Waitlist error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
