"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const [] = useState(false);
  const { cart, addToCart,  } = useCart();
  const [userRatings, setUserRatings] = useState({});

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/home-products");
        const data = await res.json();

        // Fix image path to include backend URL
        const updatedData = data.map((p) => ({
          ...p,
          image: p.image
            ? p.image.startsWith("http")
              ? p.image
              : `http://localhost:5000${p.image}`
            : "/fallback.jpg",
        }));

        setProducts(updatedData);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ⭐ Handle Ratings
  const handleStarClick = (productId, ratingValue) => {
    setUserRatings((prev) => {
      if (prev[productId] === ratingValue) {
        const newRatings = { ...prev };
        delete newRatings[productId];
        return newRatings;
      }
      return { ...prev, [productId]: ratingValue };
    });
  };

  // 🛒 Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-6">
      {/* --- Cart Section remains same --- */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product, i) => {
          const currentRating =
            userRatings[product._id] !== undefined ? userRatings[product._id] : product.rating;

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="max-w-xs bg-white rounded-2xl shadow-[0_0_4px_black] p-4 relative cursor-pointer"
            >
              <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md shadow-black">
                {product.category}
              </span>

              {/* ✅ Fixed Image Path */}
              <motion.img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover rounded-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />

              <h2 className="text-lg font-semibold mt-3">{product.title}</h2>

              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStarClick(product._id, star);
                    }}
                    className={`cursor-pointer ${
                      star <= currentRating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <p className="text-gray-500 text-sm ml-2">({product.reviews} reviews)</p>
              </div>

              <div className="flex justify-between items-center mt-3">
                <p className="text-xl font-bold text-gray-900">Rs.{product.price}</p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToCart(product)}
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

export default HomeProducts;
