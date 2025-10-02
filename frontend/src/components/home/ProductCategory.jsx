import React from 'react';
import { Link } from 'react-router-dom';
import laptopImage from '../../assets/categories images/laptop.jpg';
import keyboardImage from '../../assets/categories images/keyboard.jpg';
import mouseImage from '../../assets/categories images/mouse.jpg';
import headsetImage from '../../assets/categories images/headset.jpg';

const ProductCategory = () => {

  const categories = [
    {id: 1, name: "laptop", image: laptopImage},
    {id: 2, name: "keyboard", image: keyboardImage},
    {id: 3, name: "mouse", image: mouseImage},
    {id: 4, name: "headset", image: headsetImage}
  ]

  return (
    <div className='bg-[#F8FAFC]'>
      <h1 className='text-center text-4xl font-bold text-[#1E293B] mb-12'>Explore Categories</h1>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4'>
        {categories.map(item => (
          <div key={item.id} className='bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer transition'>
          <img
          src={item.image}
          alt=""
          className='h-20 w-20 object-cover rounded-md mb-4'/>
          <h3 className='text-lg font-semibold text-[#1E293B]'>{item.name}</h3>
        </div>
        ))}
      </div>
      <div className='py-12 text-center'>
        <Link to="/shop" className='px-6 py-2 bg-[#2563EB] rounded-lg text-white font-semibold shadow hover:bg-[#1D4ED8] transition'>Explore more categories</Link>
      </div>
    </div>
  )
}

export default ProductCategory;
