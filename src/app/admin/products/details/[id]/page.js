import { cookies } from 'next/headers';
import NetworkDetailsComponent from '@/app/admin/products/details/networkDetailsComponent';


const BACKEND_URL = process.env.BACKEND_URL;


const  AdminNetworkDetailsPage = async ({params}) => {
		const resolvedParams = await params; 
  		const { id } = resolvedParams;
		console.log(id)

                const response = await fetch(`${BACKEND_URL}/api/get_product_details/${id}`, {
                        method: 'GET',
                        cache: 'no-store',
                });

                if (!response.ok) {
                        throw new Error('Fail to fetch products. Refresh page and try again!');
                }

                const data = await response.json();
		const productData = data.product_details;

                return <NetworkDetailsComponent product={productData} />;
};


export default AdminNetworkDetailsPage;
