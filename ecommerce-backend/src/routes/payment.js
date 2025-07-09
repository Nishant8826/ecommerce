const express = require("express");
const { adminOnly } = require("../middlewares/auth.js");
const { allCoupons, applyDiscount, createPaymentIntent, deleteCoupon, newCoupen } = require("../controllers/payment.js");
const paymentRoutes = express.Router();

paymentRoutes.post('/create-payment', createPaymentIntent);
paymentRoutes.post('/coupon/new', adminOnly, newCoupen);
paymentRoutes.get('/discount', applyDiscount);
paymentRoutes.get('/coupon/all', adminOnly, allCoupons);
paymentRoutes.delete('/:id', adminOnly, deleteCoupon);


module.exports = paymentRoutes;