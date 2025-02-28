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
        convertByChars(input) : convertByLines(input);
    
    document.getElementById("outputText").value = result;
}

// 依照每行字數轉換
function convertByChars(text) {
    const charsPerLine = parseInt(document.getElementById("charsPerLine").value);
    if (charsPerLine < 1) return text;

    // 補足空格，確保文字長度能被每行字數整除
    const totalLines = Math.ceil(text.length / charsPerLine);
    const totalChars = totalLines * charsPerLine;
    const paddedText = padTextWithFullWidthSpace(text, totalChars);
    
    // 建立矩陣儲存文字
    const matrix = [];
    for (let i = 0; i < charsPerLine; i++) {
        matrix[i] = new Array(totalLines).fill('　');
    }
    
    // 填充矩陣（由右至左，由上至下）
    for (let i = 0; i < paddedText.length; i++) {
        const col = totalLines - 1 - Math.floor(i / charsPerLine);
        const row = i % charsPerLine;
        matrix[row][col] = paddedText[i];
    }
    
    // 轉換為直書格式
    return matrix.map(row => row.join('')).join('\n');
}

// 依照總行數轉換
function convertByLines(text) {
    const totalLines = parseInt(document.getElementById("totalLines").value);
    if (totalLines < 1) return text;

    // 計算每行應有的字數（向上取整）
    const charsPerLine = Math.ceil(text.length / totalLines);
    return convertByChars(text, charsPerLine);
}

// 使用全形空格補足文字
function padTextWithFullWidthSpace(text, targetLength) {
    return text.padEnd(targetLength, '　');
}

// 建立直書文字
function createVerticalText(text, charsPerLine) {
    const chars = text.split('');
    const lines = Math.ceil(text.length / charsPerLine);
    const matrix = Array.from({ length: charsPerLine }, () => new Array(lines));

    // 填充矩陣
    for (let i = 0; i < chars.length; i++) {
        const row = i % charsPerLine;
        const col = Math.floor(i / charsPerLine);
        matrix[row][col] = chars[i];
    }

    // 轉換為直書格式
    return matrix
        .map(line => line.join(''))
        .join('\n');
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