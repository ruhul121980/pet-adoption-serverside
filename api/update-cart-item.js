//update-cart-item
import { Router } from 'express';
import connectDB from '../utils/db.js';
import { updateCartProduct } from '../utils/getUpdatedCart.js';

const router = Router();

export default router.post('/update-cart-item', async (req, res) => {
    console.log('req body is ',req.body)
  const {user_email, product,user_type  } = req.body;

  // Connect to  database
  const db = await connectDB(); 
  try { 
    let user ,userDB 
    if(user_type == 'user'){
      userDB = 'users'
      user = await db.collection(userDB).findOne({email:user_email }) ;
    }else{
      userDB = 'veterinarians'
      user = await db.collection(userDB).findOne({email:user_email }) ;
    } 

    const updatedCart = updateCartProduct(user.cart, product)
    
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

 
