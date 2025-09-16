const express = require('express');
const cors = require('cors');
const path = require('path');

const authPedidos = require('./Routes/pedidos.js');
// const userRoutes = require('./Routes/user.routes');
// const chatRoutes = require('./Routes/chat.routes');
// const appointmentRoutes = require('./Routes/appointment.routes');
// const subscriptionRoutes = require('./Routes/subscription.routes');

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', authPedidos);
// app.use('/', userRoutes);
// app.use('/', chatRoutes);
// app.use('/', appointmentRoutes);
// app.use('/', subscriptionRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
});

module.exports = app;