import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";


export const newOrder = TryCatch(async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
    const { shippingInfo, user, subtotal, tax, shippingCharges, discount, total, orderItems } = req.body;
    if (!shippingInfo || !user || !subtotal || !tax || !shippingCharges || !discount || !total || !orderItems) return next(new ErrorHandler('Please Enter all fields', 400));
    await Order.create({ shippingInfo, user, subtotal, tax, shippingCharges, discount, total, orderItems })
    await reduceStock(orderItems);
    await invalidateCache({ product: true, order: true, admin: true });
    return res.status(201).send({ success: true, message: 'Order Placed Successfully' });
})