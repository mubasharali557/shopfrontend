"use client";
import Link from "next/link";
import { FiSearch, FiTruck } from "react-icons/fi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const slides = [
  { id: 1, bg: "/Shop.jpg", title: "SAVE MONEY", subtitle: "Exclusive Offers" },
  { id: 2, bg: "/Shop2.jpg", title: "SAVE TIME", subtitle: "Quick Delivery" },
  { id: 3, bg: "/Shop3.jpg", title: "THE BEST ONLINE SHOP", subtitle: "Premium Products" },
  { id: 4, bg: "/Shop4.jpg", title: "PREMIUM QUALITY", subtitle: "Trusted by Thousands" },
];

const products = [
  { id: 1, title: "Fine Dreaming Multi Purpose Cleaner Lavender", price: 300, image: "/ho1.jpg" },
  { id: 2, title: "Fine Dreaming Multi Purpose Cleaner Floral", price: 280, image: "/ho2.jpg" },
  { id: 3, title: "Milk Pack Full Cream", price: 150, image: "/Mi.jpg" },
  { id: 4, title: "Nestle Juice Mango", price: 80, image: "/Ju.jpg" },
];

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Filtered Products
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* 🔝 Header */}
      <header className="w-full border-b bg-white/70 backdrop-blur-lg sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <Image
              src="/download.jpg"
              alt="Logo"
              width={120}
              height={50}
              className="object-contain w-24 sm:w-32 drop-shadow-md"
            />
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center border rounded-full px-3 py-1 w-1/2 bg-white shadow-inner"
          >
            <FiSearch className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 outline-none text-sm bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 sm:gap-6 font-medium text-sm sm:text-base"
          >
            <Link
              href="/about"
              className="hover:text-pink-500 transition-colors duration-300"
            >
              About My Shop
            </Link>

            <Link
              href="/deliverto"
              className="hover:text-pink-500 hidden sm:flex items-center gap-1 transition-colors duration-300"
            >
              <FiTruck className="w-4 h-4" />
              Deliver to
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative flex items-center gap-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-pink-700 transition shadow-lg"
            >
              🛒 Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
                  {totalItems}
                </span>
              )}
            </button>
          </motion.div>
        </div>

        {/* 🛍 Cart Dropdown */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute right-4 top-20 w-80 bg-white/95 backdrop-blur-xl shadow-2xl rounded-xl p-4 z-50 border"
            >
              <h2 className="text-lg font-bold mb-3">🛒 Your Cart</h2>
              {cart.length === 0 ? (
                <p className="text-gray-500">Cart is empty</p>
              ) : (
                <div className="space-y-3">
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
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 ml-2 hover:text-red-600"
                        >
                          ✖
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="flex justify-between font-bold mt-3">
                    <span>Total:</span>
                    <span>Rs {totalPrice.toFixed(2)}</span>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/addtocart"
                    className="block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-3 transition shadow"
                  >
                    ✅ Checkout
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 🎥 Hero Section */}
      <section className="relative w-full h-[90vh] sm:h-[95vh] md:h-[100vh] overflow-hidden">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              currentIndex === index && (
                <motion.div
                  key={slide.id}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  {/* Background */}
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${slide.bg})` }}
                  >
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                    <motion.div
                      key={slide.title}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 40, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-white max-w-3xl space-y-4"
                    >
                      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
                        {slide.title}
                      </h2>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold drop-shadow-md">
                        {slide.subtitle}
                      </h3>
                      <Link
                        href="/Milk"
                        className="inline-block mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full transition shadow-lg"
                      >
                        🛒 Start Shopping
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </section>

      {/* 🔍 Search Results */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        {searchTerm ? (
          filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h2 className="font-semibold mt-2">{product.title}</h2>
                  <p className="text-gray-600">Rs {product.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found</p>
          )
        ) : null}
      </section>

      {/* 🧭 Nav2 */}
      <nav className="hidden md:flex items-center justify-center flex-wrap gap-10 text-sm font-bold mt-4 px-4 max-w-7xl mx-auto">
        {[
          { href: "/beverages", label: "Botals" },
          { href: "/Milk", label: "Milk" },
          { href: "/HandAndBodyWashes", label: "Hand And Body Washes" },
          { href: "/toothBrushesPastes", label: "Tooth Brushes (Pastes)" },
          { href: "/homeProducts", label: "Similar Products" },
          { href: "/CookingOIL", label: "Cooking OIL" },
          { href: "/skincare", label: "Skin Care" },
          { href: "/housecleaning", label: "House Cleaning" },
          { href: "/juices", label: "Juices" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="relative group"
          >
            <span className="hover:text-pink-500 transition-colors duration-300">
              {item.label}
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-500 transition-all group-hover:w-full"></span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
