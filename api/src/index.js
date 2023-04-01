const express = require('express');
const mongoose = require("mongoose");
const axios = require('axios');
const { connectDb } = require('./helpers/db');
const { host, port, db, authApiUrl } = require('./configuration');
const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model('Post', postSchema)

const app = express();

app.get("/test", (req, res) => {
    res.send("Our api server is working correctly");
}); 

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port: ${port}`);
        console.log(`On host ${host}`)
        console.log(`On database ${db}`)

        /* Post.find(function(err, posts) {
            if (err) return console.error(err);
            console.log("posts", posts)
        })*/

        const silence = new Post({ name: "Silence" });
        silence.save()
        .then(function (savedSilence) {
        console.log("savedSilence", savedSilence);
        })
        .catch(function (err) {
  console.log(err);
        });
    });
}

app.get("/test", (req, res) => {
    res.send("Our api server is working correctly");
});

app.get("/testWithCurrentUser", (req, res) => {
    axios.get(authApiUrl + "/currentUser").then(response => {
        res.json({
            testWithCurrentUser: true,
            currentUserFromAuth: response.data
    });
    });
});

connectDb()
.on("error", console.log)
.on("disconnected", connectDb)
.once("open", startServer);