import {MongoClient} from 'mongodb';
import {parseItemsFromTxt} from './parseItemsFromTxt'
import {config} from './fileSources'
import * as dotenv from 'dotenv';

dotenv.config();
export const dbUrl = process.env.DATABASE_URL;

//parse data from file configs
const collectionToBuild = []
for(let key in config){
    const parsedData= {}
    parsedData[key] = parseItemsFromTxt(config[key])
    collectionToBuild.push(parsedData);
}

//creates and populates our mongo instancee
export const mongoCreate = async (dbUrl) =>{
    const client = await MongoClient.connect(dbUrl)
    const db = client.db('HuntDB');
    for(let i = 0; i < collectionToBuild.length; i++){
        //grabs key name string of object at files array
        const keyString = Object.keys(collectionToBuild[i])[0]
        const itemsInDB = await db.collection(keyString).find({}).toArray()
        const itemsExist = itemsInDB.length > 0;
        if(itemsExist){
            console.log(keyString + ' collection already exists and has entries.')
            continue;
        }
        console.log('inserting: ' + keyString)
        const documentCollectionOfObject = collectionToBuild[i][keyString]
        await db.collection(keyString).insertMany(documentCollectionOfObject, (err, res) => {
                if(err) throw err + keyString;
                return;
            })
        console.log('documents successfully inserted for collection: ' + keyString)
    }
    console.log('finished seeding HuntDB database.')
    return;    
}

mongoCreate(dbUrl)
