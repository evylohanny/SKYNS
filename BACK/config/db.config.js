const { Pool } = require("pg");

const pool = new Pool({
  user: "skyns_user",      
  host: "dpg-d3eo583uibrs73ce2mpg-a.oregon-postgres.render.com",     
  database: "skyns",
  password: "cWh5XqYSL5NKxzosKIoYTNRNvquvpcLp",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => console.log("📦 Conectado ao PostgreSQL Render!"))
  .catch(err => console.error("Erro ao conectar:", err));

module.exports = pool;