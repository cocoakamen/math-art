/**
 * リサジュー図形のアート作品
 * 
 * 【リサジュー図形とは】
 * 2つの正弦波（sin波）を直交する方向に組み合わせて描かれる美しい曲線。
 * 1857年にフランスの物理学者ジュール・アントワーヌ・リサジューが発見しました。
 * 
 * 【パラメトリック方程式】
 * x(t) = A × sin(a×t + δ)
 * y(t) = B × sin(b×t)
 * 
 * - A, B: 振幅（図形の大きさ）
 * - a, b: 周波数の比（図形のパターンを決定）
 * - δ: 位相差（図形の形状を変化させる）
 * - t: 時間パラメータ（0から2πまで）
 * 
 * 【周波数比と図形の関係】
 * - a:b = 1:1 → 楕円または円
 * - a:b = 1:2 → 8の字や波型
 * - a:b = 3:2 → 複雑な閉曲線
 * - a:b = 3:4 → さらに複雑な花びら型
 * 
 * 【応用例】
 * - オシロスコープでの信号解析
 * - 音響学や電気工学での周波数解析
 * - レーザーショーやアート表現
 */
const lissajousArtwork = {
    id: 'lissajous',
    title: 'リサジュー図形',
    description: '2つの正弦波の組み合わせで描かれる曲線。x = A·sin(at + δ), y = B·sin(bt) のパラメトリック方程式が生み出す美しい軌跡。',
    isDummy: false,
    
    // p5.jsのsketch関数：pはp5のインスタンス
    sketch: (p) => {
        // グローバル変数：アニメーション全体で使う変数
        let points = []; // 曲線を構成する点の配列
        let t = 0; // 時間パラメータ（0から2πまで増加）
        let a = 3; // x軸方向の周波数
        let b = 4; // y軸方向の周波数
        let delta = 0; // 位相差（0からπまで）
        
        /**
         * setup関数：p5.jsで最初に1回だけ実行される初期化関数
         * キャンバスの作成や初期設定を行う
         */
        p.setup = () => {
            // canvasContainerという要素を取得（getElementById: HTML要素を取得するメソッド）
            const container = document.getElementById('canvasContainer');
            // コンテナの幅を取得（offsetWidth: 要素の横幅をピクセルで取得）
            const w = container.offsetWidth - 20;
            // 高さを幅の70%に設定（最小300px、最大500px）
            const h = Math.max(300, Math.min(500, w * 0.7));
            
            // p.createCanvas(): 指定したサイズの描画領域を作成するp5.jsメソッド
            p.createCanvas(w, h);
            
            // p.colorMode(): 色の指定方法を設定するp5.jsメソッド
            // HSB = 色相(Hue)、彩度(Saturation)、明度(Brightness)
            p.colorMode(p.HSB, 360, 100, 100, 100);
        };
        
        /**
         * windowResized関数：ウィンドウサイズが変更されたときに自動的に呼ばれるp5.js関数
         * レスポンシブデザインのためにキャンバスサイズを調整する
         */
        p.windowResized = () => {
            const container = document.getElementById('canvasContainer');
            const w = container.offsetWidth - 20;
            const h = Math.max(300, Math.min(500, w * 0.7));
            // p.resizeCanvas(): キャンバスのサイズを変更するp5.jsメソッド
            p.resizeCanvas(w, h);
            // リサイズ時に曲線の点をクリア（新しいサイズで再描画）
            points = [];
            t = 0;
        };
        
        /**
         * draw関数：p5.jsで繰り返し実行される描画関数（デフォルトで秒間60回実行）
         * アニメーションのメインループとなる
         */
        p.draw = () => {
            // p.background(): 背景色を設定するp5.jsメソッド
            // HSBモード: (色相200度=青系, 彩度10%, 明度98%) → 薄い青白い背景
            p.background(200, 10, 98);
            
            // 【インタラクティブ機能1】マウスX座標で周波数の比a:bを制御
            // p.map(): 値の範囲を別の範囲に変換するp5.jsメソッド
            // (マウスX座標, 0からキャンバス幅, を1から5の範囲に変換)
            a = Math.floor(p.map(p.mouseX, 0, p.width, 1, 6));
            a = p.constrain(a, 1, 5); // 1～5の範囲に制限
            
            // 【インタラクティブ機能2】マウスY座標でもう一方の周波数bを制御
            b = Math.floor(p.map(p.mouseY, 0, p.height, 1, 6));
            b = p.constrain(b, 1, 5); // 1～5の範囲に制限
            
            // 位相差deltaを自動的にアニメーション（0からπまで徐々に変化）
            delta = p.frameCount * 0.01; // frameCount: 描画回数（0から増加）
            
            // 【リサジュー曲線の計算】
            // 時間パラメータtが2π（一周）に達するまで点を追加
            if (t < p.TWO_PI) {
                // 振幅（図形のサイズ）：キャンバスサイズの35%
                let A = Math.min(p.width, p.height) * 0.35;
                let B = A; // x軸とy軸の振幅を同じに設定
                
                // パラメトリック方程式で座標を計算
                // p.sin(): 正弦（サイン）を計算するp5.jsメソッド
                let x = A * p.sin(a * t + delta); // x座標
                let y = B * p.sin(b * t);          // y座標
                
                // 計算した点を配列に追加（createVector: 2次元ベクトルを作成）
                points.push(p.createVector(x, y));
                
                // 時間を進める（刻み幅0.02: 細かいほど滑らかな曲線になる）
                t += 0.02;
            } else {
                // 一周したらリセット（新しい周波数比で再描画）
                points = [];
                t = 0;
            }
            
            // 【曲線の描画】
            // p.translate(): 座標系の原点を移動するp5.jsメソッド
            // キャンバスの中央を新しい原点(0, 0)に設定
            p.translate(p.width / 2, p.height / 2);
            
            // 曲線の描画
            drawLissajousCurve();
            
            // 元の座標系に戻す（情報表示用）
            p.translate(-p.width / 2, -p.height / 2);
            
            // 画面左上に情報を表示
            displayInfo();
        };
        
        /**
         * リサジュー曲線を描画する関数
         * 配列に格納された点を線で繋いで滑らかな曲線を描画する
         */
        function drawLissajousCurve() {
            // 点が2個以上ないと線が引けないのでチェック
            if (points.length < 2) return;
            
            // p.noFill(): 図形を塗りつぶさない設定
            p.noFill();
            
            // 【グラデーション効果】
            // 曲線の始点から終点にかけて色が変化するように描画
            for (let i = 0; i < points.length - 1; i++) {
                // i番目の点とi+1番目の点の間に線を引く
                let p1 = points[i];     // 現在の点
                let p2 = points[i + 1]; // 次の点
                
                // 進行度合いを計算（0.0～1.0）
                let progress = i / points.length;
                
                // 進行度合いに応じて色相を変化（180度～280度：青～紫系）
                let hue = p.map(progress, 0, 1, 180, 280);
                
                // p.stroke(): 線の色を設定するp5.jsメソッド
                // (色相, 彩度60%, 明度85%, 透明度80%) → パステル調の線
                p.stroke(hue, 60, 85, 80);
                
                // p.strokeWeight(): 線の太さを設定するp5.jsメソッド
                // 進行度合いに応じて太さを変化（1.5～3.5px）
                p.strokeWeight(p.map(progress, 0, 1, 1.5, 3.5));
                
                // p.line(): 2点間に線を引くp5.jsメソッド
                p.line(p1.x, p1.y, p2.x, p2.y);
            }
            
            // 【軌跡の先端に円を描画】
            if (points.length > 0) {
                let lastPoint = points[points.length - 1];
                
                // p.fill(): 図形の塗りつぶし色を設定
                p.fill(280, 70, 90, 90); // 紫系の色
                p.noStroke();
                
                // p.circle(): 円を描画するp5.jsメソッド（x座標, y座標, 直径）
                p.circle(lastPoint.x, lastPoint.y, 8);
            }
        }
        
        /**
         * 現在のパラメータ情報を画面に表示する関数
         * 周波数比と位相差を表示して、数式の理解を助ける
         */
        function displayInfo() {
            // p.fill(): テキストの色を設定（HSBで明度30%の暗いグレー）
            p.fill(0, 0, 30);
            
            // p.noStroke(): テキストに枠線をつけない
            p.noStroke();
            
            // p.textSize(): テキストのサイズをピクセルで設定するp5.jsメソッド
            p.textSize(14);
            
            // p.textAlign(): テキストの配置を設定するp5.jsメソッド
            // (LEFT, TOP) = 左上を基準点にする
            p.textAlign(p.LEFT, p.TOP);
            
            // 周波数比を表示
            // p.text(): テキストを描画するp5.jsメソッド (表示する文字列, x座標, y座標)
            p.text(`周波数比 a:b = ${a}:${b}`, 10, 10);
            
            p.textSize(12);
            
            // 位相差をラジアンと度で表示
            // (delta % Math.PI): 位相差を0～π（0～180度）の範囲に収める
            let deltaRadians = (delta % Math.PI).toFixed(2);
            let deltaDegrees = Math.round((delta % Math.PI) * 180 / Math.PI);
            p.text(`位相差 δ = ${deltaRadians} rad (${deltaDegrees}°)`, 10, 30);
            
            p.text('マウスで周波数比を変更してね✨', 10, 50);
        }
    }
};
