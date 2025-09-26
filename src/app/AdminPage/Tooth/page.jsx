"use client";
import React, { useState, useEffect } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const stats = [];

  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    item: "",
    price: "",
    status: "Pending",
  });
  const [file, setFile] = useState(null); 
  const [activities, setActivities] = useState([]);

  // ✅ Fetch Toothbrush Products
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/toothbrushes/");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("❌ Error fetching toothbrushes:", error);
      }
    };
    fetchOrders();
  }, []);

  // ✅ Add Toothbrush Product
  const addOrder = async (e) => {
    e.preventDefault();
    if (!newOrder.customer || !newOrder.item || !newOrder.price) return;

    const formData = new FormData();
    formData.append("title", newOrder.item);
    formData.append("category", "Toothbrushes");
    formData.append("price", newOrder.price);
    formData.append("rating", 0);
    formData.append("reviews", 0);
    if (file) formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/toothbrushes/", {
        method: "POST",
        body: formData,
      });

      const savedOrder = await res.json();
      setOrders([...orders, savedOrder]);

      setActivities([
        `${newOrder.customer} added a new toothbrush: ${newOrder.item} (💲${newOrder.price}).`,
        ...activities,
      ]);

      setNewOrder({ customer: "", item: "", price: "", status: "Pending" });
      setFile(null);
    } catch (error) {
      console.error("❌ Error adding toothbrush:", error);
    }
  };

  // ✅ Delete Toothbrush Product
  const deleteOrder = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/toothbrushes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      // Remove from state
      const orderToDelete = orders.find((o) => o._id === id);
      setOrders(orders.filter((order) => order._id !== id));

      if (orderToDelete) {
        setActivities([
          `Toothbrush "${orderToDelete.title}" was deleted.`,
          ...activities,
        ]);
      }
    } catch (error) {
      console.error("❌ Error deleting toothbrush:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Toothbrush Products</h1>

      {/* Orders Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-between text-gray-800">
            Toothbrushes List
          </h2>

          {/* Add Order Form */}
          <form onSubmit={addOrder} className="flex flex-wrap gap-3 mb-4 bg-white/70 p-4 rounded-xl shadow-md">
            <input
              type="text"
              placeholder="Customer Name"
              value={newOrder.customer}
              onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Item"
              value={newOrder.item}
              onChange={(e) => setNewOrder({ ...newOrder, item: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Price"
              value={newOrder.price}
              onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
              className="w-28 px-3 py-2 border rounded-lg"
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <select
              value={newOrder.status}
              onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
              className="px-3 py-2 border rounded-lg"
            >
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <button
              type="submit"
              className="flex items-center px-5 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:scale-105 transition-all"
            >
              <FiPlus className="mr-2" /> Add
            </button>
          </form>

          {/* Orders Table */}
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
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{order.customer || "Guest"}</td>
                    <td className="p-3">{order.title}</td>
                    <td className="p-3">💲{order.price}</td>
                    <td className="p-3">
                      {order.image && (
                        <img
                          src={`http://localhost:5000${order.image}`}
                          alt={order.title}
                          className="w-12 h-12 object-cover rounded-lg border shadow-sm"
                        />
                      )}
                    </td>
                    <td className="p-3">{order.status || "Pending"}</td>
                    <td className="p-3">
                      <button
                        onClick={() => deleteOrder(order._id)}
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
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            <AnimatePresence>
              {activities.map((activity, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 bg-white/70 rounded-lg border text-sm"
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
