const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importar routes
const   customerRoutes = require('./routes/customer');

//ajustes
app.set('port', process.env.PORT || 3306);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
//CAMBIAR LA RUTA AL SERVIDOR DE AWS
app.use(myConnection(mysql, {
    host: 'dbinstance.cclh9pxaumqj.us-east-1.rds.amazonaws.com',
    user: 'Diego',
    password: 'Diego_123',
    port: 3306,
    database: 'dblaboratorio'
}, 'single'));

//rutas
app.use('/',customerRoutes);

//staticFiles
app.use(express.static(path.join(__dirname, 'public' )))

//server

app.listen(app.get('port'), () => {
    console.log('Server on port 3306')
});