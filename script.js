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

// 半形轉全形函數
function halfToFull(text) {
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

    // 先進行全形轉換
    userText = halfToFull(userText);

    // 將文字分段，並移除空段落
    var paragraphs = userText.split('\n').filter(p => p.trim().length > 0);
    
    // 將所有段落合併成一個字串
    var fullText = paragraphs.join('');
    
    // 計算需要的行數
    var totalLines = Math.ceil(fullText.length / charsPerLine);
    
    // 補足空格
    while (fullText.length < totalLines * charsPerLine) {
        fullText += '　';
    }

    // 建立矩陣並填充全形空格
    var matrix = [];
    for (let i = 0; i < totalLines; i++) {
        matrix[i] = [];
        for (let j = 0; j < charsPerLine; j++) {
            let charIndex = i * charsPerLine + j;
            matrix[i][j] = charIndex < fullText.length ? fullText[charIndex] : '　';
        }
    }

    // 生成結果
    var result = [];
    for (let i = 0; i < charsPerLine; i++) {
        let line = [];
        for (let j = totalLines - 1; j >= 0; j--) {
            line.push(matrix[j][i]);
        }
        result.push(line.join('\u200B'));
    }

    return result.join('\n');
}

function byLines() {
    var userText = document.getElementById("inputText").value;
    var lines = parseInt(document.getElementById("totalLines").value);

    // 先進行全形轉換
    userText = halfToFull(userText);

    // 將文字分段，並移除空段落
    var paragraphs = userText.split('\n').filter(p => p.trim().length > 0);
    
    // 將所有段落合併成一個字串
    var fullText = paragraphs.join('');
    
    // 計算每行字數
    var charsPerLine = Math.ceil(fullText.length / lines);
    
    // 補足空格
    while (fullText.length < charsPerLine * lines) {
        fullText += '　';
    }

    // 建立矩陣並填充全形空格
    var matrix = Array(lines).fill().map(() => Array(charsPerLine).fill('　'));

    // 填充矩陣
    var count = 0;
    for(var i = 0; i < lines && count < fullText.length; i++) {
        for(var j = 0; j < charsPerLine && count < fullText.length; j++) {
            matrix[i][j] = fullText.charAt(count);
            count++;
        }
    }

    // 生成結果
    var result = "";
    for(var i = 0; i < charsPerLine; i++) {
        for(var j = lines - 1; j >= 0; j--) {
            result += matrix[j][i];
            if (j > 0) {
                result += '\u200B';
            }
        }
        if (i < charsPerLine - 1) {
            result += '\n';
        }
    }

    return result.trim();
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