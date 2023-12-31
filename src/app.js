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
app.get('/user', validateJWT, routes.getAllUsers);
app.get('/user/:id', validateJWT, routes.getUserById);
app.post('/login', routes.login);
app.post('/user', routes.createUser);
app.get('/categories', validateJWT, routes.getCategories);
app.post('/categories', validateJWT, routes.createCategory);
app.post('/post', validateJWT, routes.createPost);
app.get('/post', validateJWT, routes.getPosts);
app.get('/post/:id', validateJWT, routes.getPostById);
app.put('/post/:id', validateJWT, routes.updatePost);
app.delete('/post/:id', validateJWT, routes.delet);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
