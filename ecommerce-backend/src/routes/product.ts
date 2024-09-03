import express from "express";
import { deleteSingleProduct, getAdminProducts, getAllCategories, getLatestProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();

app.post('/new', adminOnly, singleUpload, newProduct);
app.get('/latest', getLatestProducts);
app.get('/categories', getAllCategories);
app.get('/admin-products', adminOnly, getAdminProducts);
app.get('/search', getAdminProducts);

app.route('/:id').get(getSingleProduct).put(adminOnly, singleUpload, updateProduct).delete(adminOnly, deleteSingleProduct)

export default app;