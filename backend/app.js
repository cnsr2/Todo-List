const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config({ path: '../.env' });

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//connectdb
mongoose.connect(process.env.CONNECTION_STRING);

// models
const TodoSchema = new Schema({
 text: String,
 isDone: Boolean,
 dateCreated: {
  type: Date,
  default: Date.now,
 },
});
const Todo = mongoose.model('Todo', TodoSchema);

//Routes

app.get('/', async (req, res) => {
 const nd = await Todo.find({});
 res.send(nd);
});
app.post('/addtodo', async (req, res) => {
 console.log(req.body);
 await Todo.create(req.body);
 res.status(200);
});
app.post('/changetodo', async (req, res) => {
 const { text, isDone } = req.body;
 try {
  const result = await Todo.updateOne(
   { _id: req.body.id },
   { $set: { text: text, isDone: isDone } },
  );
  console.log('Güncelleme başarılı:', result);
 } catch (error) {
  console.error('Güncelleme hatası:', error);
 }
});
app.post('/deletetodo/:id', async (req, res) => {
 console.log(req.params.id);
 const id = req.params.id;
 await Todo.deleteOne({ _id: id });
 res.status(200);
});

app.listen(5500, () => {
 console.log('Server listening on port 5500');
});
