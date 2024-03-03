const jwt = require('jsonwebtoken');
const userModel = require('../Model/Authenticaton.model');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        console.log('Authorized Token : ', token);

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Token not provided"
            })
        }

        const jwtToken = token.replace('Bearer ', '');
        console.log('Trimmed Token : ', jwtToken);

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        const userData = await userModel.findOne({ _id: isVerified.userId });

        req.user = userData;
        req.token = token;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token', error: error.message
        });
    }
}

module.exports = verifyToken;