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
function verticalText() {
    const input = document.getElementById("inputText").value;
    document.getElementById("warning").style.display = "none";
    
    if (!isMostlyChinese(input)) {
        document.getElementById("warning").style.display = "block";
        return;
    }

    const result = document.getElementById("byCharsOption").checked ? 
        byChars() : byLines();
    
    document.getElementById("outputText").value = result;
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

function byChars() {
    var userText = document.getElementById("inputText").value;
    var charsPerLine = parseInt(document.getElementById("charsPerLine").value);

    // 先進行 UTF-8 和全形轉換
    userText = halfToFull(userText);

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

function byLines() {
    var userText = document.getElementById("inputText").value;
    var totalLines = parseInt(document.getElementById("totalLines").value);

    // 先進行 UTF-8 和全形轉換
    userText = halfToFull(userText);

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

// 零寬字元加密 (隨機插入零寬字元)
function zeroWidthEncrypt() {
    let input = document.getElementById("inputText").value;
    if (!isMostlyChinese(input)) {
        document.getElementById("warning").style.display = "block";
        return;
    } else {
        document.getElementById("warning").style.display = "none";
    }
    
    let zwChars = ['\u200B', '\u200C', '\u200D']; // 零寬字符
    let result = input.split("").map(char => {
        let zw = zwChars[Math.floor(Math.random() * zwChars.length)];
        return char + zw;
    }).join("");
    
    document.getElementById("outputText").value = result;
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
    }, 1000);
}

// 解密功能
function decrypt() {
    const input = document.getElementById("inputText").value;
    // 移除所有零寬字符
    const result = input.replace(/[\u200B-\u200D]/g, '');
    document.getElementById("outputText").value = result;
}