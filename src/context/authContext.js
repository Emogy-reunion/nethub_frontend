'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'


const AuthContext = createContext();

export function AuthProvider({children}) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();


	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch('/api/user_data', {
					method: 'GET',
					credentials: 'include'
				});

				if (response.ok) {
					const data = await response.json();
					setUser(data);
				} else {
					setUser(null);
				}
			} catch {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, [])


	useEffect(() => {
		const interval = setInterval(async () => {

			try {
                		const response = await fetch('/api/refresh', {
                    			method: 'POST',
                    			credentials: 'include'
                		});

                		if (!response.ok) {
                    			setUser(null);
                    			router.push('/guest/login');
                		}
            		} catch {
                		setUser(null);
                		router.push('/guest/login');
            		}
        	}, 10 * 60 * 1000);

		return () => clearInterval(interval);
	}, []);

	const logout = async () => {
		const response = await fetch('/api/logout', {
			method: 'POST',
			credentials: 'include'
		});

		if (response.ok) {
			setUser(null);
			router.push('/login');
		}
	};


	return ( 
		<AuthContext.Provider value={{ user, loading, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);

	
