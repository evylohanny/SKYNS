const express = require('express');
const DbService = require('../config/db.config.js');
const router = express.Router();

router.get('/fotos', async(req, res) => {

    try {
      
        const fotos = new DbService();
        const response = await fotos.buscaFotosProdutos();

       return res.status(200).json({

        message: 'Fotos dos produtos retornadas com sucesso!',
        data: response.rows
       });

    } catch (error) {
        
        if (error.response.status === 404) {

            return res.status(404).json({

                message: 'Nenhuma foto dos produtos encontrada.',
                error: error.message
            });
        };

        return res.status(500).json({

            message: 'Erro interno do servidor!',
            error: error.message
        });
    };
});

router.get('/:id/:posicao/foto', async (req, res) => {
    
    const { id, posicao } = req.params;

    try {
        const db = new DbService();
        const pool = db.getPool();
        const sql = db.buscaFotoProduto();
        const response = await pool.query(sql, [id, posicao]);

        if (response.rows.length === 0) {
            return res.status(404).json({
                message: `Nenhuma foto do produto ${id} encontrada!`,
            });
        }

        return res.status(200).json({
            message: `Foto encontrada`,
            data: response.rows[0]
        });
    } catch (error) {
        return res.status(500).json({
            message: `Erro ao buscar fotos`,
            error: error.message
        });
    }
});

router.get('/:id/foto', async(req, res) => {

    const { id } = req.params;
    const posicao = 1;
    
    try {    

        const db = new DbService();
        const pool = db.getPool();
        const sql = db.buscaFotoProduto();
        const response = await pool.query(sql, [id, posicao]);

        if (response.rows.length <= 0) {

            return res.status(404).json({

                message: `Nenhuma foto do produto ${id} encontrada!`,
                error: response
            });
        };

        return res.status(200).json({

            message: `Foto do produto ${id} encontrada com sucesso!`,
            data: response.rows[0]
        });
    } catch (error) {
        
        return res.status(500).json({

            message: `Erro ao buscar fotos produto ${id}!`,
            error: error.message
        });
    };
});


router.post('/:id/foto', async(req, res) => {

    const { id } = req.params;
    const { url, posicao, fk_id_produto } = req.body;

    try {

        const db = new DbService();
        const sql = db.criaNovaFoto();
        const pool = db.getPool();

        const response = await pool.query(sql, [url, posicao, fk_id_produto]);  

        if (response.rows.length === 0) {

            return res.status(404).json({

                message: `Erro ao enviar foto!`,
                error: response
            });
        };

        return res.status(200).json({

            message: `Foto do produto ${id} enviada com sucesso!`,
            data: response.rows[0]
        });
    } catch (error) {
        
        return res.status(500).json({

            message: `Erro interno do servidor`,
            error: error.message
        });
    };
});

module.exports = router;