const mongoose = require("mongoose");

const connectDB = (uri) => {
    mongoose.connect(uri, {
        dbName: 'Ecommerce'
    }).then((c) => {
        console.log("DB connected");
    }).catch((e) => console.log(e));
}



module.exports = { connectDB };