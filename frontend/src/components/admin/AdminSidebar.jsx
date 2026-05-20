import React from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const menus = [
  {
    label: "Dashboard",
    icon: "dashboard",
    path: "/admin",
  },
  {
    label: "Inventory",
    icon: "inventory_2",
    path: "/admin/inventory",
  },
  {
    label: "Orders",
    icon: "shopping_bag",
    path: "/admin/orders",
  },
  {
    label: "Customers",
    icon: "group",
    path: "/admin/customers",
  },
  {
    label: "Management",
    icon: "manage_accounts",
    path: "/admin/management",
  },
  {
    label: "Settings",
    icon: "settings",
    path: "/admin/settings",
  },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-pink-100 p-4 gap-2 sticky top-0">
      {menus.map((menu) => {
        const active = location.pathname === menu.path;

        return (
          <Link key={menu.path} to={menu.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${active ? "bg-pink-100 text-[#81515a] font-bold" : "hover:bg-pink-50 text-[#514345]"}`}>
            <span className="material-symbols-outlined">{menu.icon}</span>

            <span>{menu.label}</span>
          </Link>
        );
      })}
    </aside>
  );
};

export default AdminSidebar;
