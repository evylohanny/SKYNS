const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/rastreio/:id', async (req, res) => {

    try {
      
        const { id } = req.params;

        const response = await axios.get(`http://52.1.197.112:3000/queue/items/${id}`, { timeout: 10000 });

        const status = response.data.status;
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