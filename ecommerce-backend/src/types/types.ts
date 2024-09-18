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
    product?: boolean,
    order?: boolean,
    admin?: boolean,
    userId?: string,
    orderId?: string,
    productId?: string | string[],
}

export type ShippingInfoType = {
    address: string,
    city: string,
    state: string,
    country: string,
    pinCode: number,
}

export type OrderItemType = {
    name: string,
    photo: string,
    price: number,
    quantity: number,
    productId: string
}

export interface NewOrderRequestBody {
    shippingInfo: ShippingInfoType,
    user: string,
    status: string,
    subtotal: number,
    tax: number,
    shippingCharges: number,
    discount: number,
    total: number,
    orderItems: OrderItemType[],
}

export interface NewCouponBody {
    code: string,
    amount: number
}
