import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/api";

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    if (image.startsWith("/")) return `http://localhost:5000${image}`;
    return `http://localhost:5000/${image}`;
  };

  const getOrders = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "customer") {
      navigate("/login");
      return;
    }

    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data pesanan");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff8f7]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-8 text-4xl font-bold text-[#81515a]">Pesanan Saya</h1>

        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">Belum ada pesanan.</div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#81515a]">Order #{order.id}</h2>

                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString("id-ID")}</p>
                  </div>

                  <span className="w-fit rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-[#81515a]">{order.status || "PENDING"}</span>
                </div>

                <div className="mb-5 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                  <div>
                    <p className="font-semibold">Nama</p>
                    <p>{order.customerName}</p>
                  </div>

                  <div>
                    <p className="font-semibold">No. HP</p>
                    <p>{order.customerPhone}</p>
                  </div>

                  <div>
                    <p className="font-semibold">Alamat</p>
                    <p>{order.customerAddress}</p>
                  </div>

                  <div>
                    <p className="font-semibold">Payment</p>
                    <p>
                      {order.paymentMethod || "COD"} - {order.paymentStatus || "PENDING"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 border-t pt-4">
                  {order.items?.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      {item.product?.image && <img src={getImageUrl(item.product.image)} alt={item.product.name} className="h-16 w-16 rounded-xl object-cover" />}

                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product?.name || "Produk"}</h3>

                        <p className="text-sm text-gray-500">
                          {item.quantity} x Rp {Number(item.price).toLocaleString("id-ID")}
                        </p>
                      </div>

                      <p className="font-semibold">Rp {Number(item.price * item.quantity).toLocaleString("id-ID")}</p>
                    </div>
                  ))}

                  {order.items?.length > 2 && <p className="text-sm text-[#81515a]">+{order.items.length - 2} produk lainnya</p>}
                </div>

                <div className="mt-5 flex items-center justify-between border-t pt-5 text-lg font-bold">
                  <span>Total</span>
                  <span>Rp {Number(order.total).toLocaleString("id-ID")}</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button onClick={() => setSelectedOrder(order)} className="rounded-xl bg-[#81515a] px-6 py-3 font-semibold text-white hover:bg-[#6a4047]" type="button">
                    View Detail
                  </button>

                  {order.paymentProof && (
                    <a href={`http://localhost:5000${order.paymentProof}`} target="_blank" rel="noreferrer" className="rounded-xl border border-[#81515a] px-6 py-3 font-semibold text-[#81515a] hover:bg-pink-50">
                      Bukti Transfer
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-[#81515a]">Order #{selectedOrder.id}</h2>

                <p className="mt-1 text-sm text-gray-500">{new Date(selectedOrder.createdAt).toLocaleString("id-ID")}</p>
              </div>

              <button onClick={() => setSelectedOrder(null)} className="rounded-full bg-pink-50 p-2 text-[#81515a] hover:bg-pink-100" type="button">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-bold text-[#81515a]">{selectedOrder.status || "PENDING"}</span>

              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-600">
                {selectedOrder.paymentMethod || "COD"} - {selectedOrder.paymentStatus || "PENDING"}
              </span>
            </div>

            <div className="mb-6 grid gap-4 rounded-2xl bg-[#fff8f7] p-5 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-[#514345]">Nama</p>
                <p>{selectedOrder.customerName}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#514345]">No HP</p>
                <p>{selectedOrder.customerPhone}</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-sm font-semibold text-[#514345]">Alamat</p>
                <p>{selectedOrder.customerAddress}</p>
              </div>

              {selectedOrder.note && (
                <div className="sm:col-span-2">
                  <p className="text-sm font-semibold text-[#514345]">Catatan</p>
                  <p>{selectedOrder.note}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {selectedOrder.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-pink-100 p-4">
                  {item.product?.image && <img src={getImageUrl(item.product.image)} alt={item.product?.name || "Produk"} className="h-20 w-20 rounded-2xl object-cover" />}

                  <div className="flex-1">
                    <h3 className="font-bold text-[#1f1a1b]">{item.product?.name || "Produk"}</h3>

                    <p className="mt-1 text-sm text-[#514345]">
                      {item.quantity} x Rp {Number(item.price).toLocaleString("id-ID")}
                    </p>
                  </div>

                  <p className="font-bold text-[#81515a]">Rp {Number(item.quantity * item.price).toLocaleString("id-ID")}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t pt-6 text-2xl font-black text-[#81515a]">
              <span>Total</span>
              <span>Rp {Number(selectedOrder.total).toLocaleString("id-ID")}</span>
            </div>

            {selectedOrder.paymentProof && (
              <div className="mt-6">
                <a href={`http://localhost:5000${selectedOrder.paymentProof}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#81515a] px-5 py-3 font-semibold text-white hover:bg-[#6a4047]">
                  <span className="material-symbols-outlined">receipt_long</span>
                  Lihat Bukti Transfer
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
