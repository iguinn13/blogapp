const Sequelize = require('sequelize');
const conexao = require('../database/database');

const Usuario = conexao.define('usuarios', {
    email:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    senha:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    eAdmin:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

//Usuario.sync({force: false});

module.exports = Usuario;