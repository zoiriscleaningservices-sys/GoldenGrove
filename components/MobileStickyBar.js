import Link from 'next/link';

export default function MobileStickyBar() {
  return (
    <div className="mobile-sticky-bar">
      <div className="w-full grid grid-cols-2 gap-3">
        <a
          href="tel:+14322181700"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-brand-orange text-brand-orange font-bold text-sm shadow-sm active:scale-95 transition-transform"
        >
          <i className="fa-solid fa-phone text-xs"></i>
          <span>Call Now</span>
        </a>

        <Link
          href="/book-now/"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-orange text-white font-bold text-sm shadow-md active:scale-95 transition-transform"
        >
          <i className="fa-solid fa-calendar-check text-xs"></i>
          <span>Free Quote</span>
        </Link>
      </div>
    </div>
  );
}
