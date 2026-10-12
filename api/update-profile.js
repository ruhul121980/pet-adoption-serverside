//update-profile
import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.post('/update-profile', async (req, res) => {
  const {obj,type,email } = req.body; 
  const db = await connectDB(); 
  try { 
      
    let collectionName ;
    if(type == 'user'){
        collectionName = 'users'
    }else{
        collectionName = 'veterinarians'
    } 
  
    let existingUser = await db.collection(collectionName).findOne({ email , type});
    
    if (!existingUser  ) {
      return res.status(400).json({ status:400, message: 'No User Found' });
    } 
    
    if(existingUser ){ 
      //findOneAndUpdate the database 
      let updateUserData = await db.collection(collectionName).findOneAndUpdate(
        { email},
        { $set: { ...obj } },
        { returnNewDocument: true }
      );

      let updatedUser = await db.collection(collectionName).findOne({ email , type});
      res.status(200).json({ status:200, message: 'Profile updated' , data: updatedUser}); 
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
