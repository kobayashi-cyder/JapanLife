import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import vm from 'node:vm';

const files = ['i18n.js','furigana.js','app.js'];
const src = Object.fromEntries(files.map(f=>[f,readFileSync(f,'utf8')]));
const ctx={window:{}};
vm.runInNewContext(src['i18n.js'],ctx,{filename:'i18n.js'});
vm.runInNewContext(src['furigana.js'],ctx,{filename:'furigana.js'});
const i18n=ctx.window.JL_I18N;
const furigana=ctx.window.JL_FURIGANA;

test('five available user-facing languages',()=>{
  assert.deepEqual(Object.keys(i18n.languages).sort(),['en','ja','ne','vi','zh']);
  for(const lang of ['zh','vi','ne']) {
    for(const key of ['headline','furigana','translationNotice','correct','wrong','openSource']) {
      assert.ok(i18n.message(lang,key),lang+':'+key);
    }
  }
});
test('localized content indexes cover every lesson and life view',()=>{
  const lengths={topics:12,meanings:12,videoTopics:4,observe:4,context:4,
    guideTitles:10,guideKinds:10,guideDescriptions:10,
    factWorries:4,factTruths:4,factActions:4,tasks:8};
  for(const lang of ['zh','vi','ne']) {
    for(const [key,len] of Object.entries(lengths)) {
      const list=i18n.content[lang][key];
      assert.equal(list.length,len,lang+':'+key);
      assert.ok(list.every(x=>typeof x==='string'&&x.trim().length>0),lang+':'+key);
    }
  }
});
test('ruby displays correct compound readings and preserves plain source',()=>{
  const given='三番線はどこですか。';
  assert.match(furigana.ruby(given),/<ruby>三番線<rp>\(<\/rp><rt>さんばんせん<\/rt>/);
  assert.equal(furigana.ruby(given,false),given);
  assert.match(furigana.ruby('初期費用の内訳'),/<rt>しょきひよう<\/rt>/);
  assert.match(furigana.ruby('学校からのお知らせ'),/<rt>がっこう<\/rt>/);
});
test('ruby escapes unexpected HTML without injecting unsafe markup',()=>{
  const output=furigana.ruby('<img src=x onerror=alert(1)> 三番線');
  assert.ok(output.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(!output.includes('<img'));
  assert.match(output,/<ruby>/);
});
test('app boot and language/furigana setting render correctly',()=>{
  const elements=new Map();
  const events=new Map();
  function element(key){
    if(!elements.has(key)){
      elements.set(key,{value:'',checked:false,textContent:'',innerHTML:'',hidden:false,
        dataset:{},classList:{toggle(){}},setAttribute(){},addEventListener(type,fn){events.set(key+'-'+type,fn)},
        placeholder:'',matches(){return false},closest(){return null}});
    }
    return elements.get(key);
  }
  const textKeys=['eyebrow','headline','intro','start','watch','principle','completed','practiced',
    'tasksDone','learn','videos','guides','facts','plan','learnTitle','learnDesc','videoTitle',
    'videoDesc','guideTitle','guideDesc','factsTitle','factsDesc','planTitle','planDesc',
    'export','reset','foot','furigana','translationNotice'];
  const titled=textKeys.map(k=>({dataset:{t:k},textContent:''}));
  const panels=['learn','videos','guides','facts','plan'].map(v=>({id:'view-'+v,hidden:false}));
  const tabs=['learn','videos','guides','facts','plan'].map(v=>({dataset:{view:v},classList:{toggle(){}},setAttribute(){}}));
  const document={
    documentElement:{lang:'en'},
    querySelector:key=>element(key),
    querySelectorAll:key=>key==='[data-t]'?titled:key==='.view'?panels:key==='.tabs [data-view]'?tabs:[]
  };
  const memory=new Map();
  const localStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)};
  const context=vm.createContext({window:{...ctx.window},document,localStorage,location:{protocol:'file:'},
    navigator:{},console,confirm:()=>true});
  vm.runInContext(src['app.js'],context,{filename:'app.js'});
  assert.match(element('#lessonCards').innerHTML,/<ruby>三番線/);
  assert.match(element('#lessonCards').innerHTML,/<rt>さんばんせん<\/rt>/);
  // The first thing a learner sees inside a phrase is the romaji, not the kanji.
  const lessonMarkup=element('#lessonCards').innerHTML;
  assert.ok(lessonMarkup.indexOf('Hajimemashite.') < lessonMarkup.indexOf('はじめまして。'));
  assert.match(lessonMarkup, /<div class="romaji-first"[^>]*>[\s\S]*?<span class="romaji-text">Hajimemashite\./);
  const videoMarkup=element('#videoCards').innerHTML;
  assert.ok(videoMarkup.indexOf('Shoki hiyō') < videoMarkup.indexOf('初期費用の内訳'));
  assert.match(videoMarkup, /class="romaji-text"/);
  assert.match(videoMarkup, /class="meaning-after"/);
  assert.equal(element('#furigana').checked,true);
  vm.runInContext("state.lang='vi';translate()",context);
  assert.equal(document.documentElement.lang,'vi');
  assert.equal(titled.find(x=>x.dataset.t==='start').textContent,'Bắt đầu học');
  assert.match(element('#lessonCards').innerHTML,/Cái này bao nhiêu tiền/);
  assert.match(element('#guideCards').innerHTML,/Cục Quản lý xuất nhập cảnh/);
  vm.runInContext("state.lang='ne';translate()",context);
  assert.match(element('#taskCards').innerHTML,/नगरपालिकाको/);
  vm.runInContext("state.lang='ja';state.furigana=false;translate()",context);
  assert.equal(element('#furigana').checked,false);
  assert.doesNotMatch(element('#lessonCards').innerHTML,/<ruby>/);
  assert.equal(titled.find(x=>x.dataset.t==='furigana').textContent,'ふりがなを表示');
  vm.runInContext("state.furigana=true;translate()",context);
  assert.match(element('#lessonCards').innerHTML,/<ruby>/);
});
