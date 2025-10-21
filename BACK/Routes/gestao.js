// const express = require('express');
// const DbService = require('../config/db.config.js');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');

// // ======== Configuração do Multer ========
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// /* ============================================================
//    ROTA: Cadastrar Produto
//    ============================================================ */
// router.post('/produtos', upload.array('imagens', 5), async (req, res) => {
//   try {
//     const db = new DbService();
//     const pool = db.getPool();

//     const {
//       titulo_,
//       quantidade_estoque,
//       preco,
//       breve_descricao,
//       completa_descricao,
//       quantidade_estrelas,
//       categoria,
//       peso,
//       personalizado,
//       quantidade_minima,
//       data_lancamento,
//       tipo
//     } = req.body;

//     const imagens = req.files.map(file => file.filename);

//     const sql = `
//       INSERT INTO produtos (
//         titulo_,
//         quantidade_estoque,
//         preco,
//         breve_descricao,
//         completa_descricao,
//         quantidade_estrelas,
//         categoria,
//         peso,
//         personalizado,
//         quantidade_minima,
//         componente,
//         data_lancamento,
//         tipo,
//         imagens
//       )
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
//     `;

//     await pool.query(sql, [
//       titulo_,
//       quantidade_estoque,
//       preco,
//       breve_descricao,
//       completa_descricao,
//       quantidade_estrelas,
//       categoria,
//       peso,
//       personalizado === 'true' ? 1 : 0,
//       quantidade_minima,
//       componente,
//       data_lancamento,
//       tipo,
//       throwDeprecation,
//       JSON.stringify(imagens)
//     ]);

//     res.status(200).json({ message: 'Produto cadastrado com sucesso!' });
//   } catch (error) {
//     console.error('Erro ao cadastrar produto:', error);
//     res.status(500).json({ message: 'Erro ao cadastrar produto', error });
//   }
// });

// module.exports = router;

const express = require('express');
const DbService = require('../config/db.config.js');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ======== Configuração do Multer ========
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

/* ============================================================
   ROTA: Cadastrar Produto com suas fotos
   ============================================================ */
router.post('/produtos', upload.array('imagens', 5), async (req, res) => {
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

    // 🔹 1. Inserir o produto
    const insertProdutoSQL = `
      INSERT INTO produtos (
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
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [produtoResult] = await pool.query(insertProdutoSQL, [
      titulo_,
      quantidade_estoque,
      preco,
      breve_descricao,
      completa_descricao,
      quantidade_estrelas,
      categoria,
      peso,
      personalizado === 'true' ? 1 : 0,
      quantidade_minima
    ]);

    const idProduto = produtoResult.insertId; // pega o ID gerado automaticamente

    // 🔹 2. Inserir as fotos relacionadas (tabela "fotos")
    const imagens = req.files;

    if (imagens && imagens.length > 0) {
      const insertFotoSQL = `
        INSERT INTO fotos (url, posicao, fk_id_produto)
        VALUES (?, ?, ?)
      `;

      for (let i = 0; i < imagens.length; i++) {
        const foto = imagens[i];
        await pool.query(insertFotoSQL, [
          foto.filename,  // url da imagem
          i + 1,          // posição (1, 2, 3, ...)
          idProduto       // fk_id_produto
        ]);
      }
    }

    res.status(200).json({ message: 'Produto e fotos cadastrados com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ message: 'Erro ao cadastrar produto', error });
  }
});

module.exports = router;
