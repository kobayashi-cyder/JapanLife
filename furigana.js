'use strict';
/* Curated readings for JapanLife learning content. Never infer arbitrary Japanese readings. */
window.JL_FURIGANA = (() => {
  const entries = [
    ['三番線','さんばんせん'],['初期費用','しょきひよう'],['勤務時間','きんむじかん'],
    ['避難場所','ひなんばしょ'],['何曜日','なんようび'],['必要書類','ひつようしょるい'],
    ['在留資格','ざいりゅうしかく'],['出入国在留管理庁','しゅつにゅうこくざいりゅうかんりちょう'],
    ['書類','しょるい'],['必要','ひつよう'],['一度','いちど'],['教えて','おしえて'],
    ['内訳','うちわけ'],['確認','かくにん'],['熱','ねつ'],['出します','だします'],
    ['学校','がっこう'],['説明','せつめい'],['今日','きょう'],['難しい','むずかしい'],
    ['今度','こんど'],['費用','ひよう'],['初期','しょき'],['勤務','きんむ'],
    ['時間','じかん'],['市役所','しやくしょ'],['住まい','すまい'],['買い物','かいもの'],
    ['交通','こうつう'],['仕事','しごと'],['病院','びょうい'],['防災','ぼうさい'],
    ['授業','じゅぎょう'],['学習','がくしゅう'],['日常','にちじょう'],
    ['生活','せいかつ'],['日本語','にほんご'],['日本','にほん'],['外国人','がいこくじん'],
    ['住民','じゅうみん'],['住宅','じゅうたく'],['契約','けいやく'],['体験','たいけん'],
    ['誤解','ごかい'],['解消','かいしょう'],['事実','じじつ'],['情報','じょうほう'],
    ['制度','せいど'],['手続き','てつづき'],['地域','ちいき'],['自治体','じちたい'],
    ['公式','こうしき'],['通知','つうち'],['市区町村','しくちょうそん'],['文化','ぶんか'],
    ['意味','いみ'],['収集','しゅうしゅう'],['分別','ぶんべつ'],
    ['警報','けいほう'],['避難','ひなん'],['災害','さいがい'],['緊急','きんきゅう'],
    ['医療','いりょう'],['保険','ほけん'],['労働','ろうどう'],['就労','しゅうろう'],
    ['雇用','こよう'],['行動','こうどう'],['確認済み','かくにんずみ'],
    ['自立','じりつ'],['予防','よぼう'],['知らせ','しらせ'],
    ['個人','こじん'],['経験','けいけん'],['支援','しえん'],
    ['家族','かぞく'],['通勤','つうきん'],['学校生活','がっこうせいかつ']
  ];
  const escape = str => String(str).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
  const dict = Object.fromEntries(entries);
  const terms = Object.keys(dict).sort((a,b) => b.length-a.length);
  const escapedTerms=terms.map(x => x.replace(/[-/\\^$*+?.()|[\]{}]/g,'\\$&'));
  const pattern = new RegExp(escapedTerms.join('|'),'g');
  function ruby(input, show=true) {
    const text = String(input ?? '');
    if (!show) return escape(text);
    let html='', previous=0;
    for (const match of text.matchAll(pattern)) {
      const index = match.index, word=match[0];
      html += escape(text.slice(previous,index));
      html += '<ruby>'+escape(word)+'<rp>(</rp><rt>'+escape(dict[word])+'</rt><rp>)</rp></ruby>';
      previous=index+word.length;
    }
    return html+escape(text.slice(previous));
  }
  return {ruby,escape,readings:dict};
})();