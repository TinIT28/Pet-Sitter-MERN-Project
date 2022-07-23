const mongoose = require('mongoose');
var id = require("nodejs-unique-numeric-id-generator");
mongoose.plugin(require('mongoose-nanoid'));

const petSchema = new mongoose.Schema({
    _id: false,
    name: {
        type: String,
        required: true,
    },
    image: {
        public_id: String,
        url: String,
    },
    city: {
        type: String,
        required: true,
    },
    species: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    addressReunited: {
        type: String,
    }, 
    areaLost: {
        type: String,
    },
    areaFound: {
        type: String,
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
    dateLost: {
        type: Date,
    },
    dateFound: {
        type: Date,
    },
    dateReunited: {
        type: Date,
    },
    phone: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

petSchema.plugin(require('mongoose-nanoid'))
module.exports = mongoose.model('Pet', petSchema);