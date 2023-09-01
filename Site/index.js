const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // res.sendFile('D:/Study/8_SEM/FRONTED DEVELOPMENT/Site/Index.html');
    // res.sendFile('D:/Study/8_SEM/FRONTED DEVELOPMENT/Site/Lab1.html');
    // res.sendFile('D:/Study/8_SEM/FRONTED DEVELOPMENT/Site/Lab2.html');
    // res.sendFile('D:/Study/8_SEM/FRONTED DEVELOPMENT/Site/Lab3.html');
    // res.sendFile('D:/Study/8_SEM/FRONTED DEVELOPMENT/Site/Lab4.html');
    // res.sendFile('D:/Study/8_SEM/FRONTED DEVELOPMENT/Site/Lab5.html');
    res.sendFile('D:/Study/8_SEM/FRONTED DEVELOPMENT/Site/Lab6.html');
    // res.send(req.url);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});