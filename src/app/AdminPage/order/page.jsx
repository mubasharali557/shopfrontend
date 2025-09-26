"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/orders/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete order
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/orders/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        fetchOrders(); // refresh list after delete
      } else {
        const errData = await res.json();
        console.error("❌ Error:", errData.message);
      }
    } catch (err) {
      console.error("❌ Error deleting order:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 flex flex-col items-center">
      {/* 📦 Orders List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📦 All Orders</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="border p-4 rounded-lg shadow-sm bg-gray-50"
              >
                <h3 className="font-semibold">
                  Order #{index + 1} - {order.formData?.firstName}{" "}
                  {order.formData?.lastName}
                </h3>
                <p>
                  <strong>Email:</strong> {order.formData?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {order.formData?.phone}
                </p>
                <p>
                  <strong>Total Price:</strong> Rs {order.totalPrice}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "N/A"}
                </p>

                <ul className="list-disc ml-6 mt-2">
                  {order.cart.map((item) => (
                    <li key={item.id}>
                      {item.title} (x{item.qty}) – Rs {item.price}
                    </li>
                  ))}
                </ul>

                {/* Delete Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(order._id)}
                  className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-red-700 transition"
                >
                  🗑️ Remove Order
                </motion.button>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
