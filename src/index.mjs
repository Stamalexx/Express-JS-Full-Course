import express, { response } from 'express';

const app = express();
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
















app.listen(PORT, () => {
    console.log('Running on Port ' + PORT);

});

// npm run start:dev -to start the project