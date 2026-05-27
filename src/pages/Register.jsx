import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Store
} from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  
  // Form input states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer' // 'customer' or 'restaurant'
  });
  
  // Form UI states
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'role' ? value.toLowerCase() : value
    }));
    // Clear error on change
    if (error) setError('');
  };

  // Select role handler (custom role select cards)
  const handleRoleSelect = (selectedRole) => {
    setFormData(prev => ({
      ...prev,
      role: selectedRole
    }));
    if (error) setError('');
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password, role } = formData;

    // Validation checks
    if (!name.trim()) {
      setError('Full Name is required.');
      return;
    }

    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }

    // Email format validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!role) {
      setError('Please select your registration role.');
      return;
    }

    // Simulate registration
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Store user details in localStorage to simulate a registered user
      localStorage.setItem('registeredUser', JSON.stringify({ name, email, role }));

      // Redirect after showing the success state
      setTimeout(() => {
        navigate('/login?registered=true');
      }, 2000);
    }, 1500);
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
            to="/login" 
            className="text-sm font-extrabold text-neutral-600 hover:text-orange-500 transition-colors flex items-center gap-1.5"
          >
            Already a member? <span className="text-orange-600 hover:underline">Sign In</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center px-4 py-12 sm:py-16 relative z-10">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-neutral-200/80 rounded-[32px] shadow-2xl shadow-neutral-900/5 overflow-hidden">
          
          {/* Left Panel: Promo Info (Visible on lg screens) */}
          <div className="hidden lg:flex lg:col-span-5 bg-neutral-950 text-white p-12 flex-col justify-between relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Top Logo and Tagline */}
            <div className="space-y-4">
              <span className="bg-orange-500/20 text-orange-400 text-xs font-bold uppercase py-1.5 px-3 rounded-full border border-orange-500/30">
                Join the Feast
              </span>
              <h2 className="text-3xl font-black leading-tight text-white">
                Unlock the ultimate foodie experience.
              </h2>
              <p className="text-neutral-400 text-sm font-semibold leading-relaxed">
                Join thousands of foodies and top-tier restaurants making everyday meals unforgettable.
              </p>
            </div>

            {/* Middle Feature Highlights */}
            <div className="space-y-6 my-8">
              <div className="flex gap-4">
                <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-xl text-orange-500 h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Unlock Exclusive Offers</h4>
                  <p className="text-neutral-400 text-xs font-bold mt-1">Get 20% off on your first order and earn premium food rewards.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-xl text-orange-500 h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Faster Delivery Checkout</h4>
                  <p className="text-neutral-400 text-xs font-bold mt-1">Save multiple addresses, schedule deliveries, and track riders live.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-xl text-orange-500 h-10 w-10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Secure Payments & Quality</h4>
                  <p className="text-neutral-400 text-xs font-bold mt-1">Clean hygiene guarantees and full protection on all checkout processes.</p>
                </div>
              </div>
            </div>

            {/* Bottom Footer Info */}
            <div className="border-t border-neutral-800 pt-6">
              <p className="text-xs font-semibold text-neutral-500">
                Are you a food business? Select the <span className="text-white font-extrabold">Restaurant Partner</span> role to start listing menus!
              </p>
            </div>
          </div>

          {/* Right Panel: Registration Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            
            {/* Header Text */}
            <div className="mb-6 space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-900">
                Create Account
              </h3>
              <p className="text-sm font-semibold text-neutral-500">
                Sign up today to start satisfying your cravings.
              </p>
            </div>

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
                <h4 className="text-2xl font-black text-neutral-900">Registration Successful!</h4>
                <p className="text-sm font-semibold text-neutral-500 max-w-sm">
                  Welcome to BiteDash. Your account has been created. Redirecting to sign in page...
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
                
                {/* Custom Role Selector (Customer / Restaurant) */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-neutral-500 uppercase tracking-wide">
                    I want to sign up as a:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Customer Role */}
                    <button
                      type="button"
                      onClick={() => handleRoleSelect('customer')}
                      className={`flex flex-col sm:flex-row items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                        formData.role === 'customer'
                          ? 'border-orange-500 bg-orange-50/40 text-orange-950 shadow-md ring-2 ring-orange-100'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <div className={`p-2 rounded-xl flex-shrink-0 ${
                        formData.role === 'customer' ? 'bg-orange-100 text-orange-600' : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        <User className="w-5 h-5" />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-xs font-extrabold">Customer</p>
                        <p className="text-[10px] font-bold text-neutral-400 hidden sm:block">I want to order food</p>
                      </div>
                    </button>

                    {/* Restaurant Partner Role */}
                    <button
                      type="button"
                      onClick={() => handleRoleSelect('restaurant')}
                      className={`flex flex-col sm:flex-row items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                        formData.role === 'restaurant'
                          ? 'border-orange-500 bg-orange-50/40 text-orange-950 shadow-md ring-2 ring-orange-100'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <div className={`p-2 rounded-xl flex-shrink-0 ${
                        formData.role === 'restaurant' ? 'bg-orange-100 text-orange-600' : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        <Store className="w-5 h-5" />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-xs font-extrabold">Restaurant Partner</p>
                        <p className="text-[10px] font-bold text-neutral-400 hidden sm:block">I want to list menus</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-neutral-500 uppercase tracking-wide">Full Name</label>
                  <div className="relative">
                    <User className="w-5 h-5 text-neutral-400 absolute left-4.5 top-1/2 transform -translate-y-1/2" />
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-neutral-50 text-neutral-800 text-sm font-semibold pl-12 pr-4 py-3.5 border border-neutral-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 rounded-xl w-full outline-none transition-all"
                      required
                    />
                  </div>
                </div>

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
                  <label className="text-xs font-extrabold text-neutral-500 uppercase tracking-wide">Password</label>
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
                  <p className="text-[10px] text-neutral-400 font-semibold">Password must be at least 6 characters long.</p>
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
                      <span>Register Now</span>
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
