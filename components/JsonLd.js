export default function JsonLd({ city = null, service = null }) {
  const cityName = city ? city.name : 'Texas';
  const url = city
    ? (service ? `https://www.goldengrovecleaning.com/${city.slug}/${service.slug}/` : `https://www.goldengrovecleaning.com/${city.slug}/`)
    : 'https://www.goldengrovecleaning.com/';

  const lat = city ? city.lat : 31.9686;
  const lng = city ? city.lng : -99.9018;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CleaningService",
        "@id": `${url}#business`,
        "name": city ? `Golden Grove Cleaning - ${cityName}` : "Golden Grove Cleaning Services",
        "url": url,
        "telephone": "+14322181700",
        "priceRange": "$$",
        "image": "https://www.goldengrovecleaning.com/images/logo.jpeg",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.goldengrovecleaning.com/images/logo.jpeg"
        },
        "description": city
          ? `${cityName} TX's premier professional cleaning service offering house cleaning, deep cleaning, move-in/out turnovers, and commercial janitorial solutions. Vetted local pros, bonded and insured.`
          : "Texas's premier professional cleaning service offering house cleaning, deep cleaning, move-in/out turnovers, and commercial janitorial solutions. Vetted local pros, bonded and insured.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cityName,
          "addressRegion": "TX",
          "postalCode": city?.zip || "79701",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": lat,
          "longitude": lng
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "07:00",
          "closes": "19:00"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "143"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
