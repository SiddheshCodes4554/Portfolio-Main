import test from 'node:test';
import assert from 'node:assert/strict';
import { marbleRoute, marbleScores, averageReaction, pixelLine, randomIndex, starterPixels } from '../src/lib/lab.ts';

test('marbles stay on the board and settle in a valid scored pocket', () => {
  for(const lane of [-10,0,1,3,6,20]) for(const random of [0,.49,.5,.9999]) {
    const route=marbleRoute(lane,()=>random);assert.equal(route.xs.length,route.ys.length);
    assert.ok(route.xs.every(x=>x>=20&&x<=300));assert.ok(route.ys.every((y,i)=>i===0||y>route.ys[i-1]));
    assert.ok(route.slot>=0&&route.slot<7);assert.equal(route.score,marbleScores[route.slot]);assert.equal(route.xs.at(-1),40+route.slot*40);
  }
});
test('reaction average rounds to milliseconds and handles an empty run', () => {
  assert.equal(averageReaction([]),0);assert.equal(averageReaction([201,200,205]),202);assert.equal(averageReaction([0,0,0]),0);
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
