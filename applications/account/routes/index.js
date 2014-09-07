var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res) {
    res.render('index', { title: 'Login Page aaa' });
});

router.post('/login', function (req, res) {
    res.json({
        name: "sunlei",
        age: 26
    });
});

module.exports = router;
