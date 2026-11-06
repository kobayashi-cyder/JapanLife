'use strict';
/* Standalone JapanLife script courses. No external API and no learner tracking. */
(() => {
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const mode=document.body.dataset.mode;
if(!['hiragana','katakana','kanji'].includes(mode))throw new Error('Unknown course');
const full=mode==='kanji'?window.JL_KANJI:window.JL_KANA[mode];
if(!full||!full.length)throw Error('Course data unavailable');
const titles={
en:{hiragana:'Hiragana',katakana:'Katakana',kanji:'Kanji'},
ja:{hiragana:'ひらがな',katakana:'カタカナ',kanji:'漢字'},
zh:{hiragana:'平假名',katakana:'片假名',kanji:'汉字'},
vi:{hiragana:'Hiragana',katakana:'Katakana',kanji:'Kanji'},
ne:{hiragana:'हिरागाना',katakana:'काताकाना',kanji:'कान्जी'}
};
const labels={
en:{
back:'← JapanLife home',sub:'Learn Japanese writing one step at a time',cards:'Explore',quiz:'Reading quiz',write:'Write',filter:'Choose a set',done:'Recognized',learned:'Mark learned ✓',unlearn:'Mark as not learned',listen:'Listen',practice:'Practice this symbol',tip:'Learning tip',all:'All',basic:'46 basic',voiced:'Voiced sounds',combined:'Contracted sounds',special:'Special marks',
numbers:'Numbers',calendar:'Calendar & time',people:'People & places',daily:'Daily actions',questionKana:'Choose the symbol for:',questionKanji:'Which kanji completes this word?',answer:'Correct!',wrong:'Not quite. Correct answer:',next:'Next question',attempts:'Questions',correct:'Correct',known:'Learned',guide:'Show tracing guide',clear:'Clear writing',drawing:'Trace with a finger, stylus or mouse. Writing is not automatically graded.',reading:'Example reading',meaning:'Example meaning',kanaNote:'Start with the 46 basic forms. Particles は, へ and を can sound wa, e and o. The small っ doubles a following consonant; ー lengthens a vowel.',kanjiNote:'Kanji often have multiple readings. The romaji and furigana here belong to the example word, not every use of the character.',check:'Review the writing yourself; this is not automatic handwriting recognition.',romaji:'ROMAJI',romanNote:'Romaji comes first, followed by the Japanese writing and its reading.'
},
ja:{
back:'← JapanLifeへ',sub:'日本語の文字を一歩ずつ学ぶ',cards:'文字一覧',quiz:'読み取りクイズ',write:'書く練習',filter:'学習範囲',done:'習得済み',learned:'学習済みにする ✓',unlearn:'未学習に戻す',listen:'音声',practice:'この文字を練習',tip:'学習の注意点',all:'すべて',basic:'基本46文字',voiced:'濁音・半濁音',combined:'拗音',special:'特殊な表記',numbers:'数字',calendar:'曜日・時間',people:'人・場所',daily:'日常行動',questionKana:'このローマ字に対応する文字は？',questionKanji:'この単語の□に入る漢字は？',answer:'正解！',wrong:'確認しましょう。正解：',next:'次の問題',attempts:'回答数',correct:'正解数',known:'学習済み',guide:'なぞり書きの見本を表示',clear:'書いた文字を消す',drawing:'指・ペン・マウスでなぞれます。自動採点はありません。',reading:'例の読み',meaning:'例の意味',kanaNote:'まず基本46文字から。助詞の「は」「へ」「を」はそれぞれ「わ」「え」「お」と発音する場合があります。「っ」は子音をつまらせ、「ー」は母音を長くします。',kanjiNote:'漢字は単語ごとに読みが変わります。ここに表示するローマ字とふりがなは例の単語の読みであり、唯一の読みではありません。',check:'書き取りは自動判定しません。自分で形を確認してください。',romaji:'ローマ字',romanNote:'ローマ字 → 日本語表記と読みの順で練習します。'
},
zh:{
back:'← 返回 JapanLife',sub:'循序渐进学习日语文字',cards:'文字表',quiz:'认读测验',write:'书写练习',filter:'选择单元',done:'已学',learned:'标记为已学 ✓',unlearn:'取消已学标记',listen:'朗读',practice:'练习这个字',tip:'学习提示',all:'全部',basic:'46个基础字符',voiced:'浊音与半浊音',combined:'拗音',special:'特殊符号',numbers:'数字',calendar:'日期和时间',people:'人物与地点',daily:'日常行动',questionKana:'选择对应罗马字的假名：',questionKanji:'选择填入□的汉字：',answer:'答对了！',wrong:'再看一下。正确答案：',next:'下一题',attempts:'答题数',correct:'答对',known:'已学',guide:'显示描红字形',clear:'清除笔迹',drawing:'可以用手指、触控笔或鼠标描写。没有自动评分。',reading:'例词读音',meaning:'例词含义',kanaNote:'先学46个基础字符。助词 は、へ、を 的读音可能分别是 wa、e、o。小 っ 表示促音，ー表示长音。',kanjiNote:'同一个汉字在不同词语中可能有不同读音。这里的罗马字与注音仅对应示例词。',check:'请自行比对字形，书写不会自动评分。',romaji:'罗马字',romanNote:'先显示罗马字，再显示日文和注音。'
},
vi:{
back:'← Về JapanLife',sub:'Học chữ Nhật từng bước',cards:'Bảng chữ',quiz:'Trắc nghiệm',write:'Tập viết',filter:'Chọn bài',done:'Đã học',learned:'Đánh dấu đã học ✓',unlearn:'Bỏ dấu đã học',listen:'Nghe',practice:'Luyện chữ này',tip:'Ghi nhớ',all:'Tất cả',basic:'46 chữ cơ bản',voiced:'Âm hữu thanh',combined:'Âm ghép',special:'Dấu đặc biệt',numbers:'Số đếm',calendar:'Lịch & giờ',people:'Người & địa điểm',daily:'Hoạt động thường ngày',questionKana:'Chọn chữ cho cách đọc:',questionKanji:'Chọn chữ kanji còn thiếu (□):',answer:'Đúng rồi!',wrong:'Chưa đúng. Đáp án:',next:'Câu tiếp theo',attempts:'Đã trả lời',correct:'Đúng',known:'Đã học',guide:'Hiện chữ mẫu',clear:'Xóa nét vẽ',drawing:'Viết bằng tay, bút hoặc chuột. Chưa có chấm điểm tự động.',reading:'Cách đọc từ mẫu',meaning:'Nghĩa từ mẫu',kanaNote:'Học 46 chữ cơ bản trước. Trợ từ は, へ, を đôi khi đọc là wa, e, o. Chữ っ là âm ngắt; ー kéo dài nguyên âm.',kanjiNote:'Một kanji có thể có nhiều cách đọc; romaji và furigana ở đây là của từ ví dụ.',check:'Hãy tự so sánh nét chữ. Hệ thống chưa nhận dạng chữ viết.',romaji:'ROMAJI',romanNote:'Romaji được đưa lên trước chữ Nhật và cách đọc.'
},
ne:{
back:'← JapanLife मा फर्कनुहोस्',sub:'जापानी लिपि क्रमशः सिक्नुहोस्',cards:'अक्षर सूची',quiz:'पठन प्रश्न',write:'लेख्ने अभ्यास',filter:'समूह छान्नुहोस्',done:'सिकेको',learned:'सिकेको चिन्ह ✓',unlearn:'चिन्ह हटाउनुहोस्',listen:'सुन्नुहोस्',practice:'यो अक्षर अभ्यास',tip:'सुझाव',all:'सबै',basic:'४६ आधारभूत',voiced:'घोष ध्वनि',combined:'संयुक्त ध्वनि',special:'विशेष चिन्ह',numbers:'संख्या',calendar:'दिन र समय',people:'मान्छे र ठाउँ',daily:'दैनिक क्रिया',questionKana:'यो रोमान्जीको अक्षर छान्नुहोस्:',questionKanji:'शब्दको □ मा पर्ने कान्जी छान्नुहोस्:',answer:'सही!',wrong:'फेरि जाँच्नुहोस्। सही:',next:'अर्को प्रश्न',attempts:'उत्तर दिएको',correct:'सही',known:'सिकेको',guide:'लेख्ने नमुना देखाउने',clear:'लेखाइ मेटाउने',drawing:'औँला, पेन वा माउसबाट लेख्नुहोस्। स्वतः मूल्याङ्कन हुँदैन।',reading:'उदाहरणको उच्चारण',meaning:'उदाहरणको अर्थ',kanaNote:'पहिले ४६ आधारभूत अक्षर सिक्नुहोस्। は, へ, を कणका रूपमा wa, e, o सुनिन सक्छन्। っ ले व्यञ्जन दोहोर्याउँछ र ー ले स्वर लम्ब्याउँछ।',kanjiNote:'एकै कान्जीको उच्चारण शब्दअनुसार फरक हुन्छ। यहाँको रोमान्जी उदाहरण शब्दका लागि मात्र हो।',check:'आफ्नो लेखाइ आफैँ तुलना गर्नुहोस्; स्वतः अक्षर पहिचान छैन।',romaji:'रोमान्जी',romanNote:'पहिले रोमान्जी, त्यसपछि जापानी अक्षर र उच्चारण।'
}
};
const storeKey='japanlife-script-'+mode+'-v1';
let state={lang:'en',group:mode==='kanji'?'numbers':'basic',known:[],attempts:0,correct:0,chosen:0};
try {
 const saved=JSON.parse(localStorage.getItem(storeKey)||'null');
 if(saved&&typeof saved==='object')state={...state,...saved};
 const root=JSON.parse(localStorage.getItem('japanlife-progress-v1')||'null');
 if(root&&titles[root.lang]&&(!saved||!saved.lang))state.lang=root.lang;
 const query=new URLSearchParams(location.search).get('lang');
 if(query&&titles[query])state.lang=query;
} catch(e){}
if(!titles[state.lang])state.lang='en';
if(!Array.isArray(state.known))state.known=[];
if(!Number.isFinite(state.attempts))state.attempts=0;
if(!Number.isFinite(state.correct))state.correct=0;
if(!full.some(x=>x.group===state.group))state.group=mode==='kanji'?'numbers':'basic';
if(!Number.isInteger(state.chosen)||state.chosen<0||state.chosen>=full.length)state.chosen=0;
function t(k){return labels[state.lang]?.[k]||labels.en[k]||k}
function save(){try{localStorage.setItem(storeKey,JSON.stringify(state))}catch(e){}}
const groups=mode==='kanji'?['numbers','calendar','people','daily']:['basic','voiced','combined','special'];
function currentItems(){return full.filter(x=>x.group===state.group)}
function displayMeaning(x){return x.gloss?.[state.lang]||x.gloss?.en||''}
function speak(x){
 const spoken=x.reading||x.symbol;
 if(window.JapanLifeAndroid?.speak)window.JapanLifeAndroid.speak(spoken);
 else if('speechSynthesis' in window){
  speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(spoken);utterance.lang='ja-JP';utterance.rate=.85;
  speechSynthesis.speak(utterance);
 }
}
function wordLine(x){return mode==='kanji'
 ?'<ruby lang="ja">'+esc(x.word)+'<rp>(</rp><rt>'+esc(x.reading)+'</rt><rp>)</rp></ruby>'
 :'<span lang="ja">'+esc(x.symbol)+'</span>'}
function renderDetail(){
 const x=full[state.chosen], known=state.known.includes(x.id);
 $('#detail').innerHTML='<div class="detail-roman"><span>'+esc(t('romaji'))+'</span><b>'+esc(x.roman)+'</b></div>'+
 '<div class="detail-symbol" lang="ja">'+esc(x.symbol)+'</div>'+
 (mode==='kanji'?'<div class="detail-word">'+wordLine(x)+'</div><p>'+esc(t('meaning'))+': '+esc(displayMeaning(x))+'</p>':'')+
 (x.exampleRoman?'<div class="detail-word">'+esc(x.exampleRoman)+' · '+esc(x.word)+'</div>':'')+
 '<div class="detail-actions"><button id="listen" type="button">🔊 '+esc(t('listen'))+'</button>'+
 '<button id="mark" type="button">'+esc(known?t('unlearn'):t('learned'))+'</button></div>';
 $('#listen').addEventListener('click',()=>speak(x));
 $('#mark').addEventListener('click',()=>{
  if(known)state.known=state.known.filter(id=>id!==x.id);
  else state.known.push(x.id);
  save();renderCards();renderStats();renderDetail();
 });
}
function renderCards(){
 const items=currentItems();
 $('#grid').innerHTML=items.map(x=>{
 const index=full.indexOf(x);
 return '<button type="button" class="glyph-card'+(state.chosen===index?' selected':'')+'" data-card="'+index+'">'+
 '<span class="glyph-roman">'+esc(x.roman)+'</span>'+
 '<strong lang="ja">'+esc(x.symbol)+'</strong>'+
 '<span class="glyph-progress">'+(state.known.includes(x.id)?'✓':'·')+'</span></button>';
 }).join('');
}
function renderStats(){
 $('#learned').textContent=state.known.length+' / '+full.length;
 $('#correct').textContent=String(state.correct);
 $('#attempts').textContent=String(state.attempts);
}
let question=null, answered=false;
function shuffle(items){
 const a=items.slice();
 for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
 return a;
}
function nextQuestion(){
 const pool=currentItems();
 if(!pool.length)return;
 const target=pool[Math.floor(Math.random()*pool.length)];
 const other=shuffle(full.filter(x=>x.id!==target.id&&
  (mode==='kanji'?displayMeaning(x)!==displayMeaning(target):x.roman!==target.roman)));
 const choices=shuffle([target,...other.slice(0,3)]);
 question={target,choices};answered=false;
 const prompt=mode==='kanji'?displayMeaning(target):target.roman;
 $('#quizprompt').innerHTML=mode==='kanji'
  ?'<span>'+esc(t('questionKanji'))+'</span><strong class="quiz-romaji">'+esc(target.roman)+'</strong>'+
    '<strong class="quiz-word" lang="ja">'+esc(target.word.replace(target.symbol,'□'))+'</strong>'+
    '<span>'+esc(prompt)+'</span>'
  :'<span>'+esc(t('questionKana'))+'</span><strong>'+esc(prompt)+'</strong>';
 $('#answers').innerHTML=choices.map(x=>'<button type="button" class="answer" data-answer="'+esc(x.id)+'" lang="ja">'+esc(x.symbol)+'</button>').join('');
 $('#feedback').textContent='';
 $('#next').hidden=true;
}
function answer(e){
 const b=e.target.closest('[data-answer]');
 if(!b||answered||!question)return;
 answered=true;state.attempts++;
 const correct=b.dataset.answer===question.target.id;
 if(correct){
  state.correct++;
  if(!state.known.includes(question.target.id))state.known.push(question.target.id);
 }
 save();renderStats();renderCards();
 $('#feedback').textContent=(correct?t('answer'):t('wrong')+' '+question.target.symbol)+
  (mode==='kanji'?' · '+question.target.roman:'');
 $('#feedback').className=correct?'feedback good':'feedback bad';
 $('#answers').querySelectorAll('button').forEach(x=>{
  x.disabled=true;
  if(x.dataset.answer===question.target.id)x.classList.add('right');
  else if(x===b)x.classList.add('incorrect');
 });
 $('#next').hidden=false;
}
function renderLanguage(){
 document.documentElement.lang=state.lang;
 document.title='JapanLife '+titles[state.lang][mode];
 $('#language').value=state.lang;
 $('#subjectTitle').textContent=titles[state.lang][mode];
 document.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t(el.dataset.t)});
 $('#modeNote').textContent=t(mode==='kanji'?'kanjiNote':'kanaNote');
 $('#group').innerHTML=groups.map(g=>'<option value="'+g+'">'+esc(t(g))+'</option>').join('');
 $('#group').value=state.group;
 renderCards();renderDetail();renderStats();nextQuestion();drawGuide();
}
let guide=true,drawing=false;
const canvas=$('#writingCanvas'),ctx=canvas.getContext('2d');
function drawGuide(){
 if(!ctx)return;
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle='#eef4ef';ctx.fillRect(0,0,canvas.width,canvas.height);
 ctx.strokeStyle='#c3d9cb';ctx.lineWidth=1;ctx.setLineDash([7,8]);
 ctx.beginPath();ctx.moveTo(canvas.width/2,0);ctx.lineTo(canvas.width/2,canvas.height);
 ctx.moveTo(0,canvas.height/2);ctx.lineTo(canvas.width,canvas.height/2);ctx.stroke();
 ctx.setLineDash([]);
 if(guide){ctx.globalAlpha=.18;ctx.fillStyle='#166b5b';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 230px sans-serif';ctx.fillText(full[state.chosen].symbol,canvas.width/2,canvas.height/2);ctx.globalAlpha=1;}
}
function point(e){
 const r=canvas.getBoundingClientRect();
 return {x:(e.clientX-r.left)*canvas.width/r.width,y:(e.clientY-r.top)*canvas.height/r.height}
}
canvas.addEventListener('pointerdown',e=>{
 if(!ctx)return;drawing=true;canvas.setPointerCapture?.(e.pointerId);
 const p=point(e);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.strokeStyle='#193a36';ctx.lineWidth=12;ctx.lineCap='round';ctx.lineJoin='round';
 e.preventDefault();
});
canvas.addEventListener('pointermove',e=>{
 if(!drawing||!ctx)return;const p=point(e);ctx.lineTo(p.x,p.y);ctx.stroke();e.preventDefault();
});
const finish=()=>{drawing=false};
canvas.addEventListener('pointerup',finish);canvas.addEventListener('pointercancel',finish);
$('#clear').addEventListener('click',drawGuide);
$('#guide').addEventListener('change',e=>{guide=e.target.checked;drawGuide()});
$('#group').addEventListener('change',e=>{
 state.group=e.target.value;const first=full.findIndex(x=>x.group===state.group);
 if(first>=0)state.chosen=first;save();renderCards();renderDetail();drawGuide();nextQuestion();
});
$('#language').addEventListener('change',e=>{state.lang=e.target.value;save();renderLanguage()});
$('#grid').addEventListener('click',e=>{
 const b=e.target.closest('[data-card]');
 if(!b)return;state.chosen=Number(b.dataset.card);save();
 renderCards();renderDetail();drawGuide();
});
$('#answers').addEventListener('click',answer);
$('#next').addEventListener('click',nextQuestion);
document.querySelectorAll('[data-tab]').forEach(button=>button.addEventListener('click',()=>{
 const selected=button.dataset.tab;
 document.querySelectorAll('[data-panel]').forEach(panel=>panel.hidden=panel.dataset.panel!==selected);
 document.querySelectorAll('[data-tab]').forEach(tab=>{tab.classList.toggle('active',tab.dataset.tab===selected);tab.setAttribute('aria-selected',String(tab.dataset.tab===selected))});
}));
renderLanguage();
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))
 navigator.serviceWorker.register('../../sw.js').catch(()=>{});
})();