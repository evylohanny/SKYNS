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

/* ============================================================
   ROTA: Cadastrar Produto
   ============================================================ */
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
      componentes,
      tipoPele, // novo
      dataLancamento // novo
    } = req.body;

    const imagens = req.files.map(file => file.filename);

    const sql = `
      INSERT INTO produtos (
        categoria, produto, titulo, estrelas, quantidade, preco, peso,
        descricao, descricao_completa, produto_modificado, componentes,
        imagens, tipo_pele, data_lancamento
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      JSON.stringify(imagens),
      tipoPele || null,
      dataLancamento || new Date() // caso não venha, usa a data atual
    ]);

    res.status(200).json({ message: 'Produto cadastrado com sucesso!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar produto', error });
  }
});

/* ============================================================
   ROTA: Listar todos os produtos
   ============================================================ */
router.get('/folha', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos ORDER BY data_lancamento DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
});

/* ============================================================
   ROTA: Buscar e filtrar produtos
   ============================================================ */
router.get('/folha/filtro', async (req, res) => {
  try {
    const { id, tipo_pele, data, busca } = req.query;

    let sql = 'SELECT * FROM produtos WHERE 1=1';
    const params = [];

    // Filtro por ID
    if (id) {
      sql += ' AND id = ?';
      params.push(id);
    }

    // Filtro por tipo de pele
    if (tipo_pele) {
      sql += ' AND tipo_pele = ?';
      params.push(tipo_pele);
    }

    // Filtro por data
    if (data) {
      sql += ' AND DATE(data_lancamento) = ?';
      params.push(data);
    }

    // Campo de busca (nome do produto ou título)
    if (busca) {
      sql += ' AND (titulo LIKE ? OR produto LIKE ?)';
      params.push(`%${busca}%`, `%${busca}%`);
    }

    sql += ' ORDER BY data_lancamento DESC';

    const [rows] = await pool.query(sql, params);
    res.status(200).json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao aplicar filtros', error });
  }
});

module.exports = router;
