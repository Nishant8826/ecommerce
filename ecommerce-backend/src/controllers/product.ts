import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { BaseQuery, NewProduct, SearchRequestQuery } from "../types/types.js";
import { Product } from "../models/products.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";


export const newProduct = TryCatch(async (req: Request<{}, {}, NewProduct>, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo) return next(new ErrorHandler(`Please Add Photo`, 400));
    if (!name || !price || !stock || !category) {
        rm(photo.path, () => {
            console.log('Photo Deleted');
        })
        return next(new ErrorHandler('Please enter all fields', 400));
    };
    const result = await Product.create({ name, price, stock, category: category.toLowerCase(), photo: photo.path })
    await invalidateCache({ product: true });
    return res.status(201).send({ succes: true, result: result, msg: 'product created successfully' });
});

export const getLatestProducts = TryCatch(async (req, res, next) => {
    let products = [];
    if (myCache.has('latest-products')) {
        products = JSON.parse(myCache.get('latest-products') as string);
    } else {
        products = await Product.find({}).sort({ createdAt: - 1 }).limit(5);
        myCache.set('latest-products', JSON.stringify(products));
    }
    return res.status(200).send({ succes: true, result: products });
});

export const getAllCategories = TryCatch(async (req, res, next) => {
    let categories;
    if (myCache.has('categories')) {
        categories = JSON.parse(myCache.get('categories') as string);
    } else {
        categories = await Product.distinct("category");
        myCache.set('categories', JSON.stringify(categories));
    }
    return res.status(200).send({ succes: true, result: categories });
});

export const getAdminProducts = TryCatch(async (req, res, next) => {
    let products;
    if (myCache.has('products')) {
        products = JSON.parse(myCache.get('products') as string);
    } else {
        products = await Product.find({});
        myCache.set('products', JSON.stringify(products));
    }
    return res.status(200).send({ succes: true, result: products });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {
    let product;
    const id = req.params.id
    if (myCache.has(`product-${id}`)) {
        product = JSON.parse(myCache.get(`product-${id}`) as string);
    } else {
        product = await Product.findById(id);
        if (!product) return next(new ErrorHandler(`Product Not Found`, 404));
        myCache.set(`product-${id}`, JSON.stringify(product));
    }

    return res.status(200).send({ succes: true, result: product });
});

export const updateProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    const product = await Product.findById(id);
    if (!product) return next(new ErrorHandler(`Product Not Found`, 404));

    if (photo) {
        rm(product.photo, () => {
            console.log('Old Photo Deleted');
        })
        product.photo = photo.path;
    };

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    const result = await product.save();
    await invalidateCache({ product: true, productId: String(product._id) });
    return res.status(201).send({ succes: true, result: result, msg: 'product updated successfully' });
});


export const deleteSingleProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler(`Product Not Found`, 404));
    rm(product.photo!, () => {
        console.log('Product Photo Deleted');
    })
    await Product.deleteOne();
    await invalidateCache({ product: true, productId: String(product._id) });

    return res.status(200).send({ succes: true, msg: 'Product deleted Successfully' });
});


export const getAllProducts = TryCatch(async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {

    const { price, search, sort, category } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};

    if (search) baseQuery.name = {
        $regex: search,
        $options: "i"
    };

    if (price) baseQuery.price = {
        $lte: Number(price)
    };

    if (category) baseQuery.category = category;

    const productPromise = Product.find(baseQuery).sort(sort && { price: sort === 'asc' ? 1 : -1 }).limit(limit).skip(skip);

    const [products, filterOnlyProduct] = await Promise.all([
        productPromise,
        Product.find(baseQuery)
    ]);

    const totalPage = Math.ceil(filterOnlyProduct.length / limit);
    return res.status(200).send({ succes: true, result: products, totalPage });
});