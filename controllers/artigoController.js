const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const adminAuthentication = require('../middlewares/adminAuthentication');

const Categoria = require('../models/Categoria');
const Artigo = require('../models/Artigo');

router.get('/', adminAuthentication ,(req, res) => {
    Artigo.findAll({
        include: [{ model: Categoria, required: true }]
    }).then(artigos => {
        res.render('admin/artigo/index', {
            artigos: artigos
        });
    });
});

router.get('/novoArtigo', adminAuthentication , (req, res) => {
    Categoria.findAll().then(categorias => {
        res.render('admin/artigo/novoArtigo', {
            categorias
        });
    });
});

router.post('/cadastrarArtigo', adminAuthentication , (req, res) => {
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

router.get('/editar/:id', adminAuthentication , (req, res) => {
    let id = req.params.id;

    Artigo.findByPk(id).then(artigo => {
        if(artigo != null){
            Categoria.findAll().then(categorias => {
                res.render('admin/artigo/editar', {
                    categorias,
                    artigo
                });
            })
        } else {
            res.redirect('/admin/artigos');
        }
    }).catch(() => {
        res.redirect('/admin/artigos');
    });
});

router.post('/confirmarEdicao', adminAuthentication , (req, res) => {
    let id = req.body.id;
    let titulo = req.body.titulo;
    let categoria = req.body.categoria;
    let corpo = req.body.corpo;

    Artigo.update({
        titulo,
        categoriaId: categoria,
        corpo
    },
    {
        where:{
            id
        }
    }
    ).then(() => {
        res.redirect('/admin/artigos');
    }).catch(() => {
        res.redirect('/admin/artigos');
    });
});

router.post('/deletar', adminAuthentication , (req, res) => {
    let id = req.body.id;

    Artigo.destroy({
        where:{
            id
        }
    }).then(() => {
        res.redirect('/admin/artigos');
    }).catch(() => {
        res.redirect('/admin/artigos');
    });
});

module.exports = router;