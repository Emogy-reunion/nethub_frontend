import { cookies } from 'next/headers';
import AccessoryComponent from '@/app/admin/products/accessories/accessoryComponent';


const BACKEND_URL = process.env.BACKEND_URL


const  AdminAccessoriesPage = async () => {

	const response = await fetch(`${BACKEND_URL}/api/get_product_previews?category=computer-accessories`, {
		method: 'GET',
                headers: { cookie: (await cookies()).toString() },
                cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Fail to fetch products. Refresh page and try again!');
	}

	const data = await response.json();

	return <AccessoryComponent data={data} />;
};


export default AdminAccessoriesPage;
