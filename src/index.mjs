import express, { response } from 'express';
import routes from "./routes/index.mjs";
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(routes);


const PORT = process.env.PORT || 3000; // if env port is undefined use 3000

app.get("/", (request, response ) => {
    response.cookie("Maincookie", "world", {maxAge: 6000 * 60 * 2});
    response.status(200).send({msg: "json msg Hello"});

});




app.listen(PORT, () => {
    console.log('Running on Port ' + PORT);

});

// npm run start:dev -to start the project