export default function ReviewsSection({ cityName = 'Texas' }) {
  const reviews = [
    {
      name: "Sarah M.",
      location: "Dallas, TX",
      text: "Golden Grove transformed our home! Their attention to detail is unmatched. Professional, punctual, and thorough. Highly recommend for anyone looking for vetted local pros!"
    },
    {
      name: "James R.",
      location: "Austin, TX",
      text: "Best cleaning service by a LONG shot. I've tried three others — none compare. The deep clean on our home was incredible."
    },
    {
      name: "Maria L.",
      location: "Houston, TX",
      text: "Used them for a move-out clean and got my FULL deposit back! Super detailed, arrived on time, and very fairly priced. 10/10 would book again."
    },
    {
      name: "David K.",
      location: "Fort Worth, TX",
      text: "Our office has never looked better. The commercial team is reliable, thorough, and always on schedule. We've been with them 8 months straight."
    },
    {
      name: "Linda T.",
      location: "San Antonio, TX",
      text: "I was skeptical at first but they blew me away. My house was spotless — every corner, every blind, every baseboard. Just wow."
    },
    {
      name: "Robert A.",
      location: "Midland, TX",
      text: "Post-construction clean after our remodel was perfect. They got every bit of drywall dust and construction residue out. Our property looked brand new."
    }
  ];

  return (
    <section className="py-20 bg-brand-sand">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-green mb-4">
            What Texas Clients Say
          </h2>
          <div className="flex justify-center items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <i key={i} className="fa-solid fa-star text-brand-gold text-2xl"></i>
            ))}
          </div>
          <p className="text-brand-green font-bold text-lg">
            4.9 out of 5 • 143 verified reviews in {cityName} &amp; across Texas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex mb-3 gap-1">
                  {[...Array(5)].map((_, starIdx) => (
                    <i key={starIdx} className="fa-solid fa-star text-brand-gold text-sm"></i>
                  ))}
                </div>
                <p className="text-gray-700 mb-5 italic text-sm leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              <div className="font-bold text-brand-green pt-4 border-t border-gray-50 flex items-center justify-between">
                <span>{rev.name}</span>
                <span className="text-gray-400 text-xs font-normal">· {rev.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
