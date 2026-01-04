'use client';

import { AuthProvider } from '@/context/authContext';

export default function ClientWrapper({ children }) {
  	return <AuthProvider>{children}</AuthProvider>;
}

