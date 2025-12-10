const express = require("express");
const DbService = require("../config/db.config.js");
const { Result } = require("pg");
const router = express.Router();

router.post("/produtos", async (req, res) => {
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
      componente,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO produtos (titulo_, quantidade_estoque, preco, breve_descricao, completa_descricao, quantidade_estrelas, categoria, peso,
      personalizado, quantidade_minima, data_lancamento, tipo, componente)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id_produto`,
      [
        titulo_,
        quantidade_estoque,
        preco,
        breve_descricao,
        completa_descricao,
        quantidade_estrelas,
        categoria,
        peso,
        personalizado ? 1 : 0,
        quantidade_minima,
        data_lancamento,
        tipo,
        componente,
      ]
    );

    res.status(201).json({
      message: "Produto cadastrado com sucesso!",
      id_produto: result.rows[0].id_produto,
    });
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    res.status(500).json({ message: "Erro ao cadastrar produto", error });
  }
});

router.get("/produtos/listar", async (req, res) => {
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
    const formatado = result.rows.map((prod) => ({
      id: prod.id_produto,
      tipo_pele: prod.categoria,
      nome_produto: prod.nome_produto,
      estoque: prod.quantidade_estoque,
      per_comu: prod.personalizado ? "Personalizável" : "Comum",
      data_lancamento: prod.data_lancamento,
    }));

    res.json(formatado);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ message: "Erro ao listar produtos" });
  }
});

router.delete("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = new DbService();
    const pool = db.getPool();

    // Verifica se o produto existe
    const checkResult = await pool.query(
      "SELECT id_produto FROM produtos WHERE id_produto = $1",
      [id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        message: "Produto não encontrado",
      });
    }

    // Primeiro, exclui as fotos relacionadas ao produto (se houver tabela de fotos)
    try {
      await pool.query("DELETE FROM fotos WHERE id_produto = $1", [id]);
    } catch (fotoError) {
      console.log(
        "Nenhuma foto para excluir ou tabela de fotos não existe:",
        fotoError.message
      );
      // Continua mesmo se não houver fotos
    }

    // Exclui o produto
    const result = await pool.query(
      "DELETE FROM produtos WHERE id_produto = $1 RETURNING id_produto",
      [id]
    );

    res.status(201).json({
      message: "Produto excluído com sucesso!",
      id_produto: result.rows[0].id_produto,
    });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({
      message: "Erro ao excluir produto",
      error: error.message,
    });
  }
});

router.patch("/produtos/:id/estoque", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade_estoque } = req.body;

    console.log("Recebendo atualização de estoque:", { id, quantidade_estoque });

    // Validação básica
    if (quantidade_estoque === undefined || quantidade_estoque === null) {
      return res.status(400).json({
        message: "O campo 'quantidade_estoque' é obrigatório",
      });
    }

    // Converte para número e valida
    const estoqueNum = Number(quantidade_estoque);
    if (isNaN(estoqueNum) || estoqueNum < 0 || !Number.isInteger(estoqueNum)) {
      return res.status(400).json({
        message: "A quantidade de estoque deve ser um número inteiro não negativo",
      });
    }

    const db = new DbService();
    const pool = db.getPool();

    // Verifica se o produto existe
    const checkResult = await pool.query(
      "SELECT id_produto, titulo_, categoria FROM produtos WHERE id_produto = $1",
      [id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        message: "Produto não encontrado",
      });
    }

    console.log("Produto encontrado:", checkResult.rows[0]);

    // Atualiza apenas o estoque
    const result = await pool.query(
  `UPDATE produtos 
   SET quantidade_estoque = $1
   WHERE id_produto = $2
   RETURNING id_produto, titulo_, categoria, quantidade_estoque`,
  [estoqueNum, id]
);

    console.log("Resultado da atualização:", result.rows[0]);

    const produtoAtualizado = result.rows[0];

    res.status(200).json({
      message: "Estoque atualizado com sucesso!",
      id_produto: produtoAtualizado.id_produto,
      nome_produto: produtoAtualizado.titulo_,
      tipo_pele: produtoAtualizado.categoria,
      quantidade_estoque: produtoAtualizado.quantidade_estoque,
    });
  } catch (error) {
    console.error("Erro detalhado ao atualizar estoque:", error);
    console.error("Stack trace:", error.stack);
    
    // Verifica se é erro de conexão com o banco
    if (error.code === 'ECONNREFUSED' || error.message.includes('connect')) {
      return res.status(503).json({
        message: "Servidor de banco de dados indisponível",
        error: "Não foi possível conectar ao banco de dados"
      });
    }
    
    res.status(500).json({ 
      message: "Erro ao atualizar estoque do produto",
      error: error.message,
      code: error.code
    });
  }
});

module.exports = router;