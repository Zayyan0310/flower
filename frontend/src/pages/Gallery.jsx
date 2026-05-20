import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/api";
import ProductDetailModal from "../components/ProductDetailModal";

const categories = ["All", "Roses", "Lilies", "Peonies", "Tulips", "Hydrangeas"];

function CategoryButton({ category, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "px-6 py-2 rounded-full font-label-md text-label-md bg-secondary text-on-secondary shadow-sm transition-all hover:opacity-90"
          : "px-6 py-2 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant border border-outline-variant/30 hover:border-secondary/50 transition-all"
      }
      type="button"
    >
      {category}
    </button>
  );
}

function GalleryCard({ product, index, onViewDetail }) {
  const layoutClass = "";

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-surface-container shadow-[0_4px_20px_rgba(255,102,178,0.08)] ${layoutClass}`}>
      <img alt={product.name} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" src={product.image} />

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/70 via-primary/10 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-8">
        <span className="mb-2 text-xs font-bold uppercase tracking-widest text-white">{product.category || "Flower Collection"}</span>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{product.name}</h3>

        <button onClick={() => onViewDetail(product)} className="mt-4 w-fit border-b border-white font-label-md text-white transition-opacity hover:opacity-80" type="button">
          View Detail
        </button>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory);

  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />

      <main>
        <section className="py-24 text-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">Floral Gallery</h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto italic">A visual journey through our most cherished arrangements and botanical art.</p>

          <div className="mt-12 w-24 h-px bg-outline-variant mx-auto" />
        </section>

        <section className="mb-16 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <CategoryButton
                key={category}
                category={category}
                active={activeCategory === category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleCount(8);
                }}
              />
            ))}
          </div>
        </section>

        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-32">
          {loading ? (
            <div className="rounded-2xl bg-white p-10 text-center text-[#81515a] shadow-sm">Loading gallery...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center text-[#514345] shadow-sm">Produk tidak ditemukan.</div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.slice(0, visibleCount).map((product, index) => (
                <GalleryCard key={product.id} product={product} index={index} onViewDetail={setSelectedProduct} />
              ))}
            </div>
          )}
        </section>

        <section className="bg-surface-container-low py-24 mb-16">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <h2 className="font-headline-lg text-headline-lg text-secondary mb-4 italic">Inspired by our work?</h2>

            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">Let&apos;s create something beautiful together.</p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-10 py-4 bg-secondary text-on-secondary rounded-full font-label-md text-label-md tracking-widest hover:bg-on-secondary-fixed-variant transition-colors shadow-lg" type="button">
                BOOK A CONSULTATION
              </button>

              <button className="px-10 py-4 border border-secondary text-secondary rounded-full font-label-md text-label-md tracking-widest hover:bg-secondary/5 transition-colors" type="button">
                SHOP ALL
              </button>
            </div>
          </div>
          {visibleCount < filteredProducts.length && (
            <div className="mt-10 flex justify-center">
              <button onClick={() => setVisibleCount((prev) => prev + 8)} className="rounded-full bg-[#81515a] px-8 py-4 font-bold text-white shadow-lg transition hover:bg-[#6a4047]">
                Load More
              </button>
            </div>
          )}
        </section>
      </main>

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      <Footer />
    </div>
  );
}
