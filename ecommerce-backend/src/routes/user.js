const express = require("express");
const { getAllUsers, newUser, getUser, deleteUser } = require("../controllers/user.js");
const { adminOnly } = require("../middlewares/auth.js");
const orderRoutes = express.Router();

orderRoutes.post('/new', newUser);
orderRoutes.get('/getall', adminOnly, getAllUsers);
orderRoutes.get('/:id', getUser)
orderRoutes.delete('/:id', adminOnly, deleteUser)


module.exports = orderRoutes;