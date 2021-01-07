const Sequelize = require('sequelize');
const conexao = require('../database/database');

const Categoria = conexao.define('categorias', {
    titulo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    slug:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Categoria.sync({force: false});

module.exports = Categoria;