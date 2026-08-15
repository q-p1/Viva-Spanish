const test=require('node:test');const assert=require('node:assert/strict');const M=require('../src/learning/mastery.js');
test('fast recall gains more than slow recall',()=>assert.ok(M.gain(30,'recall',3000)>M.gain(30,'recall',15000)));
test('mastery clamp',()=>{assert.equal(M.clamp(120),100);assert.equal(M.clamp(-4),0);});
test('close mistakes lose less than far mistakes',()=>assert.ok(M.loss(50,true)<M.loss(50,false)));