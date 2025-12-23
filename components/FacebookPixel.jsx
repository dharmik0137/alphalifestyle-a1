'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function FacebookPixel() {
  const pathname = usePathname();
  const pixelId = '1169945847981913';


  useEffect(() => {
    if (!pixelId) {
      console.warn('Facebook Pixel ID is not set. Please add NEXT_PUBLIC_FACEBOOK_PIXEL_ID to your environment variables.');
      return;
    }

    // Initialize Facebook Pixel
    if (typeof window !== 'undefined' && !window.fbq) {
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js'
      );

      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }

    // Track page views on route changes
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, pixelId]);

  if (!pixelId) {
    return null;
  }

  return (
    <>
      <noscript>
        <img
          className='fbpixel'
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Helper function to track custom events
export const trackFacebookEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventData);
  }
};

// Helper function to track conversions
export const trackFacebookConversion = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventData);
  }
};

