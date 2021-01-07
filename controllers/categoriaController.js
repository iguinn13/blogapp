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

router.get('/editar/:id', (req, res) => {
    let id = req.params.id;

    Categoria.findOne({
        where:{
            id
        }
    }).then(categoria => {
        if(categoria != undefined){
            res.render('admin/categoria/editar', {
                categoria
            });
        } else {
            res.redirect('/admin/categorias');
        }
    }).catch(() => {
        res.redirect('/admin/categorias');
    });
});

router.post('/confirmarEdicao', (req, res) => {
    let id = req.body.id;
    let titulo = req.body.titulo;

    Categoria.update({
        titulo,
        slug: slugify(titulo)
    },
    {
        where:{
            id
        }
    }).then(() => {
        res.redirect('/admin/categorias');
    }).catch(() => {
        res.redirect('/admin/categorias/editar/' + id);
    })
});

router.post('/deletar', (req, res) => {
    let id = req.body.id;

    Categoria.destroy({
        where:{
            id
        }
    }).then(() => {
        res.redirect('/admin/categorias');
    })
});

module.exports = router;