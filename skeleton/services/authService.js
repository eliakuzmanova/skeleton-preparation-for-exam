const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = (username, email, password, repeatPassword) => { 
    const hashPassword = bcrypt.hash(password);

    //TODO Error Handling
    const existingUser = this.findUser(username, email)
//TODO Error Handling
    if (existingUser) {
        return
        //throw new Error
    }
   return User.create({username, email, hashPassword})
};

exports.findUser = (username, email) => User.findOne({$or: [{username}, {email}]});