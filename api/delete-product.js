import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.post('/delete-product', async (req, res) => {
  const {id} = req.body;
  
  const db = await connectDB(); 
  try {
      
    let product = await db.collection('shop').findOne({ id});
    
    if (!product  ) {
      return res.status(400).json({ status:400, message: 'No Product Found' });
    } 
    
    if(product ){   
        let updateProduct = await db.collection('shop').findOneAndDelete(
            { id},
        );
        res.status(200).json({ status:200, message: 'Delete Product successful' }); 
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 
