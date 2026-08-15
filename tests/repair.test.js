const test=require('node:test');const assert=require('node:assert/strict');const R=require('../src/learning/repair.js');
test('repair plan always uses five memory routes',()=>{const p=R.plan('gracias','swap');assert.equal(p.length,5);assert.equal(new Set(p.map(x=>x.mode)).size,5);});
test('far error starts with listening',()=>assert.equal(R.plan('x','far')[0].mode,'listen'));
test('word order prioritizes building',()=>assert.equal(R.plan('x','order')[0].mode,'build'));
