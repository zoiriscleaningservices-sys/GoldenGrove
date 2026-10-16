import Link from 'next/link';
import services from '@/data/services.json';

export default function ServicesGrid({ citySlug = '', cityName = '' }) {
  const headingCity = cityName ? `in ${cityName}, TX` : 'Across Texas';

  return (
    <section className="py-20 bg-brand-light" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-orange bg-orange-100/60 px-4 py-1.5 rounded-full inline-block mb-3">
            Our Cleaning Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">
            Professional Cleaning Services {headingCity}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            From recurring residential maid service to intensive industrial janitorial contracts, our bonded and insured teams deliver flawless results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 12).map((srv) => {
            const linkHref = citySlug ? `/${citySlug}/${srv.slug}/` : `/${srv.slug}/`;
            return (
              <div
                key={srv.slug}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 group-hover:bg-brand-orange text-brand-orange group-hover:text-white flex items-center justify-center text-2xl transition-colors duration-300 mb-6">
                    <i className={`fa-solid ${srv.icon}`}></i>
                  </div>

                  <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-orange transition-colors">
                    {srv.name}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {srv.shortDesc.replace('Texas', cityName ? `${cityName}, TX` : 'Texas')}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={linkHref}
                    className="text-sm font-bold text-brand-orange group-hover:underline flex items-center gap-1.5"
                  >
                    <span>Learn More &amp; Pricing</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </Link>

                  <span className="text-xs text-green-700 font-semibold bg-green-50 px-2.5 py-1 rounded-full">
                    Available
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all services toggle / banner */}
        <div className="mt-14 bg-white rounded-3xl p-8 border border-orange-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-xl font-bold text-brand-dark mb-1">
              Need a Custom or Commercial Janitorial Schedule?
            </h4>
            <p className="text-gray-600 text-sm">
              We create customized cleaning plans for offices, daycares, medical clinics, and post-construction sites.
            </p>
          </div>
          <Link
            href="/book-now/"
            className="px-8 py-3.5 bg-brand-green hover:bg-emerald-900 text-white font-bold rounded-full transition-all shadow-md flex-shrink-0"
          >
            Request Custom Plan
          </Link>
        </div>
      </div>
    </section>
  );
}
