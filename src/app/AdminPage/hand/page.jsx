"use client";
import React, { useState, useEffect } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "Body Washes",
    rating: 0,
    reviews: 0,
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/body-washes/");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Handle image select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct({ ...newProduct, image: file });
    if (file) setPreviewUrl(URL.createObjectURL(file));
    else setPreviewUrl(null);
  };

  // ✅ Add product
  const addProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price || !newProduct.image) {
      alert("⚠️ Title, price, and image are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      formData.append("rating", newProduct.rating);
      formData.append("reviews", newProduct.reviews);
      formData.append("image", newProduct.image);

      const res = await fetch("http://localhost:5000/api/body-washes/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add product");

      const savedProduct = await res.json();
      setProducts([savedProduct, ...products]);
      setActivities([`✅ Added "${newProduct.title}" successfully!`, ...activities]);

      // Reset form
      setNewProduct({
        title: "",
        price: "",
        category: "Body Washes",
        rating: 0,
        reviews: 0,
        image: null,
      });
      setPreviewUrl(null);
      setShowForm(false);
    } catch (error) {
      console.error("❌ Error adding product:", error);
    }
  };

  // ✅ Delete product (frontend only)
  const deleteProduct = (id) => {
    const productToDelete = products.find((p) => p._id === id);
    setProducts(products.filter((p) => p._id !== id));
    if (productToDelete) {
      setActivities([`🗑️ Deleted "${productToDelete.title}"`, ...activities]);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Body Wash Products</h1>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Products List</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all"
          >
            <FiPlus className="mr-2" /> {showForm ? "Cancel" : "Add Product"}
          </button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <form
            onSubmit={addProduct}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-md"
          >
            <input
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-white/50"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-white/50"
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-white/50"
            />
            <input
              type="number"
              placeholder="Rating (0-5)"
              value={newProduct.rating}
              onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-white/50"
              min="0"
              max="5"
            />
            <input
              type="number"
              placeholder="Reviews"
              value={newProduct.reviews}
              onChange={(e) => setNewProduct({ ...newProduct, reviews: e.target.value })}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-white/50"
              min="0"
            />

            {/* File Input */}
            <div>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 hover:border-blue-500 transition w-40 h-40 text-gray-500 text-center"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  "📂 Browse Image"
                )}
              </label>
            </div>

            <button
              type="submit"
              className="flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all col-span-full"
            >
              <FiPlus className="mr-2" /> Add Product
            </button>
          </form>
        )}

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-left">
                <th className="p-3">#</th>
                <th className="p-3">Title</th>
                <th className="p-3">Price</th>
                <th className="p-3">Image</th>
                <th className="p-3">Category</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Reviews</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{product.title}</td>
                  <td className="p-3 text-gray-700">💲{product.price}</td>
                  <td className="p-3">
                    <img
                      src={product.image ? `http://localhost:5000${product.image}` : "/default.jpg"}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded-lg border shadow-sm"
                    />
                  </td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{product.rating}</td>
                  <td className="p-3">{product.reviews}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteProduct(product._id)}
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
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
        <ul className="space-y-3">
          <AnimatePresence>
            {activities.map((activity, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-3 bg-white/70 rounded-lg border border-gray-200 text-gray-700 text-sm shadow-sm"
              >
                {activity}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
