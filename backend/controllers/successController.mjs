// controllers/successController.js

export const paymentSuccess = async (req, res) => {
  try {
    const postedData = req.body;

    console.log("📥 SUCCESS POST DATA:", postedData);

    // --- Extract needed fields ---
    const procReturnCode = postedData.ProcReturnCode;
    const responseHash = postedData.HASH;

    // If the bank says OK
    if (procReturnCode === "00") {
      console.log("✅ Payment Approved");

      // ⬇️ OPTIONAL: update order in DB here
      // await Order.findOneAndUpdate(
      //   { orderId: postedData.oid },
      //   { status: "PAID" }
      // );

      // Redirect customer to success page
      return res.redirect("https://fortex.com.mk/payment-success.html");
    }

    // If code not 00, treat as fail
    console.log("⚠ Payment NOT approved, code:", procReturnCode);

    return res.redirect("https://fortex.com.mk/payment-failed.html");

  } catch (err) {
    console.error("❌ Error in paymentSuccess:", err);
    return res.redirect("https://fortex.com.mk/payment-failed.html");
  }
};
