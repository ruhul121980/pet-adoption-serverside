 
import { Router } from 'express';   
 
const router = Router();

export default router.post('/ssl/fail-order', async (req, res) => {
    res.redirect('http://localhost:3000/dashboard')
});

 