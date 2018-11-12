"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
const users = require('../users/users');
const port = 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/users', (req, res) => {
    res.json(users);
});
app.get('/users/:id', (req, res) => {
    const idU = users.find(user => {
        return user.id === Number(req.params.id);
    });
    res.send(idU);
});
app.put('/users/:id', (req, res) => {
    const idU = users.find(user => {
        return user.id === Number(req.params.id);
    });
    if (idU) {
        idU.name = req.body.name;
        idU.information = req.body.information;
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});
app.post('/users/add', (req, res) => {
    let usersLength = users.length;
    usersLength++;
    const firstLoginDate = new Date();
    const user = {
        id: Number(usersLength),
        name: req.body.name,
        age: req.body.age,
        password: req.body.password,
        birthday: new Date(req.body.birthday),
        dateOfLogin: firstLoginDate,
        dateOfNotification: new Date(req.body.dateOfNotification),
        information: req.body.information
    };
    users.push(user);
    res.sendStatus(200);
});
app.delete('/users/:id', (req, res) => {
    const Userr = users.find((user) => user.id === Number(req.params.id));
    if (Userr) {
        const userIndex = users.indexOf(Userr);
        users.splice(userIndex, 1);
        res.sendStatus(200);
    }
    res.sendStatus(404);
});
app.get('/', (req, res) => {
    res.send('hello guest');
});
app.post('/users/login', (req, res) => {
    const Userr = users.find((user) => user.name === req.body.name && user.password === req.body.password);
    res.send(Userr);
});
app.put('/users/change/:id', (req, res) => {
    const userId = users.find((user) => user.id === Number(req.body.id));
    if (userId) {
        userId.name = req.body.name;
        userId.age = req.body.age;
        userId.birthday = req.body.birthday;
        userId.password = req.body.password;
        userId.dateOfLogin = req.body.dateOfLogin;
        userId.dateOfNotification = req.body.dateOfNotification;
        userId.information = req.body.information;
        res.send(userId);
    }
    else {
        res.sendStatus(404);
    }
});
app.post('/users/name', (req, res) => {
    const name = users.filter(user => user.name.includes(req.body.name));
    res.send(name);
});
app.post('/users/password', (req, res) => {
    const Password = users.find((user) => user.name === req.body.name);
    res.send(Password);
});
app.listen(port, () => {
    console.log(`Server successfully started on ${port} port `);
});
//# sourceMappingURL=app.js.map