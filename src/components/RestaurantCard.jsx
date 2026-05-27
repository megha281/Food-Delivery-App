import React from 'react';
import { Star, Clock, ArrowRight } from 'lucide-react';

export default function RestaurantCard({ restaurant, onViewMenu }) {
  const { name, category, rating, reviews, time, image, tag } = restaurant;

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group h-full">
      {/* Image & Custom Badges */}
      <div className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Floating Top Left Category Tag */}
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-neutral-800 text-[10px] font-extrabold uppercase py-1.5 px-3.5 rounded-full tracking-wider shadow-md border border-neutral-100">
          {category}
        </span>

        {/* Optional Custom Highlight Tag (e.g. Bestseller / Free Delivery) */}
        {tag && (
          <span className="absolute top-4 right-4 bg-orange-500 text-white text-[9px] font-extrabold uppercase py-1 px-3 rounded-full tracking-widest shadow-md">
            {tag}
          </span>
        )}
      </div>

      {/* Card Info & Actions */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Header Title */}
          <h4 className="font-extrabold text-lg text-neutral-900 group-hover:text-orange-600 transition-colors line-clamp-1">
            {name}
          </h4>

          {/* Quick Metrics (Rating & Time) */}
          <div className="flex items-center gap-4 text-xs font-bold text-neutral-500">
            <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{rating} ({reviews})</span>
            </div>
            <div className="flex items-center gap-1 bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5" />
              <span>{time}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            Free Delivery
          </span>
          <button 
            onClick={() => onViewMenu && onViewMenu(restaurant)}
            className="inline-flex items-center gap-2 bg-neutral-950 hover:bg-orange-500 text-white font-extrabold text-xs px-4.5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer group/btn"
          >
            <span>View Menu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
