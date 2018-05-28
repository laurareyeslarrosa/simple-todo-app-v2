//model/todo.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var TodoSchema = new Schema({
    title: String,
    description: String,
    category: String,
    user: String,
    percentage_complete: String,
    date_from: String,
    date_to: String
});
//export our module to use in server.js
module.exports = mongoose.model('TodoItems', TodoSchema);