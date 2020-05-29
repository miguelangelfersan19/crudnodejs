const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();

// ruta de routers
const customerRoutes = require('./routes/customer');
// confi
app.set('port', process.env.PORT || 3005);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// funciones de peticiones de usuarios
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'crudnode',

}, 'single'));

app.use(express.urlencoded({ extended: false }));
//routes
app.use('/', customerRoutes);
//static file
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});