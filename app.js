import express from 'express';
const app = express();

import * as path from 'path';
import { router } from './routes/router.js';

app.use('/css',express.static('public' +'/css'));
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
