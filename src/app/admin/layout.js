import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

const BACKEND_URL = process.env.BACKEND_URL

export default async function AdminLayout({ children }) {

	try {
		let response = await fetch(`${BACKEND_URL}/api/is_logged_in`, {
			method: 'GET',
			headers: { cookie: (await cookies()).toString() },
			cache: 'no-store',
		});


		if (!response.ok) {
			redirect('/guest/login');
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
