import Link from 'next/link';

export default function Footer({ citySlug = '', cityName = '' }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white pt-20 pb-12 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href={citySlug ? `/${citySlug}/` : '/'} className="inline-block group">
              <img
                src="/images/logo.webp"
                alt="Golden Grove Cleaning Logo"
                className="h-14 w-auto rounded-lg brightness-110 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </Link>
            <p className="text-gray-400 text-base leading-relaxed">
              Setting the gold standard for residential and commercial cleaning across Texas. Vetted local pros, 100% bonded &amp; insured.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.facebook.com/goldengrovecleaning"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Golden Grove Cleaning on Facebook"
                className="w-11 h-11 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center hover:bg-brand-orange transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-orange/20"
              >
                <i className="fa-brands fa-facebook-f text-lg"></i>
              </a>
              <a
                href="https://www.instagram.com/goldengrovecleaning"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Golden Grove Cleaning on Instagram"
                className="w-11 h-11 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center hover:bg-brand-orange transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-orange/20"
              >
                <i className="fa-brands fa-instagram text-lg"></i>
              </a>
              <a
                href="https://www.google.com/maps/search/Golden+Grove+Cleaning+Texas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Find Golden Grove Cleaning on Google Maps"
                className="w-11 h-11 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center hover:bg-brand-orange transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-orange/20"
              >
                <i className="fa-brands fa-google text-lg"></i>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-white">
              <span className="w-8 h-1 bg-gradient-to-r from-brand-orange to-brand-gold rounded-full"></span>
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={citySlug ? `/${citySlug}/house-cleaning/` : '/house-cleaning/'}
                  className="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                  House Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href={citySlug ? `/${citySlug}/deep-cleaning/` : '/deep-cleaning/'}
                  className="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href={citySlug ? `/${citySlug}/move-out-cleaning/` : '/move-out-cleaning/'}
                  className="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                  Move-In / Move-Out
                </Link>
              </li>
              <li>
                <Link
                  href={citySlug ? `/${citySlug}/commercial-janitorial/` : '/commercial-janitorial/'}
                  className="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                  Commercial Janitorial
                </Link>
              </li>
              <li>
                <Link
                  href={citySlug ? `/${citySlug}/airbnb-turnover/` : '/airbnb-turnover/'}
                  className="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                  Airbnb Turnover
                </Link>
              </li>
              <li>
                <Link
                  href={citySlug ? `/${citySlug}/post-construction-cleaning/` : '/post-construction-cleaning/'}
                  className="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                  Post-Construction
                </Link>
              </li>
              <li>
                <Link
                  href={citySlug ? `/${citySlug}/carpet-upholstery-cleaning/` : '/carpet-upholstery-cleaning/'}
                  className="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                  Carpet Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href={citySlug ? `/${citySlug}/window-cleaning/` : '/window-cleaning/'}
                  className="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                  Window Cleaning
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-white">
              <span className="w-8 h-1 bg-gradient-to-r from-brand-orange to-brand-gold rounded-full"></span>
              Texas Markets
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/dallas-tx/" className="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                  Dallas &amp; Fort Worth Metro
                </Link>
              </li>
              <li>
                <Link href="/houston-tx/" className="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                  Greater Houston Area
                </Link>
              </li>
              <li>
                <Link href="/austin-tx/" className="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                  Austin &amp; Central Texas
                </Link>
              </li>
              <li>
                <Link href="/san-antonio-tx/" className="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                  San Antonio Metro
                </Link>
              </li>
              <li>
                <Link href="/midland-tx/" className="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                  Midland &amp; Permian Basin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-white">
              <span className="w-8 h-1 bg-gradient-to-r from-brand-orange to-brand-gold rounded-full"></span>
              Contact
            </h3>
            <div className="space-y-5">
              <a href="tel:+14322181700" className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-brand-orange transition-all duration-300 group-hover:shadow-lg group-hover:shadow-brand-orange/20">
                  <i className="fa-solid fa-phone text-brand-orange group-hover:text-white transition-colors"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Call Us</p>
                  <p className="text-white font-semibold group-hover:text-brand-orange transition-colors">
                    (432) 218-1700
                  </p>
                </div>
              </a>

              <div className="pt-2">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-3">Quick Links</p>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about/" className="text-gray-400 hover:text-brand-orange transition-colors duration-200 text-sm">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/locations/" className="text-gray-400 hover:text-brand-orange transition-colors duration-200 text-sm">
                      Texas Service Locations
                    </Link>
                  </li>
                  <li>
                    <Link href="/book-now/" className="text-gray-400 hover:text-brand-orange transition-colors duration-200 text-sm">
                      Book Online
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {currentYear} Golden Grove Cleaning. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/privacy-policy/" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions/" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span className="text-gray-600">|</span>
              <a
                href="https://truewebx.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-orange transition-all duration-300 font-medium flex items-center gap-2 group"
              >
                <span>Made by</span>
                <span className="font-bold bg-gradient-to-r from-brand-orange to-brand-gold bg-clip-text text-transparent group-hover:from-brand-gold group-hover:to-brand-orange transition-all">
                  TrueWebX
                </span>
                <svg className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
