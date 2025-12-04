const express = require('express');
require('dotenv').config();
const app = express();
const configureDB = require('./config/db');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const usersCltr = require('./app/controllers/user-cltr');
const productsCltr = require('./app/controllers/product-cltr');
const authenticateUser = require('./app/middlewares/authenticate');
const authorizeUser = require('./app/middlewares/authorize');
const port = process.env.PORT || 5050

app.use(express.json());
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}));
configureDB();

// users 
app.post('/api/users/register', usersCltr.register);
app.post('/api/users/login', usersCltr.login);
app.get('/api/users/account', authenticateUser, authorizeUser(['admin']), usersCltr.list);
app.post('/api/users/create-moderator', authenticateUser, authorizeUser(['admin']), usersCltr.createModerator);

// products
app.post('/api/products', authenticateUser, authorizeUser(['admin', 'moderator']), productsCltr.create);
app.get('/api/products', productsCltr.list);

app.listen(port, () => {
    console.log(`mern-fullstack server is running in ${port}`)
})