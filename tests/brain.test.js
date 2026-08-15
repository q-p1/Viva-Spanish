const test=require('node:test');const assert=require('node:assert/strict');const B=require('../src/learning/brain.js');
test('weaker phrase has higher forgetting risk',()=>{const s={mastery:{a:20,b:90},errors:{},dueAt:{},responseTimes:{}};assert.ok(B.forgettingRisk('a',s,0)>B.forgettingRisk('b',s,0));});
test('errors increase forgetting risk',()=>{const a={mastery:{x:60},errors:{x:0},dueAt:{x:0},responseTimes:{}},b={mastery:{x:60},errors:{x:4},dueAt:{x:0},responseTimes:{}};assert.ok(B.forgettingRisk('x',b,0)>B.forgettingRisk('x',a,0));});
test('ability status maps readiness',()=>{assert.equal(B.abilityStatus(90),'Ready');assert.equal(B.abilityStatus(70),'Almost ready');assert.equal(B.abilityStatus(50),'Developing');});
test('recordMode accumulates performance',()=>{const s={};B.recordMode(s,'listen',true,3000);B.recordMode(s,'listen',false,5000);assert.equal(s.modeStats.listen.attempts,2);assert.equal(s.modeStats.listen.correct,1);});
test('why gives phrase explanation',()=>assert.match(B.why('Me llamo'),/call myself/i));
