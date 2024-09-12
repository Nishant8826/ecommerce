import mongoose from "mongoose"
import { InvalidateCache, OrderItemType } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/products.js";

export const connectDB = (uri: string) => {
    mongoose.connect(uri, {
        dbName: 'Ecommerce'
    }).then((c) => {
        console.log("DB connected to", c.connection.host);
    }).catch((e) => console.log(e));
}


export const invalidateCache = async ({ product, order, admin }: InvalidateCache) => {
    if (product) {
        const productKeys: string[] = ['latest-products', 'categories', 'products'];

        const products = await Product.find({}).select('_id');

        products.forEach((i) => {
            productKeys.push(`product-${i._id}`);
        })

        myCache.del(productKeys);
    }
    if (order) {

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