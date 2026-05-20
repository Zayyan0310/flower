import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const AdminNavbar = () => {
  const [setting, setSetting] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSetting = async () => {
      try {
        const res = await api.get("/settings");
        setSetting(res.data);
      } catch (error) {
        console.log(error.response?.data || error);
      }
    };

    getSetting();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#f4e6e8] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          {setting?.logo ? (
            <img src={setting.logo} alt={setting.storeName || "Store Logo"} className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-[#81515a]">
              <span className="material-symbols-outlined">local_florist</span>
            </div>
          )}

          <div>
            <h1 className="text-2xl font-bold text-[#81515a]">{setting?.storeName}</h1>

            <p className="text-xs text-[#514345]">{setting?.contactEmail || "admin@petals.com"}</p>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-pink-50">
            <img src="https://i.pravatar.cc/100" alt="Admin" className="h-10 w-10 rounded-full object-cover" />

            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-[#1f1a1b]">Admin</p>
              <p className="text-xs text-[#514345]">Administrator</p>
            </div>

            <span className="material-symbols-outlined text-[#81515a]">expand_more</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-xl">
              <div className="border-b border-pink-100 p-4">
                <p className="font-semibold text-[#1f1a1b]">Admin Panel</p>

                <p className="text-sm text-[#514345]">{setting?.contactEmail || "admin@petals.com"}</p>
              </div>

              <button onClick={() => navigate("/admin/profile")} className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-pink-50">
                <span className="material-symbols-outlined text-base">person</span>
                Profile
              </button>

              <button onClick={() => navigate("/admin/settings")} className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-pink-50">
                <span className="material-symbols-outlined text-base">settings</span>
                Settings
              </button>

              <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50">
                <span className="material-symbols-outlined text-base">logout</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
