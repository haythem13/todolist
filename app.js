var express = require('express')
var bodyParser = require('body-parser')
const port = 3000;
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())
const api = require('./server/routings/Todos')
const auth = require('./server/routings/Auth')


app.use('/Api',api);
app.use('/Auth',auth);


app.listen(port, err=>{
    if (err) throw err;
    console.log(`the server is running on port ${port}`)
});
