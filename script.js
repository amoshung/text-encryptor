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

// 直書加密 (每個段落轉換為直書)
function verticalText() {
    let input = document.getElementById("inputText").value;
    if (!isMostlyChinese(input)) {
        document.getElementById("warning").style.display = "block";
        return;
    } else {
        document.getElementById("warning").style.display = "none";
    }
    
    // 先依照原有的換行符號分段
    let paragraphs = input.split("\n");
    let result = [];
    
    for (let paragraph of paragraphs) {
        if (!paragraph.trim()) continue;
        
        // 將段落分成不超過64個中文字的部分
        let subParagraphs = [];
        let currentLength = 0;
        let currentSubParagraph = '';
        
        for (let char of paragraph) {
            if (/[\u4e00-\u9fa5]/.test(char)) {
                currentLength++;
            }
            currentSubParagraph += char;
            
            if (currentLength >= 64) {
                subParagraphs.push(currentSubParagraph);
                currentSubParagraph = '';
                currentLength = 0;
            }
        }
        
        if (currentSubParagraph) {
            subParagraphs.push(currentSubParagraph);
        }
        
        for (let subParagraph of subParagraphs) {
            // 將段落分成直行
            let chars = subParagraph.split('');
            let maxColumns = Math.ceil(chars.length / 10);
            let verticalLines = Array.from({ length: 10 }, () => Array(maxColumns).fill(' '));
            
            // 填充字元到直行中
            for (let i = 0; i < chars.length; i++) {
                let lineIndex = Math.floor(i / 10);
                let charIndex = i % 10;
                verticalLines[charIndex][lineIndex] = chars[i];
            }
            
            // 將直行轉換為文字
            let verticalTexts = verticalLines.map(line => {
                return line.join('　'); // 使用全形空格作為分隔
            });
            
            // 將該段落的直行加入結果（由右至左排列）
            result.push(verticalTexts.reverse().join('\n'));
            
            // 插入1x10的空白列作為段落分隔
            result.push('\n\n\n\n\n\n\n\n\n\n');
        }
    }
    
    // 移除最後一個多餘的空白列
    if (result.length > 0) {
        result.pop();
    }
    
    // 段落之間加入空行
    document.getElementById("outputText").value = result.join('\n\n');
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
