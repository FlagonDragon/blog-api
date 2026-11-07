import { router } from '../routes/router';

import request from "supertest";
import express from 'express';
const app = express();

import { prisma } from "../lib/prisma";

app.use(express.urlencoded({ extended: false }));
app.use("/", router);

// run with NODE_OPTIONS=--experimental-vm-modules npx jest tests/ from root terminal

beforeEach(async () => {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.post.deleteMany(),
    prisma.comment.deleteMany(),
  ]);
});

test("sign up works", done => {
  request(app)
    .post("/sign-up")
    .type("form")
    .send({ username: "user1", password: "123" })
    .expect({ message: "User created succesfully!" }, done);
});

//--------------------------------------

// test("index route works", done => {
//   request(app)
//     .get("/")
//     .expect("Content-Type", /json/)
//     .expect({ name: "frodo" })
//     .expect(200, done);
// });

// test("testing route works", done => {
//   request(app)
//     .post("/test")
//     .type("form")
//     .send({ item: "hey" })
//     .then(() => {
//       request(app)
//         .get("/test")
//         .expect({ array: ["hey"] }, done);
//     });
// });