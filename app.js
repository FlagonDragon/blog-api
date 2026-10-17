import express from 'express';
import cors from 'cors';

import * as path from 'path';
import { router } from './routes/router.js';

const app = express();

app.use('/css',express.static('public' +'/css'));
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

// Define allowed origins
const allowedOrigins = ['http://http://localhost.com'];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Apply CORS middleware
app.use(cors(corsOptions));

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
