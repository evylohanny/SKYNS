const express = require('express');
const router = express.Router();
const pool = require('../config/db.config.js');

router.get('/', async(req, res) => {

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

module.exports = router;