import { Router } from 'express';
import connectDB from '../utils/db.js';
<<<<<<< HEAD
import { comparePasswords } from '../utils/hash.js';
=======
>>>>>>> e1d2019ae53c767628e5d7324646d34bdcae68e1

const router = Router();

export default router.post('/login', async (req, res) => {
    console.log('req body is ',req.body)
  const {email, password,type } = req.body;

  // Connect to  database
  const db = await connectDB(); 
  try {
    // Validate type parameter (optional)
    if (!type || (type !== 'user' && type !== 'veterinarian')) {
      return res.status(400).json({ message: 'Invalid user type' });
    } 

    // Choose collection by type
    let collectionName ;
    if(type == 'user'){
        collectionName = 'users'
    }else{
        collectionName = 'veterinarians'
    }
    console.log("found collectionName ", collectionName)
 
    // Check for existing acc in same db
<<<<<<< HEAD
    let existingUser = await db.collection(collectionName).findOne({ email , type});
    
    if (!existingUser  ) {
      return res.status(400).json({ status:400, message: 'No User Found' });
    } 
    
    if(existingUser ){ 
      //comparing passwords with existing hash password
      let compare = await comparePasswords(password,existingUser.password)
      if(compare){
        res.status(200).json({ status:200, message: 'Login successful' ,data:existingUser}); 
      }else{
        res.status(500).json({ message: 'User Password Not Matched !' });
      }
=======
    let existingUser = await db.collection(collectionName).findOne({ email ,password, type});
    console.log("Found existingUser ",existingUser)
    if (!existingUser) {
      return res.status(400).json({ status:400, message: 'No User Found' });
    } 
   
    if(existingUser){ 
      res.status(200).json({ status:200, message: 'Login successful' ,data:existingUser}); 
>>>>>>> e1d2019ae53c767628e5d7324646d34bdcae68e1
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
