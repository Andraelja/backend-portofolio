const express = require("express");

const prisma = require("../prisma/client");

const findHome = async (req, res) => {
  try {
    const home = await prisma.home.findMany({
      select: {
        id: true,
        judul: true,
        deskripsi: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return res.status(201).send({
      success: true,
      message: "Data ditemukan!",
      data: home,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan!",
      error: error.message,
    });
  }
};

const createHome = async (req, res) => {
  try {
    const home = await prisma.home.create({
      data: {
        judul: req.body.judul,
        deskripsi: req.body.deskripsi,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Data ditambahkan!",
      data: home,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan!",
      error: error.message,
    });
  }
};

const findHomeById = async (req, res) => {
  const { id } = req.params;

  try {
    const home = await prisma.home.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        judul: true,
        deskripsi: true,
      },
    });

    return res.status(200).send({
      success: true,
      message: `Data ditemukan dengan id ${id}`,
      data: home,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan!",
      error: error.message,
    });
  }
};

const updateHome = async (req, res) => {
  const { id } = req.params;
  try {
    const home = await prisma.home.update({
      where: {
        id: Number(id),
      },
      data: {
        judul: req.body.judul,
        deskripsi: req.body.deskripsi,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Behasil update!",
      data: home,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan!",
      error: error.message,
    });
  }
};

const deleteHome = async (req, res) => {
  const { id } = req.params;
  try {
    const home = await prisma.home.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).send({
      success: true,
      message: "Data berhasil dihapus!",
      data: home,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan!",
      error: error.message,
    });
  }
};

module.exports = { findHome, createHome, findHomeById, updateHome, deleteHome };
