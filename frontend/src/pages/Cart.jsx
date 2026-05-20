import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/api";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const [shippingCost, setShippingCost] = useState(0);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [orderForm, setOrderForm] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    city: "Jakarta Pusat",
    note: "",
    paymentMethod: "COD",
    bankName: "",
    paymentProof: null,
  });

  const cities = ["Jakarta Pusat", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur", "Jakarta Utara", "Tangerang", "Bekasi", "Depok", "Bogor"];

  const getCart = async () => {
    const res = await api.get("/cart");
    setCart(res.data);
  };

  const getShippingCost = async (city) => {
    try {
      const res = await api.get(`/shipping/cost?city=${encodeURIComponent(city)}`);

      setShippingCost(res.data.cost);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getShippingCost(orderForm.city);
  }, [orderForm.city]);

  const updateQty = async (id, quantity) => {
    if (quantity < 1) return;

    await api.put(`/cart/${id}`, { quantity });
    getCart();
  };

  const removeItem = async (id) => {
    await api.delete(`/cart/${id}`);
    getCart();
  };

  const subtotal = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const grandTotal = subtotal + shippingCost;

  const handleCheckout = async () => {
    if (!orderForm.customerName || !orderForm.customerPhone || !orderForm.customerAddress) {
      alert("Lengkapi detail order terlebih dahulu");
      return;
    }

    if (orderForm.paymentMethod === "TRANSFER" && !orderForm.paymentProof) {
      alert("Upload bukti transfer terlebih dahulu");
      return;
    }

    const formData = new FormData();

    formData.append("customerName", orderForm.customerName);
    formData.append("customerPhone", orderForm.customerPhone);
    formData.append("customerAddress", orderForm.customerAddress);
    formData.append("note", orderForm.note);
    formData.append("total", grandTotal);
    formData.append("paymentMethod", orderForm.paymentMethod);
    formData.append("bankName", orderForm.bankName || "");
    formData.append(
      "items",
      JSON.stringify(
        cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
      ),
    );

    if (orderForm.paymentProof) {
      formData.append("paymentProof", orderForm.paymentProof);
    }

    try {
      await api.post("/orders", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await api.delete("/cart/clear");
      setCart([]);

      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Gagal checkout");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f7]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-[#81515a] mb-8">Your Basket</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <section className="lg:col-span-2 space-y-6">
            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center">Cart masih kosong.</div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-5 flex gap-5 items-center shadow-sm">
                  <img src={item.product.image} alt={item.product.name} className="w-24 h-28 rounded-xl object-cover" />

                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.product.name}</h3>

                    <p className="text-[#81515a] font-semibold">Rp {Number(item.product.price).toLocaleString("id-ID")}</p>

                    <div className="flex items-center gap-3 mt-4">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-pink-100">
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-pink-100">
                        +
                      </button>
                    </div>
                  </div>

                  <button onClick={() => removeItem(item.id)} className="text-red-500 font-semibold">
                    Remove
                  </button>
                </div>
              ))
            )}
          </section>

          <aside className="bg-white rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="text-2xl font-bold text-[#81515a] mb-5">Summary</h2>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Nama customer"
                value={orderForm.customerName}
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    customerName: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="No. HP"
                value={orderForm.customerPhone}
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    customerPhone: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <textarea
                placeholder="Alamat lengkap"
                value={orderForm.customerAddress}
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    customerAddress: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
                rows="3"
              />

              <select
                value={orderForm.city}
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    city: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <select
                value={orderForm.paymentMethod}
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    paymentMethod: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="COD">COD</option>
                <option value="TRANSFER">Transfer Bank</option>
              </select>

              {orderForm.paymentMethod === "TRANSFER" && (
                <div className="space-y-3">
                  <div className="bg-pink-50 rounded-xl p-4 text-sm">
                    <p className="font-bold text-[#81515a]">Transfer ke:</p>
                    <p>BCA 1234567890</p>
                    <p>a.n. Petals Poetry</p>
                  </div>

                  <select
                    value={orderForm.bankName}
                    onChange={(e) =>
                      setOrderForm({
                        ...orderForm,
                        bankName: e.target.value,
                      })
                    }
                    className="w-full border rounded-xl px-4 py-3"
                  >
                    <option value="">Pilih Bank</option>
                    <option value="BCA">BCA</option>
                    <option value="Mandiri">Mandiri</option>
                    <option value="BRI">BRI</option>
                    <option value="BNI">BNI</option>
                  </select>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setOrderForm({
                        ...orderForm,
                        paymentProof: e.target.files[0],
                      })
                    }
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>
              )}

              <textarea
                placeholder="Catatan order"
                value={orderForm.note}
                onChange={(e) =>
                  setOrderForm({
                    ...orderForm,
                    note: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
                rows="2"
              />
            </div>

            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>Rp {Number(subtotal).toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Ongkir</span>
              <span>{loadingShipping ? "Menghitung..." : `Rp ${Number(shippingCost).toLocaleString("id-ID")}`}</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6">
              <span>Total</span>
              <span>Rp {Number(grandTotal).toLocaleString("id-ID")}</span>
            </div>

            <button onClick={handleCheckout} disabled={loadingShipping || cart.length === 0} className="w-full bg-[#81515a] text-white py-4 rounded-xl font-bold disabled:opacity-50">
              Checkout
            </button>
          </aside>
        </div>
      </main>
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md text-center animate-[fadeIn_.3s_ease]">
            <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-5" />

            <h2 className="text-3xl font-bold text-[#81515a] mb-3">Order Berhasil!</h2>

            <p className="text-gray-600 mb-6">Pesanan kamu berhasil dibuat dan sedang diproses.</p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/orders");
                }}
                className="w-full bg-[#81515a] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Lihat Pesanan
              </button>

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/");
                }}
                className="w-full border border-[#81515a] text-[#81515a] py-3 rounded-xl font-semibold hover:bg-pink-50 transition"
              >
                Kembali Belanja
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
