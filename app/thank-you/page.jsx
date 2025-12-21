'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mongoId = searchParams.get('id');
  const orderNumberFromQuery = searchParams.get('order');

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mongoId) {
      setLoading(false);
      setError('Missing order information.');
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/order?id=${mongoId}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to load order details');
        }
        setOrder(data);
      } catch (err) {
        setError(err.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [mongoId]);

  const handleBackToHome = () => {
    router.push('/');
  };

  const displayOrderNumber = order?.orderId || order?.orderNumber || orderNumberFromQuery || '—';

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Thank You For Your Order!
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Your order has been received and is being processed.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Order ID
              </p>
              <p className="text-lg font-semibold text-gray-900">
                #{displayOrderNumber}
              </p>
            </div>
            {order && (
              <div className="text-left sm:text-right">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Total Amount
                </p>
                <p className="text-lg font-semibold text-green-700">
                  Rs. {(Number(order.price) + Number(order.shipping || 0)).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>

        {loading && (
          <p className="text-center text-sm text-gray-500">Loading your order details...</p>
        )}

        {error && !loading && (
          <p className="text-center text-sm text-red-500 mb-4">{error}</p>
        )}

        {order && !loading && (
          <div className="space-y-5">
            {/* Items */}
            <div className="border border-gray-100 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Order Summary
              </h2>
              {order.productDetails?.map((item, index) => (
                <div key={index} className="flex justify-between items-start gap-3 text-sm mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    {item.size && (
                      <p className="text-xs text-gray-500 mt-0.5">Size: {item.size}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-0.5">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="border border-gray-100 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                Shipping Details
              </h2>
              <p className="text-sm text-gray-800 font-medium mb-1">
                {order.name}
              </p>
              <p className="text-sm text-gray-600">
                {order.address}, {order.landmark && `${order.landmark}, `}
                {order.city}, {order.state} - {order.pincode}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Mobile: {order.number}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleBackToHome}
            className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 sm:p-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">Loading order details...</p>
          </div>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}

