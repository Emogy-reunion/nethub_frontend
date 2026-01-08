import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const BACKEND_URL = process.env.BACKEND_URL

export default async function AdminLayout({ children }) {

	try {
		// forward cookies to backend
		const cookie = cookies().toString();

		let response = await fetch(`${BACKEND_URL}/api/is_logged_in`, {
			method: 'GET',
			headers: { cookie }
			cache: 'no-store',
		});


		if (!response.ok) {
			
			const refreshRes = await fetch(`${BACKEND_URL}/api/refresh_token`, {
				method: 'POST', 
				headers: { cookie },
				cache: 'no-store',
			});

			if (!refreshRes.ok) {
				redirect('/guest/login');
			}


			response = await fetch(`${BACKEND_URL}/api/is_logged_in`, {
				method: 'GET',
                                headers: { cookie }
                                cache: 'no-store',
                	});
		}

		const data = await response.json();

		if (data.role != 'admin') {
			redirect('/guest/login');
		}

		return children;
	} catch(error) {
		redirect('/guest/login');
	}
}
