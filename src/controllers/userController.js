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
        console.log('XXXXX')
    } catch (err) {
        console.log(err);
        res.render('users/register', {
            error: err.message,
            email,
            username
        });
    }
    
})

export default userController;