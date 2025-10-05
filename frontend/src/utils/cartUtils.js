export const calculateCartTotal = (cartItems) => {
    const subTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shipping = subTotal > 0 ? 5 : 0;
    const total = subTotal + shipping;
    return {subTotal, shipping, total};
}