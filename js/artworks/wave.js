// 三角関数の波のアート作品
const waveArtwork = {
    id: 'wave',
    title: '三角関数の波',
    description: 'sin と cos が織りなす美しい波のパターン。マウスを動かして波の形や周波数を変えて遊んでみてください✨',
    isDummy: false,
    
    sketch: (p) => {
        let time = 0;
        
        p.setup = () => {
            // コンテナのサイズに合わせてキャンバスを作成
            const container = document.getElementById('canvasContainer');
            const w = container.offsetWidth - 20;
            const h = Math.max(300, Math.min(500, w * 0.7));
            p.createCanvas(w, h);
            p.colorMode(p.HSB, 360, 100, 100, 100);
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
            drawGradientBackground();
            
            // マウスの位置で波のパラメータを制御
            let frequency = p.map(p.mouseX, 0, p.width, 1, 5); // 周波数
            let amplitude = p.map(p.mouseY, 0, p.height, 20, 100); // 振幅
            
            // 複数の波を描画
            drawSineWave(p.height * 0.3, amplitude, frequency, time, 0, 2);
            drawSineWave(p.height * 0.5, amplitude * 0.8, frequency * 1.5, time * 1.2, 120, 2.5);
            drawCosineWave(p.height * 0.7, amplitude * 0.6, frequency * 2, time * 0.8, 240, 3);
            
            // 合成波（sin + cos）
            drawCompositeWave(p.height * 0.5, amplitude, frequency, time, 180, 1.5);
            
            // 時間を進める
            time += 0.02;
        };
        
        /**
         * グラデーション背景を描画
         */
        function drawGradientBackground() {
            for (let y = 0; y < p.height; y++) {
                let hue = p.map(y, 0, p.height, 200, 260);
                let brightness = p.map(y, 0, p.height, 95, 85);
                p.stroke(hue, 30, brightness);
                p.line(0, y, p.width, y);
            }
        }
        
        /**
         * サイン波を描画
         * @param {number} yOffset - Y軸のオフセット
         * @param {number} amplitude - 振幅
         * @param {number} frequency - 周波数
         * @param {number} phase - 位相
         * @param {number} hue - 色相
         * @param {number} weight - 線の太さ
         */
        function drawSineWave(yOffset, amplitude, frequency, phase, hue, weight) {
            p.noFill();
            p.strokeWeight(weight);
            
            p.beginShape();
            for (let x = 0; x <= p.width; x += 3) {
                let angle = (x / p.width) * p.TWO_PI * frequency + phase;
                let y = yOffset + p.sin(angle) * amplitude;
                
                // 波の位置に応じて色を変化
                let brightness = p.map(x, 0, p.width, 60, 90);
                p.stroke(hue, 70, brightness, 80);
                
                p.vertex(x, y);
            }
            p.endShape();
            
            // 波の点を描画
            for (let x = 0; x <= p.width; x += 20) {
                let angle = (x / p.width) * p.TWO_PI * frequency + phase;
                let y = yOffset + p.sin(angle) * amplitude;
                
                p.fill(hue, 80, 95, 90);
                p.noStroke();
                p.circle(x, y, 4);
            }
        }
        
        /**
         * コサイン波を描画
         * @param {number} yOffset - Y軸のオフセット
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
                let y = yOffset + p.cos(angle) * amplitude;
                
                let brightness = p.map(x, 0, p.width, 60, 90);
                p.stroke(hue, 70, brightness, 80);
                
                p.vertex(x, y);
            }
            p.endShape();
            
            // 波の点を描画
            for (let x = 0; x <= p.width; x += 20) {
                let angle = (x / p.width) * p.TWO_PI * frequency + phase;
                let y = yOffset + p.cos(angle) * amplitude;
                
                p.fill(hue, 80, 95, 90);
                p.noStroke();
                p.circle(x, y, 4);
            }
        }
        
        /**
         * 合成波（sin + cos）を描画
         * @param {number} yOffset - Y軸のオフセット
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
                // sin と cos を合成
                let y = yOffset + (p.sin(angle) + p.cos(angle * 1.3)) * amplitude * 0.4;
                
                let brightness = p.map(x, 0, p.width, 60, 90);
                p.stroke(hue, 70, brightness, 60);
                
                p.vertex(x, y);
            }
            p.endShape();
        }
    }
};
