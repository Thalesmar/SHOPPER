import React from 'react'
import { Link } from 'react-router-dom'

const Company = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Our Company</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Building the future of fashion retail</p>
      </div>

      <div className="space-y-24">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500 font-bold text-xl">CEO</div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Sarah Johnson</h3>
              <p className="text-[#ff4141] font-medium mb-4">Chief Executive Officer</p>
              <p className="text-gray-600 text-sm leading-relaxed">15+ years in fashion retail, former VP at major fashion brands</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500 font-bold text-xl">CTO</div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Michael Chen</h3>
              <p className="text-[#ff4141] font-medium mb-4">Chief Technology Officer</p>
              <p className="text-gray-600 text-sm leading-relaxed">Tech innovator with expertise in e-commerce and AI</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500 font-bold text-xl">CFO</div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Emily Rodriguez</h3>
              <p className="text-[#ff4141] font-medium mb-4">Chief Financial Officer</p>
              <p className="text-gray-600 text-sm leading-relaxed">Financial strategist with 12+ years in retail finance</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600 text-sm leading-relaxed">We never compromise on quality. Every product is carefully selected and tested to meet our high standards.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Customer Centric</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Our customers are at the heart of everything we do. We listen, learn, and continuously improve based on your feedback.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">We embrace new technologies and ideas to enhance your shopping experience and stay ahead of trends.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600 text-sm leading-relaxed">We're committed to responsible business practices that protect our planet for future generations.</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-900 text-white rounded-3xl p-8 md:p-16 overflow-hidden relative">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Careers</h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Join our growing team and help shape the future of fashion retail. We offer competitive
              benefits, flexible work arrangements, and opportunities for growth and development.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div>
                <h4 className="text-[#ff4141] font-bold mb-2">Open Positions</h4>
                <p className="text-sm text-gray-400">Software Engineer, Marketing Manager, Customer Service Representative</p>
              </div>
              <div>
                <h4 className="text-[#ff4141] font-bold mb-2">Benefits</h4>
                <p className="text-sm text-gray-400">Health insurance, 401k matching, flexible PTO, professional development budget</p>
              </div>
              <div>
                <h4 className="text-[#ff4141] font-bold mb-2">Culture</h4>
                <p className="text-sm text-gray-400">Collaborative environment, work-life balance, team building events</p>
              </div>
            </div>
            <div>
              <a href="mailto:careers@shopper.com?subject=Career Inquiry" className="inline-block px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors">
                View Open Positions
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Press & Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Stay updated with our latest news, press releases, and media coverage.
                We're proud to be featured in leading fashion and business publications.
              </p>
              <a href="mailto:press@shopper.com?subject=Press Inquiry" className="inline-block px-8 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-colors">
                Contact Press Team
              </a>
            </div>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-gray-900 mb-1">"Shopper Revolutionizes Online Fashion"</h4>
                <p className="text-sm text-gray-500">Fashion Weekly - March 2024</p>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-gray-900 mb-1">"Sustainable Fashion Leader"</h4>
                <p className="text-sm text-gray-500">Eco Style Magazine - February 2024</p>
              </div>
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-gray-900 mb-1">"Tech Innovation in Retail"</h4>
                <p className="text-sm text-gray-500">Retail Today - January 2024</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 rounded-3xl p-8 md:p-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Investors</h2>
            <p className="text-lg text-gray-600 mb-12">
              We're backed by leading venture capital firms and strategic investors who share
              our vision for the future of fashion retail.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Series B Funding</h4>
                <p className="text-gray-600">$25M raised in 2023 to accelerate growth and expand internationally</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Key Investors</h4>
                <p className="text-gray-600">Fashion Ventures, Retail Capital, Growth Partners</p>
              </div>
            </div>
            <a href="mailto:investors@shopper.com?subject=Investment Inquiry" className="inline-block px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-colors">
              Investor Relations
            </a>
          </div>
        </section>
      </div>

      <div className="mt-24 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
        <p className="text-gray-600 mb-8">Have questions about our company? We'd love to hear from you.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/contact" className="px-8 py-3 bg-[#ff4141] text-white font-semibold rounded-full hover:bg-[#e63b3b] transition-colors">Contact Us</Link>
          <Link to="/" className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-colors border border-gray-200">Shop Now</Link>
        </div>
      </div>
    </div>
  )
}

export default Company
