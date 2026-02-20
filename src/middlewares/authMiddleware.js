import { JWT_SECRET } from "../config/constants.js";
import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next){
    const token = req.cookies['auth'];

    if(!token){
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        isAuthenticated = true;
        next();
        
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/users/login');
    }

}