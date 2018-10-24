import * as express from 'express';

interface User {
  id: number;
  name: string;
  password: string;
  dateOfBirth: Date;
  dateOfFirstLogin: Date;
  dateOfNextNotification: Date;
  information: string;
}

const bodyParser = require('body-parser');

const app = express();

const users: User[] = require('../users/users');

const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(user => {
    return user.id === req.params.id;
  });
  res.send(user);
});

app.put('/users/:id', (req, res) => {
  const user = users.find(user => {
    return user.id === req.params.id;
  });
  if (user) {
    user.name = req.body.name;
    user.information = req.body.information;
    res.sendStatus(200);
  } else {
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
    password: req.body.password,
    dateOfBirth: new Date(req.body.dateOfBirth),
    dateOfFirstLogin: firstLoginDate,
    dateOfNextNotification: new Date(req.body.dateOfNextNotification),
    information: req.body.information
  };
  users.push(user);
  res.sendStatus(200);
});

app.delete('/users/:id', (req, res) => {
  const Userr = users.find((user: User) => user.id === Number(req.params.id));
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


app.listen(port, () => {
  console.log(`Server successfully started on ${port} port `);
});
