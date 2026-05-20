import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const getOrder = async () => {
    try {
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil detail order");
    }
  };

  useEffect(() => {
    getOrder();
  }, [id]);

  if (!order) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 bg-[#fff8f7] min-h-screen">
      <h1 className="text-3xl font-bold text-[#81515a] mb-6">Detail Order #{order.id}</h1>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">Data Customer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <b>Nama:</b> {order.customerName}
          </p>
          <p>
            <b>No HP:</b> {order.customerPhone}
          </p>
          <p>
            <b>Alamat:</b> {order.customerAddress}
          </p>
          <p>
            <b>Status:</b> {order.status}
          </p>
          <p>
            <b>Payment:</b> {order.paymentMethod}
          </p>
          <p>
            <b>Status Payment:</b> {order.paymentStatus}
          </p>
          <p>
            <b>Bank:</b> {order.bankName || "-"}
          </p>
          <p>
            <b>Tanggal:</b> {new Date(order.createdAt).toLocaleString("id-ID")}
          </p>
        </div>

        {order.note && (
          <p className="mt-4">
            <b>Catatan:</b> {order.note}
          </p>
        )}

        {order.paymentProof && (
          <div className="mt-4">
            <a href={`http://localhost:5000${order.paymentProof}`} target="_blank" rel="noreferrer" className="text-[#81515a] underline font-semibold">
              Lihat Bukti Transfer
            </a>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Item Pesanan</h2>

        <div className="space-y-4">
          {order.items?.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              {item.product?.image && <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-xl object-cover" />}

              <div className="flex-1">
                <h3 className="font-bold">{item.product?.name}</h3>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <p className="text-sm text-gray-500">Harga: Rp {Number(item.price).toLocaleString("id-ID")}</p>
              </div>

              <p className="font-bold">Rp {Number(item.price * item.quantity).toLocaleString("id-ID")}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-xl font-bold mt-6">
          <span>Total</span>
          <span>Rp {Number(order.total).toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  );
}
