// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// export default function CookingOIL() {
//   const [products, setProducts] = useState([]);

//   // ✅ Fetch products from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/api/cooking-oil")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("❌ Error fetching products:", err));
//   }, []);

//   // ✅ Animation Variants
//   const containerVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.5, staggerChildren: 0.2 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <motion.div
//       className="max-w-6xl mx-auto px-6 py-12"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       {/* ✅ Section Title */}
//       <motion.h2
//         className="text-3xl font-bold text-gray-800 text-center mb-10"
//         variants={itemVariants}
//       >
//         🛢️ Cooking Oil Products
//       </motion.h2>

//       {/* ✅ Product Grid */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
//         variants={containerVariants}
//       >
//         {products.map((product) => (
//           <motion.div
//             key={product._id}
//             variants={itemVariants}
//             className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
//           >
//             <img
//               src={
//                 product.image
//                   ? `http://localhost:5000${product.image}`
//                   : "/default.jpg"
//               }
//               alt={product.title}
//               className="w-40 h-40 object-cover rounded-lg shadow-md mx-auto"
//             />

//             <h3 className="text-lg font-bold mt-4 text-center">
//               {product.title}
//             </h3>
//             <p className="text-gray-600 text-center mt-1">
//               Price: <span className="font-semibold">Rs {product.price}</span>
//             </p>
//           </motion.div>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const CookingOIL = () => {
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();
  const [productRatings, setProductRatings] = useState({});

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cooking-oil");
        const data = await res.json();

        // Fix image path
        const updatedData = data.map((p) => ({
          ...p,
          image: p.image?.startsWith("http") ? p.image : `http://localhost:5000${p.image}`,
        }));

        setProducts(updatedData);

        setProductRatings(
          updatedData.reduce((acc, product) => {
            acc[product._id] = product.rating || 0;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("❌ Error fetching cooking oils:", error);
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

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    if (!existingItem) {
      addToCart({ ...product, id: product._id });
    }
  };

  return (
    <div className="p-6">
      {/* ✅ Cart Info */}
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

      {/* ✅ Show Cart or Products */}
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

            <div className="mt-4 text-right">
              <h3 className="text-xl font-bold">Total: Rs.{totalPrice.toFixed(2)}</h3>
            </div>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="max-w-xs bg-white rounded-2xl shadow p-4 relative hover:shadow-lg hover:scale-105 transition-transform"
              >
                {/* Category Badge */}
                <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {product.category || "Cooking Oil"}
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
                          star <= productRatings[product._id]
                            ? "text-yellow-400"
                            : "text-gray-300"
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
                  <p className="text-gray-500 text-sm ml-2">
                    ({product.reviews || 0} reviews)
                  </p>
                </div>

                {/* Price + Add to Cart */}
                <div className="flex justify-between items-center mt-3">
                  <p className="text-xl font-bold text-gray-900">
                    Rs.{product.price}
                  </p>
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

export default CookingOIL;
