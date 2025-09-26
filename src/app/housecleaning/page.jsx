"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const HouseCleaning = () => {
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [productRatings, setProductRatings] = useState({});
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // ✅ Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/house-products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  const handleStarClick = (productId, ratingValue) => {
    setProductRatings(prev => {
      const newRating = prev[productId] === ratingValue ? 0 : ratingValue;
      return { ...prev, [productId]: newRating };
    });
  };

  // ✅ Helper function for full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    return `http://localhost:5000/${imagePath}`;
  };

  return (
    <div className="p-6">
      {/* Cart Info */}
      <div className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold">🛒 Cart Items: {totalItems}</h2>
        {cart.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCart(!showCart)}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
          >
            {showCart ? "Hide Cart" : "View Order Cart"}
          </motion.button>
        )}
      </div>

      {/* Order Cart */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="mb-6 bg-white p-4 rounded-lg shadow"
          >
            <h2 className="text-2xl font-bold mb-4">Your Order Cart</h2>
            {cart.map((item) => (
              <motion.div
                key={item._id || item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center border-b py-3"
              >
                <div className="flex items-center gap-3">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-500">Rs. {item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => decreaseQty(item._id || item.id)} className="px-2 bg-gray-300 rounded">-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item._id || item.id)} className="px-2 bg-gray-300 rounded">+</button>
                </div>

                <p className="font-bold">
                  Rs. {(item.price * item.qty).toFixed(2)}
                </p>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromCart(item._id || item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </motion.button>
              </motion.div>
            ))}

            <div className="flex justify-between items-center mt-4">
              <h3 className="text-xl font-bold">Total:</h3>
              <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xl font-bold text-green-600">
                Rs. {totalPrice.toFixed(2)}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product, index) => {
          const currentRating = productRatings[product._id] !== undefined ? productRatings[product._id] : product.rating;

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="max-w-xs bg-white rounded-2xl shadow p-4 relative"
            >
              <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {product.category}
              </span>

              <motion.img
                whileHover={{ scale: 1.1 }}
                src={getImageUrl(product.image)}
                alt={product.title}
                className="w-full h-64 object-cover rounded-lg"
              />

              <h2 className="text-lg font-semibold mt-3">{product.title}</h2>

              <div className="flex items-center mt-1">
                <div className="flex">
                  {[1,2,3,4,5].map(star => (
                    <button key={star} onClick={() => handleStarClick(product._id, star)} className="text-2xl focus:outline-none">
                      {star <= currentRating ? <span className="text-yellow-400">★</span> : <span className="text-gray-300">☆</span>}
                    </button>
                  ))}
                </div>
                <p className="text-gray-500 text-sm ml-2">({product.reviews} reviews)</p>
              </div>

              <div className="flex justify-between items-center mt-3">
                <p className="text-xl font-bold text-gray-900">Rs.{product.price}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart({...product, qty: 1})}
                  className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HouseCleaning;
