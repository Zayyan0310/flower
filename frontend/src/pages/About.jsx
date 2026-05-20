import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="antialiased bg-background text-on-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative h-[450px] md:h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="A cinematic, soft-focus overhead shot of a sun-drenched flower studio filled with overflowing buckets of peonies and wild roses."
              className="w-full h-full object-cover antialiased"
              src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 text-center max-w-2xl px-margin-mobile">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">A Journey of Blooms</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Petals &amp; Poetry began as a quiet conversation between the heart and the garden. We believe every flower carries a verse, and every bouquet tells a story of grace, memory, and botanical beauty.
            </p>
          </div>
        </section>

        {/* Our Heritage */}
        <section className="py-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4 block">1998 — The Beginning</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Our Heritage</h2>
              <div className="space-y-6 font-body-md text-body-md text-on-surface-variant">
                <p>
                  It started in a weathered cedar greenhouse on the edge of a coastal town. Our founder, Elara Vance, spent her mornings harvesting heirloom roses still heavy with dew. What began as a small garden studio, crafting simple
                  bundles for neighbors, blossomed into a sanctuary for floral artistry.
                </p>
                <p>
                  Today, that same spirit of quiet dedication lives in every stem we select. We honor the legacy of slow-grown, high-quality botanicals, preserving the artisanal techniques that make each arrangement a singular masterpiece.
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative p-6">
                <div className="absolute inset-0 bg-secondary/5 rounded-xl -rotate-3" />
                <img
                  alt="A vintage-inspired close-up of an antique garden table with botanical sketches, dried petals, and brass floristry shears."
                  className="relative z-10 w-full h-[500px] object-cover rounded-lg shadow-[0_4px_20px_rgba(255,102,178,0.08)]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQCB_NqfLNRBm_kQ0Ajj5DFIXp-KZvAmDcoPAjLgg4xOCBMVsDQfnh5vk1bFkG4I3kGy3zYOxXx581OUtuLXppABpx0YXEmgV6LezhADFTaW3EKJsy3qIlkGq12V7mljaEFqw1aWySc5zdkR-dvSrG-vYpf6IPf0s75FCKj4z7kvZDZdPUk_oEuRNRwZ6qC04eS5bJpcdXRxotdGBaTPJPlfH572Epv1cbH1tYXwpKR3DxI27m1qjaHoqe3NqYR1_XbhNX2bGKHVe4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-primary">Our Philosophy</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-4">Rooted in intention, grown with soul.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              <div className="md:col-span-8 bg-surface p-8 md:p-12 rounded-xl shadow-[0_4px_20px_rgba(255,102,178,0.08)] flex flex-col justify-center">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">eco</span>
                <h3 className="font-headline-md text-headline-md text-primary mb-4">Conscious Cultivation</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                  We partner exclusively with local growers who practice regenerative farming. Our goal is to leave the earth more vibrant than we found it, using compostable packaging and avoiding synthetic preservatives in our workshop.
                </p>
              </div>

              <div className="md:col-span-4 h-[350px] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(255,102,178,0.08)]">
                <img
                  alt="A detailed macro photograph of a single pastel lily opening its petals."
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8emPXkKCA6j5nSg5JkkXqlfW3mkGh5JmNDhY2QURznSm4iDfB0e4yaxf2Ytap8rQd_vXoahxRHhb1Q0wXF-zwFcJQyCuH6DAZmOTxPC5IQjzH3mQwU07EBesXswpkW11j1ZYfUYsIjpo2PVahKJcdvRp5t4SrN5ZHvuuLwZlP6aZozXtMqc2PRTTeCv0TvGFawMKEmDKL4WjydoQbLfMIygMXTjJ-PDMsj_nL4WHd9mUr5F_QSNX9vGD6OvYDKhiUYv6CCrfHKLYl"
                />
              </div>

              <div className="md:col-span-4 h-[350px] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(255,102,178,0.08)]">
                <img
                  alt="A still life arrangement of exotic white flowers in a minimalist ceramic vase."
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEVg7bJyaMAl-_CuhNW6H-XwQm23Mq2TCENWk94WOm4RX6bpRM9smpFZ0cio9xdll04eueiZ2-n9R3qsIyw9TczFtGcMG-spFGfmDfUaW00kp-FnaNOJC2IHuB3z0jq__4h3aYq7mEDwZg9szjmUN7wavUvbD2iyaW_3AXPdCq0_BhsI9necD6zQQ5B3jV4cn5f8PN0yqXj-Fo3KpwakAUoNQFLZakYeSzbXbrySFNTLCf_icvLKR6-sgwJM4R8D0gW1JkLwTBFLgb"
                />
              </div>

              <div className="md:col-span-8 bg-surface p-8 md:p-12 rounded-xl shadow-[0_4px_20px_rgba(255,102,178,0.08)] flex flex-col justify-center">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">brush</span>
                <h3 className="font-headline-md text-headline-md text-primary mb-4">The Art of Arrangement</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                  Every bouquet is a curated poem. We play with negative space, texture, and movement to create designs that aren't just seen, but felt. Our designers approach each stem as a brushstroke on a living canvas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inside Our Studio */}
        <section className="py-24 bg-surface">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Inside Our Studio</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Our studio is a sanctuary of light and petals, where the scent of eucalyptus and heirloom roses fills the air. It is here that botanical dreams take shape, amidst the quiet snip of shears and the careful placement of every
                stem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[800px]">
              <div className="md:col-span-2 md:row-span-2 overflow-hidden rounded-xl shadow-sm min-h-[300px]">
                <img
                  alt="A large, finished bouquet of peonies and ranunculus resting on a wooden workbench in golden hour studio light."
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3LmHkeoBPBtRXy9FhzN9na_4jWohtVMddjni8qneXjEGMX43ewkCqnYGvwzM3KQ8fVtCL-NayEIkcjYNrfL0CbFFGsPIB0Y5M5wNCJOABUT9ZqQXShy_oniciuEvTU82M6HGdgceiLgalcKkjmnuNv2q_dRuOvTvSf_gciBlOJm88nkfEV2cHxTr7p5CH2L-1I1bLRsbCV2OiKGRG62ppMP_K9fY6FWHXWBXQJtEUJ5R-AA3cvcnjnCHqa_Oq0QxPOjD9_5QlCXCx"
                />
              </div>

              <div className="md:col-span-1 md:row-span-1 overflow-hidden rounded-xl shadow-sm min-h-[250px]">
                <img
                  alt="Close-up of fresh, dew-covered pink roses waiting to be arranged."
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_VDp4jhaR80Gq6Jtn_HrcjngLof-jCj94uFNWsAmX5jefYySOmkQjW7ZBy6PRD4lrSUzn24GhKPXzARsCA92M8WifLeLVqJ1CxEp5TfpzaVi8DzqSQqJ2pAVIZM8job29x1UIO-IYiMxS-fq-8fTFE9RqG0olwrnCQLI6PxhFupQ7HVCkOHGebBNmbYblEzGXPgN1GpzTLGlm2076yXvmo4AxvTec5LC5djt9pV2XKPcMmoRz9-w-fR9WePuqT6r1AmTU6vkvbW9q"
                />
              </div>

              <div className="md:col-span-1 md:row-span-2 overflow-hidden rounded-xl shadow-sm min-h-[300px]">
                <img
                  alt="The team at work, carefully selecting stems from a large floral display."
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrTIcl9eCsOFknxO_Ny4w1Quu6-5Bog8dcC1j8i_8JiruKUecMxkKifPpQKK_YCZ-KlgRHQGaT86wmGcUhYB8wRUFXnUj-dZBhMwKDEMOBKNq__FX6NfHkuSUhEaZ6c2WH_dcwSzIcq7BS4r4mxNNUOg_gBPp_M2opEdcrJ0Dec0qadmGFnPk4CsV3aoZgQLJD5E4Jn1hCH7S6WGDxapvHGN7Vltt3sVbEt7sL-is7-cyauxu21xA1JUA3yU7D4-3TsSTsDYTdPo-W"
                />
              </div>

              <div className="md:col-span-1 md:row-span-1 overflow-hidden rounded-xl shadow-sm min-h-[250px]">
                <img
                  alt="A clean, organized workspace featuring brass shears, twine, and botanical sketches."
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp_3xjrh7GPMAGq-W-FfuC8GAm--wmDYkw9NnjbbfdqcOl3q0glGUHkOxd0KjqKT1b37VeQjoMSYyvqVupBNAJ78WuOHSWcMxS9T6HuENAnuJkNRGtU1UMzYwX8yrB8Qn1y3Y0QRfxdKxnF540baWKsseRN-59MGaCx8OwIQa91JL_LH-oXS9zkPxJJxQ6EFG_Fxm5py8UuNcQcMBvOnY3z-4RZVXkag5274gNV7jiBve5uOWeTy4vUnavhYuf1zuC8-wdE0yVVcNj"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Artisans */}
        <section className="py-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Meet the Artisans</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-16 max-w-2xl mx-auto">
            The hands that weave your stories into botanical reality. Our team of master florists brings over four decades of combined passion to the studio.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-secondary/20 p-2">
                <img
                  alt="A soft professional portrait of Elara Vance in a floral studio."
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX2xB6FZXOiVOcUZ1jQSemeyNEwbZVwtGTlfnK8C7s4c4yTfOGqQJBaaaD2ClDWU2fj8jHocvbzjfmvcPSoPbhuBM6SQKPmqUoZ2iej04tn1Tycm8Plnq1F4WStxVpWrquLkp3kJtjUGA_sr0ESGxMt1OtpHXnu0eTyP0k7LGTc_CCR-BHn25pLTMb9NHvQxVLDaaOa7dMuyIIMaSrBidWEwfJD20sFc7DxP9FOlEDtjRRdsr3CkA3i26pmIhvldf7XYEWsAQzLQjf"
                />
              </div>
              <h4 className="font-headline-md text-headline-md text-primary">Elara Vance</h4>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-4 block">Founder &amp; Creative Lead</span>
              <p className="font-body-md text-body-md text-on-surface-variant px-4 italic">&quot;Nature is the greatest poet I&apos;ve ever known. I just translate her work.&quot;</p>
            </div>

            <div className="group">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-secondary/20 p-2">
                <img
                  alt="A minimalist portrait of Julian Thorne holding a sprig of lavender."
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6cTb7uqBkYBE5fm1vy4UyxMspOqLWlPOOkts6Nphc8RJt8AbmoN9OruYQyoJF7KyY3L5GfMNrBs8OfENKrNTBClKHMIYCyM_DEf1CK4ZGvdYCm0qxnFXR5O1gGLr0H1q9grdh0Ye1MjXB0_g198nbH5as4ESkp3yVXQ_5u7k3RqrWnZgKWhuLotWJ3RwwvbhLf_m3gouTqlEsp_UNJrGEtEjKPD9Tvkf31FKs1rsBIlaPI2LNATbPhNZaundH2U7ukoqybbO-ZOkf"
                />
              </div>
              <h4 className="font-headline-md text-headline-md text-primary">Julian Thorne</h4>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-4 block">Senior Florist</span>
              <p className="font-body-md text-body-md text-on-surface-variant px-4 italic">&quot;I look for the movement in a stem, the way it wants to dance in the light.&quot;</p>
            </div>

            <div className="group">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-secondary/20 p-2">
                <img
                  alt="A luminous portrait of Sofia Moretti surrounded by foliage and soft pink roses."
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLZgup_t4yWnex7dF3g5rvdouUpudyexZ4bVt6TOer7jYM2BO8C4FnVpGQfvF13kB2_RXVpf-ndv6xgu0smM3AVcnj0bFzuVhyH5BJI3GNZn0uETu0nsDV2o69p-VEzmXX5XEa03aWT9XXV-DVdpDDN-B24ROY85e-MqsaiCCZTaDWOzvFtMjLKF3jvrdIxhwuWbsEQw2d23Sc8Avr0rTL3qyB1N-P2_8qPO7m8sw5pplb1buTIDLfOTMtaoYpT5TPAXVL7ssYPjzV"
                />
              </div>
              <h4 className="font-headline-md text-headline-md text-primary">Sofia Moretti</h4>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-4 block">Botanical Designer</span>
              <p className="font-body-md text-body-md text-on-surface-variant px-4 italic">&quot;Scent is a bridge to the past. I design to evoke memories that linger.&quot;</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-primary-container/30 text-center">
          <div className="max-w-2xl mx-auto px-margin-mobile">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Bring the Garden Home</h2>
            <p className="font-body-lg text-body-lg text-on-primary-container mb-10">Experience the artistry of Petals &amp; Poetry in your own space. Explore our curated seasonal collections.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a className="bg-secondary text-on-secondary px-10 py-4 rounded-full font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg" href="/shop">
                Shop All Collections
              </a>
              <a className="border border-secondary text-secondary px-10 py-4 rounded-full font-label-md text-label-md uppercase tracking-widest hover:bg-secondary/5 transition-colors" href="#">
                Book a Consultation
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
