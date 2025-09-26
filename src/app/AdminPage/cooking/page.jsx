"use client";
import React, { useState, useEffect } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    item: "",
    price: "",
    image: null,
    status: "Pending",
  });
  const [activities, setActivities] = useState([]);

  // ✅ Fetch cooking oils on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cooking-oil/");
        if (!res.ok) {
          const text = await res.text();
          console.error("Fetch products error:", res.status, text);
          return;
        }
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("❌ Error fetching cooking oils:", error);
      }
    };
    fetchOrders();
  }, []);

  // ✅ Add order
  const addOrder = async (e) => {
    e.preventDefault();
    if (!newOrder.customer || !newOrder.item || !newOrder.price) {
      alert("Please fill customer, item and price");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newOrder.item);
      formData.append("price", newOrder.price);
      formData.append("category", "Cooking Oil");
      formData.append("customer", newOrder.customer);
      formData.append("status", newOrder.status);
      if (newOrder.image) formData.append("image", newOrder.image);

      const res = await fetch("http://localhost:5000/api/cooking-oil/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Backend error (non-JSON):", res.status, txt);
        alert("Server error: " + (txt?.slice?.(0, 200) || res.status));
        return;
      }

      let savedOrder;
      try {
        savedOrder = await res.json();
      } catch (err) {
        const txt = await res.text();
        console.error("Failed to parse JSON. Response text:", txt);
        alert("Server responded with non-JSON (see console).");
        return;
      }

      setOrders((prev) => [savedOrder, ...prev]);
      setActivities((prev) => [
        `${newOrder.customer} added ${newOrder.item} (₨${newOrder.price})`,
        ...prev,
      ]);

      setNewOrder({
        customer: "",
        item: "",
        price: "",
        image: null,
        status: "Pending",
      });
    } catch (error) {
      console.error("❌ Error adding cooking oil:", error);
      alert("Network or server error. See console.");
    }
  };

  // ✅ Delete order (with API)
  const deleteOrder = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cooking-oil/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Delete failed:", res.status, txt);
        alert("Failed to delete order. See console.");
        return;
      }

      let deletedData;
      try {
        deletedData = await res.json();
      } catch {
        deletedData = null;
      }

      setOrders((prev) => prev.filter((o) => o._id !== id));
      setActivities((prev) => [
        `Deleted ${deletedData?.title || "order"}`,
        ...prev,
      ]);
    } catch (error) {
      console.error("❌ Error deleting order:", error);
      alert("Network or server error while deleting.");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Add Cooking Oil Products
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ✅ Orders Section */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Cooking Oil List
          </h2>

          {/* Add Form */}
          <form
            onSubmit={addOrder}
            className="flex flex-wrap gap-3 mb-4 bg-white/70 p-4 rounded-xl shadow-md"
            encType="multipart/form-data"
          >
            <input
              type="text"
              placeholder="Customer Name"
              value={newOrder.customer}
              onChange={(e) =>
                setNewOrder({ ...newOrder, customer: e.target.value })
              }
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Item"
              value={newOrder.item}
              onChange={(e) =>
                setNewOrder({ ...newOrder, item: e.target.value })
              }
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Price"
              value={newOrder.price}
              onChange={(e) =>
                setNewOrder({ ...newOrder, price: e.target.value })
              }
              className="w-28 px-3 py-2 border rounded-lg"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewOrder({ ...newOrder, image: e.target.files[0] })
              }
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <select
              value={newOrder.status}
              onChange={(e) =>
                setNewOrder({ ...newOrder, status: e.target.value })
              }
              className="px-3 py-2 border rounded-lg"
            >
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <button
              type="submit"
              className="flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl"
            >
              <FiPlus className="mr-2" /> Add
            </button>
          </form>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-left">
                  <th className="p-3">#</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Item</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{order.customer || "Guest"}</td>
                    <td className="p-3">{order.title}</td>
                    <td className="p-3">💲{order.price || 0}</td>
                    <td className="p-3">
                      <img
                        src={`http://localhost:5000${order.image}`}
                        alt={order.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.status === "Shipped"
                            ? "bg-blue-100 text-blue-600"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => deleteOrder(order._id)}
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

        {/* ✅ Activity Section */}
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
