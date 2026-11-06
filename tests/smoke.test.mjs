import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import assert from 'node:assert/strict';
const html=readFileSync('index.html','utf8');
const app=readFileSync('app.js','utf8');
test('all navigation views exist',()=>{
  for(const v of ['learn','videos','guides','facts','plan'])assert.match(html,new RegExp('id="view-'+v+'"'));
});
test('videos are linked only on explicit click',()=>{
  assert.match(app,/watch\?v=RJOkmOECDFA/);
  assert.match(app,/watch\?v=SShT5HmtV1Q/);
  assert.doesNotMatch(html,/<iframe/i);
});
test('official information and disclaimer are prominent',()=>{
  assert.match(app,/https:\/\/www.moj.go.jp\/isa\/support\/portal\//);
  assert.match(app,/Personal vlogs show an experience/);
});
test('all core scripts included',()=>{
  assert.match(html,/src="\.\/app\.js"/);
  assert.match(html,/href="\.\/styles\.css"/);
});
