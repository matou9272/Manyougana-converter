'use strict';
const ConvertButton = document.getElementById('ConvertButton');
const KanaInput = document.getElementById('KanaInput');
const result_area = document.getElementById('Result');
const rireki_area = document.getElementById('rireki_area')
const settei = {
  "hiragana": document.getElementById("Hiragana"),
  "katakana": document.getElementById("Katakana"),
  "romaji": document.getElementById("ro-maji")
};
const settei_valve = {
  "hiragana": true,
  "katakana": true,
  "romaji": true
}

let counter = 0;
let rireki = {};
//
let hiragana_ManyouganaData = new Map([
  ["あ", "安"], ["い", "以"], ["う", "宇"], ["え", "衣"], ["お", "於"],
  ["か", "加"], ["き", "畿"], ["く", "久"], ["け", "計"], ["こ", "己"],
  ["さ", "左"], ["し", "之"], ["す", "寸"], ["せ", "世"], ["そ", "曽"],
  ["た", "太"], ["ち", "知"], ["つ", "川"], ["て", "天"], ["と", "止"],
  ["な", "奈"], ["に", "仁"], ["ぬ", "奴"], ["ね", "袮"], ["の", "乃"],
  ["は", "波"], ["ひ", "比"], ["ふ", "不"], ["へ", "部"], ["ほ", "保"],
  ["ま", "末"], ["み", "美"], ["む", "武"], ["め", "女"], ["も", "毛"],
  ["や", "也"], ["ゆ", "由"], ["よ", "与"],
  ["ら", "良"], ["り", "利"], ["る", "留"], ["れ", "礼"], ["ろ", "呂"],
  ["わ", "和"], ["ゐ", "為"], ["ゑ", "恵"], ["を", "遠"],
  ["ん", "无"],

  ["ぁ", "安"], ["ぃ", "以"], ["ぅ", "宇"], ["ぇ", "衣"], ["ぉ", "於"],
  ["ゃ", "也"], ["ゅ", "由"], ["ょ", "与"], ["っ", "川"],

  ["が", "奇"], ["ぎ", "伎"], ["ぐ", "具"], ["げ", "下"], ["ご", "伍"],
  ["ざ", "社"], ["じ", "自"], ["ず", "受"], ["ぜ", "是"], ["ぞ", "俗"],
  ["だ", "陀"], ["ぢ", "遅"], ["づ", "豆"], ["で", "代"], ["ど", "土"],
  ["ば", "伐"], ["び", "鼻"], ["ぶ", "夫"], ["べ", "弁"], ["ぼ", "煩"],
  ["ぱ", "八"], ["ぴ", "火"], ["ぷ", "不"], ["ぺ", "閉"], ["ぽ", "百"]
])

let katakana_ManyouganaData = new Map([
  ["ア", "阿"], ["イ", "伊"], ["ウ", "宇"], ["エ", "江"], ["オ", "於"],
  ["カ", "加"], ["キ", "機"], ["ク", "久"], ["ケ", "介"], ["コ", "己"],
  ["サ", "散"], ["シ", "之"], ["ス", "須"], ["セ", "世"], ["ソ", "曽"],
  ["タ", "多"], ["チ", "千"], ["ツ", "川"], ["テ", "天"], ["ト", "止"],
  ["ナ", "奈"], ["ニ", "仁"], ["ヌ", "奴"], ["ネ", "袮"], ["ノ", "乃"],
  ["ハ", "八"], ["ヒ", "比"], ["フ", "不"], ["ヘ", "部"], ["ホ", "保"],
  ["マ", "末"], ["ミ", "三"], ["ム", "牟"], ["メ", "女"], ["モ", "毛"],
  ["ヤ", "也"], ["ユ", "由"], ["ヨ", "與"],
  ["ラ", "良"], ["リ", "利"], ["ル", "流"], ["レ", "礼"], ["ロ", "呂"],
  ["ワ", "和"], ["ヰ", "井"], ["ヱ", "恵"], ["ヲ", "乎"],
  ["ン", "尓"],
  
  ["ァ", "阿"], ["ィ", "伊"], ["ゥ", "宇"], ["ェ", "江"], ["ォ", "於"],
  ["ャ", "也"], ["ュ", "由"], ["ョ", "與"], ["ッ", "川"],
  
  ["ガ", "奇"], ["ギ", "伎"], ["グ", "具"], ["ゲ", "下"], ["ゴ", "伍"],
  ["ザ", "社"], ["ジ", "自"], ["ズ", "受"], ["ゼ", "是"], ["ゾ", "俗"],
  ["ダ", "陀"], ["ヂ", "遅"], ["ヅ", "豆"], ["デ", "代"], ["ド", "土"],
  ["バ", "伐"], ["ビ", "鼻"], ["ブ", "夫"], ["ベ", "弁"], ["ボ", "煩"],
  ["パ", "八"], ["ピ", "火"], ["プ", "不"], ["ペ", "閉"], ["ポ", "百"]
]);

function isRomaji(str) {
  // ローマ字の正規表現パターン
  const romajiPattern = /^[A-Za-z]+$/;
  return romajiPattern.test(str);
}

function roma_convert(str) {
  const romanToHira = {
      'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
      'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
      'sa': 'さ', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
      'ta': 'た', 'chi': 'ち', 'tsu': 'つ', 'te': 'て', 'to': 'と',
      'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
      'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',
      'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
      'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
      'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
      'wa': 'わ', 'wo': 'を', 'n': 'ん',
      'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
      'za': 'ざ', 'ji': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
      'da': 'だ', 'ji': 'ぢ', 'zu': 'づ', 'de': 'で', 'do': 'ど',
      'ba': 'ば', 'bi': 'び', 'bu': 'ぶ', 'be': 'べ', 'bo': 'ぼ',
      'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',
      'kya': 'きゃ', 'kyu': 'きゅ', 'kyo': 'きょ',
      'sha': 'しゃ', 'shu': 'しゅ', 'sho': 'しょ',
      'cha': 'ちゃ', 'chu': 'ちゅ', 'cho': 'ちょ',
      'nya': 'にゃ', 'nyu': 'にゅ', 'nyo': 'にょ',
      'hya': 'ひゃ', 'hyu': 'ひゅ', 'hyo': 'ひょ',
      'mya': 'みゃ', 'myu': 'みゅ', 'myo': 'みょ',
      'rya': 'りゃ', 'ryu': 'りゅ', 'ryo': 'りょ',
      'gya': 'ぎゃ', 'gyu': 'ぎゅ', 'gyo': 'ぎょ',
      'ja': 'じゃ', 'ju': 'じゅ', 'jo': 'じょ',
      'bya': 'びゃ', 'byu': 'びゅ', 'byo': 'びょ',
      'pya': 'ぴゃ', 'pyu': 'ぴゅ', 'pyo': 'ぴょ'
  };
  //設定のローマ字がfalseなら引数をそのまま返す
  if (settei_valve["romaji"]) {
    // マッチするローマ字を長い順に並べて、ひらがなに置換
    let result = '';
    for (let i = 0; i < str.length; i++) {
      for (let j = 3; j > 0; j--) {
        let romaji = str.substring(i, i + j);
        console.log(romaji)
        if (romanToHira[romaji]) {
          result += romanToHira[romaji];
          i += j - 1;
          break;
        }
       if (j === 1 && isRomaji(romaji) === false){
          result += romaji
        }
      }
    }
    return result;
  } else {
    return str;
  }
}


function manyou_convert_hira(data, set){
  //設定のひらがながfalseなら引数をそのまま返す
  let Kana = roma_convert(data)
  if (settei_valve["hiragana"] || set) {
    let SplitKana = Kana.split('');
    let SplitResult = [];
    for (let i = 0; i <= SplitKana.length; i++){//入力された文字列分繰り返す
      if (hiragana_ManyouganaData.has(SplitKana[i]) === true) {
        SplitResult.push(hiragana_ManyouganaData.get(SplitKana[i]));
      }else {
        SplitResult.push(SplitKana[i]);
        //かなと同じのがなかったらそのままSplitResultに追加する
      }
    }
    return manyou_convert_kata(SplitResult.join(""));
  } else {
    return manyou_convert_kata(Kana);
  }
}

function manyou_convert_kata(data){
  //設定のカタカナがfalseなら引数をそのまま返す
  if (settei_valve["katakana"]) {
    let SplitKana = data.split('');
    let SplitResult = [];
    for (let i = 0; i <= SplitKana.length; i++){//入力された文字列分繰り返す
      if (katakana_ManyouganaData.has(SplitKana[i]) === true) {
        SplitResult.push(katakana_ManyouganaData.get(SplitKana[i]));
      }else {
        SplitResult.push(SplitKana[i]);
        //かなと同じのがなかったらそのままSplitResultに追加する
      }
    }
    return(SplitResult.join(""));
  } else {
    return data;
  }
}


function settei_check(key) {
  settei[key].addEventListener(
    'change',
    () => {
      settei_valve[key] = settei[key].checked;
  });
}


settei_check("hiragana");
settei_check("katakana");
settei_check("romaji");

ConvertButton.addEventListener(
  'click',
  () => {
    const kana = KanaInput.value;
    if (kana.length === 0) {
      result_area.value = manyou_convert_hira('ここにしゅつりょく');
      console.log('入力してください');
      alert('入力してください');
      //かなの入力欄が空ならアラート
      return;
    }
    
    const result = manyou_convert_hira(kana);
    
    //履歴を参照
    let rireki_keys = Object.keys(rireki).sort();
    let new_rireki_key = 0;
    if (rireki_keys[rireki_keys.length-1] !== undefined) {
      new_rireki_key = +rireki_keys[rireki_keys.length-1]+1;
    }
    rireki[new_rireki_key] = {'result': result, 'input': kana};
    
    rireki_keys = Object.keys(rireki).sort();

    //cookieに保存
    let encode_rireki_result = "";
    let encode_rireki_input = "";
    for (let i=0; i<=rireki_keys.length-1; i++) {
      encode_rireki_result += `\n${encodeURIComponent(rireki[rireki_keys[i]]['result'])}`;
      encode_rireki_input += `\n${encodeURIComponent(rireki[rireki_keys[i]]['input'])}`;
    }
    
    document.cookie = 'rireki_result='+encode_rireki_result+'; max-age=518000; path=/';
    document.cookie = 'rireki_input='+encode_rireki_input+'; max-age=518000; path=/';
    
    
    
    //変換したものの表示エリア
    
    
    
    result_area.value = result;
    
    const rireki_div_row = document.createElement('div');
    const rireki_div_col_result = document.createElement('div');
    const rireki_div_col_input = document.createElement('div');
    const rireki_a = document.createElement('a');
    const rireki_p = document.createElement('p');

    rireki_div_row.className = 'row justify-content-md-center';
    rireki_div_col_result.className = 'col-5 ';
    rireki_div_col_input.className = 'col-5 ';
    
    rireki_area.append(rireki_div_row);
    rireki_div_row.append(rireki_div_col_result);
    rireki_div_row.append(rireki_div_col_input);
    
    rireki_p.innerText = kana;
    rireki_p.className = '';

    rireki_a.innerText = result;
    rireki_a.href = '';
    rireki_a.className = '';
    rireki_a.id = `rireki_No-${new_rireki_key}`;
    
    rireki_div_col_result.appendChild(rireki_a);
    rireki_div_col_input.appendChild(rireki_p);
});