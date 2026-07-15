import { Router } from 'express';
import connectDB from '../utils/db.js';
<<<<<<< HEAD
import { hashPassword } from '../utils/hash.js';
=======
>>>>>>> e1d2019ae53c767628e5d7324646d34bdcae68e1

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
<<<<<<< HEAD


   //hashing password
    let hashedpwd = await hashPassword(password)

    console.log("hashpwd ", hashedpwd)
=======
   

>>>>>>> e1d2019ae53c767628e5d7324646d34bdcae68e1
    // Insert user/veterinarian data to the collection
    const result = await db.collection(collectionName).insertOne({
      firstName,
      lastName,
      email,
<<<<<<< HEAD
      password:hashedpwd,
      pwd:password,
=======
      password,
>>>>>>> e1d2019ae53c767628e5d7324646d34bdcae68e1
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

 
