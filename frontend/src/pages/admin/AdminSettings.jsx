import { useEffect, useState } from "react";

import api from "../../api/api";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

const initialForm = {
  storeName: "",
  contactEmail: "",
  currency: "IDR",
  timezone: "Asia/Jakarta",
  description: "",
  logo: "",
};

export default function AdminSettings() {
  const [form, setForm] = useState(initialForm);
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const getSetting = async () => {
    try {
      const res = await api.get("/settings");

      setForm({
        storeName: res.data.storeName || "",
        contactEmail: res.data.contactEmail || "",
        currency: res.data.currency || "IDR",
        timezone: res.data.timezone || "Asia/Jakarta",
        description: res.data.description || "",
        logo: res.data.logo || "",
      });
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSetting();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogoFile(file);

    setForm((prev) => ({
      ...prev,
      logo: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("storeName", form.storeName);
      formData.append("contactEmail", form.contactEmail);
      formData.append("currency", form.currency);
      formData.append("timezone", form.timezone);
      formData.append("description", form.description);

      if (logoFile) {
        formData.append("logo", logoFile);
      } else {
        formData.append("logo", form.logo);
      }

      await api.put("/settings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Settings berhasil disimpan");
      getSetting();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menyimpan settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff8f7]">
        <AdminNavbar />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-8 text-[#81515a]">Loading settings...</main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f7] text-[#1f1a1b]">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-6 md:p-8">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-[#81515a]">Store Configuration</h1>
            <p className="mt-2 text-[#514345]">Kelola identitas toko dan preferensi operasional.</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex flex-col gap-8 border-b border-pink-100 pb-8 md:flex-row">
                <div className="w-full md:w-1/3">
                  <h2 className="text-2xl font-bold text-[#81515a]">Store Logo</h2>
                  <p className="mt-1 text-sm text-[#837375]">Upload logo toko. Format PNG, JPG, atau WebP.</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-pink-200 bg-pink-50">
                    {form.logo ? <img src={form.logo} alt="Store Logo" className="h-full w-full object-cover" /> : <span className="material-symbols-outlined text-5xl text-[#81515a]">local_florist</span>}
                  </div>

                  <div>
                    <label className="inline-flex cursor-pointer rounded-full bg-[#ae2270] px-6 py-3 font-semibold text-white hover:opacity-90">
                      Change Logo
                      <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                    </label>

                    <p className="mt-3 text-sm text-[#514345]">Min size 512x512px</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#81515a]">Store Name</label>
                  <input name="storeName" value={form.storeName} onChange={handleChange} className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30" required />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#81515a]">Contact Email</label>
                  <input
                    name="contactEmail"
                    type="email"
                    value={form.contactEmail}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#81515a]">Currency</label>
                  <select name="currency" value={form.currency} onChange={handleChange} className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30">
                    <option value="IDR">IDR (Rp)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#81515a]">Timezone</label>
                  <select name="timezone" value={form.timezone} onChange={handleChange} className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30">
                    <option value="Asia/Jakarta">Asia/Jakarta (GMT+7)</option>
                    <option value="EST">Eastern Standard Time (GMT-5)</option>
                    <option value="PST">Pacific Standard Time (GMT-8)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#81515a]">Store Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full resize-none rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30"
                />
              </div>

              <div className="flex justify-end gap-4 border-t border-pink-100 pt-6">
                <button type="button" onClick={getSetting} className="rounded-xl border border-pink-200 px-6 py-3 font-semibold text-[#81515a] hover:bg-pink-50">
                  Cancel
                </button>

                <button type="submit" disabled={saving} className="rounded-xl bg-[#81515a] px-8 py-3 font-semibold text-white hover:bg-[#6f434b] disabled:opacity-60">
                  {saving ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
