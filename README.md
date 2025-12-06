# 数学アートギャラリー ✨

数学的な図形や関数をインタラクティブに表示するギャラリーサイトです。p5.jsを使って、美しい数学の世界を視覚化します。

## 📁 プロジェクト構成

```
math-art/
├── index.html              # メインHTML
├── styles.css              # スタイルシート
├── js/
│   ├── app.js             # メインアプリケーションロジック
│   └── artworks/
│       ├── circle.js      # サンプル作品（円）
│       └── dummy.js       # Coming Soon用のダミー作品
└── README.md
```

## 🎨 アーキテクチャ概要

### 1. HTML構造（index.html）

- **ヘッダー**: サイトタイトルと説明
- **コンテナ**: 2カラムレイアウト
  - **作品リスト（aside）**: 作品メニュー（左側）
  - **作品表示エリア（main）**: タイトル、説明文、キャンバス（右側）

### 2. スタイル（styles.css）

- グラデーション背景（紫系）
- カード型デザイン（半透明の白背景）
- ホバーエフェクト付きメニュー
- レスポンシブ対応（モバイルは縦並び）

### 3. JavaScript構成

#### `app.js` - メインアプリケーション

**主な役割:**
- 作品データの管理
- メニューの動的生成
- 作品の切り替え制御
- p5.jsインスタンスのライフサイクル管理

**主要な関数:**

| 関数名 | 説明 |
|--------|------|
| `initArtworkMenu()` | ページ読み込み時にメニューを生成 |
| `selectArtwork(artworkId)` | 作品を選択して表示を切り替え |
| `updateMenuActiveState(artworkId)` | メニューのアクティブ状態を更新 |
| `updateArtworkInfo(artwork)` | タイトルと説明文を更新 |
| `recreateP5Instance(artwork)` | p5.jsインスタンスを再生成 |

**グローバル変数:**
- `artworks`: 全作品の配列
- `currentP5Instance`: 現在のp5.jsインスタンス
- `currentArtworkId`: 現在表示中の作品ID

#### 作品ファイル（`js/artworks/`）

各作品は以下の構造を持つオブジェクトとして定義します:

```javascript
const artworkName = {
    id: 'unique-id',           // 一意のID
    title: '作品タイトル',      // 表示用タイトル
    description: '説明文...',   // 数学的な説明
    isDummy: false,            // ダミー作品かどうか
    
    sketch: (p) => {           // p5.jsスケッチ関数
        p.setup = () => {
            p.createCanvas(700, 500);
            // 初期化処理
        };
        
        p.draw = () => {
            // 描画処理（毎フレーム実行）
        };
    }
};
```

## 🚀 新しい作品の追加方法

### ステップ1: 作品ファイルを作成

`js/artworks/` に新しいJSファイルを作成します。

```javascript
// js/artworks/your-artwork.js
const yourArtwork = {
    id: 'your-artwork',
    title: 'あなたの作品名',
    description: '数学的な説明文。式や概念を含めると良いです。',
    isDummy: false,
    
    sketch: (p) => {
        p.setup = () => {
            p.createCanvas(700, 500);
            // 初期設定
        };
        
        p.draw = () => {
            p.background(255);
            // ここに描画ロジックを実装
        };
    }
};
```

### ステップ2: HTMLにスクリプトを追加

`index.html` の `<script>` タグに新しいファイルを追加:

```html
<script src="js/artworks/circle.js"></script>
<script src="js/artworks/your-artwork.js"></script>  <!-- 追加 -->
<script src="js/artworks/dummy.js"></script>
<script src="js/app.js"></script>
```

### ステップ3: 作品リストに追加

`js/app.js` の `artworks` 配列に追加:

```javascript
const artworks = [
    circleArtwork,
    yourArtwork,        // 追加
    dummyArtwork1,
    // ...
];
```

## 🎯 p5.jsの主な機能

### よく使う関数

- `p.createCanvas(w, h)`: キャンバスを作成
- `p.background(color)`: 背景色を設定
- `p.circle(x, y, d)`: 円を描画
- `p.line(x1, y1, x2, y2)`: 線を描画
- `p.stroke(color)`: 線の色を設定
- `p.fill(color)`: 塗りつぶし色を設定
- `p.noStroke()` / `p.noFill()`: 線/塗りつぶしを無効化

### インタラクティブな要素

- `p.mouseX` / `p.mouseY`: マウス座標
- `p.frameCount`: フレーム数（アニメーション用）
- `p.map(value, start1, stop1, start2, stop2)`: 値の範囲を変換

### 座標変換

- `p.translate(x, y)`: 原点を移動
- `p.rotate(angle)`: 回転
- `p.push()` / `p.pop()`: 座標系の保存/復元

## 📝 コーディング規約

- **変数名**: キャメルケース（`currentArtwork`）
- **定数**: キャメルケース（`artworks`配列など）
- **コメント**: 端的に書く
- **一人称**: 「ウチ」（コメント内）
- **トーン**: 丁寧語（ですます調）+ ちょっとカジュアル

## 🎨 デザインカスタマイズ

### カラーパレット

主要な色は `styles.css` で定義:

- **メインカラー**: `#667eea` (紫)
- **アクセント**: `#764ba2` (濃い紫)
- **背景**: グラデーション (`#667eea` → `#764ba2`)
- **カード背景**: `rgba(255, 255, 255, 0.95)`

### レイアウト調整

- **作品リスト幅**: `.artwork-list { flex: 0 0 300px; }`
- **キャンバスサイズ**: `p.createCanvas(700, 500)` で変更可能
- **レスポンシブ**: 768px以下で縦並びに切り替わり

## 🔧 開発のヒント

### デバッグ

ブラウザの開発者ツール（F12）でコンソールを確認:
```javascript
console.log(p.mouseX, p.mouseY);  // マウス座標を確認
console.log(p.frameRate());        // フレームレートを確認
```

### パフォーマンス最適化

- `p.draw()` 内の重い処理は最小限に
- 固定値は `p.setup()` で計算して保存
- 必要に応じて `p.frameRate(30)` でFPSを制限

### 数学関数

p5.jsには便利な数学関数が用意されています:
- `p.sin()`, `p.cos()`, `p.tan()`: 三角関数
- `p.sqrt()`, `p.pow()`: 平方根、累乗
- `p.abs()`, `p.floor()`, `p.ceil()`: 絶対値、切り捨て、切り上げ
- `p.random()`, `p.noise()`: ランダム、ノイズ

## 📚 参考リンク

- [p5.js 公式リファレンス](https://p5js.org/reference/)
- [p5.js 日本語リファレンス](https://p5js.jp/reference/)
- [Math is Fun](https://www.mathsisfun.com/) - 数学の視覚的な説明

## 🎓 学習教材として

このプロジェクトは以下の学習に適しています:

- **HTML/CSS**: 基本的なレイアウト、レスポンシブデザイン
- **JavaScript**: DOM操作、イベント処理、オブジェクト指向
- **p5.js**: グラフィックスプログラミング、アニメーション
- **数学**: 幾何学、三角関数、フラクタル、カオス理論

---

作成日: 2025年12月6日  
楽しくコーディングしてくださいね✨
