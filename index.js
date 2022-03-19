const express = require('express');
const exphbs = require('express-handlebars');
const poll = require('./db/conn') // conectamos com o arquivo


//Todo - temos que trocar a conexao conn agora pela poll
//!com o metodo poll mudamos a conexao
//const mysql = require('mysql');

const app = express();

app.use(
  express.urlencoded({ // para pegarmos o bory

    extended: true,
  })
)

app.use(express.json()) // para pegar o bory em JSON

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => { // para renderizar a home;
  res.render('home')

})

//* aqui mais uma chamada de envios de dados

app.post('/books/insertbook', (req, res) => { // para enviar os dados para o banco de dados

  const title = req.body.title; // estes dados sao como estao dentro do banco de dados
  const pageqty = req.body.pageqty; // estes dados sao como estao dentro do banco de dados

  //! usamos este metodo para o input de dados dentro do banco de dados
 const sql = `INSERT INTO books (??,??) VALUES (?,?)`
  const data = ['title','pageqty',title,pageqty]

  //! trocamos o metodo para deixar a aplicação segura
  // const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`
  // const data = ['title','pageqty','title','pageqty']

  poll.query(sql,data, function (err) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/')
  })
});

//* aqui mais uma chamada de envios de dados

app.post('/carros/insertcarros', (req, res) => {
  const carro = req.body.carro;
  const placa = req.body.placa;

  const sql2 = `INSERT INTO carros (carro,placa) VALUES ('${carro}','${placa}')`

  poll.query(sql2, function (err) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/')
  })

})


//* uma chamada busca de dados

app.get('/books', function (req, res) { //pegamos estes dados do banco de dados
  const sql = 'SELECT * FROM books'

  poll.query(sql, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    const books = data
    console.log(books)

    res.render('books', {books })
  })

})

//* resgatando dados especificos
app.get('/books/:id', (req, res) => {

  const id = req.params.id

  //! usamos este metodo para o input de dados dentro do banco de dados
  const sql = `SELECT * FROM books WHERE ?? = ?`
  const data = ['id',id]

   //! trocamos o metodo para deixar a aplicação segura
 // const sql = `SELECT * FROM books WHERE id = ${id}`

  poll.query(sql,data, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    const book = data[0]
    console.log(book)

    res.render('book', {book})
  })

})

//* puxamos os dados especificos para dentro do front

app.get('/books/edit/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM books WHERE id = ${id}`

  poll.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const book = data[0]

    console.log(data[0])

    res.render('editbook', { book })
  })
})

//* esta função embaixo usamos para atualizar dados expecificos segment

app.post('/books/updatebook', (req, res) => {

  const id = req.body.id; //! mapiamos os dados
  const title = req.body.title;//! mapiamos os dados
  const pageqty = req.body.pageqty;//! mapiamos os dados

               //* esta sintaxe e para o MYSQL                 //* dado que sera atualizado
  const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = '${id}'`

 poll.query(sql, function (err, data) {  //! function do erro
    if (err) {
      console.log(err)
    }

    res.redirect('/books')

  })
})


//* função abaixo sera para  deletar os dados

app.post('/books/remove/:id', (req, res) => {

  const id = req.params.id; //! mapiamos os dados

  //* esta sintaxe e para o MYSQL    //* dado que sera deletado
  const sql = `DELETE FROM books WHERE id = '${id}'`

 poll.query(sql, function (err, data) {  //! function do erro
    if (err) {
      console.log(err)
    }

    res.redirect('/books')

  })
})



//! agora usamos o metodo poll e nao mais esta conexao
//*para acessar o banco de dados
// const conn = mysql.createConnection({ //aqui sao as propriedades para acessar o banco de dados
//   host: 'localhost',                  // agora temos que colocar os mesmos dados com o banco de dados
//   user: 'root',
//   password: '',
//   database: 'nodemysql'
// });


// conn.connect((err) => { // montamos uma resposta de erro

//   if (err) {

//     console.log(err)
//   }

//   console.log('Connection in MYSQL')

//   app.listen(3000)
// });
app.listen(3000)
