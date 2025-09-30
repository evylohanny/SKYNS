const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "SKYNS",
  password: "skyns",
  port: 5432,
});

pool.connect()
  .then(() => console.log("📦 Conectado ao PostgreSQL!"))
  .catch(err => console.error("Erro ao conectar:", err));

module.exports = pool;
