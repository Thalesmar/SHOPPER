import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './CSS/Contact.css'

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
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Get in touch with our team.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <section className="contact-section">
            <h2>Get in Touch</h2>
            <p>
              Have a question, suggestion, or need help? Our team is here to assist you. 
              Reach out to us through any of the channels below.
            </p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <h3>Customer Support</h3>
                <p>For order inquiries, returns, and general support</p>
                <a href="mailto:support@shopper.com">support@shopper.com</a>
                <p>Response time: Within 24 hours</p>
              </div>

              <div className="contact-method">
                <h3>Help Center</h3>
                <p>For technical issues and account problems</p>
                <a href="mailto:help@shopper.com">help@shopper.com</a>
                <p>Response time: Within 12 hours</p>
              </div>

              <div className="contact-method">
                <h3>Wholesale Inquiries</h3>
                <p>For bulk orders and business partnerships</p>
                <a href="mailto:wholesale@shopper.com">wholesale@shopper.com</a>
                <p>Response time: Within 48 hours</p>
              </div>

              <div className="contact-method">
                <h3>Partnerships</h3>
                <p>For brand collaborations and business opportunities</p>
                <a href="mailto:partnerships@shopper.com">partnerships@shopper.com</a>
                <p>Response time: Within 48 hours</p>
              </div>
            </div>
          </section>

          <section className="contact-section">
            <h2>Office Information</h2>
            <div className="office-info">
              <div className="office-detail">
                <h3>Headquarters</h3>
                <p>123 Fashion Street<br />
                New York, NY 10001<br />
                United States</p>
              </div>
              
              <div className="office-detail">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                Saturday: 10:00 AM - 4:00 PM EST<br />
                Sunday: Closed</p>
              </div>
              
              <div className="office-detail">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567<br />
                Toll-free: 1-800-SHOPPER</p>
              </div>
            </div>
          </section>
        </div>

        <div className="contact-form-section">
          <section className="contact-section">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
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

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  required
                  placeholder="Please describe your inquiry in detail..."
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </section>
        </div>
      </div>

      <div className="contact-cta">
        <h3>Need Immediate Help?</h3>
        <p>Check out our FAQ section or browse our help center for quick answers.</p>
        <div className="cta-buttons">
          <Link to="/" className="cta-button primary">Back to Shop</Link>
          <a href="mailto:support@shopper.com" className="cta-button secondary">Email Support</a>
        </div>
      </div>
    </div>
  )
}

export default Contact
