import { Router } from "express";
import { userService } from "../services/index.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";

const userController = Router();

//Register Logic
//First get Register View
userController.get('/register', isGuest, (req, res) => {
    res.render('users/register');
});
//Second post Register data - * must async/await because we are making a request
userController.post('/register', isGuest, async (req, res) =>{
    const {email, password, rePassword, username} = req.body;

    try {
        const token = await userService.register(email, password, rePassword, username);
        res.cookie('auth', token);
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
userController.get('/login', isGuest, (req, res) =>{
    res.render('users/login');
});
userController.post('/login', isGuest, async (req, res) => {
    const{email, password} = req.body;

    const token = await userService.login(email, password);
    res.cookie('auth', token);   
    res.redirect('/');
    
});

userController.get('/logout', isAuth, async (req, res) =>{
    res.clearCookie('auth');
    res.redirect('/');
})

export default userController;