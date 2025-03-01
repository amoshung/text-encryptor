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

function byLines() {
    var userText = document.getElementById("inputText").value;
    var lines = document.getElementById("totalLines").value;

    // 先進行全形轉換
    userText = halfToFull(userText);

    if(userText.length % lines != 0) {
        var totalLength = userText.length;
        while(totalLength % lines != 0) {
            totalLength++;
        }
        var spaceNum = totalLength - userText.length;

        for (var i = 0; i < spaceNum; i++) {
            userText += '　';
        }
    }

    var lineLength = userText.length / lines;
    var matrix = new Array(lines);
    for(var i = 0; i < lines; i++) {
        matrix[i] = new Array(lineLength);
    }

    var count = 0;
    for(var i = 0; i < lines; i++) {
        for(var j = 0; j < lineLength; j++) {
            matrix[i][j] = userText.charAt(count);
            count++;
        }
    }

    var result = "";
    for(var i = 0; i < lineLength; i++) {
        for(var j = lines - 1; j >= 0; j--) {
            result += matrix[j][i];
            if (j > 0) {
                result += " ";
            }
        }
        if (i < lineLength - 1) {
            result += '\n';
        }
    }

    return result;
}

function byChars() {
    var userText = document.getElementById("inputText").value;
    var lineLength = document.getElementById("charsPerLine").value;

    // 先進行全形轉換
    userText = halfToFull(userText);

    if(userText.length % lineLength != 0) {
        var spaceNum = lineLength - (userText.length % lineLength);
        for (var i = 0; i < spaceNum; i++) {
            userText += '　';
        }   
    }

    var lines = userText.length / lineLength;
    var matrix = new Array(lines);
    for(var i = 0; i < lines; i++) {
        matrix[i] = new Array(lineLength);
    }

    var count = 0;
    for(var i = 0; i < lines; i++) {
        for(var j = 0; j < lineLength; j++) {
            matrix[i][j] = userText.charAt(count);
            count++;
        }
    }

    var result = "";
    for(var i = 0; i < lineLength; i++) {
        for(var j = lines - 1; j >= 0; j--) {
            result += matrix[j][i];
            if (j > 0) {
                result += " ";
            }
        }
        if (i < lineLength - 1) {
            result += '\n';
        }
    }

    return result;
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