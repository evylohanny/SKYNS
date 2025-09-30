const PORT = process.env.PORT || 3000;
const pool = require("./config/db.config");
const app = require('./App');
  
app.get("/teste-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao consultar o banco");
  };
});

app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:3000");
});