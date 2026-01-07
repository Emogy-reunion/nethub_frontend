import { cookies } from 'next/headers';
import ProductsComponent from '@/app/admin/products/productsComponent';


const BACKEND_URL = process.env.BACKEND_URL


const  AdminProductsPage = async () => {

	try {
		const cookie = cookies().toString();
		
		const response = await fetch(`${BACKEND_URL}/api/get_product_previews`, {
			method: 'GET',
			headers: { cookie },
			cache: 'no-store',
		});

		if (!response.ok) {
			throw new Error('Fail to fetch products. Refresh page and try again!');
		}

		const data = await response.json();
		
		return <ProductsComponent data={data} />;
	} catch(error) {
	}
};


export default AdminProductsPage;
