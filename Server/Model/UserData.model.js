const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const userData = new Schema({
    userName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
});

const data = model('data', userData);
module.exports = data;