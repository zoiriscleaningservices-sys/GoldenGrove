'use client';

import { useState } from 'react';

export default function FaqSection({ cityName = 'Texas' }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Do you bring your own cleaning supplies and equipment?",
      a: "Yes! Our teams arrive fully equipped with professional-grade, eco-friendly supplies, microfiber cloths, and HEPA-filter vacuums. You don't need to provide a single thing."
    },
    {
      q: "Are your cleaners background-checked, bonded, and insured?",
      a: "Absolutely. Every Golden Grove team member passes a thorough background check before entering any property. We are fully bonded and insured across Texas for your complete peace of mind."
    },
    {
      q: `What areas in ${cityName} and Texas do you serve?`,
      a: "We serve major Texas metropolitan areas including Dallas-Fort Worth, Houston, Austin, San Antonio, Midland, Odessa, and surrounding communities. Use our search bar to find your local market page."
    },
    {
      q: "What is the difference between standard and deep cleaning?",
      a: "Standard cleaning covers routine maintenance: dusting, vacuuming, mopping, and surface cleaning. Deep cleaning goes further — scrubbing grout, inside appliances, washing baseboards, and tackling built-up grime. We recommend a deep clean for first-time clients."
    },
    {
      q: "Do you offer commercial and office janitorial services?",
      a: "Yes! We provide professional commercial janitorial services for offices, medical facilities, gyms, warehouses, daycares, and churches. Custom contracts and after-hours cleaning available."
    },
    {
      q: "How do I get a free quote?",
      a: "Getting a free quote is easy — call us at (432) 218-1700, message us on Text Message, or fill out the quick form on this page. We respond within minutes during business hours!"
    }
  ];

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900 mb-4">
            Frequently Asked Questions About Golden Grove Cleaning
          </h2>
          <p className="text-gray-600 text-lg">
            Common questions about our professional residential and commercial cleaning services in {cityName}.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full text-left px-7 py-5 flex justify-between items-center hover:bg-orange-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 text-base sm:text-lg pr-4">
                    {faq.q}
                  </span>
                  <i
                    className={`fa-solid fa-chevron-down text-brand-orange transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>

                {isOpen && (
                  <div className="px-7 pb-6 text-gray-600 text-sm sm:text-base leading-relaxed animate-fade-in-up">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
