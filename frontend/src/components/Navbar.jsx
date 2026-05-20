import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const menus = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Shop", path: "/shop" },
    { label: "Gallery", path: "/gallery" },
    { label: "Orders", path: "/orders" },
  ];

  const [setting, setSetting] = useState(null);

  useEffect(() => {
    api.get("/settings").then((res) => {
      setSetting(res.data);
    });
  }, []);

  const getCartCount = async () => {
    try {
      if (!token) {
        setCartCount(0);
        return;
      }

      const res = await api.get("/cart");

      const totalQty = res.data.reduce((total, item) => {
        return total + Number(item.quantity || 0);
      }, 0);

      setCartCount(totalQty);
    } catch (error) {
      console.log(error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    getCartCount();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setOpenProfile(false);
    navigate("/login");
  };

  return (
    <>
      <style>
        {`
          .desktop-nav-custom {
            display: none;
          }

          .hamburger-custom {
            display: inline-flex;
          }

          .mobile-menu-custom {
            display: block;
          }

          @media (min-width: 1024px) {
            .desktop-nav-custom {
              display: flex;
            }

            .hamburger-custom {
              display: none;
            }

            .mobile-menu-custom {
              display: none;
            }
          }
        `}
      </style>

      <header className="bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_20px_rgba(255,102,178,0.08)]">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 lg:grid-cols-3 items-center h-20">
          <div className="flex justify-start">
            <Link className="font-headline-md text-headline-md text-secondary dark:text-secondary-fixed-dim italic" to="/">
              {setting?.storeName}
            </Link>
          </div>

          <nav className="desktop-nav-custom items-center justify-center gap-8">
            {menus.map((menu) => (
              <Link key={menu.path} className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors duration-300" to={menu.path}>
                {menu.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-4">
            <Link to="/cart" className="relative text-primary hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined">shopping_bag</span>

              {cartCount > 0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ae2270] px-1 text-[10px] font-bold text-white">{cartCount}</span>}
            </Link>

            <div className="relative">
              <button onClick={() => setOpenProfile(!openProfile)} className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-[#81515a] hover:bg-pink-200 transition" type="button">
                <span className="material-symbols-outlined">person</span>
              </button>

              {openProfile && (
                <div className="absolute right-0 top-12 w-56 rounded-2xl border border-pink-100 bg-white p-3 shadow-xl">
                  {token ? (
                    <>
                      <div className="border-b border-pink-100 px-3 py-3">
                        <p className="text-sm font-bold text-[#1f1a1b]">{user?.name || "Customer"}</p>
                        <p className="truncate text-xs text-[#514345]">{user?.email}</p>
                      </div>

                      <Link to="/profile" onClick={() => setOpenProfile(false)} className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#514345] hover:bg-pink-50">
                        <span className="material-symbols-outlined text-[18px]">account_circle</span>
                        Profile
                      </Link>

                      <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50" type="button">
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setOpenProfile(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#514345] hover:bg-pink-50">
                        <span className="material-symbols-outlined text-[18px]">login</span>
                        Login
                      </Link>

                      <Link to="/register" onClick={() => setOpenProfile(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#514345] hover:bg-pink-50">
                        <span className="material-symbols-outlined text-[18px]">person_add</span>
                        Daftar
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button onClick={() => setOpenMenu(!openMenu)} className="hamburger-custom material-symbols-outlined text-primary" type="button">
              {openMenu ? "close" : "menu"}
            </button>
          </div>
        </div>

        {openMenu && (
          <div className="mobile-menu-custom border-t border-outline-variant/30 bg-surface/95 backdrop-blur-md">
            <nav className="px-margin-mobile py-5 flex flex-col gap-4">
              {menus.map((menu) => (
                <Link key={menu.path} to={menu.path} onClick={() => setOpenMenu(false)} className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">
                  {menu.label}
                </Link>
              ))}

              <Link to="/cart" onClick={() => setOpenMenu(false)} className="font-label-md text-label-md uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">
                Cart {cartCount > 0 ? `(${cartCount})` : ""}
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
