const express = require('express');
const router = express.Router();
const slugify = require('slugify');

const Categoria = require('../models/Categoria');
const Artigo = require('../models/Artigo');

router.get('/', (req, res) => {
    Artigo.findAll({
        include: [{model: Categoria, required: true}]
    }).then(artigos => {
        res.render('admin/artigo/index', {
            artigos: artigos
        });
    });
});

router.get('/novoArtigo', (req, res) => {
    Categoria.findAll().then(categorias => {
        res.render('admin/artigo/novoArtigo', {
            categorias
        });
    });
});

router.post('/cadastrarArtigo', (req, res) => {
    let titulo = req.body.titulo;
    let categoriaId = req.body.categoria;
    let corpo = req.body.corpo;

    Artigo.create({
        titulo: titulo,
        slug: slugify(titulo),
        corpo: corpo,
        categoriaId: categoriaId
    }).then(() => {
        res.redirect('/admin/artigos');
    })
});

router.get('/editar/:id', (req, res) => {
    
});

module.exports = router;