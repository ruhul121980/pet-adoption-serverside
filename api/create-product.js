//create-product
import { Router } from 'express';
import connectDB from '../utils/db.js';
import { ObjectId } from 'mongodb';

const router = Router();

export default router.post('/create-product', async (req, res) => {
    const {product } = req.body;
    const newObjectId = new ObjectId(); 
    const db = await connectDB(); 
    try { 
        let productInsertRespoonse = await  db.collection('shop').insertOne({_id: newObjectId , ...product})
        res.status(200).json({ status: 200, message: 'Create Product successful', data: productInsertRespoonse });         

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

 
