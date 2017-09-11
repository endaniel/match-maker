const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const dbUri = "mongodb://admin:admin@dcluster-shard-00-00-rq6aa.mongodb.net:27017,dcluster-shard-00-01-rq6aa.mongodb.net:27017,dcluster-shard-00-02-rq6aa.mongodb.net:27017/matchMaker?ssl=true&replicaSet=DCluster-shard-0&authSource=admin"
 
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());

app.get('/api/user/:id', (req, res) => { 
    MongoClient.connect(dbUri, (err, db) => {
        db.collection("user_settings").findAndModify({_id: req.params.id}, null, {$setOnInsert:{settings: {}}},  {new:true, upsert:true}, 
                               (err, result) => {
                                    if (err) throw err;
                                    res.json(result.value);
                                    db.close();
                                })
    })
})

app.post('/api/user/settings', (req, res) => {
    MongoClient.connect(dbUri, (err, db) => {
        db.collection("user_settings").findAndModify({_id: req.body.userId}, {},{settings: req.body.userSettings}, {}, 
            (err, result) => {
                if (err) throw err;
                res.json(result.value);
                db.close();
            })
        })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT|| 5001;
app.listen(port);