import FormattedCurrency from "../utils/FormattedCurrency";
import type { BestSellersPage, Product } from "../utils/types";

export const revalidate = 60;
export async function getBestSellers() {
    const baseUrl = `http://localhost:${process.env.SERVER_PORT}`;

    try {
        const [idsRes, productsRes] = await Promise.all([
            fetch(`${baseUrl}/best-sellers`, { cache: 'no-store' }),
            fetch(`${baseUrl}/products`, { cache: 'no-store' }),
        ]);

        if (!idsRes.ok || !productsRes.ok) {
            throw new Error('Failed to fetch data from JSON Server');
        }

        const ids = await idsRes.json();
        const products = await productsRes.json();    
        return products.filter((product: Product) => ids.some((id: BestSellersPage) => product.id === String(id.productId)));

    } catch (error) {
        console.error('Best Sellers fetch error:', error);
        return null;
    }
}


const BestSellersPage = async () => {
    const bestSellers = await getBestSellers();
    if (bestSellers === null) {
        return (
            <div className="max-w-3xl mx-auto p-6 text-center text-red-600">
                <h2 className="text-2xl font-semibold mb-2">Oops! Something went wrong.</h2>
                <p>We couldn't load best sellers. Please try again later.</p>
            </div>
        );
    }
    if (bestSellers.length === 0) {
        return (
            <div className="max-w-3xl mx-auto p-6 text-center text-gray-600">
                <h2 className="text-2xl font-semibold mb-2">No Best Sellers Found</h2>
                <p>Please check back later.</p>
            </div>
        );
    }
    return (
        <section className="max-w-7xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">Best Sellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bestSellers.map((product: Product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-xl mb-4"
                        />
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-green-700 font-bold mt-2">
                                Price : <FormattedCurrency amount={Number(product.price)} currencyCode="INR" locale="en-IN" />
                            </span>
                            <span className="text-green-700 font-bold mt-2">Unit : {product.unit}</span>
                        </div>
                        <p className="text-green-700 font-bold mt-2">Desc : {product.description}</p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default BestSellersPage;
