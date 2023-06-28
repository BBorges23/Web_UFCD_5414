const fs = require('fs')

exports.databaseRepo = function () {

    var dbName = 'database.json';

    var readDb = function () {
        var rawData = fs.readFileSync(dbName);
        return JSON.parse(rawData)
    };


    return {

        list: function (queryParams, arrayName) {
            return readDb()[arrayName].filter(a => a.category == queryParams.category);
        },


        delete: function (animalType, id) {
            var dataJson = readDb();

            if (dataJson.hasOwnProperty(animalType)) {
                var animalArray = dataJson[animalType];
                for (var i = 0; i < animalArray.length; i++) {
                    if (animalArray[i].id === id) {
                        animalArray.splice(i, 1);
                        fs.writeFileSync(dbName, JSON.stringify(dataJson, null, 2));
                        return true;
                    }
                }
            }
            return false;
        },

        insert: function (product) {
            var dataJson = readDb();

            // Find the array for the specified animal
            var animal = product.animal;
            if (!dataJson[animal]) {
                // If the array doesn't exist, create it
                dataJson[animal] = [];
            }

            // Generate the next id for the product
            var animalArray = dataJson[animal];
            var maxId = 0;
            for (const p of animalArray) {
                if (p.id > maxId) {
                    maxId = p.id;
                }
            }
            var nextId = maxId + 1;
            product.id = nextId;

            // Reorder the properties of the product object
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

            // Add the product to the array
            animalArray.push(orderedProduct);

            // Write the updated data back to the file
            fs.writeFileSync(dbName, JSON.stringify(dataJson, null, 2));

            return product;
        },
        update: function (animalType, id, newData) {
            var dataJson = readDb();

            if (dataJson.hasOwnProperty(animalType)) {
                var animalArray = dataJson[animalType];
                for (var i = 0; i < animalArray.length; i++) {
                    if (animalArray[i].id === id) {
                        // Update the properties of the product with the new data
                        animalArray[i].name = newData.name;
                        animalArray[i].brand = newData.brand;
                        animalArray[i].description = newData.description;
                        animalArray[i].price = newData.price;
                        animalArray[i].stock = newData.stock;
                        animalArray[i].image = newData.image;

                        // Write the updated data back to the file
                        fs.writeFileSync(dbName, JSON.stringify(dataJson, null, 2));

                        return animalArray[i]; // Return the updated product
                    }
                }
            }
            return null; // Product not found
        },
        login: function (username, password) {
            var dataJson = readDb();
            var users = dataJson["users"];
        
            for (let index = 0; index < users.length; index++) {
                if (username === users[index].username && password === users[index].password) {
                    return users[index].username;
                }
            }
        
            return null; // Retorna null se as credenciais forem inválidas
        }
        
    }
};
