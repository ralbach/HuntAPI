const MongoClient = require('mongodb').MongoClient;
const parseItems = require('./parseItemsFromTxt.ts');
const files = require('./fileSources.ts');
const dbUrl = 'mongodb://localhost:27017/';
//parse data from file configs
const filesToInsert = [];
for (let key in files) {
    const parsedData = {};
    parsedData[key] = parseItems.parseItemsFromTxt(files[key]);
    filesToInsert.push(parsedData);
}
//creates and populates our mongo instancee
const mongoCreate = async (dbUrl) => {
    const client = await MongoClient.connect(dbUrl);
    const db = await client.db('HuntDB');
    console.log('connected to HuntDB in mongo');
    //itereate across oeach key/bject to insert the documents into corresponding collection.
    for (let i = 0; i < filesToInsert.length; i++) {
        //grabs key name string of object at files array as we iterate through it.
        const keyString = Object.keys(filesToInsert[i])[i];
        const itemsInDB = await db.collection(keyString).find({}).toArray();
        const itemsExist = itemsInDB.length > 0;
        if (itemsExist) {
            console.log(keyString + ' collection already exists and has entries.');
            continue;
        }
        console.log('inserting: ' + keyString);
        const documentCollectionOfObject = filesToInsert[i][keyString];
        const insertItems = await db.collection(keyString).insertMany(documentCollectionOfObject, (err, res) => {
            if (err)
                throw err;
            client.close();
            console.log(res.insertedCount + ' documents inserted at: ' + keyString);
        });
    }
    client.close();
    console.log('finished seeding HuntDB database.');
    return;
};
mongoCreate(dbUrl);
//# sourceMappingURL=dbCreateAndInsert.js.map