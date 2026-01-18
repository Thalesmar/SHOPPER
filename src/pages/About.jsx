import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">About Shopper</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Your trusted fashion destination since 2020</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-24">
        <section className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
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
          </div>
        </section>
        <div className="bg-gray-100 rounded-2xl h-80 md:h-auto min-h-[320px]">
          {/* Placeholder for an image */}
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">About Image</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <section className="bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To democratize fashion by providing high-quality, affordable clothing that
            empowers individuals to express their unique style. We're committed to
            sustainable practices, ethical sourcing, and exceptional customer service.
          </p>
        </section>

        <section className="bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sustainability</h2>
          <p className="text-gray-600 leading-relaxed">
            We're committed to reducing our environmental impact through sustainable
            practices, eco-friendly packaging, and partnerships with environmentally
            conscious suppliers.
          </p>
        </section>

        <section className="bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h2>
          <p className="text-gray-600 leading-relaxed">
            We continuously innovate to improve your shopping experience, from our
            AI-powered size recommendations to our virtual try-on technology and
            personalized styling services.
          </p>
        </section>
      </div>

      <section className="mb-24 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quality Promise</h2>
        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
          <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Every item in our collection undergoes rigorous quality checks. We work
            directly with trusted manufacturers to ensure that our products meet the
            highest standards of craftsmanship and durability.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 font-medium">
            <li className="flex items-center gap-3"><span className="text-green-500 text-xl">✓</span> Premium materials and construction</li>
            <li className="flex items-center gap-3"><span className="text-green-500 text-xl">✓</span> Ethical manufacturing practices</li>
            <li className="flex items-center gap-3"><span className="text-green-500 text-xl">✓</span> 30-day satisfaction guarantee</li>
            <li className="flex items-center gap-3"><span className="text-green-500 text-xl">✓</span> Free returns and exchanges</li>
          </ul>
        </div>
      </section>

      <div className="text-center bg-[#fce3fe] rounded-3xl p-12 md:p-20">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Shop?</h3>
        <p className="text-xl text-gray-700 mb-8">Discover our latest collections and find your perfect style.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="px-8 py-4 bg-[#ff4141] text-white font-semibold rounded-full hover:bg-[#e63b3b] transition-colors">Shop Now</Link>
          <Link to="/contact" className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-colors border border-gray-200">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}

export default About
