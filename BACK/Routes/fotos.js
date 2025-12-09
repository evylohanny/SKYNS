const express = require("express");
const DbService = require("../config/db.config.js");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// ---- CONFIG MULTER NO MESMO ARQUIVO ---- //
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/produtos/:id/foto", upload.single("foto"), async (req, res) => {
  console.log("FILE RECEBIDO:", req.file);
  console.log("BODY RECEBIDO:", req.body);

  const { id } = req.params;
  const { posicao } = req.body;

  try {
    // não veio imagem?
    if (!req.file) {
      return res.status(400).json({
        message: "Nenhuma imagem foi enviada!",
      });
    }

    // 🔥 CORREÇÃO: URL completa incluindo o host
    const urlFinal = "http://localhost:3000/uploads/" + req.file.filename;

    const db = new DbService();
    const sql = db.criaNovaFoto();
    const pool = db.getPool();

    const response = await pool.query(sql, [
      urlFinal, // Agora salva a URL completa
      posicao,
      id, // id do produto
    ]);

    return res.status(200).json({
      message: `Foto enviada com sucesso!`,
      data: response.rows[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro interno ao enviar foto",
      error: error.mensagem,
    });
  }
});

router.get("/fotos", async (req, res) => {
  try {
    const fotos = new DbService();
    const response = await fotos.buscaFotosProdutos();

    return res.status(200).json({
      message: "Fotos dos produtos retornadas com sucesso!",
      data: response.rows,
    });
  } catch (error) {
    if (error.response.status === 404) {
      return res.status(404).json({
        message: "Nenhuma foto dos produtos encontrada.",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Erro interno do servidor!",
      error: error.message,
    });
  }
});

router.get("/:id/:posicao/foto", async (req, res) => {
  const { id, posicao } = req.params;

  try {
    const db = new DbService();
    const pool = db.getPool();
    const sql = db.buscaFotoProduto();
    const response = await pool.query(sql, [id, posicao]);

    if (response.rows.length === 0) {
      return res.status(404).json({
        message: `Nenhuma foto do produto ${id} encontrada!`,
      });
    }

    return res.status(200).json({
      message: `Foto encontrada`,
      data: response.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: `Erro ao buscar fotos`,
      error: error.message,
    });
  }
});

router.get("/:id/foto", async (req, res) => {
  const { id } = req.params;
  const posicao = 1;

  try {
    const db = new DbService();
    const pool = db.getPool();
    const sql = db.buscaFotoProduto();
    const response = await pool.query(sql, [id, posicao]);

    if (response.rows.length <= 0) {
      return res.status(404).json({
        message: `Nenhuma foto do produto ${id} encontrada!`,
        error: response,
      });
    }

    return res.status(200).json({
      message: `Foto do produto ${id} encontrada com sucesso!`,
      data: response.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: `Erro ao buscar fotos produto ${id}!`,
      error: error.message,
    });
  }
});

module.exports = router;