// 檢查是否為大部分中文
function isMostlyChinese(text) {
  if (!text.trim()) {
    document.getElementById("warning").textContent = "⚠️ 請輸入文字！";
    return false;
  }
  const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
  const isChinese = chineseChars.length / text.length > 0.7;
  if (!isChinese) {
    document.getElementById("warning").textContent =
      "⚠️ 請確保輸入的文字主要為中文！";
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

  let zwsp = "\u200B"; // 零寬空格
  let result = input.split("").join(zwsp); // 插入零寬字符
  document.getElementById("outputText").value = result;
}

// 直書轉換函數
function verticalText(input) {
  const result = document.getElementById("byCharsOption").checked
    ? byChars(input)
    : byLines(input);
  return result;
}

// UTF-8 轉換函數
function toUTF8(text) {
  try {
    // 先將文字轉為 UTF-8 編碼
    return decodeURIComponent(encodeURIComponent(text));
  } catch (e) {
    console.error("UTF-8 轉換錯誤:", e);
    return text; // 如果轉換失敗，返回原始文字
  }
}

// 半形轉全形函數（更新版）
function halfToFull(text) {
  // 阿拉伯數字轉換為中文數字
  const arabicToChinese = {
    0: "零",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
    10: "十",
  };

  // 先處理兩位數以上的數字
  text = text.replace(/[0-9]+/g, (match) => {
    const num = parseInt(match);
    if (num <= 10) {
      return arabicToChinese[num];
    } else if (num < 20) {
      return "十" + (num % 10 === 0 ? "" : arabicToChinese[num % 10]);
    } else if (num < 100) {
      const tens = Math.floor(num / 10);
      const ones = num % 10;
      return (
        arabicToChinese[tens] + "十" + (ones === 0 ? "" : arabicToChinese[ones])
      );
    } else if (num < 1000) {
      const hundreds = Math.floor(num / 100);
      const tens = Math.floor((num % 100) / 10);
      const ones = num % 10;
      return (
        arabicToChinese[hundreds] +
        "百" +
        (tens === 0
          ? ones === 0
            ? ""
            : "零" + arabicToChinese[ones]
          : arabicToChinese[tens] +
            "十" +
            (ones === 0 ? "" : arabicToChinese[ones]))
      );
    }
    return match; // 超過三位數則保持原樣
  });

  // 處理其他字符的全形轉換
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    if (code === 32) {
      result += "　";
    } else if (code >= 33 && code <= 126) {
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
    // 基本標點 - 使用全形標點以確保置中
    "。": "。", // 保持原樣，因為原本就是置中的
    "、": "、", // 保持原樣，因為原本就是置中的
    "，": "，", // 保持原樣，因為原本就是置中的
    "．": "・", // U+30FB 間隔號
    "：": "：", // 保持原樣以確保置中
    "；": "；", // 保持原樣以確保置中
    "！": "！", // 保持原樣以確保置中
    "？": "？", // 保持原樣以確保置中
    "‧": "·", // U+00B7 間隔號

    // 括號類 - 保持原有的轉換
    "（": "︵", // U+FE35 直書左圓括號
    "）": "︶", // U+FE36 直書右圓括號
    "｛": "︷", // U+FE37 直書左大括號
    "｝": "︸", // U+FE38 直書右大括號
    "［": "︹", // U+FE39 直書左方括號
    "］": "︺", // U+FE3A 直書右方括號
    "【": "︻", // U+FE3B 直書左黑方括號
    "】": "︼", // U+FE3C 直書右黑方括號
    "《": "︽", // U+FE3D 直書左書名號
    "》": "︾", // U+FE3E 直書右書名號
    "〈": "︿", // U+FE3F 直書左角括號
    "〉": "﹀", // U+FE40 直書右角括號
    "「": "﹁", // U+FE41 直書左單引號
    "」": "﹂", // U+FE42 直書右單引號
    "『": "﹃", // U+FE43 直書左雙引號
    "』": "﹄", // U+FE44 直書右雙引號
    "〔": "﹝", // U+FE5D 直書左括號
    "〕": "﹞", // U+FE5E 直書右括號

    // 其他符號
    "—": "︱", // U+FE31 直書破折號
    "︱": "︱", // U+FE31 直書直線
    "╴": "︴", // U+FE34 直書波浪線
    "⋮": "︙", // U+FE19 直書垂直省略號
    "…": "︙", // U+FE19 橫式省略號轉直書
    "＿": "︳", // U+FE33 直書底線
    "～": "〜", // U+301C 波浪號
    "‥": "︰", // U+FE30 直書刪節號
  };

  return text
    .split("")
    .map((char) => horizontalToVertical[char] || char)
    .join("");
}

function byChars(input) {
  var userText = input;
  var charsPerLine = parseInt(document.getElementById("charsPerLine").value);

  // 先進行 UTF-8 和全形轉換
  userText = halfToFull(userText);

  // 將標點符號轉換為直書版本
  userText = convertPunctuationToVertical(userText);

  // 將文字分段，並移除空段落
  var paragraphs = userText.split("\n").filter((p) => p.trim().length > 0);

  // 處理每個段落並收集結果
  var allResults = [];

  for (let paragraph of paragraphs) {
    // 計算當前段落需要的行數
    var totalLines = Math.ceil(paragraph.length / charsPerLine);

    // 補足空格
    while (paragraph.length < totalLines * charsPerLine) {
      paragraph += "　";
    }

    // 建立矩陣並填充全形空格
    var matrix = [];
    for (let i = 0; i < totalLines; i++) {
      matrix[i] = [];
      for (let j = 0; j < charsPerLine; j++) {
        let charIndex = i * charsPerLine + j;
        matrix[i][j] = charIndex < paragraph.length ? paragraph[charIndex] : "　";
      }
    }

    // 生成當前段落的直書結果
    var result = [];
    for (let i = 0; i < charsPerLine; i++) {
      let line = [];
      for (let j = totalLines - 1; j >= 0; j--) {
        line.push(matrix[j][i]);
      }
      result.push(line.join(" ")); // 使用半形空格代替零寬空格
    }

    // 將當前段落的結果加入總結果
    allResults.push(result.join("\n"));
  }

  // 用兩個換行符號連接各段落的結果
  return allResults.join("\n\n");
}

function byLines(input) {
  var userText = input;
  var totalLines = parseInt(document.getElementById("totalLines").value);

  // 先進行 UTF-8 和全形轉換
  userText = halfToFull(userText);

  // 將標點符號轉換為直書版本
  userText = convertPunctuationToVertical(userText);

  // 將文字分段，並移除空段落
  var paragraphs = userText.split("\n").filter((p) => p.trim().length > 0);

  // 處理每個段落並收集結果
  var allResults = [];

  for (let paragraph of paragraphs) {
    // 計算每行應有的字數
    var charsPerLine = Math.ceil(paragraph.length / totalLines);

    // 補足空格
    while (paragraph.length < charsPerLine * totalLines) {
      paragraph += "　";
    }

    // 建立矩陣並填充全形空格
    var matrix = Array(totalLines)
      .fill()
      .map(() => Array(charsPerLine).fill("　"));

    // 填充矩陣
    var count = 0;
    for (var i = 0; i < totalLines && count < paragraph.length; i++) {
      for (var j = 0; j < charsPerLine && count < paragraph.length; j++) {
        matrix[i][j] = paragraph.charAt(count);
        count++;
      }
    }

    // 生成當前段落的結果
    var result = [];
    for (var i = 0; i < charsPerLine; i++) {
      let line = [];
      for (var j = totalLines - 1; j >= 0; j--) {
        line.push(matrix[j][i]);
      }
      result.push(line.join(" ")); // 使用半形空格代替零寬空格
    }

    // 將當前段落的結果加入總結果
    allResults.push(result.join("\n"));
  }

  // 用兩個換行符號連接各段落的結果
  return allResults.join("\n\n");
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
    outputText.style.height = "auto";
    outputText.style.height = outputText.scrollHeight + "px";
  }, 1000);
}

// 解密功能
function decrypt() {
  const input = document.getElementById("inputText").value;
  // 移除所有零寬字符
  const result = input.replace(/[\u200B-\u200D]/g, "");
  document.getElementById("outputText").value = result;
}

function transformText() {
  let input = document.getElementById("inputText").value;
  document.getElementById("warning").style.display = "none";

  // 移除所有半形空白
  input = input.replace(/ /g, "");

  // 轉換日期格式（在移除 emoji 之前處理）
  input = convertDateFormat(input);

  // 移除 emoji
  input = input.replace(
    /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu,
    ""
  );

  // 處理短段落
  let paragraphs = input.split("\n");
  let mergedParagraphs = [];
  let currentParagraph = "";
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

  input = mergedParagraphs.join("\n");

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
  outputTextarea.style.height = "auto";
  outputTextarea.style.height = outputTextarea.scrollHeight + "px";
}

function convertDateFormat(text) {
  const numberToChineseMap = {
    0: "零",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
    10: "十",
    11: "十一",
    12: "十二",
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
      let dayStr = "";
      if (dayNum <= 10) {
        dayStr = numberToChineseMap[dayNum];
      } else if (dayNum < 20) {
        dayStr =
          "十" + (dayNum % 10 === 0 ? "" : numberToChineseMap[dayNum % 10]);
      } else if (dayNum < 30) {
        dayStr =
          "二十" + (dayNum % 10 === 0 ? "" : numberToChineseMap[dayNum % 10]);
      } else {
        dayStr =
          "三十" + (dayNum % 10 === 0 ? "" : numberToChineseMap[dayNum % 10]);
      }

      return `${monthStr}月${dayStr}號`;
    }
    return match; // 如果不是有效日期，保持原樣
  });
}

function insertClickbait(text) {
  const shocking_title_keywords = [
    "震驚，",
    "驚呆，",
    "嚇壞，",
    "傻眼，",
    "不可思議，",
    "目瞪口呆，",
    "瞠目結舌，",
    "看傻了，",
    "嚇到吃手手，",
    "愣住了，",
    "驚呼連連，",
    "瞪大眼睛，",
    "太誇張，",
    "大吃一驚，",
    "嚇死人，",
    "心碎，",
    "淚崩，",
    "怒了，",
    "不忍了，",
    "痛哭流涕，",
    "崩潰，",
    "氣炸，",
    "心疼，",
    "淚灑現場，",
    "含淚，",
    "悲痛欲絕，",
    "潸然淚下，",
    "怒火中燒，",
    "滿腔怒火，",
    "喜極而泣，",
    "竟然，",
    "居然，",
    "結果出乎意料，",
    "後果不堪設想，",
    "原來如此，",
    "真相大白，",
    "結局神反轉，",
    "下場超慘，",
    "慘不忍睹，",
    "始料未及，",
    "不堪入目，",
    "出乎意料，",
    "萬萬沒想到，",
    "終於漏餡，",
    "終極真相，",
    "太可怕了，",
    "超乎想像，",
    "史上最，",
    "徹底爆炸，",
    "無法相信，",
    "前所未有，",
    "極度危險，",
    "非常誇張，",
    "難以置信，",
    "超級嚴重，",
    "天理難容，",
    "超級無敵，",
    "極度震驚，",
    "罕見，",
    "破天荒，",
    "秘密曝光，",
    "內幕揭露，",
    "你絕對想不到，",
    "終於真相了，",
    "不為人知的秘密，",
    "背後真相是，",
    "神秘面紗揭開，",
    "不可告人，",
    "鮮為人知，",
    "隱藏多年，",
    "暗藏玄機，",
    "揭開真相，",
    "驚天內幕，",
    "一手資料，",
    "獨家爆料，",
    "快訊，",
    "獨家，",
    "緊急通知，",
    "最新消息，",
    "現在才知道，",
    "即刻生效，",
    "剛剛發生，",
    "突發狀況，",
    "馬上就要，",
    "限時公開，",
    "火速傳出，",
    "晚了就沒了，",
    "搶先看，",
    "最後機會，",
    "趕快行動，",
    "本以為...沒想到，",
    "反轉，",
    "意想不到，",
    "180度大轉變，",
    "竟然大反轉，",
    "峰迴路轉，",
    "急轉直下，",
    "戲劇性的變化，",
    "出乎意料，",
    "有夠諷刺，",
    "必看，",
    "千萬不要錯過，",
    "一定要知道，",
    "趕快分享，",
    "不看後悔，",
    "速看，",
    "立即行動，",
    "不得不看，",
    "人人必懂，",
    "馬上收藏",
  ];

  let lastInsertedIndex = -1; // 用於跟踪上一次插入的位置
  const probability = parseFloat(
    document.getElementById("clickbaitProbability").value
  );

  return text
    .split("")
    .map((char, index) => {
      if (
        (char === "，" || char === "、" || char === "。") &&
        Math.random() < probability &&
        lastInsertedIndex !== index - 1
      ) {
        const randomKeyword =
          shocking_title_keywords[
            Math.floor(Math.random() * shocking_title_keywords.length)
          ];
        lastInsertedIndex = index; // 更新上一次插入的位置
        return char + randomKeyword;
      }
      return char;
    })
    .join("");
}

function insertZeroWidth(text) {
  const zwChars = ["\u200B", "\u200C", "\u200D"];
  return text
    .split("")
    .map((char) => {
      const zw = zwChars[Math.floor(Math.random() * zwChars.length)];
      return char + zw;
    })
    .join("");
}

function transformTitle() {
  let inputTitle = document.getElementById("inputTitle").value;

  const shocking_title_keywords_restructured = {
    opening_keywords: [
      "天啊！",
      "OMG！",
      "這也太扯了吧！",
      "真的嗎？",
      "我不敢相信！",
      "超狂！",
      "嚇死人了！",
      "真的假的？",
      "你沒看錯！",
      "怎麼可能！",
      "傻眼貓咪！",
      "驚呆了！",
      "快看！",
      "全網瘋傳！",
      "無法置信！",
      "大事發生了！",
      "爆炸性消息！",
      "剛剛才知道！",
      "這下完蛋了！",
      "快來看！",
      "超驚人！",
      "史無前例！",
      "爆紅！",
      "讓人直呼不可能！",
      "世界都震動了！",
      "全場安靜！",
      "OMG震撼彈！",
      "嚇得腿軟！",
      "整個傻掉！",
      "全世界都瘋了！",
      "不可置信！",
      "刷新三觀！",
      "讓人崩潰！",
      "超乎想像！",
      "沒見過這樣的！",
      "太驚悚了！",
      "無敵誇張！",
      "超級無敵爆炸！",
      "不可思議的發展！",
      "讓人懷疑人生！",
      "你絕對猜不到！",
      "這次玩大了！",
      "這下糟了！",
      "嚇破膽了！",
      "爆炸新聞！",
      "一秒驚呆！",
      "讓人說不出話！",
      "爆紅全網！",
      "大家都在討論！",
      "不敢相信自己的眼睛！",
      "這消息太驚人！",
      "全網都炸了！",
      "笑到噴淚！",
      "讓人無言以對！",
      "太震撼了！",
      "所有人都愣住！",
      "讓人雞皮疙瘩掉滿地！",
      "誇張到不行！",
      "讓人發毛！",
      "大驚失色！",
      "馬上告訴大家！",
      "驚天大新聞！",
      "世界大震撼！",
      "這個消息不得了！",
      "全場鴉雀無聲！",
      "眼睛業障重了！",
      "我腦袋當機了！",
      "超級爆炸消息！",
      "太誇張了吧！",
      "怎麼會這樣！",
      "神展開！",
      "讓人傻眼到地板！",
      "腦洞大開！",
      "全場爆笑！",
      "這是真的嗎？",
      "他一句話不忍了！",
      "她看完當場暴怒！",
      "專家都看傻了！",
      "醫生都嚇壞了！",
      "老師直接跪了！",
      "他一個動作震驚全場！",
      "她一個眼神嚇壞眾人！",
      "專家看完沉默了！",
      "他們都慌了！",
      "老闆當場摔桌子！",
      "父母看完都哭了！",
      "孩子們都嚇呆了！",
      "他一個決定改變一切！",
      "她一句話讓全場沸騰！",
      "他們都不敢相信！",
      "政府緊急出手！",
      "專家組都傻眼了！",
      "科學家無法解釋！",
      "警方立刻行動！",
      "醫院全員出動！",
      "他一個舉動讓人心碎！",
      "她的反應讓人落淚！",
      "他們的遭遇讓人心痛！",
      "老人家看完都氣炸！",
      "孩子們都嚇哭了！",
      "專家組都看呆了！",
      "研究人員都震驚了！",
      "他一個選擇毀了一切！",
      "她一個決定救了所有人！",
      "他們的發現顛覆認知！",
      "權威專家都沉默了！",
      "資深醫師都搖頭！",
      "教授們都驚呆了！",
      "他一個動作感動千萬人！",
      "她一句話讓人淚崩！",
      "他們的故事讓人窒息！",
      "老師們都看傻了！",
      "家長們都坐不住了！",
      "專家看完都冒冷汗！",
      "他一個舉動改變命運！",
      "她一個決定震撼全國！",
      "他們的行為嚇壞所有人！",
      "醫生看完都沉默了！",
      "科學家都無法理解！",
      "專家組都爭論不休！",
      "他一個發現驚動高層！",
      "她一個舉動感動全球！",
      "他們的遭遇讓人心驚！",
      "專家都不敢置信！",
      "研究人員都嚇傻了！",
    ],
    middle_keywords: [
      "哭爆！",
      "超級氣炸！",
      "心碎一地！",
      "氣到發抖！",
      "淚崩現場！",
      "笑到肚子痛！",
      "氣到不行！",
      "笑翻了！",
      "笑到噴飯！",
      "崩潰中！",
      "超難過！",
      "氣瘋了！",
      "無法控制情緒！",
      "內心奔潰！",
      "眼淚停不下來！",
      "居然是這樣！",
      "完全沒想到！",
      "結果超驚人！",
      "後果超慘！",
      "結局炸裂！",
      "天啊發生什麼事！",
      "差點暈倒！",
      "原來如此！",
      "哭笑不得！",
      "意想不到的反轉！",
      "事情大條了！",
      "情況失控！",
      "真的是大反轉！",
      "這個結果太離譜了！",
      "沒想到的發展！",
      "內幕超勁爆！",
      "背後故事太驚人！",
      "真相曝光了！",
      "笑到嘴巴合不起來！",
      "意想不到的結局！",
      "揭開神秘面紗！",
      "背後竟然這麼黑暗！",
      "事情不單純！",
      "驚人的故事！",
      "發展超爆炸！",
      "全場驚呼！",
      "反轉中的反轉！",
      "故事竟然這樣發展！",
      "真的是匪夷所思！",
      "這結果會讓你瘋掉！",
      "讓人無語！",
      "氣得冒煙！",
      "內心受傷！",
      "笑到流淚！",
      "氣到想打人！",
      "這一幕太震撼！",
      "結局讓人不寒而慄！",
      "讓人跌破眼鏡！",
      "簡直荒謬！",
      "真相讓人炸裂！",
      "世界觀大崩壞！",
      "事情變得一發不可收拾！",
      "結果讓人頭皮發麻！",
      "意料之外的發展！",
      "笑中帶淚！",
      "情緒大崩潰！",
      "結果完全失控！",
      "讓人直呼好可怕！",
      "背後原因超離奇！",
      "這情節太狗血了！",
      "他當場崩潰了！",
      "她忍不住大哭！",
      "專家立刻打電話！",
      "醫生緊急呼叫支援！",
      "老師當場跪下！",
      "他們全都嚇傻了！",
      "她的臉色瞬間變了！",
      "專家組立即開會！",
      "他們都不敢出聲！",
      "老闆直接摔了手機！",
      "父母當場淚崩！",
      "孩子們都嚇得發抖！",
      "他立刻改變主意！",
      "她的眼淚止不住！",
      "他們都不敢相信眼前的一切！",
      "政府緊急召開會議！",
      "專家組立刻趕到現場！",
      "科學家們徹夜研究！",
      "警方立即封鎖現場！",
      "醫院所有人都驚呆了！",
      "他的心都碎了！",
      "她的手都在發抖！",
      "他們的臉色都變了！",
      "老人家氣得說不出話！",
      "孩子們都嚇得哭了！",
      "專家組立刻發出警告！",
      "研究人員都不敢相信！",
      "他的決定讓所有人震驚！",
      "她的選擇讓人落淚！",
      "他們的發現讓世界震動！",
      "權威專家都搖頭嘆息！",
      "資深醫師立刻採取行動！",
      "教授們都爭相研究！",
      "他的舉動讓人淚如雨下！",
      "她的話讓全場鴉雀無聲！",
      "他們的經歷讓人毛骨悚然！",
      "老師們都驚得說不出話！",
      "家長們都憤怒地站起來！",
      "專家看完都冷汗直流！",
      "他的行為改變了一切！",
      "她的決定影響了無數人！",
      "他們的遭遇讓人心驚肉跳！",
      "醫生們都束手無策！",
      "科學家們都百思不得其解！",
      "專家組都陷入爭論！",
      "他的發現讓高層都坐不住！",
      "她的舉動感動了無數人！",
      "他們的故事讓人淚流滿面！",
      "專家都不敢相信自己的眼睛！",
      "研究人員都嚇得說不出話！",
    ],
    ending_keywords: [
      "你一定要看！",
      "絕對不會後悔！",
      "超乎你的想像！",
      "讓你目瞪口呆！",
      "真的太猛了！",
      "快點分享！",
      "錯過會後悔！",
      "一定要收藏！",
      "再不看就來不及了！",
      "現在知道還不晚！",
      "真相終於揭曉！",
      "不得不看！",
      "超震撼結局！",
      "意想不到的結尾！",
      "結局會讓你嚇傻！",
      "絕對想不到的真相！",
      "讓人毛骨悚然的故事！",
      "千萬別錯過！",
      "真相讓人背脊發涼！",
      "這個結果讓人難以忘懷！",
      "秒懂！",
      "讓你瞬間清醒！",
      "讓人沉默三秒！",
      "這波反轉絕了！",
      "結局超反轉！",
      "這次真的不一樣！",
      "馬上分享給朋友！",
      "必須轉發！",
      "你看懂了嗎？",
      "別人都知道了！",
      "驚人的結局！",
      "原來真相是這樣！",
      "超出預期的發展！",
      "最終的秘密揭開了！",
      "這個真相你絕對想不到！",
      "看到最後才知道！",
      "這結局讓人毛骨悚然！",
      "太誇張了吧！",
      "一定要告訴大家！",
      "最後一秒超反轉！",
      "你絕對猜不到的結尾！",
      "這真相簡直炸裂！",
      "笑到最後的才是贏家！",
      "讓你大開眼界！",
      "這個結局絕了！",
      "結果讓你欲罷不能！",
      "這次真的不得了！",
      "結局讓人淚流滿面！",
      "這個反轉超級精彩！",
      "最後的結果讓你震撼！",
      "別眨眼，否則錯過！",
      "這故事將永遠留在你心中！",
      "讓你久久不能平靜！",
      "結尾藏著超大彩蛋！",
      "看完心情久久不能平復！",
      "他最後的決定讓人震驚！",
      "她的真相終於大白！",
      "專家的結論讓人不寒而慄！",
      "醫生的診斷讓人絕望！",
      "老師的話讓所有人沉默！",
      "他們最後的結局讓人心碎！",
      "她最後的選擇讓人落淚！",
      "專家組的報告讓人恐懼！",
      "他們的真相終於揭曉！",
      "老闆的反應讓所有人震驚！",
      "父母的決定改變了一切！",
      "孩子們的未來因此改變！",
      "他的最後一句話讓人心碎！",
      "她的真相讓人淚崩！",
      "他們的結局讓人無法接受！",
      "政府的最終決定讓人震驚！",
      "專家組的最終報告讓人恐懼！",
      "科學家的最終發現顛覆認知！",
      "警方的調查結果讓人心寒！",
      "醫院的最終診斷讓人絕望！",
      "他的真相讓人心碎！",
      "她的結局讓人淚流滿面！",
      "他們的故事讓人久久不能平靜！",
      "老人家的話讓所有人沉默！",
      "孩子們的未來因此被改變！",
      "專家組的結論讓人不寒而慄！",
      "研究人員的發現改變了科學史！",
      "他的最終選擇讓人震驚！",
      "她的最後一刻讓人心碎！",
      "他們的真相讓世界震驚！",
      "權威專家的最終結論讓人恐懼！",
      "資深醫師的診斷讓人絕望！",
      "教授們的研究結果顛覆認知！",
      "他的最後舉動讓人淚崩！",
      "她的最終真相讓人心碎！",
      "他們的結局讓人毛骨悚然！",
      "老師們的最終決定改變了一切！",
      "家長們的反應讓人心碎！",
      "專家的最終報告讓人恐懼！",
      "他的最終結局讓人震驚！",
      "她的真相終於水落石出！",
      "他們的故事將永遠被銘記！",
      "醫生的最終診斷讓人絕望！",
      "科學家的最終發現讓人震驚！",
      "專家組的最終結論讓人恐懼！",
      "他的最後一刻讓人心碎！",
      "她的最終選擇感動了所有人！",
      "他們的真相讓人無法接受！",
      "專家的最終報告讓人不寒而慄！",
      "研究人員的最終發現改變了一切！",
    ],
  };

  // 隨機選擇開頭的兩個關鍵字
  const startKeyword1 =
    shocking_title_keywords_restructured.opening_keywords[
      Math.floor(
        Math.random() *
          shocking_title_keywords_restructured.opening_keywords.length
      )
    ];
  const startKeyword2 =
    shocking_title_keywords_restructured.opening_keywords[
      Math.floor(
        Math.random() *
          shocking_title_keywords_restructured.opening_keywords.length
      )
    ];

  // 隨機選擇結尾的兩個關鍵字
  const endKeyword1 =
    shocking_title_keywords_restructured.ending_keywords[
      Math.floor(
        Math.random() *
          shocking_title_keywords_restructured.ending_keywords.length
      )
    ];
  const endKeyword2 =
    shocking_title_keywords_restructured.ending_keywords[
      Math.floor(
        Math.random() *
          shocking_title_keywords_restructured.ending_keywords.length
      )
    ];

  // 將輸入的文字放在中間
  const middleText = inputTitle.trim();

  // 組合成三行的結構
  const transformedTitle = `${startKeyword1}\n${middleText}\n${endKeyword1}`;

  document.getElementById("outputTitle").value = transformedTitle;

  // 自動調整輸出文本框的高度
  const outputTitlearea = document.getElementById("outputTitle");
  outputTitlearea.style.height = "auto";
  outputTitlearea.style.height = outputTitlearea.scrollHeight + "px";
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
    outputTitle.style.height = "auto";
    outputTitle.style.height = outputTitle.scrollHeight + "px";
  }, 1000);
}
