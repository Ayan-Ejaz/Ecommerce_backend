const express = require("express");
const bodyParser = require("body-parser");
const productRoute = require("../Routes/ProductRoute");
const paymentRoute = require("../Routes/PaymentRoute");
const orderRoute = require("../Routes/OrderRoute");
const apiGateWay = express();

apiGateWay.use(bodyParser.json());
apiGateWay.use("/api/product", productRoute);
apiGateWay.use("/api/payment", paymentRoute);
apiGateWay.use("/api/order", orderRoute);

module.exports = apiGateWay;
