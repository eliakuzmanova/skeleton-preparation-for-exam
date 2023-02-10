const router = require("express").Router();

const homeController = require("../controllers/homeController")
const authController = require("../controllers/authController")

router.get("/", homeController.getHomeView)
router.get("/404", homeController.get404View)

router.get("/register", authController.getRegisterView);
router.post("/register", authController.postRegister);

router.get("/login", authController.getLoginView);
// router.post("/login", authController.postLogin);

module.exports = router