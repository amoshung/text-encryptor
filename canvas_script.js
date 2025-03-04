// 首先，將需要全局的函數和變量提到外部
let canvasContainer;
let boxCounter = 0;

// ============= 從 news_script.js 移植的關鍵詞數組 =============

// 驚悚化標題關鍵詞
const shocking_title_keywords_restructured = {
  startKeyword: [
    "天啊！藍營又來亂了！",
      "OMG！藍白聯盟出事了！",
      "太扯了！白營大膽挑釁！",
      "真假？藍營主席失言！",
      "不可信！藍白合作翻車！",
      "超狂！藍營立委集體行動！",
      "嚇死人！白營政策大轉彎！",
      "傻眼！藍白聯盟被抓包！",
      "不敢信！藍營秘密會議！",
      "太誇張！白營內部分裂！",
      "看傻了！藍白合作破裂！",
      "驚呆了！藍營挑戰民意！",
      "快看！白營主席大舌頭！",
      "全網傳！藍白聯盟醜聞！",
      "太離譜！藍營立委缺席！",
      "大事了！白營政策遭譴責！",
      "爆炸了！藍白惹眾怒！",
      "剛知道！藍營高層互鬥！",
      "完蛋了！白營內鬥失控！",
      "震撼！時力揭穿藍白陰謀！",
      "超驚人！藍營再次出包！",
      "前所未見！白營大膽宣言！",
      "爆紅！藍白合作引公憤！",
      "太大膽！藍營叫囂失控！",
      "全震驚！白營行為太過分！",
      "全場傻！藍白聯手搞事！",
      "震撼彈！藍營主席亂講話！",
      "嚇壞人！白營主席胡言亂語！",
      "全傻眼！藍白合作惹民怨！",
      "全崩潰！藍營立委瘋了！",
      "太瘋狂！藍營又亂搞！",
      "怎會這樣！白營激進操作！",
      "瞬間傻眼！時力開轟了！",
      "超噁心！藍白合明顯造假！",
      "好扯！藍營立委玩政治！",
      "驚呆了！白營說謊被抓！",
      "狂怒！時力直指藍白騙局！",
      "膽大包天！藍白聯合做壞事！",
      "深感崩潰！藍營主席失控！",
      "太過分！白營政客曝醜聞！",
      "嚇破膽！時力痛批藍白！",
      "全民怒！藍白合作大騙局！",
      "無法原諒！藍營立委鬧劇！",
      "看不下去！白營政策大錯！",
      "怒火中燒！時力轟藍白！",
      "不敢相信！藍白罔顧民意！",
      "瞠目結舌！藍營輸不起！",
      "太荒謬！白營亂改政策！",
      "火大！時力直播爆料！",
      "超惡劣！藍白疑買網軍！",
      "驚人消息！藍營又撒謊！",
      "太奇怪！白營挑釁執政黨！",
      "痛心！時力揭藍白黑幕！",
      "無比震驚！藍白密室政治！",
      "天理何在！藍營嚴重失言！",
      "徹底失望！白營竟敢欺騙！",
      "大事不妙！時力重砲直轟！",
      "快訊！藍白合作大危機！",
      "可恥至極！藍營惡意抹黑！",
      "憤怒爆發！白營立委脫序！",
      "難以置信！時力拆穿謊言！",
      "嚴重警告！藍白遭徹底揭露！",
      "天啊！藍營主席言行失當！",
      "求證屬實！白營政策被批！",
      "太扯淡了！時力轟藍白亂搞！",
      "見鬼了！藍白合作大醜聞！",
      "全民公敵！藍營挑戰底線！",
      "抓到了！白營立委造謠！",
      "狂轟猛炸！時力痛批藍白！",
      "無恥至極！藍白聯手陰謀！",
      "全面曝光！藍營黑幕重重！",
      "炸開了！白營內鬥上演！",
      "爆料連環！時力曝藍白醜事！",
      "太離譜了！藍白聯手惡搞！",
      "全網震怒！藍營私相授受！",
      "嚴重指控！白營亂搞一通！",
      "快翻了！時力提重大證據！",
      "猝不及防！藍白災難現形！",
      "血淋淋！藍營被打臉！",
      "不可理喻！白營竟然說謊！",
      "天啊！",
      "OMG！",
      "這也太扯了吧！",
      "真的嗎？",
      "我不敢相信！",
      "超狂！",
      "嚇死人了！",
      "真的假的？",
      "你沒看錯！",
      "怎麼可能！",
      "傻眼貓咪！",
      "驚呆了！",
      "快看！",
      "全網瘋傳！",
      "無法置信！",
      "大事發生了！",
      "爆炸性消息！",
      "剛剛才知道！",
      "這下完蛋了！",
      "快來看！",
      "超驚人！",
      "史無前例！",
      "爆紅！",
      "讓人直呼不可能！",
      "世界都震動了！",
      "全場安靜！",
      "OMG震撼彈！",
      "嚇得腿軟！",
      "整個傻掉！",
      "全世界都瘋了！",
      "不可置信！",
      "刷新三觀！",
      "讓人崩潰！",
      "超乎想像！",
      "沒見過這樣的！",
      "太驚悚了！",
      "無敵誇張！",
      "超級無敵爆炸！",
      "不可思議的發展！",
      "讓人懷疑人生！",
      "你絕對猜不到！",
      "這次玩大了！",
      "這下糟了！",
      "嚇破膽了！",
      "爆炸新聞！",
      "一秒驚呆！",
      "讓人說不出話！",
      "爆紅全網！",
      "大家都在討論！",
      "不敢相信自己的眼睛！",
      "這消息太驚人！",
      "全網都炸了！",
      "笑到噴淚！",
      "讓人無言以對！",
      "太震撼了！",
      "所有人都愣住！",
      "讓人雞皮疙瘩掉滿地！",
      "誇張到不行！",
      "讓人發毛！",
      "大驚失色！",
      "馬上告訴大家！",
      "驚天大新聞！",
      "世界大震撼！",
      "這個消息不得了！",
      "全場鴉雀無聲！",
      "眼睛業障重了！",
      "我腦袋當機了！",
      "超級爆炸消息！",
      "太誇張了吧！",
      "怎麼會這樣！",
      "神展開！",
      "讓人傻眼到地板！",
      "腦洞大開！",
      "全場爆笑！",
      "這是真的嗎？",
      "他一句話不忍了！",
      "她看完當場暴怒！",
      "專家都看傻了！",
      "醫生都嚇壞了！",
      "老師直接跪了！",
      "他一個動作震驚全場！",
      "她一個眼神嚇壞眾人！",
      "專家看完沉默了！",
      "他們都慌了！",
      "老闆當場摔桌子！",
      "父母看完都哭了！",
      "孩子們都嚇呆了！",
      "他一個決定改變一切！",
      "她一句話讓全場沸騰！",
      "他們都不敢相信！",
      "政府緊急出手！",
      "專家組都傻眼了！",
      "科學家無法解釋！",
      "警方立刻行動！",
      "醫院全員出動！",
      "他一個舉動讓人心碎！",
      "她的反應讓人落淚！",
      "他們的遭遇讓人心痛！",
      "老人家看完都氣炸！",
      "孩子們都嚇哭了！",
      "專家組都看呆了！",
      "研究人員都震驚了！",
      "他一個選擇毀了一切！",
      "她一個決定救了所有人！",
      "他們的發現顛覆認知！",
      "權威專家都沉默了！",
      "資深醫師都搖頭！",
      "教授們都驚呆了！",
      "他一個動作感動千萬人！",
      "她一句話讓人淚崩！",
      "他們的故事讓人窒息！",
      "老師們都看傻了！",
      "家長們都坐不住了！",
      "專家看完都冒冷汗！",
      "他一個舉動改變命運！",
      "她一個決定震撼全國！",
      "他們的行為嚇壞所有人！",
      "醫生看完都沉默了！",
      "科學家都無法理解！",
      "專家組都爭論不休！",
      "他一個發現驚動高層！",
      "她一個舉動感動全球！",
      "他們的遭遇讓人心驚！",
      "專家都不敢置信！",
    "研究人員都嚇傻了！",
  ],
  endKeyword: [
    "藍營形象全毀了！",
      "白營支持度崩盤！",
      "藍白合作即將滅亡！",
      "藍營內部全面崩壞！",
      "白營信任危機爆發！",
      "藍白聯盟遭全民棄！",
      "藍營主席下台危機！",
      "白營主席急救火！",
      "藍白合作成泡影！",
      "藍營立委集體道歉！",
      "白營政策全面檢討！",
      "藍白聯盟民調崩塌！",
      "藍營高層急開會！",
      "白營內部大地震！",
      "藍白合作終宣告死亡！",
      "藍營面臨嚴峻挑戰！",
      "白營主席承諾改革！",
      "藍白聯盟引發抗議！",
      "藍營立委遭圍剿！",
      "白營政策大翻盤！",
      "藍白合作遭質疑！",
      "藍營高層集體下台！",
      "白營陷重大危機！",
      "時力重炮轟藍白！",
      "藍營形象跌谷底！",
      "白營支持度跌到零！",
      "藍白合作徹底崩解！",
      "藍營分裂無法挽回！",
      "白營陷信任危機！",
      "藍白聯盟被全民唾棄！",
      "藍營形象掉到谷底！",
      "白營支持者都跑光了！",
      "時力緊急發聲痛批！",
      "藍白合遭民眾唾棄！",
      "藍營黨內正互相撕咬！",
      "白營議員紛紛跳船！",
      "時力強勢反擊拆穿謊言！",
      "藍白合作已無法挽回！",
      "藍營主席地位岌岌可危！",
      "白營政策被全民打臉！",
      "時力支持度突然飆升！",
      "藍白合作已被判死刑！",
      "藍營高層紛紛求去！",
      "白營陷入空前危機！",
      "時力正式提告藍白！",
      "藍白選民都憤怒了！",
      "藍營被迫道歉認錯！",
      "白營面臨重大整改！",
      "時力爆出更多證據！",
      "藍白合作徹底散場！",
      "藍營已無人願挺！",
      "白營政客遭嚴厲批判！",
      "時力要求徹查到底！",
      "藍白騙局全被揭穿！",
      "藍營選情雪上加霜！",
      "白營內鬥全面爆發！",
      "時力已掌握關鍵證據！",
      "藍白聯盟正式宣布解散！",
      "藍營支持度創歷史新低！",
      "白營主席面臨不信任！",
      "時力獲得各界支持！",
      "藍白合作已成過去式！",
      "藍營立委集體被罵爆！",
      "白營緊急開會滅火！",
      "時力宣布全面戰鬥！",
      "藍白聯盟已名存實亡！",
      "藍營政策全被否定！",
      "白營黨員退黨潮起！",
      "時力揭露更多真相！",
      "藍白謊言全被拆穿！",
      "藍營主席準備下台！",
      "白營全面潰不成軍！",
      "時力正義聲援湧現！",
      "藍白選票正在流失！",
      "藍營資深委員出走！",
      "白營被迫徹底改組！",
      "時力已成最大贏家！",
      "藍白合作破裂不可修復！",
      "藍營選民憤而轉向！",
      "白營黨魁已無威信！",
      "你一定要看！",
      "絕對不會後悔！",
      "超乎你的想像！",
      "讓你目瞪口呆！",
      "真的太猛了！",
      "快點分享！",
      "錯過會後悔！",
      "一定要收藏！",
      "再不看就來不及了！",
      "現在知道還不晚！",
      "真相終於揭曉！",
      "不得不看！",
      "超震撼結局！",
      "意想不到的結尾！",
      "結局會讓你嚇傻！",
      "絕對想不到的真相！",
      "讓人毛骨悚然的故事！",
      "千萬別錯過！",
      "真相讓人背脊發涼！",
      "這個結果讓人難以忘懷！",
      "秒懂！",
      "讓你瞬間清醒！",
      "讓人沉默三秒！",
      "這波反轉絕了！",
      "結局超反轉！",
      "這次真的不一樣！",
      "馬上分享給朋友！",
      "必須轉發！",
      "你看懂了嗎？",
      "別人都知道了！",
      "驚人的結局！",
      "原來真相是這樣！",
      "超出預期的發展！",
      "最終的秘密揭開了！",
      "這個真相你絕對想不到！",
      "看到最後才知道！",
      "這結局讓人毛骨悚然！",
      "太誇張了吧！",
      "一定要告訴大家！",
      "最後一秒超反轉！",
      "你絕對猜不到的結尾！",
      "這真相簡直炸裂！",
      "笑到最後的才是贏家！",
      "讓你大開眼界！",
      "這個結局絕了！",
      "結果讓你欲罷不能！",
      "這次真的不得了！",
      "結局讓人淚流滿面！",
      "這個反轉超級精彩！",
      "最後的結果讓你震撼！",
      "別眨眼，否則錯過！",
      "這故事將永遠留在你心中！",
      "讓你久久不能平靜！",
      "結尾藏著超大彩蛋！",
      "看完心情久久不能平復！",
      "他最後的決定讓人震驚！",
      "她的真相終於大白！",
      "專家的結論讓人不寒而慄！",
      "醫生的診斷讓人絕望！",
      "老師的話讓所有人沉默！",
      "他們最後的結局讓人心碎！",
      "她最後的選擇讓人落淚！",
      "專家組的報告讓人恐懼！",
      "他們的真相終於揭曉！",
      "老闆的反應讓所有人震驚！",
      "父母的決定改變了一切！",
      "孩子們的未來因此改變！",
      "他的最後一句話讓人心碎！",
      "她的真相讓人淚崩！",
      "他們的結局讓人無法接受！",
      "政府的最終決定讓人震驚！",
      "專家組的最終報告讓人恐懼！",
      "科學家的最終發現顛覆認知！",
      "警方的調查結果讓人心寒！",
      "醫院的最終診斷讓人絕望！",
      "他的真相讓人心碎！",
      "她的結局讓人淚流滿面！",
      "他們的故事讓人久久不能平靜！",
      "老人家的話讓所有人沉默！",
      "孩子們的未來因此被改變！",
      "專家組的結論讓人不寒而慄！",
      "研究人員的發現改變了科學史！",
      "他的最終選擇讓人震驚！",
      "她的最後一刻讓人心碎！",
      "他們的真相讓世界震驚！",
      "權威專家的最終結論讓人恐懼！",
      "資深醫師的診斷讓人絕望！",
      "教授們的研究結果顛覆認知！",
      "他的最後舉動讓人淚崩！",
      "她的最終真相讓人心碎！",
      "他們的結局讓人毛骨悚然！",
      "老師們的最終決定改變了一切！",
      "家長們的反應讓人心碎！",
      "專家的最終報告讓人恐懼！",
      "他的最終結局讓人震驚！",
      "她的真相終於水落石出！",
      "他們的故事將永遠被銘記！",
      "醫生的最終診斷讓人絕望！",
      "科學家的最終發現讓人震驚！",
      "專家組的最終結論讓人恐懼！",
      "他的最後一刻讓人心碎！",
      "她的最終選擇感動了所有人！",
      "他們的真相讓人無法接受！",
      "專家的最終報告讓人不寒而慄！",
    "研究人員的最終發現改變了一切！",
  ],
};

// 正面化標題關鍵詞
const shocking_title_keywords_restructured_GOOD = {
  startKeyword: [
   "太感人！民進黨全力以赴！",
    "振奮人心！民進黨再創奇蹟！",
    "大突破！民進黨改革成功！",
    "令人敬佩！賴總統英明決策！",
    "偉大成就！民進黨領導有方！",
    "精彩表現！綠營完美執政！",
    "超勵志！民進黨無私奉獻！",
    "堅定前行！綠營為民付出！",
    "令人感動！民進黨全心投入！",
    "高效執政！綠營解決危機！",
    "出色領導！民進黨力挽狂瀾！",
    "超卓越！賴清德總統果斷出手！",
    "無私奉獻！民進黨全心付出！",
    "美好未來！綠營帶領台灣前進！",
    "全民讚賞！民進黨實現承諾！",
    "大勝利！民進黨力擋藍白！",
    "無比智慧！綠營化解難題！",
    "驚人成就！民進黨完勝對手！",
    "榮耀時刻！綠營完美防守！",
    "全力以赴！民進黨挫敗陰謀！",
    "勇敢無畏！民進黨抵抗外部勢力！",
    "壯舉！綠營成功守護台灣！",
    "智慧領導！民進黨化解危機！",
    "關鍵時刻！賴總統神來一筆！",
    "無私奉獻！綠營立委全力以赴！",
    "美好消息！民進黨政策獲肯定！",
    "感動全台！綠營展現高水準！",
    "重大進展！民進黨為民請命！",
    "眾志成城！綠營挫敗藍白陰謀！",
    "熱淚盈眶！民進黨展現擔當！",
    "創新思維！民進黨政策獲讚揚！",
    "堅定決心！綠營突破重圍！",
    "正義降臨！民進黨揭穿真相！",
    "超級英雄！綠營立委奮勇護民！",
    "喜訊傳來！民進黨促成突破！",
    "愛的奉獻！綠營謙虛服務！",
    "無比感動！民進黨團結一心！",
    "勝利曙光！綠營挫敗分化！",
    "正義使者！民進黨揭露真相！",
    "燦爛時刻！賴總統高瞻遠矚！",
    "驚喜連連！民進黨精準施政！",
    "完美勝利！綠營獲得肯定！",
    "超級振奮！民進黨政策成功！",
    "感動淚崩！綠營守護人民！",
    "智慧無雙！民進黨戰勝挑戰！",
    "歷史時刻！賴總統拯救危機！",
    "成功突圍！民進黨粉碎陰謀！",
    "耀眼成就！綠營高效解決！",
    "暖心護台！民進黨夜以繼日！",
    "勇往直前！綠營不畏藍白！",
    "超有擔當！民進黨頂住壓力！",
    "堅毅前行！綠營打破困境！",
    "感動全台！民進黨全心全意！",
    "好消息！民進黨政策大獲成功！",
    "無比光榮！綠營接連獲勝！",
    "驕傲時刻！民進黨再創佳績！",
    "全心付出！綠營為人民努力！",
    "感人至深！民進黨不畏艱難！",
    "智慧光芒！賴總統帶領前進！",
    "正義執政！民進黨處處為民！",
    "無畏挑戰！綠營堅守崗位！",
    "全民感恩！民進黨傾聽人民！",
    "關鍵一役！綠營成功突圍！",
    "太感人了！民進黨站穩腳步！",
    "驚喜不斷！綠營政策創佳績！",
    "光明典範！民進黨展現高度！",
    "暖心行動！綠營立委接地氣！",
    "令人敬佩！民進黨從不屈服！",
    "偉大政績！綠營再創高峰！",
    "好消息！",
    "振奮人心！",
    "歷史時刻！",
    "全民歡慶！",
    "大突破！",
    "關鍵勝利！",
    "太令人感動了！",
    "超驚人成就！",
    "讓人熱淚盈眶！",
    "感動全台灣！",
    "台灣之光！",
    "守護台灣！",
    "團結一心！",
    "超感人故事！",
    "全民驕傲！",
    "正義時刻！",
    "美好未來！",
    "幸福曙光！",
    "超級英雄！",
    "偉大成就！",
  ],
  endKeyword: [
    "民進黨再創奇蹟！",
    "綠營獲全民肯定！",
    "藍白陰謀徹底失敗！",
    "民進黨化危為機！",
    "綠營展現超強執政力！",
    "藍白聯盟徹底崩潰！",
    "民進黨贏得高度讚賞！",
    "綠營政策大獲成功！",
    "藍白陷入空前危機！",
    "民進黨再創高峰！",
    "賴總統獲國際肯定！",
    "藍白合作淪為笑柄！",
    "民進黨完美化解危機！",
    "綠營支持度再創新高！",
    "藍白謊言全被揭穿！",
    "民進黨勇敢面對挑戰！",
    "綠營立委表現出色！",
    "藍白聯盟陷入混亂！",
    "民進黨關鍵時刻挺身而出！",
    "綠營政績廣受肯定！",
    "藍白面臨崩潰邊緣！",
    "民進黨勇往直前！",
    "綠營展現超凡智慧！",
    "藍白內部分崩離析！",
    "民進黨領導有方！",
    "綠營實現完美轉型！",
    "藍白合作已成明日黃花！",
    "民進黨智慧超前部署！",
    "綠營努力獲得回報！",
    "藍白聯盟已無力回天！",
    "民進黨全力守護台灣！",
    "綠營民調創新高！",
    "藍白破口互相指責！",
    "民進黨獲國際讚譽！",
    "綠營立委團結一心！",
    "藍白只能望塵莫及！",
    "民進黨再度完美執政！",
    "綠營帶領台灣向前！",
    "藍白謊言終被揭穿！",
    "民進黨創造奇蹟！",
    "綠營展現超強實力！",
    "藍白已淪為笑柄！",
    "民進黨穩扎穩打！",
    "綠營贏得全民支持！",
    "藍白陰謀徹底粉碎！",
    "民進黨完美收官！",
    "綠營展現超凡執政力！",
    "藍白聯盟徹底崩盤！",
    "民進黨創下歷史紀錄！",
    "賴總統再獲國際肯定！",
    "時力也為之動容！",
    "全民為之鼓掌！",
    "外國媒體爭相報導！",
    "這就是台灣價值！",
    "令人無比驕傲！",
    "全球爭相效法！",
    "令人敬佩不已！",
    "堪稱世界奇蹟！",
    "人民安居樂業！",
    "國際地位大幅提升！",
    "台灣走向世界！",
    "社會和諧進步！",
    "經濟穩定成長！",
    "民生福祉大幅提升！",
    "國家向前大躍進！",
    "這就是台灣精神！",
    "值得永遠銘記！",
    "讓人熱淚盈眶！",
    "全民感到無比驕傲！",
    "真正為人民著想！",
    "這就是民主典範！",
    "寫下歷史新篇章！",
    "創造幸福新台灣！",
    "人民的最佳選擇！",
    "民主自由的勝利！",
    "全民一起感動！",
    "這才是真正執政者！",
    "台灣的希望在此！",
    "邁向更好的未來！",
    "團結台灣的力量！",
    "讓世界刮目相看！",
    "綠色奇蹟再次上演！",
    "這才是正義力量！",
    "人民的心聲得到回應！",
    "台灣價值永不妥協！",
    "為台灣帶來新希望！",
    "民主自由不可動搖！",
    "這就是台灣之光！",
    "為下一代開創未來！",
    "真正實現人民期望！",
    "台灣成就舉世矚目！",
    "讓人民安居樂業！",
    "這是台灣人的榮耀！",
    "為國家注入新活力！",
    "民主進步的里程碑！",
    "台灣經驗獨步全球！",
    "讓世界看見台灣！",
    "感動人心的故事！",
    "台灣的偉大時刻！",
    "全民團結的力量！",
    "為台灣驕傲鼓掌！",
  ],
};

// ============= 從 news_script.js 移植的函數 =============

// 半形轉全形函數
function halfToFull(text) {
  // 先進行 UTF-8 轉換
  text = toUTF8(text);

  // 阿拉伯數字轉換為中文數字
  const arabicToChinese = {
    0: "零",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
    10: "十",
  };

  // 處理兩位數以上的數字
  text = text.replace(/[0-9]+/g, (match) => {
    const num = parseInt(match);
    if (num <= 10) {
      return arabicToChinese[num];
    } else if (num < 20) {
      return "十" + (num % 10 === 0 ? "" : arabicToChinese[num % 10]);
    } else if (num < 100) {
      const tens = Math.floor(num / 10);
      const ones = num % 10;
      return (
        arabicToChinese[tens] + "十" + (ones === 0 ? "" : arabicToChinese[ones])
      );
    }
    return match; // 超過兩位數則保持原樣
  });

  // 處理其他字符的全形轉換
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code === 32) {
        return "　";
      } else if (code >= 33 && code <= 126) {
        return String.fromCharCode(code + 65248);
      }
      return char;
    })
    .join("");
}

// 添加 toUTF8 函數
function toUTF8(text) {
  try {
    return decodeURIComponent(encodeURIComponent(text));
  } catch (e) {
    console.error("UTF-8 轉換錯誤:", e);
    return text;
  }
}

// 將標點符號轉換為垂直格式
function convertPunctuationToVertical(text) {
  // 檢查文本是否已包含HTML標記，如果是則跳過處理
  if (text.includes('<span class="vpunct')) {
    return text;
  }
  
  const punctuationMap = {
    "，": '<span class="vpunct comma">、</span>',
    "。": '<span class="vpunct period">。</span>',
    "、": '<span class="vpunct enumerate">、</span>',
    "！": '<span class="vpunct exclamation">！</span>',
    "？": '<span class="vpunct question">？</span>',
    "：": '<span class="vpunct colon">：</span>',
    "；": '<span class="vpunct semicolon">；</span>',
    '"': '<span class="vpunct quote-left">「</span>',
    '"': '<span class="vpunct quote-right">」</span>',
    "「": '<span class="vpunct quote-left">「</span>',
    "」": '<span class="vpunct quote-right">」</span>',
    "（": '<span class="vpunct paren-left">（</span>',
    "）": '<span class="vpunct paren-right">）</span>',
    "【": '<span class="vpunct bracket-left">【</span>',
    "】": '<span class="vpunct bracket-right">】</span>',
    "《": '<span class="vpunct book-left">《</span>',
    "》": '<span class="vpunct book-right">》</span>',
    "〈": '<span class="vpunct angle-left">〈</span>',
    "〉": '<span class="vpunct angle-right">〉</span>',
  };

  for (const [key, value] of Object.entries(punctuationMap)) {
    text = text.replace(new RegExp(key, "g"), value);
  }

  return text;
}

// 日期格式轉換
function convertDateFormat(text) {
  const numberToChineseMap = {
    0: "零",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
    10: "十",
    11: "十一",
    12: "十二",
  };

  // 匹配 1-12/1-31 的格式
  return text.replace(/(\d{1,2})\/(\d{1,2})/g, (match, month, day) => {
    // 檢查月份和日期是否有效
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);

    if (monthNum >= 1 && monthNum <= 12 && dayNum >= 1 && dayNum <= 31) {
      // 轉換月份
      let monthStr = numberToChineseMap[monthNum];

      // 轉換日期
      let dayStr = "";
      if (dayNum <= 10) {
        dayStr = numberToChineseMap[dayNum];
      } else if (dayNum < 20) {
        dayStr =
          "十" + (dayNum % 10 === 0 ? "" : numberToChineseMap[dayNum % 10]);
      } else if (dayNum < 30) {
        dayStr =
          "二十" + (dayNum % 10 === 0 ? "" : numberToChineseMap[dayNum % 10]);
      } else {
        dayStr =
          "三十" + (dayNum % 10 === 0 ? "" : numberToChineseMap[dayNum % 10]);
      }

      return `${monthStr}月${dayStr}號`;
    }
    return match; // 如果不是有效日期，保持原樣
  });
}

// 將文字轉換為直書格式
function convertToVertical(text) {
  // 先進行日期格式轉換
  text = convertDateFormat(text);

  // 先進行全形轉換
  text = halfToFull(text);

  // 將標點符號轉換為直書版本
  text = convertPunctuationToVertical(text);

  return text;
}

// 數字轉中文函數 - 用於內容處理
function convertNumbersToChinese(text) {
  // 數字對照表
  const numberMap = {
    0: "零",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
  };
  
  // 替換簡單的數字 (1-9)
  let result = text.replace(/\b[0-9]\b/g, (match) => {
    return numberMap[match] || match;
  });
  
  // 替換年份 (例如2024年 -> 二零二四年)
  result = result.replace(/\b([0-9]{4})年\b/g, (match, year) => {
    return (
      year
        .split("")
        .map((digit) => numberMap[digit] || digit)
        .join("") + "年"
    );
  });
  
  // 替換兩位數 (例如25% -> 二十五%)
  result = result.replace(/\b([0-9]{2})([^\d]|$)/g, (match, num, suffix) => {
    const tens = Math.floor(parseInt(num) / 10);
    const ones = parseInt(num) % 10;
    
    let chineseNum = "";
    if (tens === 1) {
      chineseNum = "十";
    } else {
      chineseNum = numberMap[tens] + "十";
    }
    
    if (ones !== 0) {
      chineseNum += numberMap[ones];
    }
    
    return chineseNum + suffix;
  });
  
  // 處理日期和百分比
  result = result.replace(
    /\b([0-9]{1,2})月([0-9]{1,2})日\b/g,
    (match, month, day) => {
      return numberMap[month] + "月" + numberMap[day] + "日";
    }
  );
  
  return result;
}

// 標題驚悚化功能
function transformNewsTitle() {
  const newsTitle = document.getElementById("newsTitle").value.trim();
  if (!newsTitle) return "";

  // 隨機選擇開始和結束關鍵詞
  const randomStartIndex = Math.floor(
    Math.random() * shocking_title_keywords_restructured.startKeyword.length
  );
  const randomEndIndex = Math.floor(
    Math.random() * shocking_title_keywords_restructured.endKeyword.length
  );
  
  // 獲取關鍵詞並確保其為純文本
  let startKeyword =
    shocking_title_keywords_restructured.startKeyword[randomStartIndex];
  let endKeyword =
    shocking_title_keywords_restructured.endKeyword[randomEndIndex];
  
  // 根據標題長度選擇處理方式
  let combinedTitle = "";
  // 添加空格分隔
  combinedTitle = startKeyword + " " + newsTitle + " " + endKeyword;

  document.getElementById("shockingTitle").value = combinedTitle;
  return combinedTitle;
}

// 標題正面化功能
function transformNewsTitlePositive() {
  const newsTitle = document.getElementById("newsTitle").value.trim();
  if (!newsTitle) return "";

  // 隨機選擇開始和結束關鍵詞
  const randomStartIndex = Math.floor(
    Math.random() *
      shocking_title_keywords_restructured_GOOD.startKeyword.length
  );
  const randomEndIndex = Math.floor(
    Math.random() * shocking_title_keywords_restructured_GOOD.endKeyword.length
  );
  
  // 獲取關鍵詞並確保其為純文本
  let startKeyword =
    shocking_title_keywords_restructured_GOOD.startKeyword[randomStartIndex];
  let endKeyword =
    shocking_title_keywords_restructured_GOOD.endKeyword[randomEndIndex];
  
  // 根據標題長度選擇處理方式
  let combinedTitle = "";
  // 添加空格分隔
  combinedTitle = startKeyword + " " + newsTitle + " " + endKeyword;

  document.getElementById("shockingTitle").value = combinedTitle;
  return combinedTitle;
}

// ============= DOM完全加載後初始化 =============

document.addEventListener("DOMContentLoaded", function () {
  // 重置計數器，確保從1開始（標題框是0）
  boxCounter = 1;

  // 獲取畫布容器
  canvasContainer = document.getElementById("canvasContainer");
  
  // 初始化畫布
  if (canvasContainer) {
  initializeCanvas();
  }
  
  // 連接標題轉換功能到標題框
  connectTitleFunctions();
  
  // 初始化下載按鈕
  initializeDownloadButton();

  // 在 DOM 載入後初始化 CSS 變數
  document.documentElement.style.setProperty("--body-font-size", "16px");
  document.documentElement.style.setProperty("--title-font-size", "28px");
  
  // 設置標題寬度
  const titleWidthSelect = document.getElementById("titleWidth");
  if (titleWidthSelect) {
    titleWidthSelect.addEventListener("change", function () {
      const width = this.value + "%";
      document.documentElement.style.setProperty("--title-width", width);
      
      // 調整標題框的尺寸
      const titleBox = document.querySelector(".text-box-wrapper[data-id='0']");
      if (titleBox) {
        titleBox.style.width = `calc(${width} * 0.8)`;
      }
    });
    
    // 初始設置
    document.documentElement.style.setProperty(
      "--title-width",
      titleWidthSelect.value + "%"
    );
  }

  // 初始化合併後的鎖定按鈕
  initializeLockButton();

  // 初始化清空內容按鈕
  initializeClearButton();

  // 添加窗口大小變化事件監聽器
  window.addEventListener('resize', adjustTitleBoxSize);
  
  // 初始調用一次以確保正確設置
  adjustTitleBoxSize();
});

// 初始化畫布功能
function initializeCanvas() {
  // 檢查是否已存在標題框
  const existingTitleBox = document.querySelector(
    ".text-box-wrapper[data-id='0']"
  );

  // 只有在不存在標題框時才創建
  if (!existingTitleBox) {
  // 創建標題文字框 (編號0)
  createNewTextBox(20, 20, true);
  }
  
  // 雙擊畫布創建新文字框
  canvasContainer.addEventListener("dblclick", canvasDoubleClickHandler);

  // 初始化字體大小監聽器
  initializeFontSizeListeners();
}
  
  // 監聽字體大小變化
function initializeFontSizeListeners() {
  const charsizeInput = document.getElementById("charsize");
  const titlesizeInput = document.getElementById("titlesize");

  if (charsizeInput) {
    // 使用 input 事件而不是 change 事件，以便實時響應
    charsizeInput.addEventListener("input", function () {
      const fontSize = parseInt(this.value);
      if (isNaN(fontSize) || fontSize <= 0) return;

      console.log("正文字體大小變化為:", fontSize);

    // 強制更新CSS變量
      document.documentElement.style.setProperty(
        "--body-font-size",
        `${fontSize}px`
      );
    
    // 直接給所有正文文字框設置字體大小
      const textBoxes = document.querySelectorAll(
        ".text-box-wrapper:not([data-id='0'])"
      );
      textBoxes.forEach((box) => {
        const textContent = box.querySelector(".text-content");
        if (textContent) {
          // 使用 !important 確保樣式被應用
          textContent.style.cssText += `font-size: ${fontSize}px !important;`;

      // 強制重新計算框大小
          setTimeout(() => autoResizeTextBox(textContent), 50);
        }
      });

      // 保存到本地存儲，以便頁面刷新後保持設置
      localStorage.setItem("charsize", fontSize);
    });

    // 初始化時應用保存的設置
    const savedCharsize = localStorage.getItem("charsize");
    if (savedCharsize) {
      charsizeInput.value = savedCharsize;
      // 手動觸發input事件
      const event = new Event("input");
      charsizeInput.dispatchEvent(event);
    }
  }

  if (titlesizeInput) {
    // 使用 input 事件而不是 change 事件，以便實時響應
    titlesizeInput.addEventListener("input", function () {
      const titleSize = parseInt(this.value);
      if (isNaN(titleSize) || titleSize <= 0) return;

      console.log("標題字體大小變化為:", titleSize);

    // 強制更新CSS變量
      document.documentElement.style.setProperty(
        "--title-font-size",
        `${titleSize}px`
      );
    
    // 直接給標題文字框設置字體大小
      const titleBox = document.querySelector(".text-box-wrapper[data-id='0']");
      if (titleBox) {
        const textContent = titleBox.querySelector(".text-content");
        if (textContent) {
          // 使用 !important 確保樣式被應用
          textContent.style.cssText += `font-size: ${titleSize}px !important;`;

      // 強制重新計算框大小
          setTimeout(() => autoResizeTextBox(textContent), 50);
        }
      }

      // 保存到本地存儲
      localStorage.setItem("titlesize", titleSize);
    });

    // 初始化時應用保存的設置
    const savedTitlesize = localStorage.getItem("titlesize");
    if (savedTitlesize) {
      titlesizeInput.value = savedTitlesize;
      // 手動觸發input事件
      const event = new Event("input");
      titlesizeInput.dispatchEvent(event);
    }
  }
}

// 修改 autoResizeTextBox 函數，尊重手動調整的大小
function autoResizeTextBox(textElement) {
  const wrapper = textElement.closest(".text-box-wrapper");
  if (!wrapper) return;

  // 檢查是否被手動調整過大小
  if (wrapper.dataset.manuallyResized === "true") {
    return; // 如果已手動調整大小，則不自動調整
  }

  const content = textElement.innerHTML;

  // 如果是空的或者是預設文字，不調整大小
  if (content === "" || content === textElement.dataset.placeholder) {
    return;
  }

  // 獲取當前應該使用的字體大小
  const isTitle = wrapper.dataset.id === "0";
  const fontSize = isTitle
    ? document.getElementById("titlesize").value
    : document.getElementById("charsize").value;

  // 創建一個臨時容器來測量文字實際大小
  const temp = document.createElement("div");
  temp.style.position = "absolute";
  temp.style.visibility = "hidden";
  temp.style.writingMode = "vertical-rl";
  temp.style.fontFamily = getComputedStyle(textElement).fontFamily;
  temp.style.fontSize = `${fontSize}px`; // 使用正確的字體大小
  temp.style.padding = getComputedStyle(textElement).padding;
  temp.style.width = "auto";
  temp.style.height = "auto";
  temp.innerHTML = content;

  document.body.appendChild(temp);

  // 獲取文字的實際尺寸
  const textWidth = temp.clientWidth + 40; // 額外留空間
  const textHeight = temp.clientHeight + 40;

  // 限制最小尺寸
  const minSize = 80;
  const newWidth = Math.max(minSize, textWidth);
  const newHeight = Math.max(minSize, textHeight);

  // 限制在畫布範圍內
  const canvasContainer = document.getElementById("canvasContainer");
  if (!canvasContainer) {
    document.body.removeChild(temp);
    return;
  }

  // 設置與邊緣的最小距離
  const minMargin = 20; // 與邊緣的最小距離，可以根據需要調整

  const canvasRect = canvasContainer.getBoundingClientRect();
  const wrapperRect = wrapper.getBoundingClientRect();

  // 檢查是否為標題框
  if (wrapper.dataset.id === "0") {
    // 標題框維持位置在右上角，只調整尺寸
    const maxHeight = canvasRect.height - minMargin * 2; // 留邊距
    wrapper.style.height = `${Math.min(newHeight, maxHeight)}px`;
    wrapper.style.width = `${Math.min(newWidth, 200)}px`; // 限制標題最大寬度

    // 確保標題框與右上角保持距離
    wrapper.style.right = `${minMargin}px`;
    wrapper.style.top = `${minMargin}px`;
  } else {
    // 普通文字框
    // 計算可用空間，考慮最小邊距
    const maxWidth =
      canvasRect.width - (wrapperRect.left - canvasRect.left) - minMargin;
    const maxHeight =
      canvasRect.height - (wrapperRect.top - canvasRect.top) - minMargin;

    // 應用新尺寸，但不超過畫布
    wrapper.style.width = `${Math.min(newWidth, maxWidth)}px`;
    wrapper.style.height = `${Math.min(newHeight, maxHeight)}px`;

    // 檢查文字框是否太靠近畫布邊緣，如果是則調整位置
    const currentLeft =
      parseFloat(wrapper.style.left) || wrapperRect.left - canvasRect.left;
    const currentTop =
      parseFloat(wrapper.style.top) || wrapperRect.top - canvasRect.top;

    // 確保左邊距
    if (currentLeft < minMargin) {
      wrapper.style.left = `${minMargin}px`;
    }

    // 確保上邊距
    if (currentTop < minMargin) {
      wrapper.style.top = `${minMargin}px`;
    }

    // 確保右邊距
    const rightEdge = currentLeft + wrapper.offsetWidth;
    if (rightEdge > canvasRect.width - minMargin) {
      wrapper.style.left = `${
        canvasRect.width - wrapper.offsetWidth - minMargin
      }px`;
    }

    // 確保下邊距
    const bottomEdge = currentTop + wrapper.offsetHeight;
    if (bottomEdge > canvasRect.height - minMargin) {
      wrapper.style.top = `${
        canvasRect.height - wrapper.offsetHeight - minMargin
      }px`;
    }
  }

  // 移除臨時元素
  document.body.removeChild(temp);
}
  
  // 創建新文字框的函數
  function createNewTextBox(x, y, isTitle = false) {
    // 創建外層包裝容器
    const wrapper = document.createElement("div");
    wrapper.className = "text-box-wrapper";

  // 設置正確的ID
  if (isTitle) {
    wrapper.dataset.id = "0"; // 標題框始終是0
  } else {
    wrapper.dataset.id = boxCounter.toString(); // 普通文字框使用當前計數器值
  }
    
    // 如果是標題框，添加額外的類
    if (isTitle) {
      wrapper.classList.add("title-wrapper");
    }
    
    // 創建文字框
    const newBox = document.createElement("div");
    newBox.className = "text-box vertical-text-box";
    
    // 創建控制按鈕容器
    const controls = document.createElement("div");
  controls.style.position = "absolute";
  controls.style.top = "0";
  controls.style.right = "-40px";
  controls.style.display = "flex";
  controls.style.flexDirection = "column";
  controls.style.gap = "8px";
  controls.style.zIndex = "100";

  // 創建刪除按鈕
    const deleteBtn = document.createElement("div");
    deleteBtn.title = "刪除";
    deleteBtn.innerHTML = "×";
  // 設置刪除按鈕樣式
  deleteBtn.style.width = "30px";
  deleteBtn.style.height = "30px";
  deleteBtn.style.backgroundColor = "#f8f8f8";
  deleteBtn.style.border = "2px solid #ccc";
  deleteBtn.style.borderRadius = "5px";
  deleteBtn.style.display = "flex";
  deleteBtn.style.justifyContent = "center";
  deleteBtn.style.alignItems = "center";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.fontSize = "22px";
  deleteBtn.style.fontWeight = "bold";
  deleteBtn.style.color = "#ff3333";
  deleteBtn.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";

  // 如果是標題框，隱藏刪除按鈕
  if (isTitle) {
    deleteBtn.style.display = "none";
  }
    
    // 創建移動按鈕
    const moveBtn = document.createElement("div");
    moveBtn.title = "移動";
  moveBtn.innerHTML = "+";
  // 設置移動按鈕樣式
  moveBtn.style.width = "30px";
  moveBtn.style.height = "30px";
  moveBtn.style.backgroundColor = "#f8f8f8";
  moveBtn.style.border = "2px solid #ccc";
  moveBtn.style.borderRadius = "5px";
  moveBtn.style.display = "flex";
  moveBtn.style.justifyContent = "center";
  moveBtn.style.alignItems = "center";
  moveBtn.style.cursor = "pointer";
  moveBtn.style.fontSize = "22px";
  moveBtn.style.fontWeight = "bold";
  moveBtn.style.color = "#3366ff";
  moveBtn.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
    
    // 添加按鈕到控制容器
    controls.appendChild(deleteBtn);
    controls.appendChild(moveBtn);
    
    // 創建縮放按鈕
    const resizeBtn = document.createElement("div");
    resizeBtn.title = "調整大小";
    resizeBtn.innerHTML = "⤡";
  // 設置縮放按鈕樣式
  resizeBtn.style.position = "absolute";
  resizeBtn.style.bottom = "0";
  resizeBtn.style.right = "0";
  resizeBtn.style.width = "22px";
  resizeBtn.style.height = "22px";
  resizeBtn.style.backgroundColor = "#f8f8f8";
  resizeBtn.style.border = "2px solid #ccc";
  resizeBtn.style.borderRadius = "4px";
  resizeBtn.style.display = "flex";
  resizeBtn.style.justifyContent = "center";
  resizeBtn.style.alignItems = "center";
  resizeBtn.style.cursor = "nwse-resize";
  resizeBtn.style.fontSize = "14px";
  resizeBtn.style.fontWeight = "bold";
  resizeBtn.style.color = "#3366ff";
  resizeBtn.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  resizeBtn.style.zIndex = "100";
    
    // 創建文字內容區域
    const textContent = document.createElement("div");
    textContent.className = "text-content";
    textContent.contentEditable = true;
    
  // 設置預設文字
  const placeholder = isTitle ? "請輸入標題..." : "請輸入內容...";
  textContent.dataset.placeholder = placeholder;
  textContent.innerHTML = placeholder;
    
    // 創建編號
    const boxNumber = document.createElement("div");
    boxNumber.className = "box-number";
  boxNumber.innerHTML = isTitle ? "" : boxCounter;
    
  // 添加編號到文字框
  newBox.appendChild(boxNumber);

  // 設置字體大小
    if (isTitle) {
      const titleSize = document.getElementById("titlesize").value || 28;
    // 使用 cssText 和 !important 確保樣式被應用
    textContent.style.cssText += `font-size: ${titleSize}px !important;`;

    // 設置標題框位置和大小
      wrapper.style.right = "20px";
      wrapper.style.top = "20px";
      wrapper.style.left = "auto"; // 清除left屬性
    wrapper.style.width = "120px";
    wrapper.style.height = "400px";
    wrapper.id = "titleBox"; // 添加ID以便後續引用
    } else {
      const fontSize = document.getElementById("charsize").value || 16;
    // 使用 cssText 和 !important 確保樣式被應用
    textContent.style.cssText += `font-size: ${fontSize}px !important;`;

    // 設置普通文字框位置
    wrapper.style.left = `${x}px`;
    wrapper.style.top = `${y}px`;
    wrapper.style.width = "80px";
    wrapper.style.height = "200px";
  }

  // 添加縮放按鈕和文字內容到文字框
  newBox.appendChild(resizeBtn);
    newBox.appendChild(textContent);
    
  // 添加文字框和控制按鈕到包裝容器
    wrapper.appendChild(newBox);
    wrapper.appendChild(controls);
    
    // 添加到畫布
    canvasContainer.appendChild(wrapper);
    
  // 只有在不是標題框時才增加計數器
  if (!isTitle) {
    boxCounter++;
  }
    
  // 設置拖曳功能，並添加智能對齊功能
  setupDraggable(wrapper, moveBtn);
    
  // 設置縮放功能 - 直接傳遞需要的元素
  setupResizable(wrapper, resizeBtn);
    
  // 設置刪除功能 - 直接傳遞需要的元素
  setupDeleteFunction(wrapper, deleteBtn);
    
    // 設置文字輸入事件
    setupTextEvents(textContent);

  // 設置按鈕懸停效果
  setupButtonHoverEffects(deleteBtn, moveBtn, resizeBtn);
    
    return wrapper;
  }
  
// 設置按鈕懸停效果
function setupButtonHoverEffects(deleteBtn, moveBtn, resizeBtn) {
  // 刪除按鈕懸停效果
  deleteBtn.addEventListener("mouseenter", function () {
    this.style.backgroundColor = "#ffe0e0";
    this.style.transform = "scale(1.1)";
    this.style.boxShadow = "0 3px 6px rgba(0,0,0,0.3)";
  });

  deleteBtn.addEventListener("mouseleave", function () {
    this.style.backgroundColor = "#f8f8f8";
    this.style.transform = "scale(1)";
    this.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  });

  // 移動按鈕懸停效果
  moveBtn.addEventListener("mouseenter", function () {
    this.style.backgroundColor = "#e0e0ff";
    this.style.transform = "scale(1.1)";
    this.style.boxShadow = "0 3px 6px rgba(0,0,0,0.3)";
  });

  moveBtn.addEventListener("mouseleave", function () {
    this.style.backgroundColor = "#f8f8f8";
    this.style.transform = "scale(1)";
    this.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  });

  // 縮放按鈕懸停效果
  resizeBtn.addEventListener("mouseenter", function () {
    this.style.backgroundColor = "#e0e0ff";
    this.style.boxShadow = "0 3px 6px rgba(0,0,0,0.3)";
  });

  resizeBtn.addEventListener("mouseleave", function () {
    this.style.backgroundColor = "#f8f8f8";
    this.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  });
}

// 修改 setupDraggable 函數以支援觸控操作
function setupDraggable(wrapper, moveBtn) {
  // 檢查參數
  if (!wrapper || !moveBtn) return;
  
  let isDragging = false;
  let startX, startY;
  let startPosX, startPosY;
  let horizontalAlignmentLine = null; // 水平(紅色)對齊線元素
  let verticalAlignmentLine = null; // 垂直(藍色)對齊線元素
  let closestBox = null; // 最近的文字框
  let alignmentType = null; // 對齊類型：'horizontal' 或 'vertical'
  
  // 創建對齊線元素(如果尚未創建)
  if (!horizontalAlignmentLine) {
    horizontalAlignmentLine = createHorizontalAlignmentLine();
  }
  if (!verticalAlignmentLine) {
    verticalAlignmentLine = createVerticalAlignmentLine();
  }
  
  // ========== 滑鼠事件處理 ==========
  
  // 處理滑鼠按下事件
  moveBtn.addEventListener("mousedown", function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // 檢查是否鎖定
    if (canvasContainer.classList.contains("locked")) return;
    
    startDrag(e.clientX, e.clientY);
    
    // 添加全局滑鼠移動和釋放事件
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
  
  // 處理滑鼠移動事件
  function handleMouseMove(e) {
    if (!isDragging) return;
    drag(e.clientX, e.clientY);
  }
  
  // 處理滑鼠釋放事件
  function handleMouseUp(e) {
    if (!isDragging) return;
    endDrag();
    
    // 移除全局事件監聽器
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }
  
  // ========== 觸控事件處理 ==========
  
  // 處理觸控開始事件
  moveBtn.addEventListener("touchstart", function(e) {
    e.preventDefault(); // 防止滾動和其他觸控默認行為
    e.stopPropagation();
    
    // 檢查是否鎖定
    if (canvasContainer.classList.contains("locked")) return;
    
    // 獲取第一個觸控點
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
    
    // 不需要添加全局事件監聽器，觸控事件會跟隨手指移動
  });
  
  // 處理觸控移動事件
  moveBtn.addEventListener("touchmove", function(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    drag(touch.clientX, touch.clientY);
  });
  
  // 處理觸控結束事件
  moveBtn.addEventListener("touchend", function(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    endDrag();
  });
  
  // 處理觸控取消事件(當觸控被系統打斷時)
  moveBtn.addEventListener("touchcancel", function(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    endDrag();
  });
  
  // ========== 通用拖曳功能 ==========
  
  // 開始拖曳
  function startDrag(clientX, clientY) {
    isDragging = true;
    startX = clientX;
    startY = clientY;
    
    // 獲取文字框當前位置
    const rect = wrapper.getBoundingClientRect();
    const canvasRect = canvasContainer.getBoundingClientRect();
    startPosX = rect.left - canvasRect.left;
    startPosY = rect.top - canvasRect.top;
    
    // 添加視覺反饋
    wrapper.style.opacity = "0.8";
    moveBtn.style.backgroundColor = "#e0e0ff";
    
    // 顯示提示(在觸控設備上特別有用)
    showDragHint(wrapper);
  }
  
  // 執行拖曳
  function drag(clientX, clientY) {
    // 計算新位置
    const dx = clientX - startX;
    const dy = clientY - startY;
    
    let newPosX = startPosX + dx;
    let newPosY = startPosY + dy;
    
    // 確保不超出畫布邊界
    const canvasRect = canvasContainer.getBoundingClientRect();
    newPosX = Math.max(0, Math.min(newPosX, canvasRect.width - wrapper.offsetWidth));
    newPosY = Math.max(0, Math.min(newPosY, canvasRect.height - wrapper.offsetHeight));
    
    // 檢查是否為標題框，標題框只能上下移動
    if (wrapper.dataset.id === "0") {
      newPosX = startPosX; // 保持X位置不變
    }
    
    // 應用新位置
    wrapper.style.left = newPosX + "px";
    wrapper.style.top = newPosY + "px";
    
    // 找出距離右上角最近的文字框
    findClosestBoxToTopRight(newPosX, newPosY, wrapper.offsetWidth, wrapper.offsetHeight);
    
    // 更新對齊線位置
    updateAlignmentLines(newPosX, newPosY, wrapper.offsetWidth, wrapper.offsetHeight);
  }
  
  // 結束拖曳
  function endDrag() {
    isDragging = false;
    
    // 移除視覺反饋
    wrapper.style.opacity = "1";
    moveBtn.style.backgroundColor = "#f8f8f8";
    
    // 根據顯示的對齊線進行對齊
    if (closestBox) {
      // 獲取最近文字框的右上角位置
      const rect = closestBox.getBoundingClientRect();
      const canvasRect = canvasContainer.getBoundingClientRect();
      const boxTopRightX = (rect.left - canvasRect.left) + closestBox.offsetWidth;
      const boxTopRightY = rect.top - canvasRect.top;
      
      if (alignmentType === 'horizontal') {
        // 水平對齊 - 頂部對齊
        wrapper.style.top = boxTopRightY + "px";
      } else {
        // 垂直對齊 - 右側對齊
        wrapper.style.left = (boxTopRightX - wrapper.offsetWidth) + "px";
      }
    }
    
    // 隱藏對齊線
    horizontalAlignmentLine.style.display = "none";
    verticalAlignmentLine.style.display = "none";
    
    // 隱藏提示
    hideDragHint();
  }
  
  // 其他輔助函數保持不變
  // ...
}

// 修改 setupResizable 函數以支援觸控操作
function setupResizable(wrapper) {
  const resizeBtn = wrapper.querySelector("div[style*='position: absolute'][style*='bottom: 0'][style*='right: 0']");
  const textBox = wrapper.querySelector(".text-box");
  
  if (!resizeBtn || !textBox) return;
  
  let isResizing = false;
  let startX, startY;
  let startWidth, startHeight;
  
  // 禁用自動調整大小功能標記
  wrapper.dataset.manuallyResized = "false";
  
  // ========== 滑鼠事件處理 ==========
  
  // 處理滑鼠按下事件
  resizeBtn.addEventListener("mousedown", function(e) {
    e.stopPropagation();
    e.preventDefault();
    
    // 檢查是否鎖定
    if (canvasContainer.classList.contains("locked")) return;
    
    startResize(e.clientX, e.clientY);
    
    // 添加全局滑鼠移動和釋放事件
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
  
  // 處理滑鼠移動事件
  function handleMouseMove(e) {
    if (!isResizing) return;
    resize(e.clientX, e.clientY);
  }
  
  // 處理滑鼠釋放事件
  function handleMouseUp(e) {
    if (!isResizing) return;
    endResize();
    
    // 移除全局事件監聽器
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }
  
  // ========== 觸控事件處理 ==========
  
  // 處理觸控開始事件
  resizeBtn.addEventListener("touchstart", function(e) {
    e.stopPropagation();
    e.preventDefault();
    
    // 檢查是否鎖定
    if (canvasContainer.classList.contains("locked")) return;
    
    // 獲取第一個觸控點
    const touch = e.touches[0];
    startResize(touch.clientX, touch.clientY);
  });
  
  // 處理觸控移動事件
  resizeBtn.addEventListener("touchmove", function(e) {
    if (!isResizing) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    resize(touch.clientX, touch.clientY);
  });
  
  // 處理觸控結束事件
  resizeBtn.addEventListener("touchend", function(e) {
    if (!isResizing) return;
    
    e.preventDefault();
    endResize();
  });
  
  // 處理觸控取消事件
  resizeBtn.addEventListener("touchcancel", function(e) {
    if (!isResizing) return;
    
    e.preventDefault();
    endResize();
  });
  
  // ========== 通用縮放功能 ==========
  
  // 開始縮放
  function startResize(clientX, clientY) {
    isResizing = true;
    
    // 記錄起始位置和尺寸
    startX = clientX;
    startY = clientY;
    startWidth = wrapper.offsetWidth;
    startHeight = wrapper.offsetHeight;
    
    // 添加視覺反饋
    resizeBtn.style.backgroundColor = "#e0e0ff";
    wrapper.style.opacity = "0.8";
    
    // 設置標記，表示正在手動調整大小
    wrapper.dataset.manuallyResized = "true";
    
    // 顯示提示(在觸控設備上特別有用)
    showResizeHint(wrapper);
  }
  
  // 執行縮放
  function resize(clientX, clientY) {
    // 計算新尺寸
    const dx = clientX - startX;
    const dy = clientY - startY;
    
    // 計算新寬度和高度
    let newWidth = startWidth + dx;
    let newHeight = startHeight + dy;
    
    // 設置最小尺寸
    newWidth = Math.max(80, newWidth);
    newHeight = Math.max(80, newHeight);
    
    // 應用新尺寸
    wrapper.style.width = newWidth + "px";
    wrapper.style.height = newHeight + "px";
  }
  
  // 結束縮放
  function endResize() {
    isResizing = false;
    
    // 移除視覺反饋
    resizeBtn.style.backgroundColor = "#f8f8f8";
    wrapper.style.opacity = "1";
    
    // 保持手動調整大小的標記
    wrapper.dataset.manuallyResized = "true";
    
    // 強制保存當前尺寸，防止自動調整覆蓋
    const currentWidth = wrapper.offsetWidth;
    const currentHeight = wrapper.offsetHeight;
    
    // 使用延時器確保尺寸被保留
    setTimeout(() => {
      wrapper.style.width = currentWidth + "px";
      wrapper.style.height = currentHeight + "px";
    }, 50);
    
    // 隱藏提示
    hideResizeHint();
  }
}

// 顯示拖曳提示
function showDragHint(wrapper) {
  // 創建提示元素
  const hint = document.createElement("div");
  hint.className = "drag-hint";
  hint.textContent = "拖曳移動中...";
  hint.style.position = "absolute";
  hint.style.top = "-30px";
  hint.style.left = "0";
  hint.style.backgroundColor = "rgba(0,0,0,0.7)";
  hint.style.color = "white";
  hint.style.padding = "5px 10px";
  hint.style.borderRadius = "4px";
  hint.style.fontSize = "12px";
  hint.style.zIndex = "1000";
  hint.style.pointerEvents = "none";
  
  // 添加到文字框
  wrapper.appendChild(hint);
}

// 隱藏拖曳提示
function hideDragHint() {
  // 移除所有拖曳提示
  document.querySelectorAll(".drag-hint").forEach(hint => {
    hint.remove();
  });
}

// 顯示縮放提示
function showResizeHint(wrapper) {
  // 創建提示元素
  const hint = document.createElement("div");
  hint.className = "resize-hint";
  hint.textContent = "調整大小中...";
  hint.style.position = "absolute";
  hint.style.bottom = "-30px";
  hint.style.right = "0";
  hint.style.backgroundColor = "rgba(0,0,0,0.7)";
  hint.style.color = "white";
  hint.style.padding = "5px 10px";
  hint.style.borderRadius = "4px";
  hint.style.fontSize = "12px";
  hint.style.zIndex = "1000";
  hint.style.pointerEvents = "none";
  
  // 添加到文字框
  wrapper.appendChild(hint);
}

// 隱藏縮放提示
function hideResizeHint() {
  // 移除所有縮放提示
  document.querySelectorAll(".resize-hint").forEach(hint => {
    hint.remove();
  });
}

// 設置拖曳功能，並添加智能對齊功能
function setupDraggable(wrapper, moveBtn) {
  // 檢查參數
  if (!wrapper || !moveBtn) return;

  let isDragging = false;
  let startX, startY;
  let startPosX, startPosY;
  let horizontalAlignmentLine = null; // 水平(紅色)對齊線元素
  let verticalAlignmentLine = null; // 垂直(藍色)對齊線元素
  let closestBox = null; // 最近的文字框
  let alignmentType = null; // 對齊類型：'horizontal' 或 'vertical'

  // 創建水平對齊線元素(紅色)
  function createHorizontalAlignmentLine() {
    const line = document.createElement("div");
    line.className = "horizontal-alignment-line";
    line.style.position = "absolute";
    line.style.height = "2px";
    line.style.backgroundColor = "transparent";
    line.style.borderTop = "2px dashed red";
    line.style.pointerEvents = "none";
    line.style.zIndex = "1000";
    line.style.display = "none";
    canvasContainer.appendChild(line);
    return line;
  }

  // 創建垂直對齊線元素(藍色)
  function createVerticalAlignmentLine() {
    const line = document.createElement("div");
    line.className = "vertical-alignment-line";
    line.style.position = "absolute";
    line.style.width = "2px";
    line.style.backgroundColor = "transparent";
    line.style.borderLeft = "2px dashed blue";
    line.style.pointerEvents = "none";
    line.style.zIndex = "1000";
    line.style.display = "none";
    canvasContainer.appendChild(line);
    return line;
  }

  // 處理鼠標按下事件
  moveBtn.addEventListener("mousedown", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // 檢查是否鎖定
    if (canvasContainer.classList.contains("locked")) return;

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    // 獲取文字框當前位置
    const rect = wrapper.getBoundingClientRect();
    const canvasRect = canvasContainer.getBoundingClientRect();
    startPosX = rect.left - canvasRect.left;
    startPosY = rect.top - canvasRect.top;

    // 創建對齊線
    if (!horizontalAlignmentLine) {
      horizontalAlignmentLine = createHorizontalAlignmentLine();
    }
    if (!verticalAlignmentLine) {
      verticalAlignmentLine = createVerticalAlignmentLine();
    }

    // 添加視覺反饋
    wrapper.style.opacity = "0.8";
    moveBtn.style.backgroundColor = "#e0e0ff";

    // 添加全局鼠標移動和釋放事件
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // 處理鼠標移動事件
  function handleMouseMove(e) {
    if (!isDragging) return;

    // 計算新位置
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newPosX = startPosX + dx;
    let newPosY = startPosY + dy;

    // 確保不超出畫布邊界
  const canvasRect = canvasContainer.getBoundingClientRect();
    newPosX = Math.max(
      0,
      Math.min(newPosX, canvasRect.width - wrapper.offsetWidth)
    );
    newPosY = Math.max(
      0,
      Math.min(newPosY, canvasRect.height - wrapper.offsetHeight)
    );

    // 檢查是否為標題框，標題框只能上下移動
  if (wrapper.dataset.id === "0") {
      newPosX = startPosX; // 保持X位置不變
    }

    // 應用新位置
    wrapper.style.left = newPosX + "px";
    wrapper.style.top = newPosY + "px";

    // 找出距離右上角最近的文字框
    findClosestBoxToTopRight(
      newPosX,
      newPosY,
      wrapper.offsetWidth,
      wrapper.offsetHeight
    );

    // 更新對齊線位置
    updateAlignmentLines(
      newPosX,
      newPosY,
      wrapper.offsetWidth,
      wrapper.offsetHeight
    );
  }

  // 找出距離右上角最近的文字框
  function findClosestBoxToTopRight(
    currentX,
    currentY,
    currentWidth,
    currentHeight
  ) {
    const boxes = document.querySelectorAll(".text-box-wrapper");
    let minDistance = Infinity;
    closestBox = null;
    alignmentType = null;

    // 計算當前文字框右上角坐標
    const currentTopRightX = currentX + currentWidth;
    const currentTopRightY = currentY;

    boxes.forEach((box) => {
      if (box === wrapper) return; // 跳過當前拖曳的文字框

      const rect = box.getBoundingClientRect();
      const canvasRect = canvasContainer.getBoundingClientRect();

      // 計算其他文字框右上角坐標
      const boxTopRightX = rect.left - canvasRect.left + box.offsetWidth;
      const boxTopRightY = rect.top - canvasRect.top;

      // 計算水平和垂直距離
      const horizontalDist = Math.abs(boxTopRightX - currentTopRightX);
      const verticalDist = Math.abs(boxTopRightY - currentTopRightY);

      // 計算總距離（歐氏距離）
      const totalDist = Math.sqrt(
        horizontalDist * horizontalDist + verticalDist * verticalDist
      );

      if (totalDist < minDistance) {
        minDistance = totalDist;
        closestBox = box;

        // 確定對齊類型 - 根據水平和垂直距離比較
        alignmentType =
          horizontalDist < verticalDist ? "vertical" : "horizontal";
      }
    });
  }
  
  // 更新對齊線位置
  function updateAlignmentLines(
    currentX,
    currentY,
    currentWidth,
    currentHeight
  ) {
    // 隱藏兩條對齊線
    horizontalAlignmentLine.style.display = "none";
    verticalAlignmentLine.style.display = "none";

    if (!closestBox) return;

    // 獲取最近文字框的右上角位置
    const rect = closestBox.getBoundingClientRect();
    const canvasRect = canvasContainer.getBoundingClientRect();
    const boxTopRightX = rect.left - canvasRect.left + closestBox.offsetWidth;
    const boxTopRightY = rect.top - canvasRect.top;

    // 獲取當前文字框的右上角位置
    const currentTopRightX = currentX + currentWidth;
    const currentTopRightY = currentY;

    if (alignmentType === "horizontal") {
      // 顯示水平(紅色)對齊線 - 從當前文字框頂部到目標文字框頂部
      horizontalAlignmentLine.style.display = "block";
      horizontalAlignmentLine.style.top = boxTopRightY + "px";

      // 如果目標文字框在右側
      if (boxTopRightX > currentTopRightX) {
        horizontalAlignmentLine.style.left = currentTopRightX + "px";
        horizontalAlignmentLine.style.width =
          boxTopRightX - currentTopRightX + "px";
      }
      // 如果目標文字框在左側
      else {
        horizontalAlignmentLine.style.left = boxTopRightX + "px";
        horizontalAlignmentLine.style.width =
          currentTopRightX - boxTopRightX + "px";
      }
    } else {
      // 顯示垂直(藍色)對齊線 - 從當前文字框右側到目標文字框右側
      verticalAlignmentLine.style.display = "block";
      verticalAlignmentLine.style.left = boxTopRightX + "px";

      // 如果目標文字框在上方
      if (boxTopRightY < currentTopRightY) {
        verticalAlignmentLine.style.top = boxTopRightY + "px";
        verticalAlignmentLine.style.height =
          currentTopRightY - boxTopRightY + "px";
      }
      // 如果目標文字框在下方
      else {
        verticalAlignmentLine.style.top = currentTopRightY + "px";
        verticalAlignmentLine.style.height =
          boxTopRightY - currentTopRightY + "px";
      }
    }
  }

  // 處理鼠標釋放事件
  function handleMouseUp(e) {
    if (!isDragging) return;

    isDragging = false;

    // 移除視覺反饋
    wrapper.style.opacity = "1";
    moveBtn.style.backgroundColor = "#f8f8f8";

    // 根據顯示的對齊線進行對齊
    if (closestBox) {
      // 獲取最近文字框的右上角位置
      const rect = closestBox.getBoundingClientRect();
      const canvasRect = canvasContainer.getBoundingClientRect();
      const boxTopRightX = rect.left - canvasRect.left + closestBox.offsetWidth;
      const boxTopRightY = rect.top - canvasRect.top;

      if (alignmentType === "horizontal") {
        // 水平對齊 - 頂部對齊
        wrapper.style.top = boxTopRightY + "px";
      } else {
        // 垂直對齊 - 右側對齊
        wrapper.style.left = boxTopRightX - wrapper.offsetWidth + "px";
      }
    }

    // 隱藏對齊線
    horizontalAlignmentLine.style.display = "none";
    verticalAlignmentLine.style.display = "none";

    // 移除全局事件監聽器
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }
}

// 設置文字框縮放功能
function setupResizable(wrapper) {
  const resizeBtn = wrapper.querySelector(
    "div[style*='position: absolute'][style*='bottom: 0'][style*='right: 0']"
  );
  const textBox = wrapper.querySelector(".text-box");

  if (!resizeBtn || !textBox) return;

  let isResizing = false;
  let startX, startY;
  let startWidth, startHeight;

  // 禁用自動調整大小功能標記
  wrapper.dataset.manuallyResized = "false";

  // 處理滑鼠按下事件
  resizeBtn.addEventListener("mousedown", function (e) {
    // 阻止事件冒泡和默認行為
    e.stopPropagation();
    e.preventDefault();

    // 檢查是否鎖定
    if (canvasContainer.classList.contains("locked")) return;

    // 開始縮放
    isResizing = true;

    // 記錄起始位置和尺寸
    startX = e.clientX;
    startY = e.clientY;
    startWidth = wrapper.offsetWidth;
    startHeight = wrapper.offsetHeight;

    // 添加視覺反饋
    resizeBtn.style.backgroundColor = "#e0e0ff";
    wrapper.style.opacity = "0.8";

    // 設置標記，表示正在手動調整大小
    wrapper.dataset.manuallyResized = "true";

    // 添加全局滑鼠移動和釋放事件
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // 處理滑鼠移動事件
  function handleMouseMove(e) {
    if (!isResizing) return;

    // 計算新尺寸
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // 計算新寬度和高度
    let newWidth = startWidth + dx;
    let newHeight = startHeight + dy;

    // 設置最小尺寸
    newWidth = Math.max(80, newWidth);
    newHeight = Math.max(80, newHeight);

    // 應用新尺寸
    wrapper.style.width = newWidth + "px";
    wrapper.style.height = newHeight + "px";
  }

  // 處理滑鼠釋放事件
  function handleMouseUp(e) {
    if (!isResizing) return;

    // 結束縮放
    isResizing = false;

    // 移除視覺反饋
    resizeBtn.style.backgroundColor = "#f8f8f8";
    wrapper.style.opacity = "1";

    // 移除全局事件監聽器
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    // 保持手動調整大小的標記
    wrapper.dataset.manuallyResized = "true";

    // 強制保存當前尺寸，防止自動調整覆蓋
    const currentWidth = wrapper.offsetWidth;
    const currentHeight = wrapper.offsetHeight;

    // 使用延時器確保尺寸被保留
    setTimeout(() => {
      wrapper.style.width = currentWidth + "px";
      wrapper.style.height = currentHeight + "px";
    }, 50);
  }
}

// 設置刪除功能
function setupDeleteFunction(wrapper, deleteBtn) {
  // 只有非標題框才能刪除
  if (wrapper.dataset.id !== "0") {
    deleteBtn.addEventListener("click", function (e) {
      // 阻止事件冒泡
      e.stopPropagation();

      // 檢查是否鎖定
      if (canvasContainer.classList.contains("locked")) return;

      // 確認刪除
      if (confirm("確定要刪除這個文字框嗎？")) {
        wrapper.remove();
      }
    });
  }
}

// 合併鎖定和解鎖功能
function toggleLockCanvas() {
  const lockBtn = document.getElementById("toggle-lock");

  if (canvasContainer.classList.contains("locked")) {
    // 當前是鎖定狀態，執行解鎖
    unlockCanvas();
    lockBtn.textContent = "鎖定畫布禁止編輯";
    lockBtn.style.backgroundColor = "#cfa9d8"; // 鎖定按鈕原色
  } else {
    // 當前是解鎖狀態，執行鎖定
    lockCanvas();
    lockBtn.textContent = "解鎖畫布繼續編輯";
    lockBtn.style.backgroundColor = "#d8cfa9"; // 解鎖按鈕使用淡黃色
  }
}

// 修正 initializeLockButton 函數，避免重複定義
function initializeLockButton() {
  // 獲取新版的切換按鈕
  const toggleLockBtn = document.getElementById("toggle-lock");

  if (toggleLockBtn) {
    // 確保移除任何現有事件監聽器，避免多次綁定
    toggleLockBtn.removeEventListener("click", toggleLockCanvas);
    // 添加事件監聽器
    toggleLockBtn.addEventListener("click", toggleLockCanvas);
    console.log("鎖定按鈕初始化完成 - 使用 toggle-lock 按鈕");
  } else {
    console.error("找不到 toggle-lock 按鈕元素");

    // 嘗試兼容舊版按鈕
    const lockButton = document.getElementById("lock-news");
    const unlockButton = document.getElementById("unlock-news");

    if (lockButton && unlockButton) {
      console.log("找到舊版鎖定/解鎖按鈕");
      lockButton.addEventListener("click", lockCanvas);
      unlockButton.addEventListener("click", unlockCanvas);
    }
  }
}

// 鎖定畫布 - 隱藏所有控制元素
function lockCanvas() {
  console.log("執行鎖定畫布");

  // 添加鎖定類到畫布
  canvasContainer.classList.add("locked");

  // 鎖定所有文字框
  const textBoxes = document.querySelectorAll(".text-box-wrapper");
  textBoxes.forEach((box) => {
    // 1. 禁用編輯
    const textContent = box.querySelector(".text-content");
    if (textContent) {
      textContent.contentEditable = false;

      // 2. 隱藏預設文字
      if (textContent.innerHTML === textContent.dataset.placeholder) {
        textContent.style.visibility = "hidden";
      }
    }

    // 3. 隱藏文字框邊框
    const textBox = box.querySelector(".text-box");
    if (textBox) {
      textBox.style.border = "none";
      textBox.style.boxShadow = "none";
    }

    // 4. 隱藏文字框編號
    const boxNumber = box.querySelector(".box-number");
    if (boxNumber) {
      boxNumber.style.display = "none";
    }

    // 5. 隱藏控制按鈕和縮放按鈕
    const controls = box.querySelector(
      "div[style*='position: absolute'][style*='right: -40px']"
    );
    if (controls) {
      controls.style.display = "none";
    }

    const resizeBtn = box.querySelector(
      "div[style*='position: absolute'][style*='bottom: 0'][style*='right: 0']"
    );
    if (resizeBtn) {
      resizeBtn.style.display = "none";
    }
  });
}

// 解鎖畫布 - 顯示所有控制元素
function unlockCanvas() {
  console.log("執行解鎖畫布");

  // 移除鎖定類
  canvasContainer.classList.remove("locked");

  // 解鎖所有文字框
  const textBoxes = document.querySelectorAll(".text-box-wrapper");
  textBoxes.forEach((box) => {
    // 1. 啟用編輯
    const textContent = box.querySelector(".text-content");
    if (textContent) {
      textContent.contentEditable = true;

      // 2. 顯示預設文字
      textContent.style.visibility = "visible";
    }

    // 3. 顯示文字框邊框
    const textBox = box.querySelector(".text-box");
    if (textBox) {
      textBox.style.border = "1px solid #ccc";
      textBox.style.boxShadow = "0 1px 3px rgba(0,0,0,0.12)";
    }

    // 4. 顯示文字框編號
    const boxNumber = box.querySelector(".box-number");
    if (boxNumber) {
      boxNumber.style.display = "block";
    }

    // 5. 顯示控制按鈕和縮放按鈕
    const controls = box.querySelector(
      "div[style*='position: absolute'][style*='right: -40px']"
    );
    if (controls) {
      controls.style.display = "flex";
    }

    const resizeBtn = box.querySelector(
      "div[style*='position: absolute'][style*='bottom: 0'][style*='right: 0']"
    );
    if (resizeBtn) {
      resizeBtn.style.display = "flex";
    }
  });
}

// 畫布雙擊處理函數
function canvasDoubleClickHandler(e) {
  // 檢查是否鎖定
  if (canvasContainer.classList.contains("locked")) return;

  // 檢查是否點擊了文字框或控制按鈕
  if (e.target.closest(".text-box-wrapper")) return;

  // 獲取點擊位置相對於畫布的坐標
  const rect = canvasContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 創建新文字框
  createNewTextBox(x, y);
}

// 在DOM加載完成後執行預處理
document.addEventListener("DOMContentLoaded", function () {
  // 預處理關鍵詞
  processTitleKeywords();

  // 其他初始化代碼...
});

// 預處理關鍵詞，避免標點符號問題
function processTitleKeywords() {
  // 我們不再需要移除標點符號，而是在使用時處理它們
  // 此函數可以保留為空，以便將來有其他預處理需求
}

// 在 document.addEventListener("DOMContentLoaded", function() { ... }) 中添加以下代碼

// 初始化清空內容按鈕
function initializeClearButton() {
  const clearButton = document.getElementById("clearContent");

  if (clearButton) {
    clearButton.addEventListener("click", function () {
      // 顯示確認對話框
      if (confirm("確定要清空所有文字框嗎？（標題框將保留）")) {
        // 用戶確認，清空所有非標題文字框
        clearAllTextBoxes();
      }
    });
  }
}

// 清空所有非標題文字框
function clearAllTextBoxes() {
  // 獲取所有非標題文字框
  const textBoxes = document.querySelectorAll(
    ".text-box-wrapper:not([data-id='0'])"
  );

  // 移除每個文字框
  textBoxes.forEach((box) => {
    box.remove();
  });

  // 重置計數器
  boxCounter = 1; // 從1開始，0保留給標題
}

// 在 document.addEventListener("DOMContentLoaded", function() { ... }) 中添加初始化
document.addEventListener("DOMContentLoaded", function () {
  // ... 其他初始化代碼 ...

  // 初始化清空內容按鈕
  initializeClearButton();
});

// 設置文字輸入和貼上事件
function setupTextEvents(textElement) {
  // 焦點進入時，如果是預設文字則清空
  textElement.addEventListener("focus", function () {
    if (this.innerHTML === this.dataset.placeholder) {
      this.innerHTML = "";
    }
  });

  // 焦點離開時，如果是空的則恢復預設文字
  textElement.addEventListener("blur", function () {
    if (this.innerHTML.trim() === "") {
      this.innerHTML = this.dataset.placeholder;
    }
  });

  // 處理貼上事件，自動調整文字框大小並保持字體大小
  textElement.addEventListener("paste", function (e) {
    // 阻止默認貼上行為，以便我們可以處理純文字
    e.preventDefault();

    // 獲取剪貼板中的純文字
    let text = (e.clipboardData || window.clipboardData).getData("text");

    // 處理段落間距 - 保留換行符，確保段落正確顯示
    // 將連續的換行符替換為單個換行符
    text = text.replace(/\n+/g, "\n");

    // 獲取當前應該使用的字體大小
    const isTitle = this.closest(".text-box-wrapper").dataset.id === "0";
    const fontSize = isTitle
      ? document.getElementById("titlesize").value
      : document.getElementById("charsize").value;

    // 將純文字插入到當前位置
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      range.deleteContents();

      // 處理文本，將換行符轉換為 <br> 標籤，並在每個段落開頭添加兩個全形空格
      const fragments = document.createDocumentFragment();
      const lines = text.split("\n");

      lines.forEach((line, index) => {
        if (index > 0) {
          // 添加換行
          fragments.appendChild(document.createElement("br"));
        }

        // 在每個段落開頭添加兩個全形空格（除非是空行）
        if (line.trim() !== "") {
          // 使用全形空格 \u3000
          const indentedLine = isTitle ? line : "\u3000\u3000" + line;
          fragments.appendChild(document.createTextNode(indentedLine));
        } else {
          fragments.appendChild(document.createTextNode(line));
        }
      });

      range.insertNode(fragments);

      // 將光標移動到插入文本的末尾
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    // 短暫延遲以確保內容已貼上
    setTimeout(() => {
      // 確保字體大小正確
      this.style.cssText += `font-size: ${fontSize}px !important;`;
      // 調整文字框大小
      autoResizeTextBox(this);
    }, 50);
  });

  // 處理輸入事件
  textElement.addEventListener("input", function () {
    // 獲取當前應該使用的字體大小
    const isTitle = this.closest(".text-box-wrapper").dataset.id === "0";
    const fontSize = isTitle
      ? document.getElementById("titlesize").value
      : document.getElementById("charsize").value;

    // 確保字體大小正確
    this.style.cssText += `font-size: ${fontSize}px !important;`;

    // 調整文字框大小
    autoResizeTextBox(this);
  });

  // 確保初始字體大小正確
  const isTitle = textElement.closest(".text-box-wrapper").dataset.id === "0";
  const fontSize = isTitle
    ? document.getElementById("titlesize").value
    : document.getElementById("charsize").value;

  textElement.style.cssText += `font-size: ${fontSize}px !important;`;
}

// 連接標題轉換功能到標題框
function connectTitleFunctions() {
  // 獲取標題轉換按鈕
  const transformTitleBtn = document.getElementById("transformTitleBtn");
  const transformTitlePositiveBtn = document.getElementById(
    "transformTitlePositiveBtn"
  );

  // 獲取標題輸入框
  const newsTitleInput = document.getElementById("newsTitle");

  // 獲取標題框
  const titleBox = document.querySelector(
    ".text-box-wrapper[data-id='0'] .text-content"
  );

  // 連接驚悚化標題按鈕
  if (transformTitleBtn) {
    transformTitleBtn.addEventListener("click", function () {
      // 獲取標題輸入框的值
      const titleText = newsTitleInput.value.trim();
      if (!titleText) {
        alert("請先輸入標題內容");
        return;
      }

      // 轉換標題
      const shockingTitle = transformNewsTitle();

      // 更新標題框內容
      if (titleBox && shockingTitle) {
        titleBox.innerHTML = shockingTitle;
        // 調整標題框大小
        autoResizeTextBox(titleBox);
      }
    });
  }

  // 連接正面化標題按鈕
  if (transformTitlePositiveBtn) {
    transformTitlePositiveBtn.addEventListener("click", function () {
      // 獲取標題輸入框的值
      const titleText = newsTitleInput.value.trim();
      if (!titleText) {
        alert("請先輸入標題內容");
        return;
      }

      // 轉換標題
      const positiveTitle = transformNewsTitlePositive();

      // 更新標題框內容
      if (titleBox && positiveTitle) {
        titleBox.innerHTML = positiveTitle;
        // 調整標題框大小
        autoResizeTextBox(titleBox);
      }
    });
  }
}

// 初始化下載按鈕
function initializeDownloadButton() {
  const downloadBtn = document.getElementById("downloadImage");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      // 暫時鎖定畫布以準備截圖
      lockCanvas();

      // 使用 html2canvas 截取畫布
      html2canvas(document.getElementById("canvasContainer"), {
        backgroundColor: "white",
        scale: 2, // 提高截圖質量
        logging: false,
        useCORS: true,
      }).then((canvas) => {
        // 創建下載鏈接
        const link = document.createElement("a");
        link.download = "新聞直書圖片.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        // 截圖完成後解鎖畫布
        setTimeout(unlockCanvas, 500);
      });
    });
  }
}

// 添加窗口大小變化時重新調整標題框尺寸的功能
function adjustTitleBoxSize() {
  const titleBox = document.querySelector('.text-box-wrapper[data-id="0"]');
  if (!titleBox) return;
  
  // 獲取畫布容器的尺寸
  const canvasRect = canvasContainer.getBoundingClientRect();
  const canvasWidth = canvasRect.width;
  const canvasHeight = canvasRect.height;
  
  // 根據畫布比例決定標題框寬度
  let titleWidthRatio;
  if (canvasWidth < canvasHeight) {
    // 直版畫布 - 寬度為畫布的1/4
    titleWidthRatio = 0.25;
  } else {
    // 橫版畫布 - 寬度為畫布的1/8
    titleWidthRatio = 0.125; 
  }
  
  // 設置標題框的寬度
  const titleWidth = Math.round(canvasWidth * titleWidthRatio);
  titleBox.style.width = `${titleWidth}px`;
  
  // 更新 CSS 變量
  document.documentElement.style.setProperty('--title-width', `${titleWidthRatio * 100}%`);
}
