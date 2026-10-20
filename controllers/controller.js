import db from '../db/queries.js';

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

export default {
    homeGet,
    infoGet,
    usersGet,
    userIdGet,
    postsGet,
    postIdGet
};