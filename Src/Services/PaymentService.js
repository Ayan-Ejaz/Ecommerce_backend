const stripe = require('../config/stripe');
const {payment, user} = require('../../models')
const handlePayment = async (amount, currency, email) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency,
      receipt_email: email,
      description: 'Payment for order',
      automatic_payment_methods: { enabled: true },
    });

    const customer = user.findOne({
      where: {email}
    }) 

    if (paymentIntent.status === 'succeeded') {
      const pay = await payment.create({
        customerId: customer.id,
        amount,
        transactionId:paymentIntent.id,
        paymentType:'credit'
      })
    }
    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error('Payment error:', error);
    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = { handlePayment };
