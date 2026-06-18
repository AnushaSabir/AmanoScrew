import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

async function fetchPolicies() {
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/get_policies`, {
    method: 'POST',
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
    }
  });
  console.log("Status:", res.status);
  
  // Try directly calling the graphql or something if RPC doesn't exist
  // We can just use the supabase client to run raw SQL?
  // Supabase JS doesn't support raw SQL from client side API.
}
fetchPolicies();
