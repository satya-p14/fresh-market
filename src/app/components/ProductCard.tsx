'use client';
import Image from 'next/image';
interface Product {
    image: string;
    name: string;
    price: string | number;
    stock: number;
}

interface ProductCardProps {
    product: Product;
    showStock?: boolean;
}

export default function ProductCard({ product, showStock = true }: ProductCardProps) {
    return (
        <div className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition relative">
            <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-green-700 font-bold mt-1">{product.price}</p>
            {showStock && (
                <p className="text-sm text-gray-600 mt-2">
                    In Stock: <span className="font-semibold">{product.stock}</span>
                </p>
            )}
            {showStock && product.stock === 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Out of Stock
                </span>
            )}
        </div>
    );
}
