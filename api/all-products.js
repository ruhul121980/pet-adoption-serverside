//veterinarian
import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.get('/all-products', async (req, res) => {
  // Connect to  database
  const db = await connectDB(); 
  try { 
    let all_products = await db.collection('shop').find({}).toArray();
    
    res.status(200).json({ status:200, message: 'All products Data Found' , all_products:all_products}); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
