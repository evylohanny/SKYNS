// const app = require('./App');
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
// });

// module.exports = app;
// Se o Node estiver configurado para ESModules
const express = require("express");
const pool = require("./config/db.config"); // importa a conexão

const app = express();
app.use(express.json());

// rota de teste com o banco
app.get("/teste-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco");
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
