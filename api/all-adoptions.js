import { Router } from 'express';
import connectDB from '../utils/db.js';
import { getFilteredPosts } from '../utils/getFilteredPosts.js';

const router = Router();

export default router.get('/all-adoptions', async (req, res) => {
      
  // Connect to  database
  const db = await connectDB(); 
  try { 
    // Check for existing acc in same db
    let usersCollection = await db.collection('users').find({}).toArray(); 
    let veterinariansCollection = await db.collection('veterinarians').find({}).toArray();

    const usersPosts = getFilteredPosts(usersCollection) //Getting Posts from users
    const vetsPosts =  getFilteredPosts(veterinariansCollection) //Getting Posts from Vets
    const allposts = [...vetsPosts,...usersPosts] // combine users posts and vets posts
    // console.log(allposts)

    res.status(200).json({ status:200, message: 'All Adopt Post' , data:allposts}); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
