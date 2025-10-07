const express = require('express');
const router = express.Router();
const pool = require('../config/db.config.js');

router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha, cpf, data_nascimento } = req.body;

    await pool.query(
      `INSERT INTO usuario (nome_usuario, email_usuario, senha, cpf, data_nascimento)
       VALUES ($1, $2, $3, $4, $5)`,
      [nome, email, senha, cpf, data_nascimento]
    );

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

router.post('/login', async (req, res) => {

    try {
        
    } catch (error) {
        
    }
})

module.exports = router;