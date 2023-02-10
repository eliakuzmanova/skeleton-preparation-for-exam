const validator = require('validator')
const authService = require("../services/authService")

exports.getRegisterView = (req, res) => {
    res.render("auth/register")
}

exports.postRegister = async (req, res) => {
 const {username, email, password, repeatPassword} = req.body

 //TODO : Error handling
    validator.isStrongPassword(password)
//TODO : Error handling
    if (password !== repeatPassword) {
        res.redirect("/404")
    }

    await authService.register(username, email, password)
    res.redirect("/login")
}

exports.getLoginView = (req, res) => {
    res.render("auth/login")
}

// exports.postLogin = (req, res) => {

// }