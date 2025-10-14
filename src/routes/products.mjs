import { Router } from "express";
const router = Router();

router.get('/api/products', (request,response) => {
    response.send([
        {id: 1, name: "Chicken", price: 55}])
});
export default router;