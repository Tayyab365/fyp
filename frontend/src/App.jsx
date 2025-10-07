import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import Navbar from './components/common/Navbar';
import Shop from './pages/Shop';
import About from './pages/About';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

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
        <Route path='/product-details/:id' element = {<ProductDetails/>}/>
        <Route path='/checkout' element = {<Checkout/>}/>
        <Route path='order-success' element = {<OrderSuccess/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App