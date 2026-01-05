const mongoose = require('mongoose');

async function connectToMongoDb(url) {
    return mongoose.connect(url)
    .then(()=>{
        console.log("Mongodb Connected");
    })
    .catch((err)=> {
        console.log("Mongo Error", err)
    })
}

module.exports = connectToMongoDb;