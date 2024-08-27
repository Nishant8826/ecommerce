export type ProductCardProps = {
    productId: string,
    photo: string,
    name: string,
    price: number,
    stock: number,
    handler: () => void;
};
