import express from 'express'
import 'dotenv/config';
import {MongoClient} from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()
const port = 3000
app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(process.env.mongo_uri);
const db_name = process.env.db_name;

client.connect();
const db = client.db(db_name);
const collection = db.collection('passwords');

//get all passwords
app.get('/', async (req, res) => {
    const find_res = await collection.find({}).toArray();
    res.json(find_res);
})

//add a password
app.post('/add', async (req, res) => {
    const password = req.body;
    await collection.insertOne(password);
    res.json({status: 'success', message: 'Password added successfully'});
})

//delete a password
app.post('/delete', async (req, res)=>{
    const del_id = req.body.id;
    if(await collection.deleteOne({id: del_id})){
      res.json({status: 'success', message: 'Password deleted successfully'});
    } else {
      res.json({status: 'error', message: 'Password not found'});
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})