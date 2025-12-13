// フィボナッチ螺旋のアート作品
const spiralArtwork = {
    id: 'spiral',
    title: 'フィボナッチ螺旋',
    description: 'フィボナッチ数列に基づいた美しい螺旋パターン。黄金比 φ = (1+√5)/2 ≈ 1.618 が織りなす自然の調和を表現します。',
    isDummy: false,
    
    sketch: (p) => {
        let angle = 0;
        let goldenRatio = (1 + p.sqrt(5)) / 2; // 黄金比 φ ≈ 1.618
        
        p.setup = () => {
            // コンテナのサイズに合わせてキャンバスを作成
            const container = document.getElementById('canvasContainer');
            const w = container.offsetWidth - 20; // パディング分を考慮
            const h = Math.max(300, Math.min(500, w * 0.7)); // 高さは幅の70%（最小300、最大500）
            p.createCanvas(w, h);
            p.colorMode(p.HSB, 360, 100, 100, 100); // HSBカラーモードに設定
            p.angleMode(p.RADIANS); // 角度をradianモードに設定
        };
        
        // ウィンドウリサイズ時の対応
        p.windowResized = () => {
            const container = document.getElementById('canvasContainer');
            const w = container.offsetWidth - 20;
            const h = Math.max(300, Math.min(500, w * 0.7));
            p.resizeCanvas(w, h);
        };
        
        p.draw = () => {
            p.background(230, 20, 95); // 背景色（薄い紫系）
            p.translate(p.width / 2, p.height / 2); // 座標系の原点を画面中央に移動
            
            // マウスの位置で螺旋の密度とサイズを制御
            let spiralDensity = p.map(p.mouseX, 0, p.width, 0.05, 0.2); // 螺旋の密度（radian単位、大きいほど粗い）
            let maxRadius = p.map(p.mouseY, 0, p.height, 100, 250); // 最大半径
            
            // フィボナッチ螺旋を描画
            drawFibonacciSpiral(maxRadius, spiralDensity);
            
            // 黄金角（約137.5度）で配置された点を描画
            drawGoldenAnglePoints(maxRadius);
            
            angle += 0.01; // アニメーション用の角度を更新（radian単位）
        };
        
        /**
         * フィボナッチ螺旋を描画する関数
         * 
         * 【数学的な説明】
         * フィボナッチ螺旋は、自然界でよく見られる美しいパターンです。
         * 貝殻の渦巻きや植物の葉の配置などに現れます。
         * 
         * 対数螺旋の一般式は r = a × e^(bθ) ですが、
         * フィボナッチ螺旋（黄金螺旋）では黄金比φを使った形で表現します：
         *   r = a × φ^(θ / (π/2))
         * 
         * ここで：
         *   r = 中心からの距離（半径）
         *   θ = 角度（radians）
         *   φ = 黄金比（約1.618）
         *   a = 初期サイズの係数
         * 
         * ※ φ^x = e^(x ln(φ)) なので、これも対数螺旋の一種です。
         * 
         * 角度が増えると、半径が黄金比の累乗で大きくなっていくため、
         * 美しい螺旋状のカーブが描かれます。
         * 
         * @param {number} maxRadius - 螺旋の最大半径（マウスのY座標で変化）
         * @param {number} density - 螺旋の密度（radian単位、値が小さいほど密）
         */
        function drawFibonacciSpiral(maxRadius, density) {
            p.noFill(); // 図形の塗りつぶしをなしに設定
            p.strokeWeight(2); // 線の太さを2pxに設定
            
            // 螺旋を6本描画して、花びらのようなパターンを作成
            // offsetでπ/3ずつ（60度）回転させた位置に配置
            for (let offset = 0; offset < p.TWO_PI; offset += p.TWO_PI / 6) {
                p.beginShape(); // 連続した点を線で結ぶ図形の描画を開始
                
                // 角度0から4π（2回転分）まで螺旋を描画
                // densityの値で点の間隔が変わる（小さいほど滑らかな螺旋になる）
                for (let theta = 0; theta < p.TWO_PI * 2; theta += density) {
                    // 数学的計算: 対数螺旋の公式 r = a × φ^(θ / (π/2))
                    // thetaはすでにradian単位なので変換不要
                    
                    // 黄金比の累乗で半径を計算
                    // maxRadius/10 は初期サイズ、goldenRatioを累乗して成長させる
                    let r = (maxRadius / 10) * p.pow(goldenRatio, theta / (p.PI / 2));
                    
                    // 半径が最大値を超えたら、この螺旋の描画を終了
                    if (r > maxRadius) break;
                    
                    // 極座標(r, θ)をデカルト座標(x, y)に変換
                    // offset: 螺旋の回転位置、angle: アニメーション用の回転
                    let x = r * p.cos(theta + offset + angle);
                    let y = r * p.sin(theta + offset + angle);
                    
                    // 色相を半径に基づいて変化（外側ほど色が変わる）
                    // 180〜360の範囲で色相が変化（青紫〜赤紫のグラデーション）
                    let hue = (r / maxRadius) * 180 + 180;
                    p.stroke(hue, 80, 90, 70); // 線の色を設定（色相, 彩度, 明度, 透明度）- HSBカラーモード
                    
                    p.vertex(x, y); // 計算した座標に頂点を追加（これらの点が線で結ばれる）
                }
                
                p.endShape(); // 図形の描画を終了
            }
        }
        
        // 黄金角で配置された点を描画する関数
        function drawGoldenAnglePoints(maxRadius) {
            let goldenAngle = p.TWO_PI / (goldenRatio * goldenRatio); // 黄金角 ≈ 2.4 radian（≈ 137.5°）
            
            p.noStroke();
            
            // 中心から外側に向かって点を配置
            for (let i = 0; i < 200; i++) {
                let theta = i * goldenAngle + angle;
                let r = p.sqrt(i) * (maxRadius / 15);
                
                if (r > maxRadius) break;
                
                let x = r * p.cos(theta);
                let y = r * p.sin(theta);
                
                // 色相を角度に基づいて変化（radianを度数に変換して色相値に使用）
                let hue = (theta % p.TWO_PI) * 360 / p.TWO_PI;
                let size = p.map(r, 0, maxRadius, 3, 1);
                
                p.fill(hue, 90, 100, 80);
                p.circle(x, y, size);
            }
        }
    }
};
