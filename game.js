(() => {
  "use strict";

  const startScreen = document.querySelector("#startScreen");
  const gameScreen = document.querySelector("#gameScreen");
  const resultScreen = document.querySelector("#resultScreen");
  const birthForm = document.querySelector("#birthForm");
  const birthYearInput = document.querySelector("#birthYear");
  const birthYearUp = document.querySelector("#birthYearUp");
  const birthYearDown = document.querySelector("#birthYearDown");
  const homeSelect = document.querySelector("#homeSelect");
  const genderSelect = document.querySelector("#genderSelect");
  const generatedNamePreview = document.querySelector("#generatedNamePreview");
  const ageLabel = document.querySelector("#ageLabel");
  const yearLabel = document.querySelector("#yearLabel");
  const nameLabel = document.querySelector("#nameLabel");
  const genderLabel = document.querySelector("#genderLabel");
  const homeLabel = document.querySelector("#homeLabel");
  const stageLabel = document.querySelector("#stageLabel");
  const trackLabel = document.querySelector("#trackLabel");
  const futureLabel = document.querySelector("#futureLabel");
  const historyTitle = document.querySelector("#historyTitle");
  const historyText = document.querySelector("#historyText");
  const promptTitle = document.querySelector("#promptTitle");
  const choiceArea = document.querySelector(".choice-area");
  const choicesEl = document.querySelector("#choices");
  const outcomePanel = document.querySelector("#outcomePanel");
  const outcomeTitle = document.querySelector("#outcomeTitle");
  const outcomeText = document.querySelector("#outcomeText");
  const nextButton = document.querySelector("#nextButton");
  const restartButton = document.querySelector("#restartButton");
  const againButton = document.querySelector("#againButton");
  const copyButton = document.querySelector("#copyButton");
  const endingTitle = document.querySelector("#endingTitle");
  const endingText = document.querySelector("#endingText");
  const lifeCanvas = document.querySelector("#lifeCanvas");
  const posterCanvas = document.querySelector("#posterCanvas");
  const lifeCtx = lifeCanvas.getContext("2d");
  const posterCtx = posterCanvas.getContext("2d");
  const portraitSheet = new Image();
  let portraitSheetReady = false;
  portraitSheet.addEventListener("load", () => {
    portraitSheetReady = true;
    if (game && !gameScreen.classList.contains("hidden")) {
      drawLifeCanvas();
    }
    if (game && !resultScreen.classList.contains("hidden")) {
      drawPoster(topCareer());
    }
  });
  portraitSheet.src = "assets/portrait-sheet.png?v=20260702-depth";

  const historyEvents = [
    { year: 1945, title: "終戦", text: "日本は戦後の再出発を迎え、暮らしも価値観も大きく組み替えられていきました。", tags: ["public", "writer", "politics"] },
    { year: 1958, title: "東京タワー完成", text: "空へ伸びる鉄塔が、復興とテレビ時代の象徴になりました。", tags: ["actor", "artist", "media"] },
    { year: 1964, title: "東京オリンピック", text: "高速道路、新幹線、スポーツ熱。日本中が未来へ走り出すような空気に包まれました。", tags: ["baseball", "athlete", "travel"] },
    { year: 1969, title: "人類、月へ", text: "月面着陸のニュースが、子どもたちの想像力を宇宙まで押し上げました。", tags: ["science", "artist", "wander"] },
    { year: 1970, title: "大阪万博", text: "世界中の文化と技術が集まり、未来は丸い屋根の向こうにあると思われました。", tags: ["travel", "artist", "science"] },
    { year: 1973, title: "オイルショック", text: "社会は急に節約を覚え、安定した仕事の価値も見直されました。", tags: ["public", "business", "politics"] },
    { year: 1985, title: "科学万博とバブル前夜", text: "テクノロジーと消費の熱気が街をざわつかせ、夢の値段が少しずつ上がっていきました。", tags: ["science", "actor", "business"] },
    { year: 1989, title: "平成の始まりとベルリンの壁崩壊", text: "国内では時代が変わり、世界では冷戦の景色が崩れていきました。", tags: ["politics", "travel", "writer"] },
    { year: 1995, title: "震災とインターネットの入口", text: "大きな災害と新しい通信の波が、人とのつながりを考え直させました。", tags: ["public", "media", "writer"] },
    { year: 2001, title: "21世紀と世界情勢の転換", text: "新しい世紀への期待と不安が混じり、海外へ向かう人の視線も変わりました。", tags: ["travel", "politics", "journalist"] },
    { year: 2008, title: "スマホとSNSの波", text: "小さな画面が表現と出会いを変え、無名の人にも舞台が生まれました。", tags: ["actor", "artist", "business", "media"] },
    { year: 2011, title: "東日本大震災", text: "社会は立ち止まり、仕事、家族、地域、表現の意味が問い直されました。", tags: ["public", "writer", "politics"] },
    { year: 2020, title: "世界的感染症とオンライン化", text: "移動が止まり、画面越しの仕事、恋愛、表現が急に日常になりました。", tags: ["media", "writer", "business"] },
    { year: 2025, title: "大阪・関西万博", text: "未来をもう一度展示しようとする時代に、人々は古い夢と新しい技術を並べました。", tags: ["science", "travel", "artist"] }
  ];

  const stages = [
    {
      id: "child",
      label: "小学生",
      age: 8,
      prompt: "放課後、あなたはどこへ向かう？",
      choices: [
        choice("校庭で魔球を投げ続ける", "近所では誰も捕れない変化球が、なぜか夕焼けの日だけ曲がる。", ["baseball", "athlete"], { body: 2, fame: 1 }),
        choice("図書室の奥で世界地図を読む", "行ったことのない街の名前を、呪文みたいにノートへ写す。", ["writer", "travel"], { mind: 2, freedom: 1 }),
        choice("絵の具で未来の街を描く", "先生は少し困り、友だちはその絵を秘密基地の設計図だと言う。", ["artist", "science"], { art: 2, charm: 1 }),
        choice("給食委員長として革命を起こす", "牛乳の順番まで公平に決める姿に、クラスが妙に従い始める。", ["public", "politics"], { trust: 2, mind: 1 })
      ]
    },
    {
      id: "junior",
      label: "中学生",
      age: 13,
      prompt: "少し背伸びしたあなたは何を選ぶ？",
      choices: [
        choice("野球部で最後まで声を出す", "補欠の日々でも、声だけは地区大会の決勝まで届く。", ["baseball"], { body: 2, trust: 1 }),
        choice("文化祭で謎のバンドを組む", "三曲しかないのに、体育館の空気が一瞬だけ映画になる。", ["artist", "actor"], { art: 2, fame: 1 }),
        choice("生徒会で校則の穴を探す", "真面目な顔で自由を増やす方法を覚えてしまう。", ["politics", "public"], { trust: 2, mind: 1 }),
        choice("海外の同年代と文通する", "切手の向こうから、知らない町の雨の匂いが届く。", ["travel", "writer"], { freedom: 2, charm: 1 })
      ]
    },
    {
      id: "high",
      label: "高校生",
      age: 17,
      prompt: "将来の輪郭が見え始める。どの扉を開く？",
      choices: [
        choice("甲子園を本気で目指す", "肩に湿布を貼りながら、人生を一球に乗せる練習をする。", ["baseball"], { body: 3, fame: 1 }),
        choice("演劇部で主役を奪いに行く", "台詞を忘れた瞬間の沈黙が、なぜか拍手に変わる。", ["actor", "artist"], { charm: 2, art: 2 }),
        choice("新聞部で街の秘密を追う", "商店街の小さな噂から、社会を見る目が育つ。", ["journalist", "writer", "politics"], { mind: 2, trust: 1 }),
        choice("片道切符で港町へ行く", "何も決めずに電車へ乗る癖が、将来の重要スキルになる。", ["wander", "travel"], { freedom: 3 })
      ]
    },
    {
      id: "twenties",
      label: "20歳",
      age: 20,
      prompt: "大人になったふりをしながら、どこへ飛び込む？",
      choices: [
        choice("大学で歴史と映画を浴びる", "講義より古い映画館に通い、人生の構図を学ぶ。", ["writer", "actor"], { mind: 2, art: 1 }),
        choice("公務員試験に挑む", "安定の扉を叩きながら、心の中には少しだけ冒険を残す。", ["public"], { trust: 3 }),
        choice("小劇場の床で寝る", "舞台袖の埃と拍手の音が、生活のリズムになる。", ["actor", "artist"], { art: 2, charm: 2 }),
        choice("バックパックで海外へ出る", "国境の待合室で恋に落ち、帰国予定が紙くずになる。", ["travel", "wander"], { freedom: 3, charm: 1 })
      ]
    },
    {
      id: "firstWork",
      label: "25歳",
      age: 25,
      prompt: "最初の肩書きを何にする？",
      choices: [
        gatedChoice("ドラフト外からプロを狙う", "独立リーグの照明の下で、もう一度だけ魔球を試す。", ["baseball"], { body: 2, fame: 2 }, { anyCareer: ["baseball", "athlete"], minScore: 4 }),
        choice("新人賞へ小説を送る", "深夜の部屋で、誰にも頼まれていない人生を百枚書く。", ["writer"], { mind: 2, art: 2 }),
        choice("選挙事務所で走り回る", "ポスターを貼るうちに、人の本音の置き場所を覚える。", ["politics", "public"], { trust: 2, charm: 1 }),
        choice("映画のオーディションを受ける", "落選の帰り道で、監督の忘れ物を拾ってしまう。", ["actor"], { charm: 2, fame: 1 })
      ]
    },
    {
      id: "thirties",
      label: "30歳",
      age: 30,
      prompt: "人生のジャンルを変えるなら今かもしれない。",
      choices: [
        choice("小さな会社を立ち上げる", "名刺だけは立派で、会議室は喫茶店の隅にある。", ["business", "media"], { mind: 1, fame: 1, trust: 1 }),
        choice("地方の役所で町を変える", "地味な書類の山から、誰かの暮らしを少しだけ軽くする。", ["public"], { trust: 3 }),
        choice("世界一周の記録を配信する", "砂漠の宿で投稿した動画が、朝には知らない国で見られている。", ["travel", "media"], { freedom: 2, fame: 2 }),
        choice("アトリエにこもり続ける", "売れない作品ほど、未来のあなたをしつこく呼ぶ。", ["artist"], { art: 3 })
      ]
    },
    {
      id: "middle",
      label: "40歳",
      age: 40,
      prompt: "責任と無茶の両方が似合う年齢。何を背負う？",
      choices: [
        choice("国会を目指す", "駅前演説で噛んだ言葉が、逆に人々の記憶へ残る。", ["politics"], { trust: 2, fame: 2 }),
        choice("映画の助演で化ける", "たった七分の出演で、観客があなたの過去を勝手に想像する。", ["actor"], { charm: 2, fame: 2 }),
        choice("災害支援の現場へ行く", "泥のついた靴のまま、人の強さと弱さを同時に知る。", ["public", "journalist"], { trust: 3, mind: 1 }),
        choice("南の島で店を開く", "看板もメニューもゆるいのに、旅人の人生相談が集まり始める。", ["wander", "travel"], { freedom: 3, charm: 1 })
      ]
    },
    {
      id: "late",
      label: "55歳",
      age: 55,
      prompt: "もう一度、人生の看板を書き換えるなら？",
      choices: [
        choice("自伝的小説を書く", "本当のことを少しだけ嘘にすると、全部が真実らしくなる。", ["writer"], { art: 2, mind: 2 }),
        gatedChoice("若手チームの監督になる", "自分の夢の残り火を、次の世代のグラウンドへ置く。", ["baseball", "teacher", "public"], { trust: 2, body: 1 }, { anyCareer: ["baseball", "athlete", "teacher"], minScore: 4 }),
        choice("海外の街で恋をやり直す", "うまく話せない言葉のほうが、心に正直な日もある。", ["travel", "wander"], { freedom: 2, charm: 2 }),
        choice("市民講座で歴史を語る", "黒板に書いた年号が、なぜか誰かの明日を変える。", ["public", "writer"], { trust: 2, mind: 2 })
      ]
    },
    {
      id: "final",
      label: "70歳",
      age: 70,
      prompt: "最後に、あなたは何を残す？",
      choices: [
        choice("映画化を許可する", "脚本家は半分も信じていないが、観客は全部信じる。", ["actor", "writer"], { fame: 2, art: 1 }),
        choice("小さな財団を作る", "名前を残すより、誰かの選択肢を増やすことに決める。", ["public", "politics"], { trust: 3 }),
        choice("また旅に出る", "行き先を告げない出発こそ、あなたらしい挨拶になる。", ["wander", "travel"], { freedom: 3 }),
        choice("誰にも見せない絵を描く", "発表しない作品に、いちばん自由なあなたがいる。", ["artist"], { art: 3 })
      ]
    }
  ];

  const dramaticChoiceRules = [
    contextChoice("白黒テレビの公開放送へ忍び込む", "街頭テレビの前で笑った顔が、偶然ニュース映画の端に映る。", ["media", "actor"], { charm: 2, fame: 1 }, "日本・テレビ時代", { countries: ["jp"], stages: ["child", "junior"], minYear: 1953, maxYear: 1965 }),
    contextChoice("万博の迷子係に名乗り出る", "外国語は分からないのに、身ぶりで世界中の人を案内してしまう。", ["travel", "public"], { trust: 2, freedom: 1 }, "日本・万博の熱", { countries: ["jp"], stages: ["child", "junior"], minYear: 1969, maxYear: 1971 }),
    contextChoice("深夜ラジオへはがきを送り続ける", "ペンネームだけが先に有名になり、学校では誰にも言えない二重生活が始まる。", ["writer", "media"], { mind: 2, fame: 1 }, "日本・深夜ラジオ", { countries: ["jp"], stages: ["junior", "high"], minYear: 1970, maxYear: 1988 }),
    contextChoice("ファミコンの裏技ノートを作る", "近所の子どもたちがあなたのノートを借りに来て、小さな攻略本出版社みたいになる。", ["writer", "science", "media"], { mind: 2, fame: 1 }, "日本・ゲーム文化", { countries: ["jp"], stages: ["child", "junior"], minYear: 1983, maxYear: 1994 }),
    contextChoice("プリクラ帳で秘密の相関図を作る", "小さな写真の余白に書いた一言が、クラスの流行語になってしまう。", ["media", "artist"], { charm: 2, fame: 1 }, "日本・90年代カルチャー", { countries: ["jp"], stages: ["child", "junior"], minYear: 1995, maxYear: 2005 }),
    contextChoice("男女雇用機会均等法の記事を切り抜く", "進路指導室の空気は古いままなのに、新聞の一行だけが未来に見える。", ["public", "business", "politics"], { mind: 2, trust: 1 }, "日本・働き方の転換", { countries: ["jp"], genders: ["female", "neutral"], stages: ["high", "twenties"], minYear: 1985, maxYear: 1995 }),
    contextChoice("バブルの広告会社でコピーを書く", "派手な会議室で出した冗談が、翌月の駅貼りポスターになる。", ["media", "business", "writer"], { charm: 2, fame: 1 }, "日本・バブル前夜", { countries: ["jp"], stages: ["twenties", "firstWork"], minYear: 1985, maxYear: 1992 }),
    contextChoice("震災ボランティアの夜行バスに乗る", "名前も知らない人のために泥をかき、人生の優先順位が静かに入れ替わる。", ["public", "journalist"], { trust: 3, mind: 1 }, "日本・震災後", { countries: ["jp"], stages: ["high", "twenties", "firstWork", "thirties", "middle"], minYear: 1995, maxYear: 2013 }),
    contextChoice("動画サイトでご当地ヒーローを始める", "手作りの衣装が粗いほど、知らない街の子どもたちが真似し始める。", ["media", "actor"], { charm: 2, fame: 2 }, "日本・ネット発信", { countries: ["jp"], stages: ["junior", "high", "twenties", "firstWork"], minYear: 2007, maxYear: 2025 }),

    contextChoice("朝露の田んぼで苗箱を運ぶ", "祖父母の手つきを真似しているうちに、季節の機嫌を読む癖がつく。", ["agriculture", "business"], { body: 2, trust: 1 }, "実家・農家", { homes: ["farm"], stages: ["child", "junior"], minYear: 1950, maxYear: 2025 }),
    contextChoice("農協の掲示板で相場を見る", "数字の向こうに天気と人の暮らしがあると知り、商売の見方が変わる。", ["agriculture", "business", "public"], { mind: 2, trust: 1 }, "実家・農家", { homes: ["farm"], stages: ["high", "twenties", "firstWork"], minYear: 1960, maxYear: 2025 }),
    contextChoice("父の定期券を借りて都心を見に行く", "改札を抜けた先のビル群が、退屈だと思っていた会社員人生を映画のセットに変える。", ["salaryman", "business"], { mind: 1, trust: 2 }, "実家・会社員家庭", { homes: ["salary"], stages: ["junior", "high"], minYear: 1950, maxYear: 2025 }),
    contextChoice("商店街の歳末セールで声を張る", "一声で人の足が止まる快感を覚え、広告と商売の境目がなくなる。", ["business", "media"], { charm: 2, trust: 1 }, "実家・商店", { homes: ["shop"], stages: ["child", "junior", "high"], minYear: 1950, maxYear: 2025 }),
    contextChoice("閉店後の店番ノートに物語を書く", "売上の横に書いた短い会話が、後の小説のいちばん大事な台詞になる。", ["writer", "business"], { mind: 2, charm: 1 }, "実家・商店", { homes: ["shop"], stages: ["junior", "high", "twenties"], minYear: 1950, maxYear: 2025 }),
    contextChoice("町工場の端材で謎の機械を作る", "失敗作の山から、発明と建築と芸術が同じ机に並び始める。", ["science", "architect", "artist"], { mind: 2, art: 1 }, "実家・町工場", { homes: ["factory"], stages: ["child", "junior", "high"], minYear: 1950, maxYear: 2025 }),
    contextChoice("役所の封筒を見て町の裏側を想像する", "地味な書類ほど誰かの生活に直結していると知り、社会の見方が変わる。", ["public", "teacher", "politics"], { trust: 2, mind: 1 }, "実家・公務員家庭", { homes: ["public"], stages: ["junior", "high", "twenties"], minYear: 1950, maxYear: 2025 }),
    contextChoice("朝市の手伝いで魚の値段を叫ぶ", "潮と声と現金のリズムが、遠くへ出る夢を妙に現実的にする。", ["business", "travel", "athlete"], { body: 2, charm: 1 }, "実家・漁師町", { homes: ["fishery"], stages: ["child", "junior", "high"], minYear: 1950, maxYear: 2025 }),
    contextChoice("地元を出るか継ぐかで家族会議になる", "正しさではなく、誰を寂しくさせるかで進路が揺れる。", ["family", "business", "wander"], { trust: 2, freedom: 1 }, "実家・継ぐか出るか", { homes: ["farm", "shop", "factory", "fishery"], stages: ["high", "twenties", "firstWork"], minYear: 1950, maxYear: 2025 }),

    contextChoice("リトルリーグの外野で奇跡の送球をする", "芝生の匂いと歓声が、いつか大きな球場へ続く秘密の道になる。", ["baseball", "athlete"], { body: 2, fame: 1 }, "アメリカ・少年野球", { countries: ["us"], stages: ["child", "junior"], minYear: 1950, maxYear: 2025 }),
    contextChoice("公民権運動の記事で壁新聞を作る", "大人たちは眉をひそめるが、教室の後ろで誰かが小さく拍手する。", ["journalist", "politics"], { mind: 2, trust: 2 }, "アメリカ・公民権の時代", { countries: ["us"], stages: ["junior", "high"], minYear: 1960, maxYear: 1975 }),
    contextChoice("タイトルIXの奨学金を本気で狙う", "女子チームの古いユニフォームを着て、未来の契約書みたいにコートへ立つ。", ["athlete", "baseball", "politics"], { body: 3, trust: 1 }, "アメリカ・スポーツの扉", { countries: ["us"], genders: ["female", "neutral"], stages: ["high", "twenties"], minYear: 1972, maxYear: 1995 }),
    contextChoice("ガレージで映画みたいなバンドを組む", "近所迷惑の苦情が、なぜか地元紙の小さな記事になる。", ["artist", "actor", "media"], { art: 2, fame: 1 }, "アメリカ・ガレージ文化", { countries: ["us"], stages: ["high", "twenties"], minYear: 1970, maxYear: 1995 }),
    contextChoice("ケーブルテレビの子ども番組を研究する", "CMのジングルまで覚えたせいで、家族旅行のビデオが妙に本格的になる。", ["media", "actor"], { charm: 2, art: 1 }, "アメリカ・テレビ文化", { countries: ["us"], stages: ["child", "junior"], minYear: 1980, maxYear: 2005 }),
    contextChoice("西海岸の小さなソフト会社へ飛び込む", "徹夜の画面に打った一行が、数年後なぜか世界中の机に置かれる。", ["business", "science", "media"], { mind: 2, fame: 2 }, "アメリカ・ITの波", { countries: ["us"], stages: ["twenties", "firstWork", "thirties"], minYear: 1980, maxYear: 2012 }),
    contextChoice("9月のニュースのあと、町の集会に立つ", "不安で黙った人たちの前で、震える声が思ったより遠くまで届く。", ["politics", "public", "journalist"], { trust: 3, charm: 1 }, "アメリカ・21世紀の転換", { countries: ["us"], stages: ["twenties", "firstWork", "thirties", "middle"], minYear: 2001, maxYear: 2010 }),

    contextChoice("海賊ラジオの周波数を探す", "布団の中で聞いた音楽が、学校の制服を少し窮屈に感じさせる。", ["artist", "media"], { art: 2, freedom: 1 }, "イギリス・ポップの波", { countries: ["uk"], stages: ["child", "junior", "high"], minYear: 1964, maxYear: 1970 }),
    contextChoice("パンクのジンを手刷りする", "ホチキス留めの八ページが、町でいちばん危険な新聞になる。", ["artist", "journalist"], { art: 2, fame: 1 }, "イギリス・パンク", { countries: ["uk"], stages: ["high", "twenties"], minYear: 1976, maxYear: 1985 }),
    contextChoice("BBCの地方局で見習いになる", "雨のニュースを読んだだけなのに、声を覚えてくれる人が現れる。", ["media", "actor", "public"], { trust: 2, fame: 1 }, "イギリス・放送文化", { countries: ["uk"], stages: ["twenties", "firstWork"], minYear: 1970, maxYear: 2000 }),
    contextChoice("学校劇で王様ではなく宇宙人を演じる", "真面目な先生は困った顔をするが、校長だけが妙に気に入ってしまう。", ["actor", "artist"], { charm: 2, art: 1 }, "イギリス・学校劇", { countries: ["uk"], stages: ["child", "junior"], minYear: 1970, maxYear: 2005 }),
    contextChoice("ブリットポップのMVに紛れ込む", "一秒だけ映った横顔を、翌週の学校で誰かが真似する。", ["actor", "artist", "media"], { charm: 2, fame: 2 }, "イギリス・90年代音楽", { countries: ["uk"], stages: ["high", "twenties", "firstWork"], minYear: 1994, maxYear: 2001 }),
    contextChoice("EU離脱の食卓討論を録音する", "家族げんかのつもりが、世代の違いを描くドキュメンタリーの始まりになる。", ["journalist", "politics", "writer"], { mind: 2, trust: 1 }, "イギリス・分断の時代", { countries: ["uk"], stages: ["twenties", "firstWork", "thirties", "middle"], minYear: 2016, maxYear: 2025 }),

    contextChoice("五月革命のポスターを壁に貼る", "意味を全部は分かっていないのに、赤いインクの匂いだけは一生忘れない。", ["artist", "politics"], { art: 2, freedom: 2 }, "フランス・1968年の余韻", { countries: ["fr"], stages: ["junior", "high", "twenties"], minYear: 1968, maxYear: 1978 }),
    contextChoice("ヌーヴェルヴァーグの助監督になる", "カメラを担いで走るだけの日々が、突然あなたの恋愛まで編集し始める。", ["actor", "artist"], { art: 2, charm: 2 }, "フランス・映画の街", { countries: ["fr"], stages: ["twenties", "firstWork"], minYear: 1959, maxYear: 1975 }),
    contextChoice("小さなフェミニスト書店を手伝う", "本を売るはずが、誰かの逃げ道と作戦会議の場所を守ることになる。", ["writer", "politics", "public"], { mind: 2, trust: 2 }, "フランス・女性運動", { countries: ["fr"], genders: ["female", "neutral"], stages: ["high", "twenties", "firstWork"], minYear: 1970, maxYear: 1990 }),
    contextChoice("EU通訳の試験を受ける", "単語を一つ選ぶたびに、国境の線が少し薄くなる気がする。", ["travel", "public", "politics"], { mind: 2, trust: 1 }, "フランス・ヨーロッパ統合", { countries: ["fr"], stages: ["twenties", "firstWork", "thirties"], minYear: 1992, maxYear: 2010 }),
    contextChoice("Minitel端末で知らない町の掲示板を読む", "画面の文字だけで遠くの人に会えると知り、未来が少し早く来てしまう。", ["media", "writer", "science"], { mind: 2, freedom: 1 }, "フランス・通信文化", { countries: ["fr"], stages: ["child", "junior", "high"], minYear: 1982, maxYear: 2000 }),
    contextChoice("古い村の映画祭を救う", "誰も来ないと思われた上映会で、最後列の老人が泣き出す。", ["artist", "public", "writer"], { art: 2, trust: 2 }, "フランス・地方文化", { countries: ["fr"], stages: ["thirties", "middle", "late"], minYear: 2000, maxYear: 2025 }),

    contextChoice("裸足で路地のサッカー王になる", "ゴールポストは石ころ二つ。それでも観客は本物のスタジアムみたいに騒ぐ。", ["athlete", "baseball"], { body: 3, fame: 1 }, "ブラジル・サッカー熱", { countries: ["br"], stages: ["child", "junior", "high"], minYear: 1958, maxYear: 2025 }),
    contextChoice("民主化のポスターを夜明け前に描く", "明るすぎる色で描いた希望が、翌朝の通学路を少し変える。", ["artist", "politics"], { art: 2, trust: 1 }, "ブラジル・民主化の空気", { countries: ["br"], stages: ["high", "twenties"], minYear: 1984, maxYear: 1990 }),
    contextChoice("カーニバルの打楽器隊に入る", "一拍遅れたリズムが、なぜかあなたの人生だけを前へ押す。", ["artist", "actor", "media"], { art: 2, charm: 2 }, "ブラジル・カーニバル", { countries: ["br"], stages: ["junior", "high", "twenties", "firstWork"], minYear: 1970, maxYear: 2025 }),
    contextChoice("ワールドカップのステッカーを全力で交換する", "最後の一枚を手に入れる交渉力が、後の人生で妙に役に立つ。", ["business", "athlete", "media"], { charm: 2, mind: 1 }, "ブラジル・W杯の熱", { countries: ["br"], stages: ["child", "junior"], minYear: 1970, maxYear: 2025 }),
    contextChoice("女子フットサルの秘密チームを作る", "使わせてもらえないコートの隅で、誰より鮮やかな作戦名を考える。", ["athlete", "politics", "media"], { body: 2, trust: 2 }, "ブラジル・スポーツの壁", { countries: ["br"], genders: ["female", "neutral"], stages: ["junior", "high", "twenties"], minYear: 1980, maxYear: 2015 }),
    contextChoice("ファヴェーラの映像日記を配信する", "観光パンフレットにない街の声が、海の向こうの映画祭へ届く。", ["journalist", "media", "artist"], { mind: 2, fame: 2 }, "ブラジル・映像発信", { countries: ["br"], stages: ["twenties", "firstWork", "thirties"], minYear: 2005, maxYear: 2025 }),

    contextChoice("駅のホームで物語を売る老人に弟子入りする", "列車が来るたび、知らない人生の第一章だけを聞かされる。", ["writer", "travel"], { mind: 2, freedom: 1 }, "インド・鉄道の物語", { countries: ["in"], stages: ["child", "junior"], minYear: 1947, maxYear: 1985 }),
    contextChoice("クリケットのラジオ実況を丸暗記する", "打球音を聞くだけで試合を説明できる才能が、教室で妙に尊敬される。", ["athlete", "media"], { body: 1, charm: 2 }, "インド・クリケット熱", { countries: ["in"], stages: ["child", "junior", "high"], minYear: 1983, maxYear: 2025 }),
    contextChoice("衛星テレビの歌番組を家族で録画する", "何度も巻き戻した振付が、親戚の結婚式で突然スターの入口になる。", ["actor", "artist", "media"], { charm: 2, fame: 1 }, "インド・衛星テレビ", { countries: ["in"], stages: ["child", "junior"], minYear: 1992, maxYear: 2010 }),
    contextChoice("理系コンテストにこっそり応募する", "親戚の期待と違う方向へ、紙飛行機みたいな発明が飛んでいく。", ["science", "business"], { mind: 3, freedom: 1 }, "インド・進路の交差点", { countries: ["in"], genders: ["female", "neutral"], stages: ["junior", "high"], minYear: 1985, maxYear: 2025 }),
    contextChoice("バンガロールのIT会社で夜を明かす", "停電のたびに笑い、復旧のたびに世界へ少し近づく。", ["science", "business", "media"], { mind: 2, fame: 1 }, "インド・IT成長", { countries: ["in"], stages: ["twenties", "firstWork", "thirties"], minYear: 1991, maxYear: 2025 }),
    contextChoice("ボリウッドの群舞で一列だけ目立つ", "振付師に叱られた癖が、次の映画では主役の決めポーズになる。", ["actor", "artist"], { charm: 3, fame: 1 }, "インド・映画産業", { countries: ["in"], stages: ["high", "twenties", "firstWork"], minYear: 1975, maxYear: 2025 }),

    contextChoice("月面着陸の日に宇宙クラブを作る", "段ボールの宇宙船は雨で壊れたが、乗員名簿だけは大人になるまで残る。", ["science", "artist"], { mind: 2, art: 1 }, "1969年・宇宙への憧れ", { stages: ["child", "junior", "high"], minYear: 1969, maxYear: 1972 }),
    contextChoice("ベルリンの壁のニュースを見て交換留学を決める", "地図の赤い線が消える瞬間、あなたの部屋の壁も少し低くなる。", ["travel", "politics", "writer"], { freedom: 2, mind: 1 }, "1989年・世界の転換", { stages: ["high", "twenties", "firstWork"], minYear: 1989, maxYear: 1993 }),
    contextChoice("インターネットカフェで別名義の人生を始める", "画面の中の名前だけが先に旅をして、現実のあなたを追い越していく。", ["media", "writer", "wander"], { freedom: 2, fame: 1 }, "1990年代・ネット黎明期", { stages: ["junior", "high", "twenties", "firstWork"], minYear: 1995, maxYear: 2005 }),
    contextChoice("スマホで一分映画を撮る", "通学路の退屈な信号待ちが、知らない国の誰かには名場面に見える。", ["media", "actor", "artist"], { fame: 2, art: 1 }, "スマホ時代", { stages: ["junior", "high", "twenties", "firstWork"], minYear: 2008, maxYear: 2025 }),
    contextChoice("オンライン劇団を旗揚げする", "会ったことのない仲間と、画面の四角だけで拍手の場所を作る。", ["actor", "media", "writer"], { art: 2, trust: 1 }, "2020年代・オンライン化", { stages: ["high", "twenties", "firstWork", "thirties", "middle"], minYear: 2020, maxYear: 2025 }),

    contextChoice("隣の席の人にだけ本当の夢を話す", "笑われると思った夢を真剣に聞かれたせいで、進路希望の紙が書き換わる。", ["romance", "writer"], { charm: 2, trust: 1 }, "恋愛・初恋", { stages: ["junior", "high"], minYear: 1950, maxYear: 2025 }),
    contextChoice("部活帰りの告白を受け止める", "勝ち負けよりも、帰り道で歩幅を合わせることの難しさを覚える。", ["romance", "athlete"], { charm: 2, body: 1 }, "恋愛・青春", { stages: ["junior", "high"], anyCareer: ["baseball", "athlete", "soccer"], minScore: 2 }),
    contextChoice("舞台袖で差し入れの手紙をもらう", "名前のない手紙の文字が、拍手より長く胸に残る。", ["romance", "actor", "artist"], { charm: 2, art: 1 }, "恋愛・表現者同士", { stages: ["high", "twenties"], anyCareer: ["artist", "actor", "media"], minScore: 2 }),
    contextChoice("交換留学生と秘密の散歩をする", "片言の会話ほど嘘がつけず、帰国日が近づくほど世界地図が残酷になる。", ["romance", "travel", "writer"], { charm: 2, freedom: 2 }, "恋愛・国際恋愛", { stages: ["high", "twenties", "firstWork"], minYear: 1960, maxYear: 2025 }),
    contextChoice("文通相手に会うため国境を越える", "封筒の中だけにいた人が駅のホームに立った瞬間、人生の尺が急に長くなる。", ["romance", "travel", "wander"], { charm: 2, freedom: 2 }, "恋愛・遠距離", { stages: ["twenties", "firstWork", "thirties"], anyCareer: ["travel", "writer", "wander"], minScore: 2 }),
    contextChoice("職場恋愛を秘密にする", "会議では他人のふりをしながら、同じ資料の余白にだけ本音を書く。", ["romance", "salaryman", "business"], { charm: 2, trust: 1 }, "恋愛・職場", { stages: ["firstWork", "thirties"], anyCareer: ["salaryman", "business", "public"], minScore: 2 }),
    contextChoice("結婚より先に二人の仕事場を借りる", "恋人であり相棒でもある関係が、締切と家賃で試されていく。", ["romance", "business", "artist"], { charm: 2, trust: 2 }, "恋愛・相棒", { stages: ["twenties", "firstWork", "thirties"], anyCareer: ["artist", "business", "architect", "media"], minScore: 3 }),
    contextChoice("結婚して家庭のチームを作る", "恋愛映画は終わったはずなのに、生活という続編のほうがずっと予測不能でした。", ["romance", "family", "homemaker"], { trust: 3, charm: 1 }, "恋愛・結婚", { stages: ["twenties", "firstWork", "thirties"], anyCareer: ["romance"], minScore: 2 }),
    contextChoice("結婚せず、恋人と別々の町に住む", "一緒にいない時間を大切にするという、少し大人びた契約を選ぶ。", ["romance", "travel", "writer"], { freedom: 2, charm: 2 }, "恋愛・別居の約束", { stages: ["thirties", "middle"], anyCareer: ["romance", "travel", "writer"], minScore: 3 }),
    contextChoice("別れを作品にしてしまう", "泣きながら書いた一文が、後で誰かの人生相談に使われることになる。", ["romance", "writer", "artist"], { art: 3, charm: 1 }, "恋愛・失恋", { stages: ["twenties", "firstWork", "thirties", "middle"], anyCareer: ["romance", "artist", "writer"], minScore: 2 }),
    contextChoice("古い恋人から届いた手紙を開く", "封を切る音だけで、忘れたはずの別世界線が部屋に戻ってくる。", ["romance", "writer", "travel"], { charm: 2, mind: 1 }, "恋愛・再会", { stages: ["middle", "late", "final"], anyCareer: ["romance", "travel", "writer"], minScore: 3 }),
    contextChoice("パートナーの夢を優先して引っ越す", "自分の夢を一度畳んだはずが、知らない町で別の才能が開いてしまう。", ["romance", "family", "travel"], { trust: 3, freedom: 1 }, "恋愛・移住", { stages: ["firstWork", "thirties", "middle"], anyCareer: ["romance"], minScore: 2 }),

    contextChoice("教育実習で黒板の前に立つ", "生徒の眠そうな顔を笑わせた瞬間、これも舞台なのだと気づく。", ["teacher", "public", "writer"], { trust: 2, mind: 2 }, "職業・教師", { stages: ["twenties", "firstWork"], minStats: { mind: 6, trust: 5 } }),
    contextChoice("放課後のクラブ顧問になる", "勝ち負けよりも、帰り道の表情を覚える仕事が性に合ってしまう。", ["teacher", "athlete", "public"], { trust: 3, body: 1 }, "職業・教師", { stages: ["firstWork", "thirties", "middle"], anyCareer: ["baseball", "athlete", "public"], minScore: 3 }),
    contextChoice("建築学科で紙の模型を徹夜で作る", "窓の位置を一ミリ動かしただけで、人の孤独まで変わる気がする。", ["architect", "artist", "science"], { art: 2, mind: 2 }, "職業・建築家", { stages: ["twenties", "firstWork"], anyCareer: ["artist", "science"], minScore: 2 }),
    contextChoice("古い駅舎の保存計画に参加する", "壊されるはずだった建物が、あなたの図面の中で二度目の人生を始める。", ["architect", "public", "artist"], { trust: 2, art: 2 }, "職業・建築家", { stages: ["thirties", "middle", "late"], anyCareer: ["architect", "public", "artist"], minScore: 4 }),
    contextChoice("理系の研究室で夜明けの実験を見る", "白衣の袖口に薬品の匂いが残り、未来は机上の夢ではなく手を動かす仕事になる。", ["science", "business"], { mind: 3, trust: 1 }, "進路・理系", { stages: ["twenties", "firstWork"], anyCareer: ["science", "architect", "business"], minScore: 2 }),
    contextChoice("文学部の掲示板で出版社求人を見つける", "薄い求人票一枚が、読んできた本と食べていく現実を急に同じ机へ乗せる。", ["writer", "media", "salaryman"], { mind: 2, art: 1 }, "進路・文系", { stages: ["twenties", "firstWork"], anyCareer: ["writer", "artist", "travel", "media"], minScore: 2 }),
    contextChoice("職業訓練校で工具の名前を覚える", "手の中の重さを覚えるたびに、肩書きより先に技術が自分を支え始める。", ["architect", "science", "salaryman"], { mind: 2, trust: 2 }, "進路・手に職", { stages: ["twenties", "firstWork", "thirties"], minStats: { mind: 5 } }),
    contextChoice("ハローワークで現実的な求人票を見る", "夢の欄には何も書けないまま、生活費という言葉だけが妙に大きく見える。", ["salaryman", "business", "public"], { trust: 2, mind: 1 }, "就職・現実路線", { stages: ["firstWork", "thirties"], minYear: 1950, maxYear: 2025 }),
    contextChoice("大企業の総合職として名刺を持つ", "満員電車と会議資料の中で、普通の人生にも十分な劇薬があると知る。", ["salaryman", "business", "public"], { trust: 2, mind: 1 }, "職業・サラリーマン", { stages: ["firstWork", "thirties"], minYear: 1950, maxYear: 2025 }),
    contextChoice("異動辞令で知らない街へ飛ばされる", "行きたくなかった支店で、人生の主役級の友人に出会ってしまう。", ["salaryman", "travel", "business"], { trust: 2, freedom: 1 }, "転機・会社員人生", { stages: ["thirties", "middle"], anyCareer: ["salaryman", "business", "public"], minScore: 3 }),
    contextChoice("フリーランスの屋号をノートに書く", "まだ仕事は一件もないのに、屋号だけが先に歩き出してしまう。", ["media", "artist", "business"], { freedom: 2, fame: 1 }, "就職・自由業", { stages: ["firstWork", "thirties"], anyCareer: ["artist", "writer", "media", "business"], minScore: 2 }),
    contextChoice("恋人の部屋に転がり込み、生活を立て直す", "誰かに頼ることが負けではなく、いつか返す約束として胸に残る。", ["romance", "family", "homemaker"], { trust: 2, charm: 1 }, "暮らし・頼り頼られ", { stages: ["firstWork", "thirties"], anyCareer: ["romance", "family", "wander", "artist"], minScore: 2 }),
    contextChoice("専業主婦として家庭の物語を選ぶ", "表舞台から降りたはずの毎日が、家族全員の進路を少しずつ書き換えていく。", ["homemaker", "writer", "public"], { trust: 3, charm: 1 }, "暮らし・専業主婦", { genders: ["female"], stages: ["twenties", "firstWork", "thirties"], minYear: 1950, maxYear: 2025 }),
    contextChoice("専業主夫として家庭の舵を取る", "周囲の驚きは長く続かず、気づけば台所がいちばん重要な作戦室になる。", ["homemaker", "public", "writer"], { trust: 3, mind: 1 }, "暮らし・専業主夫", { genders: ["male"], stages: ["twenties", "firstWork", "thirties"], minYear: 1970, maxYear: 2025 }),
    contextChoice("家庭を軸に、肩書きのない仕事を始める", "履歴書には書きにくい日々が、誰かにとって一番頼れる場所になる。", ["homemaker", "public", "artist"], { trust: 3, freedom: 1 }, "暮らし・家庭中心", { genders: ["neutral"], stages: ["twenties", "firstWork", "thirties"], minYear: 1970, maxYear: 2025 }),
    contextChoice("サッカークラブの広報に潜り込む", "ピッチに立てなくても、選手の一言を世界へ届ける仕事があると知る。", ["soccer", "media", "business"], { charm: 2, fame: 1 }, "職業・サッカーの仕事", { stages: ["firstWork", "thirties"], anyCareer: ["athlete", "baseball", "media"], minScore: 2 }),
    contextChoice("少年少女サッカーチームの監督になる", "小さなグラウンドで、人生の負け方と立ち上がり方を教えることになる。", ["soccer", "teacher", "public"], { trust: 3, body: 1 }, "職業・サッカーの仕事", { stages: ["thirties", "middle", "late"], anyCareer: ["athlete", "teacher", "public"], minScore: 3 }),
    contextChoice("全部やめて資格の学校に通い直す", "遠回りに見えた一年が、その後の十年をまるごと別の映画に変える。", ["teacher", "architect", "salaryman"], { mind: 2, trust: 1 }, "どんでん返し・再出発", { stages: ["thirties", "middle"], minStats: { mind: 6 } }),
    contextChoice("突然の介護で地元へ戻る", "夢を諦めたと思った帰郷が、思いがけず町の中心へ向かう道になる。", ["public", "homemaker", "writer"], { trust: 3, mind: 1 }, "事件・帰郷", { stages: ["thirties", "middle", "late"], minYear: 1950, maxYear: 2025 }),

    contextChoice("家族の期待をかわして夜間学校へ通う", "昼の顔と夜のノート、二つの人生を持ったことが後の強さになる。", ["public", "writer", "business"], { mind: 2, trust: 1 }, "性別と時代の壁", { genders: ["female", "neutral"], stages: ["high", "twenties", "firstWork"], minYear: 1950, maxYear: 1985 }),
    contextChoice("家を継げという声から半歩だけ逃げる", "期待を裏切りきれない優しさが、逆に誰にも真似できない遠回りを作る。", ["wander", "business", "writer"], { freedom: 2, trust: 1 }, "家族役割との対決", { genders: ["male", "neutral"], stages: ["high", "twenties", "firstWork"], minYear: 1950, maxYear: 1990 }),
    contextChoice("名前と服装をめぐって小さな革命を起こす", "鏡の前で決めた一センチの違いが、周囲の常識をゆっくりほどく。", ["artist", "politics", "media"], { charm: 2, freedom: 2 }, "自分らしさの選択", { genders: ["neutral"], stages: ["junior", "high", "twenties", "firstWork"], minYear: 1980, maxYear: 2025 })
  ];

  const endings = {
    baseball: ["夕焼けの魔球を持つ元プロ野球選手", "あなたの球は速さではなく、見た人の少年時代を曲げることで語り継がれました。"],
    athlete: ["路地から世界へ出たアスリート", "競技名よりも、最初に走った場所の匂いを忘れない選手として語られました。"],
    artist: ["未来都市を描いた芸術家", "売れた年よりも、誰かがあなたの絵の前で進路を変えた日のほうが大切でした。"],
    politics: ["妙に人間くさい政治家", "大演説より、商店街で迷子を助けた写真のほうが有名になりました。"],
    public: ["時代の隙間を支えた公務の人", "派手な賞は少なくても、あなたの書類には何人分もの安心が挟まっていました。"],
    writer: ["ありえた人生を集めた作家", "本当か嘘か分からない文章で、読者に自分の別人生を探させました。"],
    actor: ["七分で世界を盗む映画俳優", "主演作よりも、窓辺で黙る場面が映画史の片隅に残りました。"],
    wander: ["住所を持たない人生の達人", "地図に線を引くより、会った人の記憶に点を残す旅を続けました。"],
    travel: ["国境で恋と仕事を拾った旅人", "空港の掲示板を見るたびに、まだ選んでいない人生が光りました。"],
    media: ["時代の画面に偶然映った表現者", "あなたは有名になろうとしたのではなく、時代のほうが勝手にあなたを拡散しました。"],
    business: ["喫茶店から始まった起業家", "会社の規模より、最初の名刺を今も財布に入れていることが自慢でした。"],
    journalist: ["街角の違和感を追った記者", "大事件の前に、小さな声を拾う耳を持っていました。"],
    science: ["未来を信じすぎた発明好き", "完成しなかった装置ほど、後の誰かに勇気を渡しました。"],
    teacher: ["人生の分岐点を増やした教師", "教科書の範囲より、迷っている人の背中を押した日のほうが長く残りました。"],
    architect: ["人の記憶まで設計した建築家", "あなたの建物は、雨の日に誰かが立ち止まる場所として愛されました。"],
    salaryman: ["名刺の裏に夢を隠した会社員", "地味な会議と異動の連続にも、映画なら十分すぎるほどの起伏がありました。"],
    homemaker: ["家庭という小さな王国の脚本家", "表彰状は少なくても、あなたの段取りで何人もの人生が次の場面へ進みました。"],
    agriculture: ["畑から未来を見た農業家", "季節に振り回されながらも、土と市場と人の胃袋をつなぐ仕事を物語にしました。"],
    soccer: ["ピッチの外から試合を動かした人", "ゴールを決めたのは別の誰かでも、その前の物語を整えたのはあなたでした。"],
    romance: ["恋で世界線を越えた人", "誰かを選ぶたび、住む町、言葉、仕事、そして自分の輪郭まで少しずつ変わりました。"],
    family: ["家族という長編映画を撮った人", "大事件よりも、食卓で交わした短い会話が人生の伏線になっていました。"]
  };

  const turningPointRules = [
    {
      stages: ["high", "twenties", "firstWork"],
      careers: ["baseball", "athlete", "soccer"],
      title: "怪我で予定表が破れる",
      text: "選手としての道は少し曇りましたが、教える側、支える側、伝える側の才能が急に光り始めます。",
      addCareers: { teacher: 2, soccer: 1, public: 1 },
      addStats: { trust: 1, mind: 1 }
    },
    {
      stages: ["junior", "high", "twenties"],
      careers: ["artist", "actor", "media"],
      title: "一枚の映像が知らない街で話題になる",
      text: "本人の知らないところで広がった評判が、次の選択肢に少し危険な近道を作りました。",
      addCareers: { media: 2, fame: 1 },
      addStats: { fame: 1, charm: 1 }
    },
    {
      stages: ["twenties", "firstWork", "thirties"],
      careers: ["writer", "journalist", "politics"],
      title: "書いた文章が小さな騒動を起こす",
      text: "謝るべきか、逃げるべきか、さらに書くべきか。ここで社会と自分の距離が一気に縮まります。",
      addCareers: { journalist: 2, politics: 1 },
      addStats: { mind: 1, fame: 1 }
    },
    {
      stages: ["twenties", "firstWork", "thirties", "middle"],
      careers: ["agriculture", "business", "public"],
      title: "実家の土地をめぐる話し合いが始まる",
      text: "継ぐのか、売るのか、別の形で残すのか。家族の歴史が仕事の選択に割り込んできます。",
      addCareers: { agriculture: 2, business: 1, public: 1 },
      addStats: { trust: 1, mind: 1 }
    },
    {
      stages: ["firstWork", "thirties", "middle"],
      careers: ["salaryman", "business", "public"],
      title: "辞令で人生の地図が折り直される",
      text: "望まない異動先で、思いがけない師匠、恋、あるいは事件と出会います。",
      addCareers: { salaryman: 2, travel: 1 },
      addStats: { trust: 1, freedom: 1 }
    },
    {
      stages: ["twenties", "firstWork", "thirties", "middle"],
      careers: ["homemaker", "teacher", "public"],
      title: "家族の事件で表舞台が変わる",
      text: "守るべき日常が増えたことで、逆に地域や学校の中心へ押し出されていきます。",
      addCareers: { homemaker: 2, public: 2, teacher: 1 },
      addStats: { trust: 2 }
    },
    {
      stages: ["firstWork", "thirties", "middle"],
      careers: ["architect", "science", "artist"],
      title: "古い建物の解体前夜に呼ばれる",
      text: "締切は朝。あなたの図面一枚が、町の記憶を残すか消すかを決めることになります。",
      addCareers: { architect: 2, public: 1 },
      addStats: { art: 1, trust: 1 }
    },
    {
      stages: ["thirties", "middle", "late"],
      careers: ["travel", "wander"],
      title: "国境の駅で恋人候補に再会する",
      text: "偶然にしては出来すぎた再会が、仕事も住む場所も言葉も変えてしまいます。",
      addCareers: { travel: 2, writer: 1 },
      addStats: { charm: 2, freedom: 1 }
    },
    {
      stages: ["middle", "late", "final"],
      careers: ["teacher", "public", "writer"],
      title: "昔の教え子から一通の手紙が届く",
      text: "忘れていた一言が誰かの人生を変えていたと知り、晩年の看板が静かに書き換わります。",
      addCareers: { teacher: 2, writer: 1 },
      addStats: { trust: 2 }
    },
    {
      stages: ["high", "twenties", "firstWork"],
      careers: ["romance", "travel", "writer"],
      title: "遠距離恋愛で時差に負けそうになる",
      text: "眠い声で交わした約束が、留学、転職、移住のどれかを選ばせようとしてきます。",
      addCareers: { romance: 2, travel: 2, writer: 1 },
      addStats: { charm: 1, freedom: 1 }
    },
    {
      stages: ["twenties", "firstWork", "thirties"],
      careers: ["romance", "artist", "actor", "media"],
      title: "恋人の一言で進路を変える",
      text: "応援だったのか挑発だったのか分からない言葉が、眠っていた野心を起こします。",
      addCareers: { romance: 2, artist: 1, business: 1 },
      addStats: { charm: 1, art: 1 }
    },
    {
      stages: ["firstWork", "thirties", "middle"],
      careers: ["romance", "family", "homemaker"],
      title: "結婚話が人生会議になる",
      text: "愛だけでは決まらない住む場所、仕事、親、子ども、名字の話が一気に押し寄せます。",
      addCareers: { romance: 2, family: 2, homemaker: 1 },
      addStats: { trust: 2 }
    },
    {
      stages: ["thirties", "middle"],
      careers: ["romance", "salaryman", "public", "business"],
      title: "職場恋愛が噂になってしまう",
      text: "守るために黙るのか、全部話して別の町へ行くのか。仕事と恋が同じ会議室に並びます。",
      addCareers: { romance: 2, travel: 1, salaryman: 1 },
      addStats: { charm: 1, trust: 1 }
    },
    {
      stages: ["middle", "late", "final"],
      careers: ["romance", "family", "travel"],
      title: "昔の恋人と駅で再会する",
      text: "もう何かが始まる年齢ではないと思っていたのに、切符売り場の前で心だけが若返ります。",
      addCareers: { romance: 3, travel: 1, writer: 1 },
      addStats: { charm: 2, freedom: 1 }
    }
  ];

  const colors = ["#f5c542", "#e96b56", "#5aa86c", "#4776b9", "#7558a6"];
  const careerLabels = {
    baseball: "野球",
    athlete: "スポーツ",
    artist: "芸術",
    politics: "政治",
    public: "公的な仕事",
    writer: "作家",
    actor: "映画・俳優",
    wander: "放浪",
    travel: "海外",
    media: "メディア",
    business: "ビジネス",
    journalist: "報道",
    science: "科学",
    teacher: "教師",
    architect: "建築家",
    salaryman: "会社員",
    homemaker: "家庭",
    agriculture: "農業",
    soccer: "サッカー",
    romance: "恋愛",
    family: "家族"
  };
  const genderLabels = {
    female: "女性として生きる",
    male: "男性として生きる",
    neutral: "ノンバイナリー / 自由"
  };

  const homeProfiles = {
    salary: {
      label: "会社員家庭",
      opening: "朝の定期券、夕方のニュース、家計簿の数字が、安定と我慢の意味を教えてくれます。",
      stats: { trust: 1, mind: 1 },
      careers: { salaryman: 2, business: 1 }
    },
    farm: {
      label: "農家",
      opening: "田んぼの水音、軽トラの荷台、季節に逆らえない暮らしが、身体に時間を刻みます。",
      stats: { body: 2, trust: 1 },
      careers: { agriculture: 2, business: 1 }
    },
    shop: {
      label: "商店",
      opening: "レジの音、常連の世間話、閉店後のシャッターが、人の顔を読む力を育てます。",
      stats: { charm: 1, trust: 1 },
      careers: { business: 2, media: 1 }
    },
    factory: {
      label: "町工場",
      opening: "機械油の匂い、図面の端、親の手の傷が、ものづくりの誇りを近くに置きます。",
      stats: { mind: 1, art: 1 },
      careers: { science: 2, architect: 1 }
    },
    public: {
      label: "公務員家庭",
      opening: "きちんと並んだ書類、転勤の話、地域の行事が、社会を支える仕事を身近にします。",
      stats: { trust: 2 },
      careers: { public: 2, teacher: 1 }
    },
    fishery: {
      label: "漁師町",
      opening: "潮風、早朝の市場、荒れた海を読む大人たちが、遠くへ出る勇気を育てます。",
      stats: { body: 2, freedom: 1 },
      careers: { travel: 1, athlete: 1, business: 1 }
    }
  };

  const careerLinks = {
    baseball: ["athlete", "soccer", "teacher", "media"],
    athlete: ["baseball", "soccer", "teacher", "public"],
    artist: ["actor", "media", "writer", "architect"],
    politics: ["public", "journalist", "business"],
    public: ["politics", "teacher", "salaryman", "homemaker"],
    writer: ["journalist", "media", "teacher", "romance"],
    actor: ["artist", "media", "romance"],
    wander: ["travel", "writer", "romance"],
    travel: ["wander", "romance", "writer", "media"],
    media: ["artist", "actor", "writer", "business"],
    business: ["salaryman", "media", "agriculture", "shop"],
    journalist: ["writer", "politics", "media"],
    science: ["architect", "teacher", "business"],
    teacher: ["public", "writer", "athlete", "family"],
    architect: ["science", "artist", "public", "business"],
    salaryman: ["business", "public", "romance", "family"],
    homemaker: ["family", "public", "writer"],
    agriculture: ["business", "public", "family"],
    soccer: ["athlete", "teacher", "media"],
    romance: ["family", "travel", "writer", "artist"],
    family: ["homemaker", "teacher", "public", "romance"]
  };

  const careerConsequences = {
    baseball: "体で覚えた勝負勘は、あとで教える側や支える側へ形を変えます。",
    athlete: "競技そのものより、限界を知った経験が次の場所で効いてきます。",
    artist: "表現の癖は、恋愛にも仕事にも逃げ道ではなく武器として残ります。",
    politics: "人前で言葉を選ぶ経験が、地域や会社の面倒な場面で効いてきます。",
    public: "誰かの生活を支える目線が、派手ではないけれど長い信用になります。",
    writer: "書き残す癖が、選ばなかった人生まであとで回収していきます。",
    actor: "見られる怖さを知ったことで、普段の沈黙まで芝居の一部になります。",
    wander: "遠回りは職歴には書きにくいけれど、決断の早さだけは育てます。",
    travel: "外へ出た記憶が、地元を見る目を少しだけ冷静にします。",
    media: "誰かに届く形へ整える力が、時代が変わっても残ります。",
    business: "損得を読む目が、人間関係の貸し借りまで見抜くようになります。",
    journalist: "小さな違和感を見逃さない癖が、後の大きな選択を救います。",
    science: "仕組みを分解する癖が、人生の失敗まで実験として扱わせます。",
    teacher: "教える側へ回った経験が、自分自身のやり直し方も変えます。",
    architect: "場所を作る視点が、人との距離や家族の形まで考え直させます。",
    salaryman: "組織の中で我慢した時間が、後に現実的な交渉力になります。",
    homemaker: "暮らしを回す段取りが、表に出ない人生の主導権になります。",
    agriculture: "季節と家族に合わせる生活が、派手な夢にも足場を作ります。",
    soccer: "ピッチを外から見る経験が、誰かを勝たせる仕事へつながります。",
    romance: "誰かを選ぶことが、住む場所と仕事の優先順位を静かに変えます。",
    family: "家族の都合は制約ではなく、物語を深くする伏線になります。"
  };

  const countryProfiles = {
    jp: {
      label: "日本",
      familyFirst: true,
      family: ["佐藤", "鈴木", "高橋", "田中", "渡辺", "伊藤", "山本"],
      given: {
        male: {
          1930: ["勇", "実", "清"],
          1940: ["勝", "博", "進"],
          1950: ["誠", "修", "隆"],
          1960: ["浩", "哲也", "誠"],
          1970: ["大輔", "健一", "直樹"],
          1980: ["翔太", "大輔", "健太"],
          1990: ["大輝", "翔太", "拓也"],
          2000: ["蓮", "悠斗", "陽翔"],
          2010: ["蓮", "湊", "陽翔"],
          2020: ["蓮", "碧", "湊"]
        },
        female: {
          1930: ["和子", "幸子", "節子"],
          1940: ["和子", "洋子", "恵子"],
          1950: ["恵子", "由美子", "久美子"],
          1960: ["直美", "智子", "由美"],
          1970: ["陽子", "裕子", "真由美"],
          1980: ["愛", "麻衣", "彩"],
          1990: ["美咲", "葵", "さくら"],
          2000: ["陽菜", "結衣", "さくら"],
          2010: ["陽葵", "結菜", "凛"],
          2020: ["紬", "陽葵", "凛"]
        },
        neutral: {
          1930: ["光", "薫", "明"],
          1940: ["光", "薫", "幸"],
          1950: ["真", "明", "光"],
          1960: ["薫", "真", "泉"],
          1970: ["翼", "光", "歩"],
          1980: ["翼", "葵", "悠"],
          1990: ["葵", "翼", "悠"],
          2000: ["陽", "悠", "空"],
          2010: ["碧", "凪", "陽"],
          2020: ["凪", "碧", "翠"]
        }
      }
    },
    us: {
      label: "アメリカ",
      familyFirst: false,
      family: ["Smith", "Johnson", "Williams", "Brown", "Davis", "Miller", "Wilson"],
      given: {
        male: {
          1930: ["James", "Robert", "John"],
          1940: ["James", "Robert", "Richard"],
          1950: ["Michael", "David", "James"],
          1960: ["Michael", "David", "John"],
          1970: ["Michael", "Christopher", "Jason"],
          1980: ["Michael", "Christopher", "Matthew"],
          1990: ["Michael", "Christopher", "Matthew"],
          2000: ["Jacob", "Michael", "Joshua"],
          2010: ["Noah", "Liam", "Jacob"],
          2020: ["Liam", "Noah", "Oliver"]
        },
        female: {
          1930: ["Mary", "Betty", "Barbara"],
          1940: ["Mary", "Linda", "Patricia"],
          1950: ["Mary", "Linda", "Patricia"],
          1960: ["Lisa", "Mary", "Karen"],
          1970: ["Jennifer", "Amy", "Melissa"],
          1980: ["Jessica", "Jennifer", "Amanda"],
          1990: ["Jessica", "Ashley", "Emily"],
          2000: ["Emily", "Madison", "Emma"],
          2010: ["Emma", "Olivia", "Sophia"],
          2020: ["Olivia", "Emma", "Charlotte"]
        },
        neutral: {
          1930: ["Lee", "Marion", "Jackie"],
          1940: ["Lee", "Robin", "Jackie"],
          1950: ["Robin", "Dana", "Casey"],
          1960: ["Robin", "Tracy", "Dana"],
          1970: ["Taylor", "Jordan", "Morgan"],
          1980: ["Taylor", "Jordan", "Casey"],
          1990: ["Jordan", "Taylor", "Morgan"],
          2000: ["Riley", "Avery", "Jordan"],
          2010: ["Avery", "Riley", "Parker"],
          2020: ["Riley", "Avery", "Quinn"]
        }
      }
    },
    uk: {
      label: "イギリス",
      familyFirst: false,
      family: ["Smith", "Jones", "Taylor", "Brown", "Williams", "Wilson", "Evans"],
      given: {
        male: {
          1930: ["John", "Peter", "David"],
          1940: ["David", "John", "Michael"],
          1950: ["David", "John", "Paul"],
          1960: ["David", "Paul", "Andrew"],
          1970: ["David", "Andrew", "Mark"],
          1980: ["Christopher", "James", "Matthew"],
          1990: ["Jack", "Thomas", "James"],
          2000: ["Jack", "Oliver", "Thomas"],
          2010: ["Oliver", "Harry", "George"],
          2020: ["Noah", "Oliver", "George"]
        },
        female: {
          1930: ["Margaret", "Patricia", "Jean"],
          1940: ["Susan", "Patricia", "Margaret"],
          1950: ["Susan", "Linda", "Christine"],
          1960: ["Sarah", "Claire", "Nicola"],
          1970: ["Sarah", "Emma", "Laura"],
          1980: ["Sarah", "Emma", "Laura"],
          1990: ["Emily", "Sophie", "Jessica"],
          2000: ["Olivia", "Emily", "Jessica"],
          2010: ["Olivia", "Amelia", "Isla"],
          2020: ["Olivia", "Amelia", "Isla"]
        },
        neutral: {
          1930: ["Leslie", "Robin", "Vivian"],
          1940: ["Robin", "Leslie", "Hilary"],
          1950: ["Robin", "Kim", "Lindsay"],
          1960: ["Kim", "Ashley", "Lindsay"],
          1970: ["Ashley", "Sam", "Alex"],
          1980: ["Alex", "Sam", "Jamie"],
          1990: ["Jamie", "Alex", "Morgan"],
          2000: ["Morgan", "Charlie", "Alex"],
          2010: ["Charlie", "Riley", "Rowan"],
          2020: ["Rowan", "Riley", "Robin"]
        }
      }
    },
    fr: {
      label: "フランス",
      familyFirst: false,
      family: ["Martin", "Bernard", "Dubois", "Thomas", "Robert", "Petit", "Durand"],
      given: {
        male: {
          1930: ["Jean", "Michel", "Pierre"],
          1940: ["Jean", "Michel", "Alain"],
          1950: ["Philippe", "Jean", "Patrick"],
          1960: ["Christophe", "Philippe", "Laurent"],
          1970: ["Nicolas", "Julien", "Sébastien"],
          1980: ["Nicolas", "Julien", "Thomas"],
          1990: ["Thomas", "Nicolas", "Quentin"],
          2000: ["Lucas", "Hugo", "Thomas"],
          2010: ["Gabriel", "Raphaël", "Léo"],
          2020: ["Gabriel", "Léo", "Raphaël"]
        },
        female: {
          1930: ["Marie", "Monique", "Jacqueline"],
          1940: ["Marie", "Françoise", "Monique"],
          1950: ["Martine", "Marie", "Sylvie"],
          1960: ["Nathalie", "Isabelle", "Catherine"],
          1970: ["Stéphanie", "Aurélie", "Céline"],
          1980: ["Élodie", "Julie", "Audrey"],
          1990: ["Manon", "Camille", "Laura"],
          2000: ["Emma", "Léa", "Chloé"],
          2010: ["Emma", "Jade", "Louise"],
          2020: ["Jade", "Louise", "Ambre"]
        },
        neutral: {
          1930: ["Claude", "Dominique", "Camille"],
          1940: ["Claude", "Dominique", "Camille"],
          1950: ["Dominique", "Claude", "Camille"],
          1960: ["Dominique", "Camille", "Sasha"],
          1970: ["Camille", "Sasha", "Noa"],
          1980: ["Camille", "Sasha", "Noa"],
          1990: ["Camille", "Noa", "Sasha"],
          2000: ["Noa", "Sasha", "Camille"],
          2010: ["Noa", "Charlie", "Sasha"],
          2020: ["Charlie", "Noa", "Sasha"]
        }
      }
    },
    br: {
      label: "ブラジル",
      familyFirst: false,
      family: ["Silva", "Santos", "Oliveira", "Souza", "Pereira", "Costa", "Lima"],
      given: {
        male: {
          1930: ["José", "João", "Antônio"],
          1940: ["José", "João", "Carlos"],
          1950: ["José", "Antônio", "Carlos"],
          1960: ["José", "Carlos", "Paulo"],
          1970: ["Carlos", "Marcelo", "Ricardo"],
          1980: ["Lucas", "Rafael", "Bruno"],
          1990: ["Lucas", "Gabriel", "Matheus"],
          2000: ["Miguel", "Arthur", "Davi"],
          2010: ["Miguel", "Arthur", "Heitor"],
          2020: ["Miguel", "Gael", "Arthur"]
        },
        female: {
          1930: ["Maria", "Ana", "Francisca"],
          1940: ["Maria", "Ana", "Terezinha"],
          1950: ["Maria", "Ana", "Fátima"],
          1960: ["Maria", "Sandra", "Ana"],
          1970: ["Juliana", "Patrícia", "Fernanda"],
          1980: ["Juliana", "Camila", "Aline"],
          1990: ["Ana", "Beatriz", "Mariana"],
          2000: ["Maria Eduarda", "Ana Clara", "Julia"],
          2010: ["Alice", "Sophia", "Laura"],
          2020: ["Helena", "Alice", "Laura"]
        },
        neutral: {
          1930: ["Darcy", "Jaci", "Ariel"],
          1940: ["Darcy", "Jaci", "Ariel"],
          1950: ["Ariel", "Darcy", "Jaci"],
          1960: ["Ariel", "René", "Jaci"],
          1970: ["Ariel", "René", "Alex"],
          1980: ["Alex", "Ariel", "Sasha"],
          1990: ["Sasha", "Alex", "Ariel"],
          2000: ["Noah", "Alex", "Sasha"],
          2010: ["Noah", "Ariel", "Sasha"],
          2020: ["Noah", "Ariel", "Sasha"]
        }
      }
    },
    in: {
      label: "インド",
      familyFirst: false,
      family: ["Sharma", "Patel", "Singh", "Kumar", "Gupta", "Reddy", "Nair"],
      given: {
        male: {
          1930: ["Ramesh", "Suresh", "Rajendra"],
          1940: ["Ramesh", "Suresh", "Vijay"],
          1950: ["Rajesh", "Amit", "Sanjay"],
          1960: ["Amit", "Rajesh", "Vikram"],
          1970: ["Rahul", "Amit", "Vikram"],
          1980: ["Rahul", "Arjun", "Rohit"],
          1990: ["Aditya", "Rahul", "Arjun"],
          2000: ["Aarav", "Arjun", "Aditya"],
          2010: ["Aarav", "Vihaan", "Arjun"],
          2020: ["Aarav", "Vihaan", "Reyansh"]
        },
        female: {
          1930: ["Lakshmi", "Kamala", "Sita"],
          1940: ["Lakshmi", "Kamala", "Usha"],
          1950: ["Sunita", "Usha", "Anita"],
          1960: ["Anita", "Sunita", "Pooja"],
          1970: ["Priya", "Pooja", "Anita"],
          1980: ["Priya", "Neha", "Pooja"],
          1990: ["Neha", "Pooja", "Anjali"],
          2000: ["Ananya", "Aditi", "Diya"],
          2010: ["Aadhya", "Ananya", "Diya"],
          2020: ["Aadhya", "Kiara", "Anika"]
        },
        neutral: {
          1930: ["Kiran", "Shashi", "Jyoti"],
          1940: ["Kiran", "Shashi", "Jyoti"],
          1950: ["Kiran", "Jyoti", "Shashi"],
          1960: ["Kiran", "Aman", "Jyoti"],
          1970: ["Aman", "Kiran", "Jaya"],
          1980: ["Aman", "Kiran", "Arya"],
          1990: ["Arya", "Aman", "Kiran"],
          2000: ["Arya", "Ira", "Aaradhya"],
          2010: ["Arya", "Aaradhya", "Ira"],
          2020: ["Arya", "Aaradhya", "Ira"]
        }
      }
    }
  };

  let game = null;

  function choice(title, detail, careers, stats) {
    return { title, detail, careers, stats };
  }

  function gatedChoice(title, detail, careers, stats, rule) {
    return { title, detail, careers, stats, rule };
  }

  function contextChoice(title, detail, careers, stats, context, rule) {
    return { title, detail, careers, stats, context, rule };
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function textHash(text) {
    let hash = 0;
    for (let index = 0; index < text.length; index += 1) {
      hash = (hash * 31 + text.charCodeAt(index)) | 0;
    }
    return Math.abs(hash);
  }

  function careerScore(careers) {
    return careers.reduce((total, career) => total + (game?.careers?.[career] || 0), 0);
  }

  function statsMeet(minStats) {
    return Object.entries(minStats || {}).every(([key, value]) => (game?.stats?.[key] || 0) >= value);
  }

  function matchesRule(option, stage, year, event) {
    const rule = option.rule || {};
    if (rule.stages && !rule.stages.includes(stage.id)) {
      return false;
    }
    if (rule.countries && !rule.countries.includes(game.country)) {
      return false;
    }
    if (rule.homes && !rule.homes.includes(game.home)) {
      return false;
    }
    if (rule.genders && !rule.genders.includes(game.gender)) {
      return false;
    }
    if (rule.minYear && year < rule.minYear) {
      return false;
    }
    if (rule.maxYear && year > rule.maxYear) {
      return false;
    }
    if (rule.tags && !rule.tags.some((tag) => event.tags.includes(tag))) {
      return false;
    }
    if (rule.anyCareer && careerScore(rule.anyCareer) < (rule.minScore || 1)) {
      return false;
    }
    if (rule.minStats && !statsMeet(rule.minStats)) {
      return false;
    }
    return true;
  }

  function ruleScore(option, event) {
    const rule = option.rule || {};
    let score = 0;
    if (rule.countries) {
      score += 6;
    }
    if (rule.homes) {
      score += 7;
    }
    if (rule.genders) {
      score += 4;
    }
    if (rule.minYear || rule.maxYear) {
      score += 2;
    }
    if (rule.tags) {
      score += rule.tags.filter((tag) => event.tags.includes(tag)).length * 2;
    }
    if (rule.anyCareer) {
      score += 8;
    }
    if (rule.minStats) {
      score += 3;
    }
    return score;
  }

  function topCareerEntries(limit = 3) {
    return Object.entries(game?.careers || {})
      .filter(([, score]) => score > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
  }

  function linkedMomentum(career) {
    return (careerLinks[career] || []).reduce((best, linkedCareer) => {
      return Math.max(best, (game?.careers?.[linkedCareer] || 0) * 0.55);
    }, 0);
  }

  function trajectoryScore(option, event, stage) {
    const home = homeProfiles[game.home] || homeProfiles.salary;
    let score = ruleScore(option, event);
    let direct = 0;
    let linked = 0;
    for (const career of option.careers) {
      direct += game.careers[career] || 0;
      linked += linkedMomentum(career);
      if (home.careers?.[career]) {
        score += home.careers[career] * 1.5;
      }
      if (event.tags.includes(career)) {
        score += 2;
      }
    }
    score += direct * 2.6 + linked;
    if (stage.age >= 25 && direct === 0 && linked < 2) {
      score -= 6;
    }
    if (option.context?.startsWith("実家")) {
      score += 4;
    }
    return score;
  }

  function optionFitsTrajectory(option, stage, event) {
    if (stage.age < 20) {
      return true;
    }
    const rule = option.rule || {};
    if (rule.anyCareer && careerScore(rule.anyCareer) >= (rule.minScore || 1)) {
      return true;
    }
    if (rule.homes && rule.homes.includes(game.home) && stage.age <= 25) {
      return true;
    }

    const direct = option.careers.reduce((total, career) => total + (game.careers[career] || 0), 0);
    const linked = option.careers.reduce((total, career) => total + linkedMomentum(career), 0);
    const home = homeProfiles[game.home] || homeProfiles.salary;
    const homeRoot = option.careers.some((career) => home.careers?.[career]);

    if (direct >= 2 || linked >= 3) {
      return true;
    }
    if (stage.age <= 25 && homeRoot && direct >= 1) {
      return true;
    }
    if (option.careers.includes("romance") && (stage.age <= 25 || (game.careers.romance || 0) >= 2 || game.stats.charm >= 7)) {
      return true;
    }
    if ((option.careers.includes("family") || option.careers.includes("homemaker")) && (game.stats.trust >= 7 || careerScore(["romance", "family", "homemaker"]) >= 2)) {
      return true;
    }
    if (option.careers.includes("teacher") && game.stats.trust >= 7 && (game.stats.mind >= 6 || careerScore(["public", "writer", "athlete"]) >= 3)) {
      return true;
    }
    if (option.careers.includes("architect") && (game.home === "factory" || careerScore(["architect", "science", "artist"]) >= 4)) {
      return true;
    }
    return trajectoryScore(option, event, stage) >= (stage.age >= 35 ? 4 : 3);
  }

  function rotated(items, seed) {
    if (items.length === 0) {
      return [];
    }
    const start = seed % items.length;
    return [...items.slice(start), ...items.slice(0, start)];
  }

  function fallbackChoicesForStage(stage) {
    const homemakerTitle = game.gender === "female"
      ? "専業主婦として家庭の物語を選ぶ"
      : game.gender === "male"
        ? "専業主夫として家庭の舵を取る"
        : "家庭を軸に、肩書きのない仕事を始める";
    const homemakerDetail = game.gender === "female"
      ? "表舞台から降りたはずの毎日が、家族全員の進路を少しずつ書き換えていく。"
      : game.gender === "male"
        ? "周囲の驚きは長く続かず、気づけば台所がいちばん重要な作戦室になる。"
        : "履歴書には書きにくい日々が、誰かにとって一番頼れる場所になる。";
    const byStage = {
      high: [
        choice("受験勉強に全振りする", "机の上だけは地味でも、ノートの端には未来の設計図が増えていく。", ["science", "teacher", "architect"], { mind: 3 }),
        choice("サッカー部の裏方として戦術を読む", "試合に出ない目線だからこそ、全員の走る理由が見えてくる。", ["soccer", "teacher"], { mind: 1, trust: 2 }),
        choice("帰り道の遠回りを毎日少し伸ばす", "言いたいことを言えない時間が、進路相談よりずっと真剣な悩みになる。", ["romance", "writer"], { charm: 2, mind: 1 })
      ],
      twenties: [
        choice("教員免許を取る", "黒板の前に立つ練習をした夜、人生が少しだけ人のために傾く。", ["teacher", "public"], { mind: 2, trust: 2 }),
        choice("建築の模型を作り始める", "紙と接着剤の匂いの中で、人の居場所を作る仕事に惹かれていく。", ["architect", "artist", "science"], { art: 2, mind: 1 }),
        choice("会社説明会をはしごする", "どこにでもありそうなスーツが、意外なほど別世界への入場券になる。", ["salaryman", "business"], { trust: 2, mind: 1 }),
        choice("旅先で出会った人にもう一度会いに行く", "理由は仕事でも観光でもなく、ただその人のいる町の朝を見たくなる。", ["romance", "travel"], { charm: 2, freedom: 2 }),
        choice(homemakerTitle, homemakerDetail, ["homemaker", "public"], { trust: 3 })
      ],
      firstWork: [
        choice("教員採用試験を受ける", "合格発表の掲示板の前で、初めて誰かの未来を預かる怖さを知る。", ["teacher", "public"], { trust: 2, mind: 1 }),
        choice("建築事務所の末席に座る", "模型の掃除ばかりの日々でも、街の見え方だけは変わっていく。", ["architect", "artist"], { art: 2, trust: 1 }),
        choice("サラリーマンとして初任給をもらう", "封筒の重さは普通なのに、帰り道の景色だけ妙に映画っぽい。", ["salaryman", "business"], { trust: 2 }),
        choice("恋人と暮らす部屋を探す", "間取り図の小さな四角に、仕事より現実的な未来が詰まっている。", ["romance", "family", "homemaker"], { trust: 2, charm: 1 }),
        choice(homemakerTitle, homemakerDetail, ["homemaker", "writer"], { trust: 3 })
      ],
      thirties: [
        choice("学校現場へ転職する", "やり直しの履歴書が、誰かのやり直しを支える仕事につながる。", ["teacher", "public"], { trust: 3 }),
        choice("小さな家の設計を引き受ける", "予算は少ないが、住む人の未来だけは大きい。", ["architect", "artist"], { art: 2, trust: 1 }),
        choice("会社に残って部署を守る", "華やかな勝利ではなく、誰かが辞めずにすむ一日を積み上げる。", ["salaryman", "public"], { trust: 3 }),
        choice("恋人か仕事かを決める夜を迎える", "正解のない選択ほど、翌朝の空が妙にきれいに見える。", ["romance", "business", "travel"], { charm: 2, trust: 1 }),
        choice(homemakerTitle, homemakerDetail, ["homemaker", "public"], { trust: 3 })
      ],
      middle: [
        choice("資格を取り直して教える側へ回る", "遅すぎると言われた挑戦が、若い人には希望として映る。", ["teacher", "public"], { trust: 3, mind: 1 }),
        choice("空き家再生の設計に関わる", "誰も見向きしなかった家が、町の新しい集合場所になる。", ["architect", "public"], { art: 2, trust: 2 }),
        choice("会社の危機を現場で受け止める", "出世ではなく、部下の生活を守るために会議室へ戻る。", ["salaryman", "business"], { trust: 3 }),
        choice("夫婦でも恋人でもない相棒を選ぶ", "名前をつけにくい関係ほど、長い人生では案外強かったりする。", ["romance", "family", "writer"], { trust: 2, charm: 2 })
      ],
      late: [
        choice("地域の子どもに無料で教える", "小さな机を囲む時間が、晩年のいちばんにぎやかな仕事になる。", ["teacher", "public"], { trust: 3 }),
        choice("家族の年表を一冊にまとめる", "家庭の小さな出来事を並べると、思った以上に大河ドラマだった。", ["homemaker", "writer"], { trust: 2, mind: 1 }),
        choice("古い店の改装を手伝う", "壁紙を剥がした下から、町の忘れ物みたいな記憶が出てくる。", ["architect", "artist"], { art: 2, trust: 1 }),
        choice("昔好きだった人に短い手紙を書く", "返事が来なくても、書いた瞬間に一つの人生が静かに完結する。", ["romance", "writer"], { charm: 2, mind: 1 })
      ]
    };
    return byStage[stage.id] || [];
  }

  function choicesForStage(stage, year, event) {
    const seed = textHash(`${game.country}-${game.home}-${game.gender}-${game.birthYear}-${stage.id}-${year}`);
    const usedTitles = new Set([
      ...(game.log || []).map((item) => item.choice),
      ...(game.offeredChoices || [])
    ]);
    const chosenTitles = new Set((game.log || []).map((item) => item.choice));
    const uniqueByTitle = (items) => {
      const seen = new Set();
      return items.filter((option) => {
        if (!option || seen.has(option.title) || usedTitles.has(option.title)) {
          return false;
        }
        seen.add(option.title);
        return true;
      });
    };
    const matched = uniqueByTitle(dramaticChoiceRules
      .filter((option) => matchesRule(option, stage, year, event))
      .filter((option) => optionFitsTrajectory(option, stage, event))
      .sort((a, b) => {
        const scoreDiff = trajectoryScore(b, event, stage) - trajectoryScore(a, event, stage);
        if (scoreDiff !== 0) {
          return scoreDiff;
        }
        return textHash(`${a.title}-${seed}`) - textHash(`${b.title}-${seed}`);
      }));
    const baseChoices = uniqueByTitle(rotated(stage.choices, seed)
      .filter((option) => matchesRule(option, stage, year, event))
      .filter((option) => optionFitsTrajectory(option, stage, event))
      .sort((a, b) => trajectoryScore(b, event, stage) - trajectoryScore(a, event, stage)));

    const fallbackChoices = uniqueByTitle(rotated(fallbackChoicesForStage(stage), seed + 7)
      .filter((option) => optionFitsTrajectory(option, stage, event))
      .sort((a, b) => trajectoryScore(b, event, stage) - trajectoryScore(a, event, stage)));
    const allCandidates = uniqueByTitle([...matched, ...baseChoices, ...fallbackChoices]);
    const topPaths = topCareerEntries(3).map(([career]) => career);
    const lastCareers = game.log[game.log.length - 1]?.careers || [];
    const activeCareers = [...new Set([...topPaths, ...lastCareers])];
    const home = homeProfiles[game.home] || homeProfiles.salary;
    const isLinkedToPath = (option) => option.careers.some((career) => {
      if (activeCareers.includes(career)) {
        return true;
      }
      return activeCareers.some((activeCareer) => (careerLinks[activeCareer] || []).includes(career));
    });
    const isHomeOrEraPressure = (option) => {
      const homeCareer = option.careers.some((career) => home.careers?.[career]);
      const eraCareer = option.careers.some((career) => event.tags.includes(career));
      return homeCareer || eraCareer || option.rule?.homes?.includes(game.home);
    };
    const sorted = (items) => items
      .slice()
      .sort((a, b) => {
        const scoreDiff = trajectoryScore(b, event, stage) - trajectoryScore(a, event, stage);
        if (scoreDiff !== 0) {
          return scoreDiff;
        }
        return textHash(`${a.title}-${seed}`) - textHash(`${b.title}-${seed}`);
      });

    const continuityPool = sorted(allCandidates.filter((option) => stage.age < 13 || isLinkedToPath(option)));
    const pivotPool = sorted(allCandidates.filter((option) => {
      if (continuityPool[0]?.title === option.title) {
        return false;
      }
      return isHomeOrEraPressure(option) || !isLinkedToPath(option);
    }));
    const revisitCareers = ["family", "romance", "salaryman", "homemaker", "business", "public", "teacher"];
    const revisitPool = sorted(allCandidates.filter((option) => {
      if (continuityPool[0]?.title === option.title || pivotPool[0]?.title === option.title) {
        return false;
      }
      return option.careers.some((career) => {
        return revisitCareers.includes(career) || activeCareers.includes(career) || home.careers?.[career];
      });
    }));
    const rescuePool = sorted(uniqueByTitle([...stage.choices, ...dramaticChoiceRules, ...fallbackChoicesForStage(stage)])
      .filter((option) => matchesRule(option, stage, year, event)));
    const lastResortPool = sorted([...stage.choices, ...dramaticChoiceRules, ...fallbackChoicesForStage(stage)]
      .filter((option) => matchesRule(option, stage, year, event))
      .filter((option) => !chosenTitles.has(option.title)));

    const selected = [];
    const addChoice = (option, mode) => {
      if (!option || selected.some((existing) => existing.title === option.title)) {
        return;
      }
      selected.push(enrichChoice(option, mode, stage, event));
    };

    addChoice(continuityPool[0] || sorted(allCandidates)[0] || rescuePool[0], "continue");
    addChoice(pivotPool[0] || sorted(allCandidates).find((option) => option.title !== selected[0]?.title) || rescuePool.find((option) => option.title !== selected[0]?.title), "pivot");
    addChoice(revisitPool.find((option) => !selected.some((existing) => existing.title === option.title)) || rescuePool.find((option) => !selected.some((existing) => existing.title === option.title)), "revisit");
    if (selected.length < 3) {
      addChoice(rescuePool.find((option) => !selected.some((existing) => existing.title === option.title)), selected.length === 0 ? "continue" : selected.length === 1 ? "pivot" : "revisit");
    }
    if (selected.length < 3) {
      addChoice(lastResortPool.find((option) => !selected.some((existing) => existing.title === option.title)), selected.length === 0 ? "continue" : selected.length === 1 ? "pivot" : "revisit");
    }
    return selected.slice(0, 3);
  }

  function enrichChoice(option, mode, stage, event) {
    return {
      ...option,
      routeLabel: mode === "continue" ? "A いまの道を進む" : mode === "pivot" ? "B 境遇を越える" : "C もう一度悩む",
      routeHint: choiceRouteHint(option, mode, stage, event),
      risk: choiceRiskText(option, mode)
    };
  }

  function choiceRouteHint(option, mode, stage, event) {
    const previous = game.log[game.log.length - 1];
    if (mode === "revisit" && previous) {
      return `前に保留した迷いが、別の形でもう一度戻ってくる道。`;
    }
    if (mode === "revisit") {
      return `${game.homeLabel}で覚えた安心と不安が、もう一度足を止める道。`;
    }
    if (mode === "continue" && previous) {
      return `前の「${previous.choice}」から自然につながる道。`;
    }
    if (mode === "continue") {
      return `${game.homeLabel}の空気から伸びる最初の道。`;
    }
    const eventCareer = option.careers.find((career) => event.tags.includes(career));
    if (eventCareer) {
      return `${event.title}の波に乗って、別の場所へ踏み出す道。`;
    }
    return `${game.homeLabel}で身についた癖を、あえて別方向へ使う道。`;
  }

  function choiceRiskText(option, mode) {
    if (mode === "revisit") {
      return "先延ばしにした問いほど、あとで大きく戻ってくる。";
    }
    if (option.careers.some((career) => ["artist", "actor", "writer", "media"].includes(career))) {
      return mode === "continue" ? "届かなければ、暮らしは少し不安定になる。" : "見られるほど、失敗も人前に残る。";
    }
    if (option.careers.some((career) => ["travel", "wander", "romance"].includes(career))) {
      return mode === "continue" ? "遠くへ行くほど、戻る場所との距離も広がる。" : "大切な人や地元を置いていく痛みがある。";
    }
    if (option.careers.some((career) => ["public", "politics", "teacher"].includes(career))) {
      return mode === "continue" ? "期待に応えるほど、自分の本音を後回しにする。" : "人のための選択が、自分の時間を削っていく。";
    }
    if (option.careers.some((career) => ["business", "salaryman", "agriculture", "shop"].includes(career))) {
      return mode === "continue" ? "現実を選ぶほど、夢は具体的な責任になる。" : "家やお金の都合から逃げきれない。";
    }
    if (option.careers.some((career) => ["baseball", "athlete", "soccer"].includes(career))) {
      return mode === "continue" ? "体が限界を迎えた時、次の居場所が必要になる。" : "勝てなければ、努力の理由を自分で作り直す。";
    }
    return mode === "continue" ? "進むほど、別の人生は少しずつ遠ざかる。" : "道を曲げるには、いま持っている安心を手放す。";
  }

  function characterStyle(age = currentStage().age, accent = "#4776b9", mood = "calm") {
    const countryStyles = {
      jp: { skin: "#f3c6a9", hair: "#242424", outfit: "#2f5d8c", accent: "#e95c5c", motif: "桜" },
      us: { skin: "#d8a37d", hair: "#5b3828", outfit: "#315f9f", accent: "#d8483f", motif: "星" },
      uk: { skin: "#e1b391", hair: "#70412b", outfit: "#4e5f7d", accent: "#b33f4b", motif: "格子" },
      fr: { skin: "#e9b798", hair: "#3d3028", outfit: "#283c6b", accent: "#d95154", motif: "線" },
      br: { skin: "#c9895d", hair: "#2a211d", outfit: "#2f9153", accent: "#f2c94c", motif: "太陽" },
      in: { skin: "#b97850", hair: "#1f1b18", outfit: "#c45f38", accent: "#178b86", motif: "花" }
    };
    const era = decadeKey(game.birthYear + age);
    const style = countryStyles[game.country] || countryStyles.jp;
    return {
      ...style,
      accent: accent || style.accent,
      era,
      age,
      mood
    };
  }

  function decadeKey(year) {
    return clamp(Math.floor(year / 10) * 10, 1930, 2020);
  }

  function namesForDecade(table, birthYear) {
    const decade = decadeKey(birthYear);
    if (table[decade]) {
      return table[decade];
    }
    const decades = Object.keys(table)
      .map(Number)
      .sort((a, b) => Math.abs(a - decade) - Math.abs(b - decade));
    return table[decades[0]] || ["光"];
  }

  function makeProfile(birthYear, countryKey, genderKey) {
    const country = countryProfiles[countryKey] || countryProfiles.jp;
    const gender = genderLabels[genderKey] ? genderKey : "neutral";
    const givenTable = country.given[gender] || country.given.neutral;
    const givenList = namesForDecade(givenTable, birthYear);
    const given = givenList[0];
    const family = country.family[Math.abs(birthYear + country.label.length) % country.family.length];
    const name = country.familyFirst ? `${family} ${given}` : `${given} ${family}`;
    return {
      name,
      countryKey: countryKey in countryProfiles ? countryKey : "jp",
      countryLabel: country.label,
      genderKey: gender,
      genderLabel: genderLabels[gender],
      family,
      given
    };
  }

  function updateGeneratedProfile() {
    const birthYear = clamp(Number(birthYearInput.value) || 1988, 1935, 2020);
    const profile = makeProfile(birthYear, "jp", genderSelect.value);
    const home = selectedHomeProfile();
    generatedNamePreview.textContent = `${profile.name}（${home.label}・${profile.genderLabel}）`;
  }

  function adjustBirthYear(delta) {
    const minYear = Number(birthYearInput.min) || 1935;
    const maxYear = Number(birthYearInput.max) || 2020;
    const currentYear = clamp(Number(birthYearInput.value) || 1988, minYear, maxYear);
    birthYearInput.value = String(clamp(currentYear + delta, minYear, maxYear));
    updateGeneratedProfile();
  }

  function selectedHomeProfile() {
    return homeProfiles[homeSelect.value] || homeProfiles.salary;
  }

  function mergeStats(baseStats, homeStats) {
    const stats = { ...baseStats };
    for (const [key, value] of Object.entries(homeStats || {})) {
      stats[key] = clamp((stats[key] || 0) + value, 0, 14);
    }
    return stats;
  }

  function nearestEvent(year) {
    let best = historyEvents[0];
    let bestDistance = Infinity;
    for (const event of historyEvents) {
      const distance = Math.abs(event.year - year);
      if (distance < bestDistance) {
        best = event;
        bestDistance = distance;
      }
    }
    return best;
  }

  function beginGame(event) {
    event.preventDefault();
    const birthYear = clamp(Number(birthYearInput.value) || 1988, 1935, 2020);
    birthYearInput.value = String(birthYear);
    const profile = makeProfile(birthYear, "jp", genderSelect.value);
    const home = selectedHomeProfile();
    game = {
      birthYear,
      heroName: profile.name,
      country: "jp",
      countryLabel: "日本",
      home: homeSelect.value in homeProfiles ? homeSelect.value : "salary",
      homeLabel: home.label,
      gender: profile.genderKey,
      genderLabel: profile.genderLabel,
      stageIndex: 0,
      stats: mergeStats({ body: 4, art: 4, mind: 4, charm: 4, trust: 4, freedom: 4, fame: 0 }, home.stats),
      careers: { ...home.careers },
      log: [],
      offeredChoices: [],
      lastPrimaryCareer: null
    };
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    restartButton.classList.remove("hidden");
    renderStage();
  }

  function currentStage() {
    return stages[game.stageIndex];
  }

  function currentYear() {
    return game.birthYear + currentStage().age;
  }

  function keepGameInView() {
    requestAnimationFrame(() => {
      gameScreen.scrollIntoView({ block: "start" });
    });
  }

  function homePerspective(event, year) {
    const home = homeProfiles[game.home] || homeProfiles.salary;
    const tagMood = event.tags.includes("travel")
      ? `${year}年、外へ出たい気持ちが少し強まります。`
      : event.tags.includes("public")
        ? `${year}年、誰かを支える仕事が近く見えます。`
        : event.tags.includes("artist")
          ? `${year}年、表現する人の背中に風が吹きます。`
          : `${year}年、別の道もまだ遠くで光っています。`;
    return `${home.opening} ${tagMood}`;
  }

  function renderStage() {
    const stage = currentStage();
    const year = currentYear();
    const event = nearestEvent(year);

    outcomePanel.classList.add("hidden");
    choiceArea.classList.remove("hidden");
    choicesEl.classList.remove("hidden");
    ageLabel.textContent = `${stage.age}歳`;
    yearLabel.textContent = `${year}年`;
    nameLabel.textContent = game.heroName;
    genderLabel.textContent = game.genderLabel;
    homeLabel.textContent = game.homeLabel;
    stageLabel.textContent = stage.label;
    historyTitle.textContent = `${event.year}年: ${event.title}`;
    historyText.textContent = `${event.text} ${homePerspective(event, year)}`;
    promptTitle.textContent = `${stage.prompt} 三つの道から選ぶ。`;

    const stageChoices = choicesForStage(stage, year, event);
    game.currentChoices = stageChoices;
    game.offeredChoices.push(...stageChoices.map((option) => option.title));
    choicesEl.innerHTML = "";
    for (const [index, option] of stageChoices.entries()) {
      const button = document.createElement("button");
      button.className = "choice-card";
      button.type = "button";
      button.innerHTML = `
        <em class="choice-route">${option.routeLabel || ["A いまの道を進む", "B 境遇を越える", "C もう一度悩む"][index] || "分岐"}</em>
        <strong>${option.title}</strong>
        <span>${option.routeHint || option.detail}</span>
        ${choicePreview(option)}
      `;
      button.addEventListener("click", () => choose(index));
      choicesEl.appendChild(button);
    }

    renderInfluence(stageChoices);
    drawLifeCanvas();
    keepGameInView();
  }

  function renderInfluence(stageChoices = []) {
    if (!trackLabel || !futureLabel) {
      return;
    }
    const careerEntries = Object.entries(game.careers)
      .filter(([, score]) => score > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    trackLabel.textContent = careerEntries.length > 0
      ? careerEntries.map(([career]) => careerLabels[career] || career).join(" / ")
      : "まだ白紙";

    futureLabel.textContent = stageChoices.length >= 2
      ? stageChoices.map((option) => option.title).join(" / ")
      : "次の選択で道が決まる";
  }

  function choicePreview(option) {
    return `
      <small class="choice-impact">開く先: ${futureSpreadText(option)}</small>
      <small class="choice-risk">リスク: ${option.risk || choiceRiskText(option, "pivot")}</small>
    `;
  }

  function futureSpreadText(option, limit = 3) {
    const futureCareers = [];
    const addCareer = (career) => {
      if (career && !futureCareers.includes(career)) {
        futureCareers.push(career);
      }
    };
    option.careers.forEach(addCareer);
    option.careers.forEach((career) => (careerLinks[career] || []).slice(0, 2).forEach(addCareer));
    return futureCareers
      .slice(0, limit)
      .map((career) => careerLabels[career] || career)
      .join(" / ");
  }

  function choose(choiceIndex) {
    const stage = currentStage();
    const option = game.currentChoices?.[choiceIndex] || stage.choices[choiceIndex];
    const year = currentYear();
    const event = nearestEvent(year);
    const synergy = option.careers.some((tag) => event.tags.includes(tag));

    for (const [key, value] of Object.entries(option.stats)) {
      game.stats[key] = clamp((game.stats[key] || 0) + value, 0, 14);
    }
    for (const career of option.careers) {
      game.careers[career] = (game.careers[career] || 0) + 2 + (synergy ? 1 : 0);
    }
    const primaryCareer = option.careers
      .slice()
      .sort((a, b) => (game.careers[b] || 0) - (game.careers[a] || 0))[0] || option.careers[0];

    const result = makeOutcome(stage, option, event, synergy);
    const turningPoint = applyTurningPoint(stage, option, event);
    if (turningPoint) {
      result.title = turningPoint.title;
      result.text = `${result.text}\n\n【転機】${turningPoint.text}`;
    }
    game.log.push({
      age: stage.age,
      year,
      stage: stage.label,
      choice: option.title,
      routeLabel: option.routeLabel,
      event: event.title,
      primaryCareer,
      careers: option.careers.slice(),
      text: result.text
    });
    game.lastPrimaryCareer = primaryCareer;

    choiceArea.classList.add("hidden");
    choicesEl.classList.add("hidden");
    outcomePanel.classList.remove("hidden");
    outcomeTitle.textContent = result.title;
    outcomeText.textContent = result.text;
    renderInfluence(game.currentChoices || []);
    renderFutureAfterChoice();
    drawLifeCanvas(option, synergy);
    keepGameInView();
  }

  function renderFutureAfterChoice() {
    if (!futureLabel) {
      return;
    }
    const doors = Object.entries(game.careers)
      .filter(([, score]) => score > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([career]) => careerLabels[career] || career);
    futureLabel.textContent = doors.length > 0
      ? `${doors.join(" / ")}へ物語が寄っていく`
      : "次の時代で道が変わる";
  }

  function applyTurningPoint(stage, option, event) {
    if (stage.age < 13) {
      return null;
    }
    const candidates = turningPointRules.filter((rule) => {
      if (!rule.stages.includes(stage.id)) {
        return false;
      }
      return rule.careers.some((career) => option.careers.includes(career) || (game.careers[career] || 0) >= 4);
    });
    if (candidates.length === 0) {
      return null;
    }
    const seed = textHash(`${game.heroName}-${stage.id}-${option.title}-${currentYear()}`);
    if (stage.age < 25 && seed % 3 === 0) {
      return null;
    }
    const rule = candidates[seed % candidates.length];
    for (const [key, value] of Object.entries(rule.addStats || {})) {
      game.stats[key] = clamp((game.stats[key] || 0) + value, 0, 14);
    }
    for (const [career, value] of Object.entries(rule.addCareers || {})) {
      game.careers[career] = (game.careers[career] || 0) + value;
    }
    return {
      title: `転機: ${rule.title}`,
      text: `${rule.title}。${rule.text}`
    };
  }

  function makeOutcome(stage, option, event, synergy) {
    const name = game.heroName;
    const previous = game.log[game.log.length - 1];
    const primaryCareer = option.careers
      .slice()
      .sort((a, b) => (game.careers[b] || 0) - (game.careers[a] || 0))[0] || option.careers[0];
    const pathLabel = careerLabels[primaryCareer] || primaryCareer;
    const bridge = previous
      ? `あの頃の「${previous.choice}」で覚えた感覚が、時間をおいて胸の奥から戻ってきます。`
      : `${game.homeLabel}の毎日は狭くも温かく、外の世界への憧れを少しずつ育てていました。`;
    const eraLine = synergy
      ? `街では「${event.title}」の話題が続き、${name}の背中を押すように空気がざわついていました。`
      : `世の中では「${event.title}」が語られていましたが、${name}にとって大事だったのは目の前の小さな決断でした。`;
    const consequence = careerConsequences[primaryCareer] || "その小さな決断は、あとで思わぬ肩書きに姿を変えます。";
    const risk = option.risk || choiceRiskText(option, "pivot");
    const spread = futureSpreadText(option);
    const fragments = [
      `${name}は「${option.title}」を選びました。${bridge}`,
      `${eraLine} ${option.detail}`,
      `${pathLabel}へ向かう景色は濃くなります。けれど、${risk}`,
      `この先には、${spread}のどれを仕事や暮らしにするかという、新しい迷いが見え始めます。`,
      consequence
    ].filter(Boolean);
    return {
      title: synergy ? "時代の波に乗った" : "小さな決断が残った",
      text: fragments.join("\n\n")
    };
  }

  function nextStage() {
    game.stageIndex += 1;
    if (game.stageIndex >= stages.length) {
      showEnding();
      return;
    }
    renderStage();
  }

  function topCareer() {
    const entries = Object.entries(game.careers).sort((a, b) => b[1] - a[1]);
    return entries[0]?.[0] || "wander";
  }

  function showEnding() {
    const career = topCareer();
    const ending = endings[career] || endings.wander;
    const second = Object.entries(game.careers).sort((a, b) => b[1] - a[1])[1]?.[0];
    const supporting = second && endings[second] ? `裏テーマとして「${endings[second][0]}」の気配も残っています。` : "";
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    endingTitle.textContent = ending[0];
    endingText.textContent = `日本の${game.homeLabel}に${game.birthYear}年に生まれた${game.heroName}は、歴史の横風を受けながら何度も別の自分を選びました。${ending[1]} ${supporting} 映画タイトルは『${makeMovieTitle(career)}』です。`;
    drawPoster(career);
  }

  function makeMovieTitle(career) {
    const event = nearestEvent(game.birthYear + 25);
    const nouns = {
      baseball: "夕焼けの変化球",
      artist: "未来を塗った午後",
      politics: "駅前の小さな革命",
      public: "書類の中の星座",
      writer: "嘘みたいな本当の年表",
      actor: "七分間の主役",
      wander: "帰らない切符",
      travel: "国境で待ち合わせ",
      media: "画面越しの拍手",
      business: "喫茶店の社長室",
      journalist: "路地裏の見出し",
      science: "未完成の未来",
      teacher: "黒板の向こう側",
      architect: "雨の日の駅舎",
      salaryman: "名刺の裏の脱走計画",
      homemaker: "台所から始まる革命",
      agriculture: "土の匂いの未来予報",
      soccer: "ピッチ外の決勝点",
      romance: "国境を越えたラブレター",
      family: "食卓の長いエンドロール"
    };
    return `${event.title}と${nouns[career] || nouns.wander}`;
  }

  function copyTimeline() {
    if (!game) {
      return;
    }
    const profile = `プロフィール: ${game.heroName} / ${game.birthYear}年生まれ / 日本 / ${game.homeLabel} / ${game.genderLabel}`;
    const text = game.log
      .map((item) => `${item.year}年 ${item.age}歳 ${item.stage}: ${item.choice} / 背景: ${item.event}`)
      .join("\n");
    navigator.clipboard?.writeText(`${endingTitle.textContent}\n${profile}\n${endingText.textContent}\n\n${text}`);
    copyButton.textContent = "コピーしました";
    setTimeout(() => {
      copyButton.textContent = "年表をコピー";
    }, 1400);
  }

  function restart() {
    game = null;
    startScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    choiceArea.classList.remove("hidden");
    outcomePanel.classList.add("hidden");
    if (trackLabel && futureLabel) {
      trackLabel.textContent = "まだ白紙";
      futureLabel.textContent = "最初の選択で道が分かれる";
    }
    restartButton.classList.add("hidden");
    drawStartCanvas();
  }

  function setupCanvas(canvas, ctx) {
    const rect = canvas.getBoundingClientRect();
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    canvas.width = Math.max(320, Math.floor(rect.width * dpr));
    canvas.height = Math.max(240, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { width: rect.width, height: rect.height };
  }

  function fillFittedText(ctx, text, x, y, maxWidth, maxSize, minSize = 11, weight = 900, align = "left") {
    let size = maxSize;
    ctx.textAlign = align;
    do {
      ctx.font = `${weight} ${size}px 'Yu Gothic', Meiryo, sans-serif`;
      if (ctx.measureText(text).width <= maxWidth || size <= minSize) {
        break;
      }
      size -= 1;
    } while (size >= minSize);
    ctx.fillText(text, x, y);
  }

  function drawLifeCanvas(selectedOption = null, synergy = false) {
    const { width, height } = setupCanvas(lifeCanvas, lifeCtx);
    const ctx = lifeCtx;
    const stage = currentStage();
    const year = currentYear();
    const progress = game.stageIndex / Math.max(1, stages.length - 1);

    drawCinematicBackdrop(ctx, width, height, year, progress);

    ctx.fillStyle = "rgba(255,242,204,0.9)";
    fillFittedText(ctx, `${year}年 / ${stage.label} / ${game.heroName}`, 24, 34, width * 0.72, 15);
    ctx.fillStyle = "rgba(244,194,96,0.18)";
    fillFittedText(ctx, String(year), width * 0.04, height * 0.52, width * 0.5, clamp(width * 0.16, 54, 118), 34, 900);

    const avatarX = width < 520 ? width * 0.68 : width * 0.72;
    const avatarY = height * 0.56;
    const avatarScale = width < 520 ? 0.98 : 1.24;
    drawPortraitSpotlight(ctx, avatarX, avatarY, width, height);
    drawPhotoPortrait(ctx, avatarX, avatarY, characterStyle(stage.age, selectedOption ? "#f4c260" : "#4ba3a0", selectedOption ? "bright" : "calm"), avatarScale);

    if (selectedOption) {
      const panelWidth = Math.min(width - 44, width < 520 ? width - 44 : width * 0.58);
      ctx.fillStyle = "rgba(19,12,17,0.82)";
      roundRect(ctx, 22, height * 0.15, panelWidth, 96, 8);
      ctx.fill();
      ctx.strokeStyle = synergy ? "#f4c260" : "rgba(75,163,160,0.58)";
      ctx.stroke();
      ctx.fillStyle = "#fff1cc";
      fillFittedText(ctx, selectedOption.title, 40, height * 0.15 + 34, panelWidth - 36, 18);
      ctx.fillStyle = synergy ? "#f4c260" : "#9fe4dc";
      fillFittedText(ctx, selectedOption.routeLabel || (synergy ? "時代の波に乗った" : "静かに分岐した"), 40, height * 0.15 + 62, panelWidth - 36, 13, 11, 900);
      ctx.fillStyle = "rgba(255,244,221,0.7)";
      fillFittedText(ctx, careerSummaryText(), 40, height * 0.15 + 84, panelWidth - 36, 12, 10, 800);
    }
  }

  function drawCinematicBackdrop(ctx, width, height, year, progress) {
    const base = ctx.createLinearGradient(0, 0, width, height);
    base.addColorStop(0, "#12080f");
    base.addColorStop(0.52, "#21141a");
    base.addColorStop(1, "#07080c");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalAlpha = 0.82;
    const beam = ctx.createLinearGradient(width * 0.18, 0, width * 0.78, height);
    beam.addColorStop(0, "rgba(255,225,157,0.22)");
    beam.addColorStop(1, "rgba(75,163,160,0.03)");
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(width * 0.14, 0);
    ctx.lineTo(width * 0.52, 0);
    ctx.lineTo(width * 0.93, height);
    ctx.lineTo(width * 0.42, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = "rgba(78,12,28,0.78)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(width * 0.08, height * 0.18, width * 0.03, height * 0.6, width * 0.14, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width, 0);
    ctx.bezierCurveTo(width * 0.92, height * 0.22, width * 0.98, height * 0.58, width * 0.86, height);
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    for (let i = 0; i < 7; i += 1) {
      const x = width * (0.11 + i * 0.12);
      ctx.strokeStyle = `rgba(244,194,96,${0.06 + progress * 0.04})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, height * 0.16);
      ctx.lineTo(x + width * 0.08, height * 0.78);
      ctx.stroke();
    }

    drawFilmStrip(ctx, width * 0.03, height * 0.08, width * 0.28, height * 0.28, -0.12);
    drawFilmStrip(ctx, width * 0.64, height * 0.04, width * 0.28, height * 0.22, 0.16);

    ctx.save();
    ctx.translate(width * 0.08, height * 0.58);
    ctx.rotate(-0.08);
    ctx.fillStyle = "rgba(255,244,221,0.13)";
    roundRect(ctx, 0, 0, width * 0.38, height * 0.18, 8);
    ctx.fill();
    ctx.fillStyle = "rgba(255,244,221,0.2)";
    for (let i = 0; i < 5; i += 1) {
      ctx.fillRect(16, 18 + i * 18, width * (0.22 + (i % 2) * 0.08), 3);
    }
    ctx.restore();

    ctx.fillStyle = "rgba(5,5,8,0.34)";
    ctx.beginPath();
    ctx.moveTo(width * 0.04, height);
    ctx.lineTo(width * 0.22, height * 0.75);
    ctx.lineTo(width * 0.8, height * 0.75);
    ctx.lineTo(width * 0.96, height);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(244,194,96,0.14)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i += 1) {
      const y = height * (0.78 + i * 0.045);
      ctx.beginPath();
      ctx.moveTo(width * 0.17, y);
      ctx.lineTo(width * 0.84, y);
      ctx.stroke();
    }
  }

  function drawFilmStrip(ctx, x, y, width, height, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = "rgba(7,7,10,0.46)";
    roundRect(ctx, 0, 0, width, height, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(244,194,96,0.18)";
    ctx.stroke();
    ctx.fillStyle = "rgba(255,244,221,0.16)";
    for (let i = 0; i < 6; i += 1) {
      ctx.fillRect(10 + i * (width - 20) / 6, 8, 8, 10);
      ctx.fillRect(10 + i * (width - 20) / 6, height - 18, 8, 10);
    }
    for (let i = 0; i < 3; i += 1) {
      ctx.strokeStyle = "rgba(255,244,221,0.12)";
      ctx.strokeRect(26 + i * width * 0.28, 28, width * 0.2, height - 56);
    }
    ctx.restore();
  }

  function drawChoiceConstellation(ctx, width, height) {
    const log = game.log.slice(-5);
    if (log.length === 0) {
      return;
    }
    ctx.save();
    ctx.strokeStyle = "rgba(75,163,160,0.46)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (const [index] of log.entries()) {
      const x = width * (0.12 + index * 0.09);
      const y = height * (0.18 + (index % 2) * 0.08);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    for (const [index, item] of log.entries()) {
      const x = width * (0.12 + index * 0.09);
      const y = height * (0.18 + (index % 2) * 0.08);
      ctx.fillStyle = "rgba(244,194,96,0.94)";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,244,221,0.76)";
      fillFittedText(ctx, `${item.age}歳`, x - 14, y + 20, 60, 10, 8, 900);
    }
    ctx.restore();
  }

  function drawPortraitSpotlight(ctx, x, y, width, height) {
    const glow = ctx.createRadialGradient(x, y - 20, 10, x, y - 20, Math.min(width, height) * 0.38);
    glow.addColorStop(0, "rgba(255,225,157,0.34)");
    glow.addColorStop(0.45, "rgba(244,194,96,0.14)");
    glow.addColorStop(1, "rgba(244,194,96,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255,241,191,0.18)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x, y + 48, Math.min(width, 230) * 0.22, height * 0.08, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  function careerSummaryText() {
    const entries = Object.entries(game.careers)
      .filter(([, score]) => score > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);
    if (entries.length === 0) {
      return "まだ何者にもなれる";
    }
    return `濃くなった道: ${entries.map(([career]) => careerLabels[career] || career).join(" / ")}`;
  }

  function roleTitleForAge(age) {
    const career = topCareer();
    if (age < 13) {
      const childTitles = {
        business: "小さな商売人",
        media: "街の観察者",
        writer: "物語好き",
        science: "発明好き",
        artist: "絵描き",
        public: "係のリーダー",
        baseball: "校庭の投手",
        athlete: "運動好き"
      };
      return childTitles[career] || "放課後の主人公";
    }
    if (age < 20) {
      if (["science", "architect"].includes(career)) return "理系志望";
      if (["writer", "journalist", "politics", "teacher", "public"].includes(career)) return "文系志望";
      if (["artist", "actor", "media"].includes(career)) return "表現者の卵";
      if (["baseball", "athlete", "soccer"].includes(career)) return "部活の挑戦者";
      return "進路に迷う人";
    }
    if (age < 25) {
      if (["science", "architect"].includes(career)) return "理系学生";
      if (["writer", "journalist", "politics", "teacher", "public"].includes(career)) return "文系学生";
      if (["artist", "actor", "media"].includes(career)) return "表現修業中";
      if (["travel", "wander"].includes(career)) return "旅する若者";
      if (["business", "salaryman"].includes(career)) return "就活生";
      return "社会へ出る前夜";
    }
    if (age < 35) {
      const workTitles = {
        salaryman: "会社員",
        business: "新社会人",
        science: "技術職見習い",
        architect: "設計見習い",
        writer: "文筆業見習い",
        journalist: "記者見習い",
        media: "メディア職",
        artist: "自由業見習い",
        actor: "俳優の卵",
        teacher: "教師",
        public: "公務の人",
        homemaker: "暮らしの舵取り",
        romance: "相棒を持つ人",
        travel: "海外暮らし",
        wander: "放浪者"
      };
      return workTitles[career] || "新社会人";
    }
    if (age < 55) {
      const adultTitles = {
        salaryman: "中堅会社員",
        business: "事業主",
        science: "技術者",
        architect: "建築家",
        writer: "作家",
        journalist: "記者",
        media: "発信者",
        artist: "芸術家",
        actor: "俳優",
        teacher: "教師",
        public: "地域の支え手",
        homemaker: "家庭の司令塔",
        politics: "地域政治家",
        travel: "越境する人",
        wander: "自由業"
      };
      return adultTitles[career] || "人生の転機";
    }
    const lateTitles = {
      writer: "回想録の人",
      teacher: "教える人",
      public: "相談役",
      business: "店主",
      artist: "創作の人",
      actor: "語り部",
      travel: "旅の達人",
      wander: "自由人",
      family: "家族の語り部",
      homemaker: "暮らしの達人"
    };
    return lateTitles[career] || "晩年の主人公";
  }

  function drawStartCanvas() {
    if (!lifeCanvas.isConnected) {
      return;
    }
  }

  function drawPoster(career) {
    const { width, height } = setupCanvas(posterCanvas, posterCtx);
    const ctx = posterCtx;
    const color = colors[Math.abs(career.length + game.birthYear) % colors.length];
    drawCinematicBackdrop(ctx, width, height, game.birthYear + 70, 0.95);

    const posterGlow = ctx.createRadialGradient(width * 0.5, height * 0.38, 10, width * 0.5, height * 0.38, height * 0.45);
    posterGlow.addColorStop(0, `${color}66`);
    posterGlow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = posterGlow;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(244,194,96,0.44)";
    ctx.lineWidth = 2;
    roundRect(ctx, width * 0.08, height * 0.06, width * 0.84, height * 0.86, 8);
    ctx.stroke();

    drawPortraitSpotlight(ctx, width * 0.5, height * 0.43, width, height);
    drawPhotoPortrait(ctx, width * 0.5, height * 0.42, characterStyle(70, color, "proud"), 1.55);

    ctx.fillStyle = "rgba(8,7,10,0.76)";
    roundRect(ctx, width * 0.12, height * 0.63, width * 0.76, height * 0.2, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(244,194,96,0.24)";
    ctx.stroke();

    ctx.fillStyle = "#ffe7a7";
    fillFittedText(ctx, "PARALLEL LIFE", width * 0.5, height * 0.69, width * 0.68, clamp(width * 0.07, 24, 44), 18, 900, "center");
    ctx.fillStyle = "rgba(255,244,221,0.92)";
    fillFittedText(ctx, game.heroName, width * 0.5, height * 0.75, width * 0.68, 20, 13, 900, "center");
    ctx.fillStyle = "rgba(159,228,220,0.9)";
    fillFittedText(ctx, `${game.birthYear} / ${game.homeLabel} / ${careerLabels[career] || career}`, width * 0.5, height * 0.8, width * 0.68, 15, 11, 900, "center");
  }

  function drawRays(ctx, width, height, progress) {
    ctx.save();
    ctx.translate(width * 0.5, height * 0.5);
    for (let i = 0; i < 18; i += 1) {
      ctx.rotate((Math.PI * 2) / 18);
      ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.22)" : "rgba(32,35,42,0.04)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, -height * (0.04 + progress * 0.02));
      ctx.lineTo(width, height * (0.04 + progress * 0.02));
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function drawPhotoPortrait(ctx, x, y, style, scale = 1) {
    if (drawRasterPortrait(ctx, x, y, style, scale)) {
      return;
    }
    const age = style.age;
    const isChild = age < 13;
    const isTeen = age >= 13 && age < 20;
    const isElder = age >= 60;
    const career = topCareer();
    const home = homeProfiles[game.home] || homeProfiles.salary;
    const palette = portraitPalette(career, home);

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    ctx.fillStyle = "rgba(0,0,0,0.34)";
    ctx.beginPath();
    ctx.ellipse(4, 58, 70, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.rotate((textHash(`${game.heroName}-${age}`) % 7 - 3) * 0.006);
    ctx.fillStyle = "#f6ead1";
    roundRect(ctx, -70, -112, 140, 174, 9);
    ctx.fill();
    ctx.strokeStyle = "rgba(90,58,37,0.42)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    roundRect(ctx, -60, -102, 120, 144, 6);
    ctx.clip();
    drawPortraitBackdrop(ctx, palette, home, career, age);
    drawPortraitBust(ctx, style, palette, age, isChild, isTeen, isElder);
    drawPortraitGrain(ctx);
    ctx.restore();

    ctx.fillStyle = "rgba(92,57,36,0.62)";
    fillFittedText(ctx, `${age}歳 / ${roleTitleForAge(age)}`, 0, 54, 118, 8, 6, 800, "center");
    ctx.restore();
  }

  function portraitColumnForAge(age) {
    if (age < 13) {
      return 0;
    }
    if (age < 20) {
      return 1;
    }
    if (age < 35) {
      return 2;
    }
    if (age < 60) {
      return 3;
    }
    return 4;
  }

  function portraitRowForGender() {
    if (game.gender === "male") {
      return 1;
    }
    if (game.gender === "neutral") {
      return 2;
    }
    return 0;
  }

  function drawRasterPortrait(ctx, x, y, style, scale = 1) {
    if (!portraitSheetReady || portraitSheet.naturalWidth === 0) {
      return false;
    }
    const age = style.age;
    const home = homeProfiles[game.home] || homeProfiles.salary;
    const career = topCareer();
    const palette = portraitPalette(career, home);
    const cellWidth = portraitSheet.naturalWidth / 5;
    const cellHeight = portraitSheet.naturalHeight / 3;
    const sx = portraitColumnForAge(age) * cellWidth;
    const sy = portraitRowForGender() * cellHeight;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate((textHash(`${game.heroName}-${age}`) % 7 - 3) * 0.006);

    ctx.fillStyle = "rgba(0,0,0,0.34)";
    ctx.beginPath();
    ctx.ellipse(4, 58, 70, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f6ead1";
    roundRect(ctx, -70, -112, 140, 174, 9);
    ctx.fill();
    ctx.strokeStyle = "rgba(90,58,37,0.42)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    roundRect(ctx, -60, -102, 120, 144, 6);
    ctx.clip();
    ctx.drawImage(portraitSheet, sx, sy, cellWidth, cellHeight, -60, -102, 120, 144);
    const tint = ctx.createLinearGradient(-60, -102, 60, 42);
    tint.addColorStop(0, `${palette[1]}1f`);
    tint.addColorStop(1, `${palette[2]}33`);
    ctx.fillStyle = tint;
    ctx.fillRect(-60, -102, 120, 144);
    ctx.restore();

    ctx.strokeStyle = style.mood === "bright" ? "#f4c260" : "rgba(244,194,96,0.46)";
    ctx.lineWidth = 3;
    roundRect(ctx, -61, -103, 122, 146, 7);
    ctx.stroke();

    ctx.fillStyle = "rgba(92,57,36,0.68)";
    fillFittedText(ctx, `${age}歳 / ${roleTitleForAge(age)}`, 0, 54, 118, 8, 6, 800, "center");
    ctx.restore();
    return true;
  }

  function portraitPalette(career, home) {
    const byCareer = {
      agriculture: ["#8ba76a", "#e6d2a8", "#4d643e"],
      salaryman: ["#516171", "#d9d1c3", "#27313a"],
      business: ["#596b76", "#e0c29c", "#2f3f46"],
      public: ["#61756e", "#d7d9c5", "#34423d"],
      teacher: ["#6b7359", "#eadbb5", "#3d4433"],
      artist: ["#9a6a64", "#efd0a3", "#4b343c"],
      actor: ["#6f4f75", "#e7c7a2", "#30233a"],
      writer: ["#715f53", "#ead6b1", "#3d332e"],
      architect: ["#59707b", "#ddd5c7", "#263944"],
      science: ["#51767c", "#d8e1d6", "#243d42"],
      travel: ["#5e7f89", "#e4c99c", "#263c4a"],
      wander: ["#7c735d", "#e3c894", "#463c2d"],
      romance: ["#9c626c", "#efd1bd", "#4e2e39"],
      family: ["#8a6d53", "#ecd8ad", "#4a3827"],
      homemaker: ["#876a56", "#ead8b6", "#473728"]
    };
    const fallback = {
      farm: ["#8ba76a", "#e6d2a8", "#4d643e"],
      shop: ["#9c6a56", "#ead0a5", "#4a3227"],
      factory: ["#607985", "#d5d5c9", "#2f4148"],
      public: ["#68776d", "#ddd9bd", "#364238"],
      fishery: ["#527f8d", "#e1ceb0", "#233e49"],
      salary: ["#59636f", "#e2d2b8", "#2e343d"]
    };
    return byCareer[career] || fallback[game.home] || fallback.salary;
  }

  function drawPortraitBackdrop(ctx, palette, home, career, age) {
    const bg = ctx.createLinearGradient(-60, -102, 60, 42);
    bg.addColorStop(0, palette[1]);
    bg.addColorStop(0.56, palette[0]);
    bg.addColorStop(1, palette[2]);
    ctx.fillStyle = bg;
    ctx.fillRect(-60, -102, 120, 144);

    ctx.globalAlpha = 0.28;
    ctx.strokeStyle = "#fff3d0";
    ctx.lineWidth = 2;
    if (home.label.includes("農")) {
      for (let i = 0; i < 6; i += 1) {
        ctx.beginPath();
        ctx.moveTo(-60, -18 + i * 12);
        ctx.quadraticCurveTo(0, -30 + i * 9, 60, -22 + i * 12);
        ctx.stroke();
      }
    } else if (home.label.includes("商店")) {
      for (let i = 0; i < 7; i += 1) {
        ctx.fillStyle = i % 2 ? "#fff1bf" : "#b65342";
        ctx.fillRect(-60 + i * 18, -102, 18, 34);
      }
    } else if (home.label.includes("工場")) {
      for (let i = 0; i < 5; i += 1) {
        ctx.strokeRect(-52 + i * 26, -82 + (i % 2) * 12, 18, 36);
      }
    } else if (home.label.includes("漁")) {
      ctx.beginPath();
      ctx.moveTo(-60, -26);
      ctx.quadraticCurveTo(-20, -40, 18, -28);
      ctx.quadraticCurveTo(42, -18, 60, -30);
      ctx.stroke();
    } else {
      for (let i = 0; i < 5; i += 1) {
        ctx.beginPath();
        ctx.moveTo(-46 + i * 22, -88);
        ctx.lineTo(-46 + i * 22, -36);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;

    const eraYear = game.birthYear + age;
    ctx.fillStyle = "rgba(20,18,18,0.28)";
    ctx.font = "900 24px 'Yu Gothic', Meiryo, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(String(decadeKey(eraYear)), -54, -72);
    if (career === "writer" || career === "journalist") {
      ctx.fillRect(-52, -50, 48, 5);
      ctx.fillRect(-52, -38, 70, 4);
    }
    if (career === "baseball" || career === "athlete" || career === "soccer") {
      ctx.beginPath();
      ctx.arc(38, -68, 13, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.45)";
      ctx.stroke();
    }
  }

  function drawPortraitBust(ctx, style, palette, age, isChild, isTeen, isElder) {
    const face = ctx.createRadialGradient(-12, -56, 8, 0, -42, 38);
    face.addColorStop(0, "#ffe1c5");
    face.addColorStop(0.62, style.skin);
    face.addColorStop(1, "#c78e72");
    const hair = isElder ? "#c7c0b6" : style.hair;
    const shoulderY = isChild ? 18 : 12;

    ctx.fillStyle = "rgba(12,10,10,0.35)";
    ctx.beginPath();
    ctx.ellipse(0, 40, 52, 13, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = palette[2];
    ctx.beginPath();
    ctx.moveTo(-48, 44);
    ctx.quadraticCurveTo(-40, shoulderY, -18, 4);
    ctx.lineTo(18, 4);
    ctx.quadraticCurveTo(42, shoulderY, 50, 44);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = isTeen ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.26)";
    ctx.beginPath();
    ctx.moveTo(-14, 5);
    ctx.lineTo(0, 34);
    ctx.lineTo(14, 5);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = style.skin;
    ctx.beginPath();
    ctx.roundRect?.(-9, -12, 18, 24, 7);
    if (!ctx.roundRect) {
      roundRect(ctx, -9, -12, 18, 24, 7);
    }
    ctx.fill();

    ctx.fillStyle = hair;
    ctx.beginPath();
    ctx.ellipse(0, -53, 31, game.gender === "female" ? 39 : 30, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = face;
    ctx.beginPath();
    ctx.ellipse(0, -43, isChild ? 24 : 25, isChild ? 28 : 31, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = hair;
    ctx.beginPath();
    if (game.gender === "male") {
      ctx.moveTo(-25, -58);
      ctx.quadraticCurveTo(-7, -78, 25, -60);
      ctx.quadraticCurveTo(8, -48, -25, -58);
    } else if (game.gender === "neutral") {
      ctx.moveTo(-27, -60);
      ctx.quadraticCurveTo(-3, -80, 26, -58);
      ctx.quadraticCurveTo(6, -42, -27, -60);
    } else {
      ctx.moveTo(-28, -58);
      ctx.quadraticCurveTo(-7, -82, 29, -60);
      ctx.quadraticCurveTo(10, -44, -28, -58);
    }
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(185,112,88,0.16)";
    ctx.beginPath();
    ctx.ellipse(-13, -36, 8, 5, -0.15, 0, Math.PI * 2);
    ctx.ellipse(13, -36, 8, 5, 0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(42,32,30,0.82)";
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-17, -48);
    ctx.quadraticCurveTo(-10, -51, -3, -48);
    ctx.moveTo(3, -48);
    ctx.quadraticCurveTo(10, -51, 17, -48);
    ctx.stroke();

    ctx.strokeStyle = "#1e1a19";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-14, -43);
    ctx.quadraticCurveTo(-9, -45, -4, -43);
    ctx.moveTo(4, -43);
    ctx.quadraticCurveTo(9, -45, 14, -43);
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.beginPath();
    ctx.ellipse(-9, -43.6, 3.8, 1.35, 0, 0, Math.PI * 2);
    ctx.ellipse(9, -43.6, 3.8, 1.35, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#211d1c";
    ctx.beginPath();
    ctx.ellipse(-8.5, -43.7, 1.35, 1.65, 0, 0, Math.PI * 2);
    ctx.ellipse(9.5, -43.7, 1.35, 1.65, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(90,58,49,0.58)";
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.moveTo(0, -42);
    ctx.quadraticCurveTo(-2.5, -36, 1.8, -34);
    ctx.moveTo(-2.2, -33);
    ctx.quadraticCurveTo(0, -32, 2.8, -33);
    ctx.stroke();

    ctx.strokeStyle = "rgba(72,42,40,0.72)";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    const smile = style.mood === "bright" ? 0.9 : isElder ? 0.1 : 0.35;
    ctx.moveTo(-8, -25);
    ctx.quadraticCurveTo(0, -24 + smile * 2, 8, -25);
    ctx.stroke();
    ctx.strokeStyle = "rgba(170,88,82,0.35)";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(-5, -23.5);
    ctx.quadraticCurveTo(0, -22.5 + smile, 5, -23.5);
    ctx.stroke();

    if (isElder) {
      ctx.strokeStyle = "rgba(80,62,56,0.42)";
      ctx.lineWidth = 1;
      for (const y of [-36, -31]) {
        ctx.beginPath();
        ctx.moveTo(-21, y);
        ctx.quadraticCurveTo(-15, y - 2, -8, y);
        ctx.moveTo(8, y);
        ctx.quadraticCurveTo(15, y - 2, 21, y);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(34,28,27,0.58)";
      ctx.beginPath();
      ctx.arc(-9, -44, 7, 0, Math.PI * 2);
      ctx.arc(9, -44, 7, 0, Math.PI * 2);
      ctx.moveTo(-2, -44);
      ctx.lineTo(2, -44);
      ctx.stroke();
    }
  }

  function drawPortraitGrain(ctx) {
    ctx.globalAlpha = 0.14;
    ctx.fillStyle = "#fff7df";
    for (let i = 0; i < 34; i += 1) {
      const x = -58 + (textHash(`${game.heroName}-${i}`) % 116);
      const y = -100 + (textHash(`${game.birthYear}-${i}`) % 138);
      ctx.fillRect(x, y, 1.2, 1.2);
    }
    ctx.globalAlpha = 1;
    const vignette = ctx.createRadialGradient(0, -34, 18, 0, -34, 92);
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.22)");
    ctx.fillStyle = vignette;
    ctx.fillRect(-60, -102, 120, 144);
  }

  function drawCharacter(ctx, x, y, style, scale = 1) {
    const age = style.age;
    const isChild = age < 13;
    const isTeen = age >= 13 && age < 20;
    const isElder = age >= 60;
    const bodyWidth = isChild ? 38 : 46;
    const bodyHeight = isChild ? 54 : isElder ? 62 : 68;
    const headRadius = isChild ? 18 : 20;
    const hair = isElder ? "#c8c0b4" : style.hair;
    const smileLift = style.mood === "bright" ? 1.35 : style.mood === "proud" ? 1.1 : 0.9;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(0,0,0,0.32)";
    ctx.beginPath();
    ctx.ellipse(0, bodyHeight + 25, 46, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    drawCountryAura(ctx, style);
    drawCharacterSilhouette(ctx, style, bodyWidth, bodyHeight, isChild, isTeen, isElder);

    drawLimbs(ctx, style, bodyWidth, bodyHeight, isChild, isElder);

    drawBody(ctx, style, bodyWidth, bodyHeight, isChild, isTeen, isElder);
    drawHairBack(ctx, style, hair, headRadius, isChild);

    ctx.fillStyle = style.skin;
    ctx.beginPath();
    ctx.arc(0, -22, headRadius, 0, Math.PI * 2);
    ctx.fill();

    drawHairFront(ctx, style, hair, headRadius, isChild);
    drawFace(ctx, style, smileLift, isElder);
    drawAgeAndEraDetails(ctx, style, isChild, isTeen, isElder);
    drawPosterRimLight(ctx, style, bodyWidth, bodyHeight, headRadius, isChild);

    ctx.restore();
  }

  function drawLimbs(ctx, style, bodyWidth, bodyHeight, isChild, isElder) {
    const shoulderY = 10;
    const handY = isChild ? 36 : 42;
    const footY = bodyHeight + (isElder ? 16 : 24);
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.strokeStyle = "rgba(13,10,12,0.86)";
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-bodyWidth * 0.38, shoulderY);
    ctx.quadraticCurveTo(-bodyWidth * 0.78, 20, -bodyWidth * 0.68, handY);
    ctx.moveTo(bodyWidth * 0.38, shoulderY);
    ctx.quadraticCurveTo(bodyWidth * 0.78, 20, bodyWidth * 0.68, handY);
    ctx.moveTo(-bodyWidth * 0.22, bodyHeight - 4);
    ctx.lineTo(-bodyWidth * 0.26, footY);
    ctx.moveTo(bodyWidth * 0.18, bodyHeight - 4);
    ctx.lineTo(bodyWidth * 0.24, footY);
    ctx.stroke();

    ctx.strokeStyle = style.skin;
    ctx.lineWidth = 5.5;
    ctx.beginPath();
    ctx.moveTo(-bodyWidth * 0.38, shoulderY);
    ctx.quadraticCurveTo(-bodyWidth * 0.78, 20, -bodyWidth * 0.68, handY);
    ctx.moveTo(bodyWidth * 0.38, shoulderY);
    ctx.quadraticCurveTo(bodyWidth * 0.78, 20, bodyWidth * 0.68, handY);
    ctx.moveTo(-bodyWidth * 0.22, bodyHeight - 4);
    ctx.lineTo(-bodyWidth * 0.26, footY);
    ctx.moveTo(bodyWidth * 0.18, bodyHeight - 4);
    ctx.lineTo(bodyWidth * 0.24, footY);
    ctx.stroke();

    ctx.fillStyle = style.accent;
    ctx.strokeStyle = "rgba(13,10,12,0.86)";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.ellipse(-bodyWidth * 0.3, footY + 3, 10, 5, -0.14, 0, Math.PI * 2);
    ctx.ellipse(bodyWidth * 0.3, footY + 3, 10, 5, 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawCharacterSilhouette(ctx, style, bodyWidth, bodyHeight, isChild, isTeen, isElder) {
    if (isChild) {
      return;
    }
    ctx.save();
    ctx.globalAlpha = isElder ? 0.28 : 0.36;
    ctx.fillStyle = style.mood === "bright" ? style.accent : "#0d0a0d";
    ctx.beginPath();
    ctx.moveTo(-bodyWidth * 0.68, 0);
    ctx.bezierCurveTo(-bodyWidth * 0.95, 22, -bodyWidth * 0.82, bodyHeight * 0.82, -bodyWidth * 0.42, bodyHeight + 8);
    ctx.lineTo(bodyWidth * 0.42, bodyHeight + 8);
    ctx.bezierCurveTo(bodyWidth * 0.82, bodyHeight * 0.82, bodyWidth * 0.95, 22, bodyWidth * 0.68, 0);
    ctx.quadraticCurveTo(0, isTeen ? 14 : 8, -bodyWidth * 0.68, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawPosterRimLight(ctx, style, bodyWidth, bodyHeight, headRadius, isChild) {
    ctx.save();
    ctx.strokeStyle = "rgba(255,241,191,0.46)";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-headRadius - 9, -36);
    ctx.quadraticCurveTo(-headRadius - 20, -10, -bodyWidth * 0.58, bodyHeight * 0.72);
    ctx.moveTo(headRadius + 7, -35);
    ctx.quadraticCurveTo(headRadius + 17, -4, bodyWidth * 0.58, bodyHeight * 0.74);
    ctx.stroke();
    if (!isChild) {
      ctx.strokeStyle = style.accent;
      ctx.globalAlpha = 0.58;
      ctx.beginPath();
      ctx.moveTo(-bodyWidth * 0.32, 8);
      ctx.lineTo(bodyWidth * 0.28, bodyHeight - 8);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBody(ctx, style, bodyWidth, bodyHeight, isChild, isTeen, isElder) {
    const top = -3;
    const left = -bodyWidth * 0.5;
    const expression = game.gender;

    ctx.fillStyle = style.outfit;
    if (expression === "female" && !isChild) {
      ctx.beginPath();
      ctx.moveTo(left + 7, top);
      ctx.lineTo(bodyWidth * 0.5 - 7, top);
      ctx.lineTo(bodyWidth * 0.64, top + bodyHeight);
      ctx.lineTo(-bodyWidth * 0.64, top + bodyHeight);
      ctx.closePath();
      ctx.fill();
    } else if (expression === "neutral") {
      roundRect(ctx, left - 2, top, bodyWidth + 4, bodyHeight, 7);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.23)";
      ctx.beginPath();
      ctx.moveTo(left + 8, top + 6);
      ctx.lineTo(bodyWidth * 0.5 - 6, top + 22);
      ctx.lineTo(bodyWidth * 0.5 - 6, top + bodyHeight - 8);
      ctx.lineTo(left + 2, top + bodyHeight - 2);
      ctx.closePath();
      ctx.fill();
    } else {
      roundRect(ctx, left, top, bodyWidth, bodyHeight, isChild ? 9 : 7);
      ctx.fill();
    }

    ctx.strokeStyle = "rgba(32,35,42,0.72)";
    ctx.lineWidth = 3;
    ctx.stroke();

    if (!isChild) {
      ctx.strokeStyle = "rgba(255,253,246,0.72)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (isTeen) {
        ctx.moveTo(left + 8, top + 10);
        ctx.lineTo(bodyWidth * 0.5 - 8, top + bodyHeight - 8);
      } else {
        ctx.moveTo(0, top + 4);
        ctx.lineTo(0, top + bodyHeight - 8);
      }
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(32,35,42,0.75)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(left + 2, top + 14);
    ctx.lineTo(left - 12, top + 30);
    ctx.moveTo(bodyWidth * 0.5 - 2, top + 14);
    ctx.lineTo(bodyWidth * 0.5 + 12, top + 30);
    ctx.stroke();

    drawCountryMotif(ctx, style, left + 10, top + 23);

    if (isElder) {
      ctx.strokeStyle = style.accent;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(left + 6, top + 8);
      ctx.quadraticCurveTo(0, top + 18, bodyWidth * 0.5 - 6, top + 8);
      ctx.stroke();
    }
  }

  function drawHairBack(ctx, style, hair, headRadius, isChild) {
    ctx.fillStyle = hair;
    if (game.gender === "female") {
      ctx.beginPath();
      ctx.ellipse(0, -19, headRadius + 8, headRadius + (isChild ? 9 : 16), 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (game.gender === "neutral") {
      ctx.beginPath();
      ctx.ellipse(-3, -24, headRadius + 7, headRadius + 9, -0.28, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.ellipse(0, -28, headRadius + 5, headRadius * 0.72, 0, Math.PI, 0);
      ctx.fill();
    }
  }

  function drawHairFront(ctx, style, hair, headRadius, isChild) {
    ctx.fillStyle = hair;
    ctx.beginPath();
    if (game.gender === "male") {
      ctx.moveTo(-headRadius + 2, -31);
      ctx.quadraticCurveTo(-8, -48, headRadius - 1, -31);
      ctx.quadraticCurveTo(7, -25, -headRadius + 2, -31);
    } else if (game.gender === "neutral") {
      ctx.moveTo(-headRadius - 2, -32);
      ctx.quadraticCurveTo(-6, -51, headRadius + 1, -31);
      ctx.quadraticCurveTo(4, -18, -headRadius - 2, -32);
    } else {
      ctx.moveTo(-headRadius - 1, -33);
      ctx.quadraticCurveTo(-4, -50, headRadius + 1, -34);
      ctx.quadraticCurveTo(3, -24, -headRadius - 1, -33);
    }
    ctx.closePath();
    ctx.fill();

    if (game.gender === "neutral") {
      ctx.strokeStyle = style.accent;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(8, -42);
      ctx.lineTo(14, -25);
      ctx.stroke();
    }

    if (game.country === "fr" && !isChild) {
      ctx.fillStyle = "#20232a";
      ctx.beginPath();
      ctx.ellipse(-2, -43, 20, 8, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = style.accent;
      ctx.beginPath();
      ctx.arc(12, -45, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawFace(ctx, style, smileLift, isElder) {
    ctx.fillStyle = "#fff8ef";
    ctx.beginPath();
    ctx.ellipse(-7, -24, 4.2, 5.2, -0.08, 0, Math.PI * 2);
    ctx.ellipse(7, -24, 4.2, 5.2, 0.08, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#20232a";
    ctx.beginPath();
    ctx.arc(-6.4, -23.2, 2.7, 0, Math.PI * 2);
    ctx.arc(7.6, -23.2, 2.7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.88)";
    ctx.beginPath();
    ctx.arc(-7.2, -24.2, 0.9, 0, Math.PI * 2);
    ctx.arc(6.8, -24.2, 0.9, 0, Math.PI * 2);
    ctx.fill();

    if (isElder) {
      ctx.strokeStyle = "rgba(32,35,42,0.72)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(-7, -23, 5, 0, Math.PI * 2);
      ctx.arc(7, -23, 5, 0, Math.PI * 2);
      ctx.moveTo(-2, -23);
      ctx.lineTo(2, -23);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(32,35,42,0.66)";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-12, -31);
    ctx.quadraticCurveTo(-7, -34, -2, -31);
    ctx.moveTo(2, -31);
    ctx.quadraticCurveTo(7, -34, 12, -31);
    ctx.stroke();

    ctx.strokeStyle = "rgba(32,35,42,0.5)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.quadraticCurveTo(-2, -18, 1, -17);
    ctx.stroke();

    ctx.strokeStyle = "#20232a";
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.arc(0, -15, 7, 0.1, Math.PI - 0.1);
    if (smileLift > 1) {
      ctx.translate(0, -1);
    }
    ctx.stroke();
    if (smileLift > 1) {
      ctx.translate(0, 1);
    }

    if (style.mood === "bright") {
      ctx.fillStyle = style.accent;
      ctx.beginPath();
      ctx.arc(-15, -18, 2.4, 0, Math.PI * 2);
      ctx.arc(15, -18, 2.4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "rgba(224,107,85,0.32)";
      ctx.beginPath();
      ctx.arc(-14, -18, 2.2, 0, Math.PI * 2);
      ctx.arc(14, -18, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawAgeAndEraDetails(ctx, style, isChild, isTeen, isElder) {
    if (isChild) {
      ctx.strokeStyle = style.accent;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-18, 4);
      ctx.lineTo(-22, 25);
      ctx.moveTo(18, 4);
      ctx.lineTo(22, 25);
      ctx.stroke();
    }

    if (isTeen) {
      ctx.fillStyle = style.accent;
      roundRect(ctx, -16, 22, 32, 8, 4);
      ctx.fill();
    }

    if (style.era >= 2000) {
      ctx.fillStyle = "#20232a";
      roundRect(ctx, 22, 23, 9, 15, 2);
      ctx.fill();
      ctx.fillStyle = "#dbeffd";
      roundRect(ctx, 24, 26, 5, 8, 1);
      ctx.fill();
    } else if (style.era < 1970) {
      ctx.strokeStyle = "rgba(255,253,246,0.8)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-13, 5);
      ctx.lineTo(13, 5);
      ctx.stroke();
    }

    if (isElder) {
      ctx.strokeStyle = "#20232a";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(26, 25);
      ctx.lineTo(33, 62);
      ctx.stroke();
    }
  }

  function drawCountryAura(ctx, style) {
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = style.accent;
    ctx.lineWidth = 3;
    if (game.country === "jp") {
      ctx.beginPath();
      ctx.arc(0, -27, 31, 0, Math.PI * 2);
      ctx.stroke();
    } else if (game.country === "us") {
      drawStar(ctx, 24, -44, 8, style.accent);
    } else if (game.country === "uk") {
      ctx.beginPath();
      ctx.moveTo(-30, -45);
      ctx.lineTo(30, 12);
      ctx.moveTo(30, -45);
      ctx.lineTo(-30, 12);
      ctx.stroke();
    } else if (game.country === "fr") {
      ctx.beginPath();
      ctx.moveTo(-30, -44);
      ctx.lineTo(-30, 36);
      ctx.moveTo(30, -44);
      ctx.lineTo(30, 36);
      ctx.stroke();
    } else if (game.country === "br") {
      ctx.beginPath();
      ctx.arc(0, -28, 34, 0, Math.PI * 2);
      ctx.stroke();
      drawStar(ctx, -25, -42, 7, style.accent);
    } else if (game.country === "in") {
      ctx.beginPath();
      ctx.arc(0, -27, 32, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 8; i += 1) {
        ctx.rotate(Math.PI / 4);
        ctx.beginPath();
        ctx.moveTo(0, -27);
        ctx.lineTo(0, -36);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  function drawCountryMotif(ctx, style, x, y) {
    if (game.country === "us") {
      drawStar(ctx, x + 1, y, 5, style.accent);
      return;
    }
    if (game.country === "jp" || game.country === "in") {
      ctx.fillStyle = style.accent;
      for (let i = 0; i < 5; i += 1) {
        const angle = (Math.PI * 2 * i) / 5;
        ctx.beginPath();
        ctx.arc(x + Math.cos(angle) * 4, y + Math.sin(angle) * 4, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }
    if (game.country === "uk") {
      ctx.strokeStyle = style.accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x - 6, y - 4);
      ctx.lineTo(x + 6, y + 4);
      ctx.moveTo(x + 6, y - 4);
      ctx.lineTo(x - 6, y + 4);
      ctx.stroke();
      return;
    }
    if (game.country === "br") {
      ctx.fillStyle = style.accent;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    ctx.strokeStyle = style.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - 6, y);
    ctx.lineTo(x + 6, y);
    ctx.stroke();
  }

  function drawStar(ctx, x, y, radius, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const r = i % 2 === 0 ? radius : radius * 0.45;
      const angle = -Math.PI / 2 + (Math.PI * 2 * i) / 10;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width * 0.5, height * 0.5);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
  }

  birthForm.addEventListener("submit", beginGame);
  birthYearInput.addEventListener("input", updateGeneratedProfile);
  birthYearUp.addEventListener("click", () => adjustBirthYear(1));
  birthYearDown.addEventListener("click", () => adjustBirthYear(-1));
  homeSelect.addEventListener("change", updateGeneratedProfile);
  genderSelect.addEventListener("change", updateGeneratedProfile);
  nextButton.addEventListener("click", nextStage);
  restartButton.addEventListener("click", restart);
  againButton.addEventListener("click", restart);
  copyButton.addEventListener("click", copyTimeline);
  window.addEventListener("resize", () => {
    if (game && !gameScreen.classList.contains("hidden")) {
      drawLifeCanvas();
    }
    if (game && !resultScreen.classList.contains("hidden")) {
      drawPoster(topCareer());
    }
  });

  updateGeneratedProfile();
  restartButton.classList.add("hidden");
})();
