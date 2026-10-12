//update-product
import { Router } from 'express';
import connectDB from '../utils/db.js'; 

const router = Router();

export default router.post('/update-product', async (req, res) => {
  const {product} = req.body;
  
  const db = await connectDB(); 
  try {
      
    let update = await db.collection('shop').findOneAndUpdate(
        {   id:product.id},
        {   $set: { ...product} },
        {   returnNewDocument: true }
    );
     
    res.status(200).json({ status:200, message: 'Update Product successful' }); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 
