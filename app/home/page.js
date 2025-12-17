'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Nav from '../components/Nav';
import { Book, BookOpen, Target, Zap, Lightbulb, Atom, TestTube, Calculator, Dna, Cpu } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('edusphere_user');
    if (!stored) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  if (!user) return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Simplify Your Studies, Amplify Your Success.
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
                A centralized platform offering notes, study guides, past papers, and learning tools to help students excel with clarity and confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/notes" className="bg-amber-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-300 transition text-center shadow-lg">
                  Get Started
                </Link>
                <Link href="/notes" className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition text-center shadow-lg">
                  Browse Notes
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
                <Image
                  src="/image.png"
                  alt="Edusphere Central Logo"
                  width={400}
                  height={400}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Edusphere Central? */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16">Why Edusphere Central?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <BookOpen className="text-blue-900" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Verified Notes</h3>
              <p className="text-gray-600">High-quality, accurate, well-organized academic material.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Target className="text-blue-900" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Smart Guidance</h3>
              <p className="text-gray-600">Study tools and structured summaries that simplify learning.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Zap className="text-blue-900" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Quick Access</h3>
              <p className="text-gray-600">All subjects in one place—easy navigation and downloads.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Lightbulb className="text-blue-900" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Student-Centric</h3>
              <p className="text-gray-600">Designed to boost performance and exam success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Subjects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16">Featured Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Atom, name: 'Physics', chapters: '15+', color: 'from-blue-500 to-blue-700' },
              { icon: TestTube, name: 'Chemistry', chapters: '12+', color: 'from-green-500 to-green-700' },
              { icon: Calculator, name: 'Mathematics', chapters: '20+', color: 'from-purple-500 to-purple-700' },
              { icon: Dna, name: 'Biology', chapters: '18+', color: 'from-teal-500 to-teal-700' },
              { icon: Cpu, name: 'Computer Science', chapters: '10+', color: 'from-indigo-500 to-indigo-700' },
              { icon: Book, name: 'English', chapters: 'Multiple Topics', color: 'from-red-500 to-red-700' },
            ].map((subject, i) => {
              const IconComponent = subject.icon;
              return (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
                <div className={`bg-gradient-to-br ${subject.color} p-8 text-white`}>
                  <div className="mb-4">
                    <IconComponent size={48} />
                  </div>
                  <h3 className="text-2xl font-bold">{subject.name}</h3>
                </div>
                <div className="p-8">
                  <ul className="text-gray-600 mb-6 space-y-2">
                    <li>✓ {subject.chapters} Chapters</li>
                    <li>✓ Detailed Notes</li>
                    <li>✓ Past Papers</li>
                  </ul>
                  <Link href="/notes" className="bg-blue-900 text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-950 transition">
                    Explore {subject.name}
                  </Link>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-950 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join thousands of students learning smarter every day.</h2>
          <p className="text-xl mb-8 text-gray-200">Start your journey to academic excellence today.</p>
          <Link href="/notes" className="bg-amber-400 text-blue-900 px-10 py-4 rounded-lg font-bold text-xl hover:bg-amber-500 transition inline-block">
            Start Learning Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <span className="text-xl font-bold">Edusphere Central</span>
              <p className="text-gray-400 mt-2">Simplify Your Studies, Amplify Your Success.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/home" className="text-gray-400 hover:text-teal-600 transition">Home</Link></li>
                <li><Link href="/notes" className="text-gray-400 hover:text-teal-600 transition">Notes & Subjects</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-teal-600 transition">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">About</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-teal-600 transition">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-teal-600 transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Info</h4>
              <p className="text-gray-400 mb-2">support@eduspherecentral.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Edusphere Central. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
