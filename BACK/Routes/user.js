const express = require('express');
const router = express.Router();
const pool = require('../config/db.config.js');
const jwt = require('jsonwebtoken'); // ← IMPORT JWT
const SECRET_KEY = 'SEU_SECRET_KEY';

router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha, cpf, data_nascimento } = req.body;

   const existingUser = await pool.query(
    ` SELECT * FROM usuario WHERE email_usuario = $1 OR cpf = $2`,
     [email, cpf]
    );

     if (existingUser.rows.length > 0) {
      let erros = [];

      existingUser.rows.forEach((user) => {
        if (user.email_usuario === email) {
          erros.push({ campo: "email", message: "Email já cadastrado" });
        }
        if (user.cpf === cpf) {
          erros.push({ campo: "cpf", message: "CPF já cadastrado" });
        }
      });

      if (erros.length > 0) {
        return res.status(400).json({ erros });
      }
    }

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
  const { email, senha } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM usuario WHERE email_usuario = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Email ou senha incorreto!' });
    }

    const user = result.rows[0];

    if (user.senha !== senha) {
      return res.status(400).json({ message: 'Email ou senha incorreto!' });
    }

    // Gerar JWT com o ID do usuário
    const token = jwt.sign(
      { id: user.id_usuario }, 
      'SEU_SECRET_KEY', 
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
});

module.exports = router;