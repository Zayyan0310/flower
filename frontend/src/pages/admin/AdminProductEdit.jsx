import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../api/api";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

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

export default function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [oldImage, setOldImage] = useState("");
  const [preview, setPreview] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      setForm({
        name: res.data.name,
        slug: res.data.slug,
        price: res.data.price,
        description: res.data.description,
        image: res.data.image,
        category: res.data.category,
        stock: res.data.stock,
        isActive: res.data.isActive,
        occasion: res.data.occasion,
      });

      setOldImage(res.data.image);
      setPreview(res.data.image);
    } catch (error) {
      console.log(error.response?.data || error);
      alert(error.response?.data?.message || "Gagal update produk");
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setNewImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      if (newImage) {
        formData.append("image", newImage);
      } else {
        formData.append("oldImage", oldImage);
      }

      await api.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/inventory");
    } catch (error) {
      console.log(error);
      alert("Gagal update produk");
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight">Edit Produk</h1>
              <p className="mt-2 text-[#514345]">Ubah informasi produk di katalog.</p>
            </div>

            <button onClick={() => navigate("/admin/inventory")} className="rounded-xl border border-pink-200 px-5 py-3 font-semibold text-[#81515a] hover:bg-pink-50" type="button">
              Kembali
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <section className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm lg:col-span-2">
              <h2 className="mb-6 text-xl font-bold">Informasi Produk</h2>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Nama Produk</label>
                  <input className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none" name="name" value={form.name} onChange={handleChange} required />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Slug</label>
                  <input className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none" name="slug" value={form.slug} onChange={handleChange} required />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Harga</label>
                  <input className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none" name="price" type="number" value={form.price} onChange={handleChange} required />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Stok</label>
                  <input className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none" name="stock" type="number" value={form.stock} onChange={handleChange} required />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Kategori</label>
                  <select className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none" name="category" value={form.category} onChange={handleChange}>
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
                  <input checked={form.isActive} name="isActive" onChange={handleChange} type="checkbox" className="h-5 w-5" />
                  <label className="text-sm font-semibold text-[#514345]">Produk aktif</label>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Gambar Produk</label>
                  <input className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3" type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#514345]">Deskripsi</label>
                  <textarea className="min-h-36 w-full resize-none rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none" name="description" value={form.description} onChange={handleChange} required />
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Preview</h2>

                <div className="overflow-hidden rounded-xl bg-pink-50">
                  {preview ? (
                    <img src={preview} alt={form.name} className="h-64 w-full object-cover" />
                  ) : (
                    <div className="flex h-64 items-center justify-center text-[#837375]">
                      <span className="material-symbols-outlined text-5xl">local_florist</span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold">{form.name || "Nama Produk"}</h3>
                  <p className="text-sm text-[#514345]">{form.category}</p>
                  <p className="mt-2 font-bold text-[#81515a]">Rp {Number(form.price || 0).toLocaleString("id-ID")}</p>
                </div>
              </div>

              <button className="w-full rounded-xl bg-[#81515a] px-6 py-4 font-bold text-white shadow-lg disabled:opacity-60" disabled={loading} type="submit">
                {loading ? "Menyimpan..." : "Update Produk"}
              </button>
            </aside>
          </form>
        </main>
      </div>
    </div>
  );
}
