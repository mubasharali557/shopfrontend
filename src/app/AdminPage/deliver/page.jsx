"use client";
import React, { useState, useEffect } from "react";

export default function DeliverPage() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/delivery/");
      const data = await res.json();
      if (res.ok) {
        setDeliveries(data);
      }
    } catch (error) {
      console.error("⚠️ Server error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete delivery (without confirm/alert)
  const handleRemove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/delivery/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeliveries(deliveries.filter((d) => d._id !== id));
      }
    } catch (error) {
      console.error("⚠️ Server error:", error.message);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  // ✅ Date + Time formatter
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          Deliver To
        </h2>

        {/* Display Saved Addresses */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Saved Addresses</h3>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : deliveries.length > 0 ? (
            <ul className="space-y-2">
              {deliveries.map((d) => (
                <li
                  key={d._id}
                  className="p-3 border rounded-lg bg-gray-50 text-gray-700 relative"
                >
                  <p>
                    <span className="font-semibold">Address:</span> {d.address}
                  </p>
                  <p>
                    <span className="font-semibold">City:</span> {d.city}
                  </p>
                  <p>
                    <span className="font-semibold">Postal Code:</span>{" "}
                    {d.postalCode}
                  </p>

                  {/* ✅ Delivery Date + Time at Bottom */}
                  <p className="text-sm text-gray-500 mt-2 border-t pt-2">
                    <span className="font-medium">📅 Delivered On:</span>{" "}
                    {formatDateTime(d.createdAt)}
                  </p>

                  {/* ✅ Remove Button */}
                  <button
                    onClick={() => handleRemove(d._id)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    ❌ Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No saved addresses yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
