"use strict";var describe,it;module.link('mocha',{describe(v){describe=v},it(v){it=v}},0);var assert;module.link('assert',{"*"(v){assert=v}},1);var config;module.link('../src/db/fileSources.ts',{config(v){config=v}},2);



describe('Config File', ()=> {
    
    it('should be an object', ()=>{
         assert.equal(typeof config, 'object')
    })
});