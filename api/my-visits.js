import { Router } from 'express';  
import connectDB from '../utils/db.js';
import { getAllVetPosts, getFilteredVetPosts } from '../utils/getFilteredVetPosts.js';

const router = Router();

export default router.get('/my-visits', async (req, res) => {
   
  const { user_id} =  req.query; 
  try { 

    const db = await connectDB();

    let veterinariansCollection = await db.collection('veterinarians').find({}).toArray();

    const allVetsPosts =  getFilteredVetPosts(veterinariansCollection)

    res.status(200).json({status:200, message: 'My Visits Data ', vets: allVetsPosts  });
    
  } catch (error) {
      res.status(500).json({status:500, message: error.message });
  }
});

 