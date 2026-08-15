const test=require('node:test');const assert=require('node:assert/strict');const A=require('../src/learning/answer-analyzer.js');
test('exact answer',()=>assert.equal(A.analyze('gracias','Gracias').correct,true));
test('accent-only answer can be accepted',()=>assert.equal(A.analyze('si','Sí').correct,true));
test('strict accent mode requests accent',()=>{const r=A.analyze('si','Sí',{strictAccents:true});assert.equal(r.correct,false);assert.equal(r.type,'accent');});
test('adjacent transposition',()=>assert.equal(A.analyze('gracais','gracias').type,'swap'));
test('missing letter',()=>assert.equal(A.analyze('gracia','gracias').type,'missing'));
test('extra letter',()=>assert.equal(A.analyze('graciass','gracias').type,'extra'));
test('single substitution',()=>assert.equal(A.analyze('graciss','gracias').type,'sub'));
test('word order',()=>assert.equal(A.analyze('gusto mucho','mucho gusto').type,'order'));