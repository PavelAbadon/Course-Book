import { Router } from "express";
import { userService } from "../services/index.js";

const userController = Router();

//Register Logic
//First get Register View
userController.get('/register', (req, res) => {
    res.render('users/register');
});
//Second post Register data - * must async/await because we are making a request
userController.post('/register', async (req, res) =>{
    const {email, password, rePassword, username} = req.body;

    try {
        await userService.register(email, password, rePassword, username);
        res.redirect('/');
        
    } catch (err) {
        res.render('users/register', {
            error: err.message,
            email,
            username
        });
    }
    
});

//Login Logic
userController.get('/login', (req, res) =>{
    res.render('users/login');
});
userController.post('/login', async (req, res) => {
    const{email, password} = req.body;

    const token = await userService.login(email, password);
    res.cookie('auth', token);   
    res.redirect('/');
    
})

export default userController;