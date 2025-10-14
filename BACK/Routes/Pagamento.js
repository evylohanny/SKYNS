const express = require('express');
const router = express.Router();
const DbService = require('../config/db.config.js');

//buscar peodutos no banco
router.get('/produtos' , async (req,res) =>{
  try {
    
        const db = new DbService();
        const pool = await db.getPool();
        const [rows] = await pool.query('SELECT * FROM produtos');
        res,express.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'produto não encontrado'});
    }
});

//buscar produtos salvo no pagamento
router.get('/pagamento', async (req, res) => {
  try {
  
    const db = new DbService();
    const pool = await db.getPool();
    const [rows] = await pool.query(
      'SELECT * FROM pagamento ORDER BY criado_em DESC LIMIT 1'
    );
    if (rows.length === 0) {
      return res.json([]);
    }

    const carrinho = JSON.parse(rows[0].produtos_json);
    res.json(carrinho);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar pagamento salvo' });
  }
});


// Salvar produtos do pagamento (com opção de manter 30 dias)
router.post('/pagamento', async (req, res) => {
  try {

    const db = new DbService();
    const pool = await db.getPool();
    const { produtos, salvarPor30Dias } = req.body;

    if (!produtos || produtos.length === 0) {
      return res.status(400).json({ error: 'Nenhum produto enviado' });
    }

    if (salvarPor30Dias) {
      await pool.query('INSERT INTO pagamentos (produtos_json) VALUES (?)', [
        JSON.stringify(produtos),
      ]);
    }

    res.json({ message: 'Pagamento salvo com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar pagamento' });
  }
});

// Limpar produtos do pagamento
router.delete('/pagamento', async (req, res) => {
  try {

    const db = new DbService();
    const pool = await db.getPool();
    await pool.query('DELETE FROM pagamento');
    res.json({ message: 'Carrinho limpo com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao limpar pagamento' });
  }
});

// Remover registros com mais de 30 dias (opcional, automático)
router.delete('/pagamento/expirar', async (req, res) => {
  try {

    const db = new DbService();
    const pool = await db.getPool();
    await pool.query(
      'DELETE FROM pagamentos WHERE criado_em < NOW() - INTERVAL 30 DAY'
    );
    res.json({ message: 'Pagamentos antigos removidos' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao remover pagamentos antigos' });
  }
});

module.exports = router;