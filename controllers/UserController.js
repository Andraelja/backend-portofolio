const express = require("express");
const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");
const { use } = require("../routes");

const findUser = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return res.status(201).send({
      success: true,
      message: "Data ditemukan!",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan!",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        username: req.body.username,
        password: hashPassword,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Berhasil menambahkan data!",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan!",
      error: error.message,
    });
  }
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        username: true,
      },
    });

    return res.status(201).send({
      success: true,
      message: `Data dengan id ${id} ditemukan!`,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan!",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
        username: req.body.username,
        password: hashPassword,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Berhasil update data!",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan!",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).send({
      success: true,
      message: "Berhasil menghapus data!",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjdai kesalahan!",
      error: error.message,
    });
  }
};

module.exports = { findUser, createUser, findUserById, updateUser, deleteUser };
