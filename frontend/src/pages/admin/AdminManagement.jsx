import { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/api";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
    status: "ACTIVE",
  });

  const getAdmins = async () => {
    const res = await api.get("/admins");
    setAdmins(res.data);
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      email: "",
      password: "",
      role: "ADMIN",
      status: "ACTIVE",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/admins/${editingId}`, form);
    } else {
      await api.post("/admins", form);
    }

    setShowSuccessModal(true);

    resetForm();
    getAdmins();
  };

  const handleEdit = (admin) => {
    setEditingId(admin.id);
    setForm({
      name: admin.name,
      email: admin.email,
      password: "",
      role: admin.role,
      status: admin.status,
    });
  };

  const openDeleteModal = (admin) => {
    setSelectedAdmin(admin);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedAdmin) return;

    await api.delete(`/admins/${selectedAdmin.id}`);

    setShowDeleteModal(false);
    setSelectedAdmin(null);
    getAdmins();
  };

  return (
    <div className="min-h-screen bg-[#fff8f7] text-[#1f1a1b]">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-6 md:p-8">
          <h1 className="mb-8 text-4xl font-black">Kelola Admin</h1>

          <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold">{editingId ? "Edit Admin" : "Tambah Admin"}</h2>

            <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#514345]">Nama Admin</label>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#81515a]">person</span>

                  <input
                    type="text"
                    placeholder="Masukkan nama admin"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full rounded-2xl border border-pink-100 bg-pink-50 py-4 pl-12 pr-4 outline-none transition focus:border-[#81515a] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#514345]">Email</label>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#81515a]">mail</span>

                  <input
                    type="email"
                    placeholder="Masukkan email admin"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full rounded-2xl border border-pink-100 bg-pink-50 py-4 pl-12 pr-4 outline-none transition focus:border-[#81515a] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#514345]">Password</label>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#81515a]">lock</span>

                  <input
                    type="password"
                    placeholder={editingId ? "Kosongkan jika tidak diganti" : "Masukkan password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required={!editingId}
                    className="w-full rounded-2xl border border-pink-100 bg-pink-50 py-4 pl-12 pr-4 outline-none transition focus:border-[#81515a] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#514345]">Role</label>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#81515a]">admin_panel_settings</span>

                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full appearance-none rounded-2xl border border-pink-100 bg-pink-50 py-4 pl-12 pr-4 outline-none transition focus:border-[#81515a] focus:bg-white"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPER_ADMIN">SUPER ADMIN</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#514345]">Status</label>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, status: "ACTIVE" })}
                    className={`flex-1 rounded-2xl border px-6 py-4 font-semibold transition ${form.status === "ACTIVE" ? "border-green-500 bg-green-50 text-green-600" : "border-pink-100 bg-white"}`}
                  >
                    Active
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, status: "INACTIVE" })}
                    className={`flex-1 rounded-2xl border px-6 py-4 font-semibold transition ${form.status === "INACTIVE" ? "border-red-500 bg-red-50 text-red-500" : "border-pink-100 bg-white"}`}
                  >
                    Inactive
                  </button>
                </div>
              </div>

              <div className="flex gap-4 md:col-span-2">
                <button type="submit" className="rounded-2xl bg-[#81515a] px-8 py-4 font-bold text-white transition hover:scale-[1.02] hover:bg-[#6a4047]">
                  {editingId ? "Update Admin" : "Simpan Admin"}
                </button>

                {editingId && (
                  <button type="button" onClick={resetForm} className="rounded-2xl border border-pink-100 bg-white px-8 py-4 font-bold transition hover:bg-pink-50">
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-pink-50">
                <tr>
                  <th className="px-6 py-4">Nama</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id} className="border-t">
                    <td className="px-6 py-4">{admin.name}</td>
                    <td className="px-6 py-4">{admin.email}</td>
                    <td className="px-6 py-4">{admin.role}</td>
                    <td className="px-6 py-4">{admin.status}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(admin)} className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold">
                          Edit
                        </button>

                        <button onClick={() => openDeleteModal(admin)} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white">
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {admins.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center">
                      Belum ada admin.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {showSuccessModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl animate-[fadeIn_.3s_ease]">
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                  <span className="material-symbols-outlined text-6xl text-green-600">check_circle</span>
                </div>

                <h2 className="mb-3 text-3xl font-black text-[#81515a]">Berhasil!</h2>

                <p className="mb-8 text-[#514345]">{editingId ? "Data admin berhasil diperbarui." : "Admin baru berhasil ditambahkan."}</p>

                <button onClick={() => setShowSuccessModal(false)} className="w-full rounded-2xl bg-[#81515a] py-4 font-bold text-white transition hover:bg-[#6a4047]">
                  Oke
                </button>
              </div>
            </div>
          )}
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
                  <span className="material-symbols-outlined text-6xl text-red-500">delete</span>
                </div>

                <h2 className="mb-3 text-3xl font-black text-[#81515a]">Hapus Admin?</h2>

                <p className="mb-8 text-[#514345]">
                  Admin <b>{selectedAdmin?.name}</b> akan dihapus permanen.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedAdmin(null);
                    }}
                    className="flex-1 rounded-2xl border border-pink-100 bg-white py-4 font-bold text-[#81515a]"
                  >
                    Batal
                  </button>

                  <button onClick={handleDelete} className="flex-1 rounded-2xl bg-red-500 py-4 font-bold text-white hover:bg-red-600">
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
