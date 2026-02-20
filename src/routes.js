import { Router } from "express";
import homeController from "./controllers/homeControler.js";
import errorController from "./controllers/errorController.js";
import userController from "./controllers/userController.js";
import courseController from "./controllers/courseController.js";

const routes = Router();

routes.use(homeController);
routes.use('/users', userController);
routes.use('/courses', courseController);

//Last Controller is ErrorController
routes.use(errorController);

export default routes;