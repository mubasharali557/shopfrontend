"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

export default function AddToCart() {
  const { cart, totalItems } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false); // ✅ Success state

  const countries = [
    "Pakistan","India","Bangladesh","United States","United Kingdom",
    "Canada","Australia","Germany","France","Italy","China",
    "Japan","Saudi Arabia","UAE","Turkey","South Africa",
    "Brazil","Russia","Nepal","Sri Lanka","Other",
  ];

  const pakistanCities = [
    "Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad",
    "Multan","Peshawar","Quetta","Hyderabad","Sialkot","Gujranwala",
    "Bahawalpur","Sukkur","Larkana","Mardan","Sheikhupura","Sargodha",
    "Jhang","Kasur","Rahim Yar Khan","Okara","Abbottabad","Dera Ghazi Khan",
    "Mirpur (AJK)","Muzaffarabad","Gwadar","Swat","Kohat","Chiniot",
    "Hafizabad","Khanewal","Turbat","Other",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = { cart, formData, totalPrice };

    try {
      const res = await fetch("http://localhost:5000/api/orders/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const text = await res.text(); // read response safely
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned non-JSON response: " + text);
      }

      if (res.ok) {
        console.log("✅ Order Saved:", data);
        setOrderPlaced(true);
      } else {
        console.error("❌ Error:", data.message || data);
      }
    } catch (err) {
      console.error("❌ Error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl"
      >
        {orderPlaced ? (
          // ✅ Success UI
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              🎉 Order Placed Successfully!
            </h2>
            <p className="text-gray-700">
              Thank you for your purchase. Your order has been saved.
            </p>
          </div>
        ) : (
          <>
            {/* Cart Section */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🛒 Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4 mb-8">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Rs {item.price} × {item.qty}
                      </p>
                    </div>
                    <p className="font-semibold">Rs {item.price * item.qty}</p>
                  </div>
                ))}

                <div className="flex justify-between font-bold text-lg mt-3">
                  <span>Total ({totalItems} items):</span>
                  <span>Rs {totalPrice.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Shipping Form */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              🚚 Shipping Address
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>

              {/* Country & State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((c, index) => (
                      <option key={index} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    required
                  />
                </div>
              </div>

              {/* City & Postal Code */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    required
                  >
                    <option value="">Select City</option>
                    {pakistanCities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Zip/Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  placeholder="+92XXXXXXXXXX"
                  required
                />
              </div>

              {/* Checkout Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
              >
                ✅ Place Order
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
