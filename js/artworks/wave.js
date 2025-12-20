/**
 * 三角関数の波のアート作品
 * 
 * 【三角関数とは】
 * sin（サイン）と cos（コサイン）は、円や波を表現する基本的な数学の関数です。
 * - sin(θ): 角度 θ に対応する y 座標（上下の動き）
 * - cos(θ): 角度 θ に対応する x 座標（左右の動き）
 * 
 * 【波の数式】
 * y = A × sin(2πfx + φ)
 * - A（振幅）: 波の高さ
 * - f（周波数）: 波の数（大きいほど波が多い）
 * - φ（位相）: 波の開始位置のズレ
 * 
 * マウスを動かすと、波の形や周波数が変わります！
 */
const waveArtwork = {
    id: 'wave',
    title: '三角関数の波',
    description: 'sin と cos が織りなす美しい波のパターン。マウスを動かして波の形や周波数を変えて遊んでみてください✨',
    isDummy: false,
    
    sketch: (p) => {
        // 時間変数：アニメーションで使用（波が動いて見える）
        let time = 0;
        // 背景画像をキャッシュする変数（パフォーマンス最適化のため）
        let backgroundGraphics = null;
        
        p.setup = () => {
            // 最初に一度だけ実行される初期設定
            const container = document.getElementById('canvasContainer');
            const w = container.offsetWidth - 20; // 左右のパディングを考慮
            const h = Math.max(300, Math.min(500, w * 0.7)); // 高さを計算
            p.createCanvas(w, h); // キャンバスを作成
            p.colorMode(p.HSB, 360, 100, 100, 100); // HSBカラーモード（色相、彩度、明度）
            
            // 背景を一度だけ描画してキャッシュ（パフォーマンス向上）
            createBackgroundCache();
        };
        
        // ウィンドウサイズが変わったときに呼ばれる
        p.windowResized = () => {
            const container = document.getElementById('canvasContainer');
            const w = container.offsetWidth - 20;
            const h = Math.max(300, Math.min(500, w * 0.7));
            p.resizeCanvas(w, h); // キャンバスサイズを調整
            
            // 背景を再作成（サイズが変わったため）
            createBackgroundCache();
        };
        
        // 毎フレーム（1秒間に約60回）実行される描画処理
        p.draw = () => {
            // キャッシュした背景を描画（毎回グラデーションを描くより高速）
            p.image(backgroundGraphics, 0, 0);
            
            // マウスの位置で波のパラメータを変化させる
            let frequency = p.map(p.mouseX, 0, p.width, 1, 5); // map: マウスX座標(0~画面幅)を周波数(1~5)に変換
            let amplitude = p.map(p.mouseY, 0, p.height, 20, 100); // map: マウスY座標(0~画面高さ)を振幅(20~100)に変換
            
            // 複数の波を重ねて描画（異なる高さと色で表示）
            drawSineWave(p.height * 0.3, amplitude, frequency, time, 0, 2); // 上段: 赤系
            drawSineWave(p.height * 0.5, amplitude * 0.8, frequency * 1.5, time * 1.2, 120, 2.5); // 中段: 緑系
            drawCosineWave(p.height * 0.7, amplitude * 0.6, frequency * 2, time * 0.8, 240, 3); // 下段: 青系（cos波）
            
            // sin と cos を組み合わせた合成波（半透明で背景に）
            drawCompositeWave(p.height * 0.5, amplitude, frequency, time, 180, 1.5);
            
            // 時間を進めてアニメーション（波が横に流れる）
            time += 0.02;
        };
        
        /**
         * グラデーション背景をキャッシュに作成する関数
         * 
         * 【パフォーマンス最適化】
         * 背景は変化しないので、毎フレーム描画するのは無駄です。
         * p5.jsのcreateGraphics()を使って「オフスクリーンバッファ」に
         * 一度だけ描画し、それを保存しておきます。
         * これにより、描画処理が大幅に軽くなります。
         * 
         * 【オフスクリーンバッファとは】
         * 画面に直接描画するのではなく、メモリ上に別のキャンバスを作って
         * そこに描画する技術です。完成した画像を画面にコピーする方が高速です。
         */
        function createBackgroundCache() {
            // オフスクリーンバッファを作成（画面と同じサイズ）
            backgroundGraphics = p.createGraphics(p.width, p.height);
            backgroundGraphics.colorMode(p.HSB, 360, 100, 100, 100); // カラーモードを設定
            
            // グラデーション背景を描画（1ピクセルずつ線を引く）
            for (let y = 0; y < p.height; y++) {
                let hue = p.map(y, 0, p.height, 200, 260); // map: Y座標(0~画面高さ)を色相(200~260=青→紫)に変換
                let brightness = p.map(y, 0, p.height, 95, 85); // map: Y座標(0~画面高さ)を明度(95~85)に変換
                backgroundGraphics.stroke(hue, 30, brightness); // 線の色を設定
                backgroundGraphics.line(0, y, p.width, y); // 横一本の線を描画
            }
        }
        
        /**
         * 波（sin, cos など）を描画する汎用関数
         * 
         * 【数式】y = yOffset + A × waveFunction(2πfx + φ)
         * - yOffset: 波の中心位置（画面上のどの高さに表示するか）
         * - A: 振幅（波の高さの半分）
         * - f: 周波数（画面内に何個の波を表示するか）
         * - φ: 位相（波の開始位置、時間で変化させるとアニメーションになる）
         * 
         * 【高階関数について】
         * この関数は waveFunction という「関数を引数として受け取る」関数です。
         * これを「高階関数」と言います。p.sin や p.cos を渡すことで、
         * 同じコードで異なる種類の波を描くことができます。
         * コードの重複を減らし、保守性を高める重要なテクニックです。
         * 
         * @param {Function} waveFunction - 波の形を決める三角関数（p.sin や p.cos など）
         * @param {number} yOffset - Y軸の中心位置（波の基準線）
         * @param {number} amplitude - 振幅（波の高さの半分）
         * @param {number} frequency - 周波数（波の数）
         * @param {number} phase - 位相（波の開始位置のズレ）
         * @param {number} hue - 色相（0-360の色）
         * @param {number} weight - 線の太さ
         */
        function drawWave(waveFunction, yOffset, amplitude, frequency, phase, hue, weight) {
            p.noFill(); // 塗りつぶしなし
            p.strokeWeight(weight); // 線の太さを設定
            
            // 滑らかな曲線を描くために点をつなげる
            p.beginShape();
            for (let x = 0; x <= p.width; x += 3) { // 3ピクセルずつ移動
                // 角度を計算: 0から2π×frequency まで変化（2π = 360度 = 1周期）
                let angle = (x / p.width) * p.TWO_PI * frequency + phase;
                // y座標を指定された三角関数で計算
                let y = yOffset + waveFunction(angle) * amplitude;
                
                let brightness = p.map(x, 0, p.width, 60, 90); // map: X座標(0~画面幅)を明度(60~90)に変換
                p.stroke(hue, 70, brightness, 80); // 半透明
                
                p.vertex(x, y); // 点を追加
            }
            p.endShape();
            
            // 波の上に小さな点を描画（波の形が分かりやすくなる）
            for (let x = 0; x <= p.width; x += 20) { // 20ピクセルごとに点を配置
                let angle = (x / p.width) * p.TWO_PI * frequency + phase;
                let y = yOffset + waveFunction(angle) * amplitude;
                
                p.fill(hue, 80, 95, 90); // 点の色
                p.noStroke(); // 点の輪郭なし
                p.circle(x, y, 4); // 直径4ピクセルの円
            }
        }
        
        /**
         * サイン波を描画する関数（drawWaveのラッパー）
         * 
         * 【数式】y = yOffset + A × sin(2πfx + φ)
         * 
         * @param {number} yOffset - Y軸の中心位置
         * @param {number} amplitude - 振幅
         * @param {number} frequency - 周波数
         * @param {number} phase - 位相
         * @param {number} hue - 色相
         * @param {number} weight - 線の太さ
         */
        function drawSineWave(yOffset, amplitude, frequency, phase, hue, weight) {
            drawWave(Math.sin, yOffset, amplitude, frequency, phase, hue, weight);
        }
        
        /**
         * コサイン波を描画する関数（drawWaveのラッパー）
         * 
         * 【数式】y = yOffset + A × cos(2πfx + φ)
         * 
         * cos（コサイン）は sin と似ていますが、90度（π/2）だけズレています。
         * つまり、cos(θ) = sin(θ + π/2) という関係です。
         * sin が 0 から始まるのに対し、cos は最大値（山）から始まります。
         * 
         * @param {number} yOffset - Y軸の中心位置
         * @param {number} amplitude - 振幅
         * @param {number} frequency - 周波数
         * @param {number} phase - 位相
         * @param {number} hue - 色相
         * @param {number} weight - 線の太さ
         */
        function drawCosineWave(yOffset, amplitude, frequency, phase, hue, weight) {
            drawWave(Math.cos, yOffset, amplitude, frequency, phase, hue, weight);
        }
        
        /**
         * 合成波（sin + cos）を描画する関数
         * 
         * 【数式】y = yOffset + (sin(θ) + cos(1.3θ)) × A × 0.4
         * 
         * 複数の波を足し合わせることを「重ね合わせ」と言います。
         * 音楽でいうと、異なる音を同時に鳴らして和音を作るようなものです。
         * この例では、周波数の異なる sin と cos を足して、
         * より複雑で興味深い波の形を作り出しています。
         * 
         * これは「フーリエ変換」という数学の考え方につながります：
         * どんな複雑な波も、単純な sin/cos 波の組み合わせで表現できる！
         * 
         * 【使用している定数の意味】
         * - 1.3: 周波数の比率（整数比ではない値を使うと、規則的すぎない面白いパターンになる）
         * - 0.4: 振幅の調整係数（2つの波を足すと大きくなりすぎるので、0.4倍して他の波と調和させる）
         * 
         * @param {number} yOffset - Y軸の中心位置
         * @param {number} amplitude - 振幅
         * @param {number} frequency - 周波数
         * @param {number} phase - 位相
         * @param {number} hue - 色相
         * @param {number} weight - 線の太さ
         */
        function drawCompositeWave(yOffset, amplitude, frequency, phase, hue, weight) {
            p.noFill();
            p.strokeWeight(weight);
            
            p.beginShape();
            for (let x = 0; x <= p.width; x += 3) {
                let angle = (x / p.width) * p.TWO_PI * frequency + phase;
                // sin(angle) と cos(angle * 1.3) を足し合わせる
                let y = yOffset + (p.sin(angle) + p.cos(angle * 1.3)) * amplitude * 0.4;
                
                let brightness = p.map(x, 0, p.width, 60, 90); // map: X座標(0~画面幅)を明度(60~90)に変換
                p.stroke(hue, 70, brightness, 60); // 少し薄めに表示
                
                p.vertex(x, y);
            }
            p.endShape();
        }
    }
};
