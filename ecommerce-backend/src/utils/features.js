const mongoose = require("mongoose");
const myCache = require("../app.js");
const { Product } = require("../models/products.js");

const connectDB = (uri) => {
    mongoose.connect(uri, {
        dbName: 'Ecommerce'
    }).then((c) => {
        console.log("DB connected to", c.connection.host);
    }).catch((e) => console.log(e));
}


const invalidateCache = async ({ product, order, admin, userId, orderId, productId }) => {
    if (product) {
        const productKeys = ['latest-products', 'categories', 'products'];
        if (typeof productId === 'string') productKeys.push(`product-${productId}`);
        if (typeof productId === 'object') productId.forEach(i => productKeys.push(`product-${i}`));
        myCache.del(productKeys);
    }
    if (order) {
        const orderKeys = ['all-order', `my-order-${userId}`, `order-${orderId}`];
        myCache.del(orderKeys);
    }
    if (admin) {

    }
}

const reduceStock = async (orderItem) => {
    for (let i = 0; i < orderItem.length; i++) {
        const order = orderItem[i];
        const product = await Product.findById(order.productId);
        if (!product) throw new Error('Product not Found');
        product.stock -= order.quantity;
        await product.save();
    }

}

module.exports = { connectDB, invalidateCache, reduceStock };