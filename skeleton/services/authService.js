const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt  = require("../utils/jsonwebtoken");
const SECRET = require("../utils/secret");

exports.register = async (username, email, password) => {

    const hashPassword = await bcrypt.hash(password, 10);
    

    //TODO Error Handling
    const existingUser = await this.findUser(username, email)
//TODO Error Handling
    if (existingUser) {
        throw "Existing user"
        return
        //throw new Error
    }
   return await User.create({username, email, password: hashPassword})

};

exports.findUser = (username, email) => User.findOne({$or: [{username}, {email}]});

exports.findUserByEmail = (email) => User.findOne({email})

exports.login = async(req,res ,email, password) => {

    const existingUser = await this.findUserByEmail(email);

   if(!existingUser) {
    throw "Indvalid user"
    //TODO handle error
   }
  
   const isValid = await bcrypt.compare(password, existingUser.password)

   if(!isValid){
    //TODO handle error
    throw "Indvalid password"
   }

   res.user = existingUser
   res.isAuthenticated = true;

   const payload = {
    userId: existingUser._id,
     userEmail: existingUser.email
    }

   const token = await jwt.sign(payload,SECRET);

   res.cookie("auth", token)
   return token
}