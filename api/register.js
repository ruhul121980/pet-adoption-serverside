import { Router } from 'express';
import connectDB from '../utils/db.js';

const router = Router();

export default router.post('/register', async (req, res) => {
    console.log('req body is ',req.body)
  const { firstName, lastName, email, password, phoneNumber, address, type } = req.body;

  // Connect to  database
  const db = await connectDB(); 
  try {
    // Validate type parameter (optional)
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
    console.log("found collectionName ", collectionName)
 
    // Check for existing acc in another db
    let checkUser = await db.collection(otherCollection).findOne({ email });
    if (checkUser) {
      return res.status(400).json({ status:400, message: 'Account already exists in - '+ otherCollection });
    }
    console.log("Found User ",checkUser)

    // Check for existing acc in same db
    let existingUser = await db.collection(collectionName).findOne({ email });
    console.log("Found existingUser ",existingUser)
    if (existingUser) {
      return res.status(400).json({ status:400, message: 'Account already exists' });
    } 
   

    // Insert user/veterinarian data to the collection
    const result = await db.collection(collectionName).insertOne({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      type,
      posts : [],
      ...(type === 'veterinarian' && { license: req.body.license }), // Add license for veterinarian
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

 
