const axios = require('axios')
const express = require("express");
const path = require("path");

const app = express();

const backendHost = 'http://127.0.0.1';
const backendPort = '8080';

app.use(express.json());
app.use("/static", express.static(path.resolve(__dirname, "static")));

app.post("/api/:operation", (req, res) => {
  const operation = req.params['operation'];
  const requestUrl = `${backendHost}:${backendPort}/api/${operation}`;
  console.log('Operation:', operation);
  console.log('Request URL:', requestUrl);
  console.log('Request Body:', req.body);

  axios.post(
    requestUrl,
    req.body
  ).then(response => {
    res.json(response.data);
  }).catch(error => {
    console.log("Error: " + error);
    console.log(error.trace);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});
app.listen(process.env.PORT || 3000, () => console.log("Server running..."));