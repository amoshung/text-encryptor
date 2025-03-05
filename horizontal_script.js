// 全型轉換函數
function toFullWidth(str) {
    return str.replace(/[!-~]/g, function(char) {
        return String.fromCharCode(char.charCodeAt(0) + 65248);
    });
}

// 自動調整textarea高度
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// 加密主函數
function encodeText() {
    const keywords = document.getElementById('keywords').value.split(';')
                    .filter(k => k.trim() !== '');
    const originalText = document.getElementById('originalText').value;
    const lineWidth = parseInt(document.getElementById('lineWidth').value) || 12;
    
    // 全型轉換
    const fullWidthText = toFullWidth(originalText);
    
    // 按照原文中的換行符切割文本
    let originalLines = fullWidthText.split('\n');
    
    // 結果數組
    const resultLines = [];
    
    // 處理每一個原始行
    for (let i = 0; i < originalLines.length; i++) {
        const originalLine = originalLines[i];
        
        // 按照指定行寬切割當前行
        const lines = [];
        for (let j = 0; j < originalLine.length; j += lineWidth) {
            lines.push(originalLine.substring(j, j + lineWidth));
        }
        
        // 處理分割後的每一行
        for (let j = 0; j < lines.length; j++) {
            const line = lines[j];
            let modifiedLine = line;
            let keywordsInLine = [];
            
            // 查找當前行中的所有關鍵字及其位置
            for (const keyword of keywords) {
                let pos = 0;
                while ((pos = line.indexOf(keyword, pos)) !== -1) {
                    keywordsInLine.push({ keyword, startPos: pos });
                    pos += keyword.length;
                }
            }
            
            // 如果沒有關鍵字，直接添加原行
            if (keywordsInLine.length === 0) {
                resultLines.push(line);
                continue;
            }
            
            // 對找到的關鍵字進行處理
            // 先用空格替換原文中關鍵字的偶數位置
            for (const { keyword, startPos } of keywordsInLine) {
                for (let k = 1; k < keyword.length; k += 2) {
                    const pos = startPos + k;
                    modifiedLine = modifiedLine.substring(0, pos) + 
                                  '　' + 
                                  modifiedLine.substring(pos + 1);
                }
            }
            
            // 添加修改後的行
            resultLines.push(modifiedLine);
            
            // 創建新行，只在關鍵字的偶數位置放置字符
            let secondLine = '';
            // 先填充足夠長度的空格
            for (let k = 0; k < line.length; k++) {
                secondLine += '　';
            }
            
            // 填入關鍵字的偶數位置字符
            for (const { keyword, startPos } of keywordsInLine) {
                for (let k = 1; k < keyword.length; k += 2) {
                    const pos = startPos + k;
                    if (pos < secondLine.length) {
                        secondLine = secondLine.substring(0, pos) + 
                                    keyword[k] + 
                                    secondLine.substring(pos + 1);
                    }
                }
            }
            
            // 添加第二行
            resultLines.push(secondLine);
        }
    }
    
    // 將結果數組連接為最終文本
    document.getElementById('encodedResult').value = resultLines.join('\n');
    autoResize(document.getElementById('encodedResult'));
}

// 複製結果函數
function copyResult() {
    const resultTextarea = document.getElementById('encodedResult');
    resultTextarea.select();
    document.execCommand('copy');
    alert('已複製加密結果！');
}