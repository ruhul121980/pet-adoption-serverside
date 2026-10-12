 
import { Router } from 'express';  
import connectDB from '../utils/db.js';
import { ObjectId } from 'mongodb';
import { checkTransactionId } from '../utils/MatchTransactionId.js';
 
const router = Router();

export default router.post('/ssl/success-order', async (req, res) => {
  const { session_id,amount,user_id} =  req.query; 
  try {
    if(session_id){ 
        const session = session_id;
        if(session){ 
            let newOrder = {
                transaction_id: session_id,
                userId: user_id,
                total_amount: amount,
                checkout: true,
                orderCompleted: false,  
                cart: []
            }
            // Connect to  database
            const db = await connectDB();
            let user
            let id = user_id
 
            
            const _id = new ObjectId(id);
            let userDB = 'users'
            user = await db.collection(userDB).findOne({ _id }) ;
            if(!user){
              userDB = 'veterinarians'
              user = await db.collection(userDB).findOne({ _id }) ;
            }
 
            let checkId = checkTransactionId(user.order || [], newOrder.transaction_id)
            // console.log("Checking ID ",checkId)
            if (checkId) {
              res.status(200).json({status:200, message: 'Already Order confirmed ',data:user  });
            } else {
              //check user order.transaction_id
              //get all carts and calculate total amount, match with the amount , 
              newOrder.cart = user.cart 
              //update  order = order.push(newOrder)
              if(user.order){
                user.order.push(newOrder)
              }else{
                user.order = []
                user.order.push(newOrder)

              }
   
              const NewOrderList = user.order
              // console.log(" all order now ", NewOrderList)
              //find and update user data 
              let updateUserData = await db.collection(userDB).findOneAndUpdate(
                  { _id },
                  { $set: { "cart": [], "order": NewOrderList } },
                  { returnNewDocument: true }
                );
                // console.log(" update response ", updateUserData)
                res.redirect('http://localhost:3000/dashboard')
              
            }
        }
    }else{
      res.status(500).json({status:500, message: 'no query received '  });
    }
  } catch (error) {
      res.status(500).json({status:500, message: error.message });
  }
});

 