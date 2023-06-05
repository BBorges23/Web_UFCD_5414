const express = require('express')
var cors = require('cors')
var app = express()
var dbRepo = require('./dbrepo').databaseRepo();

const bodyParser = require('body-parser');
const port = 3000

app.use(cors())
app.use(bodyParser.json());

app.get('/animal/:category', (req, res) => {
  const { category } = req.params;
  res.send(dbRepo.list(req.query, category));
});

app.post('/deleteProduto', (req, res) => {
  let id = req.body.id;
  let animalType = req.body.animalType; // Adicione esta linha para obter o tipo de animal

  var result = dbRepo.delete(animalType, id); // Modifique a chamada para a função delete
  res.send(result ? 'OK' : 'NOK');
});

app.post('/addProduto', (req, res) => {
  let data = req.body;
  let insertedProduct = dbRepo.insert(data);
  res.send(insertedProduct);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



