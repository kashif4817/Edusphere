'use client';
import Nav from '../components/Nav';
import { Target, Eye, CheckCircle, Globe, Lightbulb, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />

      <section className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Purpose: Make Learning Simple and Powerful</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">Empowering students with accessible, high-quality educational resources to achieve academic excellence.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <Target className="text-blue-900" size={80} />
              </div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Our Mission</h2>
            </div>
            <div className="bg-gray-50 rounded-2xl p-10 shadow-lg">
              <p className="text-xl text-gray-700 leading-relaxed text-center">
                Providing students with easy access to structured, high-quality learning resources that improve understanding and academic performance. We believe every student deserves the tools to succeed, and we're committed to making education simpler, clearer, and more accessible for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <Eye className="text-blue-900" size={80} />
              </div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Our Vision</h2>
            </div>
            <div className="bg-white rounded-2xl p-10 shadow-lg">
              <p className="text-xl text-gray-700 leading-relaxed text-center">
                To become the most trusted academic support platform for students worldwide. We envision a future where every student has instant access to comprehensive study materials, enabling them to learn at their own pace and achieve their full potential without barriers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-950 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-200">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div style={{backgroundColor: 'rgba(59, 130, 246, 0.3)'}} className="backdrop-blur-sm rounded-xl p-8 hover:shadow-xl transition border-2 border-blue-300">
              <div className="mb-4">
                <CheckCircle size={48} className="text-white drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md">Accuracy</h3>
              <p className="text-white drop-shadow">We ensure all our content is thoroughly verified and aligned with current educational standards.</p>
            </div>

            <div style={{backgroundColor: 'rgba(59, 130, 246, 0.3)'}} className="backdrop-blur-sm rounded-xl p-8 hover:shadow-xl transition border-2 border-blue-300">
              <div className="mb-4">
                <Globe size={48} className="text-white drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md">Accessibility</h3>
              <p className="text-white drop-shadow">Education should be available to everyone. We strive to make our resources accessible and easy to use.</p>
            </div>

            <div style={{backgroundColor: 'rgba(59, 130, 246, 0.3)'}} className="backdrop-blur-sm rounded-xl p-8 hover:shadow-xl transition border-2 border-blue-300">
              <div className="mb-4">
                <Lightbulb size={48} className="text-white drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md">Innovation</h3>
              <p className="text-white drop-shadow">We continuously explore new ways to enhance learning experiences through technology.</p>
            </div>

            <div style={{backgroundColor: 'rgba(59, 130, 246, 0.3)'}} className="backdrop-blur-sm rounded-xl p-8 hover:shadow-xl transition border-2 border-blue-300">
              <div className="mb-4">
                <Users size={48} className="text-white drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md">Student Support</h3>
              <p className="text-white drop-shadow">Our students come first. We listen to feedback and constantly improve based on student experiences.</p>
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
