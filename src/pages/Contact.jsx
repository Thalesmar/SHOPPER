import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:contact@shopper.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">We'd love to hear from you. Get in touch with our team.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 mb-24">
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Have a question, suggestion, or need help? Our team is here to assist you.
              Reach out to us through any of the channels below.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Customer Support</h3>
                <p className="text-sm text-gray-500 mb-3">For order inquiries, returns, and general support</p>
                <a href="mailto:support@shopper.com" className="text-[#ff4141] font-medium hover:underline">support@shopper.com</a>
                <p className="text-xs text-gray-400 mt-2">Response time: Within 24 hours</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Help Center</h3>
                <p className="text-sm text-gray-500 mb-3">For technical issues and account problems</p>
                <a href="mailto:help@shopper.com" className="text-[#ff4141] font-medium hover:underline">help@shopper.com</a>
                <p className="text-xs text-gray-400 mt-2">Response time: Within 12 hours</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Wholesale Inquiries</h3>
                <p className="text-sm text-gray-500 mb-3">For bulk orders and business partnerships</p>
                <a href="mailto:wholesale@shopper.com" className="text-[#ff4141] font-medium hover:underline">wholesale@shopper.com</a>
                <p className="text-xs text-gray-400 mt-2">Response time: Within 48 hours</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Partnerships</h3>
                <p className="text-sm text-gray-500 mb-3">For brand collaborations and business opportunities</p>
                <a href="mailto:partnerships@shopper.com" className="text-[#ff4141] font-medium hover:underline">partnerships@shopper.com</a>
                <p className="text-xs text-gray-400 mt-2">Response time: Within 48 hours</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Office Information</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Headquarters</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">123 Fashion Street<br />
                    New York, NY 10001<br />
                    United States</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Business Hours</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                    Saturday: 10:00 AM - 4:00 PM EST<br />
                    Sunday: Closed</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Phone</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">+1 (555) 123-4567<br />
                    Toll-free: 1-800-SHOPPER</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100 h-fit">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ff4141] focus:ring-2 focus:ring-[#ff4141] focus:ring-opacity-20 outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ff4141] focus:ring-2 focus:ring-[#ff4141] focus:ring-opacity-20 outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ff4141] focus:ring-2 focus:ring-[#ff4141] focus:ring-opacity-20 outline-none transition-colors bg-white"
              >
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Order Support">Order Support</option>
                <option value="Returns & Exchanges">Returns & Exchanges</option>
                <option value="Product Question">Product Question</option>
                <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                <option value="Partnership Opportunity">Partnership Opportunity</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="6"
                required
                placeholder="Please describe your inquiry in detail..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#ff4141] focus:ring-2 focus:ring-[#ff4141] focus:ring-opacity-20 outline-none transition-colors resize-y"
              ></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-[#ff4141] text-white font-bold rounded-lg hover:bg-[#e63b3b] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="text-center bg-gray-50 rounded-3xl p-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Immediate Help?</h3>
        <p className="text-gray-600 mb-8">Check out our FAQ section or browse our help center for quick answers.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors">Back to Shop</Link>
          <a href="mailto:support@shopper.com" className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors border border-gray-200">Email Support</a>
        </div>
      </div>
    </div>
  )
}

export default Contact
