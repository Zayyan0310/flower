import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminProfile() {
  const admin = JSON.parse(localStorage.getItem("admin")) || {
    name: "Admin",
    email: "admin@petals.com",
    role: "Administrator",
  };

  return (
    <div className="min-h-screen bg-[#fff8f7] text-[#1f1a1b]">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-6 md:p-8">
          <h1 className="mb-8 text-4xl font-black tracking-tight">Admin Profile</h1>

          <div className="max-w-3xl rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
              <img src="https://i.pravatar.cc/150" alt="Admin" className="h-32 w-32 rounded-full object-cover ring-4 ring-pink-100" />

              <div>
                <h2 className="text-3xl font-bold text-[#81515a]">{admin.name || "Admin"}</h2>
                <p className="mt-1 text-[#514345]">{admin.email || "admin@petals.com"}</p>
                <span className="mt-4 inline-block rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-[#81515a]">{admin.role || "Administrator"}</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#514345]">Nama</label>
                <input value={admin.name || "Admin"} readOnly className="w-full rounded-xl border border-pink-100 px-4 py-3" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#514345]">Email</label>
                <input value={admin.email || "admin@petals.com"} readOnly className="w-full rounded-xl border border-pink-100 px-4 py-3" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#514345]">Role</label>
                <input value={admin.role || "Administrator"} readOnly className="w-full rounded-xl border border-pink-100 px-4 py-3" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#514345]">Status</label>
                <input value="Active" readOnly className="w-full rounded-xl border border-pink-100 px-4 py-3" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
