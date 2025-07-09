const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Please enter the Coupon Code'],
        unique: true
    },
    amount: {
        type: Number,
        required: [true, 'Please enter the Discount Amount'],
    },
})

const Coupon = mongoose.model('Coupon', schema);
module.exports = Coupon;