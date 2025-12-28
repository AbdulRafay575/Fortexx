// controllers/failController.js

export const paymentFail = async (req, res) => {
  try {
    console.log("❌ FAIL POST DATA:", req.body);

    // Redirect customer to fail page
    return res.redirect("https://fortex.com.mk/payment-failed.html");

  } catch (err) {
    console.error("❌ Error in paymentFail:", err);
    return res.redirect("https://fortex.com.mk/payment-failed.html");
  }
};
