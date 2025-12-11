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

router.post("/pedido", async (req, res) => {
  try {
    const db = new DbService();
    const pool = await db.getPool();

    const { id_usuario, total } = req.body;
    
    const result = await pool.query(
      `INSERT INTO pedidos (fk_id_usuario, valor_total, status)
       VALUES ($1, $2, 'ESTOQUE')
       RETURNING id_pedido`,
      [id_usuario, total]

    );

    const idPedido = result.rows[0].id_pedido;

    // Iniciar atualização automática
    iniciarAtualizacaoAutomatica(idPedido);
    
    res.status(201).json({
      message: "Pedido criado com sucesso!",
      id_pedido: idPedido
    });

    

  } catch (err) {
    console.error("ERRO AO CRIAR PEDIDO:", err);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
});


// 🚀 Atualizar status a cada 1 minuto
function iniciarAtualizacaoAutomatica(idPedido) {
  const db = new DbService();

  const statusList = [
    "ESTOQUE",
    "PROCESSO",
    "MONTAGEM",
    "EXPEDIÇÃO",
    "COMPLETED"
  ];

  let etapa = 0;

  const interval = setInterval(async () => {
    try {
      const pool = await db.getPool();

      if (etapa >= statusList.length) {
        clearInterval(interval); // acabou
        return;
      }

      const novoStatus = statusList[etapa];

      await pool.query(
        `UPDATE pedidos SET status = $1 WHERE id_pedido = $2`,
        [novoStatus, idPedido]
      );

      console.log(`Pedido ${idPedido} atualizado para: ${novoStatus}`);
      etapa++;

    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      clearInterval(interval);
    }
  }, 60000); // 1 MINUTO
}


module.exports = router;