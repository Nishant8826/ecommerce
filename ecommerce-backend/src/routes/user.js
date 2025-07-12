const express = require("express");
const { getAllUsers, newUserViaGoogle, getUser, deleteUser, login, checkEmailExists, newUser } = require("../controllers/user.js");
const { adminOnly } = require("../middlewares/auth.js");
const orderRoutes = express.Router();

orderRoutes.post('/login', login);
orderRoutes.post('/newUser', newUser);
orderRoutes.post('/newViaGoogle', newUserViaGoogle);
orderRoutes.get('/getall', adminOnly, getAllUsers);
orderRoutes.get('/:id', getUser)
orderRoutes.post('/checkEmailExist', checkEmailExists)
orderRoutes.delete('/:id', adminOnly, deleteUser)


module.exports = orderRoutes;