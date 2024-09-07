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

export type SearchRequestQuery = {
    search?: string,
    price?: string,
    category?: string,
    sort?: string,
    page?: string,
}

export type BaseQuery = {
    name?: {
        $regex: string,
        $options: string
    },
    price?: { $lte: number },
    category?: string
}

export type InvalidateCache = {
    product? : boolean,
    order? : boolean,
    admin? : boolean,
}
