import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";


export const newOrder = TryCatch(async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
    const { shippingInfo, user, subtotal, tax, shippingCharges, discount, total, orderItems } = req.body;
    if (!shippingInfo || !user || !subtotal || !tax || !total || !orderItems) return next(new ErrorHandler('Please Enter all fields', 400));
    await Order.create({ shippingInfo, user, subtotal, tax, shippingCharges, discount, total, orderItems })
    await reduceStock(orderItems);
    await invalidateCache({ product: true, order: true, admin: true, userId: user, productId: orderItems.map(i => i.productId) });
    return res.status(201).send({ success: true, message: 'Order Placed Successfully' });
})

export const myOrders = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    const key = `my-order-${id}`
    let orders = [];
    if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
    else {
        orders = await Order.find({ user: id });
        myCache.set(key, JSON.stringify(orders));
    };
    return res.status(200).send({ success: true, orders });
})

export const allOrders = TryCatch(async (req, res, next) => {
    const key = `all-order`
    let orders = [];
    if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
    else {
        orders = await Order.find().populate('user', 'name');
        myCache.set(key, JSON.stringify(orders));
    };
    return res.status(200).send({ success: true, orders });
})

export const getSingleOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const key = `order-${id}`
    let order;
    if (myCache.has(key)) order = JSON.parse(myCache.get(key) as string);
    else {
        order = await Order.findById(id).populate('user', 'name');
        if (!order) return next(new ErrorHandler(`Order not found`, 404));
        myCache.set(key, JSON.stringify(order));
    };
    return res.status(200).send({ success: true, order });
})

export const processOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return next(new ErrorHandler('Order not found', 404));
    switch (order.status) {
        case 'Processing':
            order.status = 'Shipped';
            break;
        case 'Shipped':
            order.status = 'Delivered';
            break;
        default:
            order.status = 'Delivered';
            break;
    }
    await order.save();
    await invalidateCache({ product: false, order: true, admin: true, userId: order.user, orderId: String(order._id) });
    return res.status(200).send({ success: true, message: 'Order Processed Successfully' });
})

export const deleteOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return next(new ErrorHandler('Order not found', 404));
    await order.deleteOne();
    await invalidateCache({ product: false, order: true, admin: true, userId: order.user, orderId: String(order._id) });
    return res.status(200).send({ success: true, message: 'Order Deleted Successfully' });
})
