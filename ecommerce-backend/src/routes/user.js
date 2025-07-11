const express = require("express");
const { getAllUsers, newUserViaFB, getUser, deleteUser, login } = require("../controllers/user.js");
const { adminOnly } = require("../middlewares/auth.js");
const orderRoutes = express.Router();

orderRoutes.post('/login', login);
orderRoutes.post('/new', newUserViaFB);
orderRoutes.get('/getall', adminOnly, getAllUsers);
orderRoutes.get('/:id', getUser)
orderRoutes.delete('/:id', adminOnly, deleteUser)


module.exports = orderRoutes;