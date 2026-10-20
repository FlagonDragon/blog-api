import Router from 'express';
import controller from '../controllers/controller.js';
const router = Router();

router.get("/", controller.homeGet);

router.get("/info", controller.infoGet);

router.get('/users', controller.usersGet);

router.get('/users/:userId', controller.userIdGet);

router.get('/posts/', controller.postsGet);

router.get('/posts/:postId', controller.postIdGet);

export {
    router
};
