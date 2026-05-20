import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff8f7] px-4">
      <div className="w-full max-w-md rounded-3xl border border-pink-100 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold italic text-[#81515a]">Petals & Poetry</h1>
          <p className="mt-2 text-[#514345]">Login untuk melanjutkan</p>
        </div>

        {error && <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-red-600">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#514345]">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#514345]">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full rounded-xl border border-pink-100 bg-pink-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#81515a]/30" required />
          </div>

          <button disabled={loading} className="w-full rounded-xl bg-[#81515a] py-4 font-bold text-white hover:bg-[#6f434b] disabled:opacity-60">
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-[#514345]">
            Belum punya akun?{" "}
            <Link to="/register" className="font-semibold text-[#ae2270] hover:underline">
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
