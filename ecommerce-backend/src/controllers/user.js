const { TryCatch } = require("../middlewares/error.js");
const ErrorHandler = require("../utils/utility-class.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user.js");

const newUserViaFB = TryCatch(async (req, res, next) => {
    const { name, photo, role, email, _id, gender, dob } = req.body;
    let user = await User.findById(_id);
    if (user) {
        return res.status(200).send({ success: true, msg: `Welcome ${user.name}` });
    };
    if (!name || !photo || !role || !email || !_id || !gender || !dob) {
        return next(new ErrorHandler('Please add all fields', 400));
    };
    user = await User.create({
        name, photo, role, email, _id, gender, dob: new Date(dob)
    });
    return res.status(201).send({ success: true, msg: `Welcome ${user.name}` });
});

const login = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandler(`Email and Password are required`, 400));
    let result = {};
    let user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler(`Email not found`, 404));
    if (user.password) {
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) return next(new ErrorHandler(`Password is incorrect`, 400))
    }
    let token = await jwt.sign(user, process.env.JWT_SECRET || 'Ecommerce by Nishant Rathore', { expiresIn: '1d' })
    result.token = token
    result.user = user;
    return res.status(200).send({ success: true, result, msg: `Welcome ${user.name}` });

})

const getAllUsers = TryCatch(async (req, res, next) => {
    const allUsers = await User.find();
    return res.status(200).send({ success: true, result: allUsers });

});

const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler('Invalid Id', 400));
    return res.status(200).send({ success: true, result: user });

});

const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler('Invalid Id', 400));
    await user.deleteOne();
    return res.status(200).send({ success: true, msg: 'Deleted succesfully' });

});

module.exports = { newUserViaFB, login, getAllUsers, getUser, deleteUser };