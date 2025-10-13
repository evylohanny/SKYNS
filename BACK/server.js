const PORT = process.env.PORT || 3000;
const DbService = require("./config/db.config");
const app = require('./App');
  
app.get("/teste-db", async (req, res) => {
  try {

    const test = new DbService();
    const response = test.testeDb;
    
    if (response) {

      res.status(200).json({
        message: 'Conectado ao banco de dados SKYNS!'
      });
    };
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao consultar o banco");
  };
});

app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:3000");
});