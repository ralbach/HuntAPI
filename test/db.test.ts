import {describe, it} from 'mocha';
import * as assert from 'assert';
import {parseItemsFromTxt, parseFile} from '../src/db/parseItemsFromTxt'
import {config} from '../src/db/fileSources';
describe('Config File', ()=> {
    it('should be an object', ()=>{
         assert.equal(typeof config, 'object')
    })

    it('should have at least 1 entry', ()=>{
        const size = Object.keys(config).length;
        assert.equal(size > 0, true)
    })
});

describe('parseItemsFromTxt', () =>{
    it('should take a txt file and return a string', () =>{
        const pathRelativeToFunctionCall = './longWeapons.txt'
        const parseItems = parseFile(pathRelativeToFunctionCall);
        assert.equal(typeof parseItems, 'string')
    })

    it('The string should be non empty.', () =>{
        const pathRelativeToFunctionCall = './longWeapons.txt'
        const parseItems = parseFile(pathRelativeToFunctionCall);
        assert.equal(parseItems.length > 0, true)
    })
})