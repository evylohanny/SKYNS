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

// Atualizar estoque do produto (venda/compra)
router.put("/produtos/:id/estoque", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;
    
    const produto = new DbService();
    const pool = produto.getPool();
    
    // Primeiro, verificar o estoque atual
    const produtoAtual = await pool.query(
      "SELECT quantidade_estoque FROM produtos WHERE id_produto = $1",
      [id]
    );
    
    if (produtoAtual.rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    
    const estoqueAtual = produtoAtual.rows[0].quantidade_estoque;
    
    // Verificar se há estoque suficiente
    if (quantidade > estoqueAtual) {
      return res.status(400).json({ 
        error: "Estoque insuficiente", 
        estoque_disponivel: estoqueAtual 
      });
    }
    
    // Atualizar o estoque
    const novoEstoque = estoqueAtual - quantidade;
    const response = await pool.query(
      "UPDATE produtos SET quantidade_estoque = $1 WHERE id_produto = $2 RETURNING quantidade_estoque",
      [novoEstoque, id]
    );
    
    return res.json({
      message: "Estoque atualizado com sucesso",
      estoque_atualizado: response.rows[0].quantidade_estoque
    });
    
  } catch (error) {
    console.error("Erro ao atualizar estoque:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

module.exports = router;
