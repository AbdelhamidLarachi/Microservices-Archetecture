const mongoose = require("mongoose");
const express = require("express")
const app = require("./src/app")


const uri = "mongodb://zizouLivreur:zizouLivreur@globalcluster-shard-00-00.sodgj.mongodb.net:27017,globalcluster-shard-00-01.sodgj.mongodb.net:27017,globalcluster-shard-00-02.sodgj.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-u20azu-shard-0&authSource=admin&retryWrites=true&w=majority"

// Connect to MongoDB
mongoose.set('useUnifiedTopology', true);
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then((res) => {
        console.log('MongoDB Connected')

    })
    .catch((err) => console.log(err));

// Redirect to express app

app.listen(3000, () => {
    console.log(`running on port 3000`);
});