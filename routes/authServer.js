var express = require('express');
var router = express.Router();

router.post('/register', function (req, res, next) {
    res.send({
        msg: "working"
    })
});

module.exports = router;
