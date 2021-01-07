const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/categoria/index');
});

router.get('/novaCategoria', (req, res) => {
    res.render('admin/categoria/novaCategoria');
});

module.exports = router;