const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/rastreio-produto', async (req, res) => {

    try {
      
        const { id } = req.body;

        const response = axios.get('http://52.1.197.112:3000/queue/items', id, { timeout: 10000 });

        if (response && response.production === 'A') {

            res.status(200).json({
                message: 'Pedido em produção'
            });
        };
        
        if (response && response.production === 'B') {

            res.status(200).json({
                message: 'Pedido em produção'
            });
        };

        if (response && response.production === 'C') {

            res.status(200).json({
                message: 'Pedido em produção'
            });
        };

        if (response && response.production === 'D') {

            res.status(200).json({
                message: 'Pedido em expedição'
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