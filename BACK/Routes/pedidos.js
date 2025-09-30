const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/pedidos', async(req, res) => {

    try {
        
        const response = await axios.get('http://52.1.197.112:3000/queue/items', { timeout: 100000 });
    
        res.json(response.data);
    } catch (error) {
        
        res.json({ message: error });
    };

});

router.post('/pedidos', async(req, res) => {

    try {
        
        const { pedido } = req.body;
    
        filaDeEspera(pedido);
    
        res.json({ message: 'Pedido recebido com sucesso!'});
    } catch (error) {
        
        res.json({ message: `Erro ao receber pedido! ${error}` });
    };

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

    produto.color1 = traduzCor(produto.color1);
    produto.color2 = traduzCor(produto.color2);
    produto.color3 = traduzCor(produto.color3);
    produto.draw1 = traduzDesenho(produto.draw1);
    produto.draw2 = traduzDesenho(produto.draw2);
    produto.draw3 = traduzDesenho(produto.draw3);

    console.log('Traduziu produto!');
    return await produzProduto(produto);
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

function traduzDesenho(desenhoProduto) {

    if (!desenhoProduto) return;

    switch (desenhoProduto) {

        case 'casa': return 1;

        case 'barco': return 2;

        case 'estrela': return 3;

        default: return 0;
    };
};

async function produzProduto(produto) {

    try {
        
        if (!produto) return;
    
        const body = {
            "payload": {
                    "orderId": `pedido-${produto.id}-${produto.name}-${Date.now()}`,
                    "caixa": {
                        "codigoProduto": 1,
                        "bloco1": {
                                "cor": 0,
                            "lamina1": produto.color1,
                            "lamina2": 1,
                            "lamina3": 1,
                            "padrao1": produto.draw1,
                            "padrao2": "1",
                            "padrao3": "1"
                        },
                        "bloco2": {
                                "cor": 0,
                            "lamina1": produto.color2,
                            "lamina2": 1,
                            "lamina3": 1,
                            "padrao1": produto.draw2,
                            "padrao2": "1",
                            "padrao3": "1"
                        },
                        "bloco3": {
                                "cor": 0,
                            "lamina1": produto.color3,
                            "lamina2": 1,
                            "lamina3": 1,
                            "padrao1": produto.draw3,
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

        if (response.status === 404) {

            console.log('Erro ao enviar produto', response.status);
        } else if (response.status === 201) {

            console.log('Produto enviado com sucesso!', response.status);
            return response;
        }

    } catch (error) {
            
        console.log('Não deu certo.', error);
    }
};

module.exports = router;