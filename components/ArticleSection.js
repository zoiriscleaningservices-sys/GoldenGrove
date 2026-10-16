export default function ArticleSection({ cityName = 'Texas', serviceName = '' }) {
  const targetArea = cityName === 'Texas' ? 'Across Texas' : `in ${cityName}, TX`;
  const mainTitle = serviceName
    ? `Top-Rated ${serviceName} Services ${targetArea}`
    : `Professional House, Deep & Commercial Cleaning ${targetArea}`;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-5">
        <article itemScope itemType="https://schema.org/Article" itemID="https://www.goldengrovecleaning.com/#article">
          <meta itemProp="author" content="Golden Grove Cleaning" />
          <meta itemProp="datePublished" content="2026-01-15" />
          <meta itemProp="dateModified" content="2026-08-15" />

          <h2 className="text-3xl lg:text-5xl font-bold text-brand-green mb-6" itemProp="headline">
            {mainTitle}
          </h2>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-5" itemProp="articleBody">
            <p>
              Maintaining a clean, healthy environment for your home or business {targetArea} requires reliable, trustworthy cleaning professionals who take pride in their craft. Whether you need recurring <strong>house cleaning</strong>, an intensive <strong>deep clean</strong>, a seamless <strong>move-in / move-out clean</strong>, or dependable <strong>commercial janitorial services</strong>, <strong>Golden Grove Cleaning</strong> connects you with vetted local pros.
            </p>

            <h3 className="text-2xl font-bold text-brand-green mt-8">Comprehensive Cleaning Solutions Tailored for You</h3>
            <p>Every home and business has unique requirements. Our cleaning professionals bring top-tier equipment, eco-friendly supplies, and detailed checklists to every assignment:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Residential House Cleaning:</strong> Routine weekly, bi-weekly, or monthly cleaning to keep your living space pristine and healthy.</li>
              <li><strong>Deep Cleaning Services:</strong> Thorough top-to-bottom scrubbing for kitchens, bathrooms, baseboards, appliances, and hard-to-reach areas.</li>
              <li><strong>Move-In &amp; Move-Out Cleaning:</strong> Stress-free transitions ensuring your former property is deposit-ready and your new residence is spotless.</li>
              <li><strong>Commercial &amp; Office Janitorial:</strong> Tailored cleaning schedules for commercial offices, medical suites, fitness facilities, daycares, and warehouses.</li>
              <li><strong>Specialty Services:</strong> Post-construction dust cleanup, carpet extraction, window washing, and short-term rental turnover cleaning.</li>
            </ul>

            <h3 className="text-2xl font-bold text-brand-green mt-8">Why Choose Vetted Local Professionals?</h3>
            <p>
              When you welcome a cleaning team into your home or workplace, trust and safety are paramount. That is why every Golden Grove cleaning team member is rigorously background-checked, fully insured, and bonded. You get the peace of mind of working with established professionals who care about delivering exceptional results every time.
            </p>

            <p>
              Ready to experience effortless, high-quality cleaning? Call us at{' '}
              <a href="tel:+14322181700" className="text-brand-orange font-bold hover:underline">
                (432) 218-1700
              </a>{' '}
              or fill out our online quote form for a fast, no-obligation estimate!
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
