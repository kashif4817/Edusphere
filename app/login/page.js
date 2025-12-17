'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { BookOpen, FileText, TrendingUp } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target['login-email'].value;
    const password = e.target['login-password'].value;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (error || !data) {
        showAlert('Invalid email or password', 'error');
        setLoading(false);
        return;
      }

      localStorage.setItem('edusphere_user', JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email
      }));

      showAlert('Login successful!', 'success');
      setTimeout(() => router.push('/home'), 1000);
    } catch (error) {
      showAlert('Login failed: ' + error.message, 'error');
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target['signup-name'].value;
    const email = e.target['signup-email'].value;
    const password = e.target['signup-password'].value;
    const confirmPassword = e.target['signup-confirm-password'].value;

    if (password !== confirmPassword) {
      showAlert('Passwords do not match!', 'error');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ name, email, password }])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          showAlert('Email already exists!', 'error');
        } else {
          showAlert('Signup failed: ' + error.message, 'error');
        }
        setLoading(false);
        return;
      }

      showAlert('Account created successfully! Redirecting to login...', 'success');
      setTimeout(() => {
        setIsSignup(false);
        setLoading(false);
      }, 1500);
    } catch (error) {
      showAlert('Signup failed: ' + error.message, 'error');
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-950 min-h-screen flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 p-6 md:p-12 text-white flex flex-col justify-center">
            <div className="mb-6 md:mb-8">
              <div className="h-16 w-16 md:h-20 md:w-20 mb-4 md:mb-6 bg-white rounded-full flex items-center justify-center">
                <BookOpen className="text-blue-900" size={40} />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Welcome to Edusphere Central</h1>
              <p className="text-lg md:text-xl text-gray-200">Your complete academic success platform</p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 rounded-full p-2 md:p-3 mr-3 md:mr-4 flex-shrink-0">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1">Comprehensive Notes</h3>
                  <p className="text-gray-200 text-sm md:text-base">Access detailed notes for all subjects and grades</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 rounded-full p-2 md:p-3 mr-3 md:mr-4 flex-shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1">Past Papers</h3>
                  <p className="text-gray-200 text-sm md:text-base">Complete collection with detailed solutions</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 rounded-full p-2 md:p-3 mr-3 md:mr-4 flex-shrink-0">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg mb-1">Track Progress</h3>
                  <p className="text-gray-200 text-sm md:text-base">Monitor your learning journey and achievements</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-12">
            {alert.show && (
              <div className={`mb-4 p-4 rounded-lg ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {alert.message}
              </div>
            )}

            {!isSignup && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Login</h2>
                <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">Welcome back! Please login to your account.</p>

                <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="login-email" className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Email Address</label>
                    <div className="relative">
                      <i className="fas fa-envelope absolute left-4 top-3 md:top-4 text-gray-400"></i>
                      <input type="email" id="login-email" required className="w-full pl-12 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm md:text-base" placeholder="your.email@example.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="login-password" className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Password</label>
                    <div className="relative">
                      <i className="fas fa-lock absolute left-4 top-3 md:top-4 text-gray-400"></i>
                      <input type={showLoginPassword ? 'text' : 'password'} id="login-password" required className="w-full pl-12 pr-12 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm md:text-base" placeholder="Enter your password" />
                      <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute right-4 top-3 md:top-4 text-gray-400 hover:text-gray-600">
                        <i className={`fas ${showLoginPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" id="remember-me" className="w-4 h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-900" />
                    <label htmlFor="remember-me" className="ml-2 text-gray-700 text-sm md:text-base">Remember me</label>
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-blue-900 text-white py-2 md:py-3 rounded-lg font-bold text-base md:text-lg hover:bg-blue-950 transition">
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}
                  </button>

                  <div className="text-center">
                    <p className="text-gray-600 text-sm md:text-base">
                      Don't have an account?{' '}
                      <button type="button" onClick={() => setIsSignup(true)} className="text-teal-600 font-semibold hover:underline">
                        Sign Up
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            )}

            {isSignup && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Sign Up</h2>
                <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">Create your account and start learning today!</p>

                <form onSubmit={handleSignup} className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="signup-name" className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Full Name</label>
                    <div className="relative">
                      <i className="fas fa-user absolute left-4 top-3 md:top-4 text-gray-400"></i>
                      <input type="text" id="signup-name" required className="w-full pl-12 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm md:text-base" placeholder="Enter your full name" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-email" className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Email Address</label>
                    <div className="relative">
                      <i className="fas fa-envelope absolute left-4 top-3 md:top-4 text-gray-400"></i>
                      <input type="email" id="signup-email" required className="w-full pl-12 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm md:text-base" placeholder="your.email@example.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-password" className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Password</label>
                    <div className="relative">
                      <i className="fas fa-lock absolute left-4 top-3 md:top-4 text-gray-400"></i>
                      <input type={showSignupPassword ? 'text' : 'password'} id="signup-password" required minLength="6" className="w-full pl-12 pr-12 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm md:text-base" placeholder="Create a password (min 6 characters)" />
                      <button type="button" onClick={() => setShowSignupPassword(!showSignupPassword)} className="absolute right-4 top-3 md:top-4 text-gray-400 hover:text-gray-600">
                        <i className={`fas ${showSignupPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-confirm-password" className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">Confirm Password</label>
                    <div className="relative">
                      <i className="fas fa-lock absolute left-4 top-3 md:top-4 text-gray-400"></i>
                      <input type={showConfirmPassword ? 'text' : 'password'} id="signup-confirm-password" required minLength="6" className="w-full pl-12 pr-12 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm md:text-base" placeholder="Confirm your password" />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-3 md:top-4 text-gray-400 hover:text-gray-600">
                        <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-start">
                      <input type="checkbox" id="terms-checkbox" required className="w-4 h-4 mt-1 text-blue-900 border-gray-300 rounded focus:ring-blue-900 flex-shrink-0" />
                      <span className="ml-2 text-gray-700 text-xs md:text-sm">
                        I agree to the <a href="#" className="text-teal-600 hover:underline">Terms of Service</a> and <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-blue-900 text-white py-2 md:py-3 rounded-lg font-bold text-base md:text-lg hover:bg-blue-950 transition">
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Create Account'}
                  </button>

                  <div className="text-center">
                    <p className="text-gray-600 text-sm md:text-base">
                      Already have an account?{' '}
                      <button type="button" onClick={() => setIsSignup(false)} className="text-teal-600 font-semibold hover:underline">
                        Login
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
