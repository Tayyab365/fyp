import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import About from './pages/About';
import Cart from './pages/Cart';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/shop' element = {<Shop/>}/>
        <Route path='/contact' element = {<ContactUs/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/cart' element = {<Cart/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App