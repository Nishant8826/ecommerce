const User = require("../models/user.js");
const ErrorHandler = require("../utils/utility-class.js");
const { TryCatch } = require("./error.js");


const adminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    if (!id) return next(new ErrorHandler('Please Login', 401));
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler('Invalid Id, please login again!', 401));
    if (user.role !== 'admin') return next(new ErrorHandler('You are not authorized to this path.', 403));
    next();
})

module.exports = { adminOnly };