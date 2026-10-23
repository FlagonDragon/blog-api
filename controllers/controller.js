import db from '../db/queries.js';
import bcrypt from "bcryptjs";

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

function homeGet(req, res) {

    res.send('Homepage');

};

async function infoGet(req, res) {

    const data = await db.getData();
    
    res.render("homeView", {data: data});

};

async function usersGet(req, res) {

  return res.send(Object.values(users));
  
};

function userIdGet(req, res) {

  return res.send(users[req.params.userId]);

};

async function postsGet(req, res) {

  const posts = await db.getPosts();

  console.log(posts);

  return res.send(posts);

};

function postIdGet(req, res) {

  return res.send(users[req.params.userId]);

};

async function signUpPost(req, res) {

  const { username, password } = req.body;

  console.log('body: ');

  console.log(req.body);

  console.log(username, password);
  
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.createUser(username, hashedPassword);

  res.redirect("/");

  return res.send("all's well");

};

async function logInGet(req, res) {

  const user = await db.getUser('hey');

  return res.send(user);

};

export default {
    homeGet,
    infoGet,
    usersGet,
    userIdGet,
    postsGet,
    postIdGet,
    signUpPost,
    logInGet
};