let ManyouganaData = new Map([
  ["あ", "安"], ["い", "以"], ["う", "宇"], ["え", "衣"], ["お", "於"],
  ["か", "加"], ["き", "畿"], ["く", "久"], ["け", "計"], ["こ", "己"],
  ["さ", "左"], ["し", "之"], ["す", "寸"], ["せ", "世"], ["そ", "曽"],
  ["た", "太"], ["ち", "知"], ["つ", "川"], ["て", "天"], ["と", "止"],
  ["な", "奈"], ["に", "仁"], ["ぬ", "奴"], ["ね", "袮"], ["の", "乃"],
  ["は", "波"], ["ひ", "比"], ["ふ", "不"], ["へ", "部"], ["ほ", "保"],
  ["ま", "末"], ["み", "美"], ["む", "武"], ["め", "女"], ["も", "毛"],
  ["や", "也"], ["。", "。"], ["ゆ", "由"], ["、", "、"], ["よ", "与"],
  ["ら", "良"], ["り", "利"], ["る", "留"], ["れ", "礼"], ["ろ", "呂"],
  ["わ", "和"], ["ゐ", "為"], [" ", " "], ["ゑ", "恵"], ["を", "遠"],
  ["ん", "无"]
]);
const hebonsiki = {
  a: 'あ',
  b: {
    a: 'ば',
    i: 'び',
    u: 'ぶ',
    e: 'べ',
    o: 'ぼ',
    y: {
      a: 'びゃ',
      i: 'びぃ',
      u: 'びゅ',
      e: 'びぇ',
      o: 'びょ'
    }
  }
  
}

function isRomaji(str) {
  // ローマ字の正規表現パターン
  const romajiPattern = /^[A-Za-z]+$/;
  return romajiPattern.test(str);
}

let Kana = "あかさaたな"
let SplitKana = Kana.split('');
let SplitResult = [];
/*
let abc = [];
let cache = null;
for (let i = 0; i <= SplitKana.length; i++){
  if (isRomaji(SplitKana[i])){
    if (cache == null) {
      cache = hebonsiki[SplitKana[i]]
      
    }
    if (isRomaji(cache) === false) {

    }
  }else{
    abc.push(SplitKana[i])
  }
}
*/
for (let i = 0; i <= SplitKana.length; i++){//入力された文字列分繰り返す
  if (ManyouganaData.has(SplitKana[i]) === true) {
    SplitResult.push(ManyouganaData.get(SplitKana[i]))
  }else if (SplitKana.length === i) {
    SplitResult.push(SplitKana[i]);
    //かなと同じのがなかったらそのままSplitResultに追加する
  }
}
console.log(SplitResult.join(""))