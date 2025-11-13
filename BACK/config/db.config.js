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

  getPool () {

    return pool;
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

  async buscaFotosProdutos () {

    try {
    
      const sql = 'SELECT * FROM fotos';
      const response = await pool.query(sql);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    };
  };

    async buscaProdutos(tipo) {
    let query = "SELECT * FROM produtos";

    if (!tipo) {
      query += " WHERE personalizado = 0";
    } else if (tipo) {
      query += " WHERE personalizado = 1";
    }

    query += " ORDER BY data_lancamento DESC";
    const [rows] = await pool.query(query);
    return rows;
  }

  async buscaProdutoPorId(id) {
    const response = await pool.query("SELECT * FROM produtos WHERE id_produto = $1", [id]);
    return response.rows[0];
  };

  buscaFotoProduto () {

      return 'SELECT url FROM fotos WHERE fk_id_produto=$1 AND posicao=$2';
  };

  criaNovaFoto () {
      
      return 'INSERT INTO fotos (url, posicao, fk_id_produto) VALUES ($1, $2, $3) RETURNING *';
  };
};

module.exports = DbService;