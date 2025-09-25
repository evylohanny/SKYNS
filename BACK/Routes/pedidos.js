const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/pedidos', async(req, res) => {

    try {
        
        const response = await axios.get('http://52.1.197.112:3000/queue/items', { timeout: 10000 });
    
        res.json(response.data);
    } catch (error) {
        
        res.json({ message: error });
    }

});

router.post('/pedidos', async(req, res) => {

    const { pedido } = req.body;

    filaDeEspera(pedido);

    res.json({ message: 'Pedido recebido com sucesso!'});
});

async function filaDeEspera(pedido) {

    console.log('Entrou na fila');

    if (!pedido) return;

    for (const produto of pedido) {    

        for (let i=0; i < produto.qtde; i++) {

            await traduzProduto(produto);
        };
    };
};

async function traduzProduto(produto) {

    var produtoTraduzido = produto;

    produtoTraduzido.color1 = traduzCor(produtoTraduzido.color1);
    produtoTraduzido.color2 = traduzCor(produtoTraduzido.color2);
    produtoTraduzido.color3 = traduzCor(produtoTraduzido.color3);

    console.log('Traduziu produto!');
    return await produzProduto(produtoTraduzido);
};

function traduzCor(corProduto) {

    if (!corProduto) return;

    switch (corProduto) {

        case 'azul': return 1;

        case 'vermelho': return 2;

        case 'preto': return 3;

        default: return 0;
    };
};

async function produzProduto(produto) {

    if (!produto) return;

    const body = {
        "payload": {
                "orderId": `pedido-${produto.id}-${produto.name}-${Date.now()}`,
                "caixa": {
                    "codigoProduto": 2,
                    "bloco1": {
		                    "cor": produto.color1,
                        "lamina1": 1,
                        "lamina2": 1,
                        "lamina3": 1,
                        "padrao1": "1",
                        "padrao2": "1",
                        "padrao3": "1"
                    },
                    "bloco2": {
		                    "cor": produto.color2,
                        "lamina1": 1,
                        "lamina2": 1,
                        "lamina3": 1,
                        "padrao1": "1",
                        "padrao2": "1",
                        "padrao3": "1"
                    },
                    "bloco3": {
		                    "cor": produto.color3,
                        "lamina1": 1,
                        "lamina2": 1,
                        "lamina3": 1,
                        "padrao1": "1",
                        "padrao2": "1",
                        "padrao3": "1"
                    }
                },
                "sku": "KIT-01"
            },
            "callbackUrl": "http://localhost:3000/pedidos"
            };

            console.log('Chegou prestes á produção!', body);
            const response = await axios.post('http://52.1.197.112:3000/queue/items', body, { timeout: 100000 });
            
            if (response.status === 201) {
                console.log(response.data);
            } else {

                console.log('Não deu certo.', response.data);
            };
};

module.exports = router;