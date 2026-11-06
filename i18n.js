'use strict';
/* Educational translations: beta drafts, subject to native-speaker review.
 * Array indexes deliberately align with the curated records in app.js.
 * If no curated translation exists, fall back to English, not machine-translated rules. */
window.JL_I18N = (() => {
  const languages = {en:'English',ja:'日本語',zh:'简体中文',vi:'Tiếng Việt',ne:'नेपाली'};
  const ui={
    zh:{
      eyebrow:'日语 × 真实生活',headline:'了解日本，自在生活。',intro:'学习实用表达，观察真实生活，行动前核实信息。',
      start:'开始学习',watch:'探索日常视频',principle:'个人视频只代表个人经历，不是全国通用的规定。请向官方来源确认法律和行政手续。',
      completed:'已完成课程',practiced:'已答题数',tasksDone:'已核对事项',learn:'日语学习',characters:'文字科目',charactersTitle:'假名与汉字',charactersDesc:'三个独立课程，包含听音、测验和描写练习。',hiraganaTitle:'平假名',hiraganaDesc:'学习46个基础假名、浊音和拗音。',katakanaTitle:'片假名',katakanaDesc:'阅读外来语、名字与商店标识。',kanjiTitle:'汉字',kanjiDesc:'通过50个常用字及例词学习读音。',openCourse:'进入课程 ↗',videos:'生活视频',guides:'生活指南',facts:'事实核查',plan:'我的计划',
      learnTitle:'实用情景日语',learnDesc:'学习表达、听发音，并完成简短测验。',search:'搜索课程',
      videoTitle:'日本居民的真实体验',videoDesc:'观察经历、练习日语、再核对官方资料。仅在点击后打开 YouTube。',
      guideTitle:'明确需要核实的信息',guideDesc:'法律、合同和社会习惯不是一回事。请查看原始资料。',
      factsTitle:'用事实化解焦虑',factsDesc:'把笼统的担忧变成可以核实的问题。',
      planTitle:'我的生活准备清单',planDesc:'清单保存在本机。手续因个人情况而异。',
      export:'导出学习记录',reset:'清除学习记录',foot:'独立学习工具，不提供个人法律或医疗建议。无需注册，不跟踪用户。',
      speak:'朗读',quiz:'这句话是什么意思？',correct:'回答正确！这是一种可用的表达。',wrong:'再核对一下。正确含义：',
      mark:'标记为已学',done:'已学 ✓',openVideo:'在 YouTube 观看 ↗',openSource:'查看官方资料 ↗',
      observe:'观察重点',practice:'练习表达',context:'注意事项',videoBadge:'个人经历',sourceBadge:'官方资料',
      claim:'常见担忧',verify:'需要核实',local:'当地确认',confirmReset:'删除本机保存的学习记录吗？',noResults:'没有找到相关课程。',
      furigana:'显示假名注音',translationNotice:'翻译为测试版。重要事项请以官方原文为准。'
    },
    vi:{
      eyebrow:'TIẾNG NHẬT × CUỘC SỐNG THỰC',headline:'Hiểu Nhật Bản. Sống theo cách của bạn.',intro:'Học cách nói hữu ích, xem cuộc sống thực và kiểm tra thông tin trước khi hành động.',
      start:'Bắt đầu học',watch:'Khám phá video đời sống',principle:'Vlog chỉ phản ánh trải nghiệm cá nhân, không phải quy định chung. Hãy xác minh thủ tục tại nguồn chính thức.',
      completed:'Bài đã hoàn thành',practiced:'Câu hỏi đã làm',tasksDone:'Việc đã kiểm tra',learn:'Học tiếng Nhật',characters:'Học chữ Nhật',charactersTitle:'Hiragana, Katakana và Kanji',charactersDesc:'Ba môn độc lập với nghe, trắc nghiệm và tập viết.',hiraganaTitle:'Hiragana',hiraganaDesc:'46 chữ cơ bản cùng âm hữu thanh và âm ghép.',katakanaTitle:'Katakana',katakanaDesc:'Đọc từ mượn, tên riêng và biển hiệu.',kanjiTitle:'Kanji',kanjiDesc:'Học 50 chữ thông qua từ ví dụ và cách đọc.',openCourse:'Mở môn học ↗',videos:'Video đời sống',guides:'Cẩm nang',facts:'Kiểm chứng thông tin',plan:'Kế hoạch',
      learnTitle:'Tiếng Nhật cho tình huống thực tế',learnDesc:'Học mẫu câu, nghe phát âm và làm câu hỏi ngắn.',search:'Tìm bài học',
      videoTitle:'Cuộc sống qua góc nhìn người đang sống tại Nhật',videoDesc:'Quan sát, luyện nói, rồi kiểm tra nguồn chính thức. YouTube chỉ mở khi bạn chọn.',
      guideTitle:'Biết điều cần kiểm tra',guideDesc:'Luật, hợp đồng và tập quán là những điều khác nhau. Xem nguồn gốc thông tin.',
      factsTitle:'Kiểm chứng trước khi lo lắng',factsDesc:'Biến nỗi lo chung chung thành việc có thể xác minh.',
      planTitle:'Việc cần làm',planDesc:'Danh sách được lưu trên thiết bị. Thủ tục tùy hoàn cảnh.',
      export:'Xuất tiến độ',reset:'Xóa tiến độ',foot:'Công cụ học tập độc lập, không tư vấn pháp lý hoặc y tế cá nhân. Không đăng ký, không theo dõi.',
      speak:'Nghe',quiz:'Câu này có nghĩa là gì?',correct:'Đúng rồi! Đây là một cách diễn đạt.',wrong:'Hãy xem lại. Nghĩa đúng là:',
      mark:'Đánh dấu đã học',done:'Đã học ✓',openVideo:'Xem trên YouTube ↗',openSource:'Kiểm tra nguồn chính thức ↗',
      observe:'Điểm cần quan sát',practice:'Luyện nói',context:'Lưu ý',videoBadge:'TRẢI NGHIỆM CÁ NHÂN',sourceBadge:'NGUỒN CHÍNH THỨC',
      claim:'Nỗi lo thường gặp',verify:'Cần xác minh',local:'Kiểm tra tại địa phương',confirmReset:'Xóa tiến độ đã lưu trên thiết bị?',noResults:'Không tìm thấy bài học.',
      furigana:'Hiện phiên âm kana (furigana)',translationNotice:'Bản dịch đang thử nghiệm. Xác minh thông tin quan trọng tại nguồn chính thức.'
    },
    ne:{
      eyebrow:'जापानी भाषा × वास्तविक जीवन',headline:'जापान बुझ्नुहोस्। आफ्नै तरिकाले बाँच्नुहोस्।',intro:'काम लाग्ने वाक्य सिक्नुहोस्, वास्तविक अनुभव हेर्नुहोस् र कदम चाल्नुअघि तथ्य जाँच्नुहोस्।',
      start:'सिक्न सुरु गर्नुहोस्',watch:'दैनिक जीवनका भिडियो हेर्नुहोस्',principle:'व्यक्तिगत भिडियो एक व्यक्तिको अनुभव हो, देशभर लागू हुने नियम होइन। कानुनी र प्रशासनिक कुरा आधिकारिक स्रोतबाट जाँच्नुहोस्।',
      completed:'पूरा पाठ',practiced:'अभ्यास गरिएका प्रश्न',tasksDone:'जाँचिएका काम',learn:'जापानी भाषा सिक्नुहोस्',characters:'लिपि पाठ',charactersTitle:'हिरागाना, काताकाना र कान्जी',charactersDesc:'सुन्ने, प्रश्न र लेख्ने अभ्याससहित तीन छुट्टै पाठ।',hiraganaTitle:'हिरागाना',hiraganaDesc:'४६ आधारभूत अक्षर, घोष ध्वनि र संयुक्त ध्वनि।',katakanaTitle:'काताकाना',katakanaDesc:'नाम, विदेशी शब्द र बोर्ड पढ्ने अभ्यास।',kanjiTitle:'कान्जी',kanjiDesc:'५० कान्जीलाई उदाहरण शब्दको उच्चारणसँग सिक्नुहोस्।',openCourse:'पाठ खोल्नुहोस् ↗',videos:'दैनिक जीवनका भिडियो',guides:'जीवन गाइड',facts:'तथ्य जाँच',plan:'मेरो योजना',
      learnTitle:'दैनिक परिस्थितिका लागि जापानी',learnDesc:'वाक्य सिक्नुहोस्, उच्चारण सुन्नुहोस् र छोटो प्रश्न हल गर्नुहोस्।',search:'पाठ खोज्नुहोस्',
      videoTitle:'जापानमा बस्ने मानिसको वास्तविक अनुभव',videoDesc:'हेर्नुहोस्, बोल्ने अभ्यास गर्नुहोस् र आधिकारिक जानकारीसँग तुलना गर्नुहोस्। YouTube चयन गरेपछि मात्र खुल्छ।',
      guideTitle:'के जाँच्नुपर्छ बुझ्नुहोस्',guideDesc:'कानुन, सम्झौता र सामाजिक चलन फरक कुरा हुन्। मूल स्रोत हेर्नुहोस्।',
      factsTitle:'चिन्ताअघि तथ्य जाँच्नुहोस्',factsDesc:'सामान्य डरलाई जाँच गर्न सकिने प्रश्नमा बदल्नुहोस्।',
      planTitle:'मेरो सुरुवाती कामहरू',planDesc:'सूची यस उपकरणमा सुरक्षित हुन्छ। आवश्यक प्रक्रिया व्यक्तिगत अवस्थाअनुसार फरक हुन्छ।',
      export:'प्रगति निर्यात',reset:'प्रगति मेटाउनुहोस्',foot:'स्वतन्त्र सिकाइका लागि। व्यक्तिगत कानुनी वा चिकित्सकीय सल्लाह होइन। दर्ता वा ट्र्याकिङ छैन।',
      speak:'सुन्नुहोस्',quiz:'यस वाक्यको अर्थ के हो?',correct:'सही! यो प्रयोग गर्न मिल्ने अभिव्यक्ति हो।',wrong:'फेरि जाँच्नुहोस्। सही अर्थ:',
      mark:'पढेको चिन्ह लगाउनुहोस्',done:'पूरा ✓',openVideo:'YouTube मा हेर्नुहोस् ↗',openSource:'आधिकारिक जानकारी हेर्नुहोस् ↗',
      observe:'के हेर्ने',practice:'अभ्यास',context:'सन्दर्भ',videoBadge:'व्यक्तिगत अनुभव',sourceBadge:'आधिकारिक स्रोत',
      claim:'सामान्य चिन्ता',verify:'के जाँच्ने',local:'स्थानीय कार्यालयमा जाँच्ने',confirmReset:'यस उपकरणमा रहेको प्रगति मेटाउने?',noResults:'मिल्ने पाठ भेटिएन।',
      furigana:'फुरिगाना देखाउनुहोस्',translationNotice:'अनुवाद परीक्षण चरणमा छ। महत्त्वपूर्ण कुरा आधिकारिक स्रोतबाट पुष्टि गर्नुहोस्।'
    }
  };
  const content={
    zh:{
      topics:['初次见面','请对方再说一次','购物','交通','市政府办事','租房','工作','看病','垃圾分类','防灾','学校','礼貌拒绝'],
      meanings:['初次见面，请多关照。','请再慢慢说一遍。','这个多少钱？','三号站台在哪里？','请告诉我需要哪些文件。','请说明初期费用的明细。','我可以确认工作时间吗？','我发烧了。','星期几可以扔垃圾？','避难地点在哪里？','能给我解释学校的通知吗？','今天不方便，下次吧。'],
      videoTopics:['租房合同','日用品购物','买菜和找房','居家生活'],
      observe:['申请、搬家与预付费用项目','商品种类、价格和卖场分区','食品价格、生活预算与租房条件','做饭、居家习惯与个人选择'],
      context:['这是东京一位居民的经历，费用和租赁条件因房源而异。','只介绍一家商店，不代表所有店的库存与价格。','费用随地点、时间与个人条件变化。','这是个人生活方式，不能代表所有日本人或外国居民。'],
      guideTitles:['在留资格与手续','搬家与市政府','租房','购物与付款','医疗与健康保险','工作与雇佣','垃圾分类与社区','地震与灾害','学校与家庭','礼仪与自主选择'],
      guideKinds:['官方规定','地方手续','合同条款','日常习惯','制度与资格','工作与在留资格','地方规定','最新官方资料','学校与地方规则','习惯不等于法律'],
      guideDescriptions:[
        '可从事的活动与办理期限因在留资格而异，请向出入国在留管理厅确认。',
        '地址申报和所需文件请根据居住地与本人情况向当地政府确认。',
        '签约前应查看初期费用、担保要求和退租条件，不懂的地方及时提问。',
        '付款方式和结账用语因店而异，先练习常用句子。',
        '保险适用情况、费用和就诊方法因个人资格与医院而异。',
        '分开核实工资、工作时间以及在留资格允许的工作内容。',
        '垃圾类别与收集日因自治体而异，请查找当地收集日历。',
        '提前确认避难地点；发生警报时查看气象厅与自治体的最新信息。',
        '学校活动与家长通知方式因学校而异，可向学校求助。',
        '礼仪随个人与场合变化，不应全部误认为法律义务。'
      ],
      factWorries:['“日本全国垃圾收集日相同”','“所有租客都支付同样的初期费用”','“视频里的经历适用于所有外国人”','“所有礼仪都有法律规定”'],
      factTruths:['错误。垃圾收集规则因自治体而异。','错误。费用因房源和合同而异。','错误。经历因地区、时间及个人情况而异。','错误。社会习惯、设施规则、合同和法律并不相同。'],
      factActions:['在自治体官网查找垃圾收集日历。','签约前索取费用明细并查看条款。','记下疑问，与官方说明及其他经历比较。','弄清某项要求属于法律、合同还是社会期待。'],
      tasks:['找到居住地自治体的官方网站','确认在留手续','了解紧急联系方法及避难地点','确认健康保险及就医方法','核实住房合同和费用','查找当地垃圾收集日历','确认工作或上学需要的文件','练习用日语请求对方再说一次']
    },
    vi:{
      topics:['Chào hỏi','Nhờ nói lại','Mua sắm','Giao thông','Tại tòa thị chính','Nhà ở','Nơi làm việc','Phòng khám','Rác thải','Phòng chống thiên tai','Trường học','Từ chối lịch sự'],
      meanings:['Rất vui được gặp bạn.','Làm ơn nói lại chậm hơn.','Cái này bao nhiêu tiền?','Sân ga số ba ở đâu?','Xin cho biết các giấy tờ cần thiết.','Xin giải thích các khoản phí ban đầu.','Tôi có thể xác nhận giờ làm không?','Tôi bị sốt.','Thứ mấy được đem rác ra?','Nơi sơ tán ở đâu?','Bạn có thể giải thích thông báo của trường không?','Hôm nay tôi không thể. Hẹn dịp khác.'],
      videoTopics:['Hợp đồng thuê nhà','Mua đồ dùng','Mua thực phẩm và tìm nhà','Sinh hoạt tại nhà'],
      observe:['Đơn đăng ký, chuyển nhà và các khoản phí ban đầu','Khu hàng, sản phẩm và giá','Chi phí thực phẩm, ngân sách và điều kiện thuê','Nấu ăn, thói quen ở nhà và lựa chọn cá nhân'],
      context:['Đây là trải nghiệm của một người ở Tokyo; chi phí và điều kiện thay đổi theo nhà.','Chỉ là một cửa hàng; hàng hóa và giá cả có thể khác nơi khác.','Chi phí thay đổi theo thời điểm, địa điểm và hoàn cảnh.','Lối sống cá nhân không đại diện cho tất cả mọi người.'],
      guideTitles:['Tư cách lưu trú','Chuyển nhà và chính quyền địa phương','Thuê nhà','Mua sắm và thanh toán','Khám bệnh và bảo hiểm','Làm việc và tuyển dụng','Rác thải và khu dân cư','Động đất và thiên tai','Trường học và gia đình','Phép lịch sự và quyền lựa chọn'],
      guideKinds:['Quy định chính thức','Thủ tục địa phương','Điều khoản hợp đồng','Sinh hoạt thường ngày','Quy định và điều kiện','Lao động và lưu trú','Theo từng địa phương','Nguồn tin mới nhất','Theo trường và địa phương','Tập quán không phải pháp luật'],
      guideDescriptions:[
        'Hoạt động được phép và thời hạn tùy tư cách lưu trú. Kiểm tra với Cục Quản lý xuất nhập cảnh.',
        'Giấy tờ và thủ tục địa chỉ tùy địa phương và hoàn cảnh. Hỏi chính quyền nơi bạn sống.',
        'Đọc chi phí, bảo lãnh và điều kiện khi trả nhà trước khi ký; hãy hỏi về phần chưa hiểu.',
        'Phương thức thanh toán và cách nói tại quầy tùy cửa hàng. Hãy luyện câu thông dụng.',
        'Quyền lợi bảo hiểm, chi phí và nơi khám phụ thuộc vào điều kiện và cơ sở y tế.',
        'Xác nhận lương, giờ làm và hoạt động được phép theo tư cách lưu trú một cách riêng biệt.',
        'Ngày thu gom và cách phân loại rác khác nhau theo địa phương; xem lịch ở nơi cư trú.',
        'Biết nơi sơ tán từ trước; khi có cảnh báo, xem thông tin mới nhất từ cơ quan chức năng.',
        'Sự kiện và thông báo của trường khác nhau theo trường; hỏi giáo viên khi cần.',
        'Phép lịch sự thay đổi theo hoàn cảnh và không tự động là nghĩa vụ pháp lý.'
      ],
      factWorries:['“Ngày đổ rác giống nhau trên khắp Nhật Bản”','“Mọi người thuê đều trả cùng mức phí ban đầu”','“Video của một người phản ánh trải nghiệm của tất cả người nước ngoài”','“Mọi phép lịch sự đều là luật”'],
      factTruths:['Sai. Quy định thu gom rác tùy địa phương.','Sai. Phí tùy căn nhà và hợp đồng.','Sai. Trải nghiệm tùy nơi, thời gian và hoàn cảnh.','Sai. Tập quán, nội quy, hợp đồng và luật là những điều khác nhau.'],
      factActions:['Tìm lịch thu gom rác của chính quyền địa phương.','Yêu cầu bảng kê chi phí và đọc hợp đồng trước khi ký.','Ghi lại câu hỏi; so sánh với hướng dẫn chính thức và trải nghiệm khác.','Hỏi đó là luật, điều khoản hợp đồng hay kỳ vọng xã hội.'],
      tasks:['Tìm website chính quyền địa phương nơi ở','Kiểm tra thủ tục về tư cách lưu trú','Biết số liên lạc khẩn cấp và nơi sơ tán','Kiểm tra bảo hiểm và cách khám bệnh','Đọc hợp đồng và chi phí thuê nhà','Tìm lịch thu gom rác ở địa phương','Kiểm tra giấy tờ để đi làm hoặc đi học','Luyện cách yêu cầu nói lại bằng tiếng Nhật']
    },
    ne:{
      topics:['अभिवादन','फेरि भन्न अनुरोध','किनमेल','यातायात','नगर कार्यालय','आवास','काम','अस्पताल','फोहोर','विपद् तयारी','विद्यालय','विनम्र अस्वीकार'],
      meanings:['तपाईंलाई भेटेर खुसी लाग्यो।','कृपया फेरि बिस्तारै भन्नुहोस्।','यो कति पर्छ?','तेस्रो प्लेटफर्म कहाँ छ?','मलाई आवश्यक कागजात बताइदिनुहोस्।','सुरुमा लाग्ने खर्चको विवरण बताइदिनुहोस्।','काम गर्ने समय पुष्टि गर्न सक्छु?','मलाई ज्वरो आएको छ।','फोहोर कुन दिन निकाल्ने हो?','शरण लिने ठाउँ कहाँ छ?','विद्यालयको सूचना बुझाइदिन सक्नुहुन्छ?','आज सक्दिनँ। अर्को पटक गरौँला।'],
      videoTopics:['घरभाडा सम्झौता','दैनिक किनमेल','खाना किनमेल र घर खोज्ने','घरको दैनिकी'],
      observe:['आवेदन, सर्ने प्रक्रिया र सुरुवाती शुल्क','पसलका सामान, मूल्य र विभाग','खाद्यान्न खर्च, बजेट र भाडाका सर्त','खाना पकाउने र घरको जीवनशैली'],
      context:['यो टोकियोमा एक व्यक्तिको अनुभव हो; शुल्क र सर्त घरअनुसार फरक हुन्छन्।','एक पसलको उदाहरण हो; मूल्य र उपलब्धता अन्यत्र फरक हुन सक्छ।','खर्च समय, स्थान र परिस्थितिअनुसार फरक हुन्छ।','निजी जीवनशैलीलाई सबै जापानी वा विदेशी बासिन्दाको प्रतिनिधित्व मान्न मिल्दैन।'],
      guideTitles:['बसोबास अनुमति','बसाइँसराइ र नगर कार्यालय','घर भाडामा लिँदा','किनमेल र भुक्तानी','स्वास्थ्य र बिमा','काम र रोजगार','फोहोर र छिमेक','भूकम्प र विपद्','विद्यालय र परिवार','शिष्टाचार र व्यक्तिगत छनोट'],
      guideKinds:['आधिकारिक नियम','स्थानीय प्रक्रिया','सम्झौताका सर्त','दैनिक अभ्यास','नियम र योग्यता','काम र बसोबास अनुमति','स्थानीय नियम','नयाँ आधिकारिक सूचना','विद्यालय/स्थानीय','चलन ≠ कानुन'],
      guideDescriptions:[
        'अनुमति प्राप्त गतिविधि र म्याद बसोबासको स्थितिअनुसार फरक हुन्छ। अध्यागमन निकायसँग जाँच्नुहोस्।',
        'ठेगाना सम्बन्धी प्रक्रिया र कागजात स्थानीय कार्यालय तथा तपाईंको अवस्थाअनुसार फरक हुन सक्छ।',
        'हस्ताक्षरअघि सुरुवाती खर्च, जमानत र घर छोड्ने सर्त पढ्नुहोस्; नबुझेको कुरा सोध्नुहोस्।',
        'भुक्तानीको तरिका पसलअनुसार फरक हुन्छ। चेकआउटमा बोल्ने वाक्य सिक्नुहोस्।',
        'स्वास्थ्य बिमा र उपचार खर्च योग्यताअनुसार फरक हुन्छ। सम्बन्धित कार्यालय वा अस्पतालमा बुझ्नुहोस्।',
        'तलब र समयका सर्त तथा काम गर्ने अनुमति अलग रूपमा जाँच्नुहोस्।',
        'फोहोर छुट्याउने नियम र संकलन दिन स्थानीय तहअनुसार फरक हुन्छ; पात्रो हेर्नुहोस्।',
        'पहिले नै शरण लिने ठाउँ थाहा पाउनुहोस्; चेतावनी आएमा आधिकारिक सूचना हेर्नुहोस्।',
        'विद्यालयका कार्यक्रम र सूचना फरक हुन्छन्; बुझ्न नसके शिक्षकलाई सोध्नुहोस्।',
        'शिष्टाचार व्यक्ति र परिस्थिति अनुसार फरक हुन्छ; सबै चलन कानुनी बाध्यता होइनन्।'
      ],
      factWorries:['“फोहोर उठाउने दिन जापानभर एउटै हो”','“सबैले घर भाडामा लिँदा उस्तै सुरुवाती शुल्क तिर्छन्”','“एक व्यक्तिको भिडियो सबै विदेशी बासिन्दामा लागू हुन्छ”','“हरेक शिष्टाचार कानुनले तोकेको हो”'],
      factTruths:['गलत। नियम नगरपालिका अनुसार फरक हुन्छ।','गलत। शुल्क घर र सम्झौताअनुसार फरक हुन्छ।','गलत। अनुभव स्थान, समय र व्यक्तिअनुसार फरक हुन्छ।','गलत। चलन, नियम, सम्झौता र कानुन फरक हुन्।'],
      factActions:['आफ्नो नगरपालिकाको फोहोर संकलन पात्रो खोज्नुहोस्।','हस्ताक्षरअघि खर्चको विवरण र सम्झौता जाँच्नुहोस्।','प्रश्न टिप्नुहोस्; आधिकारिक स्रोत र अन्य अनुभवसँग तुलना गर्नुहोस्।','त्यो कानुन, सम्झौता वा सामाजिक अपेक्षा हो भनेर सोध्नुहोस्।'],
      tasks:['आफ्नो नगरपालिकाको आधिकारिक वेबसाइट खोज्ने','बसोबास सम्बन्धी प्रक्रिया जाँच्ने','आपतकालीन सम्पर्क र शरणस्थल जान्ने','स्वास्थ्य बिमा र उपचार विधि बुझ्ने','घरभाडा सम्झौता र खर्च पढ्ने','स्थानीय फोहोर संकलन पात्रो खोज्ने','काम वा पढाइका कागजात जाँच्ने','जापानीमा फेरि भन्न अनुरोध गर्ने अभ्यास गर्ने']
    }
  };
  function hasLanguage(lang){return Object.prototype.hasOwnProperty.call(languages,lang);}
  function message(lang,key){return ui[lang]?.[key];}
  function field(lang,key,index){return content[lang]?.[key]?.[index];}
  return {languages,ui,content,hasLanguage,message,field};
})();