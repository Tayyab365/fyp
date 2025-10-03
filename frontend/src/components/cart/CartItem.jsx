import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext.";

const CartItem = ({item}) => {

  const {cartItems, setCartItems} = useContext(cartContext);

  const increaseQuantity = () => {
    setCartItems(
      cartItems.map(i => (
      i.id === item.id ? {...i, quantity: i.quantity + 1} : i
      ))
    )
  }

  const decreaseQuantity = () => {
    setCartItems(
      cartItems.map(
        d => d.id === item.id ? {...d, quantity: d.quantity - 1} : d)
        .filter(d => d.quantity > 0)
    )
  }

  const removeItem = () => {
    const updatedCart = cartItems.filter(i => i.id !== item.id);
    setCartItems(updatedCart);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
      <div className="flex-shrink-0 mb-3 md:mb-0 md:mr-4 w-24 h-24">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain rounded-md"/>
      </div>
      <div className="flex-1 text-center md:text-left mb-3 md:mb-0">
        <h3 className="text-md font-semibold text-gray-900 mb-1">{item.title}</h3>
        <p className="text-[#2563EB] font-bold text-lg">${item.price}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex items-center gap-1">
          <button onClick={decreaseQuantity} className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition">
            -
          </button>
          <input
            type="text"
            value={item.quantity}
            readOnly
            className="w-10 text-center border rounded focus:outline-none focus:ring-2 focus:ring-[#2563EB]"/>
          <button onClick={increaseQuantity} className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition">
            +
          </button>
        </div>
        <button onClick={removeItem} className="px-3 py-1 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition text-sm">
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
