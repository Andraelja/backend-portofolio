const express = require("express");
const prisma = require("../prisma/client");
const path = require("path");
const crypto = require("crypto");
const { error } = require("console");
const fs = require("fs");

const findPortofolio = async (req, res) => {
  try {
    const portofolio = await prisma.portofolio.findMany({
      select: {
        id: true,
        nama: true,
        foto: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return res.status(200).send({
      success: true,
      message: "Data ditemukan!",
      data: portofolio,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan internal!",
      error: error.message,
    });
  }
};

const createPortofolio = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ message: "Foto tidak ditemukan!" });

  const foto = req.files.foto;
  const ukuranFoto = foto.data.length;
  const ext = path.extname(foto.name);
  const unikKarakter = crypto.randomBytes(3).toString("hex");
  const namaFoto = unikKarakter + foto.md5 + ext;
  const fotoUrl = `${req.protocol}://${req.get("host")}/images/${namaFoto}`;
  const tipeFoto = [".png", ".jpg", ".jpeg"];

  if (!tipeFoto.includes(ext.toLocaleLowerCase()))
    return res
      .status(400)
      .json({ message: "tipe foto tidak sesuai!. Harus png, jpg atau jpeg!" });

  if (ukuranFoto > 5000000)
    return res
      .status(400)
      .json({ message: "Ukuran foto terlalu besar!. Maksimal 5mb!" });

  foto.mv(`./public/images/${namaFoto}`, (error) => {
    if (error) return res.status(500).json({ message: error });
  });
  try {
    const portofolio = await prisma.portofolio.create({
      data: {
        nama: req.body.nama,
        foto: fotoUrl,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Data berhasil ditambahkan!",
      data: portofolio,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan internal!",
      error: error.message,
    });
  }
};

const findPortofolioById = async (req, res) => {
  const { id } = req.params;
  try {
    const portofolio = await prisma.portofolio.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        nama: true,
        foto: true,
      },
    });

    return res.status(200).send({
      success: true,
      message: "Data ditemukan!",
      data: portofolio,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan internal!",
      error: error.message,
    });
  }
};

const updatePortofolio = async (req, res) => {
  const { id } = req.params;
  try {
    // cek data lama
    const fotoLama = await prisma.portofolio.findUnique({
      where: { id: Number(id) },
    });

    if (!fotoLama) {
      return res.status(404).json({ message: "Data tidak ditemukan!" });
    }

    let fotoUrl = fotoLama.foto; // default pakai foto lama

    if (req.files && req.files.foto) {
      const fotoBaru = req.files.foto;
      const ukuranFoto = fotoBaru.data.length;
      const ext = path.extname(fotoBaru.name);
      const unikKarakter = crypto.randomBytes(3).toString("hex");
      const namaFoto = unikKarakter + fotoBaru.md5 + ext;
      fotoUrl = `${req.protocol}://${req.get("host")}/images/${namaFoto}`;
      const tipeFoto = [".png", ".jpg", ".jpeg"];

      if (!tipeFoto.includes(ext.toLowerCase())) {
        return res.status(400).json({
          message: "Tipe foto tidak sesuai! Harus png, jpg atau jpeg!",
        });
      }

      if (ukuranFoto > 5000000) {
        return res.status(400).json({
          message: "Ukuran foto terlalu besar! Maksimal 5mb!",
        });
      }

      // hapus file lama kalau ada
      const oldPath = `./public/images/${path.basename(fotoLama.foto)}`;
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      fotoBaru.mv(`./public/images/${namaFoto}`, (error) => {
        if (error) return res.status(500).json({ message: error.message });
      });
    }

    const portofolio = await prisma.portofolio.update({
      where: { id: Number(id) },
      data: {
        nama: req.body.nama,
        foto: fotoUrl,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Berhasil update!",
      data: portofolio,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan!",
      error: error.message,
    });
  }
};

const deletePortofolio = async (req, res) => {
  const { id } = req.params;
  try {
    const portofolio = await prisma.portofolio.delete({
      where: {
        id: Number(id),
      },
    });

    // Hapus file di public/images
    if (portofolio.foto) {
      const filePath = path.join(
        __dirname,
        "../public/images",
        portofolio.foto
      );
      // asumsinya di DB disimpan "nama_file.png" bukan URL penuh

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("File berhasil dihapus:", portofolio.foto);
      } else {
        console.log("File tidak ditemukan di server:", portofolio.foto);
      }
    }

    return res.status(200).send({
      success: true,
      message: "Data berhasil dihapus!",
      data: portofolio,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Terjadi kesalahan!",
      error: error.message,
    });
  }
};

module.exports = {
  findPortofolio,
  createPortofolio,
  findPortofolioById,
  updatePortofolio,
  deletePortofolio,
};
