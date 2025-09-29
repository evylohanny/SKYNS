// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//     host: 'nozomi.proxy.rlwy.net',
//     port: 33546,
//     user: 'root',
//     password: 'iiKsgqutnDNKXicApVVxBVGHYuYiiXzB',
//     database: 'railway',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// module.exports = pool;


// db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "SKYNS",
  password: "skyns",
  port: 5432,
});

// Testar a conexão
pool.connect()
  .then(() => console.log("📦 Conectado ao PostgreSQL!"))
  .catch(err => console.error("Erro ao conectar:", err));

module.exports = pool;
