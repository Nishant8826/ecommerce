import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { allCoupons, applyDiscount, deleteCoupon, newCoupen } from "../controllers/payment.js";
const app = express.Router();

app.post('/coupon/new', adminOnly, newCoupen);
app.get('/discount', applyDiscount);
app.get('/coupon/all', adminOnly, allCoupons);
app.delete('/:id', adminOnly, deleteCoupon);



export default app;