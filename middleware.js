import { NextResponse } from 'next/server';


const BACKEND_URL = process.env.BACKEND_URL;

export async function middleware(req) {
	const { pathname } = req.nextUrl;
	const cookie = req.headers.get('cookie');

	const isAdminRoute = pathname.startsWith('/admin');

	//public routes
	if (!isAdminRoute) {
		return NextResponse.next();
	}

	// check is user is logged
	let authResponse = await fetch(`${BACKEND_URL}/api/is_logged_in`, {
		headers: { cookie }
	});

	// refresh token if expired
	if (!authResponse.ok) {
		let refreshRes = await fetch(`${BACKEND_URL}/api/refresh_token`, {
			method: 'POST',
			headers: { cookie }
		});

		// if refresh fails -> redirect to login
		if (!refreshRes.ok) {
			return NextResponse.redirect(new URL('/guest/login', req.url));
		}

		// retry authentication after refreshing
		authResponse = await fetch(`${BACKEND_URL}/api/is_logged_in`, {
			headers: { cookie }
		});
	}

	if (!authResponse.ok) {
		return NextResponse.redirect(new URL('/guest/login', req.url));
	}

	const data = await authResponse.json()


	//role enforcement
	if (isAdminRoute && data.role != 'admin') {
		return NextResponse.redirect(new URL('/', req.url));
	}

	// everything is okay: allow
	return NextResponse.next()
}


export const config = {
  matcher: ['/admin/:path*'],
};
