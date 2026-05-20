import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductDetailModal from "../components/ProductDetailModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/api";

const flowerTypes = ["Roses", "Lilies", "Peonies", "Tulips", "Hydrangeas"];
const occasions = ["Anniversary", "Birthday", "Congratulations", "Sympathy", "Wedding"];

function ProductCard({ product, onAddToCart, onViewDetail }) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-outline-variant/10">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={product.image} />

        <button
          onClick={() => onAddToCart(product.id)}
          className="absolute bottom-4 right-4 bg-white/95 text-secondary p-3 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-secondary hover:text-white"
          type="button"
        >
          <span className="material-symbols-outlined leading-none">add_shopping_cart</span>
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-label-md text-on-surface mb-1 truncate">{product.name}</h3>

        <p className="font-body-md text-secondary font-bold">Rp {Number(product.price).toLocaleString("id-ID")}</p>

        <button type="button" onClick={() => onViewDetail(product)} className="relative z-10 mt-4 w-full rounded-xl bg-[#81515a] py-3 font-bold text-white hover:bg-[#6a4047]">
          View Detail
        </button>
      </div>
    </div>
  );
}

function FilterCheckbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 group cursor-pointer">
      <input checked={checked} onChange={onChange} className="w-5 h-5 rounded border-outline-variant text-secondary focus:ring-secondary/20 cursor-pointer" type="checkbox" />

      <span className={checked ? "font-body-md text-secondary font-semibold" : "font-body-md text-on-surface-variant group-hover:text-secondary transition-colors"}>{label}</span>
    </label>
  );
}

export default function Shop() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    if (role !== "customer") {
      setShowLoginModal(true);
      return;
    }

    try {
      await api.post("/cart", { productId });
      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const toggleType = (type) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]));

    setVisibleCount(8);
  };

  const toggleOccasion = (occasion) => {
    setSelectedOccasions((prev) => (prev.includes(occasion) ? prev.filter((item) => item !== occasion) : [...prev, occasion]));

    setVisibleCount(8);
  };

  const filteredProducts = products
    .filter((product) => {
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(product.category);

      const matchOccasion = selectedOccasions.length === 0 || selectedOccasions.includes(product.occasion);

      return matchType && matchOccasion;
    })
    .sort((a, b) => {
      if (sort === "low") return Number(a.price) - Number(b.price);
      if (sort === "high") return Number(b.price) - Number(a.price);
      return 0;
    });

  return (
    <div className="bg-background text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <nav className="flex items-center gap-2 mb-10 font-label-sm text-label-sm text-outline">
          <a className="hover:text-secondary transition-colors" href="#">
            Home
          </a>

          <span className="material-symbols-outlined text-[16px]">chevron_right</span>

          <span className="text-secondary font-semibold">Shop All</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-12">
            <div className="pb-8 border-b border-outline-variant/30">
              <h3 className="font-label-md text-label-md uppercase tracking-widest text-on-surface font-bold mb-6">Flower Type</h3>

              <div className="space-y-4">
                {flowerTypes.map((type) => (
                  <FilterCheckbox key={type} label={type} checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} />
                ))}
              </div>
            </div>

            <div className="pb-8 border-b border-outline-variant/30">
              <h3 className="font-label-md text-label-md uppercase tracking-widest text-on-surface font-bold mb-6">Occasion</h3>

              <div className="space-y-4">
                {occasions.map((occasion) => (
                  <FilterCheckbox key={occasion} label={occasion} checked={selectedOccasions.includes(occasion)} onChange={() => toggleOccasion(occasion)} />
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedTypes([]);
                setSelectedOccasions([]);
                setVisibleCount(8);
              }}
              className="w-full rounded-xl border border-pink-200 px-4 py-3 font-semibold text-[#81515a] hover:bg-pink-50"
              type="button"
            >
              Reset Filter
            </button>
          </aside>

          <section className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 gap-4">
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Curated Collections</h1>

              <div className="flex items-center gap-6">
                <p className="font-body-md text-body-md text-on-surface-variant">{filteredProducts.length} items</p>

                <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent border-none font-label-md text-label-md uppercase tracking-wider focus:ring-0 cursor-pointer">
                  <option value="featured">Sort By: Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20 text-[#81515a]">Loading products...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center text-[#514345] shadow-sm">Produk tidak ditemukan.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} onViewDetail={setSelectedProduct} />
                ))}
              </div>
            )}
          </section>
          {visibleCount < filteredProducts.length && (
            <div className="mt-10 flex justify-center">
              <button onClick={() => setVisibleCount((prev) => prev + 8)} className="rounded-full bg-[#81515a] px-8 py-4 font-bold text-white shadow-lg transition hover:bg-[#6a4047]" type="button">
                Load More
              </button>
            </div>
          )}
        </div>

        {showLoginModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-white shadow-[0_20px_80px_rgba(0,0,0,0.25)] animate-[fadeIn_.25s_ease]">
              {/* Background Decoration */}
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-pink-100" />
              <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-[#ffd9df]" />

              <div className="relative p-8">
                {/* Close */}
                <button onClick={() => setShowLoginModal(false)} className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-[#81515a] transition hover:bg-pink-100">
                  <span className="material-symbols-outlined">close</span>
                </button>

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#ffc0cb] to-[#ae2270] shadow-xl">
                  <span className="material-symbols-outlined text-5xl text-white">shopping_bag</span>
                </div>

                {/* Title */}
                <h2 className="mb-3 text-center text-4xl font-black text-[#81515a]">Login Required</h2>

                {/* Description */}
                <p className="mx-auto mb-8 max-w-sm text-center leading-relaxed text-[#514345]">Silakan login terlebih dahulu untuk menambahkan produk ke keranjang dan melanjutkan checkout.</p>

                {/* Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button onClick={() => setShowLoginModal(false)} className="flex-1 rounded-2xl border border-pink-200 px-5 py-4 font-semibold text-[#81515a] transition hover:bg-pink-50">
                    Nanti Saja
                  </button>

                  <button onClick={() => navigate("/login")} className="flex-1 rounded-2xl bg-[#81515a] px-5 py-4 font-semibold text-white shadow-lg transition hover:bg-[#6e434b]">
                    Login Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      <Footer />
    </div>
  );
}
