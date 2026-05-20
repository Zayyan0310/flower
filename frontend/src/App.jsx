import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Gallery from "./pages/Gallery";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminProductCreate from "./pages/admin/AdminProductCreate";
import AdminProductEdit from "./pages/admin/AdminProductEdit";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminSettings from "./pages/admin/AdminSettings";
import OrderDetail from "./pages/admin/OrderDetail";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminManagement from "./pages/admin/AdminManagement";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />

        {/* Admin Pages */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/inventory"
          element={
            <PrivateRoute role="admin">
              <AdminInventory />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/products/create"
          element={
            <PrivateRoute role="admin">
              <AdminProductCreate />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/inventory/create"
          element={
            <PrivateRoute role="admin">
              <AdminProductCreate />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/products/:id/edit"
          element={
            <PrivateRoute role="admin">
              <AdminProductEdit />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <PrivateRoute role="admin">
              <AdminOrders />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/orders/:id"
          element={
            <PrivateRoute role="admin">
              <OrderDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/customers"
          element={
            <PrivateRoute role="admin">
              <AdminCustomers />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <PrivateRoute role="admin">
              <AdminSettings />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <PrivateRoute role="admin">
              <AdminProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/management"
          element={
            <PrivateRoute role="admin">
              <AdminManagement />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
