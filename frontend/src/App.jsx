import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import About from './pages/About';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Products from './pages/dashboard/Products';
// import Orders from './pages/dashboard/Orders';
// import Users from './pages/dashboard/Users';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<><Navbar/><Home/></>}/>
        <Route path='/shop' element = {<><Navbar /><Shop /></>}/>
        <Route path='/contact' element = {<><Navbar /><Contact /></>}/>
        <Route path='/about' element = {<><Navbar /><About /></>}/>
        <Route path='/cart' element = {<><Navbar /><Cart /></>}/>
        <Route path='/product-details/:id' element = {<><Navbar /><ProductDetails /></>}/>
        <Route path='/checkout' element = {<><Navbar /><Checkout /></>}/>
        <Route path='order-success' element = {<><Navbar /><OrderSuccess /></>}/>
        
        <Route path='/dashboard' element = {<DashboardLayout/>}>
          <Route index element = {<DashboardHome/>}/>
          <Route path='products' element={<Products/>}/>
          {/* <Route path="orders" element={<Orders />}/> */}
          {/* <Route path="users" element={<Users />}/> */}
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App