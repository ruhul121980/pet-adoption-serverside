import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.post('/update-stock', async (req, res) => {
  const {id} = req.body;
  
  const db = await connectDB(); 
  try {
      
    let product = await db.collection('shop').findOne({ id});
    
    if (!product  ) {
      return res.status(400).json({ status:400, message: 'No Product Found' });
    } 
    
    if(product ){   
        let updateProduct = await db.collection('shop').findOneAndUpdate(
            { id},
            { $set: { "inStock": !product.inStock} },
            { returnNewDocument: true }
        );
        res.status(200).json({ status:200, message: 'Update successful' }); 
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 
