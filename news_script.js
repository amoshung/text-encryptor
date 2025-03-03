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
    
    // 組合成一行 (用於文本框顯示)
    const transformedTitle = `【${startKeyword} ${middleText} ${endKeyword}】`;

    // 輸出結果到 shockingTitle 元素 (橫書)
    outputElement.value = transformedTitle;
    
    // 自動調整輸出文本框的高度以適應內容
    outputElement.style.height = 'auto';  // 先重置高度
    outputElement.style.height = (outputElement.scrollHeight) + 'px';  // 設置為內容高度
    
    // 更新右側標題 - 使用 HTML 元素實現斜體效果
    const rightContent = document.getElementById('rightContent');
    if (rightContent) {
        // 清空原有內容
        rightContent.innerHTML = '';
        
        // 創建直書文字容器
        const textContainer = document.createElement('div');
        textContainer.style.writingMode = 'vertical-rl';
        textContainer.style.textOrientation = 'upright';
        textContainer.style.fontFamily = '"Yu Mincho", "MS Mincho", "SimSun", serif';  // 使用較好支援直書的字型
        textContainer.style.width = '100%';
        textContainer.style.height = '100%';
        textContainer.style.display = 'flex';
        textContainer.style.alignItems = 'center';
        textContainer.style.justifyContent = 'center';
        textContainer.style.fontSize = '100%'; // 初始字體大小
        
        // 先進行半形轉全形，再轉換標點符號
        const startText = convertPunctuationToVertical(halfToFull(`【${startKeyword} `));
        const middleText = convertPunctuationToVertical(halfToFull(middleText));
        const endText = convertPunctuationToVertical(halfToFull(` ${endKeyword}】`));
        
        // 創建開頭括號和關鍵字
        const startElement = document.createElement('span');
        startElement.innerHTML = startText;
        
        // 創建中間文字（斜體）
        const middleElement = document.createElement('span');
        middleElement.textContent = middleText;
        middleElement.style.fontStyle = 'italic';
        
        // 創建結尾關鍵字和括號
        const endElement = document.createElement('span');
        endElement.textContent = endText;
        
        // 添加所有元素到容器
        textContainer.appendChild(startElement);
        textContainer.appendChild(middleElement);
        textContainer.appendChild(endElement);
        
        // 添加到右側內容區
        rightContent.appendChild(textContainer);
        
        // 調整字體大小以極大化填充容器
        maximizeFontSize(textContainer, rightContent);
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
        // 基本標點
        '。': '。',  // U+3002 而不是 U+FE12
        '、': '、',  // U+3001 而不是 U+FE11
        '，': '，',  // U+FF0C 而不是 U+FE10
        '．': '・', // 間隔號
        '：': '︓', // 冒號
        '；': '︔', // 分號
       '！': '！',  // U+FF01 而不是 U+FE15
        '？': '？',  // U+FF1F 而不是 U+FE16
        '‧': '·', // 間隔號
        
        // 括號類
        '（': '︵', // 左圓括號
        '）': '︶', // 右圓括號
        '｛': '︷', // 左大括號
        '｝': '︸', // 右大括號
        '［': '︹', // 左方括號
        '］': '︺', // 右方括號
        '【': '︻', // 左黑方括號
        '】': '︼', // 右黑方括號
        '《': '︽', // 左書名號
        '》': '︾', // 右書名號
        '〈': '︿', // 左單書名號
        '〉': '﹀', // 右單書名號
        '「': '﹁', // 左單引號
        '」': '﹂', // 右單引號
        '『': '﹃', // 左雙引號
        '』': '﹄', // 右雙引號
        '〔': '﹝', // 左括號
        '〕': '﹞', // 右括號
        
        // 其他符號
        '—': '︱', // 破折號
        '︱': '︱', // 直線
        '╴': '︴', // 波浪線
        '⋮': '︙', // 垂直省略號
        '…': '︙', // 橫式省略號轉垂直
        '＿': '︳', // 底線
        '～': '〜', // 波浪號
        '‥': '︰', // 刪節號
        
        // 常用半形轉全形
        ',': '︐', // 半形逗號
        '.': '︒', // 半形句號
        ':': '︓', // 半形冒號
        ';': '︔', // 半形分號
        '!': '︕', // 半形驚嘆號
        '?': '︖', // 半形問號
        '[': '︹', // 半形左方括號
        ']': '︺', // 半形右方括號
        '{': '︷', // 半形左大括號
        '}': '︸', // 半形右大括號
        '(': '︵', // 半形左圓括號
        ')': '︶'  // 半形右圓括號
    };

    return text.split('').map(char => horizontalToVertical[char] || char).join('');
}

// 調整字體大小以極大化填充容器
function maximizeFontSize(element, container) {
    // 獲取容器尺寸
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // 設置初始字體大小（以像素為單位）
    let fontSize = 20; // 起始字體大小
    element.style.fontSize = fontSize + 'px';
    
    // 檢查元素是否超出容器
    function isOverflowing() {
        return (element.scrollWidth > containerWidth * 0.95 || 
                element.scrollHeight > containerHeight * 0.95);
    }
    
    // 增加字體大小直到填滿容器但不溢出
    while (!isOverflowing() && fontSize < 200) { // 設置上限防止無限循環
        fontSize += 2;
        element.style.fontSize = fontSize + 'px';
    }
    
    // 如果溢出，回退一步
    if (isOverflowing()) {
        fontSize -= 4; // 回退兩步以確保不溢出
        element.style.fontSize = fontSize + 'px';
    }
    
    // 設置行高和字間距以改善顯示效果
    element.style.lineHeight = '1.2';
    element.style.letterSpacing = '0.05em';
}

// 添加一個函數來解析驚悚化標題
function parseShockingTitle(title) {
    // 移除【】
    title = title.replace(/【|】/g, '');
    
    // 嘗試找出原始標題（在兩個關鍵詞之間的部分）
    const parts = title.split(' ');
    
    if (parts.length >= 3) {
        // 假設格式為 "開頭關鍵詞 原始標題 結尾關鍵詞"
        const start = parts[0];
        const end = parts[parts.length - 1];
        const middle = parts.slice(1, parts.length - 1).join(' ');
        
        return { start, middle, end };
    }
    
    // 如果無法解析，返回整個標題作為中間部分
    return { start: '', middle: title, end: '' };
}

// 生成並下載圖片
function generateAndDownloadImage() {
    const contentArea = document.getElementById('contentArea');
    html2canvas(contentArea).then(canvas => {
        const link = document.createElement('a');
        link.download = '新聞直書圖片.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// 生成布局函數
function generateLayout() {
    const blockCountInput = document.getElementById('blockCount');
    const titleWidthSelect = document.getElementById('titleWidth');
    const leftContent = document.getElementById('leftContent');
    const rightContent = document.getElementById('rightContent');
    const newsTitleInput = document.getElementById('newsTitle');
    const shockingTitleOutput = document.getElementById('shockingTitle');
    
    const blockCount = parseInt(blockCountInput.value) || 1;
    const titleWidth = parseInt(titleWidthSelect.value) || 10;
    
    // 設置標題寬度
    rightContent.style.width = `${titleWidth}%`;
    
    // 清空左側內容
    leftContent.innerHTML = '';
    
    // 生成垂直區塊
    for (let i = 0; i < blockCount; i++) {
        const block = document.createElement('div');
        block.className = 'vertical-block';
        
        const textarea = document.createElement('textarea');
        textarea.placeholder = `請在此輸入第 ${i + 1} 區塊的內容...`;
        
        block.appendChild(textarea);
        leftContent.appendChild(block);
    }
    
    // 如果已經有標題，使用它
    if (newsTitleInput.value.trim()) {
        // 清空原有內容
        rightContent.innerHTML = '';
        
        // 創建直書文字容器
        const textContainer = document.createElement('div');
        textContainer.style.writingMode = 'vertical-rl';
        textContainer.style.textOrientation = 'upright';
        textContainer.style.fontFamily = '"Yu Mincho", "MS Mincho", "SimSun", serif';  // 使用較好支援直書的字型
        textContainer.style.width = '100%';
        textContainer.style.height = '100%';
        textContainer.style.display = 'flex';
        textContainer.style.alignItems = 'center';
        textContainer.style.justifyContent = 'center';
        
        // 創建開頭括號
        const startElement = document.createElement('span');
        startElement.textContent = '【';
        
        // 創建中間文字（斜體）
        const middleElement = document.createElement('span');
        middleElement.textContent = halfToFull(newsTitleInput.value.trim());
        middleElement.style.fontStyle = 'italic';
        
        // 創建結尾括號
        const endElement = document.createElement('span');
        endElement.textContent = '】';
        
        // 添加所有元素到容器
        textContainer.appendChild(startElement);
        textContainer.appendChild(middleElement);
        textContainer.appendChild(endElement);
        
        // 添加到右側內容區
        rightContent.appendChild(textContainer);
        
        // 調整字體大小以極大化填充容器
        maximizeFontSize(textContainer, rightContent);
    }
    
    // 如果已經有驚悚化的標題，使用它
    if (shockingTitleOutput.value.trim()) {
        const titleParts = parseShockingTitle(shockingTitleOutput.value.trim());
        
        // 清空原有內容
        rightContent.innerHTML = '';
        
        // 創建直書文字容器
        const textContainer = document.createElement('div');
        textContainer.style.writingMode = 'vertical-rl';
        textContainer.style.textOrientation = 'upright';
        textContainer.style.fontFamily = '"Yu Mincho", "MS Mincho", "SimSun", serif';  // 使用較好支援直書的字型
        textContainer.style.width = '100%';
        textContainer.style.height = '100%';
        textContainer.style.display = 'flex';
        textContainer.style.alignItems = 'center';
        textContainer.style.justifyContent = 'center';
        
        // 先進行半形轉全形，再轉換標點符號
        const startText = convertPunctuationToVertical(halfToFull(`【${titleParts.start} `));
        const middleText = convertPunctuationToVertical(halfToFull(titleParts.middle));
        const endText = convertPunctuationToVertical(halfToFull(` ${titleParts.end}】`));
        
        // 創建開頭括號和關鍵字
        const startElement = document.createElement('span');
        startElement.textContent = startText;
        
        // 創建中間文字（斜體）
        const middleElement = document.createElement('span');
        middleElement.textContent = middleText;
        middleElement.style.fontStyle = 'italic';
        
        // 創建結尾關鍵字和括號
        const endElement = document.createElement('span');
        endElement.textContent = endText;
        
        // 添加所有元素到容器
        textContainer.appendChild(startElement);
        textContainer.appendChild(middleElement);
        textContainer.appendChild(endElement);
        
        // 添加到右側內容區
        rightContent.appendChild(textContainer);
        
        // 調整字體大小以極大化填充容器
        maximizeFontSize(textContainer, rightContent);
        
        // 如果有第一個文本區域，也填入標題
        const firstTextarea = document.querySelector('.vertical-block textarea');
        if (firstTextarea) {
            firstTextarea.value = shockingTitleOutput.value.trim();
        }
    }
}

// 頁面加載完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    // 獲取元素
    const blockCountInput = document.getElementById('blockCount');
    const lineLengthInput = document.getElementById('lineLength');
    const titleWidthSelect = document.getElementById('titleWidth');
    const generateLayoutButton = document.getElementById('generateLayout');
    const downloadImageButton = document.getElementById('downloadImage');
    const newsTitleInput = document.getElementById('newsTitle');
    const rightContent = document.getElementById('rightContent');
    
    // 初始化布局
    generateLayout();
    
    // 監聽新聞標題輸入
    newsTitleInput.addEventListener('input', function() {
        const inputTitle = this.value.trim();
        if (inputTitle) {
            // 清空原有內容
            rightContent.innerHTML = '';
            
            // 創建直書文字容器
            const textContainer = document.createElement('div');
            textContainer.style.writingMode = 'vertical-rl';
            textContainer.style.textOrientation = 'upright';
            textContainer.style.fontFamily = '"Yu Mincho", "MS Mincho", "SimSun", serif';  // 使用較好支援直書的字型
            textContainer.style.width = '100%';
            textContainer.style.height = '100%';
            textContainer.style.display = 'flex';
            textContainer.style.alignItems = 'center';
            textContainer.style.justifyContent = 'center';
            
            // 創建開頭括號
            const startElement = document.createElement('span');
            startElement.textContent = '【';
            
            // 創建中間文字（斜體）
            const middleElement = document.createElement('span');
            middleElement.textContent = halfToFull(inputTitle);
            middleElement.style.fontStyle = 'italic';
            
            // 創建結尾括號
            const endElement = document.createElement('span');
            endElement.textContent = '】';
            
            // 添加所有元素到容器
            textContainer.appendChild(startElement);
            textContainer.appendChild(middleElement);
            textContainer.appendChild(endElement);
            
            // 添加到右側內容區
            rightContent.appendChild(textContainer);
        } else {
            rightContent.textContent = '請輸入標題';
        }
    });

    // 排版生成按鈕點擊事件
    generateLayoutButton.addEventListener('click', generateLayout);

    // 生成圖片下載按鈕點擊事件
    downloadImageButton.addEventListener('click', generateAndDownloadImage);
});

function createVerticalTextContainer(text) {
    const container = document.createElement('div');
    container.style.writingMode = 'vertical-rl';
    container.style.textOrientation = 'upright';
    container.style.fontFamily = '"Yu Mincho", "MS Mincho", "SimSun", serif';
    container.innerHTML = convertPunctuationToVertical(text);
    return container;
}

// 使用這個函數來創建文字容器
const textContainer = createVerticalTextContainer(text); 