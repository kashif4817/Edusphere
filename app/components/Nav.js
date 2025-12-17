'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Folder, Search, Menu, LogOut } from 'lucide-react';

export default function Nav() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('edusphere_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  function logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('edusphere_user');
      router.push('/login');
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/image.png"
              alt="Edusphere Central Logo"
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <div className="ml-2">
              <span className="text-2xl font-bold text-royal-blue">Edusphere Central</span>
              {user && <div className="text-sm text-gray-600">Welcome, {user.name}!</div>}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/home" className="text-gray-700 hover:text-teal transition">Home</Link>
            <Link href="/notes" className="text-gray-700 hover:text-teal transition">Notes & Subjects</Link>
            <Link href="/my-files" className="text-gray-700 hover:text-teal transition flex items-center gap-1">
              <Folder size={16} />My Files
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-teal transition">Pricing</Link>
            <Link href="/about" className="text-gray-700 hover:text-teal transition">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-teal transition">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button onClick={logout} className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition shadow-md flex items-center gap-2">
                <LogOut size={18} /> Logout
              </button>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-teal transition">Login</Link>
                <Link href="/login" className="bg-royal-blue text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition">Sign Up</Link>
              </>
            )}
            <button className="text-gray-700 hover:text-teal transition">
              <Search size={20} />
            </button>
          </div>

          <button onClick={() => setOpenMobileMenu(!openMobileMenu)} id="mobile-menu-btn" className="md:hidden text-gray-700 hover:text-teal">
            <Menu size={24} />
          </button>
        </div>

        {openMobileMenu && (
          <div className="md:hidden mt-4 pb-4">
            <Link href="/home" className="block py-2 text-gray-700 hover:text-teal">Home</Link>
            <Link href="/notes" className="block py-2 text-gray-700 hover:text-teal">Notes & Subjects</Link>
            <Link href="/my-files" className="block py-2 text-gray-700 hover:text-teal">My Files</Link>
            <Link href="/pricing" className="block py-2 text-gray-700 hover:text-teal">Pricing</Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-teal">About</Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-teal">Contact</Link>
            {user ? (
              <>
                <div className="py-2 text-royal-blue font-semibold">Welcome, {user.name}!</div>
                <button onClick={logout} className="block text-left text-red-500">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 text-gray-700 hover:text-teal">Login</Link>
                <Link href="/login" className="block py-2 text-royal-blue font-semibold">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
