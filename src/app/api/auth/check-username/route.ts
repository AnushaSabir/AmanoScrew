import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // Check if the username exists in the profiles table (case insensitive)
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .ilike('username', username.trim())
      .limit(1);

    if (error) {
      console.error('Username check error:', error);
      return NextResponse.json({ error: 'Failed to check username' }, { status: 500 });
    }

    const isAvailable = data.length === 0;

    return NextResponse.json({ available: isAvailable });
  } catch (error: any) {
    console.error('Unexpected error in check-username route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
