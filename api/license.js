//license
import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.post('/license', async (req, res) => { 
  const {email } = req.body;
 
  const db = await connectDB(); 
  try {  
    let collectionName = 'veterinarians'
    
    let user = await db.collection(collectionName).findOne({ email });
    let updatedUser = await db.collection(collectionName).findOneAndUpdate(
        { email } ,
        { $set: { "approved": !user.approved } },
        { returnNewDocument: true }
    );
    
    res.status(200).json({ status:200, message: 'User Approved updated' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
