const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/meuapp'); // ou use MongoDB Atlas

const app = express();
app.use(cors());
app.use(bodyParser.json());

const Item = mongoose.model('Item', { nome: String });

app.post('/api/itens', async (req, res) => {
  const item = new Item({ nome: req.body.nome });
  await item.save();
  res.send(item);
});

app.get('/api/itens', async (req, res) => {
  const itens = await Item.find();
  res.send(itens);
});

app.listen(3000, () => console.log('API rodando na porta 3000'));
