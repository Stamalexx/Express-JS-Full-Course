import express, { request, response } from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockusers } from "./utils/constants.mjs";
import passport from "passport";
import "./strategies/local-strategy.mjs";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "password",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    }, // 1hour
  })
);

app.use(passport.initialize());
app.use(passport.session());
// use middleware before routes
app.use(routes);

const PORT = process.env.PORT || 3000; // if env port is undefined use 3000

app.get("/", (request, response) => {
  response.cookie("Maincookie", "world", { maxAge: 6000 * 60 * 2 });
  request.session.visited = true;
  response.status(200).send({ msg: "json msg Hello" });
});

app.post(
  "/api/auth",
  passport.authenticate("local"),
  (request, response) => {
    response.sendStatus(200);
  }
);

// app.post('/api/auth', (request, response) => {
//     const { body: { username, password },
//  } = request;
//     const findUser = mockusers.find(
//         (user) => user.username === username
//     );
//     if (!findUser || findUser.password !== password)
//         return response.status(401).send({ msg: "BAD CREDITIANLS"});
//     request.session.user = findUser;
//     return response.status(200).send(findUser);

// });

app.get("/api/auth/status", (request, response) => {
  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send({ msg: "Not authenticated" });
});
app.post("/api/auth/logout", (request, response) => {
    if (!request.user) return response.sendStatus(401);
    request.logout((err) => {
        if (err) return response.sendStatus(400);
        response.send(200);

    });
});
// check if authorized if yes adds an item in the cart
app.post("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  const { body: item } = request;
  const { cart } = request.session;

  if (cart) {
    cart.push(item);
  } else {
    request.session.cart = [item];
  }
  return response.status(201).send(item);
});

app.get("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  return response.send(request.session.cart ?? []);
});

app.listen(PORT, () => {
  console.log("Running on Port " + PORT);
});

// npm run start:dev -to start the project
