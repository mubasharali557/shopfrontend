"use client";
import React, { useState, useEffect } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeProductsPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: null,
  });
  const [activities, setActivities] = useState([]);

  // ✅ Fetch all home products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/home-products/");
        if (!res.ok) {
          const txt = await res.text();
          console.error("Fetch error:", res.status, txt);
          return;
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching home products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Add new product
  const addProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) {
      alert("Please fill title and price!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("price", newProduct.price);
      if (newProduct.image) formData.append("image", newProduct.image);

      const res = await fetch("http://localhost:5000/api/home-products/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Backend error:", res.status, txt);
        alert("Server error: " + txt.slice(0, 200));
        return;
      }

      const saved = await res.json();
      setProducts((prev) => [saved, ...prev]);
      setActivities((prev) => [
        `➕ Added ${newProduct.title} (₨${newProduct.price})`,
        ...prev,
      ]);
      setNewProduct({ title: "", price: "", image: null });
    } catch (error) {
      console.error("❌ Error adding product:", error);
    }
  };

  // ✅ Delete product
  const deleteProduct = async (id) => {
    try {
      // Agar specific id test karni ho (hardcoded) to yahan pass karo
      const targetId = id || "68d4783e9d3b76a5e34cd058";

      const res = await fetch(
        `http://localhost:5000/api/home-products/${targetId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const txt = await res.text();
        console.error("❌ Delete failed:", res.status, txt);
        alert("Failed to delete product!");
        return;
      }

      const deleted = products.find((p) => p._id === targetId);
      setProducts((prev) => prev.filter((p) => p._id !== targetId));
      setActivities((prev) => [
        `🗑️ Deleted ${deleted?.title || "product"}`,
        ...prev,
      ]);
    } catch (error) {
      console.error("❌ Error deleting product:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🏠 Manage Home Products
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ✅ Left side - Products List */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Product List
          </h2>

          {/* Add Product Form */}
          <form
            onSubmit={addProduct}
            className="flex flex-wrap gap-3 mb-4 bg-white/70 p-4 rounded-xl shadow-md"
            encType="multipart/form-data"
          >
            <input
              type="text"
              placeholder="Product Title"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-28 px-3 py-2 border rounded-lg"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.files[0] })
              }
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className="flex items-center px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl"
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
                  <th className="p-3">Title</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{product.title}</td>
                    <td className="p-3">₨{product.price}</td>
                    <td className="p-3">
                      <img
                        src={
                          product.image
                            ? `http://localhost:5000${product.image}`
                            : "/default.jpg"
                        }
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="text-red-500 hover:text-red-700 flex items-center"
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

        {/* ✅ Right side - Activity */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            <AnimatePresence>
              {activities.map((a, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-3 bg-white rounded-lg"
                >
                  {a}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}
