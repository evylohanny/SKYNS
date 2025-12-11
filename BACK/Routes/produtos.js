const DbService = require('../config/db.config.js');
const express = require('express');
const router = express.Router();

// LISTAR TODOS OU POR TIPO
router.get("/produtos", async (req, res) => {
  try {
    const { tipo } = req.query;
    const produto = new DbService();
    const response = await produto.buscaProdutos(tipo);

    if (!response || response.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado.' });
    }

    return res.status(200).json({
      message: 'Produtos encontrados!',
      data: response
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

// PEGAR 1 PRODUTO
router.get("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const produto = new DbService();
    const response = await produto.buscaProdutoPorId(id);

    console.log("Resposta do DB (response):", response);

    if (!response) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    return res.json(response);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

router.get('/produtos/:id/foto', async (req, res) => {
  try {
    const db = new DbService();
    const pool = await db.getPool();
    const { id } = req.params;

    const result = await pool.query(
      'SELECT img FROM produtos WHERE id_produto = $1',
      [id]
    );

    if (result.rows.length === 0 || !result.rows[0].img) {
      return res.status(404).json({ error: 'Foto não encontrada' });
    }

    const filename = result.rows[0].img;

    const filePath = require('path').join(
      __dirname,
      '..',
      'uploads',
      filename
    );

    console.log("🔎 Enviando foto:", filePath);

    return res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Erro ao enviar foto:", err);
        res.status(500).json({ error: "Erro ao carregar foto" });
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar foto' });
  }
});

// CRIAR PRODUTO
router.post("/produtos", async (req, res) => {
  try {
    const db = new DbService();
    const pool = db.getPool();

    const {
      titulo_,
      quantidade_estoque,
      preco,
      breve_descricao,
      completa_descricao,
      quantidade_estrelas,
      categoria,
      peso,
      personalizado,
      quantidade_minima
    } = req.body;

    const response = await pool.query(
      `INSERT INTO produtos 
      (titulo_, quantidade_estoque, preco, breve_descricao, completa_descricao, quantidade_estrelas, categoria, peso, personalizado, quantidade_minima)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`,
      [
        titulo_,
        quantidade_estoque,
        preco,
        breve_descricao,
        completa_descricao,
        quantidade_estrelas,
        categoria,
        peso,
        personalizado,
        quantidade_minima
      ]
    );

    return res.status(201).json({
      message: 'Produto cadastrado com sucesso!',
      data: response.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro interno no servidor.',
      error: error.message
    });
  }
});



module.exports = router;
