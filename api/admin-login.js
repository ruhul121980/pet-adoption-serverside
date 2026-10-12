import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.post('/admin-login', async (req, res) => { 
  const {email, password } = req.body;

  // Connect to  database
  const db = await connectDB(); 
  try { 
    // Choose collection by type
    let collectionName = 'admin' ;
      
    let existingUser = await db.collection(collectionName).findOne({ email });
    
    if (!existingUser  ) {
      return res.status(500).json({ status:500, message: 'Admin Email Not Found' });
    } 
    
    if(existingUser ){ 
       
      if(password == existingUser.password){
        res.status(200).json({ status:200, message: 'Login successful' ,data:existingUser}); 
      }else{
        res.status(500).json({ message: 'Admin Password Not Match!' });
      }
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
