const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');
const slugify = require('slugify');
const adminAuthentication = require('../middlewares/adminAuthentication');

router.get('/', adminAuthentication , (req, res) => {
    Categoria.findAll().then(categorias => {
        res.render('admin/categoria/index', {
            categorias
        });
    })
});

router.get('/novaCategoria', adminAuthentication , (req, res) => {
    res.render('admin/categoria/novaCategoria');
});

router.post('/cadastrarCategoria', adminAuthentication , (req, res) => {
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

router.get('/editar/:id', adminAuthentication , (req, res) => {
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

router.post('/confirmarEdicao', adminAuthentication , (req, res) => {
    let id = req.body.id;
    let titulo = req.body.titulo;
    let tituloAntigo = req.body.tituloAntigo;

    if(titulo == tituloAntigo){
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
    } else if(titulo != tituloAntigo){
        Categoria.findOne({
            where:{
                titulo
            }
        }).then(categoria => {
            if(categoria == undefined){
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
                });
            } else {
                res.redirect('/admin/categorias/editar/' + id);
            }
        }).catch(() => {
            res.redirect('/admin/categorias/editar/' + id);
        });
    }
});

router.post('/deletar', adminAuthentication , (req, res) => {
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