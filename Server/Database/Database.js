const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Connection Establilshed');
    } catch (error) {
        console.log('Unable to Connect to database');
    }
}

module.exports = connectToDatabase;