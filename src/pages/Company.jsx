import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/Company.css'

const Company = () => {
  return (
    <div className="company-container">
      <div className="company-header">
        <h1>Our Company</h1>
        <p>Building the future of fashion retail</p>
      </div>

      <div className="company-content">
        <section className="company-section">
          <h2>Leadership Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">CEO</div>
              <h3>Sarah Johnson</h3>
              <p>Chief Executive Officer</p>
              <p>15+ years in fashion retail, former VP at major fashion brands</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">CTO</div>
              <h3>Michael Chen</h3>
              <p>Chief Technology Officer</p>
              <p>Tech innovator with expertise in e-commerce and AI</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">CFO</div>
              <h3>Emily Rodriguez</h3>
              <p>Chief Financial Officer</p>
              <p>Financial strategist with 12+ years in retail finance</p>
            </div>
          </div>
        </section>

        <section className="company-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Quality First</h3>
              <p>We never compromise on quality. Every product is carefully selected and tested to meet our high standards.</p>
            </div>
            <div className="value-item">
              <h3>Customer Centric</h3>
              <p>Our customers are at the heart of everything we do. We listen, learn, and continuously improve based on your feedback.</p>
            </div>
            <div className="value-item">
              <h3>Innovation</h3>
              <p>We embrace new technologies and ideas to enhance your shopping experience and stay ahead of trends.</p>
            </div>
            <div className="value-item">
              <h3>Sustainability</h3>
              <p>We're committed to responsible business practices that protect our planet for future generations.</p>
            </div>
          </div>
        </section>

        <section className="company-section">
          <h2>Careers</h2>
          <p>
            Join our growing team and help shape the future of fashion retail. We offer competitive 
            benefits, flexible work arrangements, and opportunities for growth and development.
          </p>
          <div className="career-highlights">
            <div className="highlight">
              <h4>Open Positions</h4>
              <p>Software Engineer, Marketing Manager, Customer Service Representative</p>
            </div>
            <div className="highlight">
              <h4>Benefits</h4>
              <p>Health insurance, 401k matching, flexible PTO, professional development budget</p>
            </div>
            <div className="highlight">
              <h4>Culture</h4>
              <p>Collaborative environment, work-life balance, team building events</p>
            </div>
          </div>
          <div className="career-cta">
            <a href="mailto:careers@shopper.com?subject=Career Inquiry" className="career-button">
              View Open Positions
            </a>
          </div>
        </section>

        <section className="company-section">
          <h2>Press & Media</h2>
          <p>
            Stay updated with our latest news, press releases, and media coverage. 
            We're proud to be featured in leading fashion and business publications.
          </p>
          <div className="press-items">
            <div className="press-item">
              <h4>"Shopper Revolutionizes Online Fashion"</h4>
              <p>Fashion Weekly - March 2024</p>
            </div>
            <div className="press-item">
              <h4>"Sustainable Fashion Leader"</h4>
              <p>Eco Style Magazine - February 2024</p>
            </div>
            <div className="press-item">
              <h4>"Tech Innovation in Retail"</h4>
              <p>Retail Today - January 2024</p>
            </div>
          </div>
          <div className="press-cta">
            <a href="mailto:press@shopper.com?subject=Press Inquiry" className="press-button">
              Contact Press Team
            </a>
          </div>
        </section>

        <section className="company-section">
          <h2>Investors</h2>
          <p>
            We're backed by leading venture capital firms and strategic investors who share 
            our vision for the future of fashion retail.
          </p>
          <div className="investor-info">
            <div className="investor-item">
              <h4>Series B Funding</h4>
              <p>$25M raised in 2023 to accelerate growth and expand internationally</p>
            </div>
            <div className="investor-item">
              <h4>Key Investors</h4>
              <p>Fashion Ventures, Retail Capital, Growth Partners</p>
            </div>
          </div>
          <div className="investor-cta">
            <a href="mailto:investors@shopper.com?subject=Investment Inquiry" className="investor-button">
              Investor Relations
            </a>
          </div>
        </section>
      </div>

      <div className="company-cta">
        <h3>Get in Touch</h3>
        <p>Have questions about our company? We'd love to hear from you.</p>
        <div className="cta-buttons">
          <Link to="/contact" className="cta-button primary">Contact Us</Link>
          <Link to="/" className="cta-button secondary">Shop Now</Link>
        </div>
      </div>
    </div>
  )
}

export default Company
