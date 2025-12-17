'use client';
import Nav from '../components/Nav';
import { Send, Mail, Phone, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />

      <section className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-200">We're here to help! Reach out to us with any questions or feedback.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-royal-blue mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue" placeholder="Enter your name" />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue" placeholder="your.email@example.com" />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue">
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="content">Content Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea required rows="6" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-blue resize-none" placeholder="Tell us how we can help you..."></textarea>
                </div>

                <button type="submit" className="w-full bg-royal-blue text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition flex items-center justify-center gap-2">
                  <Send size={20} /> Send Message
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-royal-blue to-blue-900 rounded-2xl shadow-lg p-8 text-white">
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-gray-200 mb-8">Get in touch with us through any of these channels.</p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email</h3>
                      <p className="text-gray-200">support@eduspherecentral.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Phone</h3>
                      <p className="text-gray-200">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Working Hours</h3>
                      <p className="text-gray-200">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-200">Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-royal-blue mb-6">Connect With Us</h2>
                <p className="text-gray-600 mb-6">Follow us on social media for updates and educational content.</p>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                    <i className="fab fa-facebook text-2xl"></i>
                  </a>
                  <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-14 h-14 rounded-full flex items-center justify-center hover:opacity-90 transition">
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                  <a href="#" className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-gray-800 transition">
                    <i className="fab fa-tiktok text-2xl"></i>
                  </a>
                  <a href="#" className="bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-red-700 transition">
                    <i className="fab fa-youtube text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">&copy; 2025 Edusphere Central. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
