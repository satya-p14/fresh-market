"use client";
import useSWR from 'swr';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
interface StockProps {
    productId: number | string;
}

const fetcher = (url: string | URL | Request) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error('Stock fetch failed');
        return res.json();
    });

export default function StockLevel({ productId }: StockProps) {    
    const baseUrl = `${API_BASE_URL}/stock?productId=${productId}`;    
    const { data, error, isLoading } = useSWR(baseUrl,
        fetcher,
        {
            refreshInterval: 5000,
            revalidateOnFocus: true,
        }
    );
    if (isLoading) {
        return <p className="text-sm text-gray-500 italic">Checking stock...</p>;
    }
    if (error) {
        return <p className="text-sm text-red-500">Failed to load stock</p>;
    }
    if (!data || data.length === 0) {
        return <p className="text-sm text-gray-500">No stock info available</p>;
    }
    const stock = data[0]?.level ?? 0;
    return (
        <p className="text-sm">
            In stock: <span className="font-semibold">{stock}</span>
        </p>
    );
}
