export default function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 sm:p-5 backdrop-blur-md">
      {/* Close Button */}
      <button onClick={onClose} className="fixed right-4 top-4 z-[110] rounded-full bg-white/20 p-2 text-white backdrop-blur hover:bg-white/30 sm:right-8 sm:top-8">
        <span className="material-symbols-outlined text-3xl sm:text-4xl">close</span>
      </button>

      {/* Modal */}
      <div className="flex max-h-[95vh] w-full max-w-6xl flex-col overflow-y-auto rounded-2xl bg-[#fff8f7] shadow-2xl md:flex-row">
        {/* Image */}
        <div className="h-[240px] w-full bg-pink-50 sm:h-[320px] md:h-auto md:w-2/3">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        {/* Content */}
        <div className="relative w-full bg-[#fff8f7] p-5 sm:p-8 md:w-1/3 md:p-10">
          {/* Background Icon */}
          <div className="absolute right-4 top-4 opacity-5 sm:right-6 sm:top-6">
            <span className="material-symbols-outlined text-7xl sm:text-9xl text-[#ae2270]">eco</span>
          </div>

          <div className="relative z-10">
            {/* Category */}
            <div className="mb-3 flex items-center gap-2">
              <span className="h-[1px] w-6 sm:w-8 bg-[#ae2270]" />

              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#ae2270]">{product.category || "Flower Collection"}</span>
            </div>

            {/* Title */}
            <h2 className="mb-3 text-2xl sm:text-4xl font-bold italic text-[#81515a]">{product.name}</h2>

            {/* Description */}
            <p className="mb-5 text-sm sm:text-base leading-relaxed text-[#514345]">{product.description || "Beautiful floral arrangement crafted with elegance and care."}</p>

            {/* Info */}
            <div className="mb-5 space-y-4">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-[#ae2270]">celebration</span>

                <div>
                  <p className="text-sm sm:text-base font-semibold text-[#1f1a1b]">Ideal Occasion</p>

                  <p className="text-xs sm:text-sm text-[#514345]">Anniversary, Birthday, Wedding, Gift</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="material-symbols-outlined text-[#ae2270]">nest_eco_leaf</span>

                <div>
                  <p className="mb-2 text-sm sm:text-base font-semibold text-[#1f1a1b]">Botanical Composition</p>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-pink-100 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase text-[#81515a]">Fresh Flowers</span>

                    <span className="rounded-full bg-pink-100 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase text-[#81515a]">Premium Bouquet</span>

                    <span className="rounded-full bg-pink-100 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase text-[#81515a]">Handcrafted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <p className="mb-5 text-xl sm:text-2xl font-bold text-[#81515a]">Rp {Number(product.price).toLocaleString("id-ID")}</p>

            {/* Button */}
            <div className="flex gap-3">
              <button className="flex-1 rounded-xl bg-[#ae2270] py-3 sm:py-4 text-sm sm:text-base font-bold text-white hover:opacity-90">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
