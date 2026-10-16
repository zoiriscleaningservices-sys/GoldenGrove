'use client';

import Script from 'next/script';
import Link from 'next/link';

export default function QuoteForm({ cityName = 'Texas' }) {
  return (
    <section id="quote" className="py-16 md:py-24 bg-gradient-to-br from-orange-50 via-orange-100/70 to-white relative overflow-hidden">
      {/* Decorative blurred blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 animate-pulse-slow delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">
            Get Your <span className="text-orange-600">Free Quote</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Fast &amp; professional cleaning services in {cityName} • No obligation • Quick response
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT - LeadConnector Embed Form */}
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-orange-100/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
            <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <i className="fa-solid fa-clipboard-list text-brand-orange"></i>
                Request a Free Quote
              </h3>
              <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                Instant Response
              </span>
            </div>

            <iframe
              src="https://api.leadconnectorhq.com/widget/form/Qw27XO1tcXra7A4hA2hy"
              style={{ width: '100%', height: '100%', minHeight: '620px', border: 'none', borderRadius: '16px' }}
              id="inline-Qw27XO1tcXra7A4hA2hy"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-activation-type="alwaysActive"
              data-deactivation-type="neverDeactivate"
              data-form-name="CBC - Contact Us - A2P Verified"
              data-height="715"
              data-layout-iframe-id="inline-Qw27XO1tcXra7A4hA2hy"
              data-form-id="Qw27XO1tcXra7A4hA2hy"
              title="CBC - Contact Us - A2P Verified"
              className="w-full"
            />
            <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
          </div>

          {/* RIGHT - Contact Info & Trust Details */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-orange-100/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
                    📞
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Phone</p>
                    <a
                      href="tel:+14322181700"
                      className="text-lg text-gray-900 font-bold hover:text-orange-700 transition-colors"
                    >
                      (432) 218-1700
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-2xl">
                    ✉️
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <a
                      href="mailto:info@goldengrovecleaning.com"
                      className="text-lg text-gray-900 font-bold hover:text-orange-700 transition-colors break-all"
                    >
                      info@goldengrovecleaning.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                    🕒
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Hours</p>
                    <p className="text-gray-900 font-bold">Mon - Sat: 7:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <Link
                  href="/book-now/"
                  className="w-full py-4 px-6 bg-brand-green hover:bg-emerald-900 text-white text-center text-lg font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-3"
                  style={{ backgroundColor: '#1F3D36', color: '#ffffff' }}
                >
                  <i className="fa-solid fa-calendar-check text-brand-orange"></i>
                  <span>Or Book Online in 60 Seconds</span>
                </Link>
              </div>
            </div>

            {/* Trust Guarantee Box */}
            <div className="bg-brand-sand rounded-3xl p-8 border border-gray-100 space-y-4">
              <h4 className="text-lg font-bold text-brand-green flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-brand-orange"></i>
                Golden Grove Guarantee
              </h4>
              <p className="text-sm text-gray-600">
                Fully bonded, insured, and background-checked cleaning pros serving communities across Texas with our 100% 24-hour satisfaction warranty. If anything is missed, we re-clean free of charge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
