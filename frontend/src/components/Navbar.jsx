import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex justify-between p-6 text-xl font-bold'>
        <Link to= "/">My Store</Link>
        <div>
            <Link to="/" className='px-5'>Home</Link>
            <Link to="/contact">Contact</Link>
        </div>
    </nav>
  )
}
 
export default Navbar;