const express = require('express');
const app = express();
const port = 3030;

//setup an express seerver, define a route "/" returns a welcome message
//requestListener syntax
//app.httpMethod(url, callbck)
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the website");
});

app.get("/contact", (req, res) =>{
    res.status(200).send("email - admin@techwave.com");
});

const users = [
    { id: 1, name: 'Deep'},
    { id: 2, name: 'Raj'}
];

app.get("/users", (req, res) => {
    res.json(users);
});

app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});