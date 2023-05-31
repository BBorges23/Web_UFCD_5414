const fs = require('fs')

exports.databaseRepo = function () {

    var dbName = 'database.json';
    
    var readDb = function(){
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
        /*
        insert: function(person){     
            var dataJson = readDb();

            let nextId = 1;
            for (const person of dataJson.people) {
                if(nextId <= person.Id){
                    nextId = person.Id
                }
            }
            nextId++;
            person.Id = nextId;
            
            dataJson.people.push(person);            
            fs.writeFileSync(dbName, JSON.stringify(dataJson, null, 2));
            return person
        },
        */
        list: function(queryParams, arrayName){
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
