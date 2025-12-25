export const metadata = {
  title: "Terms & Conditions | Alpha Fullfill",
  description: "Read the terms and conditions for using Alpha Fullfill website and services. Understand your rights and obligations.",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 lg:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-8">
              By accessing or using the Alpha Fullfill website and placing an order, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully before using our services.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. General</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Alpha Fullfill reserves the right to modify these Terms & Conditions at any time without prior notice.</li>
                <li>Continued use of the website after changes are posted constitutes acceptance of the revised Terms.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligibility</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>By using this website, you confirm that you are at least 18 years of age or using the website under parental or legal guardian supervision.</li>
                <li>You agree to provide accurate and complete information while placing an order.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Product Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We make every effort to display product details, colors, and images as accurately as possible.</li>
                <li>Actual product colors may vary slightly due to screen resolution or lighting conditions.</li>
                <li>All product descriptions and prices are subject to change without notice.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Pricing & Payment</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All prices are listed in Indian Rupees (INR) and are inclusive/exclusive of applicable taxes as mentioned on the website.</li>
                <li>Alpha Fullfill reserves the right to cancel any order in case of incorrect pricing or technical errors.</li>
                <li>Payments must be completed through authorized payment gateways only.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Order Acceptance & Cancellation</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Order confirmation does not guarantee acceptance. Alpha Fullfill reserves the right to cancel or refuse any order.</li>
                <li>Orders can be cancelled before dispatch only. Once shipped, orders cannot be cancelled.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Shipping & Delivery</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Shipping and delivery timelines are estimates and may vary due to external factors.</li>
                <li>Alpha Fullfill is not responsible for delays caused by courier partners, natural events, or incorrect address details provided by the customer.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Returns, Refunds & Exchanges</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Returns and refunds are governed by our Return & Refund Policy, available on the website.</li>
                <li>Alpha Fullfill reserves the right to inspect returned products before approving refunds or exchanges.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cash on Delivery (COD)</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>COD service is available on selected pin codes only.</li>
                <li>Alpha Fullfill may require OTP or call verification before dispatching COD orders.</li>
                <li>Repeated order refusals or failed deliveries may result in COD restriction for the customer.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Intellectual Property</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All content on the website, including logos, images, text, and graphics, is the property of Alpha Fullfill.</li>
                <li>Unauthorized use, reproduction, or distribution of content is strictly prohibited.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Alpha Fullfill shall not be liable for any indirect, incidental, or consequential damages arising from the use of the website or products.</li>
                <li>Liability, if any, shall be limited to the value of the order placed.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. User Conduct</h2>
              <p className="text-gray-700 mb-3">Users agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Misuse the website or engage in fraudulent activities</li>
                <li>Upload or transmit harmful or malicious content</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law & Jurisdiction</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>These Terms & Conditions shall be governed by and construed in accordance with the laws of India.</li>
                <li>Courts in India shall have exclusive jurisdiction over any disputes.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-3">
                For any questions or concerns regarding these Terms & Conditions, please contact us:
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

