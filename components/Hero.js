import Link from 'next/link';
import CitySearchBar from './CitySearchBar';

export default function Hero({ city = null, service = null, customTitle = null, customSubtitle = null }) {
  const cityName = city ? city.name : 'Texas';
  const stateCode = 'TX';
  
  // Dynamic headline matching original SEO pattern
  let h1 = customTitle;
  if (!h1) {
    if (service && city) {
      h1 = `#1 ${service.name} in ${cityName} ${stateCode} | Golden Grove`;
    } else if (service) {
      h1 = `Top ${service.name} in Texas | Golden Grove`;
    } else if (city) {
      h1 = `#1 Cleaning Service Company in ${cityName} ${stateCode} | Golden Grove`;
    } else {
      h1 = `Top Cleaning Services in Texas | House & Commercial | Golden Grove`;
    }
  }

  let subtitle = customSubtitle;
  if (!subtitle) {
    if (service && city) {
      subtitle = `Top-rated ${service.name.toLowerCase()} in ${cityName}, TX provided by Golden Grove Cleaning. Bonded, insured, and 100% satisfaction guaranteed.`;
    } else if (city) {
      subtitle = `Golden Grove Cleaning provides top house cleaning, deep clean & maid service in ${cityName}, TX. Call (432) 218-1700 today for a free quote!`;
    } else {
      subtitle = `Golden Grove Cleaning provides top-rated professional house cleaning, deep cleaning, move-out, and commercial janitorial services across Texas. Call (432) 218-1700.`;
    }
  }

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-orange-50/50 via-white to-white overflow-hidden">
      {/* Decorative background radial blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-orange-100/40 via-yellow-100/30 to-emerald-100/30 blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Live Availability Pill */}
        <div className="inline-flex items-center gap-2 bg-orange-100/80 border border-orange-200/80 rounded-full px-4 py-1.5 mb-6 text-xs sm:text-sm font-bold text-brand-dark">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping inline-block"></span>
          <span className="text-brand-orange uppercase tracking-wider">
            {city ? `${cityName}, TX Local Crew Available` : 'Serving All Major Texas Metros & Communities'}
          </span>
        </div>

        {/* Main H1 Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight max-w-4xl mx-auto leading-tight md:leading-tight mb-6">
          {h1}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>

        {/* City Autocomplete Search Bar */}
        <div className="mb-10">
          <CitySearchBar
            placeholder={city ? `Search other Texas cities near ${cityName}...` : "Enter your Texas city (e.g. Midland, Dallas, Austin)..."}
          />
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/book-now/"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-orange hover:bg-orange-600 text-white font-bold text-lg transition-all shadow-brand hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3"
          >
            <span>Get Instant Free Quote</span>
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </Link>

          <a
            href="tel:+14322181700"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-gray-50 border-2 border-gray-200 text-brand-dark font-bold text-lg transition-all hover:border-brand-orange hover:text-brand-orange active:scale-95 flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-phone text-brand-orange"></i>
            <span>(432) 218-1700</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-gray-600 pt-6 border-t border-gray-100 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-brand-orange text-base"></i>
            <span>100% Bonded &amp; Insured</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-brand-gold text-sm">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <span>4.9 / 5 Rating (143+ Reviews)</span>
          </div>

          <div className="flex items-center gap-2">
            <i className="fa-solid fa-award text-brand-orange text-base"></i>
            <span>24-Hour Satisfaction Guarantee</span>
          </div>

          <div className="flex items-center gap-2">
            <i className="fa-solid fa-user-check text-brand-orange text-base"></i>
            <span>Vetted Local Pros</span>
          </div>
        </div>
      </div>
    </section>
  );
}
