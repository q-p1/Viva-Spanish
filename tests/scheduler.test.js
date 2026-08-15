const test=require('node:test');const assert=require('node:assert/strict');const S=require('../src/learning/scheduler.js');
test('weaker item receives higher due score',()=>{const a=S.dueScore('a',{a:20},{a:0},{a:0},0),b=S.dueScore('b',{b:80},{b:0},{b:0},0);assert.ok(a>b);});
test('wrong answers return quickly',()=>assert.ok(S.nextDelay(80,false)<10*60*1000));
test('strong correct item gets a longer interval',()=>assert.ok(S.nextDelay(90,true)>S.nextDelay(20,true)));