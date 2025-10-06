import { createContext, useEffect, useReducer } from "react";

export const cartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type){
        case "ADD_ITEM":
            const exists = state.find(item => item.id === action.payload.id)
            if(exists){
                return state.map(item => (
                    item.id === action.payload.id
                    ? {...item, quantity: item.quantity + (action.payload.quantity || 1)}
                    : item
                ))
            }else{
                return [...state, {...action.payload, quantity: action.payload.quantity || 1}]
            }
        case "INCREASE_QTY":
            return state.map(item => (
                item.id === action.payload
                ? {...item, quantity: item.quantity + 1}
                : item
            ))
        case "DECREASE_QTY":
            return state.map(item => (
                item.id === action.payload
                ? {...item, quantity: item.quantity - 1 }
                : item
            )).filter(item => item.quantity > 0)
        case "REMOVE_ITEM":
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}

export const CartProvider = ({children}) => {
    const initialState = JSON.parse(localStorage.getItem("cartItems")) || [];
    const [cartItems, dispatch] = useReducer(cartReducer, initialState);
    useEffect(() => (
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    ), [cartItems])
    return (
        <cartContext.Provider value={{cartItems, dispatch}}>
            {children}
        </cartContext.Provider>
    )
}