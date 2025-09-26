"use client";
import React, { useState, useEffect } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    price: "",
    oldPrice: "",
    images: [],
    rating: 0,
    reviews: 0,
  });
  const [activities, setActivities] = useState([]);

  // ✅ Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) {
          const text = await res.text();
          console.error("Fetch error:", res.status, text);
          return;
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Add product with image upload
  const addProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.category || !newProduct.price) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("category", newProduct.category);
    formData.append("price", newProduct.price);
    formData.append("oldPrice", newProduct.oldPrice || 0);
    formData.append("rating", newProduct.rating);
    formData.append("reviews", newProduct.reviews);

    if (newProduct.images.length > 0) {
      Array.from(newProduct.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Add product failed:", res.status, txt);
        alert("Server error while adding product");
        return;
      }

      const savedProduct = await res.json();
      setProducts([savedProduct, ...products]);
      setActivities([`New product "${savedProduct.title}" added.`, ...activities]);

      setNewProduct({
        title: "",
        category: "",
        price: "",
        oldPrice: "",
        images: [],
        rating: 0,
        reviews: 0,
      });
    } catch (error) {
      console.error("❌ Error adding product:", error);
    }
  };

  // ✅ Delete product with backend confirmation
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Delete failed:", res.status, txt);
        alert("Failed to delete product. Check console.");
        return;
      }

      let deletedData;
      try {
        deletedData = await res.json();
      } catch {
        deletedData = null;
      }

      setProducts((prev) => prev.filter((p) => p._id !== id));
      setActivities([
        `Deleted product "${deletedData?.title || id}".`,
        ...activities,
      ]);
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      alert("Network/server error while deleting product.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Add New Products</h1>

      {/* Add Product Form */}
      <form
        onSubmit={addProduct}
        className="flex flex-wrap gap-3 mb-6 bg-gray-50 p-4 rounded-lg"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="w-28 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Old Price"
          value={newProduct.oldPrice}
          onChange={(e) =>
            setNewProduct({ ...newProduct, oldPrice: e.target.value })
          }
          className="w-28 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="file"
          multiple
          onChange={(e) =>
            setNewProduct({ ...newProduct, images: e.target.files })
          }
          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiPlus className="mr-2" /> Add
        </button>
      </form>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left">
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Images</th>
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
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{product.title}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">💲{product.price}</td>
                <td className="p-3 flex gap-2">
                  {product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:5000${img}`}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded-lg border"
                    />
                  ))}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-600 hover:text-red-800 flex items-center"
                  >
                    <FiTrash2 className="mr-1" /> Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Activity Feed */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">📌 Recent Activity</h2>
        <ul className="space-y-3">
          <AnimatePresence>
            {activities.map((activity, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 text-sm"
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
