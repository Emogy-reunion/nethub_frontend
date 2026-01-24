import { cookies } from 'next/headers';
import NetworkComponent from '@/app/admin/products/networkComponent';


const BACKEND_URL = process.env.BACKEND_URL


const  AdminNetworkPage = async ({ searchParams }) => {

	const group = (await searchParams).group || "";
        const category = (await searchParams).category || "";

        try {

		let url = `${BACKEND_URL}/api/get_product_previews?`;
                if (group) url += `group=${group}&`;
                if (category) url += `category=${category}&`;

                const response = await fetch(url, {
                        method: 'GET',
                        headers: { cookie: (await cookies()).toString() },
                        cache: 'no-store',
                });

                if (!response.ok) {
                        throw new Error('Fail to fetch products. Refresh page and try again!');
                }

                const data = await response.json();

                return <NetworkComponent key={`${group}-${category}`} data={data} group={group} category={category} />;
        } catch(error) {
        }
};


export default AdminNetworkPage;
