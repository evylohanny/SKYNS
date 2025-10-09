const express = require('express');
const router = express.Router();
const pool = require('../config/db.config.js');

router.get('/produtos', async(req, res) => {

    try {

        const response = await pool.query('SELECT * FROM produtos');

        if (response.rows.length === 0) {

            return res.status(404).json({ 
                message: 'Produtos não encontrados.' 
            });
        }; 

        return res.status(200).json({ 
            message: 'Produtos encontrados com sucesso!', 
            data: response.rows[0] 
        });        
    } catch (error) {

        return res.status(500).json({
            message: 'Erro ao buscar produtos.', 
            error: error.message
        });
    };
});

router.post('/produtos', async(req, res) => {

    try {

        const { titulo, descricao, preco } = req.body;

        const response = await pool.query('INSERT INTO produtos (titulo, descricao, preco) VALUES ($1, $2, $3)', [
            titulo, descricao, preco
        ]);

        if (response.affectedRows > 0) {

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