const { TryCatch } = require("../middlewares/error.js");
const ErrorHandler = require("../utils/utility-class.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user.js");

const newUser = TryCatch(async (req, res, next) => {
    let { name, photo, role, email, gender, dob, password } = req.body;
    if (!name || !email || !password) {
        return next(new ErrorHandler('Please add all fields', 200));
    };
    password = await bcrypt.hash(password, 12);
    const user = await User.create({
        name, photo, role, email, gender, dob, password
    });
    let token = await jwt.sign(user.toObject(), process.env.JWT_SECRET || 'Ecommerce by Nishant Rathore', { expiresIn: '1d' })
    return res.status(201).send({ success: true, token, user, msg: `Welcome ${user.name}` });
});

const newUserViaGoogle = TryCatch(async (req, res, next) => {
    let { name, photo, role, email, gender, dob } = req.body;
    if (!name || !email) {
        return next(new ErrorHandler('Please add all fields', 200));
    };
    let user = await User.findOne({ email });
    if (user) {
        const token = await jwt.sign(user.toObject(), process.env.JWT_SECRET || 'Ecommerce by Nishant Rathore', { expiresIn: '1d' });
        return res.status(200).send({ success: true, token, user, msg: `Welcome ${user.name}` });
    };
    user = await User.create({
        name, photo, role, email, gender, dob
    });
    const token = await jwt.sign(user.toObject(), process.env.JWT_SECRET || 'Ecommerce by Nishant Rathore', { expiresIn: '1d' });
    return res.status(201).send({ success: true, token, user, msg: `Welcome ${user.name}` });
});

const login = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandler(`Email and Password are required`, 200));
    let user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler(`Email not found`, 404));
    if (user.password) {
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) return next(new ErrorHandler(`Password is incorrect`, 200))
    }
    const plainUser = user.toObject();
    const token = await jwt.sign(plainUser, process.env.JWT_SECRET || 'Ecommerce by Nishant Rathore', { expiresIn: '1d' });
    return res.status(200).send({ success: true, msg: `Welcome ${user.name}`, user, token });

})

const getAllUsers = TryCatch(async (req, res, next) => {
    const allUsers = await User.find();
    return res.status(200).send({ success: true, result: allUsers });

});

const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler('Invalid Id', 200));
    return res.status(200).send({ success: true, result: user });

});

const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler('Invalid Id', 200));
    await user.deleteOne();
    return res.status(200).send({ success: true, msg: 'Deleted succesfully' });

});

const checkEmailExists = TryCatch(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) return next(new ErrorHandler(`Email already exist`, 200));
    return res.status(200).send({ exists: false });
})

module.exports = { newUser, newUserViaGoogle, login, getAllUsers, getUser, deleteUser, checkEmailExists };