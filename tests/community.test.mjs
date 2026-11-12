import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
import vm from 'node:vm';

const script=readFileSync('community.js','utf8');
const html=readFileSync('index.html','utf8');
const sw=readFileSync('sw.js','utf8');
const ci=readFileSync('.github/workflows/android-debug.yml','utf8');

test('pilot module parses and loads after app',()=>{
  new vm.Script(script);
  assert.ok(html.indexOf('src="./community.js"')>html.indexOf('src="./app.js"'));
  assert.match(html,/href="\.\/community\.css"/);
});
test('mobile and offline bundles include pilot assets',()=>{
  for(const file of ['community.js','community.css']){
    assert.ok(sw.includes(file),file+' must be cached');
    assert.ok(ci.includes(file),file+' must be bundled');
  }
});
test('source registry includes verified starting points',()=>{
  for(const slug of ['isa-portal','yonago-multicultural','yonago-waste','yonago-hazard','tottori-foundation'])
    assert.ok(script.includes("id:'"+slug+"'"),'missing '+slug);
  assert.match(script,/checked:'2026-11-12'/);
});
test('five UI languages and no automatic remote submission',()=>{
  for(const code of ['ja','en','zh','vi','ne'])
    assert.match(script,new RegExp('(?:^|\\n)    '+code+': \\{'));
  assert.doesNotMatch(script,/\bfetch\s*\(/);
  assert.doesNotMatch(script,/\bXMLHttpRequest\b/);
  assert.doesNotMatch(script,/\bnavigator\.sendBeacon\b/);
  assert.match(script,/status:'draft'/);
  assert.match(script,/sourceType:'self-report'/);
});
test('predefined topics and regions',()=>{
  assert.match(script,/const TOPICS=\['waste','language','housing','work','health','admin','other'\]/);
  assert.match(script,/function validRegion\(v\)/);
  assert.match(script,/TOPICS\.includes\(category\)/);
});
