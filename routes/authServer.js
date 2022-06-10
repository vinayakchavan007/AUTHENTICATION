var express = require('express');
var router = express.Router();
const { register, login } =  require("../controller.js/userController");


router.post('/register', async (req,res)=> {
    try {
        const data = await register(req, res);
    } catch (err) {
        res.status(500).send(`Internal error`);
    }
});

router.post('/login', async (req,res)=>{
    try {
        const loginResp = await login(req,res);
    } catch (err) {
        res.status(500).send(`Internal error`);
    }
});

module.exports = router;
