import { JWT_SECRET } from "../config/constants.js";
import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next){
    const token = req.cookies['auth'];
    req.isAuthenticated = false;
    res.locals.isAuthenticated = false;

    if(!token){
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        
        req.user = decodedToken;
        //Add user data to handlebars context
        req.isAuthenticated = true;
        res.locals.isAuthenticated = true;
        
        next();
        
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/users/login');
    }

}

export function isAuth (req, res, next){
    if(!req.isAuthenticated){
       return res.redirect('/users/login');
    }

    next();

}

export function isGuest (req, res, next){
    if(req.isAuthenticated){
       return res.redirect('/');
    }

    next();
}