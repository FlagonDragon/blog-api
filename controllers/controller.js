import db from '../db/queries.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

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

async function createPostPost(req, res) {

  const { title, content, published, authorName } = req.body;

  try {

    await db.createPost(title, content, published, authorName);

    res.status(200).json({ message: "Post created succesfully!" })

  } catch(error) {

    return res.status(500).json({ error });

  }

};

async function postsGet(req, res) {

  const posts = await db.getPosts();

  console.log(posts);

  return res.send(posts);

};

async function postIdGet(req, res) {

  const { postId } = req.params;

  const comments = await db.getComments(postId);

  return res.send(comments);

};

async function createCommentPost(req, res) {

  const { content, authorName, postId } = req.body;

  try {

    await db.createComment(content, authorName, postId);    

    res.status(200).json({ message: "Comment created succesfully!" });

  } catch(error) {

    return res.status(500).send(error);

  }

};

async function signUpPost(req, res) {

  const { username, password } = req.body;

  console.log('body: ');

  console.log(req.body);

  console.log(username, password);
  
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.createUser(username, hashedPassword);

  res.status(200).json({ message: "User created succesfully!" });

};

async function logInGet(req, res) {

  const user = await db.getUser('hey');

  return res.send(user);

};

async function logInPost(req, res) {

  let { username, password } = req.body;

  const user = await db.getUser(username);

  if (user != null && username === user.username) {

    const match = await bcrypt.compare(password, user.password);

    if (match) { 

      const opts = {}
      opts.expiresIn = 120;  //token expires in 2min
      const secret = "SECRET_KEY" //normally stored in process.env.secret
      const token = jwt.sign({ username }, secret, opts);

      return res.status(200).json({
        message: "Auth Passed",
        username,
        token
      });

    }
  }
  
  return res.status(401).json({ message: "Auth Failed" });

};

async function protectedGet(req, res) {

  return res.status(200).json({ 
    message: "Accessed protected route succesfully!" 
  });

};




export default {
  homeGet,
  infoGet,
  usersGet,
  userIdGet,
  createPostPost,
  postsGet,
  postIdGet,
  createCommentPost,
  signUpPost,
  logInGet,
  logInPost,
  protectedGet
};