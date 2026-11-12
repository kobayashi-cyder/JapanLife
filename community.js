'use strict';
/*
 * JapanLife Local & Voice pilot.
 * Static, curated links only. No scraping, telemetry, external posting or API calls.
 * Voice entries are PRIVATE DRAFTS in this device's localStorage, not submissions.
 */
(() => {
  const LANGS = ['ja', 'en', 'zh', 'vi', 'ne'];
  const LABELS = {
    ja: {
      local:'地域の情報',voice:'困りごとメモ',localTitle:'地域の公式情報を探す',
      localIntro:'居住地を選び、公的機関・相談窓口の原文に進みましょう。出典を確かめてから行動してください。',
      area:'地域',national:'全国共通',yonago:'米子市（試行地域）',source:'元のページを開く ↗',
      official:'行政の公式情報',support:'相談支援機関',checked:'リンク確認日',sourceNote:'リンク先は更新される場合があります。行政の規則・期限・対象者は原文で再確認してください。',
      voiceTitle:'生活の困りごとを整理する',voiceIntro:'経験した問題と改善案を自分用の下書きとして整理します。',
      privateNote:'まだ自治体・運営者・第三者には送信されません。共有・提出の機能はありません。共用端末では保存内容が他の人に見られる可能性があります。',
      avoid:'氏名、住所、電話番号、在留カード番号、勤務先、病歴などは入力しないでください。',
      category:'テーマ',choose:'テーマを選ぶ',waste:'ごみ・地域',language:'言葉・情報',safety:'防災・災害',housing:'住まい',work:'仕事',health:'医療',admin:'行政',other:'その他',
      issue:'何に困りましたか？',issueHint:'例：ごみ収集の地区を見つけにくかった（個人情報は不要）',
      proposal:'どう改善されたらよいですか？（任意）',proposalHint:'例：地区を選んで収集表を見たい',
      save:'この端末に下書きを保存',export:'下書きをJSONで書き出す',draftTitle:'この端末の下書き',
      empty:'下書きはまだありません。',delete:'この下書きを削除',saved:'端末に保存しました。外部には送信していません。',
      required:'テーマと困りごとの入力が必要です。',limit:'保存できる下書きは30件までです。不要なものを削除してください。',
      blocked:'連絡先らしい情報が含まれています。個人情報を取り除いてください。',saveFailed:'端末に保存できませんでした。ブラウザーの容量・設定を確認してください。',
      exported:'下書きファイルを作成しました。共有前に内容を確認してください。',noExport:'書き出す下書きがありません。',
      deleteConfirm:'この端末に保存した下書きを削除しますか？',date:'作成日',privacy:'下書きの保存・削除・書き出しは端末内で行います。公開や送信は行われません。',
      beta:'説明文は試験的な翻訳です。原文を優先してください。'
    },
    en: {
      local:'Local resources',voice:'Concern drafts',localTitle:'Find official local information',
      localIntro:'Choose your area and follow original government or support-organization pages. Verify before acting.',
      area:'Area',national:'Nationwide',yonago:'Yonago City (pilot)',source:'Open original source ↗',
      official:'Official government source',support:'Support organization',checked:'Link checked',sourceNote:'Links may change. Check the original site for current rules, deadlines and eligibility.',
      voiceTitle:'Organize a daily-life concern',voiceIntro:'Save what happened and a possible improvement as a private draft.',
      privateNote:'Nothing is sent to a municipality, JapanLife or anyone else. This is not a submission form. Other people may see locally saved drafts on shared devices.',
      avoid:'Do not include names, addresses, phone numbers, residence-card numbers, employers or medical details.',
      category:'Topic',choose:'Select a topic',waste:'Waste & neighborhood',language:'Language & information',safety:'Disaster readiness',housing:'Housing',work:'Work',health:'Healthcare',admin:'Administration',other:'Other',
      issue:'What was difficult?',issueHint:'Example: I could not find the waste calendar for my district (no personal details).',
      proposal:'What would improve it? (optional)',proposalHint:'Example: Let me select my district to find the calendar.',
      save:'Save draft on this device',export:'Export drafts as JSON',draftTitle:'Drafts on this device',
      empty:'No drafts yet.',delete:'Delete this draft',saved:'Saved on this device. Not sent anywhere.',
      required:'Choose a topic and describe the concern.',limit:'Up to 30 drafts can be stored. Delete old drafts first.',
      blocked:'This looks like contact information. Remove personal details before saving.',saveFailed:'Could not save locally. Check browser storage settings.',
      exported:'Draft file created. Review it before sharing.',noExport:'There are no drafts to export.',
      deleteConfirm:'Delete this locally stored draft?',date:'Created',privacy:'Save, delete and export operate on this device only. No publication or transmission occurs.',
      beta:'Explanatory translations are beta. Refer to the original source.'
    },
    zh: {
      local:'本地信息',voice:'问题草稿',localTitle:'查找当地官方信息',localIntro:'请选择地区，查看政府和支援机构的原始网页。',
      area:'地区',national:'全国',yonago:'米子市（试点）',source:'打开原始网页 ↗',official:'政府官方资料',support:'支援机构',checked:'链接核对日期',sourceNote:'规则可能变化，请核对原始网页。',voiceTitle:'整理生活中的困难',voiceIntro:'在本机保存问题与改善建议草稿。',
      privateNote:'内容不会发送给政府、运营方或第三方。这不是正式提交。共用设备上的草稿可能被他人看到。',
      avoid:'请勿填写姓名、地址、电话、在留卡号码、单位或医疗信息。',category:'主题',choose:'选择主题',waste:'垃圾与社区',language:'语言与信息',safety:'防灾',housing:'住房',work:'工作',health:'医疗',admin:'行政',other:'其他',
      issue:'遇到什么困难？',issueHint:'例如：难以找到所在地区的垃圾日历',proposal:'怎样改进？（可选）',proposalHint:'例如：可按地区查询',
      save:'保存到本机',export:'导出 JSON 草稿',draftTitle:'本机草稿',empty:'尚无草稿',delete:'删除草稿',saved:'已保存到本机，未发送。',
      required:'请选择主题并描述问题。',limit:'最多保存30条草稿。',blocked:'可能包含联系方式，请删除个人信息。',saveFailed:'本机保存失败。',exported:'已生成文件，分享前请检查。',noExport:'没有可导出的草稿。',deleteConfirm:'删除此本机草稿？',date:'创建时间',privacy:'草稿仅在本机保存、删除或导出，不自动提交。',beta:'说明文字为试译，请以原始网页为准。'
    },
    vi: {
      local:'Thông tin địa phương',voice:'Bản nháp vấn đề',localTitle:'Tra cứu thông tin chính thức',localIntro:'Chọn khu vực và xem trang gốc của cơ quan hoặc tổ chức hỗ trợ.',
      area:'Khu vực',national:'Toàn Nhật Bản',yonago:'Thành phố Yonago (thử nghiệm)',source:'Mở nguồn gốc ↗',official:'Nguồn của chính quyền',support:'Tổ chức hỗ trợ',checked:'Ngày kiểm tra liên kết',sourceNote:'Quy định có thể thay đổi. Hãy kiểm tra trang gốc.',voiceTitle:'Ghi lại khó khăn trong cuộc sống',voiceIntro:'Lưu vấn đề và đề xuất dưới dạng bản nháp trên thiết bị.',
      privateNote:'Không gửi cho chính quyền, JapanLife hay bên thứ ba. Đây không phải biểu mẫu gửi ý kiến. Người khác có thể thấy dữ liệu trên thiết bị dùng chung.',
      avoid:'Không nhập tên, địa chỉ, điện thoại, số thẻ cư trú, nơi làm việc hoặc thông tin y tế.',category:'Chủ đề',choose:'Chọn chủ đề',waste:'Rác và khu phố',language:'Ngôn ngữ',safety:'Phòng chống thiên tai',housing:'Nhà ở',work:'Công việc',health:'Y tế',admin:'Hành chính',other:'Khác',
      issue:'Bạn gặp khó khăn gì?',issueHint:'Ví dụ: Không tìm được lịch thu gom rác của khu vực.',proposal:'Nên cải thiện thế nào? (tùy chọn)',proposalHint:'Ví dụ: Tra cứu lịch theo khu vực.',
      save:'Lưu nháp trên thiết bị',export:'Xuất JSON',draftTitle:'Bản nháp trên thiết bị',empty:'Chưa có bản nháp.',delete:'Xóa bản nháp',saved:'Đã lưu trên thiết bị, không gửi đi.',required:'Chọn chủ đề và mô tả vấn đề.',
      limit:'Chỉ lưu tối đa 30 bản nháp.',blocked:'Có thể chứa thông tin liên hệ. Hãy xóa dữ liệu cá nhân.',saveFailed:'Không thể lưu trên thiết bị.',exported:'Đã tạo tệp. Hãy kiểm tra trước khi chia sẻ.',noExport:'Không có bản nháp.',deleteConfirm:'Xóa bản nháp này?',date:'Ngày tạo',privacy:'Dữ liệu chỉ được lưu, xóa hoặc xuất trên thiết bị. Không tự động gửi.',beta:'Bản dịch đang thử nghiệm. Vui lòng xem bản gốc.'
    },
    ne: {
      local:'स्थानीय जानकारी',voice:'समस्या मस्यौदा',localTitle:'स्थानीय आधिकारिक जानकारी खोज्नुहोस्',localIntro:'क्षेत्र छानेर सरकारी वा सहयोगी संस्थाको मूल पृष्ठ हेर्नुहोस्।',
      area:'क्षेत्र',national:'जापानभरि',yonago:'योनागो सहर (परीक्षण)',source:'मूल स्रोत खोल्नुहोस् ↗',official:'सरकारी स्रोत',support:'सहयोगी संस्था',checked:'लिङ्क जाँच मिति',sourceNote:'नियम परिवर्तन हुन सक्छ। मूल पृष्ठ जाँच गर्नुहोस्।',
      voiceTitle:'दैनिक समस्याको मस्यौदा',voiceIntro:'समस्या र सुधार सुझाव आफ्नो उपकरणमा सुरक्षित गर्नुहोस्।',
      privateNote:'नगरपालिका, JapanLife वा अरू कसैलाई पठाइँदैन। यो पेश गर्ने फाराम होइन। साझा उपकरणमा अरूले मस्यौदा देख्न सक्छन्।',
      avoid:'नाम, ठेगाना, फोन नम्बर, निवास कार्ड नम्बर, रोजगारदाता वा स्वास्थ्य विवरण नराख्नुहोस्।',
      category:'विषय',choose:'विषय छान्नुहोस्',waste:'फोहोर र छिमेक',language:'भाषा र सूचना',safety:'विपद् तयारी',housing:'आवास',work:'काम',health:'स्वास्थ्य',admin:'प्रशासन',other:'अन्य',
      issue:'के समस्या भयो?',issueHint:'उदाहरण: आफ्नो क्षेत्रको फोहोर तालिका भेटिएन।',
      proposal:'के सुधार चाहिन्छ? (ऐच्छिक)',proposalHint:'उदाहरण: क्षेत्र छानेर तालिका हेर्न मिलोस्।',
      save:'उपकरणमा मस्यौदा राख्नुहोस्',export:'JSON निर्यात',draftTitle:'उपकरणका मस्यौदा',empty:'मस्यौदा छैन।',delete:'मस्यौदा मेट्नुहोस्',saved:'उपकरणमा सुरक्षित। कतै पठाइएको छैन।',
      required:'विषय र समस्या लेख्नुहोस्।',limit:'अधिकतम ३० मस्यौदा राख्न सकिन्छ।',blocked:'सम्पर्क विवरण देखिन्छ। व्यक्तिगत जानकारी हटाउनुहोस्।',saveFailed:'उपकरणमा राख्न सकिएन।',exported:'फाइल बन्यो। साझा गर्नुअघि जाँच गर्नुहोस्।',noExport:'निर्यात गर्न मस्यौदा छैन।',deleteConfirm:'यो मस्यौदा मेटाउने?',date:'मिति',privacy:'मस्यौदा उपकरणमै रहन्छ। स्वतः पठाइँदैन।',beta:'अनुवाद परीक्षणमा छ। मूल स्रोत हेर्नुहोस्।'
    }
  };
  const SOURCES = Object.freeze([
    {
      id:'isa-portal',area:'national',kind:'official',topic:'admin',checked:'2026-11-12',
      title:{ja:'外国人生活支援ポータルサイト',en:'Foreign Residents Support Portal'},
      detail:{ja:'在留・仕事・医療・生活の制度を多言語で確認する入口。',en:'Official multilingual guidance on residence, work, health and daily life.'},
      url:'https://www.moj.go.jp/isa/support/portal/'
    },
    {
      id:'yonago-multicultural',area:'yonago',kind:'official',topic:'language',checked:'2026-11-12',
      title:{ja:'米子市 多文化共生',en:'Yonago multicultural support'},
      detail:{ja:'外国人住民向けの市の情報・支援への入口。',en:'City information and support services for foreign residents.'},
      url:'https://www.city.yonago.lg.jp/37531.htm'
    },
    {
      id:'yonago-waste',area:'yonago',kind:'official',topic:'waste',checked:'2026-11-12',
      title:{ja:'米子市 ごみ分別収集カレンダー',en:'Yonago waste collection calendars'},
      detail:{ja:'2026年度の地区別カレンダー。町名・地区を確認して使う。',en:'2026 fiscal-year calendars differ by district; identify your area first.'},
      url:'https://www.city.yonago.lg.jp/45368.htm'
    },
    {
      id:'yonago-hazard',area:'yonago',kind:'official',topic:'safety',checked:'2026-11-12',
      title:{ja:'米子市 洪水ハザードマップ',en:'Yonago flood hazard maps'},
      detail:{ja:'洪水リスクと避難の備え。緊急時は最新の公式情報を確認。',en:'Flood-risk and preparedness resources. For emergencies, confirm current alerts.'},
      url:'https://www.city.yonago.lg.jp/8061.htm'
    },
    {
      id:'tottori-foundation',area:'yonago',kind:'support',topic:'language',checked:'2026-11-12',
      title:{ja:'鳥取県国際交流財団 米子事務所',en:'Tottori International Exchange Foundation, Yonago office'},
      detail:{ja:'外国人相談などの支援窓口。相談可能な言語・時間は原文で確認。',en:'Support and consultation office. Verify current languages and hours on its website.'},
      url:'https://www.torisakyu.or.jp/ja/1/aboutus/127/'
    }
  ]);
  const KEY='japanlife-voice-drafts-v1', REGION_KEY='japanlife-local-region-v1';
  const TOPICS=['waste','language','safety','housing','work','health','admin','other'];
  const root=document.querySelector('.tabs');
  const shell=document.querySelector('#main');
  if(!root||!shell) return;
  const language=()=>{const value=document.querySelector('#language')?.value||'en';return LANGS.includes(value)?value:'en';};
  const t=(key)=>LABELS[language()][key]||LABELS.en[key]||key;
  const pick=(map)=>map[language()]||map.en||map.ja||'';
  const node=(tag,cls,text)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x;};
  const add=(p,c)=>{p.appendChild(c);return c;};
  const option=(value,text)=>{const x=node('option',null,text);x.value=value;return x;};
  const localTab=add(root,node('button'));localTab.type='button';localTab.dataset.view='local';
  const voiceTab=add(root,node('button'));voiceTab.type='button';voiceTab.dataset.view='voice';
  const localView=add(shell,node('section','view'));localView.id='view-local';localView.hidden=true;
  const voiceView=add(shell,node('section','view'));voiceView.id='view-voice';voiceView.hidden=true;

  function validRegion(v){return v==='yonago'?'yonago':'national';}
  let region='national';
  try{region=validRegion(localStorage.getItem(REGION_KEY));}catch(e){/* private mode */}
  const localHeading=add(localView,node('div','heading'));
  const localIntro=add(localHeading,node('div'));
  const localTitle=add(localIntro,node('h2'));
  const localDescription=add(localIntro,node('p'));
  const areaLabel=add(localView,node('label','community-field-label'));
  const areaSelect=add(areaLabel,node('select','community-select'));
  areaSelect.id='jl-area';areaSelect.setAttribute('aria-label','Area / 地域');
  const sourceNotice=add(localView,node('p','community-notice'));
  const sourceCards=add(localView,node('div','cards'));
  const betaNotice=add(localView,node('p','meta'));

  const voiceHeading=add(voiceView,node('div','heading'));
  const voiceIntro=add(voiceHeading,node('div'));
  const voiceTitle=add(voiceIntro,node('h2'));
  const voiceDescription=add(voiceIntro,node('p'));
  const safety=add(voiceView,node('div','community-safety'));
  const privateNote=add(safety,node('p'));
  const avoidNote=add(safety,node('p'));
  const form=add(voiceView,node('form','community-form'));
  form.noValidate=true;
  const categoryLabel=add(form,node('label','community-field-label'));
  const categorySelect=add(categoryLabel,node('select','community-select'));
  categorySelect.id='jl-category';categorySelect.required=true;
  const problemLabel=add(form,node('label','community-field-label'));
  const problemInput=add(problemLabel,node('textarea','community-textarea'));
  problemInput.id='jl-problem';problemInput.maxLength=600;problemInput.rows=4;problemInput.required=true;
  const proposalLabel=add(form,node('label','community-field-label'));
  const proposalInput=add(proposalLabel,node('textarea','community-textarea'));
  proposalInput.id='jl-proposal';proposalInput.maxLength=400;proposalInput.rows=3;
  const saveButton=add(form,node('button','primary'));saveButton.type='submit';
  const formStatus=add(form,node('p','community-status'));formStatus.setAttribute('role','status');
  const draftsHeading=add(voiceView,node('h3'));
  const draftList=add(voiceView,node('div','community-drafts'));
  const exportBtn=add(voiceView,node('button','outline'));exportBtn.type='button';
  const privacy=add(voiceView,node('p','meta'));

  function renderLocal(){
    localTab.textContent=t('local');voiceTab.textContent=t('voice');
    localTitle.textContent=t('localTitle');localDescription.textContent=t('localIntro');
    areaLabel.firstChild?.nodeType===3 && areaLabel.firstChild.remove();
    areaLabel.insertBefore(document.createTextNode(t('area')+' '),areaSelect);
    areaSelect.replaceChildren(option('national',t('national')),option('yonago',t('yonago')));
    areaSelect.value=region;
    sourceNotice.textContent=t('sourceNote');betaNotice.textContent=t('beta');
    sourceCards.replaceChildren();
    SOURCES.filter(s=>s.area==='national'||region===s.area).forEach(source=>{
      const card=add(sourceCards,node('article','card'));
      add(card,node('span','pill',t(source.kind)));
      add(card,node('h3',null,pick(source.title)));
      add(card,node('p',null,pick(source.detail)));
      add(card,node('p','meta',t('checked')+': '+source.checked));
      const links=add(card,node('div','links'));
      const link=add(links,node('a',null,t('source')));
      link.href=source.url;link.target='_blank';link.rel='noopener noreferrer';
    });
  }

  function drafts(){
    try{
      const value=JSON.parse(localStorage.getItem(KEY)||'[]');
      return Array.isArray(value)?value.filter(x=>x&&typeof x==='object'&&typeof x.id==='string').slice(0,30):[];
    }catch(e){return [];}
  }
  function persist(value){
    try{localStorage.setItem(KEY,JSON.stringify(value));return true;}catch(e){return false;}
  }
  function sensitive(text){
    return /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/.test(text) ||
      /(?:\+?\d[\d\s()-]{8,}\d)/.test(text);
  }
  function renderVoice(){
    voiceTitle.textContent=t('voiceTitle');voiceDescription.textContent=t('voiceIntro');
    privateNote.textContent=t('privateNote');avoidNote.textContent=t('avoid');
    categoryLabel.firstChild?.nodeType===3&&categoryLabel.firstChild.remove();
    categoryLabel.insertBefore(document.createTextNode(t('category')+' '),categorySelect);
    const old=categorySelect.value;
    categorySelect.replaceChildren(option('',t('choose')),...TOPICS.map(v=>option(v,t(v))));
    if(TOPICS.includes(old))categorySelect.value=old;
    problemLabel.firstChild?.nodeType===3&&problemLabel.firstChild.remove();
    problemLabel.insertBefore(document.createTextNode(t('issue')+' '),problemInput);
    proposalLabel.firstChild?.nodeType===3&&proposalLabel.firstChild.remove();
    proposalLabel.insertBefore(document.createTextNode(t('proposal')+' '),proposalInput);
    problemInput.placeholder=t('issueHint');proposalInput.placeholder=t('proposalHint');
    saveButton.textContent=t('save');exportBtn.textContent=t('export');
    draftsHeading.textContent=t('draftTitle');privacy.textContent=t('privacy');
    renderDrafts();
  }
  function renderDrafts(){
    const items=drafts();
    draftList.replaceChildren();
    if(!items.length){add(draftList,node('p','meta',t('empty')));return;}
    items.slice().reverse().forEach(d=>{
      const card=add(draftList,node('article','card'));
      add(card,node('span','pill',t(TOPICS.includes(d.category)?d.category:'other')));
      add(card,node('p',null,String(d.problem||'')));
      if(d.proposal)add(card,node('p','meta',String(d.proposal)));
      add(card,node('p','meta',t('date')+': '+String(d.createdAt||'').slice(0,10)));
      const del=add(card,node('button','outline danger',t('delete')));
      del.type='button';del.dataset.deleteDraft=d.id;
    });
  }
  areaSelect.addEventListener('change',()=>{
    region=validRegion(areaSelect.value);
    try{localStorage.setItem(REGION_KEY,region);}catch(e){}
    renderLocal();
  });
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const category=categorySelect.value,problem=problemInput.value.trim(),proposal=proposalInput.value.trim();
    if(!TOPICS.includes(category)||!problem){formStatus.textContent=t('required');return;}
    if(sensitive(problem+' '+proposal)){formStatus.textContent=t('blocked');return;}
    const items=drafts();
    if(items.length>=30){formStatus.textContent=t('limit');return;}
    const entry={
      id:'draft-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),
      createdAt:new Date().toISOString(),region,category,problem,proposal,
      status:'draft',sourceType:'self-report'
    };
    if(!persist([...items,entry])){formStatus.textContent=t('saveFailed');return;}
    formStatus.textContent=t('saved');problemInput.value='';proposalInput.value='';
    categorySelect.value='';renderDrafts();
  });
  draftList.addEventListener('click',e=>{
    const target=e.target.closest('[data-delete-draft]');
    if(!target||!confirm(t('deleteConfirm')))return;
    if(persist(drafts().filter(d=>d.id!==target.dataset.deleteDraft))){
      formStatus.textContent='';renderDrafts();
    }else formStatus.textContent=t('saveFailed');
  });
  exportBtn.addEventListener('click',()=>{
    const items=drafts();
    if(!items.length){formStatus.textContent=t('noExport');return;}
    const payload={app:'JapanLife',schemaVersion:1,exportedAt:new Date().toISOString(),
      privacy:'Unsubmitted personal drafts. Review and remove identifying information before sharing.',drafts:items};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='japanlife-voice-drafts.json';document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),3000);
    formStatus.textContent=t('exported');
  });
  document.querySelector('#language')?.addEventListener('change',()=>{renderLocal();renderVoice();});
  renderLocal();renderVoice();
  window.JL_COMMUNITY={sourceCount:SOURCES.length,sourceIds:SOURCES.map(s=>s.id)};
})();