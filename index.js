// Below are all the packages that are required
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config();
const products_controller = require('./products_controller');

// Below is where our basic server will be created
// by saving express() to a variable called app
const app = express();

// Below is the middleware
app.use( bodyParser.json() );
app.use( cors() );

// Using the CONNECTION_STRING, we can invoke massive 
// and pass it in as the first argument. This will return a promise.
massive( process.env.CONNECTION_STRING )
// Once the promise is fulfilled, the .then will be sure to 
// capture the database instance in the first parameter.
// The dbInstance can be set onto app and the function
// will return app.set('db', dbInstance).
    .then( dbInstance => app.set('db', dbInstance) )
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    });

// These endpoints will call the methods on the controller. 
// This will also need a require the controller at the top of the index.js. 
app.post( '/api/product', products_controller.create );
app.get( '/api/products', products_controller.getAll );
app.get( '/api/product/:id', products_controller.getOne );
app.put( '/api/product/:id', products_controller.update );
app.delete( '/api/product/:id', products_controller.delete );

// this is where we tell the server to listen on port 3000 
// and use a console.log to tell us when it is listening
const port = process.env.PORT || 3000;
app.listen( port, () => { console.log(`${port} gremlins are in the machine.`); } );