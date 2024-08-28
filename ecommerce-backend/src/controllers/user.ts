import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";


export const newUser = TryCatch(async (req, res, next) => {
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

export const getAllUsers = TryCatch(async (req, res, next) => {
    const allUsers = await User.find();
    return res.status(200).send({ success: true, result: allUsers });

});

export const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler('Invalid Id', 400));
    return res.status(200).send({ success: true, result: user });

});

export const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler('Invalid Id', 400));
    await user.deleteOne();
    return res.status(200).send({ success: true, msg: 'Deleted succesfully' });

});
