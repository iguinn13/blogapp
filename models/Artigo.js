const Sequelize = require('sequelize');
const conexao = require('../database/database');
const Categoria = require('./Categoria');

const Artigo = conexao.define('artigos', {
    titulo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    slug:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Artigo.belongsTo(Categoria);
Categoria.hasMany(Artigo);

//Artigo.sync({force: false});

module.exports = Artigo;