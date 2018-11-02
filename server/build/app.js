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
    const user = users.find(user => {
        return user.id === Number(req.params.id);
    });
    res.send(user);
});
app.put('/users/:id', (req, res) => {
    const user = users.find(user => {
        return user.id === Number(req.params.id);
    });
    if (user) {
        user.name = req.body.name;
        user.information = req.body.information;
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
    setTimeout(() => {
        const Userr = users.find((user) => user.name === req.body.name && user.password === req.body.password);
        res.send(Userr);
    }, 3000);
});
app.put('/users/change/:id', (req, res) => {
    const User = users.find((user) => user.id === Number(req.body.id));
    if (User) {
        User.name = req.body.name;
        User.age = req.body.age;
        User.birthday = req.body.birthday;
        User.password = req.body.password;
        User.dateOfLogin = req.body.dateOfLogin;
        User.dateOfNotification = req.body.dateOfNotification;
        User.information = req.body.information;
        res.send(User);
    }
    else {
        res.sendStatus(404);
    }
});
app.post('/users/password', (req, res) => {
    const Password = users.find((user) => user.name === req.body.name);
    res.send(Password);
});
app.listen(port, () => {
    console.log(`Server successfully started on ${port} port `);
});
//# sourceMappingURL=app.js.map