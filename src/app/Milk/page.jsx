// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useCart } from "@/app/context/CartContext";

// const Milk = () => {
//   const [products, setProducts] = useState([]); // store API products
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showCart, setShowCart] = useState(false);
//   const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();
//   const [productRatings, setProductRatings] = useState({});

//   const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/milk-products");
//         if (!res.ok) throw new Error("Failed to fetch products");
//         const data = await res.json();
//         setProducts(data);

//         // set default ratings
//         const ratings = data.reduce((acc, product) => {
//           acc[product._id || product.id] = product.rating || 0;
//           return acc;
//         }, {});
//         setProductRatings(ratings);

//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Handle rating click
//   const handleStarClick = (productId, newRating) => {
//     setProductRatings((prev) => ({
//       ...prev,
//       [productId]: newRating,
//     }));
//   };

//   // Animation Variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: { staggerChildren: 0.15 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
//   };

//   return (
//     <motion.div
//       className="p-6"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       {/* Cart Info */}
//       <div className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
//         <h2 className="text-xl font-bold">🛒 Cart Items: {totalItems}</h2>
//         {cart.length > 0 && (
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setShowCart(!showCart)}
//             className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
//           >
//             {showCart ? "Hide Cart" : "View Order Cart"}
//           </motion.button>
//         )}
//       </div>

//       {/* Order Cart */}
//       <AnimatePresence>
//         {showCart && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.4 }}
//             className="mb-6 bg-white p-4 rounded-lg shadow"
//           >
//             <h2 className="text-2xl font-bold mb-4">Your Order Cart</h2>
//             <AnimatePresence>
//               {cart.map((item) => (
//                 <motion.div
//                   key={item._id || item.id}
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -50 }}
//                   transition={{ duration: 0.3 }}
//                   className="flex justify-between items-center border-b py-3"
//                 >
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-16 h-16 rounded object-cover"
//                     />
//                     <div>
//                       <h3 className="font-semibold">{item.title}</h3>
//                       <p className="text-gray-500">Rs. {item.price}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => decreaseQty(item._id || item.id)}
//                       className="px-2 bg-gray-300 rounded"
//                     >
//                       -
//                     </button>
//                     <span>{item.qty}</span>
//                     <button
//                       onClick={() => increaseQty(item._id || item.id)}
//                       className="px-2 bg-gray-300 rounded"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <p className="font-bold">
//                     Rs. {(item.price * item.qty).toFixed(2)}
//                   </p>

//                   <button
//                     onClick={() => removeFromCart(item._id || item.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 </motion.div>
//               ))}
//             </AnimatePresence>

//             {/* Total */}
//             <div className="flex justify-between items-center mt-4">
//               <h3 className="text-xl font-bold">Total:</h3>
//               <p className="text-xl font-bold text-green-600">
//                 Rs. {totalPrice.toFixed(2)}
//               </p>
//             </div>

//             {cart.length > 0 && (
//               <button
//                 onClick={() => {
//                   alert(`🎉 Order placed successfully! Total: Rs ${totalPrice.toFixed(2)}`);
//                 }}
//                 className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
//               >
//                 ✅ Order Now
//               </button>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Products Grid */}
//       {loading ? (
//         <p className="text-center text-lg font-semibold">Loading products...</p>
//       ) : error ? (
//         <p className="text-center text-red-600 font-semibold">⚠️ {error}</p>
//       ) : (
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="show"
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
//         >
//           {products.map((product) => (
//             <motion.div
//               key={product._id || product.id}
//               variants={itemVariants}
//               whileHover={{ scale: 1.05 }}
//               className="max-w-xs bg-white rounded-2xl shadow-[0_0_4px_black] p-4 relative cursor-pointer"
//             >
//               <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md shadow-black">
//                 {product.category}
//               </span>

//               <motion.img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-64 object-cover rounded-lg"
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ duration: 0.4 }}
//               />

//               <h2 className="text-lg font-semibold mt-3">{product.title}</h2>

//               {/* Ratings */}
//               <div className="flex items-center mt-1">
//                 <div className="flex">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <span
//                       key={star}
//                       className={`text-xl cursor-pointer ${
//                         star <= (productRatings[product._id || product.id] || 0)
//                           ? "text-yellow-400"
//                           : "text-gray-300"
//                       }`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleStarClick(product._id || product.id, star);
//                       }}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>
//                 <p className="text-gray-500 text-sm ml-2">
//                   ({product.reviews || 0} reviews)
//                 </p>
//               </div>

//               {/* Price + Button */}
//               <div className="flex justify-between items-center mt-3">
//                 <p className="text-xl font-bold text-gray-900">
//                   Rs.{product.price}
//                 </p>
//                 <motion.button
//                   whileTap={{ scale: 1.2 }}
//                   onClick={() => addToCart(product)}
//                   className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
//                 >
//                   Add to Cart
//                 </motion.button>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default Milk;



"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const Milk = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();
  const [productRatings, setProductRatings] = useState({});

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/milk-products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);

        const ratings = data.reduce((acc, product) => {
          acc[product._id || product.id] = product.rating || 0;
          return acc;
        }, {});
        setProductRatings(ratings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleStarClick = (productId, newRating) => {
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
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Cart Info */}
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

      {/* Order Cart */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="mb-6 bg-white p-4 rounded-lg shadow"
          >
            <h2 className="text-2xl font-bold mb-4">Your Order Cart</h2>
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item._id || item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center border-b py-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-500">Rs. {item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item._id || item.id)}
                      className="px-2 bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item._id || item.id)}
                      className="px-2 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold">
                    Rs. {(item.price * item.qty).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item._id || item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Total */}
            <div className="flex justify-between items-center mt-4">
              <h3 className="text-xl font-bold">Total:</h3>
              <p className="text-xl font-bold text-green-600">
                Rs. {totalPrice.toFixed(2)}
              </p>
            </div>

            {cart.length > 0 && (
              <button
                onClick={() => {
                  alert(`🎉 Order placed successfully! Total: Rs ${totalPrice.toFixed(2)}`);
                }}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
              >
                ✅ Order Now
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-600 font-semibold">⚠️ {error}</p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product._id || product.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="max-w-xs bg-white rounded-2xl shadow-[0_0_4px_black] p-4 relative cursor-pointer"
            >
              <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md shadow-black">
                {product.category}
              </span>

              <motion.img
                src={`http://localhost:5000${product.image}`}
                alt={product.title}
                className="w-full h-64 object-cover rounded-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />

              <h2 className="text-lg font-semibold mt-3">{product.title}</h2>

              {/* ✅ Status */}
              <p
                className={`mt-1 font-medium ${
                  product.status === "Available" ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.status}
              </p>

              {/* Ratings */}
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl cursor-pointer ${
                        star <= (productRatings[product._id || product.id] || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStarClick(product._id || product.id, star);
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

              {/* Price + Button */}
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
      )}
    </motion.div>
  );
};

export default Milk;
