export const metadata = {
  title: "Shipping Policy | Alpha Fullfill",
  description: "Learn about our shipping policy, delivery timelines, shipping charges, and order tracking at Alpha Fullfill.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 lg:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Shipping Policy
          </h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-8">
              At Alpha Fullfill, we aim to deliver your orders in a timely and efficient manner. Please read our shipping policy carefully to understand how your orders are processed and delivered.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Order Processing</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All orders are processed within 1–3 business days after order confirmation.</li>
                <li>Orders are not processed, shipped, or delivered on Sundays or public holidays.</li>
                <li>In case of high order volume, shipments may be delayed slightly. Customers will be informed accordingly.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Shipping Time & Delivery</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Estimated delivery time is 3–7 business days, depending on your location.</li>
                <li>Delivery timelines may vary due to factors beyond our control such as weather conditions, courier delays, or regional restrictions.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Shipping Charges</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Shipping charges (if applicable) will be clearly mentioned at checkout before payment.</li>
                <li>Any promotional free shipping offers will be communicated on the website or during checkout.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Delivery Locations</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We currently ship across India.</li>
                <li>Delivery to remote or restricted areas may take additional time.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Order Tracking</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Once your order is shipped, you will receive a tracking ID via SMS or email to track your shipment.</li>
                <li>You can track your order through the courier partner's website using the provided tracking details.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cash on Delivery (COD)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>COD is available on selected pin codes only.</li>
                <li>Additional COD charges may apply and will be displayed at checkout.</li>
                <li>Orders placed using COD may require OTP or call confirmation before dispatch.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Delayed or Undelivered Orders</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>If your order is delayed beyond the estimated delivery timeline, please contact our support team.</li>
                <li>Alpha Fullfill is not responsible for delays caused due to incorrect shipping information provided by the customer.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Incorrect Address or Failed Delivery</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Customers are responsible for providing accurate shipping details.</li>
                <li>Orders returned due to incorrect address, refusal, or failed delivery attempts may incur re-shipping charges.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 mb-3">
                For any shipping-related queries or assistance, please reach out to us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">📧 Email:</span> <a href="mailto:hi@alphafulfill.in" className="text-blue-600 hover:underline">hi@alphafulfill.in</a>
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">📞 Phone:</span> <a href="tel:8880100100" className="text-blue-600 hover:underline">8880100100</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

