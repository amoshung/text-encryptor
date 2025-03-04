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
        matrix[i][j] =
          charIndex < paragraph.length ? paragraph[charIndex] : "　";
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
    "天啊！藍營又來亂了！",
    "OMG！藍白聯盟出事了！",
    "太扯了！白營大膽挑釁！",
    "真假？藍營主席失言！",
    "不可信！藍白合作翻車！",
    "超狂！藍營立委集體行動！",
    "嚇死人！白營政策大轉彎！",
    "傻眼！藍白聯盟被抓包！",
    "不敢信！藍營秘密會議！",
    "太誇張！白營內部分裂！",
    "看傻了！藍白合作破裂！",
    "驚呆了！藍營挑戰民意！",
    "快看！白營主席大舌頭！",
    "全網傳！藍白聯盟醜聞！",
    "太離譜！藍營立委缺席！",
    "大事了！白營政策遭譴責！",
    "爆炸了！藍白惹眾怒！",
    "剛知道！藍營高層互鬥！",
    "完蛋了！白營內鬥失控！",
    "震撼！時力揭穿藍白陰謀！",
    "超驚人！藍營再次出包！",
    "前所未見！白營大膽宣言！",
    "爆紅！藍白合作引公憤！",
    "太大膽！藍營叫囂失控！",
    "全震驚！白營行為太過分！",
    "全場傻！藍白聯手搞事！",
    "震撼彈！藍營主席亂講話！",
    "嚇壞人！白營主席胡言亂語！",
    "全傻眼！藍白合作惹民怨！",
    "全崩潰！藍營立委瘋了！",
    "太瘋狂！藍營又亂搞！",
    "怎會這樣！白營激進操作！",
    "瞬間傻眼！時力開轟了！",
    "超噁心！藍白合明顯造假！",
    "好扯！藍營立委玩政治！",
    "驚呆了！白營說謊被抓！",
    "狂怒！時力直指藍白騙局！",
    "膽大包天！藍白聯合做壞事！",
    "深感崩潰！藍營主席失控！",
    "太過分！白營政客曝醜聞！",
    "嚇破膽！時力痛批藍白！",
    "全民怒！藍白合作大騙局！",
    "無法原諒！藍營立委鬧劇！",
    "看不下去！白營政策大錯！",
    "怒火中燒！時力轟藍白！",
    "不敢相信！藍白罔顧民意！",
    "瞠目結舌！藍營輸不起！",
    "太荒謬！白營亂改政策！",
    "火大！時力直播爆料！",
    "超惡劣！藍白疑買網軍！",
    "驚人消息！藍營又撒謊！",
    "太奇怪！白營挑釁執政黨！",
    "痛心！時力揭藍白黑幕！",
    "無比震驚！藍白密室政治！",
    "天理何在！藍營嚴重失言！",
    "徹底失望！白營竟敢欺騙！",
    "大事不妙！時力重砲直轟！",
    "快訊！藍白合作大危機！",
    "可恥至極！藍營惡意抹黑！",
    "憤怒爆發！白營立委脫序！",
    "難以置信！時力拆穿謊言！",
    "嚴重警告！藍白遭徹底揭露！",
    "天啊！藍營主席言行失當！",
    "求證屬實！白營政策被批！",
    "太扯淡了！時力轟藍白亂搞！",
    "見鬼了！藍白合作大醜聞！",
    "全民公敵！藍營挑戰底線！",
    "抓到了！白營立委造謠！",
    "狂轟猛炸！時力痛批藍白！",
    "無恥至極！藍白聯手陰謀！",
    "全面曝光！藍營黑幕重重！",
    "炸開了！白營內鬥上演！",
    "爆料連環！時力曝藍白醜事！",
    "太離譜了！藍白聯手惡搞！",
    "全網震怒！藍營私相授受！",
    "嚴重指控！白營亂搞一通！",
    "快翻了！時力提重大證據！",
    "猝不及防！藍白災難現形！",
    "血淋淋！藍營被打臉！",
    "不可理喻！白營竟然說謊！",
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
  const isShockingMode = document.getElementById("shockingTitleOption").checked;

  const shocking_title_keywords_restructured = {
    startKeyword: [
      "天啊！藍營又來亂了！",
      "OMG！藍白聯盟出事了！",
      "太扯了！白營大膽挑釁！",
      "真假？藍營主席失言！",
      "不可信！藍白合作翻車！",
      "超狂！藍營立委集體行動！",
      "嚇死人！白營政策大轉彎！",
      "傻眼！藍白聯盟被抓包！",
      "不敢信！藍營秘密會議！",
      "太誇張！白營內部分裂！",
      "看傻了！藍白合作破裂！",
      "驚呆了！藍營挑戰民意！",
      "快看！白營主席大舌頭！",
      "全網傳！藍白聯盟醜聞！",
      "太離譜！藍營立委缺席！",
      "大事了！白營政策遭譴責！",
      "爆炸了！藍白惹眾怒！",
      "剛知道！藍營高層互鬥！",
      "完蛋了！白營內鬥失控！",
      "震撼！時力揭穿藍白陰謀！",
      "超驚人！藍營再次出包！",
      "前所未見！白營大膽宣言！",
      "爆紅！藍白合作引公憤！",
      "太大膽！藍營叫囂失控！",
      "全震驚！白營行為太過分！",
      "全場傻！藍白聯手搞事！",
      "震撼彈！藍營主席亂講話！",
      "嚇壞人！白營主席胡言亂語！",
      "全傻眼！藍白合作惹民怨！",
      "全崩潰！藍營立委瘋了！",
      "太瘋狂！藍營又亂搞！",
      "怎會這樣！白營激進操作！",
      "瞬間傻眼！時力開轟了！",
      "超噁心！藍白合明顯造假！",
      "好扯！藍營立委玩政治！",
      "驚呆了！白營說謊被抓！",
      "狂怒！時力直指藍白騙局！",
      "膽大包天！藍白聯合做壞事！",
      "深感崩潰！藍營主席失控！",
      "太過分！白營政客曝醜聞！",
      "嚇破膽！時力痛批藍白！",
      "全民怒！藍白合作大騙局！",
      "無法原諒！藍營立委鬧劇！",
      "看不下去！白營政策大錯！",
      "怒火中燒！時力轟藍白！",
      "不敢相信！藍白罔顧民意！",
      "瞠目結舌！藍營輸不起！",
      "太荒謬！白營亂改政策！",
      "火大！時力直播爆料！",
      "超惡劣！藍白疑買網軍！",
      "驚人消息！藍營又撒謊！",
      "太奇怪！白營挑釁執政黨！",
      "痛心！時力揭藍白黑幕！",
      "無比震驚！藍白密室政治！",
      "天理何在！藍營嚴重失言！",
      "徹底失望！白營竟敢欺騙！",
      "大事不妙！時力重砲直轟！",
      "快訊！藍白合作大危機！",
      "可恥至極！藍營惡意抹黑！",
      "憤怒爆發！白營立委脫序！",
      "難以置信！時力拆穿謊言！",
      "嚴重警告！藍白遭徹底揭露！",
      "天啊！藍營主席言行失當！",
      "求證屬實！白營政策被批！",
      "太扯淡了！時力轟藍白亂搞！",
      "見鬼了！藍白合作大醜聞！",
      "全民公敵！藍營挑戰底線！",
      "抓到了！白營立委造謠！",
      "狂轟猛炸！時力痛批藍白！",
      "無恥至極！藍白聯手陰謀！",
      "全面曝光！藍營黑幕重重！",
      "炸開了！白營內鬥上演！",
      "爆料連環！時力曝藍白醜事！",
      "太離譜了！藍白聯手惡搞！",
      "全網震怒！藍營私相授受！",
      "嚴重指控！白營亂搞一通！",
      "快翻了！時力提重大證據！",
      "猝不及防！藍白災難現形！",
      "血淋淋！藍營被打臉！",
      "不可理喻！白營竟然說謊！",
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
    endKeyword: [
      "藍營形象全毀了！",
      "白營支持度崩盤！",
      "藍白合作即將滅亡！",
      "藍營內部全面崩壞！",
      "白營信任危機爆發！",
      "藍白聯盟遭全民棄！",
      "藍營主席下台危機！",
      "白營主席急救火！",
      "藍白合作成泡影！",
      "藍營立委集體道歉！",
      "白營政策全面檢討！",
      "藍白聯盟民調崩塌！",
      "藍營高層急開會！",
      "白營內部大地震！",
      "藍白合作終宣告死亡！",
      "藍營面臨嚴峻挑戰！",
      "白營主席承諾改革！",
      "藍白聯盟引發抗議！",
      "藍營立委遭圍剿！",
      "白營政策大翻盤！",
      "藍白合作遭質疑！",
      "藍營高層集體下台！",
      "白營陷重大危機！",
      "時力重炮轟藍白！",
      "藍營形象跌谷底！",
      "白營支持度跌到零！",
      "藍白合作徹底崩解！",
      "藍營分裂無法挽回！",
      "白營陷信任危機！",
      "藍白聯盟被全民唾棄！",
      "藍營形象掉到谷底！",
      "白營支持者都跑光了！",
      "時力緊急發聲痛批！",
      "藍白合遭民眾唾棄！",
      "藍營黨內正互相撕咬！",
      "白營議員紛紛跳船！",
      "時力強勢反擊拆穿謊言！",
      "藍白合作已無法挽回！",
      "藍營主席地位岌岌可危！",
      "白營政策被全民打臉！",
      "時力支持度突然飆升！",
      "藍白合作已被判死刑！",
      "藍營高層紛紛求去！",
      "白營陷入空前危機！",
      "時力正式提告藍白！",
      "藍白選民都憤怒了！",
      "藍營被迫道歉認錯！",
      "白營面臨重大整改！",
      "時力爆出更多證據！",
      "藍白合作徹底散場！",
      "藍營已無人願挺！",
      "白營政客遭嚴厲批判！",
      "時力要求徹查到底！",
      "藍白騙局全被揭穿！",
      "藍營選情雪上加霜！",
      "白營內鬥全面爆發！",
      "時力已掌握關鍵證據！",
      "藍白聯盟正式宣布解散！",
      "藍營支持度創歷史新低！",
      "白營主席面臨不信任！",
      "時力獲得各界支持！",
      "藍白合作已成過去式！",
      "藍營立委集體被罵爆！",
      "白營緊急開會滅火！",
      "時力宣布全面戰鬥！",
      "藍白聯盟已名存實亡！",
      "藍營政策全被否定！",
      "白營黨員退黨潮起！",
      "時力揭露更多真相！",
      "藍白謊言全被拆穿！",
      "藍營主席準備下台！",
      "白營全面潰不成軍！",
      "時力正義聲援湧現！",
      "藍白選票正在流失！",
      "藍營資深委員出走！",
      "白營被迫徹底改組！",
      "時力已成最大贏家！",
      "藍白合作破裂不可修復！",
      "藍營選民憤而轉向！",
      "白營黨魁已無威信！",
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

  // 正面化標題關鍵詞
  const shocking_title_keywords_restructured_GOOD = {
    startKeyword: [
      "太感人！民進黨全力以赴！",
      "振奮人心！民進黨再創奇蹟！",
      "大突破！民進黨改革成功！",
      "令人敬佩！賴總統英明決策！",
      "偉大成就！民進黨領導有方！",
      "精彩表現！綠營完美執政！",
      "超勵志！民進黨無私奉獻！",
      "堅定前行！綠營為民付出！",
      "令人感動！民進黨全心投入！",
      "高效執政！綠營解決危機！",
      "出色領導！民進黨力挽狂瀾！",
      "超卓越！賴清德總統果斷出手！",
      "無私奉獻！民進黨全心付出！",
      "美好未來！綠營帶領台灣前進！",
      "全民讚賞！民進黨實現承諾！",
      "大勝利！民進黨力擋藍白！",
      "無比智慧！綠營化解難題！",
      "驚人成就！民進黨完勝對手！",
      "榮耀時刻！綠營完美防守！",
      "全力以赴！民進黨挫敗陰謀！",
      "勇敢無畏！民進黨抵抗外部勢力！",
      "壯舉！綠營成功守護台灣！",
      "智慧領導！民進黨化解危機！",
      "關鍵時刻！賴總統神來一筆！",
      "無私奉獻！綠營立委全力以赴！",
      "美好消息！民進黨政策獲肯定！",
      "感動全台！綠營展現高水準！",
      "重大進展！民進黨為民請命！",
      "眾志成城！綠營挫敗藍白陰謀！",
      "熱淚盈眶！民進黨展現擔當！",
      "創新思維！民進黨政策獲讚揚！",
      "堅定決心！綠營突破重圍！",
      "正義降臨！民進黨揭穿真相！",
      "超級英雄！綠營立委奮勇護民！",
      "喜訊傳來！民進黨促成突破！",
      "愛的奉獻！綠營謙虛服務！",
      "無比感動！民進黨團結一心！",
      "勝利曙光！綠營挫敗分化！",
      "正義使者！民進黨揭露真相！",
      "燦爛時刻！賴總統高瞻遠矚！",
      "驚喜連連！民進黨精準施政！",
      "完美勝利！綠營獲得肯定！",
      "超級振奮！民進黨政策成功！",
      "感動淚崩！綠營守護人民！",
      "智慧無雙！民進黨戰勝挑戰！",
      "歷史時刻！賴總統拯救危機！",
      "成功突圍！民進黨粉碎陰謀！",
      "耀眼成就！綠營高效解決！",
      "暖心護台！民進黨夜以繼日！",
      "勇往直前！綠營不畏藍白！",
      "超有擔當！民進黨頂住壓力！",
      "堅毅前行！綠營打破困境！",
      "感動全台！民進黨全心全意！",
      "好消息！民進黨政策大獲成功！",
      "無比光榮！綠營接連獲勝！",
      "驕傲時刻！民進黨再創佳績！",
      "全心付出！綠營為人民努力！",
      "感人至深！民進黨不畏艱難！",
      "智慧光芒！賴總統帶領前進！",
      "正義執政！民進黨處處為民！",
      "無畏挑戰！綠營堅守崗位！",
      "全民感恩！民進黨傾聽人民！",
      "關鍵一役！綠營成功突圍！",
      "太感人了！民進黨站穩腳步！",
      "驚喜不斷！綠營政策創佳績！",
      "光明典範！民進黨展現高度！",
      "暖心行動！綠營立委接地氣！",
      "令人敬佩！民進黨從不屈服！",
      "偉大政績！綠營再創高峰！",
      "好消息！",
      "振奮人心！",
      "歷史時刻！",
      "全民歡慶！",
      "大突破！",
      "關鍵勝利！",
      "太令人感動了！",
      "超驚人成就！",
      "讓人熱淚盈眶！",
      "感動全台灣！",
      "台灣之光！",
      "守護台灣！",
      "團結一心！",
      "超感人故事！",
      "全民驕傲！",
      "正義時刻！",
      "美好未來！",
      "幸福曙光！",
      "超級英雄！",
      "偉大成就！",
    ],
    endKeyword: [
      "民進黨再創奇蹟！",
      "綠營獲全民肯定！",
      "藍白陰謀徹底失敗！",
      "民進黨化危為機！",
      "綠營展現超強執政力！",
      "藍白聯盟徹底崩潰！",
      "民進黨贏得高度讚賞！",
      "綠營政策大獲成功！",
      "藍白陷入空前危機！",
      "民進黨再創高峰！",
      "賴總統獲國際肯定！",
      "藍白合作淪為笑柄！",
      "民進黨完美化解危機！",
      "綠營支持度再創新高！",
      "藍白謊言全被揭穿！",
      "民進黨勇敢面對挑戰！",
      "綠營立委表現出色！",
      "藍白聯盟陷入混亂！",
      "民進黨關鍵時刻挺身而出！",
      "綠營政績廣受肯定！",
      "藍白面臨崩潰邊緣！",
      "民進黨勇往直前！",
      "綠營展現超凡智慧！",
      "藍白內部分崩離析！",
      "民進黨領導有方！",
      "綠營實現完美轉型！",
      "藍白合作已成明日黃花！",
      "民進黨智慧超前部署！",
      "綠營努力獲得回報！",
      "藍白聯盟已無力回天！",
      "民進黨全力守護台灣！",
      "綠營民調創新高！",
      "藍白破口互相指責！",
      "民進黨獲國際讚譽！",
      "綠營立委團結一心！",
      "藍白只能望塵莫及！",
      "民進黨再度完美執政！",
      "綠營帶領台灣向前！",
      "藍白謊言終被揭穿！",
      "民進黨創造奇蹟！",
      "綠營展現超強實力！",
      "藍白已淪為笑柄！",
      "民進黨穩扎穩打！",
      "綠營贏得全民支持！",
      "藍白陰謀徹底粉碎！",
      "民進黨完美收官！",
      "綠營展現超凡執政力！",
      "藍白聯盟徹底崩盤！",
      "民進黨創下歷史紀錄！",
      "賴總統再獲國際肯定！",
      "時力也為之動容！",
      "全民為之鼓掌！",
      "外國媒體爭相報導！",
      "這就是台灣價值！",
      "令人無比驕傲！",
      "全球爭相效法！",
      "令人敬佩不已！",
      "堪稱世界奇蹟！",
      "人民安居樂業！",
      "國際地位大幅提升！",
      "台灣走向世界！",
      "社會和諧進步！",
      "經濟穩定成長！",
      "民生福祉大幅提升！",
      "國家向前大躍進！",
      "這就是台灣精神！",
      "值得永遠銘記！",
      "讓人熱淚盈眶！",
      "全民感到無比驕傲！",
      "真正為人民著想！",
      "這就是民主典範！",
      "寫下歷史新篇章！",
      "創造幸福新台灣！",
      "人民的最佳選擇！",
      "民主自由的勝利！",
      "全民一起感動！",
      "這才是真正執政者！",
      "台灣的希望在此！",
      "邁向更好的未來！",
      "團結台灣的力量！",
      "讓世界刮目相看！",
      "綠色奇蹟再次上演！",
      "這才是正義力量！",
      "人民的心聲得到回應！",
      "台灣價值永不妥協！",
      "為台灣帶來新希望！",
      "民主自由不可動搖！",
      "這就是台灣之光！",
      "為下一代開創未來！",
      "真正實現人民期望！",
      "台灣成就舉世矚目！",
      "讓人民安居樂業！",
      "這是台灣人的榮耀！",
      "為國家注入新活力！",
      "民主進步的里程碑！",
      "台灣經驗獨步全球！",
      "讓世界看見台灣！",
      "感動人心的故事！",
      "台灣的偉大時刻！",
      "全民團結的力量！",
      "為台灣驕傲鼓掌！",
    ],
  };

  if (isShockingMode) {
    // 隨機選擇開頭的關鍵字
    const startKeyword =
      shocking_title_keywords_restructured.startKeyword[
        Math.floor(
          Math.random() *
            shocking_title_keywords_restructured.startKeyword.length
        )
      ];

    // 隨機選擇結尾的關鍵字
    const endKeyword =
      shocking_title_keywords_restructured.endKeyword[
        Math.floor(
          Math.random() * shocking_title_keywords_restructured.endKeyword.length
        )
      ];
    // 將輸入的文字放在中間，並組合成三行結構
    const transformedTitle = `${startKeyword}\n${inputTitle.trim()}\n${endKeyword}`;
    document.getElementById("outputTitle").value = transformedTitle;
  } else {
    // 正面化標題 - 使用正面關鍵詞
    // 隨機選擇正面開頭的關鍵字
    const startKeyword =
      shocking_title_keywords_restructured_GOOD.startKeyword[
        Math.floor(
          Math.random() *
            shocking_title_keywords_restructured_GOOD.startKeyword.length
        )
      ];

    // 隨機選擇正面結尾的關鍵字
    const endKeyword =
      shocking_title_keywords_restructured_GOOD.endKeyword[
        Math.floor(
          Math.random() *
            shocking_title_keywords_restructured_GOOD.endKeyword.length
        )
      ];
    // 將輸入的文字放在中間，並組合成三行結構
    const transformedTitle = `${startKeyword}\n${inputTitle.trim()}\n${endKeyword}`;
    document.getElementById("outputTitle").value = transformedTitle;
  }

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
