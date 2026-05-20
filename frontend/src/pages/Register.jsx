import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Password dan konfirmasi password tidak sama");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "customer",
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal daftar akun");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f7] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-pink-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold italic text-[#81515a]">Petals & Poetry</h1>
          <p className="mt-2 text-[#514345]">Buat akun customer baru</p>
        </div>

        {error && <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-red-600">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#514345]">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama kamu"
              className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#514345]">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#514345]">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimal 6 karakter"
              className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#514345]">Konfirmasi Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi password"
              className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#81515a] py-4 font-bold text-white shadow-lg transition hover:bg-[#6f434b] disabled:opacity-60">
            {loading ? "Mendaftarkan..." : "Daftar Akun"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#514345]">
          Sudah punya akun?{" "}
          <Link to="/login" className="font-semibold text-[#ae2270]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
