import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateGate, gates, pixelLine, randomIndex, starterPixels } from '../src/lib/lab.ts';

test('all twelve Boolean combinations match the truth tables', () => {
  const expected = { AND: [false,false,false,true], OR: [false,true,true,true], XOR: [false,true,true,false] };
  for (const gate of gates) for (let bits=0;bits<4;bits++) assert.equal(evaluateGate(gate,!!(bits&2),!!(bits&1)),expected[gate][bits]);
});
test('fast pixel strokes include endpoints and leave no gaps', () => {
  for (const [from,to] of [[0,255],[15,240],[0,15],[0,240],[119,119],[18,251]]) {
    const line=pixelLine(from,to);assert.equal(line[0],from);assert.equal(line.at(-1),to);
    for (let i=1;i<line.length;i++) { assert.ok(Math.abs(line[i]%16-line[i-1]%16)<=1);assert.ok(Math.abs(Math.floor(line[i]/16)-Math.floor(line[i-1]/16))<=1); }
    assert.ok(line.every(pixel=>pixel>=0&&pixel<256));
  }
});
test('starter art has exactly 256 independent cells', () => { const a=starterPixels(),b=starterPixels();assert.equal(a.length,256);assert.notEqual(a,b);assert.ok(a.some(Boolean)); });
test('each generated ingredient changes without leaving its list', () => { for(let previous=0;previous<6;previous++) for(const random of [0,.25,.5,.99999]) { const next=randomIndex(6,previous,()=>random);assert.notEqual(next,previous);assert.ok(next>=0&&next<6); } assert.equal(randomIndex(1,0),0); });
