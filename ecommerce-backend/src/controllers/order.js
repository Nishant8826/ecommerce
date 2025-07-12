const { TryCatch } = require("../middlewares/error.js");
const Order = require("../models/order.js");
const ErrorHandler = require("../utils/utility-class.js");

const newOrder = TryCatch(async (req, res, next) => {
    const { shippingInfo, user, subtotal, tax, shippingCharges, discount, total, orderItems } = req.body;
    if (!shippingInfo || !user || !subtotal || !tax || !total || !orderItems) return next(new ErrorHandler('Please Enter all fields', 400));
    await Order.create({ shippingInfo, user, subtotal, tax, shippingCharges, discount, total, orderItems })
    return res.status(201).send({ success: true, message: 'Order Placed Successfully' });
})

const myOrders = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    const key = `my-order-${id}`
    let orders = [];
    orders = await Order.find({ user: id });
    return res.status(200).send({ success: true, orders });
})

const allOrders = TryCatch(async (req, res, next) => {
    const key = `all-order`
    let orders = [];
    orders = await Order.find().populate('user', 'name');
    return res.status(200).send({ success: true, orders });
})

const getSingleOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const key = `order-${id}`
    let order;
    order = await Order.findById(id).populate('user', 'name');
    if (!order) return next(new ErrorHandler(`Order not found`, 404));
    return res.status(200).send({ success: true, order });
})

const processOrder = TryCatch(async (req, res, next) => {
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
    return res.status(200).send({ success: true, message: 'Order Processed Successfully' });
})

const deleteOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return next(new ErrorHandler('Order not found', 404));
    await order.deleteOne();
    return res.status(200).send({ success: true, message: 'Order Deleted Successfully' });
})


module.exports = { newOrder, myOrders, allOrders, getSingleOrder, processOrder, deleteOrder };
