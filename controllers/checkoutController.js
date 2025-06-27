import axios from 'axios';


export default async function createInstamojoPayment(req, res) {
  const { amount, buyer_name, email, phone, purpose } = req.body;

  const payload = {
    amount: amount.toString(),
    purpose: purpose || 'E-commerce Order',
    buyer_name,
    email,
    phone,
    redirect_url: 'http://localhost:5173/payment-success',
    send_email: true,
    send_sms: true,
    allow_repeated_payments: false
  };

  try {
    const response = await axios.post(
      `${process.env.INSTAMOJO_BASEURL}/payment-requests/`,
      payload,
      {
        headers: {
          'X-Api-Key': process.env.API_KEY,
          'X-Auth-Token': process.env.AUTH_TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );

    const payment = response.data;

    if (payment.success) {
      return res.json({ payment_url: payment.payment_request.longurl, data:payment });
    } else {
      return res.status(500).json({ error: 'Payment creation failed' });
    }
  } catch (error) {
    console.error('Instamojo Error:', error.message);
    res.status(500).json({ error: 'Instamojo API error' });
  }
}
