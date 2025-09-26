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

  // ✅ Fetch House Products
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/house-products/");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("❌ Error fetching house products:", error);
      }
    };
    fetchOrders();
  }, []);

  // ✅ Add House Product
  const addOrder = async (e) => {
    e.preventDefault();
    if (!newOrder.customer || !newOrder.item || !newOrder.price) return;

    const formData = new FormData();
    formData.append("title", newOrder.item);
    formData.append("price", newOrder.price);
    formData.append("category", "House Products");
    formData.append("status", newOrder.status);
    formData.append("customer", newOrder.customer);

    if (newOrder.image) {
      formData.append("image", newOrder.image);
    }

    try {
      const res = await fetch("http://localhost:5000/api/house-products/", {
        method: "POST",
        body: formData,
      });

      const savedOrder = await res.json();
      setOrders([...orders, savedOrder]);
      setActivities([
        `${newOrder.customer} added: ${newOrder.item} (💲${newOrder.price}).`,
        ...activities,
      ]);

      setNewOrder({
        customer: "",
        item: "",
        price: "",
        image: null,
        status: "Pending",
      });
    } catch (error) {
      console.error("❌ Error adding house product:", error);
    }
  };

  // ✅ Delete Product
  const deleteOrder = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/house-products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("❌ Failed to delete product");
      }

      const orderToDelete = orders.find((o) => o._id === id);
      setOrders(orders.filter((order) => order._id !== id));

      if (orderToDelete) {
        setActivities([`Deleted: ${orderToDelete.title}`, ...activities]);
      }
    } catch (err) {
      console.error("❌ Error deleting product:", err);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add House Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders */}
        <div className="lg:col-span-2 bg-white/80 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            House Products List
          </h2>

          {/* Add Product Form */}
          <form
            onSubmit={addOrder}
            className="flex flex-wrap gap-3 mb-4 bg-white/70 p-4 rounded-xl shadow-md"
            encType="multipart/form-data"
          >
            <input
              type="text"
              placeholder="Customer Name"
              value={newOrder.customer}
              onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Item"
              value={newOrder.item}
              onChange={(e) => setNewOrder({ ...newOrder, item: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Price"
              value={newOrder.price}
              onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
              className="w-28 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="file"
              onChange={(e) => setNewOrder({ ...newOrder, image: e.target.files[0] })}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <select
              value={newOrder.status}
              onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <button
              type="submit"
              className="flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-md hover:scale-105"
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
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{order.customer || "Guest"}</td>
                    <td className="p-3">{order.title}</td>
                    <td className="p-3 text-gray-700">💲{order.price}</td>
                    <td className="p-3">
                      {order.image ? (
                        <img
                          src={`http://localhost:5000/${order.image}`}
                          alt={order.title}
                          className="w-12 h-12 object-cover rounded-lg border shadow-sm"
                        />
                      ) : (
                        "No Image"
                      )}
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

        {/* Activity Feed */}
        <div className="bg-white/80 rounded-2xl shadow-lg p-6">
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
                  className="p-3 bg-white/70 rounded-lg border text-gray-700 text-sm shadow-sm"
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
