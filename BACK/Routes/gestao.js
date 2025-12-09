const express = require('express');
const DbService = require('../config/db.config.js');
const { Result } = require('pg');
const router = express.Router();

router.post('/produtos', async (req, res) => {
  console.log("Body recebido no backend:", req.body);
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
      tipo,
      componente
    } = req.body;

    const result = await pool.query(
      `INSERT INTO produtos (titulo_, quantidade_estoque, preco, breve_descricao, completa_descricao, quantidade_estrelas, categoria, peso,
      personalizado, quantidade_minima, data_lancamento, tipo, componente)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id_produto`,
      [titulo_, quantidade_estoque, preco, breve_descricao, completa_descricao, quantidade_estrelas, categoria, peso,
      personalizado ? 1 : 0, quantidade_minima, data_lancamento, tipo, componente]
    );

    res.status(201 ).json({ message: 'Produto cadastrado com sucesso!',
      id_produto: result.rows[0].id_produto
     });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ message: 'Erro ao cadastrar produto', error });
  }
});

router.get('/produtos/listar', async (req, res) => {
  try {
    const db = new DbService();
    const pool = db.getPool();

    const result = await pool.query(`
      SELECT 
        id_produto,
        categoria,
        titulo_ AS nome_produto,
        quantidade_estoque,
        personalizado,
        TO_CHAR(data_lancamento, 'DD/MM/YYYY') AS data_lancamento
      FROM produtos
      ORDER BY id_produto DESC
    `);

    // formata personalizado
    const formatado = result.rows.map(prod => ({
      id: prod.id_produto,
      tipo_pele: prod.categoria,
      nome_produto: prod.nome_produto,
      estoque: prod.quantidade_estoque,
      per_comu: prod.personalizado ? "Personalizável" : "Comum",
      data_lancamento: prod.data_lancamento
    }));

    res.json(formatado);

  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ message: "Erro ao listar produtos" });
  }
});

module.exports = router;