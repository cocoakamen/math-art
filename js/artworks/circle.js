// 円のアート作品 - インタラクティブなパターン
const circleArtwork = {
    id: 'circle',
    title: '調和する円',
    description: '数学の基本図形である円。マウスの位置に応じて、美しいパターンが生まれます。円周率 π = 2πr の美しさを体感してください。',
    isDummy: false,
    
    sketch: (p) => {
        p.setup = () => {
            p.createCanvas(700, 500);
            p.colorMode(p.HSB, 360, 100, 100, 100);
        };
        
        p.draw = () => {
            p.background(240, 10, 100);
            
            // マウスの位置に基づいた円の数を計算
            let numCircles = p.map(p.mouseX, 0, p.width, 3, 15);
            numCircles = p.floor(numCircles);
            
            // 円の大きさをマウスY座標で制御
            let maxRadius = p.map(p.mouseY, 0, p.height, 50, 200);
            
            p.translate(p.width / 2, p.height / 2);
            
            // 複数の円を描画
            for (let i = 0; i < numCircles; i++) {
                let angle = (p.TWO_PI / numCircles) * i;
                let x = p.cos(angle) * 150;
                let y = p.sin(angle) * 150;
                
                // 色相を角度に基づいて変化
                let hue = (angle / p.TWO_PI) * 360;
                
                p.push();
                p.translate(x, y);
                
                // 円を描画
                p.noFill();
                p.strokeWeight(2);
                
                for (let r = 10; r < maxRadius; r += 15) {
                    let alpha = p.map(r, 10, maxRadius, 80, 20);
                    p.stroke(hue, 70, 90, alpha);
                    p.circle(0, 0, r * 2);
                }
                
                // 中心に小さな円
                p.fill(hue, 80, 95);
                p.noStroke();
                p.circle(0, 0, 10);
                
                p.pop();
            }
            
            // 中央の円
            p.fill(200, 60, 95);
            p.noStroke();
            p.circle(0, 0, 30);
        };
    }
};
