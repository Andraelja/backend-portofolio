const { body } = require("express-validator");

const { prisma } = require("../../prisma/client");

const validateLogin = [
  body("username").notEmpty().withMessage("Username is diperlukan!"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Panjang password minimal 6 karakter!"),
];

module.exports = { validateLogin };
