import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-background text-on-background selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[870px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Crafted for Moments of Grace"
              className="w-full h-full object-cover object-center"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNeunQKTX9CESWTPjnX9gay1dLuX9MGuXSjdS69avkO79PQR3_0n6koikgH5_GbXHJNWw6Vjqlhr7OUcOTPO4FK_bDy0LttDOShgAGRLLjOOMs0bK-1cyUoEvbtN08q_gFDOBiizmB0_GOIT2oSvEMCnkTrIiJMVXrRIZ8xCM-z2ms9izBa0zXe8qRlKFo9Oy-XydEwe6KZsOH3OAo3fNnk5GmZAM1PZkftjUcWfCQQmr4_nwTtxDoF2Qo0RTZZtmiABSrWR3P4Wn3"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
            <div className="max-w-2xl">
              <span className="font-label-md text-label-md text-secondary uppercase tracking-[0.2em] mb-6 block">The Summer Collection</span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-8">Crafted for Moments of Grace</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-lg leading-relaxed">
                Discover the art of botanical poetry. Our artisanal arrangements are hand-selected to celebrate life's most delicate and meaningful chapters.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <a className="inline-block bg-secondary text-on-secondary px-10 py-5 rounded-full font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all active:scale-95" href="/shop">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-32 bg-surface">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
              <div className="max-w-xl">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Curated Collections</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Each bloom is chosen for its unique voice, composed into a symphony of color and texture that speaks directly to the heart.</p>
              </div>

              <a className="font-label-md text-label-md text-secondary uppercase tracking-widest flex items-center gap-2 group" href="#">
                Explore All
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-xl mb-8 shadow-[0_4px_20px_rgba(255,102,178,0.08)]">
                  <img
                    alt="Romantic Roses"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKv2hcrvWQmyVaLOi0qhMhmqmy4__GicM5LdNS32PpgjXgna0wbTOSgNnkqqzfRA7-QdRajqCpbBHYrcdydcnIw7iHUxEPdjnBHhYHYu6vPnmS0dgwJDYwqh9jCWZu-fEn7A8OfUTjROkLTxyWidJ_ZdY2jxpNAI5_LVP5Wq-fsClIRXTmlYR0U1ogDHUcegB1aa4RxFp_qhY3jtNPmaRQ9mNPeBOAcbjNhV_61jKAugthGNwVeJbb_GtEKu2284dJnEj_FKCyLL26"
                  />
                </div>
                <span className="font-label-sm text-label-sm text-secondary bg-secondary-fixed/30 px-3 py-1 rounded-full mb-4 inline-block">Bestseller</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Romantic Roses</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">Timeless expressions of deep affection and enduring love.</p>
                <a className="font-label-md text-label-md text-primary uppercase tracking-widest group-hover:text-secondary transition-colors" href="#">
                  Discover the collection
                </a>
              </div>

              <div className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-xl mb-8 shadow-[0_4px_20px_rgba(255,102,178,0.08)]">
                  <img
                    alt="Spring Pastels"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1yaaMsXBb5qOywyzpqZSy9hY78a77TXzWI-ZI4GonKjYVkqCWpzQSRaihbm0D3-lMaNoOpRD3O8vS_XrYoTL8rorVn0Y4ME7Aa_8kfFwSaVkrnDyb8jS_p_92Gq4Yylvk9pBkFMTcBKSEWSN1qZ56AWu3twRwrAPC1lMey1Z91BR2eQHn-rKw2zgHlSFc7vBr64XRdkWEndfZxiSR470xowUdZP1w7Z-h9yS2Q_UyoK_leDJj58jY_bgX89JZJQXTMVIa1zZzmOKL"
                  />
                </div>
                <span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed/30 px-3 py-1 rounded-full mb-4 inline-block">New Arrival</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Spring Pastels</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">A gentle whisper of color to brighten the quietest corners of your home.</p>
                <a className="font-label-md text-label-md text-primary uppercase tracking-widest group-hover:text-secondary transition-colors" href="#">
                  Discover the collection
                </a>
              </div>

              <div className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-xl mb-8 shadow-[0_4px_20px_rgba(255,102,178,0.08)]">
                  <img
                    alt="Elegant Lilies"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7vHomIyLt7G1gMsJB1RY5b_wiPOJYjCo-TCwBp5H7wIipyRULDjsOLApJouB-jiV3sWv2kqGcjMGO5mcAyrw_SWSHF4l4wMFRZ0nOdWVAufWWiAQ_gfKkh1N2ShtNLfaTgYo-WRZ7hjmj5TTOu9ZsPbW6C7h7hhZmm_N9Oz14geXvrUbZgDa5LTbfrz25vBAh_LG37I9Pl4hphSzgO74Hc-LbzgGSmfgNlEzyl7S66jDSRTwr3fSpKVsGpPGHZoOuKr_WrtiU5aQm"
                  />
                </div>
                <span className="font-label-sm text-label-sm text-primary bg-primary-fixed/30 px-3 py-1 rounded-full mb-4 inline-block">Limited Edition</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Elegant Lilies</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">Sculptural blooms that command attention with their graceful presence.</p>
                <a className="font-label-md text-label-md text-primary uppercase tracking-widest group-hover:text-secondary transition-colors" href="#">
                  Discover the collection
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-32 bg-surface-container-low overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden relative z-10">
                  <img
                    alt="Our Studio"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDykyQvNsoxlPgiSDvcmUdNCqveYZSRlZvo9kmk5Ck7uF4rYDef6Y4eS6VLxpU5nlUsmw5fo8j1IBayqoYwpC43g-0G06bD-cVpf35_f99CN7WPVDTMEZzH1dKKzfhDZQAnzu-fl-zhGEtP8xajovbyuDc2Lgr3G7ZbFpfDRf-q2fPG0I2ZRwcRp6QvqdSG54VRT0Yvvtq5H-RFz5xSfiXCcOmwj766Sz86Y3u0_wE96x2vwwwiJIOCIc3DfqNVn52PbKXYmEfh7FdK"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl -z-0" />
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-secondary-container/20 rounded-full blur-3xl -z-0" />
              </div>

              <div className="space-y-8">
                <span className="font-label-md text-label-md text-secondary uppercase tracking-[0.2em]">Our Heritage</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight italic">&quot;Where flowers are the words, and nature is the poem.&quot;</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Petals &amp; Poetry began in a small garden studio with a single belief: that every floral arrangement is a verse in a larger story. We source only the finest, most expressive blooms from sustainable growers who share our
                  passion for botanical excellence.
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Our florists are poets of the physical world, carefully composing colors, scents, and textures to help you articulate what words sometimes cannot. From the first bud to the final ribbon, grace is our guiding principle.
                </p>
                <div className="pt-6">
                  <a className="inline-block border border-secondary text-secondary px-10 py-5 rounded-full font-label-md text-label-md uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-all" href="/about">
                    Read Our Full Story
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="py-32 bg-surface">
          <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <div className="bg-surface-container rounded-3xl p-8 md:p-16 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Join the Poetry Circle</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-10 max-w-lg mx-auto">Subscribe for seasonal botanical insights, exclusive collections, and a little grace delivered to your inbox.</p>
                <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                  <input className="flex-1 bg-surface border-0 border-b border-outline-variant focus:ring-0 focus:border-secondary text-on-surface placeholder:text-outline p-4 font-body-md" placeholder="Your email address" type="email" />
                  <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all" type="submit">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
