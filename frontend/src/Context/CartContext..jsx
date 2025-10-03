import { createContext, useState } from "react";

export const cartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    return(
        <cartContext.Provider value={{cartItems, setCartItems}}>
            {children}
        </cartContext.Provider>
    )
}