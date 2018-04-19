const router = require('express').Router();

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/todolist', (err, client) => {
        if (err) return console.log(err);
        console.log('connection OKKKK ')
        let db = client.db('todolist');
        closure(db);

    })
}

const sendError = (err, res, code) => {
  response.status = code;
  response.message = typeof err == 'object' ? err.message : err;
  response.data = [];
  res.status(code).json(response);
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

router.post('/register', function (req, res) {
  let qry =  {"email":req.body.email};
  connection(db=>{
      db.collection('Users').findOne(qry).then(result=>{
          if (result)
              res.send('account already exists')
          else {
              db.collection('Users').insertOne(req.body)
              res.send('register succes')
          }
      }).catch(err=>{
          sendError(err,res,501);
      })
  })
})


router.post('/login', function (req, res) {
    let qry =  {"email":req.body.email, "password": req.body.password};
    connection(db=>{
        db.collection('Users').findOne(qry).then(result=>{
            if (result) {
              let token = jwt.sign({id:result._id},'secret',{expiresIn: '2h'});
              response.data= {token:token};
            response.message='ok';
            response.status = 200;
            res.json(response);}
            else {
              sendError('Login Invalide',res,401);
            }
        }).catch(err=>{
            sendError(err,res,501);
        })
    })


})
module.exports = router;
