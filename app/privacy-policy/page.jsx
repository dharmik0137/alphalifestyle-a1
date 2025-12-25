export const metadata = {
  title: "Privacy Policy | Alpha Fullfill",
  description: "Learn how Alpha Fullfill collects, uses, and protects your personal information. Read our comprehensive privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 lg:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-8">
              Alpha Fullfill values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the information you provide when using our website or services.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-3">We may collect the following information when you interact with our website or place an order:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Name, email address, phone number</li>
                <li>Shipping and billing address</li>
                <li>Payment details (processed securely via third-party payment gateways; we do not store card details)</li>
                <li>Order history and transaction information</li>
                <li>IP address, browser type, device information, and cookies for analytics purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-3">Your information is used to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Process and fulfill orders</li>
                <li>Communicate order updates, delivery status, and support requests</li>
                <li>Improve our website, products, and customer experience</li>
                <li>Prevent fraud and unauthorized transactions</li>
                <li>Send promotional offers (only if you opt in)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies & Tracking Technologies</h2>
              <p className="text-gray-700 mb-3">Alpha Fullfill uses cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Enhance website functionality</li>
                <li>Analyze traffic and user behavior</li>
                <li>Personalize user experience</li>
              </ul>
              <p className="text-gray-700 mt-3">
                You can choose to disable cookies through your browser settings; however, this may affect website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Sharing of Information</h2>
              <p className="text-gray-700 mb-3">
                We do not sell or rent your personal information. Your data may be shared only with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Shipping and logistics partners for order delivery</li>
                <li>Payment gateway providers for secure transactions</li>
                <li>Legal or regulatory authorities if required by law</li>
              </ul>
              <p className="text-gray-700 mt-3">
                All third-party partners are obligated to protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700">
                We implement reasonable security measures to protect your personal data from unauthorized access, misuse, or disclosure. However, no online transmission is 100% secure, and users share information at their own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. User Rights</h2>
              <p className="text-gray-700 mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access, update, or correct your personal information</li>
                <li>Opt out of promotional communications at any time</li>
                <li>Request deletion of your personal data, subject to legal obligations</li>
              </ul>
              <p className="text-gray-700 mt-3">
                To exercise these rights, please contact us using the details below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Links</h2>
              <p className="text-gray-700">
                Our website may contain links to third-party websites. Alpha Fullfill is not responsible for the privacy practices or content of such external sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Policy Updates</h2>
              <p className="text-gray-700">
                Alpha Fullfill reserves the right to update or modify this Privacy Policy at any time. Changes will be effective immediately upon posting on the website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 mb-3">
                If you have any questions or concerns regarding this Privacy Policy, please contact us:
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

