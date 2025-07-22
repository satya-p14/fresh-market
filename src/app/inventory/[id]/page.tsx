import { Product } from "@/app/utils/types";
import Link from "next/link";

export async function generateStaticParams() {
    const baseUrl = `http://localhost:${process.env.SERVER_PORT}`;
    const res = await fetch(baseUrl + '/products');
    const products = await res.json();
    console.log('Available Products:', products);

    if (!res.ok || res.status === 404) {
        throw new Error('Failed to fetch data from JSON Server');
    }

    return products.map((product: Product) => ({
        id: product.id.toString()
    }));
}

export async function generateMetadata({ params }: { params: { id: string; }; }) {
    const baseUrl = `http://localhost:${process.env.SERVER_PORT}`;
    const res = await fetch(baseUrl + `/products/${params.id}`, {
        cache: 'force-cache',
    });
    if (!res.ok || res.status === 404) {
        throw new Error('Failed to fetch data from JSON Server');
    }
    const product = await res.json();

    return {
        title: product.name,
        description: `Details about ${product.name}`,
    };
}

export default async function ProductPage({ params }: { params: { id: string; }; }) {
    const baseUrl = `http://localhost:${process.env.SERVER_PORT}`;
    const res = await fetch(baseUrl + `/products/${params.id}`, {
        cache: 'force-cache'
    });

    if (!res.ok) {
        return (
            <div className="max-w-3xl mx-auto p-6 text-center text-red-600">
                <h2 className="text-2xl font-semibold">Product not found</h2>
            </div>
        );
    }

    const product = await res.json();
    console.log('Product Details:', product);

    return (
        <section className="max-w-3xl mx-auto p-6">
            <Link href="/inventory">
                <p className="mb-6 inline-block text-indigo-600 hover:underline">
                    ← Back to Inventory
                </p>
            </Link>
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded-xl mb-6"
            />
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-700 mt-2">In Stock: <strong>{product.stock}</strong></p>
            {product.description && (
                <p className="mt-4 text-gray-600">{product.description}</p>
            )}
            <Link href="/inventory">
                <p className="mt-6 inline-block text-indigo-600 hover:underline">
                    ← Back to Inventory
                </p>
            </Link>
        </section>
    );
}
