const validator = require('validator')
const authService = require("../services/authService")

exports.getRegisterView = (req, res) => {
    res.render("auth/register")
}

exports.postRegister = async (req, res) => {
 const {username, email, password, repeatPassword} = req.body

 //TODO : Error handling
 try{
    const validPass = validator.isStrongPassword(password)
   
 } catch(err){
    throw Error(err.message)
 }
//TODO : Error handling
    if (password !== repeatPassword) {
        throw "Passwords missmatch"
    }
console.log("before registration");
    try{
        await authService.register(username, email, password)
    } catch (err) {
        throw err.message
    }
    console.log("after registration");

    try{
        console.log("before login");
        const token = await authService.login(req, res ,email , password)
        res.cookie("auth", token)
        res.redirect("/")
        console.log("after login");
    } catch (err) {
        throw err.message
        
    }
    

}

exports.getLoginView = (req, res) => {
    res.render("auth/login")
}

exports.postLogin = async(req, res) => {
    const {email, password} = req.body
//TODO ERORR HANDLING
  const token = await authService.login(req, res ,email , password)
  res.cookie("auth", token)
    res.redirect("/")
}

exports.getLogout = (req, res) => {
    res.clearCookie("auth")
    res.redirect("/")
}