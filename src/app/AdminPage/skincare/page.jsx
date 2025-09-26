"use client";
import React, { useState, useEffect } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSkinCarePage() {
  const stats = [];
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    customer: "",
    item: "",
    price: "",
    image: null,
    status: "Pending",
  });
  const [activities, setActivities] = useState([]);

  // ✅ Fetch Skincare Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/skincare/");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching skincare products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Add Skincare Product
  const addProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.customer || !newProduct.item || !newProduct.price) return;

    const formData = new FormData();
    formData.append("title", newProduct.item);
    formData.append("category", "Skincare");
    formData.append("price", newProduct.price);
    if (newProduct.image) formData.append("image", newProduct.image);

    try {
      const res = await fetch("http://localhost:5000/api/skincare/", {
        method: "POST",
        body: formData,
      });

      const savedProduct = await res.json();
      setProducts([...products, savedProduct]);
      setActivities([
        `${newProduct.customer} added a new skincare product: ${newProduct.item} (💲${newProduct.price}).`,
        ...activities,
      ]);

      setNewProduct({
        customer: "",
        item: "",
        price: "",
        image: null,
        status: "Pending",
      });
    } catch (error) {
      console.error("❌ Error adding skincare product:", error);
    }
  };

  // ✅ Delete Skincare Product (with API)
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/skincare/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("❌ Failed to delete product:", res.status);
        alert("Failed to delete product from server");
        return;
      }

      setProducts(products.filter((p) => p._id !== id && p.id !== id));

      setActivities([
        `Skincare product with ID ${id} was deleted.`,
        ...activities,
      ]);
    } catch (error) {
      console.error("❌ Error deleting skincare product:", error);
      alert("Server/Network error while deleting");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Add Skincare Products
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all p-5 flex items-center"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center text-white text-xl rounded-lg ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">{stat.name}</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {stat.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Table */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-between text-gray-800">
            Skincare Products List
          </h2>

          {/* Add Product Form */}
          <form
            onSubmit={addProduct}
            className="flex flex-wrap gap-3 mb-4 bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-md"
          >
            <input
              type="text"
              placeholder="Customer Name"
              value={newProduct.customer}
              onChange={(e) =>
                setNewProduct({ ...newProduct, customer: e.target.value })
              }
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-white/50 backdrop-blur-sm"
            />
            <input
              type="text"
              placeholder="Item Name"
              value={newProduct.item}
              onChange={(e) =>
                setNewProduct({ ...newProduct, item: e.target.value })
              }
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-white/50 backdrop-blur-sm"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-28 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-white/50 backdrop-blur-sm"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.files[0] })
              }
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-white/50 backdrop-blur-sm"
            />
            <button
              type="submit"
              className="flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all"
            >
              <FiPlus className="mr-2" /> Add
            </button>
          </form>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-left">
                  <th className="p-3">#</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Item</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <motion.tr
                    key={product._id || product.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{newProduct.customer || "Guest"}</td>
                    <td className="p-3">{product.title}</td>
                    <td className="p-3 text-gray-700">
                      💲{product.price || 0}
                    </td>
                    <td className="p-3">
                      <img
                        src={`http://localhost:5000${product.image}`}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-lg border shadow-sm"
                      />
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => deleteProduct(product._id || product.id)}
                        className="text-red-500 hover:text-red-700 flex items-center transition-all"
                      >
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Recent Activity
          </h2>
          <ul className="space-y-3">
            <AnimatePresence>
              {activities.map((activity, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200 text-gray-700 text-sm shadow-sm"
                >
                  {activity}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}
