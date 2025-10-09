import express, { response } from 'express';

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000; // if env port is undefined use 3000
const mockusers = [
        {id: 1, username: "anson", displayName:"Anson"},
        {id: 2, username: "manoulakios", displayName:"Manos"},
        {id: 3, username: "markos", displayName:"Mark"}
    ];
app.get("/", (request, response ) => {
    response.status(200).send({msg: "json msg Hello"});

});

app.get('/api/users', (request,response) => {
    // const getquery = request.query; //gets { filter: 'username', value: 'an'} || /users?filter=username&value=an 


    const { 
        query: {filter, value},
    } = request; //de-structiruing equals to const filter = request.query.filter; const value = request.query.value;

    
    
    if (filter && value) {return response.send(
        mockusers.filter((user)=> user[filter].includes(value)) //ref 1
    )};
    return response.send(mockusers);


});
app.get('/api/users/:id', (request,response) => {
    const paramsObj = request.params; // gives an object json type e.g {id: '1'}
    const parsedId = parseInt(paramsObj.id);
    if (isNaN(parsedId)){
        return response.status(400).send({msg: 'Bad request'}); //error 400 bad request
    };

    const findUser = mockusers.find((user) => user.id === parsedId);

   if (!findUser) {
    return response.sendStatus(404);}

   return response.send(findUser);
});

app.get('/api/products', (request,response) => {
    response.send([
        {id: 1, name: "Chicken", price: 55}])
});


// POST request 
app.post('/api/users', (request, response) =>{
    const { body } = request; //destructuring
    const newUser = {id: mockusers[mockusers.length - 1].id + 1, ...body}; //ref 2
    mockusers.push(newUser);
    return response.status(201).send(newUser);
});



//PUT request - Replace the entire resource
app.put("/api/users/:id", (request, response) => {
        const { 
                body, 
                        params: { id},
                        } = request;
                        const parsedId = parseInt(id);
                        if (isNaN(parsedId)) return response.sendStatus(400);

                        const findUserIndex = mockusers.findIndex(
                            (user) => user.id === parsedId
                            );

                            if (findUserIndex === -1) return response.sendStatus(404);

                            mockusers[findUserIndex] = { id: parsedId, ...body};
                            return response.sendStatus(200);

                            });
})

// PATCH - updates a part 















app.listen(PORT, () => {
    console.log('Running on Port ' + PORT);

});

// npm run start:dev -to start the project