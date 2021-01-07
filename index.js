const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sessao = require('express-session');

const categoriaController = require('./controllers/categoriaController');
const artigoController = require('./controllers/artigoController');
const usuarioAdminController = require('./controllers/usuarioAdminController');

const conexao = require('./database/database');
const Categoria = require('./models/Categoria');
const Artigo = require('./models/Artigo');
const Usuario = require('./models/Usuario');

conexao.authenticate().then(() => {
    console.log('Conexao com o banco de dados realizada com sucesso!');
}).catch((erro) => {
    console.log(erro);
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(sessao({
    secret: 'fvlkvcopskopqwf',
    cookie:{
        maxAge: 32312412412
    }
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/admin', usuarioAdminController);
app.use('/admin/categorias', categoriaController);
app.use('/admin/artigos', artigoController);

app.get('/', (req, res) => {
    res.send('saiu');
});

app.listen(8080, () => {
    console.log('Servidor rodando...');
});