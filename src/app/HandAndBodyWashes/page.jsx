"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const HandAndBodyWashes = () => {
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();
  const [productRatings, setProductRatings] = useState({});

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/body-washes");
        const data = await res.json();

        // Fix image path to include backend URL
        const updatedData = data.map((p) => ({
          ...p,
          image: p.image.startsWith("http") ? p.image : `http://localhost:5000${p.image}`,
        }));

        setProducts(updatedData);

        setProductRatings(
          updatedData.reduce((acc, product) => {
            acc[product._id] = product.rating || 0;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.qty, 0);

  const handleStarClick = (productId, newRating) => {
    setProductRatings((prev) => ({
      ...prev,
      [productId]: newRating,
    }));
  };

  // ✅ Updated Add to Cart without alerts
  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    if (!existingItem) {
      addToCart({ ...product, id: product._id });
    }
  };

  return (
    <div className="p-6">
      {/* Cart Info */}
      <div className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold">🛒 Cart Items: {totalItems}</h2>
        {cart.length > 0 && (
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
          >
            {showCart ? "Hide Cart" : "View Order Cart"}
          </button>
        )}
      </div>

      {/* Show Cart or Products */}
      <AnimatePresence>
        {showCart ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h2 className="text-2xl font-bold mb-4">Your Order Cart</h2>
            {cart.map((item) => (
              <motion.div
                key={item._id}
                className="flex justify-between items-center border-b py-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-500">Rs.{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item._id)}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold">Rs.{(item.price * item.qty).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="max-w-xs bg-white rounded-2xl shadow p-4 relative hover:shadow-lg hover:scale-105 transition-transform"
              >
                {/* Badge */}
                <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {product.category}
                </span>

                {/* Image */}
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-lg"
                />

                {/* Title */}
                <h2 className="text-lg font-semibold mt-3">{product.title}</h2>

                {/* Ratings */}
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-xl cursor-pointer ${
                          star <= productRatings[product._id] ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStarClick(product._id, star);
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm ml-2">({product.reviews} reviews)</p>
                </div>

                {/* Price + Button */}
                <div className="flex justify-between items-center mt-3">
                  <p className="text-xl font-bold text-gray-900">Rs.{product.price}</p>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToCart(product)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HandAndBodyWashes;
