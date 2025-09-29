import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between bg-[#0F172A] text-white px-6 py-4'>
      <NavLink to="/" className="text-xl font-bold">My Store</NavLink>
      <ul className='hidden md:flex space-x-6'>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "text-[#3B82F6] font-semibold" : "hover:text-[#3B82F6]"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/shop" 
            className={({ isActive }) => 
              isActive ? "text-[#3B82F6] font-semibold" : "hover:text-[#3B82F6]"
            }
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              isActive ? "text-[#3B82F6] font-semibold" : "hover:text-[#3B82F6]"
            }
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive ? "text-[#3B82F6] font-semibold" : "hover:text-[#3B82F6]"
            }
          >
            About
          </NavLink>
        </li>
      </ul>
      <div className='flex items-center space-x-4'>
        <input
          type="text"
          placeholder='Search'
          className='hidden md:block px-3 py-1 rounded text-black'
        />
        <NavLink to="/cart" className="relative">🛒</NavLink>
        <NavLink 
          to="/login" 
          className={({ isActive }) =>
            isActive 
              ? "bg-blue-700 px-3 py-1 rounded" 
              : "bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
          }
        >
          Login
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar;
