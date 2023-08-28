const express = require('express');
const routes = require('./routes');
const validateJWT = require('./auth/validateJWT');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...
app.get('/user', validateJWT, routes.getUsers);
app.post('/login', routes.login);
app.post('/user', routes.createUser);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
