import GuestAccessoryComponent from '@/app/guest/products/accessories/guestAccessoryComponent';


const BACKEND_URL = process.env.BACKEND_URL


const  GuestAccessoriesPage = async () => {

        const response = await fetch(`${BACKEND_URL}/api/get_product_previews?category=computer-accessories`, {
                method: 'GET',
                cache: 'no-store',
        });

        if (!response.ok) {
                throw new Error('Fail to fetch products. Refresh page and try again!');
        }

        const data = await response.json();

        return <GuestAccessoryComponent data={data} />;
};


export default GuestAccessoriesPage;
