const validator = require('validator')
const authService = require("../services/authService")

exports.getRegisterView = (req, res) => {
    res.render("auth/register")
}

exports.postRegister = async (req, res) => {
    const { username, email, password, repeatPassword } = req.body


    try {
        if(!username) {
            throw Error("Username is required")
        }

        if(!email) {
            throw Error("Email is required")
        }
        if(!password) {
            throw Error("Password is required")
        }
        if(!repeatPassword) {
            throw Error("Confirm password is required")
        }
        const validPass = validator.isStrongPassword(password)
        if (!validPass) {
            throw Error("Not enough strong password")
        }

        if (password !== repeatPassword) {
            throw Error("Passwords missmatch")
        }

        await authService.register(username, email, password)

        const token = await authService.login(req, res, email, password)
        res.cookie("auth", token)
        res.redirect("/")
    } catch (err) {
        res.status(404).render("auth/register", { errors: err });
    };


}

exports.getLoginView = (req, res) => {
    res.render("auth/login")
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body
    //TODO ERORR HANDLIN
    try {
        const token = await authService.login(req, res, email, password)
        res.cookie("auth", token)
        res.redirect("/")
    } catch (err) {
        return res.status(404).render("auth/login", { errors: err });
    }
}


exports.getLogout = (req, res) => {
    res.clearCookie("auth")
    res.redirect("/")
}