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

courseController.get('/:id/details', async(req, res) =>{
    const courseId = req.params.id;
    const userId = req.user?.id;
    const course = await courseService.getOneById(courseId);
    const isOwner = course.owner.equals(userId);
    const signedData = course.signed.map(signed => signed.username).join(', ');

    res.render('courses/details', {course, isOwner, signedData, pageTitle: 'Details page'})
});

courseController.get('/:id/signed', isAuth, async(req, res) => {
    const courseId = req.params.id;
    const userId = req.user.id;

    await courseService.signedCourse(courseId, userId);
    console.log('sucsesfull sign');

    res.redirect(`/courses/${courseId}/details`);
});



export default courseController