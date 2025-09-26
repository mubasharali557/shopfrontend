"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; 
import { useCart } from "@/app/context/CartContext";

const SkinCare = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();
  
  const [products, setProducts] = useState([]);
  const [userRatings, setUserRatings] = useState({});

  // ✅ Backend se products fetch karna
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/skincare");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching skincare products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Rating handle karna
  const handleStarClick = (productId, ratingValue) => {
    setUserRatings(prev => {
      if (prev[productId] === ratingValue) {
        const newRatings = {...prev};
        delete newRatings[productId];
        return newRatings;
      }
      return { ...prev, [productId]: ratingValue };
    });
  };

  // ✅ Total price calculate karna
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product, index) => {
          const currentRating = userRatings[product._id] ?? product.rating;

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="max-w-xs bg-white rounded-2xl shadow p-4 relative"
            >
              {/* Badge */}
              <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
                {product.category}
              </span>

              {/* ✅ FIXED IMAGE PATH */}
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={`http://localhost:5000${product.image}`}  // ✅ Base URL add kiya
                alt={product.title}
                className="w-full h-64 object-cover rounded-lg"
              />

              {/* Title */}
              <h2 className="text-lg font-semibold mt-3">{product.title}</h2>

              {/* Ratings */}
              <div className="flex items-center mt-1">
                {[1,2,3,4,5].map(star => (
                  <span
                    key={star}
                    onClick={e => {
                      e.stopPropagation();
                      handleStarClick(product._id, star);
                    }}
                    className={`cursor-pointer text-xl ${
                      star <= currentRating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <p className="text-gray-500 text-sm ml-2">
                  ({product.reviews} reviews)
                </p>
              </div>

              {/* Price + Add To Cart */}
              <div className="flex justify-between items-center mt-3">
                <p className="text-xl font-bold text-gray-900">
                  Rs.{product.price}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToCart(product)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
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

export default SkinCare;
