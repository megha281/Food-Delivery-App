import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ShoppingBag, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Heart
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Login input states
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationNotice, setRegistrationNotice] = useState(false);

  // Check if we redirected from registration page
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setRegistrationNotice(true);
      // Pre-fill email if it was saved during registration
      const savedUser = localStorage.getItem('registeredUser');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed && parsed.email) {
            setFormData(prev => ({ ...prev, email: parsed.email }));
          }
        } catch (e) {
          console.error("Error parsing saved user", e);
        }
      }
    }
  }, [searchParams]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = formData;

    // Validation checks
    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    // Simulate authentication
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Store log in status in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      
      // Check the registered user's details
      const savedUserStr = localStorage.getItem('registeredUser');
      let targetRole = 'customer';
      
      if (savedUserStr) {
        try {
          const parsedUser = JSON.parse(savedUserStr);
          if (parsedUser && parsedUser.email.toLowerCase() === email.toLowerCase()) {
            targetRole = parsedUser.role || 'customer';
          } else {
            if (email.toLowerCase().includes('restaurant') || email.toLowerCase().includes('kitchen')) {
              targetRole = 'restaurant';
            }
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        if (email.toLowerCase().includes('restaurant') || email.toLowerCase().includes('kitchen')) {
          targetRole = 'restaurant';
        }
        localStorage.setItem('registeredUser', JSON.stringify({ 
          name: email.split('@')[0], 
          email: email, 
          role: targetRole 
        }));
      }

      // Redirect based on role after 1.5 seconds
      setTimeout(() => {
        if (targetRole === 'restaurant') {
          navigate('/restaurant-dashboard');
        } else {
          navigate('/customer-dashboard');
        }
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-neutral-900 font-sans selection:bg-orange-200 selection:text-orange-900 flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Minimal Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-orange-500 to-amber-400 p-2.5 rounded-2xl text-white shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform duration-300">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              BiteDash
            </span>
          </Link>
          <Link 
            to="/register" 
            className="text-sm font-extrabold text-neutral-600 hover:text-orange-500 transition-colors flex items-center gap-1.5"
          >
            New to BiteDash? <span className="text-orange-600 hover:underline">Sign Up</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center px-4 py-12 sm:py-16 relative z-10">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-neutral-200/80 rounded-[32px] shadow-2xl shadow-neutral-900/5 overflow-hidden">
          
          {/* Left Panel: Promo Info */}
          <div className="hidden lg:flex lg:col-span-5 bg-neutral-950 text-white p-12 flex-col justify-between relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Top Logo and Tagline */}
            <div className="space-y-4">
              <span className="bg-orange-500/20 text-orange-400 text-xs font-bold uppercase py-1.5 px-3 rounded-full border border-orange-500/30">
                Welcome Back
              </span>
              <h2 className="text-3xl font-black leading-tight text-white">
                Hungry for your favorites?
              </h2>
              <p className="text-neutral-400 text-sm font-semibold leading-relaxed">
                Log in to order delicious warm meals from your favorite local kitchens and save on delivery charges.
              </p>
            </div>

            {/* Middle Feature Highlights */}
            <div className="space-y-6 my-8">
              <div className="flex gap-4">
                <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-xl text-orange-500 h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Reorder In One Click</h4>
                  <p className="text-neutral-400 text-xs font-bold mt-1">Access your ordering history and quickly re-add favorite items.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-xl text-orange-500 h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Saved Kitchens</h4>
                  <p className="text-neutral-400 text-xs font-bold mt-1">Keep an eye on custom restaurant deals and check availability instantly.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-xl text-orange-500 h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Safe & Swift Logistics</h4>
                  <p className="text-neutral-400 text-xs font-bold mt-1">Every order is backed by our customer-first refund guarantee.</p>
                </div>
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="border-t border-neutral-800 pt-6">
              <p className="text-xs font-semibold text-neutral-500">
                Facing account issue? Contact our 24/7 customer support team for instant help.
              </p>
            </div>
          </div>

          {/* Right Panel: Login Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            
            {/* Header Text */}
            <div className="mb-6 space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-900">
                Welcome Back
              </h3>
              <p className="text-sm font-semibold text-neutral-500">
                Sign in to manage addresses, orders, and vouchers.
              </p>
            </div>

            {/* Registration Success Banner */}
            {registrationNotice && !isSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 mb-4 animate-scale-up">
                <span className="w-4 h-4 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] flex-shrink-0">✓</span>
                <span>Account created successfully! Please sign in with your credentials.</span>
              </div>
            )}

            {/* Error Message Alert */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 mb-4 animate-shake">
                <span className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] flex-shrink-0">!</span>
                <span>{error}</span>
              </div>
            )}

            {/* Success State Overlay */}
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 animate-scale-up">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h4 className="text-2xl font-black text-neutral-900">Sign In Successful!</h4>
                <p className="text-sm font-semibold text-neutral-500 max-w-sm">
                  Connecting to BiteDash kitchen feeds... Redirecting to dashboard...
                </p>
                <div className="flex gap-1.5 items-center justify-center pt-2">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce" />
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            ) : (
              /* The Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-neutral-500 uppercase tracking-wide">Email Address</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-neutral-400 absolute left-4.5 top-1/2 transform -translate-y-1/2" />
                    <input 
                      type="email" 
                      name="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-neutral-50 text-neutral-800 text-sm font-semibold pl-12 pr-4 py-3.5 border border-neutral-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 rounded-xl w-full outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-neutral-500 uppercase tracking-wide">Password</label>
                    <a href="#" className="text-xs font-extrabold text-orange-500 hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-neutral-400 absolute left-4.5 top-1/2 transform -translate-y-1/2" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-neutral-50 text-neutral-800 text-sm font-semibold pl-12 pr-12 py-3.5 border border-neutral-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 rounded-xl w-full outline-none transition-all"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4.5 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center pt-1.5">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    className="rounded text-orange-500 focus:ring-orange-400 h-4 w-4 bg-neutral-50 border-neutral-300" 
                  />
                  <label htmlFor="remember" className="ml-2 text-xs font-semibold text-neutral-500 cursor-pointer select-none">
                    Remember this device for 30 days
                  </label>
                </div>

                {/* Submit button */}
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-neutral-900 hover:bg-orange-600 text-white font-extrabold py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer mt-6 disabled:opacity-75 disabled:pointer-events-none group"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Bottom Form Navigation links */}
            {!isSuccess && (
              <div className="text-center pt-6 border-t border-neutral-100 mt-6 text-xs font-bold text-neutral-400">
                By continuing, you agree to our{' '}
                <a href="#" className="text-neutral-500 hover:text-orange-500 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-neutral-500 hover:text-orange-500 hover:underline">Privacy Policy</a>.
              </div>
            )}

          </div>

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 border-t border-neutral-200/80 bg-white text-center text-xs font-bold text-neutral-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} BiteDash Inc. All culinary rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-500">Terms of Use</a>
            <a href="#" className="hover:text-orange-500">Privacy</a>
            <a href="#" className="hover:text-orange-500">Help</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
