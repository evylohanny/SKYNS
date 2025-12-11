const express = require('express');
const router = express.Router();
const DbService = require('../config/db.config.js');

// Buscar produtos
router.get('/produtos', async (req, res) => {
  try {
    const db = new DbService();
    const pool = await db.getPool();
    const response = await pool.query('SELECT * FROM produtos');
    res.json(response.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'produto não encontrado' });
  }
});

// Buscar pagamento salvo
router.get('/pagamento', async (req, res) => {
  try {
    const db = new DbService();
    const pool = await db.getPool();

    // IMPORTANTE: usar tabela "pagamentos"
    const response = await pool.query(
      'SELECT produtos_json FROM pagamentos ORDER BY criado_em DESC LIMIT 1'
    );

    if (response.rows.length === 0) {
      return res.json([]);
    }

    const produtosSalvos = JSON.parse(response.rows[0].produtos_json);

    const produtosCompletos = [];

    for (const item of produtosSalvos) {
      const resultado = await pool.query(
        'SELECT * FROM produtos WHERE id_produto = $1',
        [item.id_produto]
      );

      if (resultado.rows.length > 0) {
        produtosCompletos.push({
          ...resultado.rows[0],
          quantidade: item.quantidade,
        });
      }
    }

    res.json(produtosCompletos);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar pagamento salvo' });
  }
});

// Salvar pagamento
router.post('/pagamento', async (req, res) => {
  try {
    const db = new DbService();
    const pool = await db.getPool();
    const { produtos, salvarPor30Dias } = req.body;

    if (!produtos || produtos.length === 0) {
      return res.status(400).json({ error: 'Nenhum produto enviado' });
    }

    if (salvarPor30Dias) {
      await pool.query(
        'INSERT INTO pagamentos (produtos_json) VALUES ($1)',
        [JSON.stringify(produtos)]
      );
    }

    res.json({ message: 'Pagamento salvo com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar pagamento' });
  }
});

// Limpar pagamento
router.delete('/pagamento', async (req, res) => {
  try {
    const db = new DbService();
    const pool = await db.getPool();

    await pool.query('DELETE FROM pagamentos');

    res.json({ message: 'Carrinho limpo com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao limpar pagamento' });
  }
});

module.exports = router;
