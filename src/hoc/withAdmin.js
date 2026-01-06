'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import Loading from '@/components/loading';

export default function withAdminAuth(WrappedComponent) {
	return function AdminProtected(props) {
		const { user, loading } = useAuth();
		const router = useRouter();

		useEffect(() => {
      			if (!loading) {
        			if (!user) {
          				// Not logged in → redirect to login
          				router.replace('/guest/login');
        			} else if (user.role !== 'admin') {
          				// Logged in but not admin → redirect to home
          				router.replace('/');
        			}
      			}
    		}, [user, loading]);

   		 // Optionally, render nothing while loading or redirecting
    		if (loading || !user || user.role !== 'admin') return <Loading />;

    		// User is admin → render wrapped component
    		return <WrappedComponent {...props} />;
  	};
}

