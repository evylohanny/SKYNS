const DbService = require('../config/db.config.js');
const express = require('express');
const router = express.Router();

// Função para atualizar status automaticamente
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
        clearInterval(interval);
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
  }, 30000); // 1 MINUTO
}

router.get('/pedidos', async (req, res) => {
  try {
    const pedido = new DbService();
    const response = await pedido.buscaPedidos();

    if (!response || response.length === 0) {
      return res.status(404).json({
        message: 'Nenhum pedido encontrado'
      });
    }

    const pedidosFormatados = response.map(p => {
      let comps = p.componentes;
      if (typeof comps === "string") {
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

  // Adiciona CURRENT_TIMESTAMP para a data
  const result = await pool.query(
 `INSERT INTO pedidos (fk_id_usuario, valor_total, status, data)
 VALUES ($1, $2, 'ESTOQUE', CURRENT_TIMESTAMP)
 RETURNING id_pedido, data`, // <- Garante que id_pedido é retornado
 [id_usuario, total]
     );

    const { id_pedido, data } = result.rows[0]; // <- id_pedido é recuperado

  // Iniciar atualização automática
  iniciarAtualizacaoAutomatica(id_pedido); // <- id_pedido é passado

    res.status(201).json({
      message: "Pedido criado com sucesso!",
      id_pedido: id_pedido,
      data: data
    });

  } catch (err) {
    console.error("ERRO AO CRIAR PEDIDO:", err);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
});


module.exports = router;