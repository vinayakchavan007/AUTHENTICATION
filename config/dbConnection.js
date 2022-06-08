const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log(`MongoDB Connected successfully..`.cyan.bold);
        })
        .catch((err) => {
            console.log(err);
            console.log(`DB connection failed`.red);
        })
}

module.exports = connectDB;