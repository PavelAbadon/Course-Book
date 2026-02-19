import User from "../models/user.js";

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