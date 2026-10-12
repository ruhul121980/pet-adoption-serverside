import { Router } from 'express';
import connectDB from '../utils/db.js';
import { hashPassword } from '../utils/hash.js';

const router = Router();

export default router.post('/register', async (req, res) => {
  
  const { firstName, lastName, email, password, phoneNumber, address, type } = req.body;

  // Connect to  database
  const db = await connectDB(); 
  try {
    if (!type || (type !== 'user' && type !== 'veterinarian')) {
      return res.status(400).json({ message: 'Invalid user type' });
    } 

    // Choose collection by type
    let collectionName ,otherCollection;

    if(type == 'user'){
        collectionName = 'users'
        otherCollection = 'veterinarians'
    }else{
        collectionName = 'veterinarians'
        otherCollection = 'users'
    }

    // Check for existing acc in another db
    let checkUser = await db.collection(otherCollection).findOne({ email });

    if (checkUser) {
      return res.status(400).json({ status:400, message: 'Account already exists in - '+ otherCollection });
    }

    // Check for existing acc in same db
    let existingUser = await db.collection(collectionName).findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ status:400, message: 'Account already exists' });
    } 
    
   //hashing password
    let hashedpwd = await hashPassword(password)
    
    const result = await db.collection(collectionName).insertOne({
      firstName,
      lastName,
      email,
      password:hashedpwd,
      // pwd:password,//to store real password
      phoneNumber,
      address,
      type,
      posts : [],
      ...(type === 'veterinarian' && { license: req.body.license,vet_posts:[] }), 
    });
    if(result.acknowledged){
      let userData = await db.collection(collectionName).findOne({ email })

      res.status(200).json({ status:200, message: 'Registration successful' ,data:userData}); 
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 
