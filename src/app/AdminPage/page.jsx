"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiHome, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";
import { FiTruck } from "react-icons/fi";


export default function AdminPageLayout({ children }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // login form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const menuItems = [
    { name: "Orders", icon: <FiHome />, href: "/AdminPage/order"},
    { name: "Add Products Botals", icon: <FiUsers />, href: "/AdminPage/dashboard"},
    { name: "Add Products Milk", icon: <FiUsers />, href: "/AdminPage/addMilk"},
   { name: "Add Products Hand.Body Washes", icon: <FiUsers />, href: "/AdminPage/hand"},
  { name: "Add Products Tooth Brushes", icon: <FiUsers />, href: "/AdminPage/Tooth"},
    { name: "Add Products Similar Products ", icon: <FiUsers />, href: "/AdminPage/homeProducts"},
    { name: "Add Products CookingOIL", icon: <FiUsers />, href: "/AdminPage/cooking"},
  { name: "Add Products Skincare", icon: <FiUsers />, href: "/AdminPage/skincare"},
   { name: "Add Products Housecleaning", icon: <FiUsers />, href: "/AdminPage/house"},
    { name: "Add Products juices", icon: <FiUsers />, href: "/AdminPage/juices"},
   { name: "Deliver", icon: <FiTruck />, href: "/AdminPage/deliver"},  
    { name: "Settings", icon: <FiSettings />, href: "/AdminPage/settings" },
  ];

  useEffect(() => {
    const logged = localStorage.getItem("adminLoggedIn");
    if (logged === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // ✅ Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "Mubashar" && password === "1234") {
      localStorage.setItem("adminLoggedIn", "true");
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("❌ Invalid username or password");
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    setShowConfirm(true);
  };

  const confirmYes = () => {
    setShowConfirm(false);
    setLoggingOut(true);

    setTimeout(() => {
      setLoggingOut(false);
      localStorage.removeItem("adminLoggedIn");
      router.push("/"); // Go home
    }, 2000);
  };

  const confirmNo = () => setShowConfirm(false);

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
            🔐 Admin Login
          </h2>
          {error && (
            <p className="mb-4 text-red-600 text-sm text-center">{error}</p>
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b text-center">
          <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
          <p className="text-sm text-amber-600  mt-1">Power at your fingertips</p>
        </div>
        <nav className="p-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center w-full px-4 py-2 mb-2 rounded-lg text-gray-700 hover:bg-fuchsia-400 transition"
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-600 rounded-lg"
          >
            <FiLogOut className="mr-3 text-lg " /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* 🔥 Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-3xl font-bold">🎉 Welcome to Admin Panel</h2>
          <p className="text-sm mt-2 text-blue-100">
            Manage your users, products, and settings with ease 🚀
          </p>
        </div>
        {children}
      </main>

      {/* 🔥 Logout Confirmation Popup */}
      {showConfirm && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmYes}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={confirmNo}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 Logging Out Animation */}
      {loggingOut && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">
            ⏳ Waiting for logout...
          </p>
        </div>
      )}
    </div>
  );
}
