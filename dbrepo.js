const fs = require('fs')

exports.databaseRepo = function () {

    var dbName = 'database.json';

    var readDb = function () {
        var rawData = fs.readFileSync(dbName);
        return JSON.parse(rawData)
    };


    return {
        /*
        update: function(person){     
            var dataJson = readDb();

            var personToUpdate = dataJson.people.find(x => x.Id === person.Id);

            personToUpdate.FirstName = person.FirstName;
            personToUpdate.LastName = person.LastName;
            personToUpdate.Age = person.Age;
            personToUpdate.Email = person.Email;
            
            fs.writeFileSync(dbName, JSON.stringify(dataJson, null, 2));

            return personToUpdate
        },
        */

        /*         insert: function (animal, category, product) {
                    var dataJson = readDb();

                    let nextId = 1;
                    for (const p of dataJson[animal][category]) {
                        if (nextId <= p.Id) {
                            nextId = p.Id
                        }
                    }
                    nextId++;
                    product.Id = nextId;

                    dataJson[animal][category].push(product);
                    fs.writeFileSync(dbName, JSON.stringify(dataJson, null, 2));
                    return product;
                },
         */
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
                price: product.price,
                image: product.image
            };

            // Add the product to the array
            animalArray.push(orderedProduct);

            // Write the updated data back to the file
            fs.writeFileSync(dbName, JSON.stringify(dataJson, null, 2));

            return product;
        },

        list: function (queryParams, arrayName) {
            return readDb()[arrayName].filter(a => a.category == queryParams.category);
        }

        /*
        delete: function(id){
            var dataJson = readDb();
            dataJson.people = dataJson.people.filter(x => x.Id != id);
            
            fs.writeFileSync(dbName, JSON.stringify(dataJson, null, 2));

            return true;
        },
        */
        /* listSampleData: function(onResponse){
            fs.readFile('product_list.json', 'utf8', onResponse);
        }
    
    */
    }

};
