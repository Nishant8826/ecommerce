const { TryCatch } = require("../middlewares/error.js");
const { Product } = require("../models/products.js");
const ErrorHandler = require("../utils/utility-class.js");
const { rm } = require("fs");
const myCache = require("../app.js");
const { invalidateCache } = require("../utils/features.js");


const newProduct = TryCatch(async (req, res, next) => {
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

const getLatestProducts = TryCatch(async (req, res, next) => {
    let products = [];
    if (myCache.has('latest-products')) {
        products = JSON.parse(myCache.get('latest-products'));
    } else {
        products = await Product.find({}).sort({ createdAt: - 1 }).limit(5);
        myCache.set('latest-products', JSON.stringify(products));
    }
    return res.status(200).send({ succes: true, result: products });
});

const getAllCategories = TryCatch(async (req, res, next) => {
    let categories;
    if (myCache.has('categories')) {
        categories = JSON.parse(myCache.get('categories'));
    } else {
        categories = await Product.distinct("category");
        myCache.set('categories', JSON.stringify(categories));
    }
    return res.status(200).send({ succes: true, result: categories });
});

const getAdminProducts = TryCatch(async (req, res, next) => {
    let products;
    if (myCache.has('products')) {
        products = JSON.parse(myCache.get('products'));
    } else {
        products = await Product.find({});
        myCache.set('products', JSON.stringify(products));
    }
    return res.status(200).send({ succes: true, result: products });
});

const getSingleProduct = TryCatch(async (req, res, next) => {
    let product;
    const id = req.params.id
    if (myCache.has(`product-${id}`)) {
        product = JSON.parse(myCache.get(`product-${id}`));
    } else {
        product = await Product.findById(id);
        if (!product) return next(new ErrorHandler(`Product Not Found`, 404));
        myCache.set(`product-${id}`, JSON.stringify(product));
    }

    return res.status(200).send({ succes: true, result: product });
});

const updateProduct = TryCatch(async (req, res, next) => {
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


const deleteSingleProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorHandler(`Product Not Found`, 404));
    // rm(product.photo!, () => {
    //     console.log('Product Photo Deleted');
    // })
    await Product.deleteOne();
    await invalidateCache({ product: true, productId: String(product._id) });

    return res.status(200).send({ succes: true, msg: 'Product deleted Successfully' });
});


const getAllProducts = TryCatch(async (req, res, next) => {

    const { price, search, sort, category } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery = {};

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



module.exports = { newProduct, getLatestProducts, getAllProducts, getAllCategories, getAdminProducts, getSingleProduct, updateProduct, deleteSingleProduct }