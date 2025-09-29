import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex justify-between p-5 bg-[#0F172A] text-[#F9FAFB] hover:text-[#3B82F6]'>
        <Link to= "/" className='text-[#F9FAFB] text-lg'>My Store</Link>
        <ul>
            <li to="/" className='px-5'>Home</li>
            <li to="/contact">Contact</li>
        </ul>
    </nav>
  )
}
 
export default Navbar;