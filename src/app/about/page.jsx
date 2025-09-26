
"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaUsers, FaLightbulb } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Mubashar Shop
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 0.6 }}
          className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg"
        >
          Welcome to <span className="font-semibold text-blue-600">Shop Sage</span> – 
          your trusted online shopping destination in Pakistan.  
          We are passionate about delivering the best products with 
          convenience, trust, and style.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="leading-relaxed text-gray-700 space-y-4"
          >
            <p>
              Shop Sage was created with one mission: to make online shopping 
              simple, affordable, and reliable for everyone. From household 
              essentials to lifestyle products, we bring everything under one roof.
            </p>
            <p>
              We are committed to offering top-quality products at competitive 
              prices while ensuring a seamless and secure shopping experience.
            </p>
            <p>
              Every product is carefully curated and verified to match our 
              standards of quality and value. At Shop Sage, customer happiness 
              always comes first.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition"
          >
            <h3 className="text-2xl font-semibold mb-3 text-blue-700">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              To redefine online shopping in Pakistan by offering premium products, 
              unbeatable value, and a customer-first experience.
            </p>
            <h3 className="text-2xl font-semibold mb-3 text-indigo-700">Our Vision</h3>
            <p className="text-gray-600">
              To be the go-to e-commerce brand in Pakistan, trusted by thousands 
              for quality, affordability, and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
          >
            Our Values
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <FaStar className="text-blue-600 text-5xl mx-auto mb-4" />,
                title: "Quality",
                desc: "Every product is checked and tested to make sure you get only the best.",
              },
              {
                icon: <FaUsers className="text-blue-600 text-5xl mx-auto mb-4" />,
                title: "Customer First",
                desc: "Our customers are at the heart of everything we do. Your happiness is our priority.",
              },
              {
                icon: <FaLightbulb className="text-blue-600 text-5xl mx-auto mb-4" />,
                title: "Innovation",
                desc: "We keep improving and introducing new features to make your shopping smarter.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-white border shadow-md hover:shadow-2xl backdrop-blur-sm transition transform hover:-translate-y-2"
              >
                {value.icon}
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">
          {[
            { num: "10K+", label: "Happy Customers" },
            { num: "500+", label: "Products" },
            { num: "99%", label: "Satisfaction Rate" },
            { num: "24/7", label: "Support" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.15 }}
              className="transform transition"
            >
              <h3 className="text-4xl font-bold drop-shadow-md">{stat.num}</h3>
              <p className="mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center py-20"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Shop with Us?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
          Explore our wide range of products and enjoy fast delivery, 
          great deals, and a shopping experience like never before.
        </p>
        <a
          href="/beverages"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition"
        >
          Start Shopping
        </a>
      </motion.section>
    </div>
  );
}
