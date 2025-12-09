const DbService = require('../config/db.config.js');
const express = require('express');
const router = express.Router();

router.get('/pedidos', async (req, res) => {
  try {
    const pedido = new DbService();
    const response = await pedido.buscaPedidos(); // AGORA EXECUTA

    if (!response || response.length === 0) {
      return res.status(404).json({
        message: 'Nenhum pedido encontrado'
      });
    }

    // Garantir que "componentes" sempre vira array
    const pedidosFormatados = response.map(p => {
      let comps = p.componentes;

      if (typeof comps === "string") {
        // Se vier "Ácido Hialurônico,Niacinamida"
        comps = comps.split(",").map(c => c.trim());
      }

      return {
        ...p,
        componentes: comps
      };
    });

    return res.status(200).json({
      message: 'Pedidos encontrados com sucesso!',
      data: pedidosFormatados
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Erro interno do servidor.',
      error: error.message
    });
  }
});


module.exports = router;