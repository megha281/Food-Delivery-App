import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Search, Clock, Compass, Heart } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';

const MOCK_RESTAURANTS = [
  {
    id: 1,
    name: 'Pizzeria Napoli',
    category: 'Pizza & Italian',
    rating: 4.9,
    reviews: 142,
    time: '15-20 min',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    tag: 'Trending'
  },
  {
    id: 2,
    name: 'Sushi Sakura',
    category: 'Japanese & Sushi',
    rating: 4.8,
    reviews: 118,
    time: '25-30 min',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    tag: 'Chef Choice'
  },
  {
    id: 3,
    name: 'Burger & Co.',
    category: 'Burgers & Fast Food',
    rating: 4.7,
    reviews: 198,
    time: '20-25 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    tag: 'Popular'
  },
  {
    id: 4,
    name: 'Green Garden',
    category: 'Healthy & Salads',
    rating: 4.6,
    reviews: 82,
    time: '10-15 min',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    tag: 'Diet Friendly'
  },
  {
    id: 5,
    name: 'Taco Fiesta',
    category: 'Mexican & Taco',
    rating: 4.7,
    reviews: 64,
    time: '15-25 min',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
    tag: 'New Store'
  },
  {
    id: 6,
    name: 'La Pâtisserie',
    category: 'Desserts & Pastry',
    rating: 4.9,
    reviews: 210,
    time: '10-20 min',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    tag: 'Sweet Delight'
  }
];

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
  const name = savedUser.name || 'Valued Customer';

  React.useEffect(() => {
    document.title = "BiteDash | Browse Local Flavors";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('registeredUser');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-neutral-900 font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-orange-500 to-amber-400 p-2.5 rounded-2xl text-white shadow-lg group-hover:rotate-6 transition-transform duration-300">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              BiteDash
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full">
              <User className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-neutral-700">{name}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-full transition-all cursor-pointer"
              title="Log Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="space-y-4 max-w-xl">
              <span className="bg-orange-500/20 text-orange-400 text-xs font-bold uppercase py-1 px-3 rounded-full border border-orange-500/30">
                Browse Local Flavors
              </span>
              <h1 className="text-3xl sm:text-4xl font-black">Welcome Back, {name}!</h1>
              <p className="text-neutral-400 text-sm font-semibold leading-relaxed">
                Ready for another delicious meal? Explore thousands of cuisines with lightning fast delivery.
              </p>
              <div className="pt-2">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm px-6 py-3.5 rounded-full transition-all"
                >
                  <Compass className="w-4.5 h-4.5" />
                  Order Food Now
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm space-y-3">
              <div className="bg-orange-50 text-orange-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Active Orders</h3>
              <p className="text-neutral-500 text-sm font-semibold">You have no active orders. Your next delivery will appear here.</p>
            </div>

            <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm space-y-3">
              <div className="bg-amber-50 text-amber-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Favorite Kitchens</h3>
              <p className="text-neutral-500 text-sm font-semibold">You haven't favorited any restaurants yet. Save kitchens for quick access.</p>
            </div>

            <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm space-y-3">
              <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Recent History</h3>
              <p className="text-neutral-500 text-sm font-semibold">Order details, receipts, and reorder quick buttons will show here.</p>
            </div>
          </div>

          {/* Featured Restaurants Feed */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-200/60 pb-4">
              <div>
                <h2 className="text-2xl font-black text-neutral-900">Featured Restaurants</h2>
                <p className="text-xs font-semibold text-neutral-500 mt-0.5">Handpicked premium cuisines near your location</p>
              </div>
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 self-start sm:self-auto">
                6 stores online
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_RESTAURANTS.map((restaurant) => (
                <RestaurantCard 
                  key={restaurant.id} 
                  restaurant={restaurant} 
                  onViewMenu={(store) => {
                    const toast = document.createElement('div');
                    toast.className = 'fixed bottom-5 right-5 bg-neutral-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 z-50 animate-bounce border border-orange-500/30 text-sm font-semibold';
                    toast.innerHTML = `🍽️ Fetching latest menus for <strong>${store.name}</strong>...`;
                    document.body.appendChild(toast);
                    setTimeout(() => toast.remove(), 2500);
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-neutral-200/80 bg-white text-center text-xs font-bold text-neutral-400">
        <p>© {new Date().getFullYear()} BiteDash Inc. All culinary rights reserved.</p>
      </footer>
    </div>
  );
}
