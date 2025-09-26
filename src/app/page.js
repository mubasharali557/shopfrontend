"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

const allProducts = [
    // Cooking Oil
  {
    id: 8,
    title: "Shahtaj Canola Oil",
    image: "/oil7.jpg",
    category: "Cooking Oil",
    price: 1400,
    rating: 5,
    reviews: 500,
  },
  {
    id: 9,
    title: "OK Banaspati Ghee 1 KG",
    image: "/oil8.jpg",
    category: "Cooking Oil",
    price: 1400,
    rating: 5,
    reviews: 500,
  },
  {
    id: 10,
    title: "Adam Desi Ghee 2.5 KG",
    image: "/oil9.jpg",
    category: "Cooking Oil",
    price: 2100,
    rating: 5,
    reviews: 500,
  }, 
  {
    id: 3,
    title: "Seasons Corn Oil Bottle 3LTR",
    image: "/oil2.jpg",
    category: "Cooking Oil",
    price: 2100,
    rating: 4,
    reviews: 210,
  },
   {
    id: 5,
    title: "Dalda Corn Oil Bottle 3L",
    image: "/oil4.jpg",
    category: "Cooking Oil",
    price: 1200,
    rating: 3,
    reviews: 500,
  },

  // Body Washes
  {
    id: 6,
    title: "DEXCLUSIVE Luxury",
    image: "/Soap5.jpg",
    category: "Home Products",
    price: 330,
    rating: 4,
    reviews: 500,
  },
  {
    id: 7,
    title: "Lux Soap",
    image: "/Soap6.jpg",
    category: "Home Products",
    price: 210,
    rating: 3,
    reviews: 500,
  },
  {
    id: 8,
    title: "Capri Soap White 120GM",
    image: "/Soap7.jpg",
    category: "Home Products",
    price: 220,
    rating: 5,
    reviews: 500,
  },
  {
    id: 9,
    title: "SUFI Classic Beauty Soap",
    image: "/Soap8.jpg",
    category: "Home Products",
    price: 300,
    rating: 5,
    reviews: 500,
  },
  {
    id: 10,
    title: "Palmolive Natural Soap",
    image: "/Soap9.jpg",
    category: "Home Products",
    price: 250,
    rating: 5,
    reviews: 500,
  },

  // Home Products (Soaps)
    {
    id: 1,
    title: "No 1 Rosewater Soap",
    image: "/Soap.jpg",
    category: "Home Products",
    price: 230,
    rating: 4,
    reviews: 500,
  },
  {
    id: 2,
    title: "Safeguard Lemon Soap",
    image: "/Soap1.jpg",
    category: "Home Products",
    price: 250,
    rating: 2,
    reviews: 320,
  },
  {
    id: 3,
    title: "Dove soap",
    image: "/Soap2.jpg",
    category: "Home Products",
    price: 320,
    rating: 4,
    reviews: 210,
  },
  {
    id: 4,
    title: "Best Whitening Soap",
    image: "/Soap3.jpg",
    category: "Home Products",
    price: 210,
    rating: 2,
    reviews: 500,
  },
  {
    id: 5,
    title: "Ilham - Pretty Pink Beauty",
    image: "/Soap4.jpg",
    category: "Home Products",
    price: 230,
    rating: 3,
    reviews: 500,
  },


  // House Cleaning
  {
    id: 1,
    title: "Fine Dreaming Multi Purpose Cleaner Lavender",
    image: "/ho1.jpg",
    category: "House Cleaning",
    price: 490,
    rating: 4,
    reviews: 500,
  },
  {
    id: 2,
    title: "Fine Dreaming Multi Purpose Cleaner Floral ",
    image: "/ho2.jpg",
    category: "House Cleaning",
    price: 500,
    rating: 2,
    reviews: 320,
  },
  {
    id: 3,
    title: "Fine Dreaming Glass and Window",
    image: "/ho3.jpg",
    category: "House Cleaning",
    price: 550,
    rating: 4,
    reviews: 210,
  },
  {
    id: 4,
    title: "Domex Surface Cleaner Green",
    image: "/ho4.jpg",
    category: "House Cleaning",
    price: 600,
    rating: 2,
    reviews: 500,
  },
  {
    id: 5,
    title: "Harpic Bathroom Cleaner Floral",
    image: "/ho5.jpg",
    category: "House Cleaning",
    price: 700,
    rating: 3,
    reviews: 500,
  },
  // Juices
  {
    id: 1,
    title: "Nestle Fruita Vitals Chaunsa ",
    image: "/ju.jpg",
    category: "Juices",
    price: 150,
    rating: 4,
    reviews: 500,
  },
  {
    id: 2,
    title: "Nestle Red Grapes",
    image: "/ju1.jpg",
    category: "Juices",
    price: 100,
    rating: 2,
    reviews: 320,
  },
  {
    id: 3,
    title: "Nestle Nesfruta Apple 200ML",
    image: "/ju4.jpg",
    category: "Juices",
    price: 280,
    rating: 4,
    reviews: 210,
  },
  {
    id: 4,
    title: "Shezan Fruit Drink Mango 250ML",
    image: "/ju3.jpg",
    category: "Juices",
    price: 190,
    rating: 2,
    reviews: 500,
  },
  {
    id: 5,
    title: "Shezan Juice Apple 1 LTR",
    image: "/ju5.jpg",
    category: "Juices",
    price: 250,
    rating: 3,
    reviews: 500,
  },

  // Milk
   {
    id: 8,
    title: "Asli UHT Milk ",
    image: "/Mi8.jpg",
    category: "MILK",
    price: 550,
    rating: 5,
    reviews: 500,
  },
  {
    id: 9,
    title: "Prema Milk Pasteurized ",
    image: "/Mi9.jpg",
    category: "MILK",
    price: 500,
    rating: 5,
    reviews: 500,
  },
  {
    id: 10,
    title: "Good Milk ",
    image: "/Mi10.jpg",
    category: "MILK",
    price: 600,
    rating: 5,
    reviews: 500,
  },
  {
    id: 11,
    title: "Dairy Omung",
    image: "/Mi11.jpg",
    category: "MILK",
    price: 700,
    rating: 5,
    reviews: 500,
  },
  {
    id: 12,
    title: "Nestle Nesvita",
    image: "/Mi12.jpg",
    category: "MILK",
    price: 1100,
    rating: 5,
    reviews: 500,
  },


  // Skin Care
  {
    id: 8,
    title: "Ponds Facial Foam White Beauty",
    image: "/sk7.jpg",
    category: "Skin Care",
    price: 550,
    rating: 5,
    reviews: 500,
  },
  {
    id: 4,
    title: "Hemani Acne Fighting Neem Face",
    image: "/sk3.jpg",
    category: "Skin Care",
    price: 200,
    rating: 2,
    reviews: 500,
  },
  {
    id: 5,
    title: "Ponds Face Wash Pimple Clear",
    image: "/sk4.jpg",
    category: "Skin Care",
    price: 300,
    rating: 3,
    reviews: 500,
  },
  {
    id: 6,
    title: "Hemani Facewash Cucumber",
    image: "/sk5.jpg",
    category: "Skin Care",
    price:340,
    rating: 4,
    reviews: 500,
  },
  {
    id: 7,
    title: "Fair and Lovely Face Wash Max",
    image: "/sk6.jpg",
    category: "Skin Care",
    price: 340,
    rating: 3,
    reviews: 500,
  },

  // Tooth Brushes & Pastes
  {
    id: "tooth-1",
    title: "Colgate Tooth Brush Adult",
    image: "/To.jpg",
    category: "Tooth Brushes",
    price: 100,
    rating: 4,
    reviews: 500,
  },
  {
    id: "tooth-12",
    title: "Pepsodent White",
    image: "/To12.jpg",
    category: "Tooth Brushes",
    price: 120,
    rating: 5,
    reviews: 500,
  },
  {
    id: 4,
    title: "Colgate Toothpaste",
    image: "/To4.jpg",
    category: "Tooth Brushes",
    price: 150,
    rating: 2,
    reviews: 500,
  },
  {
    id: 6,
    title: "Sensodyne Toothpaste",
    image: "/To6.jpg",
    category: "Tooth Brushes",
    price: 210,
    rating: 4,
    reviews: 500,
  },
  {
    id: 8,
    title: "Doctor Toothpaste Large",
    image: "/To8.jpg",
    category: "Tooth Brushes",
    price: 550,
    rating: 5,
    reviews: 500,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

// Star Rating Component
const StarRating = ({ rating, setRating, reviews }) => {
  const handleClick = (index) => {
    // Toggle: if clicking the same star that's already selected, reset to 0
    setRating(rating === index + 1 ? 0 : index + 1);
  };

  return (
    <div className="flex items-center mt-1">
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="focus:outline-none"
            aria-label={`Rate ${index + 1} out of 5 stars`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${
                index < rating ? "text-yellow-400" : "text-gray-300"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
      <p className="text-gray-500 text-sm ml-2">({reviews} reviews)</p>
    </div>
  );
};

const Home = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalItems } = useCart();
  
  // State to manage ratings for each product
  const [productRatings, setProductRatings] = useState(
    allProducts.reduce((acc, product) => {
      acc[product.id] = product.rating;
      return acc;
    }, {})
  );

  // Function to update rating for a specific product
  const updateRating = (productId, newRating) => {
    setProductRatings(prev => ({
      ...prev,
      [productId]: newRating
    }));
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Group products by category for display
  const categories = [...new Set(allProducts.map((p) => p.category))];

  return (
    <div className="p-6 max-w-7xl mx-auto">
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

      {/* Cart Section */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            key="cart"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mb-6 bg-white p-4 rounded-lg shadow max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4">Your Order Cart</h2>
            {cart.length === 0 && <p>Your cart is empty.</p>}
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center border-b py-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
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
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold">
                    Rs. {(item.price * item.qty).toFixed(2)}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Total Price */}
            <div className="flex justify-between items-center mt-4">
              <h3 className="text-xl font-bold">Total:</h3>
              <p className="text-xl font-bold text-green-600">
                Rs. {totalPrice.toFixed(2)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products by Category */}
      {categories.map((category) => (
        <section key={category} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2">{category}</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {allProducts
              .filter((p) => p.category === category)
              .map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-2xl shadow p-4 relative cursor-pointer"
                >
                  <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md shadow-black">
                    {product.category}
                  </span>

                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <h3 className="text-lg font-semibold mt-3">{product.title}</h3>

                  {/* Star Rating Component */}
                  <StarRating 
                    rating={productRatings[product.id]} 
                    setRating={(newRating) => updateRating(product.id, newRating)}
                    reviews={product.reviews}
                  />

                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xl font-bold text-gray-900">
                      Rs.{product.price}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(product)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </section>
      ))}
    </div>
  );
};

export default Home;