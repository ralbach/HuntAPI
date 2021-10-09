import express from 'express';
import cors from 'cors';

import { createServer } from "http";
import {requestLoggerMiddleware} from './request.logger.middleware'
import {mongoCreate, dbUrl} from './db/dbCreateAndInsert'
import {MongoClient } from 'mongodb'
mongoCreate(dbUrl)
const app = express();
app.use(cors());
app.use(requestLoggerMiddleware)
const expressPort = 3000
app.listen(expressPort, () => {
    console.log(`HuntDB routes listening at localhost:${expressPort}`)
})
app.get('/', (req, res)=>{
    res.send('HuntDB accessed.')
})
app.get('/longWeapons', async(req, res) =>{
            const client = await MongoClient.connect(dbUrl)
            const db = client.db('HuntDB')
            try{
                const collection = await db.collection('longWeapons').find({}).toArray()
                res.send(collection);
            } finally {
                client.close()
            }
    })

    app.get('/longWeapon/:id', async (req, res) => {
            const id = req.params.id
            const client = await MongoClient.connect(dbUrl)
            const db = client.db('HuntDB')
            try{
                const collection = await db.collection('longWeapons').find({id: id}).toArray()
                res.send(collection);
            } finally {
                client.close()
            }
    })

    app.get('/mediumWeapons', async(req, res) =>{
        const client = await MongoClient.connect(dbUrl)
        const db = client.db('HuntDB')
        try{
            const collection = await db.collection('mediumWeapons').find({}).toArray()
            res.send(collection);
        } finally {
            client.close()
        }
})

app.get('/mediumWeapon/:id', async (req, res) => {
        const id = req.params.id
        const client = await MongoClient.connect(dbUrl)
        const db = client.db('HuntDB')
        try{
            const collection = await db.collection('mediumWeapons').find({id: id}).toArray()
            res.send(collection);
        } finally {
            client.close()
        }
})


app.get('/weapons', async(req, res) =>{
    const client = await MongoClient.connect(dbUrl)
    const db = client.db('HuntDB')
    try{
        // const shortWeapons = await db.collection('shortWeapons').find({}).toArray()
        const mediumWeapons = await db.collection('mediumWeapons').find({}).toArray()
        const longWeapons = await db.collection('longWeapons').find({}).toArray()
        const allWeapons = [...mediumWeapons, ...longWeapons].sort((a, b)=> Number(a['id']) - Number(b['id']))
        res.send(allWeapons);
    } finally {
        client.close()
    }
})

app.get('/weapons/:id', async(req, res) =>{
    const client = await MongoClient.connect(dbUrl)
    const db = client.db('HuntDB')
    try{
        const weaponId = req.params.id
        // const shortWeapons = await db.collection('shortWeapons').find({}).toArray()
        const mediumWeapons = await db.collection('mediumWeapons').find({id: weaponId}).toArray()
        const longWeapons = await db.collection('longWeapons').find({id: weaponId}).toArray()
        const allWeapons = [...mediumWeapons, ...longWeapons]
        res.send(allWeapons);
    } finally {
        client.close()
    }
})

