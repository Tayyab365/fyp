import React from 'react';
import { Link } from 'react-router-dom';
import laptopImage from '../../assets/categories images/laptop.jpg';
import keyboardImage from '../../assets/categories images/keyboard.jpg';
import mouseImage from '../../assets/categories images/mouse.jpg';
import headsetImage from '../../assets/categories images/headset.jpg';

const ProductCategory = () => {
  const categories = [
    { id: 1, name: "Laptop", image: laptopImage },
    { id: 2, name: "Keyboard", image: keyboardImage },
    { id: 3, name: "Mouse", image: mouseImage },
    { id: 4, name: "Headset", image: headsetImage }
  ];

  return (
    <div className="bg-[#F8FAFC] py-6 px-4">
      {/* Heading */}
      <h1 className="text-center text-2xl md:text-3xl font-bold text-[#1E293B] mb-10">
        Explore Categories
      </h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {categories.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md p-5 flex flex-col items-center justify-center cursor-pointer transition-transform hover:-translate-y-1"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 md:h-20 md:w-20 object-cover rounded-md mb-3"
            />
            <h3 className="text-sm md:text-base font-semibold text-[#1E293B]">
              {item.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="pt-10 text-center">
        <Link
          to="/shop"
          className="px-5 py-2 text-sm md:text-base bg-[#2563EB] rounded-lg text-white font-medium shadow hover:bg-[#1D4ED8] transition"
        >
          Explore More Categories
        </Link>
      </div>
    </div>
  );
};

export default ProductCategory;
