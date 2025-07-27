export type Product = {
    id: string;
    name: string;
    image: string;
    price: string | number;
    unit: string;
    description: string;
    stock: number;
};

export type BestSellersPage = {
    id: string;
    productId: string;
};

export type StockType = {
    productId: string;
    level: number;
    id: string;
};