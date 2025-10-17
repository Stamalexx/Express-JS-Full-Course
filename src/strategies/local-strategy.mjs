import passport from "passport";
import { Strategy } from "passport-local";
import { mockusers } from "../utils/constants.mjs";

passport.serializeUser((user, done) =>{
    console.log(`inside serialize user`);
    console.log(user);
    done(null, user.id);
});

// 

passport.deserializeUser((id, done) =>{
    console.log(`inside deserialize user`);
    console.log(`Deserializing user id: ${id}`);
    try {
        const findUser = mockusers.find((user) => user.id === id);
        if (!findUser) throw new Error("User Not Found");
        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
});

export default passport.use(
  new Strategy((username, password, done) => {
    console.log("Local Strategy callded");
    console.log(`Username: ${username}, Password: ${password}`);
    try {
      const finduser = mockusers.find(
        (u) => u.username === username
      );
      if (!finduser) {
        throw new Error("User not found");
      }

      if (finduser.password !== password) {
        throw new Error("Invalid Credentials");
      }
      done(null, finduser);
    } catch (error) {
      done(error, null);
    }
  })
);
