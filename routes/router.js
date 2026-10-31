import Router from 'express';
import passport from 'passport';
import controller from '../controllers/controller.js';
const router = Router();

router.get("/", controller.homeGet);

router.get("/info", controller.infoGet);

router.get('/users', controller.usersGet);

router.get('/users/:userId', controller.userIdGet);

router.get('/posts/', controller.postsGet);
// https://blog-api-iv3t.onrender.com/posts

router.get('/posts/:postId', controller.postIdGet);

router.post('/sign-up', controller.signUpPost);

router.get('/log-in', controller.logInGet);
router.post('/log-in', controller.logInPost);

router.post('/createPost', passport.authenticate('jwt', { session: false }), controller.createPostPost);

router.post('/postStatus', passport.authenticate('jwt', { session: false }), controller.postStatusPost);

router.post('/createComment', passport.authenticate('jwt', { session: false }), controller.createCommentPost);

router.post('/deleteComment', passport.authenticate('jwt', { session: false }), controller.deleteCommentPost);

router.get('/protected', passport.authenticate('jwt', { session: false }), controller.protectedGet);



export {
    router
};
