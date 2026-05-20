import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../api/api";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return "bg-pink-100 text-pink-700";
    case "processed":
      return "bg-yellow-100 text-yellow-700";
    case "shipped":
      return "bg-blue-100 text-blue-700";
    case "completed":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      getOrders();
    } catch (error) {
      console.log(error);
      alert("Gagal update status order");
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8f9]">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-[#81515a]">
                <span>Admin</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
                <span className="font-semibold text-[#1f1a1b]">Orders Management</span>
              </div>

              <h1 className="text-4xl font-black text-[#1f1a1b]">Orders Management</h1>

              <p className="mt-2 text-[#514345]">Manage, filter and track all customer floral arrangement orders.</p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-[#f4e6e8] bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>

                <input type="text" placeholder="Search by order ID or customer..." className="w-full rounded-xl bg-[#f7f2f3] py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#81515a]" />
              </div>

              <select className="rounded-xl bg-[#f7f2f3] px-4 py-3 outline-none">
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Processed</option>
                <option>Shipped</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#f4e6e8] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f1f2]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-500">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-500">Customer</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-500">Phone</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-500">Date</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-500">Total</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-500">Status</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-500">Detail</th>
                    <th className="px-6 py-4 text-right text-sm text-gray-500">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-10 text-center text-[#514345]">
                        Belum ada order.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-t border-[#f4e6e8] hover:bg-[#fff8f9]">
                        <td className="px-6 py-5 font-semibold text-[#81515a]">#PP-{order.id}</td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-[#81515a]">{order.customerName?.slice(0, 2).toUpperCase()}</div>

                            <span className="font-medium text-[#1f1a1b]">{order.customerName}</span>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-[#514345]">{order.customerPhone}</td>

                        <td className="px-6 py-5 text-[#514345]">{new Date(order.createdAt).toLocaleDateString("id-ID")}</td>

                        <td className="px-6 py-5 font-semibold text-[#1f1a1b]">Rp {Number(order.total).toLocaleString("id-ID")}</td>

                        <td className="px-6 py-5">
                          <span className={`rounded-full px-4 py-1.5 text-sm font-semibold ${getStatusStyle(order.status)}`}>{order.status}</span>
                        </td>

                        <td className="px-6 py-5">
                          <Link to={`/admin/orders/${order.id}`} className="rounded-lg bg-[#81515a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6a4047] focus:outline-none focus:ring-2 focus:ring-[#81515a]">
                            Details
                          </Link>
                        </td>

                        <td className="px-6 py-5 text-right">
                          <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)} className="rounded-xl bg-[#f7f2f3] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#81515a]">
                            <option value="pending">Pending</option>
                            <option value="processed">Processed</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminOrders;
