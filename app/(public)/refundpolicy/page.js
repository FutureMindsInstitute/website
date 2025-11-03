export default function RefundPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 md:px-20">
      <div className="max-w-5xl text-start mx-auto bg-white text-gray-800 shadow-lg rounded-2xl p-8 md:p-12">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">Future Minds Institute Refund Policy</h3>
        <p className="text-sm text-gray-500 text-center mb-8">Last updated: September 15, 2025</p>
        <p className="mb-6">Thank you for choosing <strong>Future Minds Institute</strong>. We are committed to providing high-quality educational services, training programs, and resources. However, we understand that circumstances may arise where a refund request is necessary. This Refund Policy explains the terms and conditions for refunds across our various services.</p>
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Course Enrollment Refunds</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Online Courses (Self-Paced):</strong> Refunds within 24 hours if less than 10% accessed.</li>
              <li><strong>Live/Instructor-Led Courses:</strong> 50% refund if canceled ≥48h before first session; otherwise non-refundable.</li>
              <li><strong>Workshops/Seminars:</strong> 50% refund if canceled ≥72h before the event; otherwise non-refundable.</li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Subscription or Membership Services</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Subscriptions can be canceled anytime from your account settings.</li>
              <li>No refunds after 24 hours of purchase.</li>
              <li>Annual/monthly subscriptions are non-refundable except the 24-hour 50% exception.</li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Certification Programs</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Refunds within 7 days of enrollment and before more than one module is accessed.</li>
              <li>After certification is issued, no refunds.</li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Digital Products</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>All digital product purchases are non-refundable once downloaded or accessed.</li>
              <li>For access issues, contact support.</li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Technical Issues</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full refund or course credit for platform failures (not user error), reported within 24 hours.</li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Requesting a Refund</h3>
            <p>Contact <a href="mailto:support@futuremindsinstitute.com" className="text-blue-600 underline">support@futuremindsinstitute.com</a> with order details, reason, and evidence if any. Typical processing time: 5–7 business days.</p>
          </section>
        </div>
      </div>
    </div>
  );
}


