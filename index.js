const express = require('express')
var cors = require('cors')
var app = express()
var dbRepo = require('./dbrepo').databaseRepo();

const bodyParser = require('body-parser');
const port = 3000

app.use(cors())
app.use(bodyParser.json());


// app.post('/updatePerson', (req, res) => {
//   let data = req.body;
//   let updated = dbRepo.update(data);
//   res.send(updated);
// })

// app.post('/deletePerson', (req, res) => {
//     let id = req.body.id;

//     var result = dbRepo.delete(id)
//     res.send(result ? 'OK' : 'NOK');
//     // res.send('api request' + id);
// })

app.post('/deleteProduto', (req, res) => {
  let id = req.body.id;
  let animalType = req.body.animalType; // Adicione esta linha para obter o tipo de animal

  var result = dbRepo.delete(animalType, id); // Modifique a chamada para a função delete
  res.send(result ? 'OK' : 'NOK');
});

app.get('/animal/:category', (req, res) => {
  const { category } = req.params;
  res.send(dbRepo.list(req.query, category));
});

app.post('/addProduto', (req, res) => {
  let data = req.body;
  let insertedProduct = dbRepo.insert(data);
  res.send(insertedProduct);
});


// app.get('/sample', (req, res) => {
//   dbRepo.listSampleData(function(err, data){
//     var dictJson = JSON.parse(data);
//     res.send(dictJson)
//   })
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



