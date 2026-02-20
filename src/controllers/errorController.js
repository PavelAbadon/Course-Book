import { Router } from "express";

const errorController = Router();

errorController.all('/*path', (req, res) =>{
    res.render('404', {pageTitle: 'Not Found Page'});
})

export default errorController;