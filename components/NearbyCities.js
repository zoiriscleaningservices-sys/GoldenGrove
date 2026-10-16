import Link from 'next/link';

export default function NearbyCities({ city = null, nearbyList = [] }) {
  const cityName = city ? city.name : 'Texas';
  
  // If city has nearby list, use it; otherwise show prominent Texas metros
  const defaultMetros = [
    { name: 'Dallas', slug: 'dallas-tx' },
    { name: 'Fort Worth', slug: 'fort-worth-tx' },
    { name: 'Houston', slug: 'houston-tx' },
    { name: 'Austin', slug: 'austin-tx' },
    { name: 'San Antonio', slug: 'san-antonio-tx' },
    { name: 'Midland', slug: 'midland-tx' },
    { name: 'Odessa', slug: 'odessa-tx' },
    { name: 'Arlington', slug: 'arlington-tx' },
    { name: 'Plano', slug: 'plano-tx' },
    { name: 'Frisco', slug: 'frisco-tx' },
    { name: 'Lubbock', slug: 'lubbock-tx' },
    { name: 'El Paso', slug: 'el-paso-tx' },
    { name: 'Corpus Christi', slug: 'corpus-christi-tx' },
    { name: 'Waco', slug: 'waco-tx' },
    { name: 'Tyler', slug: 'tyler-tx' }
  ];

  const displayList = (nearbyList && nearbyList.length > 0) ? nearbyList : (city?.nearby || defaultMetros);

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Regional Texas Coverage
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark mt-3">
            {city ? `Communities & Areas Near ${cityName}, TX` : 'Top Texas Service Areas'}
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Golden Grove Cleaning proudly serves residential and commercial clients across Texas.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
          {displayList.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}/`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-orange-50 hover:text-brand-orange border border-gray-200/70 text-gray-700 text-sm font-medium transition-all hover:border-orange-200 hover:shadow-sm"
            >
              <i className="fa-solid fa-location-dot text-brand-orange text-xs"></i>
              <span>{item.name}, TX</span>
              {item.dist && (
                <span className="text-xs text-gray-400 font-normal">({item.dist} mi)</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
