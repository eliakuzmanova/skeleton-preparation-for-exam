const mongoose = require('mongoose');

//TODO: check requires and make configurations <-----

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        unique: true
    },
    email: {
        type: String,
        required: true,
        validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;