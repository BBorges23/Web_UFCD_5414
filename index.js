const express = require('express')
var cors = require('cors')
var app = express()
var dbRepo = require('./dbrepo').databaseRepo();

const bodyParser = require('body-parser');
const session = require('express-session');
const port = 3000;

app.use(cors())
app.use(bodyParser.json());


app.get('/animal/:category', (req, res) => {
  const { category } = req.params; // Obtém o parâmetro 'category' da URL
  // Chama o método 'list' do objeto 'dbRepo' passando os parâmetros da consulta e a categoria
  res.send(dbRepo.list(req.query, category));   
});

app.post('/addProduto', (req, res) => {
  let data = req.body; // Obtém os dados do corpo da requisição
  // Chama o método 'insert' do objeto 'dbRepo' passando os dados do produto
  let insertedProduct = dbRepo.insert(data);
  res.send(insertedProduct); // Envia o produto inserido como resposta para o cliente
});

app.post('/deleteProduto', (req, res) => {
  let id = req.body.id; // Obtém o ID do produto a ser apagado do corpo da requisição
  let animalType = req.body.animalType; // Adicione esta linha para obter o tipo de animal

  var result = dbRepo.delete(animalType, id); // Modifica a chamada para a função delete
  // Envia 'OK' se a operação for bem-sucedida, caso contrário, envia 'NOK'
  res.send(result ? 'OK' : 'NOK');
});

app.post('/updateProduto', (req, res) => {
  let id = req.body.id; // Obtém o ID do produto a ser atualizado do corpo da requisição
  let newData = req.body.data; // Obtém o tipo de animal do corpo da requisição
  let animal = req.body.animal; // Obtém o tipo de animal do corpo da requisição
  let updatedProduct = dbRepo.update(animal, id, newData); // Chama a função update do dbRepo para atualizar o produto

  if (updatedProduct) {
    // Se o produto foi atualizado com sucesso, envia o produto atualizado como resposta
    res.send(updatedProduct);
  } else {
    // Caso contrário, envia uma resposta com status 404 (Not Found) e uma mensagem indicando que o produto não foi encontrado
    res.status(404).send('Produto nÃo encontrado');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


