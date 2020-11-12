import * as ApiHelper from '../ApiHelper';

export function fetchProductsAndPrices() {
	const productsPromise = ApiHelper.fetchProducts();
	const inventoryStatusPromise = ApiHelper.getInventoryStatus();

	return Promise.all([ productsPromise, inventoryStatusPromise ])
		.then((jsons) => {
			if (jsons[0].code !== 'success' && jsons[1].code !== 'success') {
				alert('Failed to load products. Refresh page.');
			}

			const products = jsons[0].data || [];
			const inventoryStatus = jsons[1].data || [];

			return products.map(product => {
				const inventoryProduct = inventoryStatus.find(inv => inv.barcode === product.barcode);

				return { ...product, ...inventoryProduct };
			});
		});
}
