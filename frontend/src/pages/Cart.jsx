import React, { useContext } from 'react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { cartContext } from '../Context/CartContext.';

const Cart = () => {
  const {cartItems} = useContext(cartContext);
  return (
    <div className='pt-28 px-4 max-w-7xl mx-auto'>
      <div className="flex flex-col md:flex-row md:gap-6">
        <div className="flex-1 space-y-4">
          {cartItems.map(item => (
            <CartItem key={item.id} item = {item}/>
          ))}
        </div>

        <div className="md:w-80 flex-shrink-0">
          <CartSummary />
        </div>
      </div>
    </div>

  );
};

export default Cart;
