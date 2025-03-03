// 新聞標題驚悚化函數
function transformNewsTitle() {
  let inputTitle = document.getElementById("newsTitle").value;
  let outputElement = document.getElementById("shockingTitle");
  let rightContent = document.getElementById("rightContent");

  if (!inputTitle.trim()) {
    alert("請輸入新聞標題");
    return;
  }

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

  // 隨機選擇開頭和結尾關鍵字
  const startKeyword =
    shocking_title_keywords_restructured.opening_keywords[
      Math.floor(
        Math.random() *
          shocking_title_keywords_restructured.opening_keywords.length
      )
    ];
  const endKeyword =
    shocking_title_keywords_restructured.ending_keywords[
      Math.floor(
        Math.random() *
          shocking_title_keywords_restructured.ending_keywords.length
      )
    ];

  // 將輸入的文字放在中間
  const titleText = inputTitle.trim();

  // 組合成一行 (用於文本框顯示)
  const transformedTitle = `【${startKeyword} ${titleText} ${endKeyword}】`;

  // 更新輸出框
  outputElement.value = transformedTitle;
  outputElement.style.height = "auto";
  outputElement.style.height = outputElement.scrollHeight + "px";

  // 更新右側直書顯示
  rightContent.innerHTML = "";
  const textContainer = createTitleContainer(transformedTitle, true);
  rightContent.appendChild(textContainer);
  maximizeFontSize(textContainer, rightContent);

  return transformedTitle;
}

// 自動調整字體大小以適應直書容器
function adjustFontSizeForVertical(container) {
  // 獲取直書元素
  const verticalText = container.querySelector("div > div");
  if (!verticalText) return;

  // 獲取容器尺寸
  const containerHeight = container.offsetHeight;
  const containerWidth = container.offsetWidth;

  // 設置初始字體大小
  let fontSize = 24; // 起始字體大小
  verticalText.style.fontSize = fontSize + "px";

  // 檢查是否超出容器
  function isTooBig() {
    return (
      verticalText.offsetHeight > containerHeight * 0.95 ||
      verticalText.offsetWidth > containerWidth * 0.95
    );
  }

  // 縮小字體直到適合容器
  while (isTooBig() && fontSize > 12) {
    fontSize -= 1;
    verticalText.style.fontSize = fontSize + "px";
  }

  // 嘗試放大字體
  let canIncrease = true;
  while (canIncrease && fontSize < 36) {
    fontSize += 1;
    verticalText.style.fontSize = fontSize + "px";

    if (isTooBig()) {
      fontSize -= 1;
      verticalText.style.fontSize = fontSize + "px";
      canIncrease = false;
    }
  }
}

// 複製驚悚化標題到剪貼簿
function copyShockingTitleToClipboard() {
  const outputTitle = document.getElementById("shockingTitle");
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

// 將文字轉換為直書格式
function convertToVertical(text) {
  // 先進行日期格式轉換
  text = convertDateFormat(text);

  // 先進行全形轉換
  text = halfToFull(text);

  // 將標點符號轉換為直書版本
  text = convertPunctuationToVertical(text);

  return text;
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

// 半形轉全形函數
function halfToFull(text) {
  // 先進行 UTF-8 轉換
  text = toUTF8(text);

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

  // 處理兩位數以上的數字
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
    }
    return match; // 超過兩位數則保持原樣
  });

  // 處理其他字符的全形轉換
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code === 32) {
        return "　";
      } else if (code >= 33 && code <= 126) {
        return String.fromCharCode(code + 65248);
      }
      return char;
    })
    .join("");
}

// 添加 toUTF8 函數
function toUTF8(text) {
  try {
    return decodeURIComponent(encodeURIComponent(text));
  } catch (e) {
    console.error("UTF-8 轉換錯誤:", e);
    return text;
  }
}

// 標點符號轉換函數 - 將橫書標點轉為直書標點
function convertPunctuationToVertical(text) {
  const horizontalToVertical = {
    // 基本標點
    "。": "︒", // U+FE12 直書句號
    "、": "︑", // U+FE11 直書頓號
    "，": "︐", // U+FE10 直書逗號
    "．": "・", // U+30FB 間隔號
    "：": "︓", // U+FE13 直書冒號
    "；": "︔", // U+FE14 直書分號
    "！": "︕", // U+FE15 直書驚嘆號
    "？": "︖", // U+FE16 直書問號
    "‧": "·", // U+00B7 間隔號

    // 括號類
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

  // 需要特殊定位的標點符號
  const specialPunctuation = {
    "︒": "period", // 句號
    "︑": "pause", // 頓號
    "︐": "comma", // 逗號
    "︓": "colon", // 冒號
    "︔": "semicolon", // 分號
    "︕": "exclaim", // 驚嘆號
    "︖": "question", // 問號
    "﹁": "quote-left", // 左單引號
    "﹂": "quote-right", // 右單引號
    "﹃": "quote-left", // 左雙引號
    "﹄": "quote-right", // 右雙引號
    "︻": "bracket-left", // 左黑方括號
    "︼": "bracket-right", // 右黑方括號
    "︽": "book-left", // 左書名號
    "︾": "book-right", // 右書名號
    "︿": "angle-left", // 左角括號
    "﹀": "angle-right", // 右角括號
  };

  // 將文字轉換為帶有樣式類的 span 元素
  return text
    .split("")
    .map((char) => {
      const vertical = horizontalToVertical[char] || char;
      if (specialPunctuation[vertical]) {
        return `<span class="vpunct ${specialPunctuation[vertical]}">${vertical}</span>`;
      }
      return vertical;
    })
    .join("");
}

// 修改 transformText 函數
function transformText(text, options = {}) {
  // 移除所有半形空白
  text = text.replace(/ /g, "");

  // 轉換日期格式（在移除 emoji 之前處理）
  text = convertDateFormat(text);

  // 移除 emoji
  text = text.replace(
    /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu,
    ""
  );

  // 處理短段落
  let paragraphs = text.split("\n");
  let mergedParagraphs = [];
  let currentParagraph = "";
  let currentLength = 0;

  for (let paragraph of paragraphs) {
    paragraph = paragraph.trim();
    if (paragraph.length === 0) continue;

    currentLength = currentParagraph.length + paragraph.length;
    if (currentLength < 120) {
      currentParagraph += paragraph;
    } else {
      if (currentParagraph) {
        mergedParagraphs.push(currentParagraph);
      }
      currentParagraph = paragraph;
    }
  }

  if (currentParagraph) {
    mergedParagraphs.push(currentParagraph);
  }

  text = mergedParagraphs.join("\n");

  // 呼叫 verticalText 進行直書轉換
  const verticalResult = verticalText(text);

  // 創建容器並設置樣式
  const container = document.createElement("div");
  container.style.writingMode = "vertical-rl";
  container.style.textOrientation = "upright";
  container.style.height = "100%";
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.justifyContent = "space-between";
  container.style.fontFamily =
    '"Microsoft JhengHei Light", "微軟正黑體 Light", sans-serif';
  container.innerHTML = verticalResult;

  return container;
}

// 從 vertical_script.js 導入的函數
function verticalText(input) {
  const result = document.getElementById("byCharsOption").checked
    ? byChars(input)
    : byLines(input);
  return result;
}

function byChars(text) {
  const charsPerLine = parseInt(document.getElementById("charsPerLine").value);

  // 將文字分段，並移除空段落
  const paragraphs = text.split("\n").filter((p) => p.trim().length > 0);
  const allResults = [];

  for (let paragraph of paragraphs) {
    // 轉換為全形並處理標點符號
    paragraph = convertPunctuationToVertical(halfToFull(paragraph));

    // 計算當前段落需要的行數
    const totalLines = Math.ceil(paragraph.length / charsPerLine);

    // 補足空格
    while (paragraph.length < totalLines * charsPerLine) {
      paragraph += "　";
    }

    // 建立矩陣並填充
    const matrix = [];
    for (let i = 0; i < totalLines; i++) {
      matrix[i] = [];
      for (let j = 0; j < charsPerLine; j++) {
        const charIndex = i * charsPerLine + j;
        matrix[i][j] =
          charIndex < paragraph.length ? paragraph[charIndex] : "　";
      }
    }

    // 生成直書結果（從右到左，從上到下）
    const result = [];
    for (let j = 0; j < charsPerLine; j++) {
      const line = [];
      for (let i = totalLines - 1; i >= 0; i--) {
        line.push(matrix[i][j]);
      }
      result.push(line.join(""));
    }

    allResults.push(result.join("<br>"));
  }

  // 用兩個換行符號連接各段落
  return allResults.join("<br><br>");
}

function byLines(text) {
  const totalLines = parseInt(document.getElementById("totalLines").value);

  // 將文字分段，並移除空段落
  const paragraphs = text.split("\n").filter((p) => p.trim().length > 0);
  const allResults = [];

  for (let paragraph of paragraphs) {
    // 轉換為全形並處理標點符號
    paragraph = convertPunctuationToVertical(halfToFull(paragraph));

    // 計算每行應有的字數
    const charsPerLine = Math.ceil(paragraph.length / totalLines);

    // 補足空格
    while (paragraph.length < charsPerLine * totalLines) {
      paragraph += "　";
    }

    // 建立矩陣並填充
    const matrix = Array(totalLines)
      .fill()
      .map(() => Array(charsPerLine).fill("　"));

    // 填充矩陣
    let count = 0;
    for (let i = 0; i < totalLines && count < paragraph.length; i++) {
      for (let j = 0; j < charsPerLine && count < paragraph.length; j++) {
        matrix[i][j] = paragraph.charAt(count++);
      }
    }

    // 生成直書結果（從右到左，從上到下）
    const result = [];
    for (let j = 0; j < charsPerLine; j++) {
      const line = [];
      for (let i = totalLines - 1; i >= 0; i--) {
        line.push(matrix[i][j]);
      }
      result.push(line.join(""));
    }

    allResults.push(result.join("<br>"));
  }

  // 用兩個換行符號連接各段落
  return allResults.join("<br><br>");
}

// 調整字體大小以極大化填充容器
function maximizeFontSize(element, container) {
  // 移除 nowrap 設置，允許換行
  element.style.whiteSpace = "normal";

  // 獲取容器尺寸
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  // 設置初始字體大小
  let fontSize = 24;
  element.style.fontSize = fontSize + "px";

  // 檢查元素是否超出容器
  function isOverflowing() {
    return (
      element.scrollWidth > containerWidth ||
      element.scrollHeight > containerHeight
    );
  }

  // 增加字體大小直到填滿容器但不溢出
  while (!isOverflowing() && fontSize < 200) {
    fontSize += 2;
    element.style.fontSize = fontSize + "px";
  }

  // 如果溢出，回退一步
  if (isOverflowing()) {
    fontSize -= 2;
    element.style.fontSize = fontSize + "px";
  }

  // 設置行高為1.2以改善可讀性
  element.style.lineHeight = "1.2";

  // 確保 strong 標籤內的文字保持粗體
  const strongElements = element.getElementsByTagName("strong");
  for (let strong of strongElements) {
    strong.style.fontWeight = "bold";
  }
}

// 添加一個函數來解析驚悚化標題
function parseShockingTitle(title) {
  // 移除【】
  title = title.replace(/【|】/g, "");

  // 嘗試找出原始標題（在兩個關鍵詞之間的部分）
  const parts = title.split(" ");

  if (parts.length >= 3) {
    // 假設格式為 "開頭關鍵詞 原始標題 結尾關鍵詞"
    const start = parts[0];
    const end = parts[parts.length - 1];
    const middle = parts.slice(1, parts.length - 1).join(" ");

    return { start, middle, end };
  }

  // 如果無法解析，返回整個標題作為中間部分
  return { start: "", middle: title, end: "" };
}

// 生成並下載圖片
function generateAndDownloadImage() {
  const contentArea = document.getElementById("contentArea");
  html2canvas(contentArea).then((canvas) => {
    const link = document.createElement("a");
    link.download = "新聞直書圖片.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

// 創建標題容器的通用函數
function createTitleContainer(title, isShockingTitle = false) {
  const textContainer = document.createElement("div");
  textContainer.style.writingMode = "vertical-rl";
  textContainer.style.textOrientation = "upright";
  textContainer.style.width = "100%";
  textContainer.style.height = "100%";
  textContainer.style.display = "flex";
  textContainer.style.alignItems = "stretch";
  textContainer.style.justifyContent = "center";
  textContainer.style.fontFamily =
    '"Microsoft JhengHei Light", "微軟正黑體 Light", sans-serif';

  let startText, middleText, endText;

  if (isShockingTitle) {
    const titleParts = parseShockingTitle(title);
    startText = `【${titleParts.start} `;
    middleText = titleParts.middle;
    endText = ` ${titleParts.end}】`;
  } else {
    startText = "【";
    middleText = title;
    endText = "】";
  }

  // 創建單一文字元素
  const textElement = document.createElement("div");
  textElement.style.display = "inline-block";

  // 組合文字內容，使用 strong 標籤使中間文字變粗
  const combinedText = `
        ${convertPunctuationToVertical(halfToFull(startText))}
        <strong>${convertPunctuationToVertical(halfToFull(middleText))}</strong>
        ${convertPunctuationToVertical(halfToFull(endText))}
    `;

  textElement.innerHTML = combinedText;

  // 添加到容器
  textContainer.appendChild(textElement);

  return textContainer;
}

// 添加計算每行字數的函數
function calculateCharsPerLine(containerHeight, fontSize) {
  // 假設每個字的高度是 fontSize * 1.5 (考慮行距)
  const charHeight = fontSize * 1.5;
  // 計算可以容納的字數
  const charsPerLine = Math.floor(containerHeight / charHeight);
  // 確保字數在合理範圍內（6-20字）
  return Math.min(Math.max(charsPerLine, 6), 20);
}

// 修改 initializeLayout 函數
function initializeLayout() {
  const leftContent = document.getElementById("leftContent");
  const charsize = parseInt(document.getElementById("charsize").value);
  leftContent.innerHTML = "";

  // 創建單一文本區域容器
  const textareaContainer = document.createElement("div");
  textareaContainer.style.flex = "1";
  textareaContainer.style.display = "flex";
  textareaContainer.style.flexDirection = "row";
  textareaContainer.style.gap = "10px";

  // 創建文本區域
  const textarea = document.createElement("textarea");
  textarea.className = "grid-textarea";
  textarea.placeholder = "請複製貼上要轉換的文字...";
  textarea.style.width = "100%";
  textarea.style.height = "100%";
  textarea.style.border = "none";
  textarea.style.resize = "none";
  textarea.style.padding = "10px";
  textarea.style.fontFamily = "inherit";
  textarea.style.fontSize = `${charsize}px`;
  textarea.style.boxSizing = "border-box";

  // 創建轉換按鈕
  const convertButton = document.createElement("button");
  convertButton.textContent = "轉換直書";
  convertButton.style.width = "80px";
  convertButton.style.height = "30px";
  convertButton.style.alignSelf = "flex-start";
  convertButton.style.marginTop = "10px";
  convertButton.style.fontSize = "14px";
  convertButton.style.padding = "5px";

  // 添加轉換按鈕點擊事件
  convertButton.addEventListener("click", function () {
    const text = textarea.value.trim();
    if (text) {
      const verticalContainer = transformText(text);
      verticalContainer.className = "vertical-content";
      verticalContainer.style.fontSize = `${charsize}px`;
      verticalContainer.style.marginTop = "10px";

      // 清除現有的直書顯示
      const existingVertical =
        textareaContainer.querySelector(".vertical-content");
      if (existingVertical) {
        existingVertical.remove();
      }

      // 添加新的直書顯示
      textareaContainer.appendChild(verticalContainer);
    }
  });

  textareaContainer.appendChild(textarea);
  textareaContainer.appendChild(convertButton);
  leftContent.appendChild(textareaContainer);
}

// 修改 clearContent 函數
function clearContent() {
  const leftContent = document.getElementById("leftContent");
  const textarea = leftContent.querySelector("textarea");
  if (textarea) {
    textarea.value = ""; // 清空文本內容
  }
  
  // 移除已轉換的直書內容
  const verticalContent = leftContent.querySelector(".vertical-content");
  if (verticalContent) {
    verticalContent.remove();
  }
}

// 修改 clearContent 按鈕事件
clearContentButton.addEventListener("click", function() {
  clearContent();
});

// 修改 DOMContentLoaded 事件監聽器
document.addEventListener("DOMContentLoaded", function () {
  // 獲取元素
  const blockCountInput = document.getElementById("blockCount");
  const lineLengthInput = document.getElementById("lineLength");
  const titleWidthSelect = document.getElementById("titleWidth");
  const generateLayoutButton = document.getElementById("generateLayout");
  const downloadImageButton = document.getElementById("downloadImage");
  const newsTitleInput = document.getElementById("newsTitle");
  const rightContent = document.getElementById("rightContent");

  // 設置標題寬度
  function updateTitleWidth() {
    const titleWidth = titleWidthSelect.value;
    document.documentElement.style.setProperty(
      "--title-width",
      titleWidth + "%"
    );
  }

  // 初始化時設置寬度
  updateTitleWidth();

  // 監聽寬度選擇變化
  titleWidthSelect.addEventListener("change", updateTitleWidth);

  // 初始化布局
  generateLayout();

  // 監聽新聞標題輸入
  newsTitleInput.addEventListener("input", function () {
    const inputTitle = this.value.trim();
    rightContent.innerHTML = "";

    if (inputTitle) {
      const textContainer = createTitleContainer(inputTitle);
      rightContent.appendChild(textContainer);
      maximizeFontSize(textContainer, rightContent);
    } else {
      rightContent.innerHTML = `
            <div style="writing-mode: vertical-rl; text-orientation: upright; width: 100%; height: 100%; 
                display: flex; align-items: center; justify-content: center;
                font-family: 'Microsoft JhengHei Light', '微軟正黑體 Light', sans-serif;
                font-weight: normal;">
                請輸入標題
            </div>`;
    }
  });

  // 排版生成按鈕點擊事件
  generateLayoutButton.addEventListener("click", generateLayout);

  // 生成圖片下載按鈕點擊事件
  downloadImageButton.addEventListener("click", generateAndDownloadImage);

  // 添加驚悚化按鈕事件監聽器
  const transformTitleBtn = document.getElementById("transformTitleBtn");
  if (transformTitleBtn) {
    transformTitleBtn.addEventListener("click", transformNewsTitle);
  }

  // 監聽左側文本輸入
  const leftContentInput = document.getElementById("leftContentInput");
  leftContentInput.addEventListener("input", function () {
    if (this.value.trim()) {
      generateLayout();
    }
  });

  // 監聽直書規則選項變化
  document
    .getElementById("byLinesOption")
    .addEventListener("change", generateLayout);
  document
    .getElementById("byCharsOption")
    .addEventListener("change", generateLayout);
  document
    .getElementById("totalLines")
    .addEventListener("input", generateLayout);
  document
    .getElementById("charsPerLine")
    .addEventListener("input", generateLayout);

  // 初始化單一文本區域布局
  initializeLayout();

  // 文章清空按鈕點擊事件
  const clearContentButton = document.getElementById("clearContent");
  clearContentButton.addEventListener("click", function () {
    initializeLayout();
  });
});
