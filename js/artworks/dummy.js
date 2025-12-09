// ダミー作品 - Coming Soon表示用
const createDummyArtwork = (id, title, description) => ({
    id,
    title,
    description,
    isDummy: true,
    
    sketch: (p) => {
        p.setup = () => {
            // コンテナのサイズに合わせてキャンバスを作成
            const container = document.getElementById('canvasContainer');
            const w = container.offsetWidth - 20; // パディング分を考慮
            const h = Math.max(300, Math.min(500, w * 0.7)); // 高さは幅の70%（最小300、最大500）
            p.createCanvas(w, h);
            p.textAlign(p.CENTER, p.CENTER);
        };
        
        // ウィンドウリサイズ時の対応
        p.windowResized = () => {
            const container = document.getElementById('canvasContainer');
            const w = container.offsetWidth - 20;
            const h = Math.max(300, Math.min(500, w * 0.7));
            p.resizeCanvas(w, h);
        };
        
        p.draw = () => {
            // グラデーション背景
            for (let i = 0; i < p.height; i++) {
                let inter = p.map(i, 0, p.height, 0, 1);
                let c = p.lerpColor(p.color(102, 126, 234), p.color(118, 75, 162), inter);
                p.stroke(c);
                p.line(0, i, p.width, i);
            }
            
            // Coming Soon テキスト
            p.fill(255, 255, 255, 200);
            p.noStroke();
            // 画面幅に応じてテキストサイズを調整
            const mainTextSize = p.width < 400 ? 28 : 48;
            const subTextSize = p.width < 400 ? 16 : 24;
            p.textSize(mainTextSize);
            p.textFont('Arial');
            p.text('Coming Soon ✨', p.width / 2, p.height / 2 - 30);
            
            p.textSize(subTextSize);
            p.fill(255, 255, 255, 150);
            p.text('この作品は準備中です', p.width / 2, p.height / 2 + 30);
            
            // アニメーション効果
            let pulseSize = p.sin(p.frameCount * 0.05) * 5;
            p.fill(255, 255, 255, 100);
            p.noStroke();
            p.circle(p.width / 2, p.height / 2 + 100, 20 + pulseSize);
        };
    }
});

// 9個のダミー作品を定義
const dummyArtwork1 = createDummyArtwork(
    'spiral',
    'フィボナッチ螺旋',
    'フィボナッチ数列に基づいた美しい螺旋パターン。黄金比 φ = (1+√5)/2 ≈ 1.618 が織りなす自然の調和を表現します。'
);

const dummyArtwork2 = createDummyArtwork(
    'fractal',
    'マンデルブロ集合',
    '複素平面上の美しいフラクタル図形。z → z² + c の単純な漸化式から生まれる無限の複雑さを探索します。'
);

const dummyArtwork3 = createDummyArtwork(
    'wave',
    '三角関数の波',
    'sin と cos が織りなす波の重ね合わせ。周期関数の美しさとフーリエ変換の原理を視覚化します。'
);

const dummyArtwork4 = createDummyArtwork(
    'lissajous',
    'リサジュー図形',
    '2つの正弦波の組み合わせで描かれる曲線。x = A·sin(at + δ), y = B·sin(bt) のパラメトリック方程式が生み出す美しい軌跡。'
);

const dummyArtwork5 = createDummyArtwork(
    'rose',
    'バラ曲線',
    '極座標で表現される花のような曲線。r = cos(kθ) の式で、k の値によって様々な花びらの数が現れます。'
);

const dummyArtwork6 = createDummyArtwork(
    'lorenz',
    'ローレンツアトラクタ',
    'カオス理論の代表例。3つの微分方程式が生み出す予測不可能な美しい軌道を3次元で表現します。'
);

const dummyArtwork7 = createDummyArtwork(
    'polygon',
    '正多角形の変容',
    '正多角形から円への連続的な変化。n → ∞ の極限で円に収束する過程をインタラクティブに体験します。'
);

const dummyArtwork8 = createDummyArtwork(
    'voronoi',
    'ボロノイ図',
    '平面上の点の集合から生成される領域分割。各点に最も近い領域を色分けし、自然界にも現れるパターンを可視化します。'
);

const dummyArtwork9 = createDummyArtwork(
    'fourier',
    'フーリエ級数',
    '任意の周期関数を三角関数の和として表現。円の回転の組み合わせで複雑な図形を描く様子をアニメーションで表示します。'
);
