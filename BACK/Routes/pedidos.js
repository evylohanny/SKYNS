const express = require('express');
const pool = require('../config/db.config.js');
const router = express.Router();

router.get('/pedidos', async(req, res) => {

    try {

        const response = await pool.query('SELECT * FROM produtos');

        if (response.rows.length <= 0) return res.status(404).json({ message: 'Produtos não encontrados.' });

        res.status(201).json({ message: 'Produtos encontrados.', data: response.rows });
    } catch (error) {
        
        res.status(500).json({ message: error });
    }
});

module.exports = router;