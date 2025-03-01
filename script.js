// 檢查是否為大部分中文
function isMostlyChinese(text) {
    if (!text.trim()) {
        document.getElementById("warning").textContent = "⚠️ 請輸入文字！";
        return false;
    }
    const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
    const isChinese = (chineseChars.length / text.length) > 0.7;
    if (!isChinese) {
        document.getElementById("warning").textContent = "⚠️ 請確保輸入的文字主要為中文！";
    }
    return isChinese;
}

// 零寬字元螞蟻字加密 (每個字插入零寬字符)
function zeroWidthAnt() {
    let input = document.getElementById("inputText").value;
    document.getElementById("warning").style.display = "none";
    
    if (!isMostlyChinese(input)) {
        document.getElementById("warning").style.display = "block";
        return;
    }
    
    let zwsp = '\u200B'; // 零寬空格
    let result = input.split("").join(zwsp); // 插入零寬字符
    document.getElementById("outputText").value = result;
}

// 直書轉換函數
function verticalText(input) {
    const result = document.getElementById("byCharsOption").checked ? 
        byChars(input) : byLines(input);
    return result;
}

// UTF-8 轉換函數
function toUTF8(text) {
    try {
        // 先將文字轉為 UTF-8 編碼
        return decodeURIComponent(encodeURIComponent(text));
    } catch (e) {
        console.error('UTF-8 轉換錯誤:', e);
        return text; // 如果轉換失敗，返回原始文字
    }
}

// 半形轉全形函數（更新版）
function halfToFull(text) {
    // 先進行 UTF-8 轉換
    text = toUTF8(text);

    // 移除所有超連結
    text = text.replace(/<a[^>]*>(.*?)<\/a>/gi, '$1');

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
        '，': '︐', // 逗號
        '。': '︒', // 句號
        '、': '︑', // 頓號
        '：': '︓', // 冒號
        '；': '︔', // 分號
        '！': '︕', // 驚嘆號
        '？': '︖', // 問號
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

function byChars(input) {
    var userText = input;
    var charsPerLine = parseInt(document.getElementById("charsPerLine").value);

    // 先進行 UTF-8 和全形轉換
    userText = halfToFull(userText);
    
    // 將標點符號轉換為直書版本
    userText = convertPunctuationToVertical(userText);

    // 將文字分段，並移除空段落
    var paragraphs = userText.split('\n').filter(p => p.trim().length > 0);
    
    // 處理每個段落並收集結果
    var allResults = [];
    
    for (let paragraph of paragraphs) {
        // 計算當前段落需要的行數
        var totalLines = Math.ceil(paragraph.length / charsPerLine);
        
        // 補足空格
        while (paragraph.length < totalLines * charsPerLine) {
            paragraph += '　';
        }

        // 建立矩陣並填充全形空格
        var matrix = [];
        for (let i = 0; i < totalLines; i++) {
            matrix[i] = [];
            for (let j = 0; j < charsPerLine; j++) {
                let charIndex = i * charsPerLine + j;
                matrix[i][j] = charIndex < paragraph.length ? paragraph[charIndex] : '　';
            }
        }

        // 生成當前段落的直書結果
        var result = [];
        for (let i = 0; i < charsPerLine; i++) {
            let line = [];
            for (let j = totalLines - 1; j >= 0; j--) {
                line.push(matrix[j][i]);
            }
            result.push(line.join('\u200B'));
        }
        
        // 將當前段落的結果加入總結果
        allResults.push(result.join('\n'));
    }
    
    // 用兩個換行符號連接各段落的結果
    return allResults.join('\n\n');
}

function byLines(input) {
    var userText = input;
    var totalLines = parseInt(document.getElementById("totalLines").value);

    // 先進行 UTF-8 和全形轉換
    userText = halfToFull(userText);
    
    // 將標點符號轉換為直書版本
    userText = convertPunctuationToVertical(userText);

    // 將文字分段，並移除空段落
    var paragraphs = userText.split('\n').filter(p => p.trim().length > 0);
    
    // 處理每個段落並收集結果
    var allResults = [];
    
    for (let paragraph of paragraphs) {
        // 計算每行應有的字數
        var charsPerLine = Math.ceil(paragraph.length / totalLines);
        
        // 補足空格
        while (paragraph.length < charsPerLine * totalLines) {
            paragraph += '　';
        }

        // 建立矩陣並填充全形空格
        var matrix = Array(totalLines).fill().map(() => Array(charsPerLine).fill('　'));

        // 填充矩陣
        var count = 0;
        for(var i = 0; i < totalLines && count < paragraph.length; i++) {
            for(var j = 0; j < charsPerLine && count < paragraph.length; j++) {
                matrix[i][j] = paragraph.charAt(count);
                count++;
            }
        }

        // 生成當前段落的結果
        var result = [];
        for(var i = 0; i < charsPerLine; i++) {
            let line = [];
            for(var j = totalLines - 1; j >= 0; j--) {
                line.push(matrix[j][i]);
            }
            result.push(line.join('\u200B'));
        }
        
        // 將當前段落的結果加入總結果
        allResults.push(result.join('\n'));
    }
    
    // 用兩個換行符號連接各段落的結果
    return allResults.join('\n\n');
}

// 複製到剪貼板
function copyToClipboard() {
    const outputText = document.getElementById("outputText");
    outputText.select();
    document.execCommand("copy");
    
    // 顯示複製成功提示
    const originalText = outputText.value;
    outputText.value = "複製成功！";
    setTimeout(() => {
        outputText.value = originalText;
        // 恢復原本的高度
        outputText.style.height = 'auto';
        outputText.style.height = outputText.scrollHeight + 'px';
    }, 1000);
}

// 解密功能
function decrypt() {
    const input = document.getElementById("inputText").value;
    // 移除所有零寬字符
    const result = input.replace(/[\u200B-\u200D]/g, '');
    document.getElementById("outputText").value = result;
}


function transformText() {
    let input = document.getElementById("inputText").value;
    document.getElementById("warning").style.display = "none";

    // 移除所有半形空白
    input = input.replace(/ /g, '');
    
    // 轉換日期格式（在移除 emoji 之前處理）
    input = convertDateFormat(input);
    
    // 移除 emoji
    input = input.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, '');

    // 處理短段落
    let paragraphs = input.split('\n');
    let mergedParagraphs = [];
    let currentParagraph = '';
    let currentLength = 0;

    for (let i = 0; i < paragraphs.length; i++) {
        let paragraph = paragraphs[i].trim();
        
        // 如果當前段落為空，跳過
        if (paragraph.length === 0) continue;
        
        // 計算當前累積段落的長度
        currentLength = currentParagraph.length + paragraph.length;
        
        if (currentLength < 120) {
            // 如果累積長度小於120，繼續聚合
            currentParagraph += paragraph;
        } else {
            // 如果累積長度達到或超過120
            if (currentParagraph) {
                // 如果有累積的段落，先儲存
                mergedParagraphs.push(currentParagraph);
            }
            // 開始新的累積
            currentParagraph = paragraph;
        }
    }
    
    // 處理最後剩餘的段落
    if (currentParagraph) {
        mergedParagraphs.push(currentParagraph);
    }

    input = mergedParagraphs.join('\n');

    const clickbaitOption = document.getElementById("clickbaitInsertOption");
    const verticalOption = document.getElementById("verticalTextOption");

    if (clickbaitOption && clickbaitOption.checked) {
        input = insertClickbait(input);
    }
    if (verticalOption && verticalOption.checked) {
        input = verticalText(input);
    }

    document.getElementById("outputText").value = input;
    
    // 自動調整輸出文本框的高度
    const outputTextarea = document.getElementById("outputText");
    outputTextarea.style.height = 'auto';
    outputTextarea.style.height = outputTextarea.scrollHeight + 'px';
}

function convertDateFormat(text) {
    const numberToChineseMap = {
        '0': '零', '1': '一', '2': '二', '3': '三', '4': '四',
        '5': '五', '6': '六', '7': '七', '8': '八', '9': '九',
        '10': '十', '11': '十一', '12': '十二'
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
            let dayStr = '';
            if (dayNum <= 10) {
                dayStr = numberToChineseMap[dayNum];
            } else if (dayNum < 20) {
                dayStr = '十' + (dayNum % 10 === 0 ? '' : numberToChineseMap[dayNum % 10]);
            } else if (dayNum < 30) {
                dayStr = '二十' + (dayNum % 10 === 0 ? '' : numberToChineseMap[dayNum % 10]);
            } else {
                dayStr = '三十' + (dayNum % 10 === 0 ? '' : numberToChineseMap[dayNum % 10]);
            }
            
            return `${monthStr}月${dayStr}號`;
        }
        return match; // 如果不是有效日期，保持原樣
    });
}

function insertClickbait(text) {
    const shocking_title_keywords = [
        "震驚，", "驚呆，", "嚇壞，", "傻眼，", "不可思議，", 
        "目瞪口呆，", "瞠目結舌，", "看傻了，", "嚇到吃手手，", "愣住了，",
        "驚呼連連，", "瞪大眼睛，", "太誇張，", "大吃一驚，", "嚇死人，",
        "心碎，", "淚崩，", "怒了，", "不忍了，", "痛哭流涕，",
        "崩潰，", "氣炸，", "心疼，", "淚灑現場，", "含淚，",
        "悲痛欲絕，", "潸然淚下，", "怒火中燒，", "滿腔怒火，", "喜極而泣，",
        "竟然，", "居然，", "結果出乎意料，", "後果不堪設想，", "原來如此，",
        "真相大白，", "結局神反轉，", "下場超慘，", "慘不忍睹，", "始料未及，",
        "不堪入目，", "出乎意料，", "萬萬沒想到，", "終於漏餡，", "終極真相，",
        "太可怕了，", "超乎想像，", "史上最，", "徹底爆炸，", "無法相信，",
        "前所未有，", "極度危險，", "非常誇張，", "難以置信，", "超級嚴重，",
        "天理難容，", "超級無敵，", "極度震驚，", "罕見，", "破天荒，",
        "秘密曝光，", "內幕揭露，", "你絕對想不到，", "終於真相了，", "不為人知的秘密，",
        "背後真相是，", "神秘面紗揭開，", "不可告人，", "鮮為人知，", "隱藏多年，",
        "暗藏玄機，", "揭開真相，", "驚天內幕，", "一手資料，", "獨家爆料，",
        "快訊，", "獨家，", "緊急通知，", "最新消息，", "現在才知道，",
        "即刻生效，", "剛剛發生，", "突發狀況，", "馬上就要，", "限時公開，",
        "火速傳出，", "晚了就沒了，", "搶先看，", "最後機會，", "趕快行動，",
        "本以為...沒想到，", "反轉，", "意想不到，", "180度大轉變，", "竟然大反轉，",
        "峰迴路轉，", "急轉直下，", "戲劇性的變化，", "出乎意料，", "有夠諷刺，",
        "必看，", "千萬不要錯過，", "一定要知道，", "趕快分享，", "不看後悔，",
        "速看，", "立即行動，", "不得不看，", "人人必懂，", "馬上收藏"
    ];
    
    let lastInsertedIndex = -1; // 用於跟踪上一次插入的位置
    const probability = parseFloat(document.getElementById("clickbaitProbability").value);

    return text.split('').map((char, index) => {
        if ((char === '，' || char === '、' || char === '。') && Math.random() < probability && lastInsertedIndex !== index - 1) {
            const randomKeyword = shocking_title_keywords[Math.floor(Math.random() * shocking_title_keywords.length)];
            lastInsertedIndex = index; // 更新上一次插入的位置
            return char + randomKeyword;
        }
        return char;
    }).join('');
}

function insertZeroWidth(text) {
    const zwChars = ['\u200B', '\u200C', '\u200D'];
    return text.split('').map(char => {
        const zw = zwChars[Math.floor(Math.random() * zwChars.length)];
        return char + zw;
    }).join('');
}

function transformTitle() {
    let inputTitle = document.getElementById("inputTitle").value;
    
    const shocking_title_keywords_restructured = {
        opening_keywords: [
            "震驚", "驚呆", "嚇壞", "傻眼", "不可思議", 
            "目瞪口呆", "瞠目結舌", "看傻了", "嚇到吃手手", "愣住了",
            "驚呼連連", "瞪大眼睛", "太誇張", "大吃一驚", "嚇死人",
            "快訊", "獨家", "緊急通知", "最新消息", "即刻生效", 
            "剛剛發生", "突發狀況", "火速傳出", "搶先看", "趕快行動",
            "史上最", "前所未有", "罕見", "破天荒", "太可怕了",
            "極度危險", "超級嚴重", "超級無敵", "極度震驚"
        ],
        middle_keywords: [
            "心碎", "淚崩", "怒了", "不忍了", "痛哭流涕",
            "崩潰", "氣炸", "心疼", "淚灑現場", "含淚",
            "悲痛欲絕", "潸然淚下", "怒火中燒", "滿腔怒火", "喜極而泣",
            "竟然", "居然", "結果出乎意料", "後果不堪設想", "下場超慘", 
            "慘不忍睹", "始料未及", "不堪入目", "出乎意料", "萬萬沒想到",
            "超乎想像", "徹底爆炸", "無法相信", "非常誇張", "難以置信",
            "天理難容",
            "秘密曝光", "內幕揭露", "背後真相是", "神秘面紗揭開", 
            "暗藏玄機", "揭開真相", "驚天內幕", "一手資料",
            "反轉", "意想不到", "180度大轉變", "竟然大反轉", 
            "峰迴路轉", "急轉直下", "戲劇性的變化", "有夠諷刺"
        ],
        ending_keywords: [
            "原來如此", "真相大白", "結局神反轉", "終於漏餡", "終極真相",
            "你絕對想不到", "終於真相了", "不為人知的秘密", "不可告人", 
            "鮮為人知", "隱藏多年", "獨家爆料",
            "現在才知道", "馬上就要", "限時公開", "晚了就沒了", "最後機會",
            "本以為...沒想到",
            "必看", "千萬不要錯過", "一定要知道", "趕快分享", "不看後悔",
            "速看", "立即行動", "不得不看", "人人必懂", "馬上收藏"
        ]
    };

    // 隨機選擇開頭的兩個關鍵字
    const startKeyword1 = shocking_title_keywords_restructured.opening_keywords[Math.floor(Math.random() * shocking_title_keywords_restructured.opening_keywords.length)];
    const startKeyword2 = shocking_title_keywords_restructured.opening_keywords[Math.floor(Math.random() * shocking_title_keywords_restructured.opening_keywords.length)];
    
    // 隨機選擇結尾的兩個關鍵字
    const endKeyword1 = shocking_title_keywords_restructured.ending_keywords[Math.floor(Math.random() * shocking_title_keywords_restructured.ending_keywords.length)];
    const endKeyword2 = shocking_title_keywords_restructured.ending_keywords[Math.floor(Math.random() * shocking_title_keywords_restructured.ending_keywords.length)];

    // 將輸入的文字放在中間
    const middleText = inputTitle.trim();
    
    // 組合成三行的結構
    const transformedTitle = `${startKeyword1} ${startKeyword2}\n${middleText}\n${endKeyword1} ${endKeyword2}`;

    document.getElementById("outputTitle").value = transformedTitle;
    
    // 自動調整輸出文本框的高度
    const outputTitlearea = document.getElementById("outputTitle");
    outputTitlearea.style.height = 'auto';
    outputTitlearea.style.height = outputTitlearea.scrollHeight + 'px';
}

function copyTitleToClipboard() {
    const outputTitle = document.getElementById("outputTitle");
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