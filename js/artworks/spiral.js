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
            p.angleMode(p.DEGREES); // 角度をdegreeモードに設定
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
            let spiralDensity = p.map(p.mouseX, 0, p.width, 1, 5); // 螺旋の密度
            let maxRadius = p.map(p.mouseY, 0, p.height, 100, 250); // 最大半径
            
            // フィボナッチ螺旋を描画
            drawFibonacciSpiral(maxRadius, spiralDensity);
            
            // 黄金角（約137.5度）で配置された点を描画
            drawGoldenAnglePoints(maxRadius);
            
            angle += 0.5; // アニメーション用の角度を更新
        };
        
        // フィボナッチ螺旋を描画する関数
        function drawFibonacciSpiral(maxRadius, density) {
            p.noFill();
            p.strokeWeight(2);
            
            // 螺旋を複数描画してパターンを作成
            for (let offset = 0; offset < 360; offset += 360 / 6) {
                p.beginShape();
                
                for (let theta = 0; theta < 720; theta += density) {
                    // 対数螺旋: r = a * e^(b*θ)
                    // フィボナッチ螺旋では b = log(φ) / 90° を使用
                    let rad = theta * p.PI / 180;
                    let r = (maxRadius / 10) * p.pow(goldenRatio, rad / (p.PI / 2));
                    
                    if (r > maxRadius) break;
                    
                    let x = r * p.cos(theta + offset + angle);
                    let y = r * p.sin(theta + offset + angle);
                    
                    // 色相を半径に基づいて変化
                    let hue = (r / maxRadius) * 180 + 180;
                    p.stroke(hue, 80, 90, 70);
                    
                    p.vertex(x, y);
                }
                
                p.endShape();
            }
        }
        
        // 黄金角で配置された点を描画する関数
        function drawGoldenAnglePoints(maxRadius) {
            let goldenAngle = 360 / (goldenRatio * goldenRatio); // 黄金角 ≈ 137.5°
            
            p.noStroke();
            
            // 中心から外側に向かって点を配置
            for (let i = 0; i < 200; i++) {
                let theta = i * goldenAngle + angle;
                let r = p.sqrt(i) * (maxRadius / 15);
                
                if (r > maxRadius) break;
                
                let x = r * p.cos(theta);
                let y = r * p.sin(theta);
                
                // 色相を角度に基づいて変化
                let hue = (theta % 360);
                let size = p.map(r, 0, maxRadius, 3, 1);
                
                p.fill(hue, 90, 100, 80);
                p.circle(x, y, size);
            }
        }
    }
};
