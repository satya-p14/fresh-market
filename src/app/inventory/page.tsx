import Link from "next/link";
import { Product, StockType } from "../utils/types";
import FormattedCurrency from "../utils/FormattedCurrency";

async function getInventoryData() {
    const baseUrl = `http://localhost:${process.env.SERVER_PORT}`;
    try {
        const [stockRes, productsRes] = await Promise.all([
            fetch(`${baseUrl}/stock`, { cache: 'no-store' }),
            fetch(`${baseUrl}/products`, { cache: 'no-store' }),
        ]);
        if (!stockRes.ok || !productsRes.ok) {
            throw new Error('Failed to fetch data from JSON Server');
        }
        const stocks = await stockRes.json();
        const products = await productsRes.json();
        return products.filter((product: Product) => stocks.find((id: StockType) => product.id === String(id.productId)));
    } catch (error) {
        console.error('New Arrivals fetch error:', error);
        return null;
    }
}

export default async function InventoryPage() {
    const products = await getInventoryData();
    return (
        <section className="max-w-7xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">Inventory Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: Product) => (
                    <Link href={`/inventory/${product.id}`} key={product.id}>
                        <div className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition cursor-pointer">
                            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-green-700 font-bold mt-2">
                                    Price : <FormattedCurrency amount={Number(product.price)} currencyCode="INR" locale="en-IN" />
                                </span>
                                <span className="text-green-700 font-bold mt-2">Unit : {product.unit}</span>
                            </div>
                            <p className="text-green-700 font-bold mt-2">Desc : {product.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
