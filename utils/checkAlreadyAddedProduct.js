export const checkAlreadyAddedProduct = (cart,product)=>{
    if(cart?.length){
        return cart.findIndex(item => item.id === product.id) !== -1;
    }else{
        return null
    }
}