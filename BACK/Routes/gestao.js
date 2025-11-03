const express = require('express');
const DbService = require('../config/db.config.js');
const router = express.Router();

router.post('/produtos', async (req, res) => {
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
      quantidade_minima,
      data_lancamento,
      componente,
      tipo
    } = req.body;

    await pool.query(
      `INSERT INTO produtos (titulo_, quantidade_estoque, preco, breve_descricao, completa_descricao, quantidade_estrelas, categoria, peso,
      personalizado, quantidade_minima, componente, data_lancamento,tipo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [titulo_, quantidade_estoque, preco, breve_descricao, completa_descricao, quantidade_estrelas, categoria, peso,
      personalizado === 'true' ? 1 : 0, quantidade_minima, componente, data_lancamento, tipo]
    );

    res.status(201 ).json({ message: 'Produto cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ message: 'Erro ao cadastrar produto', error });
  }
});

module.exports = router;