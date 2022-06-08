const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../DbSchema/userSchema");

//Register
const register = async (req, res) => {
    if(!req.body.fname || !req.body.lname || !req.body.email || !req.body.password){
        return res.status(400).send(`Please fill all the field.`)
    }
    // user already register then 
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        console.log(req.body.email);
        return res.status(400).send(`Email already exist.`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hash(req.body.password, salt);

    //Create new user
    const newUser = new User({
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        password : req.body.password
    });
    try {
        const saveUser = await newUser.save();
        return res.status(200).send("user created Successfully.")        
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { register }