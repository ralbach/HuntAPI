import {MongoClient} from 'mongodb';
import {parseItemsFromTxt} from './parseItemsFromTxt'
import {config} from './fileSources'

export const dbUrl = 'mongodb://localhost:27017/';

//parse data from file configs
const filesToInsert = []
for(let key in config){
    const parsedData= {}
    parsedData[key] = parseItemsFromTxt(config[key])
    filesToInsert.push(parsedData);
}

//creates and populates our mongo instancee
export const mongoCreate = async (dbUrl) =>{
    const client = await MongoClient.connect(dbUrl)
    const db = client.db('HuntDB');
    console.log('connected to HuntDB in mongo', filesToInsert, 'filesToInsert')
    //itereate across oeach key/bject to insert the documents into corresponding collection.
    for(let i = 0; i < filesToInsert.length; i++){
        //grabs key name string of object at files array as we iterate through it.
        const keyString = Object.keys(filesToInsert[i])[0]
        console.log(keyString) 
        const itemsInDB = await db.collection(keyString).find({}).toArray()
        const itemsExist = itemsInDB.length > 0;
        if(itemsExist){
            console.log(keyString + ' collection already exists and has entries.')
            continue;
        }
        console.log('inserting: ' + keyString)
        const documentCollectionOfObject = filesToInsert[i][keyString]
        const insertItems =await db.collection(keyString).insertMany(documentCollectionOfObject, (err, res) => {
                if(err) throw err + keyString;
                console.log(res.insertedCount + ' documents inserted for table: ' + keyString)
            })
    }
    console.log('finished seeding HuntDB database.')
    return;    
}

mongoCreate(dbUrl)
