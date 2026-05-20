import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const thumbnails = [
  {
    alt: "Thumbnail 1",
    active: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-pvP3baCQosd0Fvxk-QEQpP0T_4HQXCipnT_h6FEuxRuzKvwfE53KX2m48CTe1_KTd55wv9GLgGStAqUhIHJpjlUDHzH7X7c7zOhz_xW4Tkb8_p-NKHNlRNXoxbhz76S_-D9yfBt3a7IbbP8RNMhorF9VR4_nZ08_wTy3y0aHrFGf0BfLyhj_kLuJwMZAOehYd24BjnaYqVFFuNiXIOk7ZmOoIEaf6i5djVygqH8UhVVJeEusHDO9k4PCMYUuk3ipAR_T6kD_KR3X",
  },
  {
    alt: "Thumbnail 2",
    active: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBx62jghMMI7cIkhRNCRKKO2A7lYrAsPt4q2i1L6wrjp8helv0y0eoPRUmRXZwMcUi_M9D3okpKfM09uayu0FtKrA28BMCpg4KeVlZIaUvUMN7SGSkkTpYisX1k0VC8J5hyIupGJrQczK_2FlZwS4onURHPvEgzQijjZn5bmRNXDlV48RFezbi67TpgZm4QYN9hFvmBkb_XEeHyWINQy8FgPJq_pdBrk8w08tmAdVPf2EGeseYa6F_8yKlngYCPaeZbf2yFz4DgxZI9",
  },
  {
    alt: "Thumbnail 3",
    active: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQPk24bHYAWKP4tV8QhTiIPsPwJZ4pNZNKpiMvNsmbY2TQO-MbsupebDhI7SYsUju1OmGdNknth2x2ckj6cn7o8gGijYmuQR4mfzqp4mC8hbAnTy1AqcwcKNvzwh9JgPvHH8cX3JHJ6Bru20dYcHeLQTsKKbk2pDHsaCNFlgKCoOHrTGWVl7TKLDI_dFvGkL8iqhG-jM-7tiOtpK_F--gxIFwU6nwo1LIT9H-lnQJtgsS-8vxY3NC1SI3e8TwRNsOhH-maFvQnI-BZ",
  },
];

const careInstructions = [
  {
    icon: "water_drop",
    title: "Stay Hydrated",
    description: "Check water levels daily and refresh with cool, clean water every 2 days to ensure longevity.",
  },
  {
    icon: "content_cut",
    title: "Trim the Stems",
    description: "Trim about 1cm from the base of the stems at a 45-degree angle when you first receive them.",
  },
  {
    icon: "wb_sunny",
    title: "Perfect Placement",
    description: "Keep your bouquet in a cool spot away from direct sunlight, drafts, and ripening fruit.",
  },
];

const relatedProducts = [
  {
    name: "Velvet Midnight",
    price: "$95.00",
    badge: "Signature",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuANEMmKgOORlJ1IfWxEK6P419a_aslDaIAl9a8GH81fZWYF5pQbHyOu9MDZQCpN0Ebq_dAKl92G5tQ5B6591a6Jrg4ETBmWzJAw7esTUWL8o_mJxi-4ni8bWPpYNeybg3mPdvyRqjoWEhWm1zhJHpFgx8oqJs9eqtT61bHh6egbGBN048IWs3Gcy1xjSy-VbsO3DozS0gmqZW88A0NAzGb8rkAWKjUuBfDTEdKBCmqqsVWM8pPx0ZNRy-GGAW4lxB6azRNvd6p4Hzzh",
  },
  {
    name: "Golden Hour",
    price: "$70.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzdwPnjFF2FfEmnjFmY-LMV5k2edC_59IaZOXbdr7mmg0fHKlbM216yFCDME-HGbGqzNJiArEPx12ZH0KIRYRLaMXzRhEY0jtRZ5UIkU9W85HyTg7qmlV2o9xvUJN6PnKaObKjOJS0dXfHcVxR9Hn2puW2rMFVhMK03AgP0qqNZQn77ckrH0GGgN8Z-ifYG03OBVNx6fBpPnSm4WZJxsIzxlxkogpyxXWqr7Z9REYbu4yqqZgrR6QSTD41-ozs8c-nL4QU1TCghI-1",
  },
  {
    name: "Snow Drop",
    price: "$65.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBH89i0fBH-kSfKgoqoM5XzFkhXxm0q08nFxdGsUc5aYgoWdf-ve2pmzfDtumfsMQoxpofkzvaojdSFJFCUsibHxV5oq2UbyF3nWH62eOAnVl-A85w_EM1solnwmV7gN8rv1S8X2Zw28yhtQkRVZiju_M0tgKTCV0S_GCv5jMt7ozs7yVI3OKSlNjwP7g8rtcthVOQ0nIPKAUGpplILZ0IRfHPDhEyLtUwPIgsNYvn1tsAOzjWfzJs16I2v5jIxcX4x9h6j0M2Eyjcc",
  },
  {
    name: "Lilac Dream",
    price: "$78.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6hVixVdVor7r6U2v9EDtBN6cP6R6axcaUarNwBD8H4P3oNj3iHjgHkHIru9AKXyBJPTi0RemezvneZFHxA2N14amnuFRTIi-62z1vJS7OzUyQUlMgCev9MRHQpFeGfoK8iyj1op9ECS3g1mOf455N3-MS2JzYeHlOA5bchl4d5qXcMbdG8CFmJ8tfC07E908_uJAgL1rphqQ4DvBqerkp4uWo6TQx5NU7-EOs0GTkcCE9W34xAU_IjkxXLzzW2FLL0_kRbUga2b9_",
  },
];

function SizeButton({ children, active = false }) {
  return (
    <button
      className={
        active
          ? "px-6 py-3 rounded-full border border-secondary bg-secondary/5 text-secondary font-label-md text-label-md transition-all"
          : "px-6 py-3 rounded-full border border-outline-variant text-on-surface-variant hover:border-secondary transition-all font-label-md text-label-md"
      }
      type="button"
    >
      {children}
    </button>
  );
}

function CareItem({ item }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center flex-shrink-0">
        <span className="material-symbols-outlined text-primary text-[20px]">{item.icon}</span>
      </div>
      <div>
        <h4 className="font-label-md text-label-md text-primary mb-1">{item.title}</h4>
        <p className="font-body-md text-body-md text-on-surface-variant">{item.description}</p>
      </div>
    </div>
  );
}

function RelatedProductCard({ product }) {
  return (
    <div className="group">
      <div className="aspect-[3/4] overflow-hidden rounded-xl bg-surface-container relative mb-4">
        <img alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={product.image} />
        <button className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-md p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" type="button">
          <span className="material-symbols-outlined text-secondary">add_shopping_cart</span>
        </button>
      </div>

      {product.badge && <span className="inline-block px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm mb-2">{product.badge}</span>}

      <h4 className="font-headline-md text-body-lg text-primary">{product.name}</h4>
      <p className="font-label-md text-label-md text-secondary-container">{product.price}</p>
    </div>
  );
}

export default function ProductDetail() {
  return (
    <div className="bg-background text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-12 font-label-sm text-label-sm text-outline uppercase tracking-wider">
          <a className="hover:text-secondary" href="#">
            Home
          </a>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <a className="hover:text-secondary" href="#">
            Bouquets
          </a>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface-variant">Blushing Romance</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Product Gallery */}
          <div className="lg:col-span-7">
            <div className="flex flex-col md:flex-row-reverse gap-6">
              <div className="flex-1 aspect-[4/5] overflow-hidden rounded-xl shadow-[0_4px_20px_rgba(255,102,178,0.08)] bg-surface-container">
                <img
                  alt="Blushing Romance Bouquet"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXLDHgppgqPy_wwMM-pErJeZm5JddUaNhzOMwEcUgD4KmUAbQOJ2M2vjqki9GhUHJQg7zx2daQ1IqA8pwnvX_WJCxMXdq9Up9dXLbJgkjWr0scdsndk3VXgmShv3thC9ToAlY1hTk66QP-LXDgT-guggdaFtUJhvJhC_FHMA9jZYNTcL0o_Hic-NOmDG5PTAelBz_OFBkhyFS-LkJe2e3WYsjiA77nyP6_s2T-7z5aTurXLlp90P7IzpxBbUJzj-DIQ73in6KYulei"
                />
              </div>

              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 custom-scrollbar">
                {thumbnails.map((thumbnail) => (
                  <div
                    className={`w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-colors ${thumbnail.active ? "border-2 border-secondary" : "border border-outline-variant hover:border-secondary"}`}
                    key={thumbnail.alt}
                  >
                    <img alt={thumbnail.alt} className="w-full h-full object-cover" src={thumbnail.image} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 flex flex-col">
            <h1 className="font-display-lg text-headline-lg text-primary mb-2">Blushing Romance</h1>
            <p className="font-headline-md text-headline-md text-secondary-container mb-8">$85.00</p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10 leading-relaxed">
              A curated symphony of soft blush tones and pure whites. This arrangement features premium garden roses, delicate ranunculus, and seasonal wildflowers, designed to evoke the quiet grace of a morning garden. Perfect for
              expressing affection, gratitude, or adding a touch of artisanal beauty to any space.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="font-label-md text-label-md uppercase tracking-widest text-primary mb-4">Select Size</h3>
                <div className="flex gap-3 flex-wrap">
                  <SizeButton active>Small</SizeButton>
                  <SizeButton>Medium</SizeButton>
                  <SizeButton>Large</SizeButton>
                </div>
              </div>

              <div>
                <h3 className="font-label-md text-label-md uppercase tracking-widest text-primary mb-4">Add a Card Message</h3>
                <textarea
                  className="w-full h-32 bg-surface-container-low border-b border-outline-variant focus:border-secondary focus:ring-0 transition-colors duration-300 font-body-md text-body-md p-4 rounded-t-lg resize-none"
                  placeholder="Write your heartfelt message here..."
                />
              </div>

              <button className="w-full py-5 bg-secondary-container text-white font-label-md text-label-md uppercase tracking-widest rounded-full hover:shadow-lg hover:opacity-95 transition-all active:scale-[0.98]" type="button">
                Add to Cart
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 py-4 text-outline font-label-sm text-label-sm uppercase tracking-tighter">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  Free Local Delivery
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">eco</span>
                  Eco-Friendly Wrap
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Care Instructions Section */}
        <section className="mt-24 py-16 border-t border-outline-variant/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Care Instructions</h2>
              <div className="space-y-6">
                {careInstructions.map((item) => (
                  <CareItem item={item} key={item.title} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-video shadow-lg">
              <img
                alt="Floral Care"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkyc3i-7n-ULW37Wy3JmiGIzeStHVMDEC1MrYIa9kie-ieNGS_tQNzqtbG6L2OGdarQviAkQ2rE81_l_44PmbTjg-dWiSD1ZRac_MllllMLh824_mnnJhP7ogKuD6CtGWPnuuzYrp3tDMBidbmnk-ovBZU3coeUKe9hSOe7yUF8Fn4lR5yoYIWcgr_PB5zd9XMgWPHdWNpb0M-YD1kE6y-rnQkGAHnRUsCPKYeKVaXbmDGLP-v-hj_VcQegnUG7njgfR--JDpGYg7t"
              />
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        <section className="mt-24">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary">You May Also Love</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">Curated pairings to complete your gift.</p>
            </div>
            <a className="font-label-md text-label-md text-secondary border-b border-secondary pb-1 hover:opacity-70 transition-opacity w-fit" href="#">
              View All Shop
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {relatedProducts.map((product) => (
              <RelatedProductCard product={product} key={product.name} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
