import { useEffect, useState } from "react";

import api from "../../api/api";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

const initialForm = {
  name: "",
  email: "",
  password: "",
};

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const getCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const openCreateModal = () => {
    setSelectedCustomer(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setForm({
      name: customer.name,
      email: customer.email,
      password: "",
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedCustomer) {
        await api.put(`/customers/${selectedCustomer.id}`, form);
      } else {
        await api.post("/customers", form);
      }

      setModalOpen(false);
      setSelectedCustomer(null);
      setForm(initialForm);
      getCustomers();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menyimpan customer");
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/customers/${selectedCustomer.id}`);
      setDeleteModal(false);
      setSelectedCustomer(null);
      getCustomers();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menghapus customer");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f7]">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-black text-[#1f1a1b]">Customer Accounts</h1>
              <p className="mt-2 text-[#514345]">Kelola akun customer yang terdaftar.</p>
            </div>

            <button onClick={openCreateModal} className="w-fit rounded-xl bg-[#81515a] px-6 py-3 font-semibold text-white shadow-lg hover:bg-[#6f434b]" type="button">
              Add Customer
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-pink-100 bg-pink-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-[#81515a]">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-[#81515a]">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-[#81515a]">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-[#81515a]">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-[#81515a]">Created</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-[#81515a]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center text-[#514345]">
                        Belum ada customer.
                      </td>
                    </tr>
                  ) : (
                    customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-pink-50 hover:bg-pink-50/40">
                        <td className="px-6 py-4 text-sm">#{customer.id}</td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-[#81515a]">{customer.name?.slice(0, 2).toUpperCase()}</div>
                            <span className="font-semibold">{customer.name}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm">{customer.email}</td>

                        <td className="px-6 py-4">
                          <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold uppercase text-[#81515a]">{customer.role}</span>
                        </td>

                        <td className="px-6 py-4 text-sm text-[#514345]">{new Date(customer.createdAt).toLocaleDateString("id-ID")}</td>

                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-3">
                            <button onClick={() => openEditModal(customer)} className="rounded-lg bg-pink-100 px-3 py-2 text-sm font-semibold text-[#81515a] hover:bg-pink-200" type="button">
                              Edit
                            </button>

                            <button
                              onClick={() => {
                                setSelectedCustomer(customer);
                                setDeleteModal(true);
                              }}
                              className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-200"
                              type="button"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {modalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
                <h2 className="mb-6 text-2xl font-bold text-[#81515a]">{selectedCustomer ? "Edit Customer" : "Add Customer"}</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#514345]">Name</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30" required />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#514345]">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30" required />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#514345]">Password {selectedCustomer && <span className="text-xs font-normal text-[#837375]">kosongkan jika tidak diubah</span>}</label>
                    <input
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30"
                      required={!selectedCustomer}
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={() => {
                        setModalOpen(false);
                        setSelectedCustomer(null);
                        setForm(initialForm);
                      }}
                      className="rounded-xl border border-pink-200 px-5 py-3 font-semibold text-[#514345] hover:bg-pink-50"
                      type="button"
                    >
                      Cancel
                    </button>

                    <button className="rounded-xl bg-[#81515a] px-5 py-3 font-semibold text-white hover:bg-[#6f434b]" type="submit">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {deleteModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <span className="material-symbols-outlined text-4xl">delete</span>
                </div>

                <h2 className="text-2xl font-bold text-[#1f1a1b]">Hapus Customer?</h2>

                <p className="mt-3 text-[#514345]">
                  Akun <span className="font-semibold text-[#1f1a1b]">{selectedCustomer?.name}</span> akan dihapus permanen.
                </p>

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setDeleteModal(false);
                      setSelectedCustomer(null);
                    }}
                    className="rounded-xl border border-pink-200 px-5 py-3 font-semibold text-[#514345] hover:bg-pink-50"
                    type="button"
                  >
                    Cancel
                  </button>

                  <button onClick={confirmDelete} className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700" type="button">
                    Delete
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
