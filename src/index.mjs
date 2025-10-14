import express, { response } from 'express';
import { query, validationResult, body, matchedData, checkSchema } from 'express-validator';
import { createUserValidationSchema } from './utils/validationSchema.mjs';
const app = express();
app.use(express.json());

// you can call a middleware: with this -> (request, response, next) => {} (see get())
const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`); //logs the request method and the url
    next();
};

// middleware 
const resolveindexUserById = (request, response, next) => {
    const {  
                        params: { id},
                        } = request;
                        const parsedId = parseInt(id);
                        if (isNaN(parsedId)) return response.sendStatus(400);

                        const findUserIndex = mockusers.findIndex(
                            (user) => user.id === parsedId
                            );

                            if (findUserIndex === -1) return response.sendStatus(404);

                            request.findUserIndex = findUserIndex;
                            next();
                        };


app.use(loggingMiddleware); //this will use the loggingmiddleware in the below calls - global middleware


const PORT = process.env.PORT || 3000; // if env port is undefined use 3000
const mockusers = [
        {id: 1, username: "anson", displayName:"Anson"},
        {id: 2, username: "manoulakios", displayName:"Manos"},
        {id: 3, username: "markos", displayName:"Mark"}
    ];

app.get("/", 
    (request, response, next) => {
        console.log("Base URL");
        next()

    }, (request, response ) => {
    response.status(200).send({msg: "json msg Hello"});

});
// query calls filter gets validation e.g query('filter').smth.smth.smth | they dont reject the request | it is middle ware there fore it gives us an object in the request
app.get('/api/users', query('filter')
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
app.get('/api/users/:id',resolveindexUserById, (request,response) => {
    const {findUserIndex} = request;
    const findUser = mockusers[findUserIndex];
   if (!findUser) {
    return response.sendStatus(404);}
   return response.send(findUser);
});

app.get('/api/products', (request,response) => {
    response.send([
        {id: 1, name: "Chicken", price: 55}])
});


// POST request - body("target")
app.post('/api/users', checkSchema(createUserValidationSchema),
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
app.put("/api/users/:id",resolveindexUserById, (request, response) => {
        const { body, findUserIndex } = request;
                            mockusers[findUserIndex] = { id: mockusers[findUserIndex].id, ...body};
                            return response.sendStatus(200);
                            });

// PATCH - updates a part 

app.patch("/api/users/:id",resolveindexUserById, (request, response) => {
        const {  body, findUserIndex } = request;
                            mockusers[findUserIndex] = { ...mockusers[findUserIndex], ...body}; //ref3
                            return response.sendStatus(200);

                            });

// DELETE

app.delete("/api/users/:id",resolveindexUserById, (request, response) => {
    const { findUserIndex } = request;                  
    mockusers.splice(findUserIndex, 1);
    return response.sendStatus(200);                        
});















app.listen(PORT, () => {
    console.log('Running on Port ' + PORT);

});

// npm run start:dev -to start the project