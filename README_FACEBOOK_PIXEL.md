# Facebook Pixel Setup Guide

## Overview
Facebook Pixel has been integrated into your Next.js e-commerce application to track user interactions and conversions.

## Setup Instructions

### 1. Get Your Facebook Pixel ID
1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Select your Pixel or create a new one
3. Copy your Pixel ID (it looks like: `123456789012345`)

### 2. Environment Variables
Your Facebook Pixel has been configured with:
- **Pixel ID:** `6835364276579394`
- **Access Token:** Configured (stored securely)

The Pixel ID is set up and ready to use. The access token can be used for server-side API calls if needed.

**Important:** Make sure your `.env.local` file contains:
```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=6835364276579394
FACEBOOK_ACCESS_TOKEN=EAAzjsuqjvO0BQFxXxyQcIUY9kQZBlr7Ub1BIMBLBiLZBMTuK5ZCBK6G9O82TQ4MDRqiSBTidcljIBSnxuGqzRX9XOaywkWBnR9uZArIunraHHV1ZC6Reei4djsGPOlhT2CI91clSrhkt7HnUvlPfLKKULngyMQenHZCXjpBYHcBXqM9MKR3ZAeKIKZBAKNhZATqsbZBgZDZD
```

**Security Note:** Never commit `.env.local` to version control. It's already in `.gitignore`.

### 3. Restart Your Development Server
After adding the environment variable, restart your Next.js development server:

```bash
npm run dev
```

## Tracked Events

The following Facebook Pixel events are automatically tracked:

### 1. PageView
- **When**: Automatically tracked on every page load and route change
- **Location**: `components/FacebookPixel.jsx`

### 2. InitiateCheckout
- **When**: User clicks "Order Now" button on product page
- **Data Tracked**:
  - Product name
  - Product ID
  - Product price
  - Quantity
  - Currency (INR)
- **Location**: `app/best-seller/[id]/page.jsx`

### 3. Purchase
- **When**: Order is successfully placed
- **Data Tracked**:
  - Product name
  - Product ID
  - Total order value
  - Quantity
  - Currency (INR)
- **Location**: `components/OrderModal/index.jsx`

## Custom Event Tracking

You can track custom events anywhere in your app using the helper functions:

```javascript
import { trackFacebookEvent } from '@/components/FacebookPixel';

// Track a custom event
trackFacebookEvent('AddToCart', {
  content_name: 'Product Name',
  content_ids: ['product-123'],
  value: 999.00,
  currency: 'INR',
});
```

## Available Helper Functions

### `trackFacebookEvent(eventName, eventData)`
Track any custom Facebook Pixel event.

**Parameters:**
- `eventName` (string): Name of the event (e.g., 'AddToCart', 'ViewContent')
- `eventData` (object): Optional event parameters

**Example:**
```javascript
trackFacebookEvent('ViewContent', {
  content_name: 'Product Name',
  content_ids: ['product-123'],
  content_type: 'product',
  value: 999.00,
  currency: 'INR',
});
```

### `trackFacebookConversion(eventName, eventData)`
Alias for `trackFacebookEvent` - tracks conversion events.

## Testing

1. Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
2. Navigate through your site
3. Check that events are firing correctly in the extension

## Troubleshooting

### Pixel Not Loading
- Verify `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` is set correctly in `.env.local`
- Check browser console for errors
- Ensure the environment variable starts with `NEXT_PUBLIC_` (required for client-side access)

### Events Not Tracking
- Verify Pixel ID is correct
- Check Facebook Pixel Helper extension
- Ensure events are being called after the Pixel has loaded
- Check browser console for any JavaScript errors

## Production Deployment

Make sure to add the `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` environment variable to your hosting platform:
- **Vercel**: Add in Project Settings → Environment Variables
- **Netlify**: Add in Site Settings → Environment Variables
- **Other platforms**: Add according to their documentation

## Additional Resources

- [Facebook Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel)
- [Facebook Events Manager](https://business.facebook.com/events_manager)
- [Standard Events Reference](https://developers.facebook.com/docs/facebook-pixel/reference)

