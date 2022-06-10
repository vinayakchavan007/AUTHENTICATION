const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../DbSchema/userSchema");

//Register
const register = async (req, res) => {
    const { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) {
        return res.status(400).send({ "status": "unsuccess", "msg": "All field are mandatory.", "token": token })
    }
    // user already register then 
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
        console.log(req.body.email);
        return res.status(409).send({ "status": "success", "msg": "User already with same email .", "token": token });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = new User({
        fname: fname,
        lname: lname,
        email: email,
        password: hashPassword
    });
    try {
        const saveUser = await newUser.save();
        const token = jwt.sign({ id: saveUser._id }, process.env.TOKEN_SECRET, { expiresIn: '5d' });
        return res.status(201).send({ "status": "success", "msg": "user created Successfully.", "token": token })
    } catch (err) {
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
        res.status(500).send(err);
    }
}
module.exports = { register, login }