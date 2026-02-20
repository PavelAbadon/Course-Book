import { Router } from "express";

const courseController = Router();

courseController.get('/create', (req, res) =>{
    res.render('courses/create', {pageTitle: 'Create course page'});
})

export default courseController