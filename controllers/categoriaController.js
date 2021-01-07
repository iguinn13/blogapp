const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');
const slugify = require('slugify');

router.get('/', (req, res) => {
    Categoria.findAll().then(categorias => {
        res.render('admin/categoria/index', {
            categorias
        });
    })
});

router.get('/novaCategoria', (req, res) => {
    res.render('admin/categoria/novaCategoria');
});

router.post('/cadastrarCategoria', (req, res) => {
    let titulo = req.body.titulo;

    Categoria.findOne({
        where:{
            titulo
        }
    }).then(t => {
        if(t == undefined){
            Categoria.create({
                titulo,
                slug: slugify(titulo)
            }).then(() => {
                res.redirect('/admin/categorias');
            }).catch(() => {
                res.redirect('/admin/categorias/novaCategoria');
            });
        } else {
            res.redirect('/admin/categorias/novaCategoria');
        }
    });
});

module.exports = router;