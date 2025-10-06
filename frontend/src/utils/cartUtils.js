export const calculateCartTotal = (cartItems, includeTax = true) => {
    const subTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shipping = subTotal > 0 ? 5 : 0;
    const tax = includeTax ? subTotal * 0.08 : 0;
    const total = subTotal + shipping + tax;
    return {subTotal, shipping, total, tax};
}