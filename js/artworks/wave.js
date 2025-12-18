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
        
        p.setup = () => {
            // 最初に一度だけ実行される初期設定
            const container = document.getElementById('canvasContainer');
            const w = container.offsetWidth - 20; // 左右のパディングを考慮
            const h = Math.max(300, Math.min(500, w * 0.7)); // 高さを計算
            p.createCanvas(w, h); // キャンバスを作成
            p.colorMode(p.HSB, 360, 100, 100, 100); // HSBカラーモード（色相、彩度、明度）
        };
        
        // ウィンドウサイズが変わったときに呼ばれる
        p.windowResized = () => {
            const container = document.getElementById('canvasContainer');
            const w = container.offsetWidth - 20;
            const h = Math.max(300, Math.min(500, w * 0.7));
            p.resizeCanvas(w, h); // キャンバスサイズを調整
        };
        
        // 毎フレーム（1秒間に約60回）実行される描画処理
        p.draw = () => {
            // 背景にグラデーションを描画
            drawGradientBackground();
            
            // マウスの位置で波のパラメータを変化させる
            // p.map() は値の範囲を変換する便利な関数
            let frequency = p.map(p.mouseX, 0, p.width, 1, 5); // 周波数: マウス左で1波、右で5波
            let amplitude = p.map(p.mouseY, 0, p.height, 20, 100); // 振幅: マウス上で小さく、下で大きく
            
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
         * グラデーション背景を描画する関数
         * 
         * 1ピクセルずつ線を引いて、上から下へ色が変化する背景を作ります。
         */
        function drawGradientBackground() {
            for (let y = 0; y < p.height; y++) {
                // 上から下へ色相を変化（青→紫系）
                let hue = p.map(y, 0, p.height, 200, 260);
                let brightness = p.map(y, 0, p.height, 95, 85);
                p.stroke(hue, 30, brightness); // 線の色を設定
                p.line(0, y, p.width, y); // 横一本の線を描画
            }
        }
        
        /**
         * サイン波（sin波）を描画する関数
         * 
         * 【数式】y = yOffset + A × sin(2πfx + φ)
         * - yOffset: 波の中心位置（画面上のどの高さに表示するか）
         * - A: 振幅（波の高さの半分）
         * - f: 周波数（画面内に何個の波を表示するか）
         * - φ: 位相（波の開始位置、時間で変化させるとアニメーションになる）
         * 
         * @param {number} yOffset - Y軸の中心位置（波の基準線）
         * @param {number} amplitude - 振幅（波の高さの半分）
         * @param {number} frequency - 周波数（波の数）
         * @param {number} phase - 位相（波の開始位置のズレ）
         * @param {number} hue - 色相（0-360の色）
         * @param {number} weight - 線の太さ
         */
        function drawSineWave(yOffset, amplitude, frequency, phase, hue, weight) {
            p.noFill(); // 塗りつぶしなし
            p.strokeWeight(weight); // 線の太さを設定
            
            // 滑らかな曲線を描くために点をつなげる
            p.beginShape();
            for (let x = 0; x <= p.width; x += 3) { // 3ピクセルずつ移動
                // 角度を計算: 0から2π×frequency まで変化（2π = 360度 = 1周期）
                let angle = (x / p.width) * p.TWO_PI * frequency + phase;
                // y座標をsin関数で計算
                let y = yOffset + p.sin(angle) * amplitude;
                
                // 波の位置に応じて明るさを変化させる
                let brightness = p.map(x, 0, p.width, 60, 90);
                p.stroke(hue, 70, brightness, 80); // 半透明
                
                p.vertex(x, y); // 点を追加
            }
            p.endShape();
            
            // 波の上に小さな点を描画（波の形が分かりやすくなる）
            for (let x = 0; x <= p.width; x += 20) { // 20ピクセルごとに点を配置
                let angle = (x / p.width) * p.TWO_PI * frequency + phase;
                let y = yOffset + p.sin(angle) * amplitude;
                
                p.fill(hue, 80, 95, 90); // 点の色
                p.noStroke(); // 点の輪郭なし
                p.circle(x, y, 4); // 直径4ピクセルの円
            }
        }
        
        /**
         * コサイン波（cos波）を描画する関数
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
            p.noFill();
            p.strokeWeight(weight);
            
            p.beginShape();
            for (let x = 0; x <= p.width; x += 3) {
                let angle = (x / p.width) * p.TWO_PI * frequency + phase;
                let y = yOffset + p.cos(angle) * amplitude; // sin の代わりに cos を使用
                
                let brightness = p.map(x, 0, p.width, 60, 90);
                p.stroke(hue, 70, brightness, 80);
                
                p.vertex(x, y);
            }
            p.endShape();
            
            // 波の上に点を描画
            for (let x = 0; x <= p.width; x += 20) {
                let angle = (x / p.width) * p.TWO_PI * frequency + phase;
                let y = yOffset + p.cos(angle) * amplitude;
                
                p.fill(hue, 80, 95, 90);
                p.noStroke();
                p.circle(x, y, 4);
            }
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
                // 1.3倍することで、少し周波数をずらして面白い模様を作る
                let y = yOffset + (p.sin(angle) + p.cos(angle * 1.3)) * amplitude * 0.4;
                
                let brightness = p.map(x, 0, p.width, 60, 90);
                p.stroke(hue, 70, brightness, 60); // 少し薄めに表示
                
                p.vertex(x, y);
            }
            p.endShape();
        }
    }
};
