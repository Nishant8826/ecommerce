import { NextFunction, Request, Response } from "express";

export interface NewUser {
    _id: string,
    name: string,
    email: string,
    photo: string,
    role: string,
    gender: string,
    dob: Date,
}

export interface NewProduct {
    name: string,
    category: string,
    price: number,
    stock: number,
}

export type ControllerType = (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
