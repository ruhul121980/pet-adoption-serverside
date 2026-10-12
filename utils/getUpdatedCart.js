export const getUpdatedCart = (cart,product)=>{
    if(cart?.length){
      // Check if product exists in cart
      const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
      // If product exists, return original cart
      if (existingProductIndex !== -1) {
      return cart;
      }
      // If product doesn't exist, create a copy of cart and add product
      return [...cart, product];

    }else{
      // If product doesn't exist, create a copy of cart and add product
      return [product];
    }

}
export const removeItemFromCart = (cart,product)=>{
    // Check if product exists in cart
    const productIndex = cart.findIndex(item => item.id === product.id);

  // If product exists, remove it and return a new cart
  if (productIndex !== -1) {
    return cart.filter((item, index) => index !== productIndex);
  }

  // If product doesn't exist, return the original cart
  return cart;
}

export const updateCartProduct = (cart, product, updateIndex = -1) => {
  // Validate updateIndex (optional)
  if (updateIndex !== -1 && (updateIndex < 0 || updateIndex >= cart.length)) {
    throw new RangeError('Invalid updateIndex. Must be a valid index within the cart.');
  }

  // Find product using ID or index
  const productIndex = updateIndex !== -1 ? updateIndex : cart.findIndex(item => item.id === product.id);

  // Check if product exists
  if (productIndex === -1) {
    throw new Error('Product not found in the cart.');
  }

  // Update product data
  cart[productIndex] = { ...cart[productIndex], ...product };

  // Return updated cart
  return cart;
};
