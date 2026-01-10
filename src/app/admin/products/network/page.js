import { cookies } from 'next/headers';
import NetworkComponent from '@/app/admin/products/network/networkComponent';


const BACKEND_URL = process.env.BACKEND_URL


const  AdminNetworkPage = async () => {

        try {

                const response = await fetch(`${BACKEND_URL}/api/get_product_previews?category=networking-devices`, {
                        method: 'GET',
                        headers: { cookie: (await cookies()).toString() },
                        cache: 'no-store',
                });

                if (!response.ok) {
                        throw new Error('Fail to fetch products. Refresh page and try again!');
                }

                const data = await response.json();

                return <NetworkComponent data={data} />;
        } catch(error) {
        }
};


export default AdminNetworkPage;
