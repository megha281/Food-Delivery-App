import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, PlusCircle, CheckCircle, TrendingUp, Store } from 'lucide-react';

export default function RestaurantDashboard() {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');
  const name = savedUser.name || 'Partner Kitchen';

  React.useEffect(() => {
    document.title = "BiteDash | Manage Your Business";
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
              <Store className="w-4 h-4 text-orange-500" />
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
        <div className="space-y-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="space-y-4 max-w-xl">
              <span className="bg-orange-500/20 text-orange-400 text-xs font-bold uppercase py-1 px-3 rounded-full border border-orange-500/30">
                Manage Your Business
              </span>
              <h1 className="text-3xl sm:text-4xl font-black">Welcome Back, {name}!</h1>
              <p className="text-neutral-400 text-sm font-semibold leading-relaxed">
                Manage your dishes, inspect incoming orders, and track store performance from your partner command center.
              </p>
              <div className="pt-2">
                <button 
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm px-6 py-3.5 rounded-full transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4.5 h-4.5" />
                  Add New Dish
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm space-y-3">
              <div className="bg-orange-50 text-orange-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Incoming Orders</h3>
              <p className="text-neutral-500 text-sm font-semibold">0 active kitchen tickets. Pending customer checkouts will pop up here.</p>
            </div>

            <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm space-y-3">
              <div className="bg-amber-50 text-amber-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Menu Items</h3>
              <p className="text-neutral-500 text-sm font-semibold">Your dishes list is empty. Add your signature specialties to attract local foodies.</p>
            </div>

            <div className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-sm space-y-3">
              <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Sales Volume</h3>
              <p className="text-neutral-500 text-sm font-semibold">Store analytics, payout cycles, and monthly customer trends are available here.</p>
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
