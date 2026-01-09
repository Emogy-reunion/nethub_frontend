import { cookies } from 'next/headers';
import GuestNetworkComponent from '@/app/guest/products/network/guestNetworkComponent';


const BACKEND_URL = process.env.BACKEND_URL


const  GuestNetworkPage = async () => {

        try {

                const response = await fetch(`${BACKEND_URL}/api/get_product_previews?category=networking-devices`, {
                        method: 'GET',
                        cache: 'no-store',
                });

                if (!response.ok) {
                        throw new Error('Fail to fetch products. Refresh page and try again!');
                }

                const data = await response.json();

                return <GuestNetworkComponent data={data} />;
        } catch(error) {
        }
};


export default GuestNetworkPage;
