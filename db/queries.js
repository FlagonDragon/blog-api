import { pool } from './pool.js';
import { prisma } from "../lib/prisma.js";

async function getData() {

  const { rows } = await pool.query("SELECT * FROM mytable");

  return rows;

};

async function getPosts() {

  const posts = await prisma.post.findMany();

  return posts;
  
}

export default { 
  getData,
  getPosts
};

