import db from '../db/queries.js';
import bcrypt from "bcryptjs";

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

    res.status(200).json({ message: "Comment created succesfully!" })

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

    res.status(200).json({ message: "Comment created succesfully!" })

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
    createPostPost,
    postsGet,
    postIdGet,
    createCommentPost,
    signUpPost,
    logInGet,
};