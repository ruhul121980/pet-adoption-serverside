//update-order 
import { Router } from 'express';
import connectDB from '../utils/db.js'; 
import { checkAndUpdateUserOrder, combineAllUsersOrders } from '../utils/combineAllOrders.js';

const router = Router();

export default router.post('/update-order', async (req, res) => {
    const {order } = req.body; 
    // console.log(" order body ", order)
    const db = await connectDB(); 
    try {  
        const allUsers = await db.collection('users').find().toArray();
        
        const userEmailandOrder = checkAndUpdateUserOrder(allUsers,order)
        //findOneAndUpdate the database 
        let updateUserData = await db.collection('users').findOneAndUpdate(
            { email: userEmailandOrder.email},
            { $set: { "order": userEmailandOrder.order } },
            { returnNewDocument: true }
        );
        //  console.log(" updated order ", updateUserData)
        const updatedUsers = await db.collection('users').find().toArray();
        let allOrders = combineAllUsersOrders(updatedUsers) 

        res.status(200).json({ status:200, message: 'All orders Data Found' , data:allOrders}); 
     
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

 
