'use strict';
/* =========================================================
   こくごの ひろば
   特別支援学校 小学部2〜3段階 国語  体験型学習Webアプリ
   GitHub Pages 用（index.html / style.css / script.js）
   ---------------------------------------------------------
   ・教材データは「1. 学習データ」を書きかえると増やせます
   ・ふりがな表記は {漢字|かんじ} の形で書きます
   ・おはなしの文は ことばの区切りを半角スペースで書きます（分かち書き）
   ========================================================= */

/* ---------- 1. 学習データ ---------- */

// ことば・かんじ（c:なかま k:表記 y:よみ e:絵）
const WORD_CATS = ['しぜん', 'からだ', 'くらし', 'いろ・かず', 'ようす・ばしょ'];
const WORDS = [
  { c: 'しぜん', k: '山', y: 'やま', e: '⛰️' },
  { c: 'しぜん', k: '川', y: 'かわ', e: '🏞️' },
  { c: 'しぜん', k: '木', y: 'き', e: '🌳' },
  { c: 'しぜん', k: '森', y: 'もり', e: '🌲' },
  { c: 'しぜん', k: '花', y: 'はな', e: '🌷' },
  { c: 'しぜん', k: '雨', y: 'あめ', e: '☔' },
  { c: 'しぜん', k: '空', y: 'そら', e: '🌤️' },
  { c: 'しぜん', k: '日', y: 'ひ', e: '☀️' },
  { c: 'しぜん', k: '月', y: 'つき', e: '🌙' },
  { c: 'しぜん', k: '水', y: 'みず', e: '💧' },
  { c: 'しぜん', k: '火', y: 'ひ', e: '🔥' },
  { c: 'しぜん', k: '石', y: 'いし', e: '🪨' },
  { c: 'しぜん', k: '虫', y: 'むし', e: '🐛' },
  { c: 'しぜん', k: '犬', y: 'いぬ', e: '🐕' },
  { c: 'からだ', k: '人', y: 'ひと', e: '🧍' },
  { c: 'からだ', k: '口', y: 'くち', e: '👄' },
  { c: 'からだ', k: '目', y: 'め', e: '👁️' },
  { c: 'からだ', k: '耳', y: 'みみ', e: '👂' },
  { c: 'からだ', k: '手', y: 'て', e: '✋' },
  { c: 'からだ', k: '足', y: 'あし', e: '🦶' },
  { c: 'からだ', k: '力', y: 'ちから', e: '💪' },
  { c: 'くらし', k: '車', y: 'くるま', e: '🚗' },
  { c: 'くらし', k: '本', y: 'ほん', e: '📕' },
  { c: 'くらし', k: '先生', y: 'せんせい', e: '🧑‍🏫' },
  { c: 'くらし', k: '学校', y: 'がっこう', e: '🏫' },
  { c: 'くらし', k: '名前', y: 'なまえ', e: '📛' },
  { c: 'くらし', k: '子', y: 'こ', e: '🧒' },
  { c: 'くらし', k: '町', y: 'まち', e: '🏘️' },
  { c: 'くらし', k: '音', y: 'おと', e: '🔔' },
  { c: 'くらし', k: '糸', y: 'いと', e: '🧵' },
  { c: 'いろ・かず', k: '白', y: 'しろ', e: '⚪' },
  { c: 'いろ・かず', k: '赤', y: 'あか', e: '🔴' },
  { c: 'いろ・かず', k: '青', y: 'あお', e: '🔵' },
  { c: 'いろ・かず', k: '一', y: 'いち', e: '1️⃣' },
  { c: 'いろ・かず', k: '二', y: 'に', e: '2️⃣' },
  { c: 'いろ・かず', k: '三', y: 'さん', e: '3️⃣' },
  { c: 'いろ・かず', k: '五', y: 'ご', e: '5️⃣' },
  { c: 'いろ・かず', k: '十', y: 'じゅう', e: '🔟' },
  { c: 'ようす・ばしょ', k: '大きい', y: 'おおきい', e: '🐘' },
  { c: 'ようす・ばしょ', k: '小さい', y: 'ちいさい', e: '🐜' },
  { c: 'ようす・ばしょ', k: '早い', y: 'はやい', e: '🐇' },
  { c: 'ようす・ばしょ', k: '上', y: 'うえ', e: '⬆️' },
  { c: 'ようす・ばしょ', k: '下', y: 'した', e: '⬇️' },
  { c: 'ようす・ばしょ', k: '右', y: 'みぎ', e: '👉' },
  { c: 'ようす・ばしょ', k: '左', y: 'ひだり', e: '👈' },
  { c: 'ようす・ばしょ', k: '中', y: 'なか', e: '📦' },
];

// 絵を見て（うごき・ようす）  keys：記述で正解と認めることば
const PICTURES = [
  { id: 'd01', t: 'うごき', e: '🏃', a: 'はしって いる', keys: ['はし', '走'] },
  { id: 'd02', t: 'うごき', e: '🚶', a: 'あるいて いる', keys: ['ある', '歩'] },
  { id: 'd03', t: 'うごき', e: '🏊', a: 'およいで いる', keys: ['およ', '泳'] },
  { id: 'd04', t: 'うごき', e: '😴', a: 'ねて いる', keys: ['ねて', 'ねむ', 'ねる', '寝'] },
  { id: 'd05', t: 'うごき', e: '🚴', a: 'じてんしゃに のって いる', keys: ['じてんしゃ', '自転車', 'こいで'] },
  { id: 'd06', t: 'うごき', e: '🙋', a: 'てを あげて いる', keys: ['あげ', '上げ'] },
  { id: 'd07', t: 'うごき', e: '🎤', a: 'うたって いる', keys: ['うた', '歌'] },
  { id: 'd08', t: 'うごき', e: '💃', a: 'おどって いる', keys: ['おど', '踊'] },
  { id: 'd09', t: 'うごき', e: '🙇', a: 'おじぎを して いる', keys: ['おじぎ', 'あやま', 'ごめん'] },
  { id: 'd10', t: 'うごき', e: '✍️', a: 'じを かいて いる', keys: ['かい', 'かく', '書'] },
  { id: 'd11', t: 'うごき', e: '🧗', a: 'のぼって いる', keys: ['のぼ', '登'] },
  { id: 'd12', t: 'うごき', e: '🧹', a: 'そうじを して いる', keys: ['そうじ', 'はいて', 'はく'] },
  { id: 'y01', t: 'ようす', e: '😊', a: 'うれしそう', keys: ['うれし', 'たのし', 'にこ', 'わら', 'えがお'] },
  { id: 'y02', t: 'ようす', e: '😢', a: 'かなしそう', keys: ['かなし', 'ない', '泣', 'なみだ'] },
  { id: 'y03', t: 'ようす', e: '😠', a: 'おこって いる', keys: ['おこ', '怒', 'ぷんぷん'] },
  { id: 'y04', t: 'ようす', e: '😲', a: 'びっくり して いる', keys: ['びっくり', 'おどろ'] },
  { id: 'y05', t: 'ようす', e: '🥶', a: 'さむそう', keys: ['さむ', '寒', 'つめた'] },
  { id: 'y06', t: 'ようす', e: '🥵', a: 'あつそう', keys: ['あつ', '暑'] },
  { id: 'y07', t: 'ようす', e: '😪', a: 'ねむそう', keys: ['ねむ'] },
  { id: 'y08', t: 'ようす', e: '😋', a: 'おいしそう', keys: ['おいし'] },
  { id: 'y09', t: 'ようす', e: '😨', a: 'こわがって いる', keys: ['こわ', '怖'] },
];

// おはなし（ものがたり・せつめいぶん）
// q: lv=出題するレベル(1やさしい 2ふつう 3むずかしい)  t: c選択 x抜き出し w記述 f気持ち・感想
const STORIES = [
  {
    id: 's01', kind: 'ものがたり', lv: 1, title: 'ねこの ミケ',
    text: [
      'ミケは しろい ねこです。',
      'ミケは {魚|さかな}が だいすきです。',
      'あさ、ミケは まどの そばで ねて いました。',
      'そこへ ちょうちょが とんで きました。',
      'ミケは びっくりして とびおきました。',
      'ちょうちょは {空|そら}へ とんで いきました。',
    ],
    q: [
      { lv: [1, 2], t: 'c', q: 'ミケは どんな ねこですか。', a: 'しろい ねこ', d: ['くろい ねこ', 'ちゃいろい ねこ'] },
      { lv: [1], t: 'c', q: 'ミケが だいすきな ものは なんですか。', a: 'さかな', d: ['にんじん', 'ケーキ'] },
      { lv: [1, 2], t: 'c', q: 'ミケは まどの そばで なにを して いましたか。', a: 'ねて いた', d: ['たべて いた', 'あそんで いた'] },
      { lv: [2, 3], t: 'x', q: 'とんで きた ものは なんですか。ぶんから ぬきだしましょう。', a: 'ちょうちょ' },
      { lv: [2], t: 'w', q: 'ちょうちょが きた とき、ミケは どう しましたか。', a: 'びっくりして とびおきた', keys: ['びっくり', 'とびおき', 'おきた'] },
      { lv: [3], t: 'w', q: 'ちょうちょは どこへ いきましたか。', a: 'そら', keys: ['そら', '空'] },
      { lv: [3], t: 'f', q: 'あなたが ミケなら、ちょうちょを 見て どう おもいますか。' },
    ],
  },
  {
    id: 's02', kind: 'ものがたり', lv: 1, title: 'たろうの あさ',
    text: [
      'たろうは あさ 7じに おきました。',
      'かおを あらって、はを みがきました。',
      'あさごはんに パンと ぎゅうにゅうを たべました。',
      '「いって きます。」',
      'たろうは げんきに {学校|がっこう}へ いきました。',
    ],
    q: [
      { lv: [1], t: 'c', q: 'たろうは なんじに おきましたか。', a: '7じ', d: ['8じ', '6じ'] },
      { lv: [1, 2], t: 'c', q: 'あさごはんに なにを たべましたか。', a: 'パンと ぎゅうにゅう', d: ['ごはんと みそしる', 'うどん'] },
      { lv: [1], t: 'c', q: 'たろうは どこへ いきましたか。', a: 'がっこう', d: ['こうえん', 'おみせ'] },
      { lv: [2], t: 'x', q: 'かおを あらった あと、なにを しましたか。ぶんから ぬきだしましょう。', a: 'はを みがき' },
      { lv: [2, 3], t: 'w', q: 'たろうは どんな ようすで がっこうへ いきましたか。', a: 'げんきに いった', keys: ['げんき', '元気'] },
      { lv: [3], t: 'x', q: 'いえを でる ときに たろうが いった ことばを ぬきだしましょう。', a: 'いって きます' },
      { lv: [3], t: 'f', q: 'あなたは あさ、なにを たべますか。たろうと くらべて かきましょう。' },
    ],
  },
  {
    id: 's03', kind: 'せつめいぶん', lv: 2, title: 'あさがお',
    text: [
      'あさがおは なつに さく {花|はな}です。',
      'たねを まくと、{小|ちい}さな めが でて きます。',
      'つるが のびて、ぼうに まきついて いきます。',
      'あさ はやく、あおや むらさきの {花|はな}が さきます。',
      'ひるに なると、{花|はな}は しぼんで しまいます。',
    ],
    q: [
      { lv: [1], t: 'c', q: 'あさがおは いつ さく はなですか。', a: 'なつ', d: ['ふゆ', 'あき'] },
      { lv: [1, 2], t: 'c', q: 'たねを まくと、なにが でて きますか。', a: 'ちいさな め', d: ['おおきな はな', 'あかい み'] },
      { lv: [1], t: 'c', q: 'はなは いつ さきますか。', a: 'あさ はやく', d: ['よる', 'ゆうがた'] },
      { lv: [2], t: 'x', q: 'はなの いろを ぶんから ぬきだしましょう。', a: 'あおや むらさき' },
      { lv: [2, 3], t: 'w', q: 'つるは なにに まきつきますか。', a: 'ぼう', keys: ['ぼう', '棒'] },
      { lv: [3], t: 'w', q: 'ひるに なると、はなは どう なりますか。', a: 'しぼんで しまう', keys: ['しぼ'] },
      { lv: [3], t: 'f', q: 'あさがおを そだてて みたいですか。どうしてですか。' },
    ],
  },
  {
    id: 's04', kind: 'ものがたり', lv: 2, title: 'くまさんの おべんとう',
    text: [
      'くまさんは {森|もり}へ ピクニックに いきました。',
      'おべんとうは おにぎりと たまごやきです。',
      '{木|き}の したで たべようと すると、うさぎさんが きました。',
      '「おなかが すいたよ。」と うさぎさんが いいました。',
      'くまさんは おにぎりを ひとつ あげました。',
      'ふたりで たべた おべんとうは とても おいしかったです。',
    ],
    q: [
      { lv: [1], t: 'c', q: 'くまさんは どこへ いきましたか。', a: 'もり', d: ['うみ', 'がっこう'] },
      { lv: [1], t: 'c', q: 'おべんとうは なんでしたか。', a: 'おにぎりと たまごやき', d: ['パンと ジュース', 'カレー'] },
      { lv: [1, 2], t: 'c', q: 'だれが きましたか。', a: 'うさぎさん', d: ['きつねさん', 'ねこさん'] },
      { lv: [2], t: 'x', q: 'うさぎさんが いった ことばを ぬきだしましょう。', a: 'おなかが すいたよ' },
      { lv: [2, 3], t: 'w', q: 'くまさんは うさぎさんに なにを あげましたか。', a: 'おにぎりを ひとつ', keys: ['おにぎり'] },
      { lv: [3], t: 'w', q: 'ふたりで たべた おべんとうは どうでしたか。', a: 'とても おいしかった', keys: ['おいし'] },
      { lv: [3], t: 'f', q: 'くまさんは どんな きもちで おにぎりを あげたと おもいますか。' },
    ],
  },
  {
    id: 's05', kind: 'せつめいぶん', lv: 1, title: 'しんごうの いろ',
    text: [
      'みちを わたる ときは、しんごうを {見|み}ます。',
      'あおの ときは、わたる ことが できます。',
      'あおが ちかちか したら、わたらずに まちます。',
      'あかの ときは、とまって まちます。',
      'わたる ときは、{右|みぎ}と {左|ひだり}を よく {見|み}ましょう。',
    ],
    q: [
      { lv: [1], t: 'c', q: 'わたる ことが できるのは なにいろの ときですか。', a: 'あお', d: ['あか', 'きいろ'] },
      { lv: [1], t: 'c', q: 'あかの ときは どう しますか。', a: 'とまって まつ', d: ['はしって わたる', 'ゆっくり わたる'] },
      { lv: [1, 2], t: 'c', q: 'あおが ちかちか したら どう しますか。', a: 'わたらずに まつ', d: ['いそいで わたる', 'うしろに もどる'] },
      { lv: [2], t: 'x', q: 'わたる ときは、どこを よく 見ますか。ぶんから ぬきだしましょう。', a: '右と 左' },
      { lv: [2, 3], t: 'w', q: 'みちを わたる ときは、なにを 見ますか。', a: 'しんごう', keys: ['しんごう', '信号'] },
      { lv: [3], t: 'w', q: 'どうして 右と 左を よく 見るのですか。', a: 'くるまが こないか たしかめる ため', keys: ['くるま', '車', 'あぶな', 'じこ', 'ぶつか'] },
      { lv: [3], t: 'f', q: 'あなたが みちを わたる ときに きを つけて いる ことを かきましょう。' },
    ],
  },
  {
    id: 's06', kind: 'ものがたり', lv: 2, title: 'ゆきの ひ',
    text: [
      'あさ おきると、そとは まっしろでした。',
      '「ゆきだ!」と はなこは おおきな こえで いいました。',
      'はなこは てぶくろを して、そとへ でました。',
      'おとうとと いっしょに ゆきだるまを つくりました。',
      '{手|て}が つめたく なったけれど、とても たのしかったです。',
    ],
    q: [
      { lv: [1], t: 'c', q: 'そとは どんな ようすでしたか。', a: 'まっしろ', d: ['まっくら', 'まっか'] },
      { lv: [1], t: 'c', q: 'はなこは だれと あそびましたか。', a: 'おとうと', d: ['おかあさん', 'ともだち'] },
      { lv: [1, 2], t: 'c', q: 'なにを つくりましたか。', a: 'ゆきだるま', d: ['すなの やま', 'かみひこうき'] },
      { lv: [2], t: 'x', q: 'はなこが いった ことばを ぬきだしましょう。', a: 'ゆきだ' },
      { lv: [2, 3], t: 'w', q: 'そとへ でる まえに、はなこは なにを しましたか。', a: 'てぶくろを した', keys: ['てぶくろ', '手ぶくろ'] },
      { lv: [3], t: 'w', q: 'ては どう なりましたか。', a: 'つめたく なった', keys: ['つめた'] },
      { lv: [3], t: 'f', q: 'ゆきが ふったら、あなたは なにを して あそびたいですか。' },
    ],
  },
  {
    id: 's07', kind: 'せつめいぶん', lv: 1, title: 'てあらい',
    text: [
      'そとから かえったら、{手|て}を あらいます。',
      'まず、{水|みず}で {手|て}を ぬらします。',
      'つぎに、せっけんを つけて よく こすります。',
      'ゆびの あいだや つめも あらいます。',
      'さいごに、{水|みず}で ながして タオルで ふきます。',
    ],
    q: [
      { lv: [1], t: 'c', q: 'いつ てを あらいますか。', a: 'そとから かえったら', d: ['テレビを 見る とき', 'ねて いる とき'] },
      { lv: [1], t: 'c', q: 'せっけんを つけたら どう しますか。', a: 'よく こする', d: ['すぐ ながす', 'そのまま に する'] },
      { lv: [1, 2], t: 'c', q: 'さいごに なにで ふきますか。', a: 'タオル', d: ['ティッシュ', 'ふく'] },
      { lv: [2], t: 'x', q: 'いちばん はじめに する ことを ぬきだしましょう。', a: '水で 手を ぬらし' },
      { lv: [2, 3], t: 'w', q: 'ゆびの あいだの ほかに、どこを あらいますか。', a: 'つめ', keys: ['つめ', '爪'] },
      { lv: [3], t: 'w', q: 'さいごに なにを しますか。', a: 'みずで ながして タオルで ふく', keys: ['ふく', 'ふき', 'なが'] },
      { lv: [3], t: 'f', q: 'てを あらうと、どんな いい ことが あると おもいますか。' },
    ],
  },
  {
    id: 's08', kind: 'ものがたり', lv: 3, title: 'おつかい',
    text: [
      'けんたは おかあさんに たのまれて、おつかいに いきました。',
      '「にんじんを {三|さん}ぼん かって きてね。」',
      'やおやさんに つくと、どきどき しました。',
      '「にんじんを {三|さん}ぼん ください。」と いえました。',
      'やおやの おじさんが 「えらいね。」と いって くれました。',
      'けんたは うれしく なって、はしって かえりました。',
    ],
    q: [
      { lv: [1], t: 'c', q: 'けんたは どこへ いきましたか。', a: 'やおやさん', d: ['パンやさん', 'こうえん'] },
      { lv: [1], t: 'c', q: 'なにを かいましたか。', a: 'にんじん', d: ['たまねぎ', 'りんご'] },
      { lv: [1, 2], t: 'c', q: 'なんぼん かいましたか。', a: 'さんぼん', d: ['いっぽん', 'ごほん'] },
      { lv: [2], t: 'x', q: 'やおやさんに ついた とき、けんたは どんな きもちでしたか。ぬきだしましょう。', a: 'どきどき' },
      { lv: [2, 3], t: 'w', q: 'おじさんは なんと いって くれましたか。', a: 'えらいね', keys: ['えらい'] },
      { lv: [3], t: 'w', q: 'けんたは どうして はしって かえったのですか。', a: 'うれしく なったから', keys: ['うれし'] },
      { lv: [3], t: 'f', q: 'あなたが おつかいに いくと したら、なにを かいに いきたいですか。' },
    ],
  },
  {
    id: 's09', kind: 'せつめいぶん', lv: 3, title: 'ありの くらし',
    text: [
      'ありは つちの なかに すを つくって くらして います。',
      'すの なかには、たくさんの へやが あります。',
      'はたらきありは、そとから たべものを はこんで きます。',
      'たべものを {見|み}つけると、なかまに しらせます。',
      'だから、ありは ぎょうれつを つくって あるくのです。',
    ],
    q: [
      { lv: [1], t: 'c', q: 'ありは どこに すを つくりますか。', a: 'つちの なか', d: ['きの うえ', 'みずの なか'] },
      { lv: [1], t: 'c', q: 'すの なかには なにが ありますか。', a: 'たくさんの へや', d: ['おおきな いけ', 'たかい やま'] },
      { lv: [1, 2], t: 'c', q: 'はたらきありは なにを はこびますか。', a: 'たべもの', d: ['いし', 'みず'] },
      { lv: [2], t: 'x', q: 'たべものを 見つけると、ありは どう しますか。ぬきだしましょう。', a: 'なかまに しらせ' },
      { lv: [2, 3], t: 'w', q: 'ありは どんな ふうに あるきますか。', a: 'ぎょうれつを つくって あるく', keys: ['ぎょうれつ', '行列', 'ならん', 'れつ'] },
      { lv: [3], t: 'w', q: 'ありが ぎょうれつを つくるのは どうしてですか。', a: 'なかまに たべものの ことを しらせるから', keys: ['しらせ', 'なかま', 'おしえ'] },
      { lv: [3], t: 'f', q: 'ありを 見た ことが ありますか。その ときの ようすを かきましょう。' },
    ],
  },
  {
    id: 's10', kind: 'ものがたり', lv: 3, title: 'たんじょうび',
    text: [
      'きょうは みきの たんじょうびです。',
      '{学校|がっこう}から かえると、へやが くらく なって いました。',
      '「あれ、だれも いないのかな。」',
      'でんきが つくと、かぞくが 「おめでとう!」と いいました。',
      'テーブルには ケーキが ありました。',
      'みきは なみだが でるほど うれしかったです。',
    ],
    q: [
      { lv: [1], t: 'c', q: 'きょうは なんの ひですか。', a: 'みきの たんじょうび', d: ['うんどうかい', 'おしょうがつ'] },
      { lv: [1], t: 'c', q: 'テーブルには なにが ありましたか。', a: 'ケーキ', d: ['おにぎり', 'はな'] },
      { lv: [1, 2], t: 'c', q: 'かえった とき、へやは どう なって いましたか。', a: 'くらく なって いた', d: ['あかるかった', 'さむかった'] },
      { lv: [2], t: 'x', q: 'かぞくが いった ことばを ぬきだしましょう。', a: 'おめでとう' },
      { lv: [2, 3], t: 'w', q: 'みきは どんな きもちに なりましたか。', a: 'うれしかった', keys: ['うれし', 'なみだ'] },
      { lv: [3], t: 'x', q: 'へやが くらい とき、みきが おもった ことを ぬきだしましょう。', a: 'だれも いないのかな' },
      { lv: [3], t: 'f', q: 'あなたが みきだったら、かぞくに なんと いいますか。' },
    ],
  },
];

// かいわ（k: だれが・なにが・どんなだ・どうした など）
const CONVS = [
  {
    id: 'c01', title: 'きゅうしょくの じかん', scene: '🍛',
    people: { ゆうと: '👦', あおい: '👧' },
    lines: [
      ['ゆうと', 'きょうの きゅうしょくは カレーだね。'],
      ['あおい', 'わあ、うれしい。わたし、カレーが だいすき。'],
      ['ゆうと', 'ぼくは もう ぜんぶ たべたよ。'],
      ['あおい', 'はやいね。おかわり したら?'],
    ],
    q: [
      { k: 'なにが', q: 'きょうの きゅうしょくは なんですか。', a: 'カレー', d: ['ラーメン', 'パン'] },
      { k: 'どんなだ', q: 'あおいさんは どんな きもちですか。', a: 'うれしい', keys: ['うれし', 'たのし'], d: ['かなしい', 'こわい'] },
      { k: 'だれが', q: 'だれが ぜんぶ たべましたか。', a: 'ゆうと', d: ['あおい', 'せんせい'] },
      { k: 'どうした', q: 'ゆうとさんは どう しましたか。', a: 'ぜんぶ たべた', keys: ['たべ'], d: ['のこした', 'ねて いた'] },
    ],
  },
  {
    id: 'c02', title: 'こうえんで', scene: '🛝',
    people: { そうた: '👦', りん: '👧' },
    lines: [
      ['そうた', 'ねえ、いっしょに すなばで あそぼう。'],
      ['りん', 'いいよ。おおきな やまを つくろう。'],
      ['そうた', 'みずを かけたら、すなが かたく なったよ。'],
      ['りん', 'ほんとうだ。トンネルも ほれるね。'],
    ],
    q: [
      { k: 'だれが', q: 'だれが 「あそぼう」と さそいましたか。', a: 'そうた', d: ['りん', 'おかあさん'] },
      { k: 'どこで', q: 'ふたりは どこで あそびましたか。', a: 'すなば', d: ['ぶらんこ', 'プール'] },
      { k: 'なにを', q: 'なにを つくりましたか。', a: 'やま', d: ['いえ', 'くるま'] },
      { k: 'どんなだ', q: 'みずを かけたら、すなは どう なりましたか。', a: 'かたく なった', keys: ['かた'], d: ['やわらかく なった', 'あかく なった'] },
    ],
  },
  {
    id: 'c03', title: 'おみせで', scene: '🍎',
    people: { てんいん: '🧑‍🍳', はると: '👦' },
    lines: [
      ['てんいん', 'いらっしゃいませ。'],
      ['はると', 'りんごを ふたつ ください。'],
      ['てんいん', 'はい、200えんです。'],
      ['はると', 'ありがとう ございます。'],
    ],
    q: [
      { k: 'だれが', q: 'だれが かいものを しましたか。', a: 'はると', d: ['てんいん', 'おかあさん'] },
      { k: 'なにを', q: 'なにを かいましたか。', a: 'りんご', d: ['みかん', 'バナナ'] },
      { k: 'いくつ', q: 'いくつ かいましたか。', a: 'ふたつ', keys: ['ふたつ', '2', 'に'], d: ['ひとつ', 'みっつ'] },
      { k: 'いくら', q: 'いくらでしたか。', a: '200えん', keys: ['200', 'にひゃく'], d: ['100えん', '500えん'] },
    ],
  },
  {
    id: 'c04', title: 'ほけんしつで', scene: '🩹',
    people: { せんせい: '👩‍⚕️', さき: '👧' },
    lines: [
      ['せんせい', 'どう したの?'],
      ['さき', 'ころんで ひざを すりむきました。'],
      ['せんせい', 'いたかったね。みずで あらって おこう。'],
      ['さき', 'しみるけど、がまん します。'],
    ],
    q: [
      { k: 'だれが', q: 'だれが ころびましたか。', a: 'さき', d: ['せんせい', 'ともだち'] },
      { k: 'なにが', q: 'どこを すりむきましたか。', a: 'ひざ', d: ['て', 'あたま'] },
      { k: 'どうした', q: 'さきさんは どう しましたか。', a: 'ころんで ひざを すりむいた', keys: ['ころ', 'すりむ'], d: ['はしって かえった', 'ないて ねた'] },
      { k: 'どんなだ', q: 'あらう とき、どんな かんじが しましたか。', a: 'しみる', keys: ['しみ', 'いた'], d: ['くすぐったい', 'あたたかい'] },
    ],
  },
  {
    id: 'c05', title: 'あめの ひ', scene: '☔',
    people: { ママ: '👩', れん: '👦' },
    lines: [
      ['ママ', 'きょうは あめが ふって いるよ。'],
      ['れん', 'ほんとだ。ながぐつを はいて いこう。'],
      ['ママ', 'かさも わすれないでね。'],
      ['れん', 'うん、あおい かさを もって いくね。'],
    ],
    q: [
      { k: 'どんなだ', q: 'きょうは どんな てんきですか。', a: 'あめ', keys: ['あめ', '雨'], d: ['はれ', 'ゆき'] },
      { k: 'なにを', q: 'れんくんは なにを はきましたか。', a: 'ながぐつ', d: ['サンダル', 'うわばき'] },
      { k: 'どんなだ', q: 'かさは どんな いろですか。', a: 'あおい', keys: ['あお', '青'], d: ['あかい', 'きいろい'] },
      { k: 'だれが', q: 'だれが かさを もって いきますか。', a: 'れん', d: ['ママ', 'パパ'] },
    ],
  },
  {
    id: 'c06', title: 'たいいくの じかん', scene: '⚾',
    people: { せんせい: '🧑‍🏫', だいき: '👦', みお: '👧' },
    lines: [
      ['せんせい', 'きょうは ボールを なげる れんしゅうを します。'],
      ['だいき', 'ぼく、とおくまで なげられるよ。'],
      ['せんせい', 'すごい! だいきさん、とても じょうずだね。'],
      ['みお', 'わたしも がんばって なげて みる。'],
    ],
    q: [
      { k: 'なにを', q: 'なんの れんしゅうを しますか。', a: 'ボールを なげる', keys: ['なげ', '投'], d: ['はしる', 'およぐ'] },
      { k: 'だれが', q: 'だれが 「じょうずだね」と ほめられましたか。', a: 'だいき', d: ['みお', 'せんせい'] },
      { k: 'どんなだ', q: 'だいきさんは どれぐらい なげられますか。', a: 'とおくまで', keys: ['とお', '遠'], d: ['ちかくまで', 'すこしだけ'] },
      { k: 'どうした', q: 'みおさんは どう すると いいましたか。', a: 'がんばって なげる', keys: ['がんば', 'なげ'], d: ['やすむ', 'みて いる'] },
    ],
  },
  {
    id: 'c07', title: 'おばあちゃんと でんわ', scene: '📞',
    people: { おばあちゃん: '👵', ゆい: '👧' },
    lines: [
      ['おばあちゃん', 'もしもし、ゆいちゃん、げんき?'],
      ['ゆい', 'げんきだよ。きのう、どうぶつえんに いったよ。'],
      ['おばあちゃん', 'なにが いたの?'],
      ['ゆい', 'おおきな ぞうが いたよ。はなが ながかった!'],
    ],
    q: [
      { k: 'だれが', q: 'ゆいちゃんは だれと はなしましたか。', a: 'おばあちゃん', d: ['おじいちゃん', 'ともだち'] },
      { k: 'どこへ', q: 'きのう どこへ いきましたか。', a: 'どうぶつえん', d: ['すいぞくかん', 'ゆうえんち'] },
      { k: 'なにが', q: 'なにが いましたか。', a: 'ぞう', d: ['きりん', 'らいおん'] },
      { k: 'どんなだ', q: 'ぞうの はなは どんなでしたか。', a: 'ながかった', keys: ['なが', '長'], d: ['みじかかった', 'あかかった'] },
    ],
  },
  {
    id: 'c08', title: 'そうじの じかん', scene: '🧹',
    people: { ひかる: '👦', なな: '👧' },
    lines: [
      ['ひかる', 'つくえを はこぶの、てつだって。'],
      ['なな', 'いいよ。いっしょに もとう。'],
      ['ひかる', 'ありがとう。おもかったから たすかったよ。'],
      ['なな', 'きょうしつが きれいに なったね。'],
    ],
    q: [
      { k: 'だれが', q: 'だれが てつだいましたか。', a: 'なな', d: ['ひかる', 'せんせい'] },
      { k: 'なにを', q: 'なにを はこびましたか。', a: 'つくえ', d: ['いす', 'ほん'] },
      { k: 'どんなだ', q: 'つくえは どんなでしたか。', a: 'おもかった', keys: ['おも', '重'], d: ['かるかった', 'ちいさかった'] },
      { k: 'どうした', q: 'きょうしつは どう なりましたか。', a: 'きれいに なった', keys: ['きれい'], d: ['きたなく なった', 'くらく なった'] },
    ],
  },
];

const PRAISE = ['すごいね!', 'やったね!', 'よく できたね!', 'その ちょうし!', 'すばらしい!'];
const LVNAME = { 1: '★ やさしい', 2: '★★ ふつう', 3: '★★★ むずかしい' };
const QTAG = { c: 'えらぶ', x: 'ぬきだす', w: 'かく', f: 'きもち・かんそう' };

/* ---------- 2. 保存・設定 ---------- */
const LS = {
  get(k, def) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } },
  set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch (e) { alert('保存できませんでした。画像が多すぎる可能性があります。画像を減らすか、小さい画像を使ってください。'); return false; }
  },
};
const settings = Object.assign(
  { rate: 0.9, furigana: true, big: false, sound: true, teacherLock: true, autoRead: false },
  LS.get('kk_settings', {})
);
function saveSettings() { LS.set('kk_settings', settings); applySettings(); }
function applySettings() { document.body.classList.toggle('big', !!settings.big); }

/* ---------- 3. 小さな道具 ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const app = () => $('#app');
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function shuffle(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
const RUBY_RE = /\{([^|}]+)\|([^}]+)\}/g;
function rb(s, furi = settings.furigana) { return String(s).replace(RUBY_RE, (m, b, r) => furi ? `<ruby>${b}<rt>${r}</rt></ruby>` : b); }
function plain(s) { return String(s).replace(RUBY_RE, '$1'); }
function kana(s) { return String(s).replace(RUBY_RE, '$2'); }
function stripTags(h) { const d = document.createElement('div'); d.innerHTML = h; $$('rt', d).forEach(r => r.remove()); return d.textContent; }
function norm(s) {
  return plain(s).normalize('NFKC')
    .replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60))
    .replace(/[\s、。,.!?「」『』()（）・〜~]/g, '');
}
function checkWrite(input, keys) { const n = norm(input); if (!n) return false; return keys.some(k => norm(k) && n.includes(norm(k))); }
function splitList(s) { return String(s || '').split(/[、,，\n]/).map(x => x.trim()).filter(Boolean); }
function pickOthers(pool, key, n, exclude) {
  const seen = new Set(exclude); const out = [];
  for (const x of shuffle(pool)) { const v = key(x); if (seen.has(v)) continue; seen.add(v); out.push(v); if (out.length >= n) break; }
  return out;
}
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.tm); toast.tm = setTimeout(() => t.classList.remove('show'), 2200); }
function download(name, text, type) {
  const blob = new Blob([text], { type }); const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
function fileToDataURL(file, max = 640) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const s = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
        res(c.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = rej; img.src = fr.result;
    };
    fr.onerror = rej; fr.readAsDataURL(file);
  });
}

/* ---------- 4. 音（効果音・読み上げ） ---------- */
let actx = null;
function beep(ok) {
  if (!settings.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = ok ? [660, 880, 1046] : [330, 247];
    notes.forEach((f, i) => {
      const o = actx.createOscillator(), g = actx.createGain(), t0 = actx.currentTime + i * 0.13;
      o.type = ok ? 'sine' : 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.25, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.15);
      o.connect(g).connect(actx.destination); o.start(t0); o.stop(t0 + 0.17);
    });
  } catch (e) { /* 音が出せない環境 */ }
}
const HAS_TTS = 'speechSynthesis' in window;
let jaVoices = [];
function loadVoices() { if (HAS_TTS) jaVoices = speechSynthesis.getVoices().filter(v => /^ja/i.test(v.lang)); }
if (HAS_TTS) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
let speakToken = 0;
function stopSpeak() {
  speakToken++;
  if (HAS_TTS) speechSynthesis.cancel();
  $$('.speaking').forEach(e => e.classList.remove('speaking'));
}
function say(text, o = {}) {
  return new Promise(res => {
    if (!HAS_TTS) { res(); return; }
    const u = new SpeechSynthesisUtterance(kana(text));
    u.lang = 'ja-JP'; u.rate = settings.rate * (o.rate || 1); u.pitch = o.pitch || 1;
    if (jaVoices.length) u.voice = jaVoices[(o.voiceIndex || 0) % jaVoices.length];
    let done = false; const fin = () => { if (!done) { done = true; res(); } };
    u.onend = fin; u.onerror = fin;
    speechSynthesis.speak(u);
  });
}
async function sayList(list, onEach) {
  stopSpeak(); const t = speakToken;
  for (let i = 0; i < list.length; i++) {
    if (t !== speakToken) return;
    if (onEach) onEach(i);
    await say(list[i].text, list[i]);
  }
  if (t === speakToken && onEach) onEach(-1);
}

/* ---------- 5. 画面の切りかえ ---------- */
const state = {
  wordOpt: { cats: [...WORD_CATS], count: 10 },
  picOpt: { type: 'all', mode: 'choice', count: 10 },
  storyOpt: { level: 1, listen: false },
  convOpt: { mode: 'choice', hide: true, readName: true },
  quiz: null, tokens: [], storyHTML: '', view: { revealed: false },
};
const screens = {};
function go(name, ...args) { stopSpeak(); screens[name](...args); window.scrollTo(0, 0); }
function bindGo(root = app()) { $$('[data-go]', root).forEach(b => { b.onclick = () => go(b.dataset.go); }); }
function chipsHTML(id, items, isOn) {
  return `<div class="chips" id="${id}">${items.map(([v, label]) => `<button class="chip ${isOn(v) ? 'on' : ''}" data-v="${esc(v)}">${label}</button>`).join('')}</div>`;
}

/* ===== ホーム ===== */
screens.home = () => {
  app().innerHTML = `
    <h2 class="page-title">どれで べんきょう する?</h2>
    <div class="tiles">
      <button class="tile t1" data-go="wordsMenu"><span class="tile-ico">✏️</span><span class="tile-name">ことば・かんじ</span><small>よむ・かく・えらぶ</small></button>
      <button class="tile t2" data-go="picMenu"><span class="tile-ico">🖼️</span><span class="tile-name">えを 見て こたえよう</span><small>うごき・ようす</small></button>
      <button class="tile t3" data-go="storyMenu"><span class="tile-ico">📖</span><span class="tile-name">おはなしを よもう</span><small>ものがたり・せつめいぶん</small></button>
      <button class="tile t4" data-go="convMenu"><span class="tile-ico">👂</span><span class="tile-name">かいわを きこう</span><small>だれが・なにが・どうした</small></button>
    </div>
    ${HAS_TTS ? '' : '<p class="note center">※ この ブラウザでは よみあげが つかえません。</p>'}`;
  bindGo();
};

/* ===== ことば・かんじ ===== */
const WORD_MODES = [
  { id: 'yomi', ico: '👀', name: 'よみかたを えらぼう', desc: 'かんじの よみかたを えらぶ' },
  { id: 'yomiw', ico: '⌨️', name: 'よみかたを かこう', desc: 'かんじの よみかたを ひらがなで かく' },
  { id: 'kaki', ico: '🔍', name: 'かんじを えらぼう', desc: 'よみかたに あう かんじを えらぶ' },
  { id: 'tegaki', ico: '✍️', name: 'かんじを かこう', desc: 'ゆびで かんじを かいて たしかめる' },
  { id: 'kotoba', ico: '🖼️', name: 'えに あう ことば', desc: 'えを 見て ことばを えらぶ' },
];
screens.wordsMenu = () => {
  const o = state.wordOpt;
  app().innerHTML = `
    <h2 class="page-title">✏️ ことば・かんじ</h2>
    <div class="panel">
      <div class="label">なかま（いくつでも えらべるよ）</div>
      ${chipsHTML('wCats', WORD_CATS.map(c => [c, c]), v => o.cats.includes(v))}
      <div class="label">もんだいの かず</div>
      ${chipsHTML('wCnt', [[5, '5もん'], [10, '10もん'], [15, '15もん']], v => o.count === v)}
    </div>
    <div class="menu-list">
      ${WORD_MODES.map(m => `<button class="menu-btn" data-m="${m.id}"><span class="mi">${m.ico}</span><span class="mt"><b>${m.name}</b><small>${m.desc}</small></span><span class="go">▶</span></button>`).join('')}
    </div>`;
  $$('#wCats .chip').forEach(b => b.onclick = () => {
    const v = b.dataset.v; const i = o.cats.indexOf(v);
    if (i >= 0) { if (o.cats.length > 1) o.cats.splice(i, 1); else toast('ひとつは えらんでね'); } else o.cats.push(v);
    screens.wordsMenu();
  });
  $$('#wCnt .chip').forEach(b => b.onclick = () => { o.count = +b.dataset.v; screens.wordsMenu(); });
  $$('.menu-btn[data-m]').forEach(b => b.onclick = () => {
    const m = WORD_MODES.find(x => x.id === b.dataset.m);
    runQuiz({ title: m.name, area: 'ことば', backTo: 'wordsMenu', make: () => buildWordQs(m.id, o.cats, o.count) });
  });
};
function buildWordQs(mode, cats, count) {
  const pool = WORDS.filter(w => cats.includes(w.c));
  return shuffle(pool).slice(0, count).map(w => {
    const pic = `<div class="emoji-pic small">${w.e}</div>`;
    switch (mode) {
      case 'yomi': return {
        type: 'choice', media: `<div class="big-kanji kyokasho">${w.k}</div>`, prompt: 'この かんじの よみかたは どれかな?',
        hint: pic, answer: w.y, choices: shuffle([w.y, ...pickOthers(WORDS, x => x.y, 2, [w.y])]),
      };
      case 'yomiw': return {
        type: 'write', media: `<div class="big-kanji kyokasho">${w.k}</div>`, prompt: 'この かんじの よみかたを ひらがなで かこう。',
        hint: pic, answer: w.y, keys: [w.y],
      };
      case 'kaki': {
        const same = WORDS.filter(x => x.k.length === w.k.length);
        const others = pickOthers(same.length > 3 ? same : WORDS, x => x.k, 2, [w.k]);
        return {
          type: 'choice', media: `<div class="reading">${w.y}</div>${pic}`, prompt: `「${w.y}」の かんじは どれかな?`, speak: `${w.y}。${w.y}の かんじは どれかな`,
          answer: w.k, choices: shuffle([w.k, ...others]), choiceClass: 'kanji-choice kyokasho',
        };
      }
      case 'tegaki': return {
        type: 'canvas', media: `<div class="reading">${w.y}</div>${pic}`, prompt: `「${w.y}」を かんじで かこう。`, speak: `${w.y}。${w.y}を かんじで かこう`, answer: w.k,
      };
      default: return {
        type: 'choice', media: `<div class="emoji-pic">${w.e}</div>`, prompt: 'これは なにかな? ただしい ことばを えらぼう。',
        answer: w.y, choices: shuffle([w.y, ...pickOthers(WORDS, x => x.y, 2, [w.y])]),
      };
    }
  });
}

/* ===== 絵を見て ===== */
function allPictures() {
  const ov = LS.get('kk_overrides', {});
  const def = PICTURES.map(p => ({ ...p, custom: false, img: ov[p.id] || null, q: p.t === 'ようす' ? 'どんな ようすですか。' : 'なにを して いますか。' }));
  const custom = LS.get('kk_pics', []).map(p => ({ ...p, custom: true }));
  return [...def, ...custom];
}
function picMedia(p, cls = '') {
  return p.img ? `<div class="pic ${cls}"><img src="${esc(p.img)}" alt="${esc(p.a)}" loading="lazy"></div>` : `<div class="emoji-pic ${cls}">${p.e || '❓'}</div>`;
}
function picDistractors(p, all) {
  const d = (p.d || []).slice(0, 3);
  if (d.length < 2) {
    const same = all.filter(x => x.t === p.t && x.a !== p.a);
    d.push(...pickOthers(same.length >= 2 ? same : all, x => x.a, 2 - d.length, [p.a, ...d]));
  }
  return d;
}
screens.picMenu = () => {
  const o = state.picOpt;
  app().innerHTML = `
    <h2 class="page-title">🖼️ えを 見て こたえよう</h2>
    <div class="panel">
      <div class="label">なにを こたえる?</div>
      ${chipsHTML('pType', [['all', 'ぜんぶ'], ['うごき', 'うごき（なにを して いる?）'], ['ようす', 'ようす（どんな ようす?）'], ['その他', 'せんせいの もんだい']], v => o.type === v)}
      <div class="label">こたえかた</div>
      ${chipsHTML('pMode', [['choice', '👆 えらぶ'], ['write', '✏️ かく']], v => o.mode === v)}
      <div class="label">もんだいの かず</div>
      ${chipsHTML('pCnt', [[5, '5もん'], [10, '10もん'], [99, 'ぜんぶ']], v => o.count === v)}
    </div>
    <button class="btn primary big wide" id="pStart">はじめる ▶</button>`;
  $$('#pType .chip').forEach(b => b.onclick = () => { o.type = b.dataset.v; screens.picMenu(); });
  $$('#pMode .chip').forEach(b => b.onclick = () => { o.mode = b.dataset.v; screens.picMenu(); });
  $$('#pCnt .chip').forEach(b => b.onclick = () => { o.count = +b.dataset.v; screens.picMenu(); });
  $('#pStart').onclick = () => {
    const pool = allPictures().filter(p => o.type === 'all' || p.t === o.type);
    if (!pool.length) { toast('もんだいが ありません（せんせい用で ついか できます）'); return; }
    runQuiz({ title: 'えを 見て こたえよう', area: 'え', backTo: 'picMenu', make: () => buildPicQs(o.type, o.mode, o.count) });
  };
};
function buildPicQs(type, mode, count) {
  const all = allPictures(); const pool = all.filter(p => type === 'all' || p.t === type);
  return shuffle(pool).slice(0, count).map(p => mode === 'choice'
    ? { type: 'choice', media: picMedia(p), prompt: esc(p.q), answer: p.a, choices: shuffle([p.a, ...picDistractors(p, all)]) }
    : { type: 'write', media: picMedia(p), prompt: esc(p.q), answer: p.a, keys: [p.a, ...(p.keys || [])], override: true });
}

/* ===== おはなし ===== */
screens.storyMenu = () => {
  const o = state.storyOpt;
  app().innerHTML = `
    <h2 class="page-title">📖 おはなしを よもう</h2>
    <div class="panel">
      <div class="label">もんだいの むずかしさ</div>
      ${chipsHTML('sLv', [[1, LVNAME[1]], [2, LVNAME[2]], [3, LVNAME[3]]], v => o.level === v)}
      <p class="note">${['', 'えらんで こたえる もんだい', 'えらぶ・ぶんから ぬきだす・みじかく かく もんだい', 'ぬきだす・かく・じぶんの きもちを かく もんだい'][o.level]}</p>
      <label class="switch"><input type="checkbox" id="sListen" ${o.listen ? 'checked' : ''}><span>🎧 ぶんを かくして、きいて こたえる（ききとり）</span></label>
    </div>
    <div class="card-list">
      ${STORIES.map(s => `<button class="story-card ${s.kind === 'せつめいぶん' ? 'expl' : ''}" data-id="${s.id}">
        <span class="badge">${s.kind}</span><b>${rb(s.title)}</b><span class="stars" title="ぶんの ながさ">${'★'.repeat(s.lv)}</span></button>`).join('')}
    </div>`;
  $$('#sLv .chip').forEach(b => b.onclick = () => { o.level = +b.dataset.v; screens.storyMenu(); });
  $('#sListen').onchange = e => { o.listen = e.target.checked; };
  $$('.story-card').forEach(b => b.onclick = () => startStory(STORIES.find(s => s.id === b.dataset.id)));
};
function buildTokens(sentences) {
  state.tokens = [];
  return sentences.map((sen, si) => `<p class="sen" data-s="${si}">${sen.split(' ').map(w => {
    const i = state.tokens.length; state.tokens.push({ raw: w, plain: plain(w) });
    return `<span class="tok" data-i="${i}">${rb(w)}</span>`;
  }).join(' ')}</p>`).join('');
}
function storyQs(s, lv) {
  return s.q.filter(q => q.lv.includes(lv)).map(q => {
    const base = { prompt: rb(q.q), speak: q.q, tag: QTAG[q.t], answer: q.a };
    if (q.t === 'c') return { ...base, type: 'choice', choices: shuffle([q.a, ...q.d]) };
    if (q.t === 'x') return { ...base, type: 'extract', override: true };
    if (q.t === 'w') return { ...base, type: 'write', keys: q.keys || [q.a], override: true };
    return { ...base, type: 'feeling' };
  });
}
function startStory(s) {
  const o = state.storyOpt;
  state.view.revealed = false;
  state.storyHTML = buildTokens(s.text);
  runQuiz({
    title: plain(s.title), area: 'おはなし', backTo: 'storyMenu', sub: LVNAME[o.level],
    make: () => storyQs(s, o.level),
    context: q => {
      const hidden = o.listen && !state.view.revealed && q.type !== 'extract';
      return `<section class="story-box ${s.kind === 'せつめいぶん' ? 'expl' : ''}">
        <div class="story-head"><span class="badge">${s.kind}</span><h3>${rb(s.title)}</h3>
          <div class="story-ctrl">
            <button class="btn small" data-act="read">🔊 よむ</button>
            <button class="btn small ghost" data-act="stop">⏹ とめる</button>
            ${o.listen && q.type !== 'extract' ? `<button class="btn small ghost" data-act="reveal">${hidden ? '👁 ぶんを 見る' : '🙈 かくす'}</button>` : ''}
          </div></div>
        <div class="story-text ${hidden ? 'masked' : ''}">${state.storyHTML}</div></section>`;
    },
    onRender: (q, first) => {
      $$('[data-act]').forEach(b => b.onclick = () => {
        const a = b.dataset.act;
        if (a === 'read') {
          const sens = $$('.story-text .sen');
          sayList(s.text.map(t => ({ text: t })), i => sens.forEach((e, j) => e.classList.toggle('speaking', j === i)));
        } else if (a === 'stop') stopSpeak();
        else if (a === 'reveal') {
          state.view.revealed = !state.view.revealed;
          $('.story-text').classList.toggle('masked', !state.view.revealed);
          b.textContent = state.view.revealed ? '🙈 かくす' : '👁 ぶんを 見る';
        }
      });
      if (first && o.listen) $('[data-act="read"]').click();
    },
  });
}

/* ===== かいわ ===== */
screens.convMenu = () => {
  const o = state.convOpt;
  app().innerHTML = `
    <h2 class="page-title">👂 かいわを きこう</h2>
    <div class="panel">
      <div class="label">こたえかた</div>
      ${chipsHTML('cMode', [['choice', '👆 えらぶ'], ['write', '✏️ かく']], v => o.mode === v)}
      <label class="switch"><input type="checkbox" id="cHide" ${o.hide ? 'checked' : ''}><span>🙈 もじを かくして きく</span></label>
      <label class="switch"><input type="checkbox" id="cName" ${o.readName ? 'checked' : ''}><span>🗣 はなす ひとの なまえも よむ</span></label>
    </div>
    <div class="card-list">
      ${CONVS.map(c => `<button class="story-card conv" data-id="${c.id}"><span class="scene">${c.scene}</span><b>${c.title}</b><span class="people">${Object.values(c.people).join('')}</span></button>`).join('')}
    </div>`;
  $$('#cMode .chip').forEach(b => b.onclick = () => { o.mode = b.dataset.v; screens.convMenu(); });
  $('#cHide').onchange = e => { o.hide = e.target.checked; };
  $('#cName').onchange = e => { o.readName = e.target.checked; };
  $$('.story-card').forEach(b => b.onclick = () => startConv(CONVS.find(c => c.id === b.dataset.id)));
};
function convSpeechList(c) {
  const names = Object.keys(c.people); const list = [];
  c.lines.forEach(([n, t], li) => {
    const vi = names.indexOf(n); const pv = { pitch: [1, 1.45, 0.8, 1.2][vi % 4], voiceIndex: vi, li };
    if (state.convOpt.readName) list.push({ text: n + '。', ...pv });
    list.push({ text: t, ...pv });
  });
  return list;
}
function startConv(c) {
  const o = state.convOpt; state.view.revealed = false;
  const names = Object.keys(c.people);
  runQuiz({
    title: c.title, area: 'かいわ', backTo: 'convMenu',
    make: () => c.q.map(q => {
      const base = { prompt: rb(q.q), speak: q.q, tag: q.k, answer: q.a };
      return o.mode === 'choice'
        ? { ...base, type: 'choice', choices: shuffle([q.a, ...q.d]) }
        : { ...base, type: 'write', keys: [q.a, ...(q.keys || [])], override: true };
    }),
    context: () => {
      const hidden = o.hide && !state.view.revealed;
      return `<section class="conv-box">
        <div class="story-head"><span class="scene">${c.scene}</span><h3>${c.title}</h3>
          <div class="story-ctrl">
            <button class="btn small" data-act="play">🔊 きく</button>
            <button class="btn small ghost" data-act="stop">⏹ とめる</button>
            ${o.hide ? `<button class="btn small ghost" data-act="reveal">${hidden ? '👁 もじを 見る' : '🙈 かくす'}</button>` : ''}
          </div></div>
        <div class="conv-lines ${hidden ? 'masked' : ''}">
          ${c.lines.map(([n, t], i) => `<div class="bubble-row ${names.indexOf(n) % 2 ? 'right' : 'left'}" data-l="${i}">
            <div class="avatar"><span>${c.people[n] || '🙂'}</span><small>${n}</small></div><div class="bubble">${rb(t)}</div></div>`).join('')}
        </div></section>`;
    },
    onRender: (q, first) => {
      $$('[data-act]').forEach(b => b.onclick = () => {
        const a = b.dataset.act;
        if (a === 'play') {
          const list = convSpeechList(c); const rows = $$('.bubble-row');
          sayList(list, k => rows.forEach(r => r.classList.toggle('speaking', k >= 0 && +r.dataset.l === list[k].li)));
        } else if (a === 'stop') stopSpeak();
        else if (a === 'reveal') {
          state.view.revealed = !state.view.revealed;
          $('.conv-lines').classList.toggle('masked', !state.view.revealed);
          b.textContent = state.view.revealed ? '🙈 かくす' : '👁 もじを 見る';
        }
      });
      if (first) $('[data-act="play"]').click();
    },
  });
}

/* ---------- 6. 出題エンジン ---------- */
function runQuiz(cfg) {
  state.quiz = { ...cfg, items: cfg.make(), i: 0, score: 0, log: [] };
  if (!state.quiz.items.length) { toast('もんだいが ありません'); return; }
  renderQ();
}
function renderQ() {
  const z = state.quiz;
  if (z.i >= z.items.length) { finishQuiz(); return; }
  const q = z.items[z.i];
  app().innerHTML = `
    <div class="quiz-head">
      <button class="btn ghost small" id="qBack">◀ やめる</button>
      <div class="qtitle">${esc(z.title)}${z.sub ? ` <small>${z.sub}</small>` : ''}</div>
      <div class="qnum">${z.i + 1} / ${z.items.length}</div>
    </div>
    <div class="progress"><span style="width:${(z.i / z.items.length) * 100}%"></span></div>
    ${z.context ? z.context(q) : ''}
    <div class="q-card">
      ${q.media || ''}
      <div class="prompt">
        ${q.tag ? `<span class="qtag t-${q.type}">${q.tag}</span>` : ''}
        <span class="ptext">${q.prompt}</span>
        <button class="say-btn" id="qSay" aria-label="もんだいを よむ">🔊</button>
      </div>
      ${q.hint ? `<button class="btn ghost small" id="qHint">💡 ヒント</button><div class="hint hidden" id="hintBox">${q.hint}</div>` : ''}
      <div class="answer-area" id="ansArea"></div>
      <div class="feedback" id="fb"></div>
    </div>`;
  $('#qBack').onclick = () => { if (confirm('とちゅうで やめますか?')) go(z.backTo); };
  $('#qSay').onclick = () => { stopSpeak(); say(q.speak || stripTags(q.prompt)); };
  if (q.hint) $('#qHint').onclick = () => $('#hintBox').classList.toggle('hidden');
  ANSWER[q.type](q, $('#ansArea'));
  const first = z.i === 0;
  if (z.onRender) z.onRender(q, first);
  if (settings.autoRead && !(first && z.onRender)) say(q.speak || stripTags(q.prompt));
}
function answered(ok, info = {}) {
  const z = state.quiz, q = z.items[z.i];
  if (q.done) return; q.done = true;
  if (ok) z.score++;
  z.log.push({ q: stripTags(q.prompt), given: info.given || '', ok, type: q.type, answer: plain(q.answer || '') });
  beep(ok);
  const fb = $('#fb');
  fb.className = 'feedback show ' + (ok ? 'ok' : 'ng');
  if (q.type === 'feeling') fb.innerHTML = `<div class="mark">💮</div><div class="fb-msg">よく かけたね!</div>`;
  else if (ok) fb.innerHTML = `<div class="mark">⭕</div><div class="fb-msg">せいかい! ${pick(PRAISE)}</div>`;
  else fb.innerHTML = `<div class="mark">❌</div><div class="fb-msg">こたえは 「<b>${rb(esc(q.answer))}</b>」だよ。</div>
      ${info.override ? '<button class="btn small ghost" id="ovBtn">⭕ あって いた（せんせい）</button>' : ''}`;
  fb.insertAdjacentHTML('beforeend', `<button class="btn primary big" id="nextBtn">${z.i + 1 < z.items.length ? 'つぎへ ▶' : 'おわり ▶'}</button>`);
  if (info.override && !ok) $('#ovBtn').onclick = () => {
    z.score++; z.log[z.log.length - 1].ok = true; fb.className = 'feedback show ok';
    $('.mark', fb).textContent = '⭕'; $('.fb-msg', fb).innerHTML = 'あって いたね! よく できました。'; $('#ovBtn').remove(); beep(true);
  };
  $('#nextBtn').onclick = () => { stopSpeak(); z.i++; renderQ(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  setTimeout(() => $('#nextBtn') && $('#nextBtn').scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
}
const ANSWER = {
  choice(q, area) {
    area.innerHTML = `<div class="choices ${q.choiceClass || ''}">${q.choices.map((c, i) => `<button class="choice" data-i="${i}">${rb(esc(c))}</button>`).join('')}</div>`;
    $$('.choice', area).forEach(b => b.onclick = () => {
      if (q.done) return;
      const c = q.choices[+b.dataset.i]; const ok = c === q.answer;
      $$('.choice', area).forEach(x => { x.disabled = true; if (q.choices[+x.dataset.i] === q.answer) x.classList.add('correct'); });
      if (!ok) b.classList.add('wrong');
      answered(ok, { given: c });
    });
  },
  write(q, area) {
    area.innerHTML = `<div class="write-row">
      <input type="text" id="wIn" class="write-in" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="ここに かこう" lang="ja">
      <button class="btn primary" id="wOk">こたえる</button></div>
      <p class="note">※ iPadは キーボードの 🌐 で「てがき」や「かな」に かえられます</p>`;
    const go2 = () => {
      if (q.done) return; const v = $('#wIn').value.trim();
      if (!v) { $('#wIn').focus(); toast('こたえを かいてね'); return; }
      $('#wIn').disabled = true; answered(checkWrite(v, q.keys || [q.answer]), { given: v, override: q.override });
    };
    $('#wOk').onclick = go2;
    $('#wIn').onkeydown = e => { if (e.key === 'Enter' && !e.isComposing) go2(); };
  },
  canvas(q, area) {
    const n = [...q.answer].length;
    area.innerHTML = `<div class="tegaki-wrap"><canvas id="pad" width="${300 * n}" height="300" style="max-width:${240 * n}px"></canvas>
        <div class="tegaki-ans kyokasho hidden" id="tAns">${q.answer}</div></div>
      <div class="row center"><button class="btn" id="tClr">🧽 けす</button><button class="btn primary" id="tShow">👀 こたえを 見る</button></div>
      <div class="row center hidden" id="tSelf"><span class="self-q">おなじに かけたかな?</span>
        <button class="btn ok" id="tOk">⭕ かけた</button><button class="btn" id="tRe">🔁 もういちど</button><button class="btn ghost" id="tSkip">つぎへ</button></div>`;
    const pad = setupPad($('#pad'), n);
    $('#tClr').onclick = pad.clear;
    $('#tShow').onclick = () => { $('#tAns').classList.remove('hidden'); $('#tSelf').classList.remove('hidden'); };
    $('#tRe').onclick = () => { pad.clear(); $('#tAns').classList.add('hidden'); $('#tSelf').classList.add('hidden'); };
    $('#tOk').onclick = () => { $('#tSelf').classList.add('hidden'); answered(true, { given: '（てがき）' }); };
    $('#tSkip').onclick = () => { $('#tSelf').classList.add('hidden'); answered(false, { given: '（てがき）' }); };
  },
  extract(q, area) {
    const sel = new Set();
    area.innerHTML = `<p class="note">👆 ぶんの なかの ことばを タップして えらぼう（いくつでも）</p>
      <div class="extract-box" id="xBox">（まだ えらんで いません）</div>
      <div class="row center"><button class="btn" id="xClr">やりなおす</button><button class="btn primary" id="xOk">これに する</button></div>`;
    const toks = $$('.story-text .tok');
    const text = () => [...sel].sort((a, b) => a - b).map(i => state.tokens[i].plain).join('');
    const upd = () => { $('#xBox').textContent = sel.size ? text() : '（まだ えらんで いません）'; };
    toks.forEach(t => {
      t.classList.add('selectable');
      t.onclick = () => { if (q.done) return; const i = +t.dataset.i; if (sel.has(i)) sel.delete(i); else sel.add(i); t.classList.toggle('picked'); upd(); };
    });
    $('#xClr').onclick = () => { if (q.done) return; sel.clear(); toks.forEach(t => t.classList.remove('picked')); upd(); };
    $('#xOk').onclick = () => {
      if (q.done) return; if (!sel.size) { toast('ことばを えらんでね'); return; }
      const g = norm(text()), a = norm(q.answer);
      const ok = g.includes(a) && g.length <= a.length + 5;
      toks.forEach(t => t.classList.remove('selectable'));
      answered(ok, { given: text(), override: q.override });
    };
  },
  feeling(q, area) {
    area.innerHTML = `<textarea id="fIn" class="feel-in" rows="4" placeholder="おもった ことを じゆうに かこう"></textarea>
      <div class="row center"><button class="btn primary" id="fOk">できた!</button></div>`;
    $('#fOk').onclick = () => {
      if (q.done) return; const v = $('#fIn').value.trim();
      if (!v) { toast('すこしでも かいて みよう'); return; }
      $('#fIn').disabled = true; answered(true, { given: v });
    };
  },
};
function setupPad(cv, n) {
  const g = cv.getContext('2d'); const W = cv.width, H = cv.height, box = H;
  function grid() {
    g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
    g.strokeStyle = '#7aa79c'; g.lineWidth = 4;
    for (let i = 0; i < n; i++) g.strokeRect(i * box + 3, 3, box - 6, H - 6);
    g.setLineDash([12, 10]); g.strokeStyle = '#c9dcd6'; g.lineWidth = 2;
    for (let i = 0; i < n; i++) {
      g.beginPath(); g.moveTo(i * box + box / 2, 8); g.lineTo(i * box + box / 2, H - 8);
      g.moveTo(i * box + 8, H / 2); g.lineTo(i * box + box - 8, H / 2); g.stroke();
    }
    g.setLineDash([]);
  }
  grid();
  let drawing = false, last = null;
  const pos = e => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height }; };
  cv.onpointerdown = e => { drawing = true; last = pos(e); try { cv.setPointerCapture(e.pointerId); } catch (_) { } e.preventDefault(); };
  cv.onpointermove = e => {
    if (!drawing) return; const p = pos(e);
    g.strokeStyle = '#222'; g.lineWidth = box / 20; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(last.x, last.y); g.lineTo(p.x, p.y); g.stroke(); last = p; e.preventDefault();
  };
  cv.onpointerup = cv.onpointercancel = () => { drawing = false; };
  return { clear: grid };
}
function finishQuiz() {
  const z = state.quiz; stopSpeak();
  const total = z.items.length, sc = z.score, r = sc / total;
  const stars = r >= 0.9 ? 3 : r >= 0.6 ? 2 : 1;
  saveRecord({ area: z.area, title: z.title + (z.sub ? `（${z.sub}）` : ''), score: sc, total, log: z.log });
  app().innerHTML = `
    <div class="result">
      <div class="result-stars">${'⭐'.repeat(stars)}</div>
      <h2>${['', 'がんばったね!', 'よく できました!', 'すばらしい!'][stars]}</h2>
      <p class="score">${total}もん ちゅう <b>${sc}</b>もん せいかい</p>
      <div class="row center">
        <button class="btn primary big" id="again">🔁 もういちど</button>
        <button class="btn big" id="toMenu">📋 メニューへ</button>
      </div>
      <details class="review"><summary>ふりかえりを 見る</summary>
        <ol>${z.log.map(l => `<li class="${l.ok ? 'ok' : 'ng'}"><span class="rv-mark">${l.type === 'feeling' ? '💮' : l.ok ? '⭕' : '❌'}</span>
          <span>${esc(l.q)}<br><small>あなたの こたえ：${esc(l.given)}${!l.ok && l.answer ? `／こたえ：${esc(l.answer)}` : ''}</small></span></li>`).join('')}</ol>
      </details>
    </div>`;
  if (stars === 3) beep(true);
  $('#again').onclick = () => { state.view.revealed = false; runQuiz(z); };
  $('#toMenu').onclick = () => go(z.backTo);
}
function saveRecord(r) {
  const recs = LS.get('kk_records', []);
  recs.push({ ...r, date: new Date().toISOString() });
  while (recs.length > 500) recs.shift();
  LS.set('kk_records', recs);
}

/* ---------- 7. せんせい用 ---------- */
const TP = {
  kind: 'words', ans: true, name: true, furi: true, title: '',
  words: { fmt: 'kaki', pic: true, shuffle: false, sel: new Set(WORDS.filter(w => w.c === 'しぜん').map(w => w.k)) },
  pics: { fmt: 'choice', sel: null },
  story: { id: STORIES[0].id, lv: 1, text: true, sel: null },
  conv: { id: CONVS[0].id, fmt: 'choice', text: false, sel: null },
};
const TEACHER = {};
screens.teacher = (tab = 'print') => {
  app().innerHTML = `
    <h2 class="page-title">👩‍🏫 せんせい用</h2>
    <div class="tabs">${[['print', '🖨 プリント作成'], ['pics', '🖼 絵・画像の問題'], ['records', '📊 学習の記録'], ['settings', '⚙ 設定']]
      .map(([k, l]) => `<button class="tab ${k === tab ? 'on' : ''}" data-t="${k}">${l}</button>`).join('')}</div>
    <div id="tbody" class="tbody"></div>`;
  $$('.tab').forEach(b => b.onclick = () => screens.teacher(b.dataset.t));
  TEACHER[tab]($('#tbody'));
};

/* --- プリント作成 --- */
TEACHER.print = box => {
  box.innerHTML = `
    <div class="panel">
      <div class="label">1. プリントの種類</div>
      ${chipsHTML('tpKind', [['words', '✏️ ことば・漢字'], ['pics', '🖼️ 絵を見て'], ['story', '📖 お話（読み取り）'], ['conv', '👂 会話（聞き取り）']], v => TP.kind === v)}
      <div id="tpOpts"></div>
      <div class="label">3. 共通の設定</div>
      <div class="check-row">
        <label class="chk"><input type="checkbox" id="tpAns" ${TP.ans ? 'checked' : ''}> 解答ページをつける</label>
        <label class="chk"><input type="checkbox" id="tpName" ${TP.name ? 'checked' : ''}> 日付・名前らん</label>
        <label class="chk"><input type="checkbox" id="tpFuri" ${TP.furi ? 'checked' : ''}> ふりがな</label>
      </div>
      <label class="field">タイトル（空らんで自動）<input id="tpTitle" value="${esc(TP.title)}" placeholder="れい：かんじの れんしゅう ①"></label>
      <button class="btn primary big wide" id="tpGo">👀 プレビューして印刷</button>
    </div>`;
  $$('#tpKind .chip').forEach(b => b.onclick = () => { TP.kind = b.dataset.v; TEACHER.print(box); });
  $('#tpAns').onchange = e => TP.ans = e.target.checked;
  $('#tpName').onchange = e => TP.name = e.target.checked;
  $('#tpFuri').onchange = e => TP.furi = e.target.checked;
  $('#tpTitle').oninput = e => TP.title = e.target.value;
  $('#tpGo').onclick = buildPrint;
  PRINT_OPTS[TP.kind]($('#tpOpts'));
};
const PRINT_OPTS = {
  words(el) {
    const o = TP.words;
    el.innerHTML = `
      <div class="label">2. 形式と出題する言葉</div>
      <select id="twFmt" class="sel">
        <option value="kaki">漢字を書く（読み → マスに漢字）</option>
        <option value="nazori">なぞり書き（うすい手本つきマス）</option>
        <option value="yomi">読みを書く（漢字 → ひらがな）</option>
        <option value="erabu">漢字をえらぶ（読み → ○をつける）</option>
        <option value="kotoba">絵に合う言葉をえらぶ</option>
      </select>
      <div class="check-row">
        <label class="chk"><input type="checkbox" id="twPic" ${o.pic ? 'checked' : ''}> 絵（ヒント）をつける</label>
        <label class="chk"><input type="checkbox" id="twShuf" ${o.shuffle ? 'checked' : ''}> 順番をまぜる</label>
      </div>
      <p class="note">選択中：<b>${o.sel.size}</b> 語</p>
      ${WORD_CATS.map(c => `<div class="pick-group"><div class="pg-head"><b>${c}</b>
        <button class="btn tiny" data-all="${c}">全部</button><button class="btn tiny ghost" data-none="${c}">解除</button></div>
        <div class="pick-grid">${WORDS.filter(w => w.c === c).map(w => `<label class="pick"><input type="checkbox" data-w="${w.k}" ${o.sel.has(w.k) ? 'checked' : ''}><span>${w.e} ${w.k}</span></label>`).join('')}</div></div>`).join('')}`;
    $('#twFmt').value = o.fmt;
    $('#twFmt').onchange = e => o.fmt = e.target.value;
    $('#twPic').onchange = e => o.pic = e.target.checked;
    $('#twShuf').onchange = e => o.shuffle = e.target.checked;
    $$('[data-w]', el).forEach(c => c.onchange = () => { if (c.checked) o.sel.add(c.dataset.w); else o.sel.delete(c.dataset.w); $('.note b', el).textContent = o.sel.size; });
    $$('[data-all]', el).forEach(b => b.onclick = () => { WORDS.filter(w => w.c === b.dataset.all).forEach(w => o.sel.add(w.k)); PRINT_OPTS.words(el); });
    $$('[data-none]', el).forEach(b => b.onclick = () => { WORDS.filter(w => w.c === b.dataset.none).forEach(w => o.sel.delete(w.k)); PRINT_OPTS.words(el); });
  },
  pics(el) {
    const o = TP.pics; const all = allPictures();
    if (!o.sel) o.sel = new Set(all.slice(0, 8).map(p => p.id));
    el.innerHTML = `
      <div class="label">2. 形式と出題する絵</div>
      ${chipsHTML('tpFmt', [['choice', '選択（○をつける）'], ['write', '記述（書く）']], v => o.fmt === v)}
      <p class="note">選択中：<b>${[...o.sel].filter(id => all.some(p => p.id === id)).length}</b> 問
        <button class="btn tiny" id="tpAll">全部</button><button class="btn tiny ghost" id="tpNone">解除</button></p>
      <div class="pick-grid pics">${all.map(p => `<label class="pick pic-pick"><input type="checkbox" data-p="${p.id}" ${o.sel.has(p.id) ? 'checked' : ''}>${picMedia(p, 'thumb')}<span>${esc(p.a)}</span></label>`).join('')}</div>`;
    $$('#tpFmt .chip').forEach(b => b.onclick = () => { o.fmt = b.dataset.v; PRINT_OPTS.pics(el); });
    $$('[data-p]', el).forEach(c => c.onchange = () => { if (c.checked) o.sel.add(c.dataset.p); else o.sel.delete(c.dataset.p); $('.note b', el).textContent = o.sel.size; });
    $('#tpAll').onclick = () => { all.forEach(p => o.sel.add(p.id)); PRINT_OPTS.pics(el); };
    $('#tpNone').onclick = () => { o.sel.clear(); PRINT_OPTS.pics(el); };
  },
  story(el) {
    const o = TP.story; const s = STORIES.find(x => x.id === o.id);
    if (!o.sel) o.sel = new Set(s.q.map((q, i) => q.lv.includes(o.lv) ? i : -1).filter(i => i >= 0));
    el.innerHTML = `
      <div class="label">2. お話・レベル・設問</div>
      <select id="tsId" class="sel">${STORIES.map(x => `<option value="${x.id}">${plain(x.title)}（${x.kind}・${'★'.repeat(x.lv)}）</option>`).join('')}</select>
      ${chipsHTML('tsLv', [[1, LVNAME[1]], [2, LVNAME[2]], [3, LVNAME[3]]], v => o.lv === v)}
      <label class="chk"><input type="checkbox" id="tsText" ${o.text ? 'checked' : ''}> 本文をのせる（はずすと聞き取りプリント）</label>
      <div class="q-picks">${s.q.map((q, i) => `<label class="pick qpick"><input type="checkbox" data-q="${i}" ${o.sel.has(i) ? 'checked' : ''}>
        <span class="qtag t-${q.t}">${QTAG[q.t]}</span><span>${plain(q.q)}</span><small>${q.lv.map(l => '★'.repeat(l)).join(' / ')}</small></label>`).join('')}</div>`;
    $('#tsId').value = o.id;
    $('#tsId').onchange = e => { o.id = e.target.value; o.sel = null; PRINT_OPTS.story(el); };
    $$('#tsLv .chip').forEach(b => b.onclick = () => { o.lv = +b.dataset.v; o.sel = null; PRINT_OPTS.story(el); });
    $('#tsText').onchange = e => o.text = e.target.checked;
    $$('[data-q]', el).forEach(c => c.onchange = () => { const i = +c.dataset.q; if (c.checked) o.sel.add(i); else o.sel.delete(i); });
  },
  conv(el) {
    const o = TP.conv; const c = CONVS.find(x => x.id === o.id);
    if (!o.sel) o.sel = new Set(c.q.map((_, i) => i));
    el.innerHTML = `
      <div class="label">2. 会話・形式・設問</div>
      <select id="tcId" class="sel">${CONVS.map(x => `<option value="${x.id}">${x.scene} ${x.title}</option>`).join('')}</select>
      ${chipsHTML('tcFmt', [['choice', '選択（○をつける）'], ['write', '記述（書く）']], v => o.fmt === v)}
      <label class="chk"><input type="checkbox" id="tcText" ${o.text ? 'checked' : ''}> 会話文をのせる（はずすと先生が読んで聞き取り。解答ページには会話文がのります）</label>
      <div class="q-picks">${c.q.map((q, i) => `<label class="pick qpick"><input type="checkbox" data-q="${i}" ${o.sel.has(i) ? 'checked' : ''}><span class="qtag">${q.k}</span><span>${q.q}</span></label>`).join('')}</div>`;
    $('#tcId').value = o.id;
    $('#tcId').onchange = e => { o.id = e.target.value; o.sel = null; PRINT_OPTS.conv(el); };
    $$('#tcFmt .chip').forEach(b => b.onclick = () => { o.fmt = b.dataset.v; PRINT_OPTS.conv(el); });
    $('#tcText').onchange = e => o.text = e.target.checked;
    $$('[data-q]', el).forEach(cb => cb.onchange = () => { const i = +cb.dataset.q; if (cb.checked) o.sel.add(i); else o.sel.delete(i); });
  },
};

/* --- プリントの組み立て --- */
const CIRC = '①②③④⑤';
function pChoices(choices, answer) {
  return `<div class="pc-row">${choices.map((c, j) => `<span class="pc ${c === answer ? 'is-ans' : ''}"><span class="pcn">${CIRC[j]}</span>${rb(esc(c), TP.furi)}</span>`).join('')}</div>`;
}
function pLines(n, answer) {
  return Array.from({ length: n }, (_, i) => `<div class="wline">${i === 0 && answer ? `<span class="ans">${answer}</span>` : ''}</div>`).join('');
}
function masu(str, guide) {
  return [...str].map(ch => /[一-鿿々]/.test(ch)
    ? `<span class="masu kyokasho"><span class="${guide ? 'guide' : 'ans'}">${ch}</span></span>`
    : `<span class="masu fixed kyokasho">${ch}</span>`).join('');
}
function buildPrint() {
  const P = { title: '', body: () => '' };
  const F = TP.furi;
  if (TP.kind === 'words') {
    const o = TP.words; let list = WORDS.filter(w => o.sel.has(w.k));
    if (!list.length) { toast('言葉を1つ以上えらんでください'); return; }
    if (o.shuffle) list = shuffle(list);
    const pic = w => o.pic ? `<span class="pw-e">${w.e}</span>` : '';
    const ch = list.map(w => o.fmt === 'erabu'
      ? shuffle([w.k, ...pickOthers(WORDS.filter(x => x.k.length === w.k.length), x => x.k, 2, [w.k])])
      : shuffle([w.y, ...pickOthers(WORDS, x => x.y, 2, [w.y])]));
    const inst = { kaki: 'よみかたを 見て、かんじを かきましょう。', nazori: 'うすい じを なぞって、かんじを かきましょう。', yomi: 'かんじの よみかたを ひらがなで かきましょう。', erabu: 'よみかたに あう かんじに ○を つけましょう。', kotoba: 'えに あう ことばに ○を つけましょう。' }[o.fmt];
    P.title = { kaki: 'かんじを かこう', nazori: 'かんじを なぞって かこう', yomi: 'かんじを よもう', erabu: 'かんじを えらぼう', kotoba: 'えに あう ことば' }[o.fmt];
    P.body = () => `<p class="ws-inst">${inst}</p><div class="pw-grid ${o.fmt}">${list.map((w, i) => {
      const no = `<span class="no">${i + 1}</span>`;
      if (o.fmt === 'yomi') return `<div class="pw">${no}${pic(w)}<span class="pw-k kyokasho">${w.k}</span><span class="pw-box"><span class="ans">${w.y}</span></span></div>`;
      if (o.fmt === 'erabu') return `<div class="pw">${no}${pic(w)}<span class="pw-y">${w.y}</span>${pChoices(ch[i], w.k).replace('pc-row', 'pc-row kyokasho')}</div>`;
      if (o.fmt === 'kotoba') return `<div class="pw">${no}<span class="pw-e big">${w.e}</span>${pChoices(ch[i], w.y)}</div>`;
      return `<div class="pw">${no}${pic(w)}<span class="pw-y">${w.y}</span><span class="masu-row">${masu(w.k, o.fmt === 'nazori')}</span></div>`;
    }).join('')}</div>`;
  } else if (TP.kind === 'pics') {
    const o = TP.pics; const all = allPictures(); const list = all.filter(p => o.sel && o.sel.has(p.id));
    if (!list.length) { toast('絵を1つ以上えらんでください'); return; }
    const ch = list.map(p => shuffle([p.a, ...picDistractors(p, all)]));
    P.title = 'えを 見て こたえよう';
    P.body = () => `<p class="ws-inst">えを 見て こたえましょう。${o.fmt === 'choice' ? 'ただしい ものに ○を つけましょう。' : ''}</p>
      <div class="pp-grid">${list.map((p, i) => `<div class="pp"><div class="pp-pic">${picMedia(p)}</div>
        <div class="pp-q"><span class="no">${i + 1}</span>${esc(p.q)}</div>
        ${o.fmt === 'choice' ? pChoices(ch[i], p.a) : pLines(1, esc(p.a))}</div>`).join('')}</div>`;
  } else if (TP.kind === 'story') {
    const o = TP.story; const s = STORIES.find(x => x.id === o.id);
    const qs = s.q.filter((_, i) => o.sel.has(i));
    if (!qs.length) { toast('設問を1つ以上えらんでください'); return; }
    const ch = qs.map(q => q.t === 'c' ? shuffle([q.a, ...q.d]) : null);
    P.title = plain(s.title);
    P.body = ans => `${o.text || ans ? `<div class="ps-text ${s.kind === 'せつめいぶん' ? 'expl' : ''}"><div class="ps-kind">${s.kind}</div><h2>${rb(s.title, F)}</h2>${s.text.map(t => `<p>${rb(t, F)}</p>`).join('')}</div>`
      : '<p class="ws-inst">🎧 せんせいが よむ おはなしを よく きいて、こたえましょう。</p>'}
      <div class="pq-list">${qs.map((q, i) => `<div class="pq"><div class="pq-t"><span class="no">${i + 1}</span><span class="ptag">${QTAG[q.t]}</span>${rb(q.q, F)}</div>
        ${q.t === 'c' ? pChoices(ch[i], q.a) : q.t === 'x' ? pLines(1, esc(plain(q.a))) : q.t === 'w' ? pLines(2, esc(q.a)) : pLines(3, '（じゆうに かこう）')}</div>`).join('')}</div>`;
  } else {
    const o = TP.conv; const c = CONVS.find(x => x.id === o.id);
    const qs = c.q.filter((_, i) => o.sel.has(i));
    if (!qs.length) { toast('設問を1つ以上えらんでください'); return; }
    const ch = qs.map(q => shuffle([q.a, ...q.d]));
    P.title = `かいわを きこう「${c.title}」`;
    P.body = ans => `${o.text || ans ? `<div class="pconv">${c.lines.map(([n, t]) => `<p><span class="pc-name">${c.people[n] || ''} ${n}</span>「${rb(t, F)}」</p>`).join('')}</div>`
      : '<p class="ws-inst">🎧 せんせいの かいわを よく きいて、こたえましょう。</p>'}
      <div class="pq-list">${qs.map((q, i) => `<div class="pq"><div class="pq-t"><span class="no">${i + 1}</span><span class="ptag">${q.k}</span>${rb(q.q, F)}</div>
        ${o.fmt === 'choice' ? pChoices(ch[i], q.a) : pLines(1, esc(q.a))}</div>`).join('')}</div>`;
  }
  const title = esc(TP.title.trim() || P.title);
  const head = ans => `<div class="ws-head"><h1>${title}${ans ? '<span class="ans-tag">こたえ</span>' : ''}</h1>
    ${TP.name ? '<div class="ws-name"><span>　　がつ　　にち</span><span class="nm">なまえ</span></div>' : ''}</div>`;
  let html = `<div class="sheet">${head(false)}${P.body(false)}</div>`;
  if (TP.ans) html += `<div class="sheet with-ans">${head(true)}${P.body(true)}</div>`;
  $('#print-area').innerHTML = html;
  $('#print-overlay').classList.remove('hidden');
  document.body.classList.add('previewing');
  $('#print-overlay').scrollTop = 0;
}

/* --- 絵・画像の問題 --- */
TEACHER.pics = box => {
  const all = allPictures(); const ov = LS.get('kk_overrides', {});
  let npImg = null;
  box.innerHTML = `
    <div class="panel">
      <h3>➕ 絵・写真の問題を追加</h3>
      <p class="note">インターネットの画像は「画像のURL」をはり付けるか、いったん iPad（写真・ファイル）に保存してから「ファイルから選ぶ」で取り込めます。<br>
      オフラインで使うときや印刷を確実にしたいときは「ファイルから選ぶ」がおすすめです（自動で小さくして保存します）。<br>
      ※画像の利用は、著作権・利用規約を確認のうえ授業の範囲で行ってください。</p>
      <div class="form-grid">
        <label class="field">ファイルから選ぶ<input type="file" id="npFile" accept="image/*"></label>
        <label class="field">画像のURL<input type="url" id="npUrl" placeholder="https://～.jpg"></label>
        <div class="np-preview" id="npPrev">画像のプレビュー</div>
        <label class="field">種類<select id="npType" class="sel"><option>うごき</option><option>ようす</option><option>その他</option></select></label>
        <label class="field">問いの文<input id="npQ" value="なにを して いますか。"></label>
        <label class="field">正解<input id="npA" placeholder="れい：ボールを なげて いる"></label>
        <label class="field">書いたときに正解にする言葉（「、」区切り）<input id="npK" placeholder="れい：なげ、投げ"></label>
        <label class="field">まちがいの選択肢（「、」区切り・2つ）<input id="npD" placeholder="れい：ボールを けって いる、ねて いる"></label>
      </div>
      <button class="btn primary" id="npAdd">追加する</button>
    </div>
    <div class="panel">
      <h3>📚 登録されている問題（${all.length}問）</h3>
      <p class="note">はじめから入っている問題も「画像を変える」で写真やイラストに差しかえられます。</p>
      <div class="pic-list">${all.map(p => `<div class="pic-item">
        ${picMedia(p, 'thumb')}
        <div class="pi-info"><b>${esc(p.a)}</b><small>${esc(p.t)}｜${esc(p.q)}${p.custom ? '｜<span class="tagc">追加</span>' : ''}</small></div>
        <div class="pi-act">
          ${p.custom ? `<button class="btn tiny ng" data-del="${p.id}">🗑 削除</button>`
            : `<button class="btn tiny" data-file="${p.id}">📁 画像を変える</button><button class="btn tiny" data-url="${p.id}">🔗 URL</button>${ov[p.id] ? `<button class="btn tiny ghost" data-reset="${p.id}">↩ 元の絵</button>` : ''}`}
        </div></div>`).join('')}</div>
    </div>
    <div class="panel">
      <h3>💾 データの書き出し・読み込み</h3>
      <p class="note">追加した問題・画像を別の iPad や パソコンに移すときに使います。</p>
      <div class="row"><button class="btn" id="exBtn">⬇ 書き出す（.json）</button>
        <label class="btn">⬆ 読み込む<input type="file" id="imFile" accept="application/json,.json" hidden></label></div>
    </div>`;
  const prev = src => { $('#npPrev').innerHTML = src ? `<img src="${esc(src)}" alt="">` : '画像のプレビュー'; };
  $('#npFile').onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try { npImg = await fileToDataURL(f); $('#npUrl').value = ''; prev(npImg); } catch (_) { toast('画像を読み込めませんでした'); }
  };
  $('#npUrl').oninput = e => { npImg = e.target.value.trim() || null; prev(npImg); };
  let qEdited = false;
  $('#npQ').oninput = () => qEdited = true;
  $('#npType').onchange = e => { if (!qEdited) $('#npQ').value = e.target.value === 'ようす' ? 'どんな ようすですか。' : e.target.value === 'うごき' ? 'なにを して いますか。' : ''; };
  $('#npAdd').onclick = () => {
    const a = $('#npA').value.trim();
    if (!npImg) { toast('画像を選ぶか、URLを入れてください'); return; }
    if (!a) { toast('正解を入れてください'); return; }
    const p = { id: 'u' + Date.now(), t: $('#npType').value, img: npImg, q: $('#npQ').value.trim() || 'これは なんですか。', a, keys: splitList($('#npK').value), d: splitList($('#npD').value) };
    const list = LS.get('kk_pics', []); list.push(p);
    if (LS.set('kk_pics', list)) { toast('追加しました'); TEACHER.pics(box); }
  };
  $$('[data-del]', box).forEach(b => b.onclick = () => {
    if (!confirm('この問題を削除しますか?')) return;
    LS.set('kk_pics', LS.get('kk_pics', []).filter(p => p.id !== b.dataset.del)); TEACHER.pics(box);
  });
  const setOv = (id, img) => { const o = LS.get('kk_overrides', {}); if (img) o[id] = img; else delete o[id]; if (LS.set('kk_overrides', o)) TEACHER.pics(box); };
  $$('[data-file]', box).forEach(b => b.onclick = () => {
    const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*';
    inp.onchange = async () => { const f = inp.files[0]; if (!f) return; try { setOv(b.dataset.file, await fileToDataURL(f)); } catch (_) { toast('画像を読み込めませんでした'); } };
    inp.click();
  });
  $$('[data-url]', box).forEach(b => b.onclick = () => { const u = prompt('画像のURLを入力してください'); if (u && u.trim()) setOv(b.dataset.url, u.trim()); });
  $$('[data-reset]', box).forEach(b => b.onclick = () => setOv(b.dataset.reset, null));
  $('#exBtn').onclick = () => download('kokugo-hiroba-data.json', JSON.stringify({ app: 'kokugo-hiroba', ver: 1, pics: LS.get('kk_pics', []), overrides: LS.get('kk_overrides', {}) }), 'application/json');
  $('#imFile').onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    const fr = new FileReader();
    fr.onload = () => {
      try {
        const d = JSON.parse(fr.result); if (d.app !== 'kokugo-hiroba') throw new Error();
        if (!confirm(`追加の問題 ${(d.pics || []).length} 問を読み込みます。よろしいですか?`)) return;
        const cur = LS.get('kk_pics', []); const ids = new Set(cur.map(p => p.id));
        (d.pics || []).forEach(p => { if (!ids.has(p.id)) cur.push(p); });
        LS.set('kk_pics', cur); LS.set('kk_overrides', Object.assign(LS.get('kk_overrides', {}), d.overrides || {}));
        toast('読み込みました'); TEACHER.pics(box);
      } catch (_) { toast('このファイルは読み込めません'); }
    };
    fr.readAsText(f);
  };
};

/* --- 学習の記録 --- */
TEACHER.records = box => {
  const recs = LS.get('kk_records', []).slice().reverse();
  const fmt = d => { const t = new Date(d); return `${t.getMonth() + 1}/${t.getDate()} ${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}`; };
  box.innerHTML = `
    <div class="panel">
      <div class="row"><button class="btn" id="csvBtn">⬇ CSVで書き出す</button><button class="btn ng" id="clrRec">🗑 記録をすべて消す</button></div>
      <p class="note">この端末で学習した記録です（最大500件）。行をタップすると、答えた内容（気持ち・感想の文も）を見られます。</p>
      ${recs.length ? `<table class="rec-table"><thead><tr><th>日時</th><th>種類</th><th>内容</th><th>正答</th></tr></thead><tbody>
        ${recs.map((r, i) => `<tr class="rec-row" data-i="${i}"><td>${fmt(r.date)}</td><td>${esc(r.area)}</td><td>${esc(r.title)}</td><td><b>${r.score}</b>/${r.total}</td></tr>
          <tr class="rec-detail hidden" id="rd${i}"><td colspan="4"><ol>${(r.log || []).map(l => `<li>${l.type === 'feeling' ? '💮' : l.ok ? '⭕' : '❌'} ${esc(l.q)}<br><small>答え：${esc(l.given)}</small></li>`).join('')}</ol></td></tr>`).join('')}
      </tbody></table>` : '<p class="center note">まだ記録はありません。</p>'}
    </div>`;
  $$('.rec-row', box).forEach(r => r.onclick = () => $('#rd' + r.dataset.i).classList.toggle('hidden'));
  $('#clrRec').onclick = () => { if (confirm('記録をすべて消します。よろしいですか?')) { LS.set('kk_records', []); TEACHER.records(box); } };
  $('#csvBtn').onclick = () => {
    const q = s => `"${String(s).replace(/"/g, '""')}"`;
    const rows = [['日時', '種類', '内容', '正答数', '問題数', '答えた内容'].map(q).join(',')];
    LS.get('kk_records', []).forEach(r => rows.push([new Date(r.date).toLocaleString('ja-JP'), r.area, r.title, r.score, r.total,
      (r.log || []).map(l => `${l.ok ? '○' : '×'}${l.q}→${l.given}`).join(' / ')].map(q).join(',')));
    download('kokugo-kiroku.csv', '﻿' + rows.join('\r\n'), 'text/csv');
  };
};

/* --- 設定 --- */
TEACHER.settings = box => {
  box.innerHTML = `
    <div class="panel">
      <label class="field">読み上げの速さ：<b id="rateV">${settings.rate.toFixed(1)}</b>
        <input type="range" id="stRate" min="0.5" max="1.4" step="0.1" value="${settings.rate}"></label>
      <button class="btn" id="stTest">🔊 ためしに読む</button>
      <p class="note">読み上げの声（日本語）：${HAS_TTS ? (jaVoices.length ? jaVoices.map(v => esc(v.name)).join('、') : '端末の標準の声') : 'このブラウザでは使えません'}</p>
      <div class="check-col">
        <label class="switch"><input type="checkbox" id="stFuri" ${settings.furigana ? 'checked' : ''}><span>漢字にふりがなをつける</span></label>
        <label class="switch"><input type="checkbox" id="stBig" ${settings.big ? 'checked' : ''}><span>文字を大きくする</span></label>
        <label class="switch"><input type="checkbox" id="stSound" ${settings.sound ? 'checked' : ''}><span>正解・不正解の効果音</span></label>
        <label class="switch"><input type="checkbox" id="stAuto" ${settings.autoRead ? 'checked' : ''}><span>問題を自動で読み上げる</span></label>
        <label class="switch"><input type="checkbox" id="stLock" ${settings.teacherLock ? 'checked' : ''}><span>せんせいボタンを「長おし」で開く（児童の誤操作防止）</span></label>
      </div>
    </div>`;
  $('#stRate').oninput = e => { settings.rate = +e.target.value; $('#rateV').textContent = settings.rate.toFixed(1); saveSettings(); };
  $('#stTest').onclick = () => { stopSpeak(); say('こんにちは。いっしょに こくごの べんきょうを しよう。'); };
  [['stFuri', 'furigana'], ['stBig', 'big'], ['stSound', 'sound'], ['stAuto', 'autoRead'], ['stLock', 'teacherLock']]
    .forEach(([id, k]) => { $('#' + id).onchange = e => { settings[k] = e.target.checked; saveSettings(); }; });
};

/* ---------- 8. はじめる ---------- */
function setupHeader() {
  $('#homeBtn').onclick = () => go('home');
  const b = $('#teacherBtn'); let tm = null;
  b.addEventListener('pointerdown', () => { if (!settings.teacherLock) return; tm = setTimeout(() => { tm = null; go('teacher'); }, 800); });
  b.addEventListener('pointerup', () => { if (tm) { clearTimeout(tm); tm = null; toast('せんせいは ボタンを ながおし してね'); } });
  b.addEventListener('pointerleave', () => { if (tm) { clearTimeout(tm); tm = null; } });
  b.addEventListener('click', () => { if (!settings.teacherLock) go('teacher'); });
  b.addEventListener('contextmenu', e => e.preventDefault());
  $('#doPrint').onclick = () => window.print();
  $('#closePrint').onclick = () => { $('#print-overlay').classList.add('hidden'); document.body.classList.remove('previewing'); };
}
document.addEventListener('DOMContentLoaded', () => {
  applySettings(); setupHeader(); go('home');
});
