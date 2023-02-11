const SECRET = require("../utils/jsonwebtoken");
const jwt = require("../utils/jsonwebtoken");

exports.authentication = (req, res, next) => {

    const token = req.cookies["auth"]

    if (token) {
        try {
            const decodedToken = jwt.verify(token, SECRET);
            req.user = decodedToken
            // req.isAuthenticated = true;
        } catch (err) {
            res.clearCookie("auth")
            return res.status(401).render("home/404")
        }
    }
    next();
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        res.redirect("/login")
    }

    next();
};