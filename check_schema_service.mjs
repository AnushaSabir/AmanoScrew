import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSchema() {
  const { data, error } = await supabase.from('contracts').insert({
    title: 'Dummy',
    status: 'Pending Approval',
    deal_type: 'Physical Item',
    nature_of_deal: 'Sale',
    amount: 1,
    currency: 'PKR',
    buyer_id: null,
    seller_id: null,
    counterparty_email: null,
    counterparty_phone: null,
    counterparty_name: null,
    scope: 'test',
    timeline: 'test',
    milestones: 'test',
    conditions: 'test',
    notes: 'test',
    item_picture_url: null,
  }).select('*').single();

  if (error) {
    console.error('Insert Error:', error);
  } else {
    console.log('Columns:', Object.keys(data));
    // Clean up
    await supabase.from('contracts').delete().eq('id', data.id);
  }
}

checkSchema();
