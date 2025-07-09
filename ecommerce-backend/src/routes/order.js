const express = require("express");
const { adminOnly } = require("../middlewares/auth.js");
const { myOrders, newOrder, allOrders, getSingleOrder, processOrder, deleteOrder } = require("../controllers/order.js");
const orderRoutes = express.Router();

orderRoutes.post('/new', newOrder);
orderRoutes.get('/my', myOrders);
orderRoutes.get('/all', adminOnly, allOrders);
orderRoutes.route('/:id').get(getSingleOrder).put(adminOnly, processOrder).delete(adminOnly, deleteOrder);

module.exports = orderRoutes;