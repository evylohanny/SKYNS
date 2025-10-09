const express = require('express');
const cors = require('cors');
const path = require('path');

const pedidosProducao = require('./Routes/IOT/pedidos.js');
const pedidos = require('./Routes/pedidos.js');
const produtos = require('./Routes/produtos.js');
const pagamento = require('./Routes/pagamento.js');
const gestao = require('./Routes/gestao.js');

const user = require('./Routes/user.js');
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', pedidosProducao);
app.use('/', pedidos);
app.use('/', pagamento);
app.use('/', gestao);
app.use('/', produtos);
app.use('/', pagamento);
app.use('/', user);

app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
});

module.exports = app;