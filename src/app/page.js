import { cookies } from 'next/headers';
import LandingComponent from '@/components/LandingComponent';


const BACKEND_URL = process.env.BACKEND_URL


const  LandingPage = async () => {

        try {

                const response = await fetch(`${BACKEND_URL}/api/get_product_previews`, {
                        method: 'GET',
                        cache: 'no-store',
                });

                if (!response.ok) {
                        throw new Error('Fail to fetch products. Refresh page and try again!');
                }

                const data = await response.json();

                return <LandingComponent data={data} />;
        } catch(error) {
        }
};


export default LandingPage;
