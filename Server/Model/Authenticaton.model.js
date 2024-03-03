const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticationSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
});

// Hash Password
authenticationSchema.pre('save', async function (next) {
    const users = this;
    if (!users.isModified('password') || !users.isModified('confirmPassword')) {
        next();
    };

    try {
        const saltRound = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(users.password, saltRound);
        const hashConfirmPassword = await bcryptjs.hash(users.confirmPassword, saltRound);
        users.password = hashPassword;
        users.confirmPassword = hashConfirmPassword;
    } catch (error) {
        next(error)
    }
})

// Generate Token
authenticationSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString()
        }, process.env.JWT_SECRET_KEY,{
            expiresIn: '10d'
        })
    } catch (error) {
        console.log('JWT Error ',error);
    }
}

const user = model('user', authenticationSchema);
module.exports = user