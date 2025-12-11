const dbservice = require('../../config/db.config.js');
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/rastreio/:id', async (req, res) => {

    try {      
        const { id } = req.params;
        const rastreio = new dbservice();
        const pool = rastreio.getPool();

        const response = await pool.query('SELECT status FROM pedidos WHERE id_usuario = $1', [id]);

        const status = response.rows[0];
        console.log(status);

        if (response && status === 'ESTOQUE') {

            res.status(200).json({
                message: 'Pedido em estoque',
                status: status 
            });
        };
        
        if (response && status === 'PROCESSO') {

            res.status(200).json({
                message: 'Pedido em processo',
                status: status
            });
        };

        if (response && status === 'MONTAGEM') {

            res.status(200).json({
                message: 'Pedido em montagem',
                status: status
            });
        };

        if (response && status === 'EXPEDIÇÃO') {

            res.status(200).json({
                message: 'Pedido em expedição',
                status: status
            });
        };

        if (response && status === 'COMPLETED') {

            res.status(200).json({
                message: 'Pedido entregue',
                status: status
            });
        };
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            message: 'Erro interno do servidor.',
            error: error.message
        });
    };
});

module.exports = router;
