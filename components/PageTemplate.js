import Header from './Header';
import Hero from './Hero';
import ServicesGrid from './ServicesGrid';
import ReviewsSection from './ReviewsSection';
import ArticleSection from './ArticleSection';
import FaqSection from './FaqSection';
import QuoteForm from './QuoteForm';
import NearbyCities from './NearbyCities';
import BookCta from './BookCta';
import Footer from './Footer';
import MobileStickyBar from './MobileStickyBar';
import JsonLd from './JsonLd';

export default function PageTemplate({ city = null, service = null, customTitle = null, customSubtitle = null }) {
  const citySlug = city ? city.slug : '';
  const cityName = city ? city.name : 'Texas';
  const serviceName = service ? service.name : '';

  return (
    <>
      <JsonLd city={city} service={service} />
      <Header citySlug={citySlug} cityName={city ? cityName : ''} />
      <main className="flex-grow">
        <Hero
          city={city}
          service={service}
          customTitle={customTitle}
          customSubtitle={customSubtitle}
        />
        <ServicesGrid citySlug={citySlug} cityName={city ? cityName : ''} />
        <ReviewsSection cityName={cityName} />
        <ArticleSection cityName={cityName} serviceName={serviceName} />
        <FaqSection cityName={cityName} />
        <QuoteForm cityName={cityName} />
        <NearbyCities city={city} />
        <BookCta cityName={cityName} />
      </main>
      <Footer citySlug={citySlug} cityName={city ? cityName : ''} />
      <MobileStickyBar />
    </>
  );
}
