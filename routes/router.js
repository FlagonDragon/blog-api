import Router from 'express';
import controller from '../controllers/controller.js';
const router = Router();

router.get("/", controller.homeGet);

router.get("/info", controller.infoGet);



export {
    router
};
