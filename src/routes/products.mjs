import { Router } from "express";
const router = Router();

router.get('/api/products', (request,response) => {
    
    console.log(request.cookies);
    response.send([
        {id: 1, name: "Chicken", price: 55}])
});
export default router;