'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function AdminRouteProtection({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only protect admin routes (not login page)
    if (pathname?.startsWith('/admin') && pathname !== '/admin/login') {
      const auth = sessionStorage.getItem('adminAuth');

      if (auth !== 'true') {
        router.push('/admin/login');
        return;
      }

      setIsAuthorized(true);
    } else {
      setIsAuthorized(true);
    }

    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (pathname?.startsWith('/admin') && pathname !== '/admin/login' && !isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

