const { Pool } = require("pg");
let instance = null;

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

class DbService {

  static getDbServiceInstance() {

    return instance ? instance : new DbService();
  };

  async testeDb () {

    try {
      
      const sql = 'SELECT NOW()';
      const response = await pool.query(sql);
      return response.rows;
    } catch (error) {
      console.log(error);
      return false;
    };
  };    

  async buscaUsuarios () {

    try {
      
      const sql = 'SELECT * FROM usuario';
      const response = await pool.query(sql);
      return response.rows;
    } catch (error) {
      console.log(error);
      return false;
    };
  };

  async buscaProdutos () {
    try {
      
      const sql = 'SELECT * FROM produtos';
      const response = await pool.query(sql); 
      return response.rows;
    } catch (error) {
      console.log(error);
      return false;
    };
  };

  async buscaPedidos () {
    try {
      
      const sql = 'SELECT * FROM pedidos';
      const response = await pool.query(sql); 
      return response.rows;
    } catch (error) {
      console.log(error);
      return false;
    };
  };

  async buscaPagamentos () {
    try {
      
      const sql = 'SELECT * FROM pagamento';
      const response = await pool.query(sql); 
      return response.rows;
    } catch (error) {
      console.log(error);
      return false;
    };
  };

  async buscaProdutosPersonalizaveis () {
    try {
      
      const sql = 'SELECT * FROM produtos WHERE personalizavel = $1';
      const response = await pool.query(sql, [true]); 
      return response.rows;
    } catch (error) {
      console.log(error);
      return false;
    };
  };

};

module.exports = DbService;