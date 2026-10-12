import { Router } from 'express';  
import connectDB from '../utils/db.js';
import { findVetPost } from '../utils/findVetPost.js'; 
import {  getVet } from '../utils/getVet.js';
import { getAllVetPosts } from '../utils/getFilteredVetPosts.js';

 
const router = Router();

export default router.post('/ssl/success', async (req, res) => {
   
  const { amount, service_id ,user_id,session_id} =  req.query;  

  try {
    if(session_id){ 
        if(service_id){ 
            let newMeeting = {
                transactionId: session_id,
                meetingLink: '',
                meetingTime: '',
                userId: user_id, 
                amount:amount
            }
            // Connect to  database
            const db = await connectDB();
            //get vet posts
            let allVets = await db.collection('veterinarians').find({}).toArray(); 
            //filter by serviceId 
            let allVetPosts = getAllVetPosts(allVets)
            let post = findVetPost(allVetPosts,service_id)
            //add new obj into the meeting array
            newMeeting.vetId = post.vetId 
            let existingMeetingRequest = post.meeting.filter(i=> i.transactionId == newMeeting.transactionId)
            if(existingMeetingRequest.length < 1){
              post.meeting.push(newMeeting)
            }
            //find vet
            let vetDetails = getVet(allVets,post.vetId) 

            let updated_vet_posts = vetDetails.vet_posts.map(p=>{
              if(p.id == post.id){
                let newObj = {...p,...post}
                return newObj
              }else{
                return p
              }
            }) 

            //find the database 
            let updateUserData = await db.collection('veterinarians').findOneAndUpdate(
                { _id:vetDetails._id},
                { $set: { "vet_posts": updated_vet_posts } },
                { returnNewDocument: true }
              );
            res.redirect('http://localhost:3000/dashboard')
        }
    }else{
      res.status(500).json({status:500, message: 'no query received '  });
    }
  } catch (error) {
      res.status(500).json({status:500, message: error.message });
  }
});

 