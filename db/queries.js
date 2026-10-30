import { pool } from './pool.js';
import { prisma } from "../lib/prisma.js";

async function getData() {

  const { rows } = await pool.query("SELECT * FROM mytable");

  return rows;

};

async function createUser(username, password) {

  const user = await prisma.user.create({
    data: {
      username: `${username}`,
      password: `${password}`,
    },
  });

  console.log("Created user:", user);
  
}

async function getUser(username) {

  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  return user;
  
}

async function createPost(title, content, published, authorName) {

  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      published: published,
      authorName: authorName,
    },
  });

  console.log("Created post:", post);
  
}

async function getPosts() {

  const posts = await prisma.post.findMany();

  return posts;
  
}

async function createComment(content, authorName, postId) {

  const comment = await prisma.comment.create({
    data: {
      content: content,
      authorName: authorName,
      postId: Number(postId),
    },
  });

  console.log("Created comment:", comment);
  
}

async function getComments(postId) {

  const comments = await prisma.comment.findMany({
    where: { postId: Number(postId) },
  });

  return comments;
  
}

export default {
  createUser,
  getUser,
  getData,
  createPost,
  getPosts,
  createComment,
  getComments
};

