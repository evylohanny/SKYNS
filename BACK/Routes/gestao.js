const express = require('express');
const DbService = require('../config/db.config.js');
const { Result } = require('pg');
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
      tipo
    } = req.body;

    const result = await pool.query(
      `INSERT INTO produtos (titulo_, quantidade_estoque, preco, breve_descricao, completa_descricao, quantidade_estrelas, categoria, peso,
      personalizado, quantidade_minima, data_lancamento, tipo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id_produto`,
      [titulo_, quantidade_estoque, preco, breve_descricao, completa_descricao, quantidade_estrelas, categoria, peso,
      personalizado ? 1 : 0, quantidade_minima, data_lancamento, tipo]
    );

    res.status(201 ).json({ message: 'Produto cadastrado com sucesso!',
      id_produto: result.rows[0].id_produto
     });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ message: 'Erro ao cadastrar produto', error });
  }
});

module.exports = router;