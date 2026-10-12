//veterinarian
import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.get('/all-users', async (req, res) => {
  // Connect to  database
  const db = await connectDB(); 
  try { 
    let allUsers = await db.collection('users').find({}).toArray();
    
    res.status(200).json({ status:200, message: 'All Users Data Found' , allUsers:allUsers}); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
