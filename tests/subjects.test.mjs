import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import vm from 'node:vm';

function load(){
  const ctx=vm.createContext({window:{}});
  for(const f of ['subjects/kana.js','subjects/kanji.js'])
    vm.runInContext(readFileSync(f,'utf8'),ctx,{filename:f});
  return ctx.window;
}
const source=load();
const groups=(items)=>items.reduce((r,x)=>(r[x.group]=(r[x.group]||0)+1,r),{});

test('kana tables include all foundational, voiced, contracted and special forms',()=>{
  for(const mode of ['hiragana','katakana']){
    const items=source.JL_KANA[mode];
    assert.equal(items.length,105);
    assert.equal(groups(items).basic,46);
    assert.equal(groups(items).voiced,25);
    assert.equal(groups(items).combined,33);
    assert.equal(groups(items).special,1);
    assert.equal(new Set(items.map(x=>x.id)).size,105);
    assert.equal(new Set(items.map(x=>x.symbol)).size,105);
    assert.ok(items.every(x=>x.roman&&x.reading&&x.symbol));
  }
  assert.equal(source.JL_KANA.hiragana[0].symbol,'あ');
  assert.equal(source.JL_KANA.katakana[0].symbol,'ア');
  assert.equal(source.JL_KANA.hiragana.find(x=>x.roman==='kya').symbol,'きゃ');
  assert.equal(source.JL_KANA.katakana.find(x=>x.roman==='kya').symbol,'キャ');
});
test('50 contextual kanji records and complete five-language glosses',()=>{
  const rows=source.JL_KANJI;
  assert.equal(rows.length,50);
  assert.equal(groups(rows).numbers,10);
  assert.equal(groups(rows).calendar,10);
  assert.equal(groups(rows).people,10);
  assert.equal(groups(rows).daily,20);
  assert.equal(new Set(rows.map(x=>x.symbol)).size,50);
  for(const row of rows){
    assert.ok(row.word.includes(row.symbol),'Example word lacks '+row.symbol);
    assert.ok(row.roman&&row.reading);
    for(const lang of ['en','ja','zh','vi','ne'])
      assert.ok(row.gloss[lang]?.trim(),row.id+':'+lang);
  }
  assert.equal(rows.find(x=>x.symbol==='日').reading,'にちようび');
  assert.equal(rows.find(x=>x.symbol==='学').roman,'gakkō');
});
test('standalone PWA entrypoints and four Android application flavors',()=>{
  for(const mode of ['hiragana','katakana','kanji']){
    const html=readFileSync('subjects/'+mode+'/index.html','utf8');
    const manifest=JSON.parse(readFileSync('subjects/'+mode+'/manifest.webmanifest','utf8'));
    assert.ok(html.includes('data-mode="'+mode+'"'));
    assert.match(html,/src="\.\.\/course.js"/);
    assert.match(html,/id="writingCanvas"/);
    assert.ok(readFileSync('android/app/src/'+mode+'/res/drawable/app_icon.xml','utf8').includes('vector'));
    assert.equal(manifest.start_url,'./index.html');
    assert.equal(manifest.display,'standalone');
    assert.match(readFileSync('index.html','utf8'),new RegExp('subjects/'+mode+'/index.html'));
  }
  const android=readFileSync('android/app/build.gradle','utf8');
  for(const mode of ['japanlife','hiragana','katakana','kanji'])
    assert.ok(android.includes('        '+mode+' {'));
});
test('course UI launches in the selected language with romaji above Japanese glyph',()=>{
  for(const mode of ['hiragana','katakana','kanji']){
    const widgets=new Map(), events=new Map();
    function get(id){
      if(!widgets.has(id)){
        widgets.set(id,{
          dataset:{},value:'',checked:true,hidden:false,textContent:'',innerHTML:'',className:'',
          classList:{add(){},toggle(){}},setAttribute(){},
          addEventListener(type,fn){events.set(id+'::'+type,fn)},
          querySelectorAll(){return[]},
          getContext(){return{clearRect(){},fillRect(){},setLineDash(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},fillText(){}}},
          getBoundingClientRect(){return{left:0,top:0,width:360,height:360}},
          setPointerCapture(){},width:360,height:360
        });
      }
      return widgets.get(id);
    }
    const tabs=['cards','quiz','write'].map(tab=>({dataset:{tab},classList:{toggle(){}},setAttribute(){},addEventListener(){}}));
    const panels=['cards','quiz','write'].map(panel=>({dataset:{panel},hidden:false}));
    const translates=['sub','cards','quiz','write','known','correct','attempts'].map(t=>({dataset:{t},textContent:''}));
    const document={
      body:{dataset:{mode}},documentElement:{lang:'en'},title:'',
      querySelector:id=>get(id),
      querySelectorAll:s=>s==='[data-t]'?translates:s==='[data-tab]'?tabs:s==='[data-panel]'?panels:[]
    };
    const stored=new Map();
    const ls={getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)};
    const env=vm.createContext({
      window:source,document,localStorage:ls,navigator:{},location:{protocol:'file:',search:'?lang=vi'},URLSearchParams,console
    });
    vm.runInContext(readFileSync('subjects/course.js','utf8'),env,{filename:'subjects/course.js'});
    assert.equal(document.documentElement.lang,'vi');
    const detail=get('#detail').innerHTML;
    assert.ok(detail.indexOf('class="detail-roman"')<detail.indexOf('class="detail-symbol"'));
    assert.match(get('#grid').innerHTML,/class="glyph-roman"/);
    assert.match(get('#quizprompt').innerHTML,/<strong>/);
    if(mode==='kanji'){
      const quiz=get('#quizprompt').innerHTML;
      assert.match(quiz, /class="quiz-romaji"/);
      assert.match(quiz, /class="quiz-word"/);
      assert.ok(quiz.indexOf('quiz-romaji')<quiz.indexOf('quiz-word'));
      assert.ok(quiz.includes('□'), 'kanji quiz must mask exactly one target glyph');
    }
    assert.equal(get('#group').value,mode==='kanji'?'numbers':'basic');
    assert.ok(events.has('#writingCanvas::pointerdown'));
  }
});
