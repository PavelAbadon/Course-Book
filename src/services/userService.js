import User from "../models/user.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";

export async function register(email, password, rePassword, username) {

    const user = await User.findOne({ email });

    if (user) {
        throw new Error('User with this email already exists');
    }

    if (password !== rePassword) {
        throw new Error('Password must match');
    }

    const newUser = await User.create({
        email,
        password,
        username
    });

    return newUser;
}

export async function login(email, password) {
    const user = await User.findOne({email});
    //Validate if user exists    
    if(!user){
        throw new Error('User with such email does not exist');
    }

    //Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
        throw new Error('Wrong Password');
    }

    //Create token
    const payload = {
        username: user.username,
        email:user.email,
        id: user.id,
    }
    const token = jwt.sign(payload, "tovaEsecretZASTOTOeNAslokavica", {expiresIn: '2h'});
    return token;
}