const dbservice = require('../../config/db.config.js');
const express = require('express');
const router = express.Router();

router.get('/rastreio/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const rastreio = new dbservice();
        const pool = rastreio.getPool();

        // 1. QUERY: Busca o status do pedido mais recente para o fk_id_usuario fornecido.
        // Assumindo que 'id_pedido' é a coluna mais confiável para ordenar (maior ID = mais recente).
        const queryText = `
            SELECT status 
            FROM pedidos 
            WHERE fk_id_usuario = $1 
            ORDER BY id_pedido DESC 
            LIMIT 1
        `;

        const response = await pool.query(queryText, [id]);

        // 2. VERIFICAÇÃO DE RESULTADO
        if (response.rows.length === 0) {
            // Se nenhum pedido for encontrado
            return res.status(200).json({ // Retorna 200 OK, mas com status NOT_FOUND para o frontend
                message: 'Nenhum pedido encontrado para este usuário.',
                status: 'NOT_FOUND' 
            });
        }

        // 3. PROCESSAMENTO DO STATUS
        const statusData = response.rows[0];
        // Se statusData.status for null no banco, ele usará 'UNKNOWN'. Garantimos MAIÚSCULAS.
        const status = (statusData.status || 'UNKNOWN').toUpperCase(); 

        console.log(`Status do pedido encontrado: ${status}`);

        // 4. DEFINIÇÃO DA MENSAGEM (Opcional, o frontend pode fazer isso)
        let message;
        switch (status) {
            case 'ESTOQUE':
                message = 'Pedido em estoque';
                break;
            case 'PROCESSO':
                message = 'Pedido em processo';
                break;
            case 'MONTAGEM':
                message = 'Pedido em montagem';
                break;
            case 'EXPEDIÇÃO':
                message = 'Pedido em expedição';
                break;
            case 'COMPLETED':
                message = 'Pedido entregue';
                break;
            case 'NOT_FOUND':
                message = 'Nenhum pedido encontrado.';
                break;
            default:
                message = 'Status do pedido desconhecido';
        }

        // 5. RESPOSTA FINAL (Status 200 OK com os dados do rastreio)
        res.status(200).json({
            message: message,
            status: status 
        });

    } catch (error) {
        console.error("ERRO NO ENDPOINT /rastreio:", error);
        
        // Retorna 500 para erros internos (falha de conexão, erro na query, etc.)
        res.status(500).json({
            message: 'Erro interno do servidor ao buscar rastreio.',
            error: error.message
        });
    }
});

module.exports = router;