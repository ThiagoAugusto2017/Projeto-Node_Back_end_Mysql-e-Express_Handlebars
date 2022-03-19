//* este metodos ele reutiliza as query ja utilizadas e tras autonomia e rapidez,
//* ela facilita a conexao e fechas as rotas nao utilizadas

const mysql = require('mysql')  // puxamos os dados do banco

const pool = mysql.createPool({ // toda a conexao com o banco de dados
  connectionLimit: 10, // mantemos 10 conexões
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql',
})

module.exports = pool // exportamos a mesma
