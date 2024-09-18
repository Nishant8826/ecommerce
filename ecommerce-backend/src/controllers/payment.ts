import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewCouponBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { Coupon } from "../models/coupon.js";
import { stripe } from "../app.js";

export const createPaymentIntent = TryCatch(async (req, res, next) => {
    const { amount } = req.body;
    if (!amount) return next(new ErrorHandler('Please enter amount', 400));
    const paymentIntent = await stripe.paymentIntents.create({ amount: Number(amount) * 100, currency: 'inr' })
    return res.status(201).send({ success: true, clientSecret: paymentIntent.client_secret });
})

export const newCoupen = TryCatch(async (req: Request<{}, {}, NewCouponBody>, res, next) => {
    const { code, amount } = req.body;
    if (!code || !amount) return next(new ErrorHandler('Please enter all fields', 400));
    await Coupon.create({ code, amount });
    return res.status(201).send({ success: true, message: `Coupon ${code} Created Successfully` });
})

export const applyDiscount = TryCatch(async (req, res, next) => {
    const { code } = req.query;
    const discount = await Coupon.findOne({ code });
    if (!discount) return next(new ErrorHandler('Invalid Coupon code', 400));
    return res.status(200).send({ success: true, discount: discount.amount });
})

export const allCoupons = TryCatch(async (req, res, next) => {
    const coupons = await Coupon.find();
    if (!coupons) return next(new ErrorHandler('Invalid Coupon code', 400));
    return res.status(200).send({ success: true, coupons });
})

export const deleteCoupon = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) return next(new ErrorHandler('Invalid Coupon Id', 400));
    return res.status(200).send({ success: true, message: `Coupon ${coupon.code} deleted successfully` });
})