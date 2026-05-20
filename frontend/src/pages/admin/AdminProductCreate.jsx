import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/api";

const initialForm = {
  name: "",
  slug: "",
  price: "",
  description: "",
  image: "",
  category: "Roses",
  stock: "",
  isActive: true,
  occasion: "Birthday",
};

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminProductCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "name") {
      setForm((prev) => ({
        ...prev,
        name: value,
        slug: createSlug(value),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("occasion", form.occasion);
      formData.append("stock", form.stock);
      formData.append("isActive", form.isActive);
      formData.append("image", form.image);

      await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/inventory");
    } catch (err) {
      setError("Gagal menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f7] text-[#1f1a1b]">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-[#1f1a1b]">Tambah Produk</h1>
              <p className="mt-2 text-[#514345]">Tambahkan bouquet baru ke katalog Petals &amp; Poetry.</p>
            </div>

            <button className="w-fit rounded-xl border border-pink-200 px-5 py-3 font-semibold text-[#81515a] hover:bg-pink-50" onClick={() => navigate("/admin/inventory")} type="button">
              Kembali
            </button>
          </div>

          {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">{error}</div>}

          <form className="grid grid-cols-1 gap-8 lg:grid-cols-3" onSubmit={handleSubmit}>
            <section className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm lg:col-span-2">
              <h2 className="mb-6 text-xl font-bold text-[#1f1a1b]">Informasi Produk</h2>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Nama Produk</label>
                  <input
                    className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30"
                    name="name"
                    onChange={handleChange}
                    placeholder="Contoh: Blushing Romance"
                    required
                    type="text"
                    value={form.name}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Slug</label>
                  <input
                    className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30"
                    name="slug"
                    onChange={handleChange}
                    placeholder="blushing-romance"
                    required
                    type="text"
                    value={form.slug}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Harga</label>
                  <input
                    className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30"
                    min="0"
                    name="price"
                    onChange={handleChange}
                    placeholder="85000"
                    required
                    type="number"
                    value={form.price}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Stok</label>
                  <input
                    className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30"
                    min="0"
                    name="stock"
                    onChange={handleChange}
                    placeholder="10"
                    required
                    type="number"
                    value={form.stock}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Kategori</label>
                  <select className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30" name="category" onChange={handleChange} value={form.category}>
                    <option>Roses</option>
                    <option>Lilies</option>
                    <option>Tulips</option>
                    <option>Peonies</option>
                    <option>Hydrangeas</option>
                    <option>Sunflowers</option>
                    <option>Seasonal</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Occasion</label>
                  <select className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30" name="occasion" onChange={handleChange} value={form.occasion}>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Congratulations</option>
                    <option>Wedding</option>
                    <option>Sympathy</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-8">
                  <input checked={form.isActive} className="h-5 w-5 rounded border-pink-200 text-[#81515a] focus:ring-[#81515a]/30" name="isActive" onChange={handleChange} type="checkbox" />
                  <label className="text-sm font-semibold text-[#514345]">Produk aktif</label>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">URL Gambar</label>
                  <input
                    className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3"
                    name="image"
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        image: e.target.files[0],
                        preview: URL.createObjectURL(e.target.files[0]),
                      }))
                    }
                    required
                    type="file"
                    accept="image/*"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Deskripsi</label>
                  <textarea
                    className="min-h-36 w-full resize-none rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30"
                    name="description"
                    onChange={handleChange}
                    placeholder="Deskripsi produk..."
                    required
                    value={form.description}
                  />
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-[#1f1a1b]">Preview</h2>

                <div className="overflow-hidden rounded-xl bg-pink-50">
                  {form.preview ? (
                    <img src={form.preview} alt="Preview produk" className="h-64 w-full object-cover" />
                  ) : (
                    <div className="flex h-64 items-center justify-center text-[#837375]">
                      <span className="material-symbols-outlined text-5xl">local_florist</span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold text-[#1f1a1b]">{form.name || "Nama Produk"}</h3>
                  <p className="text-sm text-[#514345]">{form.category || "Kategori"}</p>
                  <p className="mt-2 font-bold text-[#81515a]">{form.price ? `Rp ${Number(form.price).toLocaleString("id-ID")}` : "Rp 0"}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
                <button className="w-full rounded-xl bg-[#81515a] px-6 py-4 font-bold text-white shadow-lg transition hover:bg-[#6f434b] disabled:cursor-not-allowed disabled:opacity-60" disabled={loading} type="submit">
                  {loading ? "Menyimpan..." : "Simpan Produk"}
                </button>
              </div>
            </aside>
          </form>
        </main>
      </div>
    </div>
  );
}
