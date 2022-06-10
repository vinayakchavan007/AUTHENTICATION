const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../DbSchema/userSchema");

//Register
const register = async (req, res) => {
    if (!req.body.fname || !req.body.lname || !req.body.email || !req.body.password) {
        return res.status(400).send(`Please fill all the field.`)
    }
    // user already register then 
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        console.log(req.body.email);
        return res.status(400).send(`Email already exist.`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const saveUser = await newUser.save();
        const token = jwt.sign({ id: saveUser._id }, process.env.TOKEN_SECRET, { expiresIn: '5d' });
        return res.status(201).send({ "status": "success", "msg": "user created Successfully.", "token": token })
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
}

//Login User

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await User.findOne({ email: email });
            if (user) {
                console.log(user);
                const validPass = await bcrypt.compare(password, user.password);
                if (user.email === email && validPass) {
                    //Generate Token 
                    const token = await jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '5d' });
                    res.send({ "status": "success", "msg": "Login success.", "token":token})
                } else {
                    res.send({ "status": "unsuccess", "msg": "Email or password is not valid" });
                }
            } else {
                res.send({ "status": "unsuccess", "msg": "Your not Register User." });
            }
        }else{
            res.send({ "status": "unsuccess", "msg": "All field are require." })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(error);
    }
}
module.exports = { register, login }