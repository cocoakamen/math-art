// 円のアート作品 - インタラクティブなパターン
const circleArtwork = {
    id: 'circle',
    title: '調和する円',
    description: '数学の基本図形である円。マウスの位置に応じて、美しいパターンが生まれます。円周率 π = 2πr の美しさを体感してください。',
    isDummy: false,
    
    sketch: (p) => {
        p.setup = () => {
            p.createCanvas(700, 500); // キャンバスを作成（幅700px、高さ500px）
            p.colorMode(p.HSB, 360, 100, 100, 100); // HSBカラーモードに設定（色相0-360、彩度0-100、明度0-100、透明度0-100）
        };
        
        p.draw = () => {
            p.background(240, 10, 100); // 背景色を設定（HSB値）
            
            // マウスの位置に基づいた円の数を計算
            let numCircles = p.map(p.mouseX, 0, p.width, 3, 15); // map: 値の範囲を変換（マウスX座標0-700を3-15に変換）
            numCircles = p.floor(numCircles); // floor: 小数点以下を切り捨て
            
            // 円の大きさをマウスY座標で制御
            let maxRadius = p.map(p.mouseY, 0, p.height, 50, 200); // map: マウスY座標0-500を半径50-200に変換
            
            p.translate(p.width / 2, p.height / 2); // translate: 座標系の原点を画面中央に移動
            
            // 複数の円を描画
            for (let i = 0; i < numCircles; i++) {
                let angle = (p.TWO_PI / numCircles) * i; // TWO_PI: 2π（360度）を表す定数
                let x = p.cos(angle) * 150; // cos: コサイン関数で極座標からX座標を計算
                let y = p.sin(angle) * 150; // sin: サイン関数で極座標からY座標を計算
                
                // 色相を角度に基づいて変化
                let hue = (angle / p.TWO_PI) * 360;
                
                p.push(); // push: 現在の座標系と描画設定を保存
                p.translate(x, y); // translate: 座標系を(x, y)の位置に移動
                
                // 円を描画
                p.noFill(); // noFill: 塗りつぶしを無効化
                p.strokeWeight(2); // strokeWeight: 線の太さを2pxに設定
                
                for (let r = 10; r < maxRadius; r += 15) {
                    let alpha = p.map(r, 10, maxRadius, 80, 20); // map: 半径に応じて透明度を変換（外側ほど薄く）
                    p.stroke(hue, 70, 90, alpha); // stroke: 線の色を設定（HSB値）
                    p.circle(0, 0, r * 2); // circle: 円を描画（中心x, y, 直径）
                }
                
                // 中心に小さな円
                p.fill(hue, 80, 95); // fill: 塗りつぶし色を設定
                p.noStroke(); // noStroke: 線を無効化
                p.circle(0, 0, 10); // circle: 直径10pxの円を描画
                
                p.pop(); // pop: 保存していた座標系と描画設定を復元
            }
            
            // 中央の円
            p.fill(200, 60, 95); // fill: 中央の円の色を設定
            p.noStroke(); // noStroke: 線を無効化
            p.circle(0, 0, 30); // circle: 直径30pxの円を中央に描画
        };
    }
};
