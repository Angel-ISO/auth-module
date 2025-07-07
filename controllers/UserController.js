import User from '../entities/User.js';
import { generateToken, verifyToken } from '../utils/JwtUtils.js';



export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'All fields are required'
            });
        }

        
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({
                status: 'error',
                message: 'Username or email already exists'
            });
        }

        
        const newUser = new User({ firstName, lastName, username, email, password });
        await newUser.save();

        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'User registration failed',
            error: error.message
        });
    }
};


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-password'); 
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'User found successfully',
            user
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch user',
            error: error.message
        });
    }
};



export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Username and password are required'
            });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid username or password'
            });
        }

        const token = generateToken(user); 

        return res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Failed to login user',
            error: error.message
        });
    }
};


export const logoutUser = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'No token provided'
            });
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid token'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'User logged out successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Failed to logout user',
            error: error.message
        });
    }
};  
