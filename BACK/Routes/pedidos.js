const DbService = require('../config/db.config.js');
const express = require('express');
const router = express.Router();

router.get('/pedidos', async(req, res) => {

    try {
        
        const pedido = new DbService();
        const response = pedido.buscaPedidos;

        if (response) {

            return res.status(200).json({ message: 'Pedidos encontrados com sucesso!', data: response });
        };
    } catch (error) {
        
        if (error.response.status === 404) {

            return res.status(404).json({ message: 'Produtos não encontrados! '});
        };

        return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message});
    };
});

module.exports = router;