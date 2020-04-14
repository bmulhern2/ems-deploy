/*
============================================
; Title:  Assignment-5.4
; Author: Professor Krasso, robertklep
; Date:   21 March 2020
; Modified By: Brendan Mulhern
; Description: This is the header; nav and footer of the ems project.
;===========================================
*/
var express = require('express');
var http = require('http');
var path = require('path');
var employee = require("./models/employee");
var logger = require('morgan');
var helmet = require("helmet");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var string = "mongodb+srv://bmulhern2:Bmole22%21%21@cluster0-eopst.mongodb.net/test";
var db = mongoose.connect(string, { useUnifiedTopology: true, useNewUrlParser: true});

var app = express();
app.use(logger("short"));
app.use(bodyParser.urlencoded({
extended: true
}));
app.set("port", processs.env.PORT || 8080)
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("short"));
app.use(helmet.xssFilter());
app.use(cookieParser());
app.get("/view/:queryName", function(request, response) {
    var queryName = request.params.queryName;
    employee.find({'name': queryName}, function(error, employees) {
        if(error) throw error;
        console.log(employees);
        if (employees.length > 0) {
            response.render("view", {
                title: "Employee Record",
                employee: employees
            })
        } else {
            response.redirect("/list");
        }
        })
    })
app.get("/", function (req, res) { 
    res.render("index", {
    title: "XSS Prevention Example"
    })
})
app.get("/new", function(req, res) {
    res.render("new");
})
app.post("/process", function(req, res) {
    var newEmployee = new employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }) 
    employee.create(newEmployee);
    res.redirect("/");
})
http.createServer(app).listen(app.get("port"), function() {
    console.log("Application started on Port 8080!");
})