//veterinarian
import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.get('/all-vets', async (req, res) => {
  // Connect to  database
  const db = await connectDB(); 
  try { 
    let allVets = await db.collection('veterinarians').find({}).toArray();
    
    res.status(200).json({ status:200, message: 'All Vets Data Found' , allVets:allVets}); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
