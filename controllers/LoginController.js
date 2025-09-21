const express = require("express");

const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const prisma = require("../prisma/client");

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validasi error!",
      errors: errors.array(),
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: req.body.username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        password: true,
      },
    });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan!",
      });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(401).json({
        success: false,
        message: "Password tidak valid!",
      });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password, ...userWithoutPassword } = user;

    res.status(200).send({
      success: true,
      message: "Berhasil login!",
      data: {
        user: userWithoutPassword,
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan internal!",
      error: error.message,
    });
  }
};

module.exports = { login };
