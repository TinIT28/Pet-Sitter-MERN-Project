const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        public_id: String,
        url: String,
    },
    species: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Pet', petSchema);