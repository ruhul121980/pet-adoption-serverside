import { Router } from 'express';
import connectDB from '../utils/db.js'; 
import { combineAllUsersOrders } from '../utils/combineAllOrders.js';

const router = Router();

export default router.get('/all-orders', async (req, res) => {
  // Connect to  database
  const db = await connectDB(); 
  try { 
    let allUsersData = await db.collection('users').find().toArray();
    // console.log(" allUsersData ",allUsersData)
    let allOrders = combineAllUsersOrders(allUsersData)
    // console.log(" allOrders ",allOrders)
    res.status(200).json({ status:200, message: 'All orders Data Found' , data:allOrders}); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 