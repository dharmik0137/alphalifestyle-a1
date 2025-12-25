export const metadata = {
  title: "Return & Refund Policy | Alpha Fullfill",
  description: "Learn about our return and refund policy at Alpha Fullfill. Find out how to return products, eligibility criteria, and refund process.",
};

export default function ReturnRefundPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 lg:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Return & Refund Policy
          </h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-8">
              At Alpha Fullfill, we strive to ensure complete customer satisfaction with every purchase. If you are not entirely satisfied with your order, we're here to help.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Eligibility for Returns</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Products can be returned within 7 days of delivery.</li>
                <li>Items must be unused, unwashed, unworn, and in their original condition with all tags and packaging intact.</li>
                <li>Returns are accepted only if the product is:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Damaged</li>
                    <li>Defective</li>
                    <li>Incorrect item delivered (wrong size, color, or product)</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Non-Returnable Items</h2>
              <p className="text-gray-700 mb-3">The following items are not eligible for return or refund:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Innerwear, lingerie, socks, or intimate apparel</li>
                <li>Items purchased during clearance or sale (unless damaged or defective)</li>
                <li>Products showing signs of use, wash, or damage caused after delivery</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Return Process</h2>
              <p className="text-gray-700 mb-3">To initiate a return request:</p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Contact us at <a href="mailto:hi@alphafulfill.in" className="text-blue-600 hover:underline">hi@alphafulfill.in</a> or call <a href="tel:8880100100" className="text-blue-600 hover:underline">8880100100</a> within 7 days of delivery.</li>
                <li>Share your order ID, reason for return, and clear images/videos of the product (if applicable).</li>
                <li>Once approved, we will arrange a reverse pickup or guide you through the return process.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Refund Policy</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>After the returned product is received and inspected, refunds will be processed within 7–10 business days.</li>
                <li>Refunds will be issued to the original mode of payment used during checkout.</li>
                <li>Shipping charges (if any) are non-refundable, unless the return is due to our error.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Exchange Policy</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Exchanges are subject to stock availability.</li>
                <li>If the requested size or product is unavailable, a refund will be issued as per the refund policy.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Damaged or Defective Products</h2>
              <p className="text-gray-700">
                If you receive a damaged or defective product, please notify us within 48 hours of delivery with supporting images/videos. We will ensure a replacement or refund at no extra cost.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cancellation Policy</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Orders can be cancelled before dispatch only.</li>
                <li>Once shipped, orders cannot be cancelled.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 mb-3">
                For any questions or support regarding returns or refunds, feel free to reach out to us:
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

