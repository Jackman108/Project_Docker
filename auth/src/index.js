const express = require('express');
const axios = require('axios')
const { connectDb } = require('./helpers/db');
const { host, port, db, apiUrl } = require('./configuration');

const app = express();

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port: ${port}`);
        console.log(`On host ${host}`)
        console.log(`On database ${db}`)
    });
}

app.get("/test", (req, res) => {
    res.send("Our auth server is working correctly");
});

app.get("/api/currentUser", (req, res) => {
    res.json({
        id: "1234",
        email: "foo@gmail.com"
    });
});

app.get("/testwithapidata", (req, res) => {
    axios.get(apiUrl + "/testapidata").then(response => {
        res.json({
            testapidata: response.data.testapidata
        });
    });
}); 

connectDb()
.on("error", console.log)
.on("disconnected", connectDb)
.once("open", startServer);