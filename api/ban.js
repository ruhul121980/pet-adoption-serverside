import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.post('/ban', async (req, res) => { 
  const {email, type } = req.body;
 
  const db = await connectDB(); 
  try {  
    let collectionName = 'users' ;
    if(type !== 'user'){
        collectionName = 'veterinarians'
    }
      
    let user = await db.collection(collectionName).findOne({ email });
    let updatedUser = await db.collection(collectionName).findOneAndUpdate(
        { email } ,
        { $set: { "banned": !user.banned } },
        { returnNewDocument: true }
    );
    
    res.status(200).json({ status:200, message: 'User Ban updated' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
