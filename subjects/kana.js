'use strict';
/* 46 basic + 25 voiced/semi-voiced + 33 contracted + 1 special item per syllabary.
   Some historical/rare variants can share Hepburn romaji (e.g. じ/ぢ). */
window.JL_KANA=(()=>{
const base=[
 ['あいうえお','a i u e o'],['かきくけこ','ka ki ku ke ko'],
 ['さしすせそ','sa shi su se so'],['たちつてと','ta chi tsu te to'],
 ['なにぬねの','na ni nu ne no'],['はひふへほ','ha hi fu he ho'],
 ['まみむめも','ma mi mu me mo'],['やゆよ','ya yu yo'],
 ['らりるれろ','ra ri ru re ro'],['わを','wa wo'],['ん','n']
];
const voiced=[
 ['がぎぐげご','ga gi gu ge go'],['ざじずぜぞ','za ji zu ze zo'],
 ['だぢづでど','da ji zu de do'],['ばびぶべぼ','ba bi bu be bo'],
 ['ぱぴぷぺぽ','pa pi pu pe po']
];
const combos=[
 ['きゃきゅきょ','kya kyu kyo'],['しゃしゅしょ','sha shu sho'],
 ['ちゃちゅちょ','cha chu cho'],['にゃにゅにょ','nya nyu nyo'],
 ['ひゃひゅひょ','hya hyu hyo'],['みゃみゅみょ','mya myu myo'],
 ['りゃりゅりょ','rya ryu ryo'],['ぎゃぎゅぎょ','gya gyu gyo'],
 ['じゃじゅじょ','ja ju jo'],['びゃびゅびょ','bya byu byo'],
 ['ぴゃぴゅぴょ','pya pyu pyo']
];
function toKatakana(h){
 return Array.from(h).map(c=>{
  const code=c.codePointAt(0);
  return code>=0x3041&&code<=0x3096?String.fromCodePoint(code+0x60):c;
 }).join('');
}
function make(mode){
 const to=mode==='katakana'?toKatakana:s=>s, result=[];
 const add=(group,symbol,roman,reading=symbol,word=symbol)=>result.push({
   id:mode+'-'+result.length,group,symbol:to(symbol),roman,
   reading:to(reading),word:to(word)
 });
 for(const [chars,roman] of base){
  const a=[...chars],b=roman.split(' ');
  if(a.length!==b.length)throw Error('Incorrect base kana');
  a.forEach((x,i)=>add('basic',x,b[i]));
 }
 for(const [chars,roman] of voiced){
  const a=[...chars],b=roman.split(' ');
  if(a.length!==b.length)throw Error('Incorrect voiced kana');
  a.forEach((x,i)=>add('voiced',x,b[i]));
 }
 for(const [chars,roman] of combos){
  const a=chars.match(/.{2}/gu),b=roman.split(' ');
  if(a.length!==b.length)throw Error('Incorrect kana combination');
  a.forEach((x,i)=>add('combined',x,b[i]));
 }
 if(mode==='hiragana')result.push({
  id:'hiragana-small-tsu',group:'special',symbol:'っ',
  roman:'small tsu',reading:'きって',word:'きって',exampleRoman:'kitte'
 });else result.push({
  id:'katakana-long-vowel',group:'special',symbol:'ー',
  roman:'long vowel',reading:'コーヒー',word:'コーヒー',exampleRoman:'kōhī'
 });
 return result;
}
return {hiragana:make('hiragana'),katakana:make('katakana')};
})();