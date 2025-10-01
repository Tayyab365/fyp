import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ProductCategory from '../components/home/ProductCategory';

const Home = () => {
  return (
    <div>
        <Hero/>
        <FeaturedProducts/>
        <ProductCategory/>
    </div>
  )
}

export default Home;