import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser'; 

dotenv.config()

import allVets from './api/all-vets.js'; 
import loginRouter from './api/login.js';
import myVisits from './api/my-visits.js'; 
import allUsers from './api/all-users.js'; 
import addToCart from './api/add-to-cart.js'; 
import getMyCart from './api/get-my-cart.js'; 
import getMyOrder from './api/get-my-order.js'; 
import registerRouter from './api/register.js';
import all_products from './api/all-products.js'; 
import uploadImgRouter from './api/upload-image.js';
import createProduct from './api/create-product.js'; 
import adminLoginRouter from './api/admin-login.js';
import sslSuccess from './api/ssl-success.js'; 
import createVetPost from './api/create-vet-post.js';
import getCartDetails from './api/get-cart-details.js'; 
import updateCartItem from './api/update-cart-item.js'; 
import allVetPostsRouter from './api/all-vet-posts.js';
import allAdoptionsRouter from './api/all-adoptions.js';
import removeItemFromCart from './api/remove-from-cart.js'; 
import createAdoptionRouter from './api/create-adoption.js';
import sslSuccessOrder from './api/ssl-success-order.js';
import updateProfile from './api/update-profile.js';
import updateMeeting from './api/update-meeting.js';
import updateStock from './api/update-stock.js';
import deleteProduct from './api/delete-product.js';
import updateProduct from './api/update-product.js';
import ban from './api/ban.js';
import license from './api/license.js';
import checkLicense from './api/check-license.js';
import allOrders from './api/all-orders.js';
import updateOrders from './api/update-order.js';
import sslGetOrders from './api/ssl-get-orders.js';
import sslFailOrder from './api/ssl-fail-order.js';
import sslVetPayment from './api/ssl-get.js';


const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json({ limit: '50mb' }));

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.use('/api', allVets); 
app.use('/api', myVisits); 
app.use('/api', allUsers); 
app.use('/api', addToCart); 
app.use('/api', getMyCart); 
app.use('/api', getMyOrder); 
app.use('/api', loginRouter);
app.use('/api', all_products); 
app.use('/api', sslSuccess);
app.use('/api', createProduct); 
app.use('/api', createVetPost);
app.use('/api', updateCartItem); 
app.use('/api', getCartDetails); 
app.use('/api', registerRouter);
app.use('/api', uploadImgRouter);
app.use('/api', adminLoginRouter);
app.use('/api', allVetPostsRouter);
app.use('/api', removeItemFromCart); 
app.use('/api', allAdoptionsRouter);
app.use('/api', sslSuccessOrder); 
app.use('/api', createAdoptionRouter);
app.use('/api', updateProfile);
app.use('/api', updateMeeting);
app.use('/api', updateStock);
app.use('/api', deleteProduct);
app.use('/api', updateProduct);
app.use('/api', ban);
app.use('/api', license);
app.use('/api', checkLicense);
app.use('/api', allOrders);
app.use('/api', updateOrders);
app.use('/api', sslGetOrders);
app.use('/api', sslFailOrder);
app.use('/api', sslVetPayment);

const port = process.env.PORT || 4000; 
app.listen(port, () => console.log(`Server listening on port ${port}`));
