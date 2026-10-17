import { pool } from './pool.js';

async function getData() {

  const { rows } = await pool.query("SELECT * FROM mytable");

  return rows;

};



export default { 
  getData 
};

