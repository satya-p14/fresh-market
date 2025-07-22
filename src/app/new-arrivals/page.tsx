import FormattedCurrency from "../utils/FormattedCurrency";
import { BestSellersPage, Product } from "../utils/types";

export const dynamic = 'force-dynamic';
async function getNewArrivals() {
    const baseUrl = `http://localhost:${process.env.SERVER_PORT}`;
    try {
        const [idsRes, productsRes] = await Promise.all([
            fetch(`${baseUrl}/new-arrivals`, { cache: 'no-store' }),
            fetch(`${baseUrl}/products`, { cache: 'no-store' }),
        ]);
        if (!idsRes.ok || !productsRes.ok) {
            throw new Error('Failed to fetch data from JSON Server');
        }
        const ids = await idsRes.json();
        const products = await productsRes.json();
        return products.filter((product: Product) => ids.some((id: BestSellersPage) => product.id === String(id.productId)));
    } catch (error) {
        console.error('New Arrivals fetch error:', error);
        return null;
    }
}

const NewArrivalsPage = async () => {
    const newArrivals = await getNewArrivals();
    if (newArrivals === null) {
        return (
            <div className="max-w-3xl mx-auto p-6 text-center text-red-600">
                <h2 className="text-2xl font-semibold mb-2">Error Loading New Arrivals</h2>
                <p>Please try again later.</p>
            </div>
        );
    }

    if (newArrivals.length === 0) {
        return (
            <div className="max-w-3xl mx-auto p-6 text-center text-gray-600">
                <h2 className="text-2xl font-semibold mb-2">No New Arrivals</h2>
                <p>Come back soon for the latest products!</p>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newArrivals.map((product: Product) => (
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

export default NewArrivalsPage;
