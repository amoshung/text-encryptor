// 新聞標題驚悚化函數
function transformNewsTitle() {
    let inputTitle = document.getElementById("newsTitle").value;
    let outputElement = document.getElementById("shockingTitle");
    
    if (!inputTitle.trim()) {
        alert('請輸入新聞標題');
        return;
    }
    
    const shocking_title_keywords_restructured = {
        opening_keywords: [
            "天啊！", "OMG！", "這也太扯了吧！", "真的嗎？", "我不敢相信！",
            "超狂！", "嚇死人了！", "真的假的？", "你沒看錯！", "怎麼可能！",
            "傻眼貓咪！", "驚呆了！", "快看！", "全網瘋傳！", "無法置信！",
            "大事發生了！", "爆炸性消息！", "剛剛才知道！", "這下完蛋了！", "快來看！",
            "超驚人！", "史無前例！", "爆紅！", "讓人直呼不可能！", "世界都震動了！",
            "全場安靜！", "OMG震撼彈！", "嚇得腿軟！", "整個傻掉！", "全世界都瘋了！",
            "不可置信！", "刷新三觀！", "讓人崩潰！", "超乎想像！", "沒見過這樣的！",
            "太驚悚了！", "無敵誇張！", "超級無敵爆炸！", "不可思議的發展！", "讓人懷疑人生！",
            "你絕對猜不到！", "這次玩大了！", "這下糟了！", "嚇破膽了！", "爆炸新聞！",
            "一秒驚呆！", "讓人說不出話！", "爆紅全網！", "大家都在討論！", "不敢相信自己的眼睛！",
            "這消息太驚人！", "全網都炸了！", "笑到噴淚！", "讓人無言以對！", "太震撼了！",
            "所有人都愣住！", "讓人雞皮疙瘩掉滿地！", "誇張到不行！", "讓人發毛！", "大驚失色！",
            "馬上告訴大家！", "驚天大新聞！", "世界大震撼！", "這個消息不得了！", "全場鴉雀無聲！",
            "眼睛業障重了！", "我腦袋當機了！", "超級爆炸消息！", "太誇張了吧！", "怎麼會這樣！",
            "神展開！", "讓人傻眼到地板！", "腦洞大開！", "全場爆笑！", "這是真的嗎？",
            "他一句話不忍了！", "她看完當場暴怒！", "專家都看傻了！", "醫生都嚇壞了！", "老師直接跪了！",
            "他一個動作震驚全場！", "她一個眼神嚇壞眾人！", "專家看完沉默了！", "他們都慌了！", "老闆當場摔桌子！",
            "父母看完都哭了！", "孩子們都嚇呆了！", "他一個決定改變一切！", "她一句話讓全場沸騰！", "他們都不敢相信！",
            "政府緊急出手！", "專家組都傻眼了！", "科學家無法解釋！", "警方立刻行動！", "醫院全員出動！",
            "他一個舉動讓人心碎！", "她的反應讓人落淚！", "他們的遭遇讓人心痛！", "老人家看完都氣炸！", "孩子們都嚇哭了！",
            "專家組都看呆了！", "研究人員都震驚了！", "他一個選擇毀了一切！", "她一個決定救了所有人！", "他們的發現顛覆認知！",
            "權威專家都沉默了！", "資深醫師都搖頭！", "教授們都驚呆了！", "他一個動作感動千萬人！", "她一句話讓人淚崩！",
            "他們的故事讓人窒息！", "老師們都看傻了！", "家長們都坐不住了！", "專家看完都冒冷汗！", "他一個舉動改變命運！",
            "她一個決定震撼全國！", "他們的行為嚇壞所有人！", "醫生看完都沉默了！", "科學家都無法理解！", "專家組都爭論不休！",
            "他一個發現驚動高層！", "她一個舉動感動全球！", "他們的遭遇讓人心驚！", "專家都不敢置信！", "研究人員都嚇傻了！"
        ],
        ending_keywords: [
            "你一定要看！", "絕對不會後悔！", "超乎你的想像！", "讓你目瞪口呆！", "真的太猛了！",
            "快點分享！", "錯過會後悔！", "一定要收藏！", "再不看就來不及了！", "現在知道還不晚！",
            "真相終於揭曉！", "不得不看！", "超震撼結局！", "意想不到的結尾！", "結局會讓你嚇傻！",
            "絕對想不到的真相！", "讓人毛骨悚然的故事！", "千萬別錯過！", "真相讓人背脊發涼！", "這個結果讓人難以忘懷！",
            "秒懂！", "讓你瞬間清醒！", "讓人沉默三秒！", "這波反轉絕了！", "結局超反轉！",
            "這次真的不一樣！", "馬上分享給朋友！", "必須轉發！", "你看懂了嗎？", "別人都知道了！",
            "驚人的結局！", "原來真相是這樣！", "超出預期的發展！", "最終的秘密揭開了！", "這個真相你絕對想不到！",
            "看到最後才知道！", "這結局讓人毛骨悚然！", "太誇張了吧！", "一定要告訴大家！", "最後一秒超反轉！",
            "你絕對猜不到的結尾！", "這真相簡直炸裂！", "笑到最後的才是贏家！", "讓你大開眼界！", "這個結局絕了！",
            "結果讓你欲罷不能！", "這次真的不得了！", "結局讓人淚流滿面！", "這個反轉超級精彩！", "最後的結果讓你震撼！",
            "別眨眼，否則錯過！", "這故事將永遠留在你心中！", "讓你久久不能平靜！", "結尾藏著超大彩蛋！", "看完心情久久不能平復！",
            "他最後的決定讓人震驚！", "她的真相終於大白！", "專家的結論讓人不寒而慄！", "醫生的診斷讓人絕望！", "老師的話讓所有人沉默！",
            "他們最後的結局讓人心碎！", "她最後的選擇讓人落淚！", "專家組的報告讓人恐懼！", "他們的真相終於揭曉！", "老闆的反應讓所有人震驚！",
            "父母的決定改變了一切！", "孩子們的未來因此改變！", "他的最後一句話讓人心碎！", "她的真相讓人淚崩！", "他們的結局讓人無法接受！",
            "政府的最終決定讓人震驚！", "專家組的最終報告讓人恐懼！", "科學家的最終發現顛覆認知！", "警方的調查結果讓人心寒！", "醫院的最終診斷讓人絕望！",
            "他的真相讓人心碎！", "她的結局讓人淚流滿面！", "他們的故事讓人久久不能平靜！", "老人家的話讓所有人沉默！", "孩子們的未來因此被改變！",
            "專家組的結論讓人不寒而慄！", "研究人員的發現改變了科學史！", "他的最終選擇讓人震驚！", "她的最後一刻讓人心碎！", "他們的真相讓世界震驚！",
            "權威專家的最終結論讓人恐懼！", "資深醫師的診斷讓人絕望！", "教授們的研究結果顛覆認知！", "他的最後舉動讓人淚崩！", "她的最終真相讓人心碎！",
            "他們的結局讓人毛骨悚然！", "老師們的最終決定改變了一切！", "家長們的反應讓人心碎！", "專家的最終報告讓人恐懼！", "他的最終結局讓人震驚！",
            "她的真相終於水落石出！", "他們的故事將永遠被銘記！", "醫生的最終診斷讓人絕望！", "科學家的最終發現讓人震驚！", "專家組的最終結論讓人恐懼！",
            "他的最後一刻讓人心碎！", "她的最終選擇感動了所有人！", "他們的真相讓人無法接受！", "專家的最終報告讓人不寒而慄！", "研究人員的最終發現改變了一切！"
        ]
    };

    // 隨機選擇開頭的關鍵字
    const startKeyword = shocking_title_keywords_restructured.opening_keywords[Math.floor(Math.random() * shocking_title_keywords_restructured.opening_keywords.length)];
    
    // 隨機選擇結尾的關鍵字
    const endKeyword = shocking_title_keywords_restructured.ending_keywords[Math.floor(Math.random() * shocking_title_keywords_restructured.ending_keywords.length)];

    // 將輸入的文字放在中間
    const middleText = inputTitle.trim();
    
    // 組合成一行
    const transformedTitle = `${startKeyword}${middleText}${endKeyword}`;

    // 輸出結果到 shockingTitle 元素 (橫書)
    outputElement.value = transformedTitle;
    
    // 自動調整輸出文本框的高度
    outputElement.style.height = 'auto';
    outputElement.style.height = outputElement.scrollHeight + 'px';
    
    // 更新右側標題 - 直接設置文本內容
    const rightContent = document.getElementById('rightContent');
    if (rightContent) {
        // 將標題轉換為直書格式（不包含標點符號轉換，因為 rightContent 會自動處理）
        const processedTitle = halfToFull(transformedTitle);
        
        // 直接設置文本內容，讓 rightContent 自己處理直書顯示
        rightContent.textContent = processedTitle;
    }
    
    return transformedTitle;
}

// 自動調整字體大小以適應直書容器
function adjustFontSizeForVertical(container) {
    // 獲取直書元素
    const verticalText = container.querySelector('div > div');
    if (!verticalText) return;
    
    // 獲取容器尺寸
    const containerHeight = container.offsetHeight;
    const containerWidth = container.offsetWidth;
    
    // 設置初始字體大小
    let fontSize = 24; // 起始字體大小
    verticalText.style.fontSize = fontSize + 'px';
    
    // 檢查是否超出容器
    function isTooBig() {
        return (verticalText.offsetHeight > containerHeight * 0.95) || 
               (verticalText.offsetWidth > containerWidth * 0.95);
    }
    
    // 縮小字體直到適合容器
    while (isTooBig() && fontSize > 12) {
        fontSize -= 1;
        verticalText.style.fontSize = fontSize + 'px';
    }
    
    // 嘗試放大字體
    let canIncrease = true;
    while (canIncrease && fontSize < 36) {
        fontSize += 1;
        verticalText.style.fontSize = fontSize + 'px';
        
        if (isTooBig()) {
            fontSize -= 1;
            verticalText.style.fontSize = fontSize + 'px';
            canIncrease = false;
        }
    }
}

// 複製驚悚化標題到剪貼簿
function copyShockingTitleToClipboard() {
    const outputTitle = document.getElementById("shockingTitle");
    outputTitle.select();
    document.execCommand("copy");

    const originalText = outputTitle.value;
    outputTitle.value = "複製成功！";
    setTimeout(() => {
        outputTitle.value = originalText;
        // 恢復原本的高度
        outputTitle.style.height = 'auto';
        outputTitle.style.height = outputTitle.scrollHeight + 'px';
    }, 1000);
}

// 將文字轉換為直書格式
function convertToVertical(text) {
    // 先進行全形轉換
    text = halfToFull(text);
    
    // 將標點符號轉換為直書版本
    text = convertPunctuationToVertical(text);
    
    return text;
}

// 半形轉全形函數
function halfToFull(text) {
    // 阿拉伯數字轉換為中文數字
    const arabicToChinese = {
        '0': '零', '1': '一', '2': '二', '3': '三', '4': '四',
        '5': '五', '6': '六', '7': '七', '8': '八', '9': '九'
    };
    text = text.replace(/[0-9]/g, match => arabicToChinese[match]);

    let result = "";
    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);
        if (code === 32) { // 空格轉換
            result += '　';
        } else if (code >= 33 && code <= 126) { // ASCII 字元轉換
            result += String.fromCharCode(code + 65248);
        } else {
            result += text.charAt(i);
        }
    }
    return result;
}

// 標點符號轉換函數 - 將橫書標點轉為直書標點
function convertPunctuationToVertical(text) {
    const horizontalToVertical = {
        '。': '︒', // 句號
        '、': '︑', // 頓號
        '（': '︵', // 左圓括號
        '）': '︶', // 右圓括號
        '「': '﹁', // 左單引號
        '」': '﹂', // 右單引號
        '『': '﹃', // 左雙引號
        '』': '﹄', // 右雙引號
        '《': '︽', // 左書名號
        '》': '︾', // 右書名號
        '〈': '︿', // 左尖括號
        '〉': '﹀', // 右尖括號
        '【': '︻', // 左方括號
        '】': '︼', // 右方括號
        '—': '︱', // 破折號
        '…': '︙', // 省略號
        '·': '・'  // 間隔號
    };

    return text.split('').map(char => horizontalToVertical[char] || char).join('');
} 