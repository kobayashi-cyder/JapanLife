'use strict';
/* JapanLife MVP: no remote APIs, no embedded third-party video, no tracking. */
const $=s=>document.querySelector(s);
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const data={
en:{eyebrow:'JAPANESE × REAL LIFE',headline:'Understand Japan. Live your way.',intro:'Learn useful words, watch real experiences, and check the facts before acting.',start:'Start learning',watch:'Explore everyday videos',principle:'Personal vlogs show an experience, not a nationwide rule. Always confirm legal and administrative details with official sources.',completed:'Lessons completed',practiced:'Quiz questions attempted',tasksDone:'Life tasks checked',learn:'Learn Japanese',videos:'Daily life videos',guides:'Life guide',facts:'Fact checks',plan:'My plan',learnTitle:'Japanese for real situations',learnDesc:'Practice one expression, listen, and answer a quick question.',search:'Search lessons',videoTitle:'Life, as residents experience it',videoDesc:'Observe the experience, practice a phrase, then check an official reference. Videos open on YouTube only when selected.',guideTitle:'Know what to verify',guideDesc:'Rules, contracts and social customs are different. Go to the original source for details.',factsTitle:'Check before you worry',factsDesc:'Replace a scary generalization with a specific verification step.',planTitle:'My first steps',planDesc:'A simple local checklist. Different residents have different obligations.',export:'Export progress',reset:'Reset progress',foot:'Independent learning, not individual legal or medical advice. No registration or tracking.',speak:'Listen',quiz:'Which translation fits this phrase?',correct:'Correct! This is one possible expression.',wrong:'Try again. The correct meaning is:',mark:'Mark completed',done:'Completed ✓',openVideo:'Watch on YouTube ↗',openSource:'Check official information ↗',observe:'Look for',practice:'Practice',context:'Context',videoBadge:'PERSONAL EXPERIENCE',sourceBadge:'OFFICIAL REFERENCE',claim:'Common worry',verify:'What to check',local:'Check locally',confirmReset:'Delete progress stored on this device?',noResults:'No matching lessons found.'},
ja:{eyebrow:'日本語 × ほんとうの暮らし',headline:'日本を知って、自分らしく暮らす。',intro:'生活で使う日本語を学び、在日外国人の日常を見て、行動する前に事実を確認。',start:'日本語を学ぶ',watch:'日常動画を見る',principle:'個人の動画は一人の体験であり、全国共通の規則ではありません。制度・手続きは公式情報で再確認してください。',completed:'完了したレッスン',practiced:'回答したクイズ',tasksDone:'済ませた生活タスク',learn:'日本語を学ぶ',videos:'在日外国人の日常',guides:'暮らしの案内',facts:'誤解を解消',plan:'私の計画',learnTitle:'生活場面で使う日本語',learnDesc:'表現を見て、発音を聞き、短いクイズに挑戦。',search:'場面を検索',videoTitle:'外国人住民の目線で見る日本',videoDesc:'体験を観察 → 日本語を話す → 公式情報で確かめる。動画は選択したときだけYouTubeで開きます。',guideTitle:'確かめるべきことを把握',guideDesc:'法律・契約・慣習を混同せず、原典へ進める構成です。',factsTitle:'不安を根拠で整理',factsDesc:'極端な思い込みを、確認できる具体的な問いに変える。',planTitle:'生活開始のチェック',planDesc:'端末に保存するチェックリスト。必要な手続きは在留資格などによって異なります。',export:'学習記録を保存',reset:'記録を削除',foot:'自立した学びのための試作品。個別の法律・医療助言ではありません。登録・追跡なし。',speak:'音声',quiz:'この日本語の意味は？',correct:'正解！ この表現が使えます。',wrong:'もう一度確認してみましょう。意味：',mark:'学習済みにする',done:'学習済み ✓',openVideo:'YouTubeで見る ↗',openSource:'公式情報を確認 ↗',observe:'見るポイント',practice:'練習する表現',context:'注意点',videoBadge:'個人の体験',sourceBadge:'公的資料',claim:'よくある不安',verify:'確認すること',local:'地域での確認',confirmReset:'端末に保存した進捗を削除しますか？',noResults:'該当するレッスンがありません。'}
};
const portal='https://www.moj.go.jp/isa/support/portal/';
const handbook='https://www.moj.go.jp/isa/guidebook_all.html';
const jma='https://www.jma.go.jp/jma/en/menu.html';
const lessons=[
{topic:['あいさつ','Introductions'],level:'A1',jp:'はじめまして。よろしくお願いします。',read:'Hajimemashite. Yoroshiku onegai shimasu.',en:'Nice to meet you.',group:'social'},
{topic:['聞き返す','Ask for repetition'],level:'A1',jp:'もう一度、ゆっくりお願いします。',read:'Mō ichido, yukkuri onegai shimasu.',en:'Please say that again slowly.',group:'social'},
{topic:['買い物','Shopping'],level:'A1',jp:'これはいくらですか。',read:'Kore wa ikura desu ka.',en:'How much is this?',group:'shopping'},
{topic:['交通','Transport'],level:'A1',jp:'三番線はどこですか。',read:'Sanban-sen wa doko desu ka.',en:'Where is platform three?',group:'transport'},
{topic:['市役所','City hall'],level:'A2',jp:'必要な書類を教えてください。',read:'Hitsuyō na shorui o oshiete kudasai.',en:'Please tell me which documents I need.',group:'city'},
{topic:['住まい','Housing'],level:'A2',jp:'初期費用の内訳を教えてください。',read:'Shoki hiyō no uchiwake o oshiete kudasai.',en:'Please explain the breakdown of initial fees.',group:'housing'},
{topic:['職場','Work'],level:'A2',jp:'勤務時間を確認してもいいですか。',read:'Kinmu jikan o kakunin shite mo ii desu ka.',en:'May I confirm my work hours?',group:'work'},
{topic:['病院','At a clinic'],level:'A1',jp:'熱があります。',read:'Netsu ga arimasu.',en:'I have a fever.',group:'health'},
{topic:['ごみ','Waste collection'],level:'A1',jp:'ごみは何曜日に出しますか。',read:'Gomi wa nan-yōbi ni dashimasu ka.',en:'What day should I put out the rubbish?',group:'waste'},
{topic:['防災','Disaster readiness'],level:'A2',jp:'避難場所はどこですか。',read:'Hinan basho wa doko desu ka.',en:'Where is the evacuation site?',group:'safety'},
{topic:['学校','School and family'],level:'A2',jp:'学校からのお知らせを説明していただけますか。',read:'Gakkō kara no oshirase o setsumei shite itadakemasu ka.',en:'Could you explain this notice from the school?',group:'school'},
{topic:['断り方','Setting boundaries'],level:'A2',jp:'今日は難しいです。また今度お願いします。',read:'Kyō wa muzukashii desu. Mata kondo onegai shimasu.',en:'I cannot today. Perhaps another time.',group:'social'}
];
const videos=[
{title:'Moving Apartments in Tokyo is Hard and Expensive',creator:'Tokidoki Traveller',date:'2024-12-17',url:'https://www.youtube.com/watch?v=RJOkmOECDFA',topic:['住宅の契約','Apartment contracts'],observe:['申込・引っ越し・初期費用の項目','Application, moving, and up-front fees'],context:['東京の一人の体験。費用・審査・契約条件は物件ごとに違います。','One person’s Tokyo experience; fees and conditions vary by property.'],lesson:5,source:handbook},
{title:'Daily LIFE in JAPAN: Inside a Japanese Home Store!',creator:'Sharmeleon',date:'2021-06-05',url:'https://www.youtube.com/watch?v=SShT5HmtV1Q',topic:['日用品の買い物','Everyday shopping'],observe:['店内の品揃え、商品の値段、売り場','Store sections, products, and prices'],context:['特定のお店の紹介。全国の店に同じ商品や価格があるとは限りません。','A look at one store; availability and prices are not universal.'],lesson:2,source:portal},
{title:'Daily Life in Japan | Grocery Shopping & Apartment Search',creator:'Lou C.ルーシ',date:'2025-08-31',url:'https://www.youtube.com/watch?v=C29Xd09eLI8',topic:['日常の買い物と部屋探し','Groceries and apartment hunting'],observe:['食品の値段、生活費、部屋探しの条件','Grocery costs, budgets, and rental preferences'],context:['撮影された時期・地域・条件で費用は異なります。','Costs vary by time, neighborhood and individual circumstances.'],lesson:2,source:handbook},
{title:'daily life in japan: house tour, road trip, home cooking',creator:'Sharmeleon',date:'2024-10-16',url:'https://www.youtube.com/watch?v=0pccQjv5RbU',topic:['日常生活の工夫','Home routines and food'],observe:['家での食事、暮らしの過ごし方','Cooking, home routines, and everyday choices'],context:['暮らし方は本人の好み。日本人・外国人全体の代表例ではありません。','Personal choices, not a representative sample of life in Japan.'],lesson:0,source:portal}
];
const guides=[
{title:['在留資格・入国手続','Residence status'],kind:['公的制度','Official rules'],description:['就労・在留の条件や期限は本人の資格により異なります。個別の要件は出入国在留管理庁で確認。','Permitted activities and deadlines depend on your status. Check your circumstances with immigration authorities.'],source:portal},
{title:['引っ越し・役所','Moving & city hall'],kind:['自治体ごとの手続','Local procedures'],description:['住所に関する届出や必要書類は地域・本人の状況で確認します。','Check address procedures and required documents with your own municipality.'],source:handbook},
{title:['住居・契約','Renting a home'],kind:['契約条件','Contract terms'],description:['初期費用、保証、退去条件は書面で確認し、分からない部分は契約前に質問します。','Read up-front fees, guarantees and move-out terms in writing before signing.'],source:handbook},
{title:['買い物・支払い','Shopping & payment'],kind:['生活の習慣','Daily practice'],description:['支払方法やレジでの言葉は店舗ごとに違います。まず使う表現から練習。','Payment options vary by store. Learn useful language for checkout.'],source:portal},
{title:['医療・保険','Clinics & health insurance'],kind:['制度と加入条件','Rules & eligibility'],description:['保険の適用、医療費や受診先は個人の条件で変わります。公的な案内と医療機関に確認。','Coverage and costs depend on eligibility and provider. Verify with the insurer or clinic.'],source:handbook},
{title:['仕事・労働','Work & employment'],kind:['労働条件と在留資格','Employment & status'],description:['賃金、労働時間、就労可能な活動は分けて確認します。','Verify written work conditions separately from permission to undertake the work.'],source:handbook},
{title:['ごみ・地域生活','Waste & neighborhood'],kind:['自治体の決まり','Municipality-specific'],description:['ごみ出しの日・分別は自治体で違います。自分が住む地域の収集カレンダーが必要です。','Waste types and collection days differ. Check your municipality’s calendar.'],source:portal},
{title:['地震・災害','Earthquakes & disasters'],kind:['最新の公的情報','Current official information'],description:['避難場所は事前に確認し、警報時には自治体と気象庁の最新情報を確認します。','Find evacuation routes in advance. Follow local notices and official weather warnings.'],source:jma},
{title:['学校・子育て','Schools & family'],kind:['学校・自治体による','School & local'],description:['学校の行事・保護者への連絡方法は学校ごとに違います。分からない通知は学校に相談。','School routines and notices vary. Ask staff for help understanding documents.'],source:handbook},
{title:['礼儀と個人の選択','Etiquette and autonomy'],kind:['慣習≠法律','Customs ≠ laws'],description:['礼儀には地域・状況・人による違いがあります。文化を一律の法的義務と誤解しないこと。','Cultural norms differ by person and context and are not automatically legal obligations.'],source:portal}
];
const facts=[
{worry:['「ごみ出しの曜日は日本全国で同じ」','“Rubbish is collected on the same day everywhere in Japan.”'],truth:['誤り。自治体ごとに収集ルールが異なります。','False. Collection rules vary by municipality.'],next:['自治体公式サイトでごみカレンダーを確認する。','Find your municipality’s waste collection calendar.'],source:portal},
{worry:['「部屋を借りる初期費用は必ず同額」','“Every renter pays exactly the same up-front fees.”'],truth:['誤り。物件・契約によって費用項目が変わります。','False. Fees depend on the property and the contract.'],next:['契約前に費用明細と条件を確認する。','Request an itemized cost estimate and check the agreement.'],source:handbook},
{worry:['「動画で見た体験は全外国人に当てはまる」','“One foreign resident’s video describes everyone’s experience.”'],truth:['誤り。地域、時期、在留資格、生活環境などで異なります。','False. Experiences vary by location, time and personal circumstances.'],next:['気づきをメモし、公的な情報や複数の事例と比較する。','Write down questions; compare with official guidance and other experiences.'],source:portal},
{worry:['「礼儀のすべてが法律で決まっている」','“All etiquette in Japan is required by law.”'],truth:['誤り。習慣、施設ルール、契約、法律は区別が必要です。','False. Customs, facility policies, contracts and laws are distinct.'],next:['従うべき理由と根拠が何かを確認する。','Ask whether something is a law, contract rule or social expectation.'],source:portal}
];
const tasks=[
['居住地の自治体公式サイトを見つける','Find your municipality’s official website'],
['在留資格に関する必要手続を確認する','Check residence-related requirements'],
['緊急時の連絡方法・避難場所を知る','Find emergency contacts and evacuation locations'],
['医療保険と受診方法を確認する','Confirm health coverage and how to visit a clinic'],
['賃貸契約や住まいの費用を確認する','Review housing contracts and costs'],
['ごみの収集カレンダーを探す','Find local waste collection information'],
['仕事・通学に必要な書類を確認する','Check documents needed for work or school'],
['日本語で聞き返す表現を練習する','Practice asking someone to repeat information']
];
const KEY='japanlife-progress-v1';
let state={lang:'en',furigana:true,completed:[],attempted:0,checked:[]};
try{const stored=JSON.parse(localStorage.getItem(KEY)||'{}');if(stored&&typeof stored==='object'){state={...state,...stored};if(!Array.isArray(state.completed))state.completed=[];if(!Array.isArray(state.checked))state.checked=[];if(!Number.isInteger(state.attempted)||state.attempted<0)state.attempted=0}}catch(e){}
if(!window.JL_I18N.hasLanguage(state.lang))state.lang='en';
if(typeof state.furigana!=='boolean')state.furigana=true;
const tr=k=>data[state.lang]?.[k]||window.JL_I18N.message(state.lang,k)||data.en[k]||k;
const local=a=>a[state.lang==='ja'?0:1];
const translated=(kind,index,base)=>window.JL_I18N.field(state.lang,kind,index)||local(base);
const meaning=i=>window.JL_I18N.field(state.lang,'meanings',i)||lessons[i].en;
const jp=txt=>window.JL_FURIGANA.ruby(txt,state.furigana);
const maybeRuby=txt=>state.lang==='ja'?jp(txt):esc(txt);
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
function stats(){$('#completedCount').textContent=state.completed.length;$('#practiceCount').textContent=state.attempted;$('#taskCount').textContent=state.checked.length}
function speak(s){if(window.JapanLifeAndroid&&typeof window.JapanLifeAndroid.speak==='function'){window.JapanLifeAndroid.speak(s);return;}if('speechSynthesis' in window){speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(s);utterance.lang='ja-JP';utterance.rate=.88;speechSynthesis.speak(utterance)}}
function renderLessons(){
  const q=($('#search').value||'').toLocaleLowerCase();
  const found=lessons.map((l,i)=>({l,i})).filter(({l,i})=>
    (translated('topics',i,l.topic)+' '+l.jp+' '+l.read+' '+meaning(i)).toLocaleLowerCase().includes(q)
  );
  $('#lessonCards').innerHTML=found.map(({l,i})=>{
    const answers=[meaning(i),meaning((i+3)%lessons.length),meaning((i+7)%lessons.length)];
    const correctSlot=i%3;
    for(let n=0;n<correctSlot;n++)answers.unshift(answers.pop());
    return '<article class="card"><span class="pill">'+esc(l.level)+'</span><h3>'+maybeRuby(translated('topics',i,l.topic))+'</h3>'+
    '<div class="phrase"><strong lang="ja">'+jp(l.jp)+'</strong><small>'+esc(l.read)+'</small><button type="button" data-speak="'+i+'">🔊 '+esc(tr('speak'))+'</button></div>'+
    '<p class="meta">'+esc(meaning(i))+'</p>'+
    '<div class="quiz"><strong>'+esc(tr('quiz'))+'</strong><div class="choices">'+answers.map((c,j)=>'<button type="button" data-answer="'+i+':'+j+'">'+esc(c)+'</button>').join('')+'</div><div id="feedback-'+i+'" class="feedback" role="status"></div></div>'+
    '<button class="outline" type="button" data-complete="'+i+'">'+esc(state.completed.includes(i)?tr('done'):tr('mark'))+'</button></article>';
  }).join('')||'<p>'+esc(tr('noResults'))+'</p>';
}
function renderVideos(){
  $('#videoCards').innerHTML=videos.map((v,i)=>
    '<article class="card"><span class="pill warning">'+esc(tr('videoBadge'))+'</span>'+
    '<h3>'+maybeRuby(translated('videoTopics',i,v.topic))+'</h3><p><b>'+esc(v.title)+'</b></p>'+
    '<p class="meta">'+esc(v.creator)+' · '+esc(v.date)+'</p>'+
    '<p class="watch"><b>'+esc(tr('observe'))+':</b> '+maybeRuby(translated('observe',i,v.observe))+'</p>'+
    '<p><b>'+esc(tr('context'))+':</b> '+maybeRuby(translated('context',i,v.context))+'</p>'+
    '<div class="phrase"><small>'+esc(tr('practice'))+'</small><strong lang="ja">'+jp(lessons[v.lesson].jp)+'</strong>'+
    '<button type="button" data-speak="'+v.lesson+'">🔊 '+esc(tr('speak'))+'</button></div>'+
    '<div class="links"><a href="'+esc(v.url)+'" target="_blank" rel="noopener noreferrer">'+esc(tr('openVideo'))+'</a>'+
    '<a href="'+esc(v.source)+'" target="_blank" rel="noopener noreferrer">'+esc(tr('openSource'))+'</a></div></article>'
  ).join('');
}
function renderGuides(){
  $('#guideCards').innerHTML=guides.map((g,i)=>
    '<article class="card"><span class="pill">'+maybeRuby(translated('guideKinds',i,g.kind))+'</span>'+
    '<h3>'+maybeRuby(translated('guideTitles',i,g.title))+'</h3>'+
    '<p>'+maybeRuby(translated('guideDescriptions',i,g.description))+'</p>'+
    '<div class="links"><a href="'+esc(g.source)+'" target="_blank" rel="noopener noreferrer">'+esc(tr('openSource'))+'</a></div></article>'
  ).join('');
}
function renderFacts(){
  $('#factCards').innerHTML=facts.map((f,i)=>
    '<article class="card"><span class="pill warning">'+esc(tr('claim'))+'</span>'+
    '<h3>'+maybeRuby(translated('factWorries',i,f.worry))+'</h3>'+
    '<p>'+maybeRuby(translated('factTruths',i,f.truth))+'</p>'+
    '<p class="watch"><b>'+esc(tr('verify'))+': </b>'+maybeRuby(translated('factActions',i,f.next))+'</p>'+
    '<div class="links"><a href="'+esc(f.source)+'" target="_blank" rel="noopener noreferrer">'+esc(tr('openSource'))+'</a></div></article>'
  ).join('');
}
function renderPlan(){
  $('#taskCards').innerHTML=tasks.map((t,i)=>
    '<label class="check"><input type="checkbox" data-task="'+i+'" '+(state.checked.includes(i)?'checked':'')+'>'+
    '<span>'+maybeRuby(translated('tasks',i,t))+'</span></label>'
  ).join('');
}
function translate(){
  document.documentElement.lang=state.lang;
  $('#language').value=state.lang;
  $('#furigana').checked=state.furigana;
  document.querySelectorAll('[data-t]').forEach(el=>el.textContent=tr(el.dataset.t));
  $('#search').placeholder=tr('search');
  $('#search').setAttribute('aria-label',tr('search'));
  renderLessons();renderVideos();renderGuides();renderFacts();renderPlan();stats();
}
function setView(view){
document.querySelectorAll('.view').forEach(x=>x.hidden=x.id!=='view-'+view);
document.querySelectorAll('.tabs [data-view]').forEach(x=>{const active=x.dataset.view===view;x.classList.toggle('active',active);x.setAttribute('aria-current',active?'page':'false')});
}
document.querySelector('.tabs').addEventListener('click',e=>{const btn=e.target.closest('[data-view]');if(btn)setView(btn.dataset.view)});
$('#begin').addEventListener('click',()=>setView('learn'));
$('#watchBtn').addEventListener('click',()=>setView('videos'));
$('#language').addEventListener('change',e=>{state.lang=e.target.value;save();translate()});
$('#furigana').addEventListener('change',e=>{state.furigana=e.target.checked;save();translate()});
$('#search').addEventListener('input',renderLessons);
$('#lessonCards').addEventListener('click',e=>{
const sp=e.target.closest('[data-speak]');if(sp){speak(lessons[Number(sp.dataset.speak)].jp);return}
const ans=e.target.closest('[data-answer]');if(ans){const [i,j]=ans.dataset.answer.split(':').map(Number);const isRight=j===i%3;state.attempted++;save();stats();const box=$('#feedback-'+i);box.textContent=isRight?tr('correct'):tr('wrong')+' '+meaning(i);ans.classList.add(isRight?'correct':'wrong');return}
const done=e.target.closest('[data-complete]');if(done){const i=Number(done.dataset.complete);if(!state.completed.includes(i))state.completed.push(i);save();stats();renderLessons()}
});
$('#videoCards').addEventListener('click',e=>{const sp=e.target.closest('[data-speak]');if(sp)speak(lessons[Number(sp.dataset.speak)].jp)});
$('#taskCards').addEventListener('change',e=>{if(!e.target.matches('[data-task]'))return;const i=Number(e.target.dataset.task);state.checked=state.checked.filter(x=>x!==i);if(e.target.checked)state.checked.push(i);save();stats()});
$('#reset').addEventListener('click',()=>{if(confirm(tr('confirmReset'))){state.completed=[];state.attempted=0;state.checked=[];save();translate()}});
$('#export').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({app:'JapanLife',version:1,exportedAt:new Date().toISOString(),progress:state},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='japanlife-progress.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),3000)});
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
translate();setView('learn');