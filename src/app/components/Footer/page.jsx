"use client";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative mt-20 text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]" />
      <div className="absolute inset-0 backdrop-blur-md bg-white/5" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 z-10"
      >
        {/* Logo / About */}
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent tracking-wide">
            Mubashir Shopify
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed">
            Discover the best fashion, electronics & lifestyle products. Trusted by thousands worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-pink-400 mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-300">
            <li><a href="/deliverto" className="hover:text-pink-400 hover:pl-2 transition-all duration-300">Deliver To</a></li>
            <li><a href="/account" className="hover:text-pink-400 hover:pl-2 transition-all duration-300">Login Account</a></li>
            <li><a href="/addToCart" className="hover:text-pink-400 hover:pl-2 transition-all duration-300">Add To Cart</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold text-pink-400 mb-4">Customer Service</h3>
          <ul className="space-y-3 text-gray-300">
            <li><a href="#" className="hover:text-pink-400 hover:pl-2 transition-all duration-300">FAQs</a></li>
            <li><a href="#" className="hover:text-pink-400 hover:pl-2 transition-all duration-300">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-pink-400 hover:pl-2 transition-all duration-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-pink-400 hover:pl-2 transition-all duration-300">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter + Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-pink-400 mb-4">Stay Connected</h3>
          <p className="text-gray-300 mb-4">Subscribe for exclusive offers & news.</p>
          <form className="flex items-center mb-5">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-lg bg-white/10 border border-pink-400/40 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/60 outline-none text-white placeholder-gray-300 transition"
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-r-lg font-semibold transition"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4">
            {[
              { icon: <FaFacebookF />, link: "https://www.facebook.com/profile.php?id=61576103787032" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="p-3 bg-pink-500/20 border border-pink-500 rounded-full 
                           hover:bg-pink-600 hover:scale-110 hover:shadow-[0_0_20px_#ec4899] 
                           transform transition-all duration-300"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

    
      {/* Bottom */}
      <div className="relative border-t border-gray-700 text-center py-6 text-gray-400 text-sm z-10">
        © {new Date().getFullYear()} <span className="text-pink-400 font-semibold">Mubashir Shop</span> | Secure Payments • Trusted Worldwide
      </div>
    </footer>
  );
}
