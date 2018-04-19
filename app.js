var express = require('express')
var bodyParser = require('body-parser')
const port = 3000;
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())
const api = require('./server/routings/Todos')
const auth = require('./server/routings/Auth')


app.use('/Api',api);
app.use('/Auth',auth);


app.listen(port, err=>{
    if (err) throw err;
    console.log(`the server is running on port ${port}`)
});
