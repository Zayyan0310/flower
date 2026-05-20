import { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import api from "../../api/api";

function MetricCard({ metric }) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#514345]">{metric.label}</span>
        <span className={`material-symbols-outlined ${metric.color}`}>{metric.icon}</span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[#1f1a1b]">{metric.value}</span>

        {metric.note && <span className="text-sm text-[#514345]">{metric.note}</span>}
      </div>
    </div>
  );
}

function ActivityFeed({ orders }) {
  const recentOrders = orders.slice(0, 4);

  return (
    <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold text-[#1f1a1b]">Recent Orders</h3>

      <div className="flex flex-col gap-6">
        {recentOrders.length === 0 ? (
          <p className="text-sm text-[#514345]">Belum ada order.</p>
        ) : (
          recentOrders.map((order) => (
            <div key={order.id} className="flex gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary-container">
                <span className="material-symbols-outlined text-base text-on-secondary">shopping_cart</span>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#1f1a1b]">
                  Order #{order.id} - {order.customerName}
                </p>
                <p className="text-xs text-[#514345]">
                  Rp {Number(order.total || 0).toLocaleString("id-ID")} • {order.status || "PENDING"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function StockCard({ item }) {
  const isOut = item.status === "Out of Stock";

  return (
    <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img alt={item.name} className={`h-full w-full object-cover transition duration-500 hover:scale-105 ${isOut ? "grayscale" : ""}`} src={item.image} />

        <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase text-white">{item.status}</span>
      </div>

      <div className="p-4">
        <h4 className="text-lg font-semibold text-[#1f1a1b]">{item.name}</h4>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-[#514345]">{item.stock}</span>
          <span className="font-bold text-[#81515a]">{item.price}</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDashboardData = async () => {
    try {
      setLoading(true);

      const orderRes = await api.get("/orders");
      const productRes = await api.get("/products");

      setOrders(orderRes.data);
      setProducts(productRes.data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const totalSales = orders.reduce((total, order) => {
    return total + Number(order.total || 0);
  }, 0);

  const lowStockProducts = products.filter((product) => {
    return Number(product.stock || 0) <= 5;
  });

  const metrics = [
    {
      label: "Total Sales",
      value: `Rp ${totalSales.toLocaleString("id-ID")}`,
      icon: "payments",
      color: "text-tertiary",
    },
    {
      label: "New Orders",
      value: orders.length,
      icon: "shopping_basket",
      color: "text-secondary",
    },
    {
      label: "Low Stock Alerts",
      value: `${lowStockProducts.length} Items`,
      icon: "warning",
      color: "text-error",
      note: "Requires attention",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fff8f7] text-[#1f1a1b]">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-6 md:p-8">
          <section className="mb-8">
            <h1 className="text-4xl font-black tracking-tight text-[#1f1a1b]">Dashboard Overview</h1>
            <p className="mt-2 text-[#514345]">Welcome back! Here's what's happening with Petals & Poetry today.</p>
          </section>

          {loading ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">Loading dashboard...</div>
          ) : (
            <>
              <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {metrics.map((metric) => (
                  <MetricCard key={metric.label} metric={metric} />
                ))}
              </section>

              <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm lg:col-span-2">
                  <h3 className="mb-6 text-xl font-semibold text-[#1f1a1b]">Order Summary</h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b text-[#514345]">
                          <th className="py-3">Order</th>
                          <th className="py-3">Customer</th>
                          <th className="py-3">Payment</th>
                          <th className="py-3">Status</th>
                          <th className="py-3 text-right">Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="border-b">
                            <td className="py-3 font-semibold">#{order.id}</td>
                            <td className="py-3">{order.customerName}</td>
                            <td className="py-3">{order.paymentMethod || "COD"}</td>
                            <td className="py-3">{order.status || "PENDING"}</td>
                            <td className="py-3 text-right font-bold">Rp {Number(order.total || 0).toLocaleString("id-ID")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <ActivityFeed orders={orders} />
              </section>

              <section className="mt-8">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-[#1f1a1b]">Stock Status Items</h2>
                </div>

                {lowStockProducts.length === 0 ? (
                  <div className="rounded-2xl bg-white p-8 text-center shadow-sm">Tidak ada stok rendah.</div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {lowStockProducts.map((product) => (
                      <StockCard
                        key={product.id}
                        item={{
                          name: product.name,
                          stock: `${product.stock} units left`,
                          price: `Rp ${Number(product.price).toLocaleString("id-ID")}`,
                          status: Number(product.stock) <= 0 ? "Out of Stock" : "Low Stock",
                          image: product.image,
                        }}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
