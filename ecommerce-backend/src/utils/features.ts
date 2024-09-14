import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/products.js";
import { InvalidateCache, OrderItemType } from "../types/types.js";

export const connectDB = (uri: string) => {
    mongoose.connect(uri, {
        dbName: 'Ecommerce'
    }).then((c) => {
        console.log("DB connected to", c.connection.host);
    }).catch((e) => console.log(e));
}


export const invalidateCache = async ({ product, order, admin, userId, orderId, productId }: InvalidateCache) => {
    if (product) {
        const productKeys: string[] = ['latest-products', 'categories', 'products'];
        if (typeof productId === 'string') productKeys.push(`product-${productId}`);
        if (typeof productId === 'object') productId.forEach(i => productKeys.push(`product-${i}`));
        myCache.del(productKeys);
    }
    if (order) {
        const orderKeys: string[] = ['all-order', `my-order-${userId}`, `order-${orderId}`];
        myCache.del(orderKeys);
    }
    if (admin) {

    }
}

export const reduceStock = async (orderItem: OrderItemType[]) => {
    for (let i = 0; i < orderItem.length; i++) {
        const order = orderItem[i];
        const product = await Product.findById(order.productId);
        if (!product) throw new Error('Product not Found');
        product.stock -= order.quantity;
        await product.save();
    }

} 