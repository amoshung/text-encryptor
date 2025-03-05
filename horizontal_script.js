// 全域變數存儲關鍵字列表
let keywordsList = [];

// 預設關鍵字列表
const DEFAULT_KEYWORDS = [
    "盧秀燕", "傅崐萁", "侯友宜", "國民黨", "黃國昌", "台北", "臺北", "新北", 
    "桃園", "台中", "臺中", "雙北", "自殺", "跳樓", "死亡", "兇殺", "殺害", 
    "雲林", "彰化", "張麗善", "顏清標", "創意私房", "黃子佼", "陳屍", "性侵", 
    "性騷擾", "強姦",
    "兒童不當內容", "未成年", "兒少", "幼兒", "青少年", "兒童剝削", "援交", 
    "戀童", "誘拐", "人口販運", "性交易", "兒福會", "兒保", "監護不當",
    "暴力行為", "毆打", "槍擊", "持刀", "恐嚇", "威脅", "虐待", "攻擊", "毆鬥",
    "家暴", "霸凌", "血腥", "砍殺", "自殘", "綁架", "監禁", "虐童", "猥褻",
    "情色內容", "不雅照", "私密照", "露點", "限制級", "情趣用品", "性行為", 
    "裸露", "色情", "情色", "性愛", "賣淫", "性交", "勃起", "性高潮", "自慰",
    "變態", "戀物癖", "偷窺", "暴露癖", "性變態", "異常慾望", "性癖好", "SM",
    "性虐待", "人獸", "屍體", "噁心", "反胃", "嘔吐", "殘忍", "血腥暴力", 
    "閹割", "割喉", "慘不忍睹", "血跡斑斑",
    "馬英九", "朱立倫", "韓國瑜", "郭台銘", "連戰", "宋楚瑜", "洪秀柱", "蔣萬安", 
    "江啟臣", "吳敦義", "王金平", "吳斯懷", "張顯耀", "謝龍介", "林為洲", "邱毅", 
    "蔣經國", "李登輝", "柯文哲", "民眾黨", "黃珊珊", "蔡壁如", "吳欣盈", "邱臣遠", 
    "張益贍", "賴香伶", "徐立信", "陳琬惠", "苗博雅", "趙少康", "張亞中", "江湖萬", 
    "李眉蓁", "葉元之", "黃暐瀚", "黃光芹", "朱學恒", "黃創夏", "金溥聰", "李艷秋", 
    "楊實秋", "周玉蔻", "汪浩", "黃世聰", "施正鋒",
    "426", "中共", "習近平", "小熊維尼", "台獨", "港獨", "藏獨", "新疆", "維吾爾", 
    "六四", "天安門", "八九民運", "坦克人", "反送中", "香港民主", "台灣獨立", 
    "西藏獨立", "達賴喇嘛", "法輪功", "人權迫害", "言論審查", "防火長城", "翻牆", 
    "民主牆", "劉曉波", "李文亮", "武漢病毒", "中國病毒", "五毛", "小粉紅", "韭菜", 
    "辱華", "辱包", "萬聖節", "支那", "中國豬", "武統", "解放軍", "台海", "攻台", 
    "共匪", "抵制中國", "一中各表", "九二共識", "逃犯條例", "港版國安法", "新冠肺炎", 
    "病毒起源", "黑警", "滅共", "反中", "玻璃心", "戰狼外交"
];

// 頁面加載時讀取關鍵字
document.addEventListener('DOMContentLoaded', function() {
    loadKeywords();
});

// 從localStorage讀取關鍵字，或使用默認關鍵字
function loadKeywords() {
    // 嘗試從localStorage讀取
    const savedKeywords = localStorage.getItem('encodeKeywords');
    
    if (savedKeywords) {
        // 如果localStorage有存儲的關鍵字，直接使用
        keywordsList = JSON.parse(savedKeywords);
    } else {
        // 使用預設關鍵字列表
        keywordsList = [...DEFAULT_KEYWORDS];
        // 保存到localStorage以便未來使用
        localStorage.setItem('encodeKeywords', JSON.stringify(keywordsList));
    }
    
    updateKeywordsTextarea();
}

// 更新關鍵字文本框
function updateKeywordsTextarea() {
    document.getElementById('keywords').value = keywordsList.join(';');
    autoResize(document.getElementById('keywords'));
}

// 新增關鍵字 (添加安全處理)
function addKeyword() {
    const newKeywordInput = document.getElementById('newKeyword');
    let newKeyword = newKeywordInput.value.trim();
    
    // 安全處理：移除可能的HTML標籤和JavaScript代碼
    newKeyword = newKeyword.replace(/<[^>]*>/g, '');
    
    if (newKeyword && !keywordsList.includes(newKeyword)) {
        keywordsList.push(newKeyword);
        // 保存到localStorage
        localStorage.setItem('encodeKeywords', JSON.stringify(keywordsList));
        updateKeywordsTextarea();
        newKeywordInput.value = '';
        
        // 顯示成功訊息
        alert(`已新增關鍵字：${newKeyword}`);
    } else if (keywordsList.includes(newKeyword)) {
        alert('此關鍵字已存在！');
    } else {
        alert('請輸入有效的關鍵字！');
    }
}

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

// 儲存編輯後的關鍵字
function saveKeywords() {
    const keywordsText = document.getElementById('keywords').value;
    // 分割文本並過濾空字串
    keywordsList = keywordsText.split(';')
                   .map(k => k.trim())
                   .filter(k => k !== '');
    
    // 去重複
    keywordsList = [...new Set(keywordsList)];
    
    // 保存到 localStorage
    localStorage.setItem('encodeKeywords', JSON.stringify(keywordsList));
    
    // 更新顯示
    updateKeywordsTextarea();
    
    alert('關鍵字已儲存！');
}

// 重設為預設關鍵字
function resetKeywords() {
    if (confirm('確定要重設為預設關鍵字嗎？這將會清除您所有自定義的關鍵字。')) {
        keywordsList = [...DEFAULT_KEYWORDS];
        localStorage.setItem('encodeKeywords', JSON.stringify(keywordsList));
        updateKeywordsTextarea();
        alert('已重設為預設關鍵字！');
    }
}

// 更新文本框顯示 (調整一下將關鍵字排序和美化顯示)
function updateKeywordsTextarea() {
    // 排序關鍵字並格式化
    document.getElementById('keywords').value = keywordsList.join(';');
    autoResize(document.getElementById('keywords'));
}