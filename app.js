import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import jwtStrategy from "./strategies/jwt.js";

passport.use(jwtStrategy);

import * as path from 'path';
import { router } from './routes/router.js';

const app = express();

app.use('/css',express.static('public' +'/css'));
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.post("/login", (req, res) => {
    let { email, password } = req.body;
    //This lookup would normally be done using a database
    if (email === "paul@nanosoft.co.za") {
        if (password === "pass") { //the password compare would normally be done using bcrypt.
            const opts = {}
            opts.expiresIn = 120;  //token expires in 2min
            const secret = "SECRET_KEY" //normally stored in process.env.secret
            const token = jwt.sign({ email }, secret, opts);
            return res.status(200).json({
                message: "Auth Passed",
                token
            })
        }
    }
    return res.status(401).json({ message: "Auth Failed" })
});

app.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).send("YAY! this is a protected Route")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
