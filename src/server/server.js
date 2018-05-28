//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var TodoItems = require('./../model/todoItems')
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3000;
//db config
mongoose.connect('mongodb://laura315:prueba1234@ds235609.mlab.com:35609/todo')

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
//now we can set the route path & initialize the API
router.get('/', function (req, res) {
    res.json({ message: 'API Initialized!' });
});

//adding the /todoItems route to our /api router
router.route('/todoItems')
    //retrieve all todo items from the database
    .get(function (req, res) {
        //looks at our Comment Schema
        TodoItems.find(function (err, items) {
            if (err)
                res.send(err);
            //responds with a json object of our database units.
            res.json(items)
        });
    })
    //post a new todo item to the database
    .post(function (req, res) {
        var item = new TodoItems();
        //body parser lets us use the req.body

        item.title = req.body.title;
        item.description = req.body.description;
        item.category = req.body.category;
        item.user = req.body.user;
        item.percentage_complete = req.body.percentage_complete;
        item.date_from = req.body.date_from;
        item.date_to = req.body.date_to;

        item.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Todo item successfully added!' });
        });
    });

//adding the /todoItems:item_id route to our /api router
router.route('/todoItems/:item_id')
    //update todo items
    .put(function (req, res) {
        TodoItems.findById(req.params.item_id, function (err, item) {
            if (err)
                res.send(err);
            //setting the new data to whatever was changed. If nothing was changed
            // we will not alter the field.
            (req.body.title) ? item.title = req.body.title : null;
            (req.body.description) ? item.description = req.body.description : null;
            (req.body.category) ? item.category = req.body.category : null;
            (req.body.user) ? item.user = req.body.user : null;
            (req.body.percentage_complete) ? item.percentage_complete = req.body.percentage_complete : null;
            (req.body.date_from) ? item.date_from = req.body.date_from : null;
            (req.body.date_to) ? item.date_to = req.body.date_to : null;

            //save todo item
            item.save(function (err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Todo item has been updated' });
            });
        });
    })

    .delete(function (req, res) {
        TodoItems.remove({ _id: req.params.item_id }, function (err, comment) {
            if (err)
                res.send(err);
            res.json({ message: 'Todo items has been deleted' })
        });
    });

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function () {
    console.log(`api running on port ${port}`);
});