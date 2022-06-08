var express = require('express');
var router = express.Router();
const { register } =  require("../controller.js/userController");


router.post('/register', async (req,res)=> {
    const data = await register(req, res);
});

module.exports = router;
