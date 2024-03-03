const userModel = require("../Model/Authenticaton.model");
const bcryptjs = require('bcryptjs');

// Register Controller
const register = async (req, res) => {
    try {
        const { userName, email, password, confirmPassword } = req.body;

        const userExist = await userModel.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: 'User Already Exist with this email'
            })
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password Does Not Match'
            })
        }

        const registeredUser = await userModel.create({
            userName,
            email,
            password,
            confirmPassword
        })

        res.status(201).json({
            success: true,
            message: 'Registration Successfull',
            registeredUser
        })
        console.log('Registered');

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await userModel.findOne({ email });

        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found',
            })
        }

        const comparePassword = await bcryptjs.compare(password, userExist.password);

        if (!comparePassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Login Successfull",
                token: await userExist.generateToken(),
                userId: userExist._id
            })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

// To get the data of verified user
const getUserProfile = async (req, res) => {
    try {
        const userData = req.user;
        console.log('Verified User : ', userData);

        const token = req.token;
        console.log('Token profile: ', token);

        return res.status(200).json({
            verifiedUser: userData,
            success: true,
            message: 'User Verified'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Unable to getProfile',
            success: false,
            error: error.message
        })
    }
}
module.exports = { register, login, getUserProfile }