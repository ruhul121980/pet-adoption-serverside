import { Router } from 'express';  
import  SSLCommerzPayment from 'sslcommerz-lts'
import { generateTransactionId } from '../utils/transactionIdGenerator.js';

const store_id = 'rah66ad240da872c'
const store_passwd = 'rah66ad240da872c@ssl'
const is_live = false //true for live, false for sandbox


const router = Router();

export default router.get('/ssl-get-orders', async (req, res) => {
  //  console.log('ssl get orders ')
  const { amount ,user_id} =  req.query; 
  const tran_id = generateTransactionId();
  try {
    if(amount  && user_id){
        const data = {
            total_amount: amount,
            currency: 'BDT',
            tran_id: tran_id ,  
            success_url: `http://localhost:4000/api/ssl/success-order?session_id=${tran_id}&amount=${amount}&user_id=${user_id}`,
            fail_url: 'http://localhost:4000/api/ssl/fail-order',
            cancel_url: 'http://localhost:4000/api/ssl/fail-order',
            // ipn_url: 'http://localhost:3000/ipn',
            shipping_method: 'Courier', 
            product_name: 'demo.',
            product_category: 'Accessories',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        // console.log(" get sslcz ",sslcz)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            console.log(apiResponse.sessionkey)
            let GatewayPageURL = apiResponse.GatewayPageURL
            // res.redirect(GatewayPageURL)
            console.log('Redirecting to: ', GatewayPageURL)
            res.status(200).json({status:200, message: 'session url created', url: GatewayPageURL, sessionId: tran_id });
        });
       // https://sandbox.sslcommerz.com/gwprocess/v4/gw.php?
    //    Q=REDIRECT
    //    &cardname=visacard
    //    &SESSIONKEY=ED4816447D7C69EAE2E5A97F788CBCF0
    //    &tran_type=success  
      }else{
      res.status(500).json({status:500, message: 'no value received '  });
    }
  } catch (error) {
    // console.log(error)
      res.status(500).json({status:500, message: 'Stripe session error' + error.message });
  }


});

 