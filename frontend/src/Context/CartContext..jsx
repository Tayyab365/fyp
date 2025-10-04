import { createContext, useReducer } from "react";

export const cartContext = createContext();

const cartReducer = (state, action) => {
    switch(action.type){
        case "ADD_ITEM":
            const exists = state.find(item => item.id === action.payload.id);
        if(exists){
            return state.map(item => (
                item.id === action.payload.id ? {...item, quantity: item.quantity + 1} : item
            ))
        }else{
            return [...state, {...action.payload, quantity: 1}]
        }
        case "REMOVE_ITEM":
            return state.filter(item => item.id !== action.payload);
        case "INCREASE_QTY":
            return state.map(item => (
                item.id === action.payload
                ? {...item, quantity: item.quantity + 1 } : item
            ))
        case "DECREASE_QTY":
            return state.map(item => (
                item.id === action.payload
                ? {...item, quantity: item.quantity - 1} : item
            )).filter(item => item.quantity > 0)
        default:
            return state;
    }
}

export const CartProvider = ({children}) => {
    const [cartItems, dispatch] = useReducer(cartReducer, [])
    return (
        <cartContext.Provider value={{cartItems, dispatch}}>
            {children}
        </cartContext.Provider>
    )
}