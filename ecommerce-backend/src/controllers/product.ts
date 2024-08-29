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