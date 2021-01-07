const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const adminAuthentication = require('../middlewares/adminAuthentication');

router.get('/', (req, res) => {
    res.render('admin/index');
});

router.post('/autenticar', (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;

    Usuario.findOne({
        where:{
            email
        }
    }).then(usuario => {
        if(usuario != undefined){
            let senhaCorreta = bcrypt.compareSync(senha, usuario.senha);

            if(senhaCorreta && usuario.eAdmin == true){
                req.session.admin = {
                    id: usuario.id,
                    email: usuario.email
                }

                res.redirect('/admin/artigos');
            } else {
                res.redirect('/admin');
            }
        }
    }).catch(() => {
        res.redirect('/admin');
    });
});

router.get('/cadastrarAdmin',  adminAuthentication ,(req, res) => {
    res.render('admin/cadastrarAdmin');
});

router.post('/salvarNovoAdmin', adminAuthentication , (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;

    Usuario.findOne({
        where:{
            email
        }
    }).then(usuario => {
        if(usuario == undefined){
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(senha, salt);

            Usuario.create({
                email,
                senha: hash,
                eAdmin: true
            }).then(() => {
                res.redirect('/admin/artigos');
            }).catch(() => {
                res.redirect('/admin/cadastrarAdmin');
            });
        } else {
            res.redirect('/admin/cadastrarAdmin');
        }
    })
});

router.get('/logout', adminAuthentication ,(req, res) => {
    req.session.admin = undefined;

    res.redirect('/');
});

module.exports = router;