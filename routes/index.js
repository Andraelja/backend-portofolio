const express = require("express");

const router = express.Router();

const loginController = require("../controllers/LoginController");
const homeController = require("../controllers/HomeController");
const userController = require("../controllers/UserController");
const portofolioController = require("../controllers/PortofolioController");
const registerController = require('../controllers/RegisterController');
const skillController = require('../controllers/SkillController');

const { validateLogin } = require("../utils/validators/auth");

router.post("/login", validateLogin, loginController.login);
router.post("/register", validateLogin, registerController.register);

// Home
router.get("/home", homeController.findHome);
router.post("/home", homeController.createHome);
router.get("/home/:id", homeController.findHomeById);
router.put("/home/:id", homeController.updateHome);
router.delete("/home/:id", homeController.deleteHome);

// user
router.get("/user", userController.findUser);
router.post("/user", userController.createUser);
router.get("/user/:id", userController.findUserById);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

// Portofolio
router.get("/portofolio", portofolioController.findPortofolio);
router.post("/portofolio", portofolioController.createPortofolio);
router.get("/portofolio/:id", portofolioController.findPortofolioById);
router.put("/portofolio/:id", portofolioController.updatePortofolio);
router.delete("/portofolio/:id", portofolioController.deletePortofolio);

// Skill
router.get("/skill", skillController.findSkill);
router.post("/skill", skillController.createSkill);
router.get("/skill/:id", skillController.findSkillById);
router.put("/skill/:id", skillController.updateSkill);
router.delete("/skill/:id", skillController.deleteSkill);

module.exports = router;
