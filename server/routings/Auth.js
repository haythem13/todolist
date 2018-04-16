const router = require('express').Router();

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/todolist', (err, client) => {
        if (err) return console.log(err);
        console.log('connection OKKKK ')
        let db = client.db('todolist');
        closure(db);

    })
}
router.post('/register', function (req, res) {
  let qry =  {"email":req.body.email};
  connection(db=>{
      db.collection('user').findOne(qry).then(result=>{
          if (result)
              res.send('account already exists')
          else {
              db.collection('user').insertOne(req.body)
              res.send('register succes')
          }
      }).catch(err=>{
          sendError(err,res,501);
      })
  })
})


router.post('/login', function (req, res) {
    console.log(req.body);
    let qry = { email: req.body.email };
    connection(db => {
        db.collection('Users').findOne(qry).then(result=> {
            console.log(req.body);
            if (result.password === req.body.password) {
                res.send({ message: 'welcome ' + result.name });
                // res.json({"message": "welcome "+req.body.login});
            } else {
                res.send({ message: 'email invalide ' });
                //res.json({"message": "Nooo"});
            }
        })
    })


})
module.exports = router;
