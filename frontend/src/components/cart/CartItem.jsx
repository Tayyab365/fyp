import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";

const CartItem = ({ item }) => {
  const { dispatch } = useContext(cartContext);

  const removeItem = () => {
    dispatch({ type: "REMOVE_ITEM", payload: item._id });
  };

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between 
                 bg-[var(--bg-card)] rounded-lg shadow-md p-4 mb-4 
                 border border-[var(--border-color)] transition-colors duration-300"
    >
      <div className="flex-shrink-0 mb-3 md:mb-0 md:mr-4 w-24 h-24">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      <div className="flex-1 text-center md:text-left mb-3 md:mb-0">
        <h3 className="text-md font-semibold text-[var(--text-primary)] mb-1">
          {item.name}
        </h3>
        <p className="text-[var(--accent-blue)] font-bold text-lg">
          ${item.price}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              dispatch({ type: "DECREASE_QTY", payload: item._id })
            }
            className="w-7 h-7 flex items-center justify-center 
                       bg-[var(--bg-elevated)] rounded hover:bg-[var(--border-color)] 
                       transition text-[var(--text-primary)]"
          >
            -
          </button>

          <input
            type="text"
            value={item.quantity}
            readOnly
            className="w-10 text-center border border-[var(--border-color)] rounded 
                       bg-[var(--bg-section-dark)] text-[var(--text-primary)] 
                       focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
          />

          <button
            onClick={() =>
              dispatch({ type: "INCREASE_QTY", payload: item._id })
            }
            className="w-7 h-7 flex items-center justify-center 
                       bg-[var(--bg-elevated)] rounded hover:bg-[var(--border-color)] 
                       transition text-[var(--text-primary)]"
          >
            +
          </button>
        </div>

        <button
          onClick={removeItem}
          className="px-3 py-1 rounded-lg bg-red-500 text-white 
                     font-semibold hover:bg-red-600 transition text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
