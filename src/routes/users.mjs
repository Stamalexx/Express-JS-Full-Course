import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { mockusers } from '../utils/constants.mjs';
import { createUserValidationSchema } from '../utils/validationSchema.mjs';
import { resolveindexUserById } from "../utils/middlewares.mjs";

const router = Router();
// query calls filter gets validation e.g query('filter').smth.smth.smth | they dont reject the request | it is middle ware there fore it gives us an object in the request

router.get("/api/users", query('filter')
    .isString()
    .notEmpty()
    .withMessage("must not be empty")
    .isLength({min: 3, max: 10})
    .withMessage("custom message"), 
    (request,response) => {
    
        const result = validationResult(request);
        console.log(result);
        const { 
            query: {filter, value},
        } = request; //de-structiruing equals to const filter = request.query.filter; const value = request.query.value;
    
        
        
        if (filter && value) {return response.send(
            mockusers.filter((user)=> user[filter].includes(value)) //ref 1
        )};
        return response.send(mockusers);
    
    
    });
router.get('/api/users/:id',resolveindexUserById, (request,response) => {
    const {findUserIndex} = request;
    const findUser = mockusers[findUserIndex];
   if (!findUser) {
    return response.sendStatus(404);}
   return response.send(findUser);
});
// POST request - body("target")
router.post('/api/users', checkSchema(createUserValidationSchema),
 (request, response) =>{
    const result = validationResult(request);
    console.log(result); // for test
    if (!result.isEmpty()) //result.isEmpty() returns true if notempty
        return response.status(400).send({errors: result.array()});
    const data = matchedData(request); // const { body } = request; //destructuring
     //testing-
    
    const newUser = {id: mockusers[mockusers.length - 1].id + 1, ...data}; //ref 2
    mockusers.push(newUser);
    return response.status(201).send(newUser);
});

//PUT request - Replace the entire resource
router.put("/api/users/:id",resolveindexUserById, (request, response) => {
        const { body, findUserIndex } = request;
                            mockusers[findUserIndex] = { id: mockusers[findUserIndex].id, ...body};
                            return response.sendStatus(200);
                            });

// PATCH - updates a part 

router.patch("/api/users/:id",resolveindexUserById, (request, response) => {
        const {  body, findUserIndex } = request;
                            mockusers[findUserIndex] = { ...mockusers[findUserIndex], ...body}; //ref3
                            return response.sendStatus(200);

                            });

// DELETE

router.delete("/api/users/:id",resolveindexUserById, (request, response) => {
    const { findUserIndex } = request;                  
    mockusers.splice(findUserIndex, 1);
    return response.sendStatus(200);                        
});
export default router;