//veterinarian
import { Router } from 'express';
import connectDB from '../utils/db.js';
import { getFilteredVetPosts } from '../utils/getFilteredVetPosts.js';

const router = Router();

export default router.get('/all-vet-posts', async (req, res) => {
      
  // Connect to  database
  const db = await connectDB(); 
  try { 
    let veterinariansCollection = await db.collection('veterinarians').find({}).toArray();
    
    const allVetsPosts =  getFilteredVetPosts(veterinariansCollection) //Getting Posts from Vets

    res.status(200).json({ status:200, message: 'All VET Posts' , data:allVetsPosts}); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
