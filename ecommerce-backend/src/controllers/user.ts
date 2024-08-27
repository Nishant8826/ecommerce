import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUser } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";


export const newUser = TryCatch(async (req: Request<{}, {}, NewUser>, res: Response, next: NextFunction) => {
    const { name, photo, role, email, _id, gender, dob } = req.body;

    let user = await User.findById(_id);
    if (user) {
        return res.status(200).send({ success: true, msg: `Welcome ${user.name}` });
    };

    if (!name || !photo || role || email || _id || gender || dob) {
        return next(new ErrorHandler('Please add all fields', 400));
    };

    user = await User.create({
        name, photo, role, email, _id, gender, dob: new Date(dob)
    });

    return res.status(200).send({ success: true, msg: `Welcome ${user.name}` });
})