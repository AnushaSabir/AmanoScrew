import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  const { data, error } = await supabase.from('contracts').insert({
    title: 'Test Contract',
    status: 'Pending Approval',
    deal_type: 'Physical Item',
    nature_of_deal: 'Sale',
    amount: 100,
    currency: 'PKR',
    buyer_id: null,
    seller_id: null,
    counterparty_email: 'test@example.com',
    counterparty_phone: '1234567890',
    counterparty_name: 'Test User',
    scope: 'Test Scope',
    timeline: '1 Week',
    milestones: 'N/A',
    conditions: 'None',
    notes: 'None',
    item_picture_url: null
  });

  if (error) {
    console.error('Insert Error:', error);
  } else {
    console.log('Insert Success:', data);
  }
}

testInsert();
