import { Router } from "express";
import { courseService } from "../services/index.js";


const homeController = Router();

homeController.get('/', async(req, res) => {
    const latestCourses = await courseService.getLatest();
    res.render('home', {latestCourses, pageTitle: 'Home page'} );
})

export default homeController;