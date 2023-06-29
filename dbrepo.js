const fs = require('fs')

exports.databaseRepo = function () {

    var dbName = 'database.json';

    var readDb = function () {
        var rawData = fs.readFileSync(dbName);
        return JSON.parse(rawData)
    };


    return {

        list: function (queryParams, arrayName) {
            
          /* É aplicado um filtro no array para selecionar apenas os elementos 
          cuja propriedade `category` seja igual a `queryParams.category`
          O resultado filtrado é retornado como resultado da função. */
            return readDb()[arrayName].filter(a => a.category == queryParams.category);
        },


        delete: function (animalType, id) {
            var dataJson = readDb();

            // Verifica se `dataJson` possui a propriedade `animalType`.
            if (dataJson.hasOwnProperty(animalType)) {
                // Obtém o array correspondente a `animalType` e o armazena na variável `animalArray`.
                var animalArray = dataJson[animalType];
                for (var i = 0; i < animalArray.length; i++) {
                     // Verifica se o valor da propriedade `id` é igual ao `id` fornecido.
                    if (animalArray[i].id === id) {
                        // Se encontrou o elemento com o `id` correspondente, o remove do array usando `splice`.
                        animalArray.splice(i, 1);
                        // Atualiza o banco de dados escrevendo os dados de volta no arquivo
                        fs.writeFileSync(dbName, JSON.stringify(dataJson, null, 2));
                        // Retorna `true` para indicar que a exclusão foi bem-sucedida.
                        return true;
                    }
                }
            }
            // Se o `animalType` não existe no banco de dados ou o `id` não corresponde a nenhum elemento, retorna `false`.
            return false;
        },

        insert: function (product) {
            var dataJson = readDb();

            // Encontra o array específico para o tipo de animal
            var animal = product.animal;
            if (!dataJson[animal]) {
                //Se o array não existir, é criado
                dataJson[animal] = [];
            }

            // Obtém o array de produtos correspondente ao tipo de animal
            var animalArray = dataJson[animal];
            var maxId = 0;

            // Percorre cada produto no array para encontrar o ID máximo
            for (const p of animalArray) {
                if (p.id > maxId) {
                    maxId = p.id;
                }
            }
            // Gera o próximo ID adicionando 1 ao ID máximo encontrado
            var nextId = maxId + 1;
            // Atualiza o ID do produto a ser inserido com o próximo ID
            product.id = nextId;

            // Reordena as propriedades do objeto `product` para uma ordem específica.
            var orderedProduct = {
                id: product.id,
                name: product.name,
                brand: product.brand,
                category: product.category,
                description: product.description,
                price: product.price,
                stock: product.stock,
                image: product.image
            };

             // Adiciona o produto ao array `animalArray`.
            animalArray.push(orderedProduct);

            // Escreve os dados atualizados de volta no arquivo
            fs.writeFileSync(dbName, JSON.stringify(dataJson, null, 2));

            // Retorna o objeto `product` com o ID atualizado.
            return product;
        },
        update: function (animalType, id, newData) {
            var dataJson = readDb();

            if (dataJson.hasOwnProperty(animalType)) {
                // Obtém o array de produtos correspondente ao tipo de animal
                var animalArray = dataJson[animalType];
                for (var i = 0; i < animalArray.length; i++) {
                    if (animalArray[i].id === id) {
                        // Atualiza as propriedades do produto com os novos dados
                        animalArray[i].name = newData.name;
                        animalArray[i].brand = newData.brand;
                        animalArray[i].description = newData.description;
                        animalArray[i].price = newData.price;
                        animalArray[i].stock = newData.stock;
                        animalArray[i].image = newData.image;

                        // Escreve os dados atualizados de volta no arquivo
                        fs.writeFileSync(dbName, JSON.stringify(dataJson, null, 2));

                        return animalArray[i]; // Retorna o produto atualizado
                    }
                }
            }
            return null; // Produto não encontrado
        }
        
    }
};
