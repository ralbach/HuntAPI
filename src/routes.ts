import express from 'express';
import cors from 'cors';
import path from 'path';
import * as dotenv from 'dotenv'
import {requestLoggerMiddleware} from './request.logger.middleware'
import { Prisma,
        PrismaClient,
        longWeapons,
        mediumWeapons,
        shortWeapons,
        legendaryHunters,
        consumables } from '@prisma/client'
dotenv.config()
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
const prisma = new PrismaClient()
const app = express();
app.use(express.json())
app.use(cors(options));
app.use(requestLoggerMiddleware)

const expressPort = 8080;
app.listen(expressPort, () => {
    console.log(`HuntDB routes listening at localhost: ${expressPort}`)
})
app.get('/', (req, res)=>{
    res.sendFile(process.env.LANDING_PAGE_PATH)
})

app.get('/longWeapons', async(req, res) =>{
        const longWeapons = await prisma.longWeapons.findMany({orderBy: [{Name: 'asc'}]});
        res.json(longWeapons);
    })  

app.get('/longWeapons/:name', async (req, res) => {
    const {name} = req.params
    const collection = await prisma.longWeapons.findFirst({ where:{ Name: name }});
    res.json(collection);
    
})

app.get('/mediumWeapons', async(req, res) =>{
    const collection = await prisma.mediumWeapons.findMany({orderBy: [{Name: 'asc'}]})
    res.json(collection);

})

app.get('/mediumWeapons/:name', async (req, res) => {
        const {name} = req.params
        const collection = await prisma.mediumWeapons.findFirst({where: {Name: name}})
        res.json(collection);
    
})

app.get('/shortWeapons/', async (req, res) => {
        const collection = await prisma.shortWeapons.findMany({orderBy: [{Name: 'asc'}]})
        res.json(collection);
   
})

app.get('/mediumWeapons/:name', async (req, res) => {
        const {name} = req.params
        const collection = await prisma.shortWeapons.findFirst({where: {Name: name}})
        res.json(collection);
    
})
app.get('/weapons/', async(req, res) =>{
    const shortWeapons = await prisma.shortWeapons.findMany();
    const mediumWeapons = await prisma.mediumWeapons.findMany();
    const longWeapons = await prisma.longWeapons.findMany();
    let allWeapons = [...shortWeapons, ...mediumWeapons, ...longWeapons].sort((a, b)=> Number(a['id']) - Number(b['id']));
    res.json(allWeapons);
});

app.get('/weapons/:name', async(req, res) =>{
        const {name} = req.params
        const shortWeapon = await prisma.shortWeapons.findFirst({where:{ Name: name}})
        const mediumWeapon = await prisma.mediumWeapons.findFirst({where: {Name: name}})
        const longWeapon = await prisma.longWeapons.findFirst({where: {Name: name}})
        if(shortWeapon) {res.json(shortWeapon)}
        if(mediumWeapon) {res.json(mediumWeapon)}
        if(longWeapon) { res.json(mediumWeapon)}
})

app.get('/weapons/image/:file', async(req, res) =>{
    const { file } = req.params;
    res.sendFile('Weapons/' + file, { root: path.join(__dirname, '/images/')});
});

app.get('/traits/', async(req, res) =>{
    const traits = await prisma.traits.findMany({orderBy: [{Name: 'asc'}]})
    res.json(traits);
})

app.get('/traits/image/:file', async(req, res) =>{
    const { file } = req.params;
    res.sendFile('Traits/' + file, { root: path.join(__dirname, '/images/')});
});

app.get('/tools/', async(req, res) =>{
    const tools = await prisma.tools.findMany({orderBy: [{Name: 'asc'}]})
    res.json(tools);
});

app.get('/tools/image/:file', async(req, res) =>{
    const { file } = req.params;
    res.sendFile('Tools/' + file, { root: path.join(__dirname, '/images/')});
});

app.get('/consumables/', async(req, res) =>{
    const consumables = await prisma.consumables.findMany({orderBy: [{Name: 'asc'}]})
    res.json(consumables);
});

app.get('/consumables/image/:file', async(req, res) =>{
    const { file } = req.params;
    res.sendFile('Consumables/' + file, { root: path.join(__dirname, '/images/')});
});

app.get('/legendaryHunters/', async(req, res) =>{
    const legendaryHunters = await prisma.legendaryHunters.findMany({orderBy: [{Legendary_Hunter: 'asc'}]});
    res.json(legendaryHunters);
})

app.get('/legendaryHunters/:name', async(req, res) =>{
        const {name} = req.params
        const legendaryHunters = await prisma.legendaryHunters.findFirst({where: {Legendary_Hunter: name}})
        res.json(legendaryHunters);
});
app.get('/legendaryHunters/image/:imageUrl', async(req, res) =>{
    const {imageUrl} = req.params
    console.warn(imageUrl)
    res.sendFile('Hunters/' + imageUrl, { root: path.join(__dirname, '/images/')});
});
