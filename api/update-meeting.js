//update-meeting 
import { Router } from 'express';
import connectDB from '../utils/db.js'; 
import { updateVetPosts } from '../utils/updatedVetPosts.js';

const router = Router();

export default router.post('/update-meeting', async (req, res) => {
  const {email,vetPostID,meetForm,i} = req.body; 
  const db = await connectDB(); 
  try { 
       
    let existingUser = await db.collection('veterinarians').findOne({ email });
    
    if (!existingUser  ) {
      return res.status(400).json({ status:400, message: 'No User Found' });
    }  
    if(existingUser ){  
        let vet_posts = updateVetPosts(existingUser.vet_posts, vetPostID, meetForm, i) 
        //findOneAndUpdate the database 
        let updateUserData = await db.collection('veterinarians').findOneAndUpdate(
            { email},
            { $set: { vet_posts} },
            { returnNewDocument: true }
        );
    
        res.status(200).json({ status:200, message: 'Meet updated' }); 
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
