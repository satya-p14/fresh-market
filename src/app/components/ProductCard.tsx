'use client';
import Image from 'next/image';
import StockLevel from './StockLevel';
import FormattedCurrency from '../utils/FormattedCurrency';
import { Product } from '../utils/types';

interface ProductCardProps {
    product: Product;
    showStock?: boolean;
}

export default function ProductCard({ product, showStock = true }: ProductCardProps) {
    return (
        <div className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition relative">
            <div className="relative w-full h-40 mb-2 rounded-xl overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <h3 className="text-xl font-semibold text-pink-600">{product.name}</h3>
            Price : <span className="text-sm text-gray-700 font-semibold">
                <FormattedCurrency amount={Number(product.price)} currencyCode="INR" locale="en-IN" />
            </span>
            <p className='text-sm'>Unit : <span className="text-sm text-gray-600 font-semibold">{product.unit}</span></p>
            <p className='text-sm'>Desc : <span className="text-sm text-gray-600 font-semibold">{product.description}</span></p>
            {showStock && (
                <div className="text-sm text-gray-600">
                    <StockLevel productId={product.id} />
                </div>
            )}
            {showStock && product.stock === 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Out of Stock
                </span>
            )}
        </div>
    );
}
