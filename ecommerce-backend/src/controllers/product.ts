import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProduct } from "../types/types.js";
import { Product } from "../models/products.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";


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
    return res.status(201).send({ succes: true, result: result, msg: 'product created successfully' });
});

export const getLatestProducts = TryCatch(async (req, res, next) => {
    const products = await Product.find({}).sort({ createdAt: - 1 }).limit(5);
    return res.status(200).send({ succes: true, result: products });
});

export const getAllCategories = TryCatch(async (req, res, next) => {
    const categories = await Product.distinct("category");
    return res.status(200).send({ succes: true, result: categories });
});

export const getAdminProducts = TryCatch(async (req, res, next) => {
    const products = await Product.find({});
    return res.status(200).send({ succes: true, result: products });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler(`Product Not Found`, 404));

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
    return res.status(201).send({ succes: true, result: result, msg: 'product updated successfully' });
});


export const deleteSingleProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler(`Product Not Found`, 404));
    rm(product.photo!, () => {
        console.log('Product Photo Deleted');
    })
    await Product.deleteOne();
    return res.status(200).send({ succes: true, msg: 'Product deleted Successfully' });
});