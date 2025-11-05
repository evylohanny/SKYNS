const DbService = require('../config/db.config.js');
const express = require('express');
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const { tipo } = req.query; // ?tipo=comum ou ?tipo=customizavel
    const produto = new DbService();
    const response = await produto.buscaProdutos(tipo);
    res.json(response);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// 🔍 Buscar produto específico
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const produto = new DbService();
    const response = await produto.buscaProdutoPorId(id);
    if (!response) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(response);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// ➕ Criar produto
router.post("/", async (req, res) => {
  try {
    const produto = new DbService();
    const response = await produto.criarProduto(req.body);
    res.status(201).json(response);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// ✏️ Atualizar produto
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const produto = new DbService();
    const response = await produto.atualizarProduto(id, req.body);
    res.json(response);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// 🗑️ Deletar produto
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const produto = new DbService();
    const response = await produto.deletarProduto(id);
    res.json(response);
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});




// LISTAR PRODUTOS (com ou sem filtro por tipo)
router.get('/produtos', async (req, res) => {
  try {
    const { tipo } = req.query; // opcional: ?tipo=comum ou ?tipo=customizavel
    const produto = new DbService();
    const response = await produto.buscaProdutos(tipo);

    
    if (!response || response.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado.' });
    }

    return res.status(200).json({
      message: 'Produtos encontrados com sucesso!',
      data: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Erro ao buscar produtos.',
      error: error.message,
    });
  }
});

module.exports = router;



// router.get('/produtos', async(req, res) => {

//     try {

//         const produto = new DbService();
//         const response = produto.buscaProdutos();

//         if (response) {

//             return res.status(200).json({ 
//                 message: 'Produtos encontrados com sucesso!', 
//                 data: response
//             });        
//         };
//     } catch (error) {

//         if (error.response.status === 404) {

//             return res.status(404).json({ 
//                 message: 'Produtos não encontrados.' 
//             });
//         };

//         return res.status(500).json({
//             message: 'Erro ao buscar produtos.', 
//             error: error.message
//         });
//     };
// });


router.post('/produtos', async(req, res) => {

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

    const response = await pool.query(' INSERT INTO produtos (titulo_, quantidade_estoque, preco, breve_descricao, completa_descricao, quantidade_estrelas, categoria, peso, personalizado, quantidade_minima) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [
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
    ]);

    if (response.rows.length > 0) {

        return res.status(200).json({ 
            message: 'Produto cadastrado com sucesso!'
        });
    };

    return res.status(404).json({ 
        message: 'Erro: não encontrado.' 
    });
    } catch (error) {
        
        return res.status(500).json({ 
        message: 'Erro interno no servidor.', 
        error: error.message
    });
    };
});

module.exports = router;