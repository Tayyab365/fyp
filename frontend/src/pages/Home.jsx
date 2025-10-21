import React from "react";
import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import ProductCategory from "../components/home/ProductCategory";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/home/Footer";

const Home = () => {
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Hero />
      <FeaturedProducts />
      <ProductCategory />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
