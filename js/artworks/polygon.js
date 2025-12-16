// 正多角形の変容 - 時間とともに形が変化するアート
const polygonArtwork = {
    id: 'polygon',
    title: '正多角形の変容',
    description: '正三角形から正多角形へと滑らかに変化していく美しい図形。頂点数が時間とともに変化し、マウスの位置で回転速度と色が変わります。数学的な対称性の美を体感してください。',
    isDummy: false,
    
    sketch: (p) => {
        let time = 0; // アニメーション用の時間変数
        
        p.setup = () => {
            // コンテナのサイズに合わせてキャンバスを作成
            const container = document.getElementById('canvasContainer');
            const w = container.offsetWidth - 20; // パディング分を考慮
            const h = Math.max(300, Math.min(500, w * 0.7)); // 高さは幅の70%（最小300、最大500）
            p.createCanvas(w, h);
            p.colorMode(p.HSB, 360, 100, 100, 100); // HSBカラーモードに設定
        };
        
        // ウィンドウリサイズ時の対応
        p.windowResized = () => {
            const container = document.getElementById('canvasContainer');
            const w = container.offsetWidth - 20;
            const h = Math.max(300, Math.min(500, w * 0.7));
            p.resizeCanvas(w, h);
        };
        
        p.draw = () => {
            p.background(0, 0, 95); // 背景色を設定（明るいパステル調）
            
            // 時間を進める
            time += 0.01;
            
            // マウスの位置で回転速度を制御
            let rotationSpeed = p.map(p.mouseX, 0, p.width, 0.005, 0.05); // map: 値の範囲を変換
            let rotation = time * rotationSpeed;
            
            // マウスのY位置で色相を制御
            let baseHue = p.map(p.mouseY, 0, p.height, 0, 360);
            
            // 画面中央に座標系を移動
            p.translate(p.width / 2, p.height / 2);
            
            // 頂点数を時間で変化（3から12まで周期的に変化）
            let numSides = 3 + (p.sin(time * 0.5) + 1) * 4.5; // sin: 3から12まで変化
            
            // 複数のレイヤーで描画（奥行き感を出す）
            for (let layer = 5; layer >= 1; layer--) {
                p.push();
                
                // レイヤーごとに回転と色を変化
                let layerRotation = rotation * layer * 0.2;
                p.rotate(layerRotation);
                
                // 色相をレイヤーごとに変化
                let hue = (baseHue + layer * 30) % 360;
                let alpha = p.map(layer, 1, 5, 100, 30); // map: レイヤーが奥ほど透明に
                
                // 半径をレイヤーごとに変化
                let radius = p.map(layer, 1, 5, 50, 150);
                
                // 正多角形を描画
                drawPolygon(p, numSides + layer * 0.5, radius, hue, alpha);
                
                p.pop();
            }
            
            // 中央に小さな装飾的な多角形
            p.push();
            p.rotate(-rotation * 2);
            let centerHue = (baseHue + 180) % 360;
            drawPolygon(p, numSides, 30, centerHue, 100);
            p.pop();
        };
        
        // 正多角形を描画する関数
        function drawPolygon(p, sides, radius, hue, alpha) {
            // sides: 頂点数（小数点OK）、radius: 半径、hue: 色相、alpha: 透明度
            
            // パステルトーンの設定（彩度を低く、明度を高く）
            p.fill(hue, 35, 95, alpha);
            p.stroke(hue, 50, 85, alpha);
            p.strokeWeight(1.5);
            
            // 多角形の描画開始
            p.beginShape();
            
            // 頂点を計算して配置（小数点の頂点数でも滑らかに補間）
            let wholeSides = p.floor(sides); // floor: 整数部分
            let fractional = sides - wholeSides; // 小数部分
            
            // 整数部分の頂点を描画
            for (let i = 0; i <= wholeSides; i++) {
                let angle = (p.TWO_PI / sides) * i - p.HALF_PI; // HALF_PI: π/2（90度）
                let x = p.cos(angle) * radius; // cos: X座標を計算
                let y = p.sin(angle) * radius; // sin: Y座標を計算
                p.vertex(x, y);
            }
            
            // 小数部分がある場合は補間した頂点を追加
            if (fractional > 0.01) {
                let angle = (p.TWO_PI / sides) * (wholeSides + 1) - p.HALF_PI;
                let x = p.cos(angle) * radius * fractional; // 小数部分に応じて補間
                let y = p.sin(angle) * radius * fractional;
                p.vertex(x, y);
            }
            
            p.endShape(p.CLOSE); // CLOSE: 最初の頂点まで線を閉じる
        }
    }
};
