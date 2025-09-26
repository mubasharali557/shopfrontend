"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const StarRating = ({ rating, setRating, reviews }) => {
  const handleClick = (index) => {
    setRating(rating === index + 1 ? 0 : index + 1);
  };

  return (
    <div className="flex items-center mt-1">
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <button key={index} onClick={() => handleClick(index)} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0..." />
            </svg>
          </button>
        ))}
      </div>
      <p className="text-gray-500 text-sm ml-2">({reviews} reviews)</p>
    </div>
  );
};

const Beverages = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, totalItems } = useCart();
  const [products, setProducts] = useState([]);
  const [productRatings, setProductRatings] = useState({});

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);

        // Initialize ratings
        const ratingsObj = {};
        data.forEach((p) => {
          ratingsObj[p._id] = p.rating;
        });
        setProductRatings(ratingsObj);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const updateRating = (productId, newRating) => {
    setProductRatings((prev) => ({
      ...prev,
      [productId]: newRating,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };

  return (
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <div className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold">🛒 Cart Items: {totalItems}</h2>
        {cart.length > 0 && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowCart(!showCart)}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
          >
            {showCart ? "Hide Cart" : "View Order Cart"}
          </motion.button>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6"
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="max-w-xs bg-white rounded-2xl shadow-[0_0_4px_black] p-4 relative"
          >
            <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md shadow-black">
              {product.category}
            </span>

            {/* Display first image or fallback */}
            <motion.img
              src={
                product.images && product.images.length > 0
                  ? `http://localhost:5000${product.images[0]}`
                  : "/default.jpg"
              }
              alt={product.title}
              className="w-full h-64 object-cover rounded-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />

            <h2 className="text-lg font-semibold mt-3">{product.title}</h2>
            <StarRating
              rating={productRatings[product._id]}
              setRating={(newRating) => updateRating(product._id, newRating)}
              reviews={product.reviews}
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-xl font-bold text-gray-900">Rs.{product.price}</p>
              <motion.button
                whileTap={{ scale: 1.2 }}
                onClick={() => addToCart(product)}
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Beverages;
