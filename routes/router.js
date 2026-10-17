import Router from 'express';
import controller from '../controllers/controller.js';
const router = Router();

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

router.get("/", controller.homeGet);

router.get("/info", controller.infoGet);

router.get('/users', (req, res) => {
  return res.send(Object.values(users));
});

router.get('/users/:userId', (req, res) => {
  return res.send(users[req.params.userId]);
});


export {
    router
};
