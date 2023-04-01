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

app.get("/api/testapidata", (req, res) => {
    res.json({
        testapidata: true
    });
});

app.get("/testWithCurrentUser", (req, res) => {
    axios.get(authApiUrl + "/currentUser").then(response => {
        res.json({
            testWithCurrentUser: true,
            currentUserFromAuth: response.data
    });
    });
});

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port: ${port}`);
        console.log(`On host ${host}`)
        console.log(`On database ${db}`)

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

connectDb()
.on("error", console.log)
.on("disconnected", connectDb)
.once("open", startServer);