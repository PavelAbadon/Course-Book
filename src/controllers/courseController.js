import { Router } from "express";
import { courseService } from "../services/index.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const courseController = Router();

courseController.get('/create', isAuth, (req, res) =>{
    res.render('courses/create', {pageTitle: 'Create course page'});
});

courseController.post('/create', isAuth, async (req, res) =>{
    const courseData = req.body
    const userId = req.user.id;
    
    try {
        await courseService.createCourse(courseData, userId);
        res.redirect('/courses');

    } catch (err) {
        res.render('courses/create', {
            error: getErrorMessage(err),
            course: courseData,
        });
    }
});

courseController.get('/', async(req, res) =>{
    const courses = await courseService.getAllCorses();
    //Check if there are no courses
    //const courses = [];

    res.render('courses/catalog', {courses,  pageTitle: 'Catalog page'})
});



export default courseController