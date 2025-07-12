const mongoose = require("mongoose");
const validator = require("validator");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Name']
    },
    email: {
        type: String,
        required: [true, 'Please enter Email'],
        unique: [true, 'Email already Exist'],
        validate: validator.default.isEmail
    },
    password: {
        type: String,
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    dob: {
        type: Date,
    },
}, { timestamps: true });

const User = mongoose.model ('User', schema);
module.exports = User;