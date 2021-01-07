const Sequelize = require('sequelize');
const conexao = new Sequelize('db_blogapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = conexao;