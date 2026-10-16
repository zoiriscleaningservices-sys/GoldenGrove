'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header({ citySlug = '', cityName = '' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [marketsOpen, setMarketsOpen] = useState(false);

  // Silo Insulation: Home points to city hub if inside city context, otherwise root
  const homeHref = citySlug ? `/${citySlug}/` : '/';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      {/* Top Notification Bar */}
      <div className="bg-brand-green text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        <span>Trusted Professional House &amp; Commercial Cleaning Across Texas</span>
        <span className="hidden md:inline">|</span>
        <a href="tel:+14322181700" className="hidden md:inline font-bold text-brand-gold hover:underline">
          <i className="fa-solid fa-phone mr-1"></i> Call (432) 218-1700
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={homeHref} className="flex items-center gap-3 group">
            <img
              src="/images/logo.webp"
              alt="Golden Grove Cleaning Services"
              className="h-12 sm:h-14 w-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            {cityName && (
              <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-orange-50 text-brand-orange rounded-full border border-orange-200">
                {cityName}, TX
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href={homeHref} className="nav-link text-gray-700 hover:text-brand-orange font-semibold transition-colors">
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="nav-link text-gray-700 hover:text-brand-orange font-semibold flex items-center gap-1 transition-colors py-2"
              >
                <span>Services</span>
                <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200 group-hover:rotate-180"></i>
              </button>

              <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                <Link
                  href={citySlug ? `/${citySlug}/house-cleaning/` : '/house-cleaning/'}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 text-gray-700 hover:text-brand-orange transition-colors"
                >
                  <i className="fa-solid fa-house-chimney text-brand-orange text-lg w-5"></i>
                  <div>
                    <div className="font-semibold text-sm">House Cleaning</div>
                    <div className="text-xs text-gray-400">Routine &amp; recurring maid service</div>
                  </div>
                </Link>

                <Link
                  href={citySlug ? `/${citySlug}/deep-cleaning/` : '/deep-cleaning/'}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 text-gray-700 hover:text-brand-orange transition-colors"
                >
                  <i className="fa-solid fa-broom text-brand-orange text-lg w-5"></i>
                  <div>
                    <div className="font-semibold text-sm">Deep Cleaning</div>
                    <div className="text-xs text-gray-400">Intensive top-to-bottom scrub</div>
                  </div>
                </Link>

                <Link
                  href={citySlug ? `/${citySlug}/move-out-cleaning/` : '/move-out-cleaning/'}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 text-gray-700 hover:text-brand-orange transition-colors"
                >
                  <i className="fa-solid fa-truck-moving text-brand-orange text-lg w-5"></i>
                  <div>
                    <div className="font-semibold text-sm">Move-In / Move-Out</div>
                    <div className="text-xs text-gray-400">Deposit guarantee turnover</div>
                  </div>
                </Link>

                <Link
                  href={citySlug ? `/${citySlug}/commercial-janitorial/` : '/commercial-janitorial/'}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 text-gray-700 hover:text-brand-orange transition-colors"
                >
                  <i className="fa-solid fa-building text-brand-orange text-lg w-5"></i>
                  <div>
                    <div className="font-semibold text-sm">Commercial Janitorial</div>
                    <div className="text-xs text-gray-400">Office &amp; facility solutions</div>
                  </div>
                </Link>

                <Link
                  href={citySlug ? `/${citySlug}/airbnb-turnover/` : '/airbnb-turnover/'}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 text-gray-700 hover:text-brand-orange transition-colors"
                >
                  <i className="fa-solid fa-key text-brand-orange text-lg w-5"></i>
                  <div>
                    <div className="font-semibold text-sm">Airbnb Turnover</div>
                    <div className="text-xs text-gray-400">Vacation rental turnover</div>
                  </div>
                </Link>

                <Link
                  href={citySlug ? `/${citySlug}/carpet-upholstery-cleaning/` : '/carpet-upholstery-cleaning/'}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50 text-gray-700 hover:text-brand-orange transition-colors"
                >
                  <i className="fa-solid fa-rug text-brand-orange text-lg w-5"></i>
                  <div>
                    <div className="font-semibold text-sm">Carpet Cleaning</div>
                    <div className="text-xs text-gray-400">Deep steam extraction</div>
                  </div>
                </Link>
              </div>
            </div>

            <Link href="/locations/" className="nav-link text-gray-700 hover:text-brand-orange font-semibold transition-colors">
              Texas Locations
            </Link>

            <Link href="/about/" className="nav-link text-gray-700 hover:text-brand-orange font-semibold transition-colors">
              About Us
            </Link>

            <Link href="/gallery/" className="nav-link text-gray-700 hover:text-brand-orange font-semibold transition-colors">
              Gallery
            </Link>

            <Link href="/blog/" className="nav-link text-gray-700 hover:text-brand-orange font-semibold transition-colors">
              Blog
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+14322181700"
              className="flex items-center gap-2 text-gray-800 hover:text-brand-orange font-bold text-base transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-brand-orange">
                <i className="fa-solid fa-phone text-sm"></i>
              </div>
              <span>(432) 218-1700</span>
            </a>

            <Link
              href="/book-now/"
              className="px-6 py-3 rounded-full bg-brand-orange hover:bg-orange-600 text-white font-bold transition-all shadow-md hover:shadow-brand hover:-translate-y-0.5"
            >
              Get Instant Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="tel:+14322181700"
              className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-md"
              aria-label="Call Now"
            >
              <i className="fa-solid fa-phone text-sm"></i>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 hover:text-brand-orange focus:outline-none"
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-5 pt-3 pb-6 space-y-4 shadow-xl animate-fade-in-up">
          <Link
            href={homeHref}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-base font-bold text-gray-800 hover:text-brand-orange border-b border-gray-100"
          >
            Home
          </Link>

          <div>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full flex items-center justify-between py-2.5 text-base font-bold text-gray-800 hover:text-brand-orange border-b border-gray-100"
            >
              <span>Services</span>
              <i className={`fa-solid fa-chevron-down text-xs transition-transform ${servicesOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {servicesOpen && (
              <div className="pl-4 py-2 space-y-2 bg-gray-50 rounded-xl my-2">
                <Link
                  href={citySlug ? `/${citySlug}/house-cleaning/` : '/house-cleaning/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm text-gray-600 hover:text-brand-orange font-medium"
                >
                  House Cleaning
                </Link>
                <Link
                  href={citySlug ? `/${citySlug}/deep-cleaning/` : '/deep-cleaning/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm text-gray-600 hover:text-brand-orange font-medium"
                >
                  Deep Cleaning
                </Link>
                <Link
                  href={citySlug ? `/${citySlug}/move-out-cleaning/` : '/move-out-cleaning/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm text-gray-600 hover:text-brand-orange font-medium"
                >
                  Move-In / Move-Out
                </Link>
                <Link
                  href={citySlug ? `/${citySlug}/commercial-janitorial/` : '/commercial-janitorial/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm text-gray-600 hover:text-brand-orange font-medium"
                >
                  Commercial Janitorial
                </Link>
                <Link
                  href={citySlug ? `/${citySlug}/airbnb-turnover/` : '/airbnb-turnover/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm text-gray-600 hover:text-brand-orange font-medium"
                >
                  Airbnb Turnover
                </Link>
                <Link
                  href={citySlug ? `/${citySlug}/carpet-upholstery-cleaning/` : '/carpet-upholstery-cleaning/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm text-gray-600 hover:text-brand-orange font-medium"
                >
                  Carpet Cleaning
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setMarketsOpen(!marketsOpen)}
              className="w-full flex items-center justify-between py-2.5 text-base font-bold text-gray-800 hover:text-brand-orange border-b border-gray-100"
            >
              <span>Major Markets</span>
              <i className={`fa-solid fa-chevron-down text-xs transition-transform ${marketsOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {marketsOpen && (
              <div className="pl-4 py-2 space-y-2 bg-gray-50 rounded-xl my-2">
                <Link href="/dallas-tx/" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-gray-600 hover:text-brand-orange font-medium">Dallas - Fort Worth</Link>
                <Link href="/houston-tx/" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-gray-600 hover:text-brand-orange font-medium">Houston Area</Link>
                <Link href="/austin-tx/" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-gray-600 hover:text-brand-orange font-medium">Austin &amp; Central TX</Link>
                <Link href="/san-antonio-tx/" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-gray-600 hover:text-brand-orange font-medium">San Antonio</Link>
                <Link href="/midland-tx/" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm text-gray-600 hover:text-brand-orange font-medium">Midland &amp; Permian Basin</Link>
              </div>
            )}
          </div>

          <Link href="/locations/" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-base font-bold text-gray-800 hover:text-brand-orange border-b border-gray-100">
            All Locations
          </Link>
          <Link href="/about/" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-base font-bold text-gray-800 hover:text-brand-orange border-b border-gray-100">
            About Us
          </Link>
          <Link href="/gallery/" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-base font-bold text-gray-800 hover:text-brand-orange border-b border-gray-100">
            Gallery
          </Link>
          <Link href="/blog/" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 text-base font-bold text-gray-800 hover:text-brand-orange border-b border-gray-100">
            Blog
          </Link>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/book-now/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3.5 rounded-xl bg-brand-orange text-white font-bold shadow-md"
            >
              Get Free Quote
            </Link>
            <a
              href="tel:+14322181700"
              className="w-full text-center py-3.5 rounded-xl bg-brand-green text-white font-bold flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-phone"></i> (432) 218-1700
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
