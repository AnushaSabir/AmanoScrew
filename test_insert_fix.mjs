import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUserInsert() {
  const email = `amanotestuser${Date.now()}@gmail.com`;
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password: 'password123'
  });
  
  if (signUpError) {
    console.error("SignUp Error:", signUpError);
    return;
  }
  
  console.log("Signed up user:", signUpData.user?.id);
  
  const { data, error } = await supabase.from('contracts').insert({
    title: 'Test Contract from User',
    status: 'Pending Approval',
    deal_type: 'Physical Item',
    nature_of_deal: 'Sale',
    amount: 100,
    currency: 'PKR',
    buyer_id: signUpData.user?.id,
    seller_id: null,
    initiator_role: 'Buyer',
    counterparty_email: 'testcounter@gmail.com',
    counterparty_phone: '1234567890',
    counterparty_name: 'Test User',
    scope: 'Test Scope',
    timeline: '1 Week',
    milestones: 'N/A',
    conditions: 'None',
    notes: 'None',
    item_picture_url: null
  }).select('*').single();

  if (error) {
    console.error('Insert Error:', error);
  } else {
    console.log('Insert Success:', data.id);
  }
}

testUserInsert();
