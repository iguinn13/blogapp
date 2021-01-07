const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/categoria/index');
});

module.exports = router;