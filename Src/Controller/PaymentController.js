const { handlePayment } = require("../Services/PaymentService");

const PaymentController = async (request, response) => {
  const { amount, currency, email } = request.body;

  if (!amount || !email) {
    return res.status(400).json({ error: "Amount and email are required." });
  }

  const result = await handlePayment(amount, currency, email);

  if (result.success) {
    return response.status(200).json({
      message: "Payment initiated successfully.",
      clientSecret: result.clientSecret,
    });
  } else {
    return response.status(500).json({
      error: "Payment failed",
      details: result.message,
    });
  }
};

module.exports = PaymentController;
