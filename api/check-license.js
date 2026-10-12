//license
import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.post('/check-license', async (req, res) => { 
  const {email } = req.body;
 
  const db = await connectDB(); 
  try {  
    let collectionName = 'veterinarians'
    
    let user = await db.collection(collectionName).findOne({ email }); 
    res.status(200).json({ status:200, message: 'License', data: user.approved });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
