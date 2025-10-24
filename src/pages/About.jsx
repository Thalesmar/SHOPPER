import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/About.css'

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Shopper</h1>
        <p>Your trusted fashion destination since 2020</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, Shopper began as a small online boutique with a simple mission: 
            to make quality fashion accessible to everyone. What started as a passion project 
            has grown into one of the most trusted names in online fashion retail.
          </p>
          <p>
            We believe that fashion should be inclusive, sustainable, and accessible. 
            Our carefully curated collections feature the latest trends while maintaining 
            timeless appeal, ensuring that every piece you purchase will remain stylish 
            for years to come.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            To democratize fashion by providing high-quality, affordable clothing that 
            empowers individuals to express their unique style. We're committed to 
            sustainable practices, ethical sourcing, and exceptional customer service.
          </p>
        </section>

        <section className="about-section">
          <h2>Quality Promise</h2>
          <p>
            Every item in our collection undergoes rigorous quality checks. We work 
            directly with trusted manufacturers to ensure that our products meet the 
            highest standards of craftsmanship and durability.
          </p>
          <ul>
            <li>Premium materials and construction</li>
            <li>Ethical manufacturing practices</li>
            <li>30-day satisfaction guarantee</li>
            <li>Free returns and exchanges</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Sustainability</h2>
          <p>
            We're committed to reducing our environmental impact through sustainable 
            practices, eco-friendly packaging, and partnerships with environmentally 
            conscious suppliers.
          </p>
        </section>

        <section className="about-section">
          <h2>Innovation</h2>
          <p>
            We continuously innovate to improve your shopping experience, from our 
            AI-powered size recommendations to our virtual try-on technology and 
            personalized styling services.
          </p>
        </section>
      </div>

      <div className="about-cta">
        <h3>Ready to Shop?</h3>
        <p>Discover our latest collections and find your perfect style.</p>
        <div className="cta-buttons">
          <Link to="/" className="cta-button primary">Shop Now</Link>
          <Link to="/contact" className="cta-button secondary">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}

export default About
