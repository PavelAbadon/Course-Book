import { Router } from "express";
import { courseService } from "../services/index.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const courseController = Router();

courseController.get('/create', isAuth, (req, res) =>{
    res.render('courses/create', {pageTitle: 'Create course page'});
})

courseController.post('/create', isAuth, async (req, res) =>{
    const courseData = req.body
    const userId = req.user.id;
    console.log(courseData);
    console.log(userId);
    console.log('до тук стигаме')

    try {
        await courseService.createCourse(courseData, userId);
        console.log('Защо не стига до тук');
        res.redirect('/');

    } catch (err) {
        res.render('courses/create', {
            error: getErrorMessage(err),
            course: courseData,
        });
    }
})

export default courseController