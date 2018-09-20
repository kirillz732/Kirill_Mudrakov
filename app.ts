    const express = require('express');

    const bodyParser = require('body-parser');

    const app = express();

    let users = require('./users.json');

    const port = 8000;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/users', (req, res) => {
        res.send(users);
    });

    app.get('/users/:id', (req, res) => {
        let user = users.find(user => {
            return user.id === req.params.id;
        });
        res.send(user);
    });

    app.put('/users/:id', (req, res) => {
        let user = users.find(user => {
            return user.id === req.params.id;
        });
        user.name = req.body.name;
        user.password = req.body.password;
        user.information = req.body.information;
        res.sendStatus(200);
    });

    app.post('/users/add', (req, res) => {
        const firstLoginDate = new Date();
        let user = {
            id: req.body.id,
            name: req.body.name,
            password: req.body.password,
            dateOfBirth: new Date(req.body.dateOfBirth).toISOString(),
            dateOfFirstLogin: firstLoginDate,
            dateOfNextNotification: new Date(req.body.dateOfNextNotification).toISOString(),
            information: req.body.information
        };
        users.push(user);
        res.sendStatus(200);
    });

    app.delete('/users/:id', (req, res) => {
        users = users.filter(user =>{
           return user.id !== req.params.id;
        });
        res.sendStatus(200);
    });

    app.get('/', (req, res) => {
        res.send('hello guest');
    });



    app.listen(port, () =>{
        console.log(`Server successfully started on ${port} port `);
    });