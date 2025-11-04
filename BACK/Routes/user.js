const express = require('express');
const router = express.Router();
const dbservice = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'SEU_SECRET_KEY';
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configurar multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/fotos_perfil/';
    // Criar diretório se não existir
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Gerar nome único para o arquivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'foto-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: function (req, file, cb) {
    // Verificar se é imagem
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
    }
  }
});

router.post('/cadastro', async (req, res) => {
  
  try {

    const db = new dbservice();
    const pool = await db.getPool();

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

    const db = new dbservice();
    const pool = await db.getPool();

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
    
    const token = jwt.sign(
      { id: user.id_usuario }, 
      'SEU_SECRET_KEY', 
      { expiresIn: '1h' }
    );

    const decode = jwt.verify(token, SECRET_KEY);

    res.json({ decode });
  
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
});

router.post('/perfil', async (req, res) => {

  try {
    const { id_usuario_logado } = req.body;
    const db = new dbservice();
    const pool = await db.getPool();
    
    const result = await pool.query(
      'SELECT * FROM usuario WHERE id_usuario = $1',
      [id_usuario_logado]
    );

    const response = result.rows[0];

    res.status(200).json(response);

  } catch (error) {
    console.error('Erro ao buscar usuario:', error);
    res.status(500).json(error);
  }
})

router.put('/editando_dados', async (req, res) => {
  try {
    const { id_usuario, nome_usuario, email_usuario, cpf, data_nascimento, telefone, genero } = req.body;

    if (!id_usuario) {
      return res.status(400).json({ message: "ID do usuário é obrigatório" });
    }

    const db = new dbservice();
    const pool = await db.getPool();

    const dataFormatada = data_nascimento ? data_nascimento.split("T")[0] : null;

    await pool.query(
      `UPDATE usuario
       SET nome_usuario = COALESCE($1, nome_usuario),
           email_usuario = COALESCE($2, email_usuario),
           cpf = COALESCE($3, cpf),
           data_nascimento = COALESCE($4, data_nascimento),
           telefone = COALESCE($5, telefone),
           genero = COALESCE($6, genero)
       WHERE id_usuario = $7`,
      [nome_usuario, email_usuario, cpf, dataFormatada, telefone, genero, id_usuario]
    );

    res.status(200).json({ message: "Usuário atualizado com sucesso!" });

  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
});


router.post('/upload-foto', upload.single('foto'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Nenhuma imagem enviada' });
    }

    const id_usuario = req.body.id_usuario;
    
    if (!id_usuario) {
      return res.status(400).json({ success: false, message: 'ID do usuário é obrigatório' });
    }

    
    const fotoUrl = `/uploads/fotos_perfil/${req.file.filename}`;
    const fotoUrlCompleta = `http://localhost:3000${fotoUrl}`;

    const db = new dbservice();
    const pool = await db.getPool();

  
    const userCheck = await pool.query(
      'SELECT id_usuario FROM usuario WHERE id_usuario = $1',
      [id_usuario]
    );

    if (userCheck.rows.length === 0) {
      // Deletar a foto que foi salva
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    await pool.query(
      'UPDATE usuario SET foto = $1 WHERE id_usuario = $2',
      [fotoUrlCompleta, id_usuario]
    );

    res.json({
      success: true,
      message: 'Foto atualizada com sucesso',
      fotoUrl: fotoUrlCompleta
    });

  } catch (error) {
    console.error('Erro no upload da foto:', error);
    
    
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (deleteError) {
        console.error('Erro ao deletar arquivo:', deleteError);
      }
    }
    
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

router.use('/uploads', express.static('uploads'));



module.exports = router;