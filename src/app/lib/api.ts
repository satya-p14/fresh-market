export async function getBestSellers() {
    return [{ id: '1', name: 'Tomato', price: 1.2, image: '/tomato.png' }];
}

export async function getNewArrivals() {
    return [{ id: '2', name: 'Avocado', price: 2.5, image: '/avocado.png' }];
}

export async function getTopProductIds() {
    return ['1', '2'];
}

export async function getProductDetails(id: string) {
    return { id, name: 'Tomato', price: 1.2, image: '/tomato.png' };
}
