// remove-from-cart 
import { Router } from 'express';
import connectDB from '../utils/db.js';  
import { removeItemFromCart } from '../utils/getUpdatedCart.js';

const router = Router();

export default router.get('/remove-from-cart', async (req, res) => {
    const { product_id, user_type, user_email} =  req.query; 

    // Connect to  database
    const db = await connectDB(); 
    try { 
      let product = await db.collection('shop').findOne({id:product_id}) ;

      let user ,userDB 
      if(user_type == 'user'){
        userDB = 'users'
        user = await db.collection(userDB).findOne({email:user_email }) ;
      }else{
        userDB = 'veterinarians'
        user = await db.collection(userDB).findOne({email:user_email }) ;
      } 

      const updatedCart = removeItemFromCart(user.cart, product)
      
      //findOneAndUpdate the database 
      let updateUserData = await db.collection(userDB).findOneAndUpdate(
        { _id:user._id},
        { $set: { "cart": updatedCart } },
        { returnNewDocument: true }
      );

      res.status(200).json({ status:200, message: 'All OK' , data: updateUserData}); 
      

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

 
