$f = 'dallas-tx\index.html'
$c = Get-Content $f -Raw -Encoding UTF8

# Inject DFW cities + FAQ + Reviews sections before </main>
$dfwBlock = @'

        <!-- DFW SURROUNDING CITIES SECTION -->
        <section class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-5">
                <div class="text-center mb-12">
                    <h2 class="text-3xl lg:text-5xl font-bold text-brand-green mb-4">Serving All of Dallas-Fort Worth</h2>
                    <p class="text-lg text-gray-600 max-w-3xl mx-auto">Golden Grove Cleaning proudly serves Dallas and every surrounding city in the DFW Metroplex. Click your city below for local pricing and availability.</p>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    <a href="/irving-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Irving, TX</span></a>
                    <a href="/fort-worth-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Fort Worth, TX</span></a>
                    <a href="/plano-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Plano, TX</span></a>
                    <a href="/garland-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Garland, TX</span></a>
                    <a href="/arlington-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Arlington, TX</span></a>
                    <a href="/denton-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Denton, TX</span></a>
                    <a href="/carrollton-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Carrollton, TX</span></a>
                    <a href="/mesquite-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Mesquite, TX</span></a>
                    <a href="/richardson-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Richardson, TX</span></a>
                    <a href="/grand-prairie-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Grand Prairie, TX</span></a>
                    <a href="/lewisville-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Lewisville, TX</span></a>
                    <a href="/frisco-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Frisco, TX</span></a>
                    <a href="/mckinney-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">McKinney, TX</span></a>
                    <a href="/flower-mound-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Flower Mound, TX</span></a>
                    <a href="/mansfield-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Mansfield, TX</span></a>
                    <a href="/desoto-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">DeSoto, TX</span></a>
                    <a href="/cedar-hill-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Cedar Hill, TX</span></a>
                    <a href="/duncanville-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Duncanville, TX</span></a>
                    <a href="/rowlett-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Rowlett, TX</span></a>
                    <a href="/lancaster-tx/" class="flex items-center gap-3 p-4 bg-brand-sand rounded-xl border border-gray-100 hover:border-brand-orange/40 hover:shadow-md transition-all group"><i class="fa-solid fa-location-dot text-brand-orange"></i><span class="font-semibold text-brand-green group-hover:text-brand-orange transition-colors">Lancaster, TX</span></a>
                </div>
            </div>
        </section>

        <!-- 5-STAR REVIEWS SECTION -->
        <section class="py-20 bg-brand-sand">
            <div class="max-w-7xl mx-auto px-5">
                <div class="text-center mb-12">
                    <h2 class="text-3xl lg:text-5xl font-bold text-brand-green mb-4">What Dallas Customers Say</h2>
                    <p class="text-lg text-gray-600">Rated 4.9 stars by 127+ happy customers across Dallas-Fort Worth</p>
                    <div class="flex justify-center gap-1 mt-3">
                        <i class="fa-solid fa-star text-yellow-400 text-2xl"></i><i class="fa-solid fa-star text-yellow-400 text-2xl"></i><i class="fa-solid fa-star text-yellow-400 text-2xl"></i><i class="fa-solid fa-star text-yellow-400 text-2xl"></i><i class="fa-solid fa-star text-yellow-400 text-2xl"></i>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                        <div class="flex gap-1 mb-3"><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i></div>
                        <p class="text-gray-700 mb-4">"Golden Grove Cleaning transformed our Dallas home! Their attention to detail is unmatched. The team was professional, punctual, and thorough. Best cleaning service in Dallas, TX!"</p>
                        <div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center font-bold text-brand-orange">S</div><div><p class="font-bold text-brand-green">Sarah M.</p><p class="text-sm text-gray-500">Dallas, TX &bull; March 2026</p></div></div>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                        <div class="flex gap-1 mb-3"><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i></div>
                        <p class="text-gray-700 mb-4">"We hired Golden Grove for our Dallas office deep cleaning and were blown away. The team arrived on time and did a spotless job. Our employees noticed the difference immediately!"</p>
                        <div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center font-bold text-brand-orange">J</div><div><p class="font-bold text-brand-green">James R.</p><p class="text-sm text-gray-500">Downtown Dallas &bull; Feb 2026</p></div></div>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                        <div class="flex gap-1 mb-3"><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i></div>
                        <p class="text-gray-700 mb-4">"I've tried several cleaning services in Dallas and Golden Grove is by far the best. They did an amazing move-out clean on my North Dallas apartment. Got my full deposit back!"</p>
                        <div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center font-bold text-brand-orange">M</div><div><p class="font-bold text-brand-green">Maria L.</p><p class="text-sm text-gray-500">North Dallas &bull; Jan 2026</p></div></div>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                        <div class="flex gap-1 mb-3"><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i></div>
                        <p class="text-gray-700 mb-4">"Outstanding post-construction cleaning in our new Downtown Dallas build. Golden Grove handled the entire cleanup professionally. Floors, windows, fixtures — everything was immaculate."</p>
                        <div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center font-bold text-brand-orange">D</div><div><p class="font-bold text-brand-green">David K.</p><p class="text-sm text-gray-500">Downtown Dallas &bull; Dec 2025</p></div></div>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                        <div class="flex gap-1 mb-3"><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i><i class="fa-solid fa-star text-yellow-400"></i></div>
                        <p class="text-gray-700 mb-4">"Incredible Airbnb turnover cleaning in the Uptown Dallas area. Golden Grove is fast, thorough, and incredibly reliable. My guests consistently leave 5-star reviews since I hired them!"</p>
                        <div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center font-bold text-brand-orange">P</div><div><p class="font-bold text-brand-green">Priya S.</p><p class="text-sm text-gray-500">Uptown Dallas &bull; Nov 2025</p></div></div>
                    </div>
                    <div class="bg-brand-orange p-6 rounded-2xl shadow-md flex flex-col items-center justify-center text-center text-white">
                        <div class="text-5xl font-extrabold mb-2">4.9</div>
                        <div class="flex gap-1 mb-2"><i class="fa-solid fa-star text-white"></i><i class="fa-solid fa-star text-white"></i><i class="fa-solid fa-star text-white"></i><i class="fa-solid fa-star text-white"></i><i class="fa-solid fa-star text-white"></i></div>
                        <p class="font-semibold mb-1">127+ Reviews</p>
                        <p class="text-white/80 text-sm mb-4">Across Google, Yelp &amp; Facebook</p>
                        <a href="#quote" class="bg-white text-brand-orange font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all">Get Your Free Quote</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ SECTION -->
        <section class="py-20 bg-white">
            <div class="max-w-4xl mx-auto px-5">
                <div class="text-center mb-12">
                    <h2 class="text-3xl lg:text-5xl font-bold text-brand-green mb-4">Frequently Asked Questions</h2>
                    <p class="text-lg text-gray-600">Everything you need to know about cleaning services in Dallas, TX</p>
                </div>
                <div class="space-y-4" id="faqAccordion">
                    <div class="border border-gray-200 rounded-2xl overflow-hidden">
                        <button onclick="toggleFaq(this)" class="w-full text-left p-6 font-bold text-brand-green flex justify-between items-center hover:bg-orange-50 transition-colors"><span>What cleaning services does Golden Grove offer in Dallas, TX?</span><i class="fa-solid fa-chevron-down transition-transform"></i></button>
                        <div class="faq-answer hidden px-6 pb-6 text-gray-600">Golden Grove Cleaning offers house cleaning, deep cleaning, move-in/move-out cleaning, post-construction cleaning, commercial janitorial, office cleaning, carpet cleaning, window cleaning, Airbnb turnover, luxury estate cleaning, and more throughout Dallas, TX and the entire DFW Metroplex.</div>
                    </div>
                    <div class="border border-gray-200 rounded-2xl overflow-hidden">
                        <button onclick="toggleFaq(this)" class="w-full text-left p-6 font-bold text-brand-green flex justify-between items-center hover:bg-orange-50 transition-colors"><span>How much does house cleaning cost in Dallas, TX?</span><i class="fa-solid fa-chevron-down transition-transform"></i></button>
                        <div class="faq-answer hidden px-6 pb-6 text-gray-600">House cleaning in Dallas, TX typically starts at $120–$180 for a standard clean. Deep cleaning and move-out cleaning start at $200+. Golden Grove Cleaning offers free, no-obligation quotes — call (432) 218-1700 or fill out our online form.</div>
                    </div>
                    <div class="border border-gray-200 rounded-2xl overflow-hidden">
                        <button onclick="toggleFaq(this)" class="w-full text-left p-6 font-bold text-brand-green flex justify-between items-center hover:bg-orange-50 transition-colors"><span>Does Golden Grove Cleaning serve Irving, TX and surrounding DFW cities?</span><i class="fa-solid fa-chevron-down transition-transform"></i></button>
                        <div class="faq-answer hidden px-6 pb-6 text-gray-600">Yes! Golden Grove Cleaning proudly serves Irving, TX and all surrounding DFW cities including Fort Worth, Plano, Garland, Arlington, Carrollton, Mesquite, Richardson, Grand Prairie, Lewisville, Frisco, McKinney, and more.</div>
                    </div>
                    <div class="border border-gray-200 rounded-2xl overflow-hidden">
                        <button onclick="toggleFaq(this)" class="w-full text-left p-6 font-bold text-brand-green flex justify-between items-center hover:bg-orange-50 transition-colors"><span>Are your Dallas cleaning services available on weekends?</span><i class="fa-solid fa-chevron-down transition-transform"></i></button>
                        <div class="faq-answer hidden px-6 pb-6 text-gray-600">Yes, Golden Grove Cleaning is available Monday through Saturday, 7:00 AM to 7:00 PM, with 24/7 emergency cleaning services available for urgent needs in Dallas, TX.</div>
                    </div>
                    <div class="border border-gray-200 rounded-2xl overflow-hidden">
                        <button onclick="toggleFaq(this)" class="w-full text-left p-6 font-bold text-brand-green flex justify-between items-center hover:bg-orange-50 transition-colors"><span>What is the best cleaning company in Dallas TX?</span><i class="fa-solid fa-chevron-down transition-transform"></i></button>
                        <div class="faq-answer hidden px-6 pb-6 text-gray-600">Golden Grove Cleaning is rated the #1 cleaning company in Dallas, TX with a 4.9-star rating across 127+ reviews. We specialize in residential and commercial cleaning throughout the Dallas-Fort Worth Metroplex.</div>
                    </div>
                    <div class="border border-gray-200 rounded-2xl overflow-hidden">
                        <button onclick="toggleFaq(this)" class="w-full text-left p-6 font-bold text-brand-green flex justify-between items-center hover:bg-orange-50 transition-colors"><span>How do I get a free cleaning quote in Dallas?</span><i class="fa-solid fa-chevron-down transition-transform"></i></button>
                        <div class="faq-answer hidden px-6 pb-6 text-gray-600">Getting a free cleaning quote in Dallas is easy! Call us at (432) 218-1700, fill out the quote form on our website, or message us via WhatsApp. We typically respond within 30 minutes.</div>
                    </div>
                </div>
            </div>
        </section>
        <script>function toggleFaq(btn){const ans=btn.nextElementSibling;const icon=btn.querySelector('i');ans.classList.toggle('hidden');icon.classList.toggle('rotate-180');}</script>

    </main>
'@

$c = $c.Replace("    </main>", $dfwBlock)

# Add DFW footer links to Service Areas column
$oldFooterAreas = @'
                <ul class="space-y-3">
                        <li><a href="/dallas-tx/downtown-dallas/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                                Downtown Dallas</a></li>
                        <li><a href="/dallas-tx/dallas-heights/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                                Dallas Heights</a></li>
                        <li><a href="/dallas-tx/south-dallas/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                                South Dallas</a></li>
                        <li><a href="/dallas-tx/north-dallas/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                                North Dallas</a></li>
                        <li><a href="/dallas-tx/west-dallas-estates/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>
                                West Dallas Estates</a></li>

                    </ul>
'@

$newFooterAreas = @'
                <ul class="space-y-3">
                        <li><a href="/dallas-tx/downtown-dallas/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>Downtown Dallas</a></li>
                        <li><a href="/irving-tx/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>Irving, TX</a></li>
                        <li><a href="/fort-worth-tx/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>Fort Worth, TX</a></li>
                        <li><a href="/plano-tx/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>Plano, TX</a></li>
                        <li><a href="/garland-tx/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>Garland, TX</a></li>
                        <li><a href="/arlington-tx/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>Arlington, TX</a></li>
                        <li><a href="/carrollton-tx/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>Carrollton, TX</a></li>
                        <li><a href="/mckinney-tx/" class="text-gray-400 hover:text-brand-orange transition-colors duration-200 flex items-center gap-2 group"><span class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-brand-orange transition-colors"></span>McKinney, TX</a></li>
                    </ul>
'@

$c = $c.Replace($oldFooterAreas, $newFooterAreas)

Set-Content $f $c -Encoding UTF8 -NoNewline
Write-Host "Dallas DFW cities grid + Reviews + FAQ sections injected successfully"
