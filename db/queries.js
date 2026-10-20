import { pool } from './pool.js';
import { prisma } from "../lib/prisma.js";

async function getData() {

  const { rows } = await pool.query("SELECT * FROM mytable");

  return rows;

};



export default { 
  getData 
};

