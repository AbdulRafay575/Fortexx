import { createHashV3 } from "../utils/hashv3.js";

export const createPayment = (req, res) => {
    const {
        orderId,
        amount,
        email,
        name
    } = req.body;

    const clientId = "180000335";
    const storeKey = "SKEY0335";
    const postUrl = "https://torus-stage-halkbankmacedonia.asseco-see.com.tr/fim/est3Dgate";

    const rnd = Date.now().toString();

    const params = {
        clientid: clientId,
        amount: amount,
        oid: orderId,

        okurl: "https://fortex.com.mk/api/payments/success",
        failUrl: "https://fortex.com.mk/api/payments/fail",

        TranType: "Auth",
        Instalment: "",
        callbackUrl: "https://fortex.com.mk/api/payments/success",
        rnd: rnd,

        currency: "807",
        storetype: "3D_PAY_HOSTING",
        hashAlgorithm: "ver3",
        lang: "en",

        BillToName: name,
        BillToCompany: "Fortex",
        email: email,
        refreshtime: "5",

        encoding: "UTF-8"
    };

    params.hash = createHashV3(params, storeKey);

    res.send(`
        <form id="payform" method="POST" action="${postUrl}">
            ${Object.keys(params)
                .map(k => `<input type="hidden" name="${k}" value="${params[k]}"/>`)
                .join("")}
        </form>
        <script>document.getElementById('payform').submit();</script>
    `);
};
