async function testApi() {
  try {
    const res = await fetch('http://localhost:3000/api/contracts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'API Test',
        deal_type: 'Physical Item',
        nature_of_deal: 'Sale',
        amount: 500,
        currency: 'PKR',
        buyer_id: '00000000-0000-0000-0000-000000000000', // Fake UUID
        seller_id: null,
        initiator_role: 'Buyer',
        counterparty_email: 'test@example.com',
        counterparty_phone: '123',
        counterparty_name: 'Bob',
        scope: 'Test',
        timeline: 'Test',
        milestones: 'Test',
        conditions: 'Test',
        notes: 'Test',
        item_picture_url: null
      })
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (err) {
    console.error(err);
  }
}
testApi();
