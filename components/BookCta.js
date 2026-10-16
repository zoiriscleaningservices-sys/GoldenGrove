import Link from 'next/link';

export default function BookCta({ cityName = 'Texas' }) {
  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F28C28 0%, #D97706 50%, #1F3D36 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.3)' }}></div>
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.2)' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="text-center mb-10">
          {/* Live availability badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping inline-block"></span>
            <span className="text-white text-xs font-bold uppercase tracking-widest">
              Real-Time Availability Open {cityName !== 'Texas' ? `in ${cityName}` : ''}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Ready to Book Your Professional Cleaning?
          </h2>
          <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of Texas homeowners and businesses who trust Golden Grove Cleaning. Book online in 60 seconds — no waiting, no hassle.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-5 py-2">
            <span className="text-green-300 text-lg font-bold">✓</span>
            <span className="text-white font-semibold text-xs sm:text-sm">Bonded &amp; Insured</span>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-5 py-2">
            <span className="text-green-300 text-lg font-bold">✓</span>
            <span className="text-white font-semibold text-xs sm:text-sm">Background Checked Pros</span>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-5 py-2">
            <span className="text-green-300 text-lg font-bold">✓</span>
            <span className="text-white font-semibold text-xs sm:text-sm">100% Satisfaction Guarantee</span>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-5 py-2">
            <span className="text-green-300 text-lg font-bold">✓</span>
            <span className="text-white font-semibold text-xs sm:text-sm">Free Instant Quote</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/book-now/"
            className="w-full sm:w-auto inline-flex items-center gap-3 bg-white text-brand-orange font-extrabold text-lg px-10 py-4 sm:py-5 rounded-2xl shadow-2xl hover:shadow-orange-900/30 hover:-translate-y-1 hover:scale-105 transition-all duration-300 active:scale-95 min-w-[220px] justify-center"
            style={{ color: '#F28C28' }}
          >
            <i className="fa-solid fa-calendar-check text-lg"></i>
            <span>Book Online Now</span>
          </Link>
          <a
            href="tel:+14322181700"
            className="w-full sm:w-auto inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/40 hover:bg-white/20 text-white font-extrabold text-lg px-10 py-4 sm:py-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95 min-w-[220px] justify-center"
          >
            <i className="fa-solid fa-phone text-lg"></i>
            <span>Call (432) 218-1700</span>
          </a>
        </div>
      </div>
    </section>
  );
}
