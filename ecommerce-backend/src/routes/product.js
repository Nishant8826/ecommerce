const express = require("express");
const { deleteSingleProduct, getAdminProducts, getAllCategories, getAllProducts, getLatestProducts, getSingleProduct, newProduct, updateProduct } = require("../controllers/product.js");
const { singleUpload } = require("../middlewares/multer.js");
const { adminOnly } = require("../middlewares/auth.js");
const productRoutes = express.Router();

productRoutes.post('/new', adminOnly, singleUpload, newProduct);
productRoutes.get('/latest', getLatestProducts);
productRoutes.get('/categories', getAllCategories);
productRoutes.get('/admin-products', adminOnly, getAdminProducts);
productRoutes.get('/all', getAllProducts);

productRoutes.route('/:id').get(getSingleProduct).put(adminOnly, singleUpload, updateProduct).delete(adminOnly, deleteSingleProduct)

module.exports = productRoutes;