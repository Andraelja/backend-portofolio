const express = require("express");
const prisma = require("../prisma/client");

const findSkill = async (req, res) => {
  try {
    const skill = await prisma.skill.findMany({
      select: {
        id: true,
        nama: true,
        persentase: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return res.status(200).send({
      success: true,
      message: "Skill Ditemukan!",
      data: skill,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan internal!",
      error: error.message,
    });
  }
};

const createSkill = async (req, res) => {
  try {
    const skill = await prisma.skill.create({
      data: {
        nama: req.body.nama,
        persentase: parseInt(req.body.persentase),
      },
    });

    return res.status(201).send({
      success: true,
      message: "Data berhasil ditambahkan!",
      data: skill,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan internal!",
      error: error.message,
    });
  }
};

const findSkillById = async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await prisma.skill.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        nama: true,
        persentase: true,
      },
    });

    return res.status(200).send({
      success: true,
      message: "Data ditemukan!",
      data: skill,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan internal!",
      error: error.message,
    });
  }
};

const updateSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await prisma.skill.update({
      where: {
        id: Number(id),
      },
      data: {
        nama: req.body.nama,
        persentase: parseInt(req.body.persentase),
      },
    });

    return res.status(201).send({
      success: true,
      message: "Data berhasil diubah!",
      data: skill,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan internal!",
      error: error.message,
    });
  }
};

const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await prisma.skill.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).send({
      success: true,
      message: "Data berhasil dihapus!",
      data: skill,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan internal!",
      error: error.message,
    });
  }
};
module.exports = {
  findSkill,
  createSkill,
  findSkillById,
  updateSkill,
  deleteSkill,
};
