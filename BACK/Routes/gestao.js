const express = require('express');
const pool = require('../config/db.config.js');
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

// ======== ROTA: Cadastrar Produto ========
router.post('/produtos', upload.array('imagens', 5), async (req, res) => {
  try {
    const {
      categoria,
      produto,
      titulo,
      estrelas,
      quantidade,
      preco,
      peso,
      descricao,
      descricaoCompleta,
      produtoModificado,
      componentes
    } = req.body;

    const imagens = req.files.map(file => file.filename); // nomes dos arquivos

    const sql = `
      INSERT INTO produtos (
        categoria, produto, titulo, estrelas, quantidade, preco, peso,
        descricao, descricao_completa, produto_modificado, componentes, imagens
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      categoria,
      produto,
      titulo,
      estrelas,
      quantidade,
      preco,
      peso,
      descricao,
      descricaoCompleta,
      produtoModificado === 'true' ? 1 : 0,
      componentes || '',
      JSON.stringify(imagens)
    ]);

    res.status(200).json({ message: 'Produto cadastrado com sucesso!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar produto', error });
  }
});

module.exports = router;