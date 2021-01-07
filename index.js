const express = require('express');
const app = express();
const categoriaController = require('./controllers/categoriaController');

app.set('view engine', 'ejs');

app.use('/admin/categorias', categoriaController);

app.listen(8080, () => {
    console.log('Servidor rodando...');
});