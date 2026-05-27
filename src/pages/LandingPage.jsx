import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  ShieldCheck, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  User, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  Heart,
  TrendingUp,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

// Mock data for dishes/restaurants
const CATEGORIES = [
  { id: 'all', name: 'All Cravings', icon: '🍽️' },
  { id: 'burger', name: 'Burgers', icon: '🍔' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'salad', name: 'Salads', icon: '🥗' },
  { id: 'dessert', name: 'Desserts', icon: '🍰' }
];

const DISHES = [
  {
    id: 1,
    name: 'Gourmet Truffle Burger',
    category: 'burger',
    price: 14.99,
    rating: 4.9,
    reviews: 124,
    time: '20-25 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    tag: 'Bestseller',
    restaurant: 'Burger & Co.'
  },
  {
    id: 2,
    name: 'Classic Margherita Pizza',
    category: 'pizza',
    price: 12.99,
    rating: 4.8,
    reviews: 98,
    time: '15-20 min',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    tag: 'Trending',
    restaurant: 'Pizzeria Napoli'
  },
  {
    id: 3,
    name: 'Premium Dragon Sushi Roll',
    category: 'sushi',
    price: 18.50,
    rating: 4.9,
    reviews: 156,
    time: '25-30 min',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    tag: 'Chef Choice',
    restaurant: 'Sushi Sakura'
  },
  {
    id: 4,
    name: 'Avocado Crunch Salad',
    category: 'salad',
    price: 11.25,
    rating: 4.7,
    reviews: 82,
    time: '10-15 min',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    tag: 'Healthy',
    restaurant: 'Green Garden'
  },
  {
    id: 5,
    name: 'Double Chocolate Fudge Cake',
    category: 'dessert',
    price: 8.99,
    rating: 4.9,
    reviews: 210,
    time: '10-15 min',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    tag: 'Sweet Delight',
    restaurant: 'La Pâtisserie'
  },
  {
    id: 6,
    name: 'Crispy Bacon Cheeseburger',
    category: 'burger',
    price: 15.50,
    rating: 4.7,
    reviews: 64,
    time: '20-30 min',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    tag: 'Popular',
    restaurant: 'Burger & Co.'
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Food Enthusiast',
    rating: 5,
    text: 'BiteDash has completely changed my dinner routine! The delivery is always faster than expected, and the food arrives piping hot. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Software Engineer',
    rating: 5,
    text: 'The search interface is extremely clean, and checkout is super fast. Being able to track the order in real-time gives me peace of mind when working late.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Fitness Coach',
    rating: 5,
    text: 'I love the healthy options selection. The nutritional tags and fast delivery ensure my meal prep is always fresh. Five stars all the way!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80'
  }
];

const FAQS = [
  {
    question: 'How fast is the delivery?',
    answer: 'Our average delivery time is 25-35 minutes. We offer a 30-minute delivery guarantee on select restaurants. If it arrives late, you get a full refund in credits!'
  },
  {
    question: 'Is there a minimum order amount?',
    answer: 'No, there is no minimum order value! However, orders below $15 may carry a small delivery surcharge depending on the restaurant distance.'
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order is confirmed, you can track it live in the app. You will see real-time updates: restaurant accepting, food preparing, rider pick-up, and exact live GPS location on the map.'
  },
  {
    question: 'Can I schedule orders in advance?',
    answer: 'Absolutely! You can schedule your delivery up to 7 days in advance. Simply select the "Schedule" option at checkout and pick your desired date and time window.'
  }
];

export default function LandingPage() {
  // Navigation & Drawer
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Interaction states
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  
  // Cart Mock
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  
  // Login Modal
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginTab, setLoginTab] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [userName, setUserName] = useState(() => {
    const saved = localStorage.getItem('registeredUser');
    if (saved) {
      try {
        return JSON.parse(saved).name || '';
      } catch (e) {
        return '';
      }
    }
    return '';
  });

  // Newsletter signup state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Actions
  const handleAddToCart = (dishName) => {
    setCartCount(prev => prev + 1);
    // Display temporary alert
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 animate-bounce transition-all duration-300';
    toast.innerHTML = `<span class="bg-white/20 p-1 rounded-full">✓</span> Added <strong>${dishName}</strong> to your bag!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (addressInput.trim()) {
      setAddressSaved(true);
      setTimeout(() => setAddressSaved(false), 3000);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (userEmail && userPassword) {
      setIsLoggedIn(true);
      setIsLoginOpen(false);
      // Toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed top-5 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 z-50 animate-fade-in border border-orange-500/30';
      toast.innerHTML = `👋 Welcome back, <strong>${loginTab === 'signup' ? userName || 'User' : userEmail.split('@')[0]}</strong>!`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserPassword('');
    setUserName('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('registeredUser');
  };

  // Filtering dishes
  const filteredDishes = DISHES.filter(dish => {
    const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dish.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-neutral-900 font-sans selection:bg-orange-200 selection:text-orange-900 overflow-x-hidden relative">
      
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-[800px] left-0 w-[300px] h-[300px] bg-amber-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-gradient-to-tr from-orange-500 to-amber-400 p-2.5 rounded-2xl text-white shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform duration-300">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                BiteDash
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#menu" className="font-semibold text-neutral-600 hover:text-orange-500 transition-colors">Explore Menu</a>
              <a href="#features" className="font-semibold text-neutral-600 hover:text-orange-500 transition-colors">Our Promise</a>
              <a href="#testimonials" className="font-semibold text-neutral-600 hover:text-orange-500 transition-colors">Reviews</a>
              <a href="#faq" className="font-semibold text-neutral-600 hover:text-orange-500 transition-colors">FAQ</a>
            </div>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-4">
              {/* Cart */}
              <button className="relative p-2.5 text-neutral-600 hover:text-orange-500 bg-neutral-100 hover:bg-orange-50 rounded-full transition-all cursor-pointer">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full">
                    <User className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-semibold text-neutral-700">{userName || 'Account'}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="px-5 py-2.5 rounded-full font-semibold text-sm border border-neutral-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="font-bold text-neutral-700 hover:text-orange-600 transition-colors px-4 py-2 cursor-pointer"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register"
                    className="bg-neutral-900 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-neutral-900/10 hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-3">
              {/* Cart for mobile */}
              <button className="relative p-2 text-neutral-600 bg-neutral-100 rounded-full">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 bg-neutral-100 text-neutral-700 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all cursor-pointer"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-100 bg-white/95 backdrop-blur-lg animate-fade-in absolute w-full left-0 shadow-xl">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <a 
                href="#menu" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-xl font-bold text-neutral-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                Explore Menu
              </a>
              <a 
                href="#features" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-xl font-bold text-neutral-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                Our Promise
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-xl font-bold text-neutral-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                Reviews
              </a>
              <a 
                href="#faq" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-xl font-bold text-neutral-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                FAQ
              </a>
              
              <div className="border-t border-neutral-100 pt-4 mt-2 space-y-3">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2">
                      <User className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-neutral-700">{userName || 'My Account'}</span>
                    </div>
                    <button 
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="w-full bg-red-50 border border-red-100 text-red-600 py-3 rounded-xl font-bold"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login"
                      className="w-full text-center border border-neutral-200 text-neutral-700 py-3 rounded-xl font-bold hover:bg-neutral-50 transition-all block"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register"
                      className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-all shadow-md shadow-orange-500/20 block"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left / Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-6">
            
            {/* Promo Tag */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-sm animate-pulse border border-orange-200">
              <Sparkles className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>FREE DELIVERY ON YOUR FIRST ORDER</span>
            </div>

            {/* Value Prop Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-neutral-900 leading-[1.1] tracking-tight">
              Craving? We Deliver <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Happiness, Hot & Fresh
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-xl mx-auto lg:mx-0 font-medium">
              Satisfy your cravings in minutes. Order from the best local restaurants with ultra-fast delivery, zero hassle, and real-time tracking.
            </p>

            {/* Interactive Location search */}
            <div className="max-w-md mx-auto lg:mx-0 w-full pt-2">
              <form onSubmit={handleAddressSubmit} className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-2xl sm:rounded-full border border-neutral-200 shadow-xl shadow-neutral-950/5 relative group focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-200 transition-all duration-300">
                <div className="flex items-center gap-2 px-3 py-2 flex-grow">
                  <MapPin className="text-orange-500 h-5 w-5 flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Enter your delivery address..."
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    className="bg-transparent w-full text-sm font-semibold outline-none text-neutral-800 placeholder-neutral-400"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl sm:rounded-full transition-all flex items-center justify-center gap-2 group-hover:scale-[1.01] active:scale-95 cursor-pointer shadow-md shadow-orange-500/10"
                >
                  Locate Me
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
              
              {/* Success Address Status */}
              {addressSaved && (
                <p className="text-emerald-600 text-xs font-bold mt-2 text-center lg:text-left flex items-center gap-1 justify-center lg:justify-start">
                  <Check className="w-3.5 h-3.5" /> Address located successfully! Fetching menus near you...
                </p>
              )}
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a 
                href="#menu"
                className="bg-neutral-900 hover:bg-orange-600 text-white font-bold px-8 py-4.5 rounded-full shadow-lg shadow-neutral-900/10 hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group"
              >
                Explore Menu
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link 
                to="/login"
                className="bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 font-bold px-8 py-4.5 rounded-full shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-center flex items-center justify-center"
              >
                Login to Order
              </Link>
            </div>

            {/* Simple Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-200/60 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900">500+</p>
                <p className="text-xs sm:text-sm font-semibold text-neutral-500">Restaurants</p>
              </div>
              <div className="border-l border-neutral-200 pl-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900">10k+</p>
                <p className="text-xs sm:text-sm font-semibold text-neutral-500">Daily Deliveries</p>
              </div>
              <div className="border-l border-neutral-200 pl-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900">4.9 ★</p>
                <p className="text-xs sm:text-sm font-semibold text-neutral-500">Customer Rating</p>
              </div>
            </div>

          </div>

          {/* Hero Right / Graphic Assets */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Visual Backdrops */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-amber-300 rounded-3xl rotate-3 scale-95 opacity-20 blur-xl -z-10" />
            
            {/* Main Hero Card */}
            <div className="bg-white p-4 rounded-3xl border border-neutral-200 shadow-2xl relative w-full max-w-[420px] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" 
                alt="Delicious meals mix"
                className="w-full h-80 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Glowing Badge floating */}
              <div className="absolute top-8 left-8 bg-neutral-900/90 backdrop-blur-md text-white py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-lg border border-white/10 text-xs font-bold">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span>244 orders placed near you in the last hour!</span>
              </div>

              {/* Floating review card */}
              <div className="absolute bottom-10 -right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-neutral-100 shadow-2xl flex items-center gap-3 max-w-[240px] animate-bounce-slow">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
                  <Star className="w-6 h-6 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-neutral-800">4.9/5 Rating</p>
                  <p className="text-xs font-bold text-neutral-500">Over 50,000 reviews</p>
                </div>
              </div>

              {/* Floating fast delivery card */}
              <div className="absolute bottom-28 -left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-neutral-100 shadow-2xl flex items-center gap-3 max-w-[190px]">
                <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-400">Delivery Time</p>
                  <p className="text-sm font-extrabold text-neutral-800">⚡ Under 30 mins</p>
                </div>
              </div>
            </div>

            {/* Visual small details */}
            <div className="absolute -top-6 -right-6 bg-orange-100 text-orange-600 p-3.5 rounded-full shadow-lg border border-white rotate-12 hidden sm:block">
              🍔
            </div>
            <div className="absolute -bottom-8 -left-8 bg-amber-100 text-amber-600 p-3.5 rounded-full shadow-lg border border-white -rotate-12 hidden sm:block">
              🍕
            </div>

          </div>

        </div>
      </section>

      {/* PROMISE / FEATURES SECTION */}
      <section id="features" className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest">Why BiteDash?</h2>
            <p className="text-3xl sm:text-4xl font-black">We Promise the Best Food Experience</p>
            <p className="text-neutral-400 text-base sm:text-lg">
              Getting food delivered should be fast, easy, and delicious. Here is how we ensure you get the absolute best meal every single time.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            
            {/* Feature 1 - Fast Delivery */}
            <div className="bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700/60 p-8 rounded-3xl shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="bg-orange-500/10 text-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold mb-3 flex items-center gap-2">
                Lightning Fast Delivery
                <span className="bg-orange-500/20 text-orange-400 text-[10px] uppercase font-bold py-0.5 px-2 rounded-full border border-orange-500/30">
                  ⚡ 30 min
                </span>
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Hungry? Our smart dispatch system assigns the closest riders to get your hot meals on your table in under 30 minutes. Guaranteed.
              </p>
            </div>

            {/* Feature 2 - Trusted Restaurants */}
            <div className="bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700/60 p-8 rounded-3xl shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="bg-amber-500/10 text-amber-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold mb-3">A-Grade Quality & Hygiene</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                We only partner with top-rated restaurants that pass our strict safety, cleanliness, and taste checks. Taste luxury without worrying.
              </p>
            </div>

            {/* Feature 3 - Live Tracking */}
            <div className="bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700/60 p-8 rounded-3xl shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="bg-orange-500/10 text-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold mb-3">Live Order Tracking</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Never wonder where your food is. Watch your meal move in real time on our interactive map from the kitchen counter to your front door.
              </p>
            </div>

          </div>

          {/* Extra Callout card */}
          <div className="mt-16 bg-gradient-to-r from-orange-600 to-amber-500 p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-2xl sm:text-3xl font-black text-white">Join as a Rider or Restaurant Partner</h4>
              <p className="text-white/80 max-w-xl text-sm font-semibold">
                Looking to deliver with BiteDash or grow your restaurant business? Get started and reach thousands of customers nearby.
              </p>
            </div>
            <div className="flex gap-3">
              <Link 
                to="/register"
                className="bg-white text-neutral-900 hover:bg-neutral-100 font-bold px-6 py-3 rounded-full text-sm transition-all cursor-pointer shadow-lg block text-center"
              >
                Join Now
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* EXPLORE MENU SECTION */}
      <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/60 pb-8">
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest">Explore Menu</h2>
            <p className="text-3xl sm:text-4xl font-black text-neutral-900">Satisfy Your Cravings</p>
          </div>
          
          {/* Menu Search Bar */}
          <div className="relative w-full max-w-sm">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search dishes or kitchens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-neutral-200 pl-11 pr-4 py-3 rounded-full text-sm font-semibold outline-none focus:border-orange-500 transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Category Filters Carousel / Grid */}
        <div className="flex gap-3 overflow-x-auto pb-4 pt-8 no-scrollbar scroll-smooth">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-extrabold whitespace-nowrap cursor-pointer transition-all border ${
                activeCategory === category.id 
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-md shadow-neutral-950/15'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Dishes Cards Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {filteredDishes.map(dish => (
              <div 
                key={dish.id} 
                className="bg-white rounded-3xl border border-neutral-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Image and badge */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-extrabold uppercase py-1 px-3 rounded-full tracking-wider shadow-md">
                    {dish.tag}
                  </span>
                  {/* Heart Favorite button */}
                  <button 
                    onClick={() => toggleFavorite(dish.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-neutral-600 hover:text-red-500 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(dish.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Restaurant and Rating */}
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-400 mb-2">
                      <span>{dish.restaurant}</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{dish.rating} ({dish.reviews})</span>
                      </div>
                    </div>

                    <h4 className="font-extrabold text-lg text-neutral-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {dish.name}
                    </h4>

                    {/* Delivery metrics */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{dish.time}</span>
                      </div>
                      <div className="w-1 h-1 bg-neutral-300 rounded-full" />
                      <span>Free Delivery</span>
                    </div>
                  </div>

                  {/* Price and Add button */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <span className="text-2xl font-black text-neutral-900">${dish.price.toFixed(2)}</span>
                    <button 
                      onClick={() => handleAddToCart(dish.name)}
                      className="bg-neutral-950 hover:bg-orange-500 text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-dashed border-neutral-200 rounded-3xl mt-8">
            <p className="text-neutral-400 font-semibold mb-2">No mouthwatering dishes match your search.</p>
            <button 
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="text-orange-500 font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* REVIEWS / TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-orange-500/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest">Testimonials</h2>
            <p className="text-3xl sm:text-4xl font-black text-neutral-900">What Our Happy Eaters Say</p>
            <p className="text-neutral-500 text-sm sm:text-base">
              Don't just take our word for it. Here is feedback from some of our daily active foodies.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <div 
                key={t.id} 
                className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <div>
                  {/* Stars */}
                  <div className="flex gap-1 text-amber-500 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed italic mb-6">
                    "{t.text}"
                  </p>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h5 className="font-extrabold text-sm text-neutral-900">{t.name}</h5>
                    <p className="text-[10px] font-bold text-neutral-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        
        {/* Section title */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest">Have Questions?</h2>
          <p className="text-3xl sm:text-4xl font-black text-neutral-900">Frequently Asked Questions</p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left font-extrabold text-neutral-800 hover:text-orange-500 cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-500' : 'text-neutral-400'}`} />
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 text-sm font-semibold text-neutral-500 border-t border-neutral-100/60 pt-4 bg-[#FDFDFD]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* APP DOWNLOAD CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span className="bg-orange-500/20 text-orange-400 text-xs font-bold uppercase py-1.5 px-3 rounded-full border border-orange-500/30">
              Get the App
            </span>
            <h3 className="text-3xl sm:text-5xl font-black leading-tight">
              Order Your Favourite Meals on the Go!
            </h3>
            <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-medium">
              Download the BiteDash mobile app to order food faster, get exclusive promo codes, and keep an eye on live GPS driver tracking.
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <a href="#" className="hover:scale-105 transition-transform">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="App store" 
                  className="h-12 border border-neutral-800 rounded-lg bg-black"
                />
              </a>
              <a href="#" className="hover:scale-105 transition-transform">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Play store" 
                  className="h-12 border border-neutral-800 rounded-lg bg-black"
                />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            {/* Visual Phone mock */}
            <div className="w-64 h-[420px] bg-neutral-900 border-[8px] border-neutral-800 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="w-32 h-4.5 bg-neutral-800 absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-xl z-20" />
              <img 
                src="https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80" 
                alt="BiteDash Delivery" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-x-4 bottom-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-neutral-100 shadow-xl flex items-center justify-between text-neutral-800 z-10 animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">⚡</div>
                  <div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase">Driver En Route</p>
                    <p className="text-xs font-bold">Arriving in 8 min</p>
                  </div>
                </div>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-neutral-200/80 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-200">
          
          {/* Col 1 - brand */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-orange-500 to-amber-400 p-2 rounded-xl text-white">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                BiteDash
              </span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-sm font-semibold">
              Delivering happiness, hot food, and cravings satisfied right to your doorstep. The quickest route to your favourite culinary delights.
            </p>
            
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 bg-neutral-100 hover:bg-orange-50 hover:text-orange-500 text-neutral-600 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 - Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="font-black text-sm text-neutral-900 uppercase tracking-widest">Discover</h5>
            <ul className="space-y-2.5 text-sm font-semibold text-neutral-500">
              <li><a href="#menu" className="hover:text-orange-500 transition-colors">Our Menu</a></li>
              <li><a href="#features" className="hover:text-orange-500 transition-colors">Why Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Trending Kitchens</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Special Coupons</a></li>
            </ul>
          </div>

          {/* Col 3 - Partnership */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="font-black text-sm text-neutral-900 uppercase tracking-widest">Partner</h5>
            <ul className="space-y-2.5 text-sm font-semibold text-neutral-500">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Merchant Portal</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Become a Rider</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Brand Press</a></li>
            </ul>
          </div>

          {/* Col 4 - Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="font-black text-sm text-neutral-900 uppercase tracking-widest">Stay Updated</h5>
            <p className="text-neutral-500 text-sm font-semibold">
              Subscribe to get tasty coupons and fresh food discounts in your inbox weekly!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-neutral-100 text-neutral-800 text-sm font-semibold px-4 py-3 rounded-xl w-full outline-none focus:ring-1 focus:ring-orange-500 border border-transparent focus:border-orange-500"
                required
              />
              <button 
                type="submit"
                className="bg-neutral-950 hover:bg-orange-500 text-white font-extrabold text-sm px-5 py-3 rounded-xl transition-all cursor-pointer flex-shrink-0"
              >
                Join
              </button>
            </form>
            {newsletterSubscribed && (
              <p className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Welcome! Check your inbox for a <strong>20% OFF</strong> coupon.
              </p>
            )}
          </div>

        </div>

        {/* Footer Sub-row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-neutral-400">
          <p>© {new Date().getFullYear()} BiteDash Inc. All culinary rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-500">Terms of Use</a>
            <span>•</span>
            <a href="#" className="hover:text-orange-500">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-orange-500">Cookie Settings</a>
          </div>
        </div>
      </footer>

      {/* LOGIN / SIGNUP MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden relative animate-scale-up">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-5 right-5 p-2 bg-neutral-100 hover:bg-orange-50 text-neutral-500 hover:text-orange-600 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="p-8 pb-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-tr from-orange-500 to-amber-400 p-2 rounded-xl text-white">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  BiteDash
                </span>
              </div>
              <h4 className="text-2xl font-black text-neutral-900">
                {loginTab === 'login' ? 'Welcome Back!' : 'Create Account'}
              </h4>
              <p className="text-neutral-500 text-xs font-semibold mt-1">
                {loginTab === 'login' ? 'Enter credentials to start ordering meals.' : 'Get started by creating your account.'}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-neutral-100">
              <button 
                onClick={() => setLoginTab('login')}
                className={`w-1/2 py-3 text-center text-sm font-extrabold cursor-pointer border-b-2 transition-all ${
                  loginTab === 'login' 
                    ? 'border-orange-500 text-orange-600 bg-orange-50/20' 
                    : 'border-transparent text-neutral-400 hover:text-neutral-600'
                }`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setLoginTab('signup')}
                className={`w-1/2 py-3 text-center text-sm font-extrabold cursor-pointer border-b-2 transition-all ${
                  loginTab === 'signup' 
                    ? 'border-orange-500 text-orange-600 bg-orange-50/20' 
                    : 'border-transparent text-neutral-400 hover:text-neutral-600'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="p-8 space-y-4.5">
              {loginTab === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-neutral-500 uppercase tracking-wide">Full Name</label>
                  <div className="relative">
                    <User className="w-4.5 h-4.5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="bg-neutral-50 text-neutral-800 text-sm font-semibold pl-10 pr-4 py-3 border border-neutral-200 focus:border-orange-500 rounded-xl w-full outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-neutral-500 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                  <Mail className="w-4.5 h-4.5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="email" 
                    placeholder="email@example.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="bg-neutral-50 text-neutral-800 text-sm font-semibold pl-10 pr-4 py-3 border border-neutral-200 focus:border-orange-500 rounded-xl w-full outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-neutral-500 uppercase tracking-wide">Password</label>
                  {loginTab === 'login' && (
                    <a href="#" className="text-[10px] font-extrabold text-orange-500 hover:underline">Forgot?</a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4.5 h-4.5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    className="bg-neutral-50 text-neutral-800 text-sm font-semibold pl-10 pr-10 py-3 border border-neutral-200 focus:border-orange-500 rounded-xl w-full outline-none transition-colors"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginTab === 'login' && (
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="rounded text-orange-500 focus:ring-orange-400 h-4 w-4 bg-neutral-50 border-neutral-300" />
                  <label htmlFor="remember" className="ml-2 text-xs font-semibold text-neutral-500 cursor-pointer select-none">Remember this device</label>
                </div>
              )}

              {/* Submit CTA */}
              <button 
                type="submit"
                className="w-full bg-neutral-900 hover:bg-orange-500 text-white font-extrabold py-3.5 rounded-xl transition-all cursor-pointer mt-4 shadow-lg shadow-neutral-950/10"
              >
                {loginTab === 'login' ? 'Sign In' : 'Create Account'}
              </button>

              <div className="text-center pt-2 text-[11px] font-bold text-neutral-400">
                By continuing, you agree to our Terms of Service & Privacy Policy.
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
