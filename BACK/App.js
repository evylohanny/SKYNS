const express = require('express');
const cors = require('cors');
const path = require('path');

const pedidosProducao = require('./Routes/IOT/pedidos.js');
const pedidos = require('./Routes/pedidos.js');
const home = require('./Routes/home.js');
const pagamento = require('./Routes/pagamento.js');
const gestao = require('./Routes/gestao.js');

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', pedidosProducao);
app.use('/', pedidos);
app.use('/', home);
app.use('/', pagamento);
app.use('/', gestao);

app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
});

module.exports = app;