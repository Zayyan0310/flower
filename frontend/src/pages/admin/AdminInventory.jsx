import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../api/api";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${selectedProduct.id}`);

      setDeleteModal(false);
      setSelectedProduct(null);
      getProducts();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus produk");
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f7] text-[#1f1a1b]">
      <AdminNavbar />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-4xl font-black text-[#1f1a1b]">Product Inventory</h2>

              <p className="mt-2 text-[#514345]">Managing products inventory</p>
            </div>

            <Link to="/admin/inventory/create" className="w-fit rounded-xl bg-[#81515a] px-6 py-3 font-semibold text-white shadow-lg hover:bg-[#6f434b]">
              Add Product
            </Link>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-white p-6 shadow">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-pink-100 text-sm text-[#514345]">
                  <th className="py-3">Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-10 text-center text-[#514345]">
                      Belum ada produk.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="border-b border-pink-100 hover:bg-pink-50">
                      <td className="py-4">
                        <img src={product.image} alt={product.name} className="h-16 w-16 rounded-lg object-cover" />
                      </td>

                      <td className="font-semibold text-[#1f1a1b]">{product.name}</td>

                      <td>{product.category}</td>

                      <td>Rp {Number(product.price).toLocaleString("id-ID")}</td>

                      <td>{product.stock}</td>

                      <td>
                        {product.isActive ? (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Active</span>
                        ) : (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">Inactive</span>
                        )}
                      </td>

                      <td>
                        <div className="flex justify-end gap-3">
                          <Link to={`/admin/products/${product.id}/edit`} className="rounded-lg bg-pink-100 px-3 py-2 text-sm font-semibold text-[#81515a] hover:bg-pink-200">
                            Edit
                          </Link>

                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setDeleteModal(true);
                            }}
                            className="rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-200"
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {deleteModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <span className="material-symbols-outlined text-3xl">delete</span>
            </div>

            <h2 className="text-2xl font-bold text-[#1f1a1b]">Hapus Produk?</h2>

            <p className="mt-3 text-[#514345]">
              Produk <span className="font-semibold text-[#1f1a1b]">{selectedProduct?.name}</span> akan dihapus permanen dari database.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelectedProduct(null);
                }}
                className="rounded-xl border border-pink-200 px-5 py-3 font-semibold text-[#514345] hover:bg-pink-50"
                type="button"
              >
                Batal
              </button>

              <button onClick={confirmDelete} className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700" type="button">
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInventory;
