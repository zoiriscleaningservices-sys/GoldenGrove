'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import citiesData from '@/data/cities.json';

export default function CitySearchBar({ placeholder = "Enter your Texas city (e.g. Midland, Dallas, Austin)..." }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const q = query.trim().toLowerCase();
      const filtered = citiesData
        .filter(c => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q))
        .slice(0, 10);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCity = (city) => {
    setQuery(`${city.name}, TX`);
    setIsOpen(false);
    router.push(`/${city.slug}/`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelectCity(suggestions[0]);
    } else if (query.trim()) {
      let slug = query.trim().toLowerCase().replace(/,?\s*tx$/, '');
      slug = slug.replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-');
      if (slug) {
        router.push(`/${slug}-tx/`);
      }
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative flex items-center shadow-2xl rounded-full">
        <div className="absolute left-5 text-brand-orange text-lg pointer-events-none">
          <i className="fa-solid fa-location-dot"></i>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-36 sm:pr-40 py-4 sm:py-5 rounded-full border-2 border-orange-200 focus:border-brand-orange focus:outline-none text-gray-800 placeholder-gray-400 text-base sm:text-lg bg-white transition-all shadow-inner"
        />

        <button
          type="submit"
          className="absolute right-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-full transition-all shadow-md flex items-center gap-2 text-sm sm:text-base active:scale-95"
        >
          <span>Find Pros</span>
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <ul className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50 max-h-80 overflow-y-auto">
          {suggestions.length > 0 ? (
            suggestions.map((city) => (
              <li
                key={city.slug}
                onClick={() => handleSelectCity(city)}
                className="px-6 py-3.5 hover:bg-orange-50 cursor-pointer text-gray-700 font-semibold transition-colors flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-brand-orange"><i className="fa-solid fa-location-dot"></i></span>
                  <span>{city.name}, TX</span>
                </div>
                {city.county && (
                  <span className="text-xs text-gray-400 font-normal">{city.county}</span>
                )}
              </li>
            ))
          ) : (
            <li className="px-6 py-4 text-gray-500 italic bg-gray-50/50 text-left">
              No matching Texas cities found. Press enter to search anyway.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
