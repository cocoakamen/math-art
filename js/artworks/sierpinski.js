/**
 * シェルピンスキーの三角形のアート作品
 * 
 * 【フラクタル図形とは】
 * フラクタル（fractal）は、部分と全体が自己相似的な構造を持つ図形です。
 * どんなに拡大しても同じようなパターンが繰り返される特徴があります。
 * 
 * 【シェルピンスキーの三角形の作り方】
 * 1. 正三角形から始める
 * 2. 各辺の中点を結んで、4つの小さな三角形に分割する
 * 3. 中央の三角形を取り除く（残り3つの三角形）
 * 4. 残った3つの三角形それぞれに対して、手順2-3を繰り返す
 * 
 * 【数学的性質】
 * - 再帰の深さがnのとき、三角形の数は 3^n 個になる
 * - 理論上、無限に繰り返すと面積は0になるが、周の長さは無限大になる
 * - フラクタル次元（ハウスドルフ次元）は log(3)/log(2) ≈ 1.585
 */
const sierpinskiArtwork = {
    id: 'sierpinski',
    title: 'シェルピンスキーの三角形',
    description: 'フラクタル図形の代表例。大きな正三角形から中央の三角形を取り除き、残った3つの三角形に対して同じ操作を繰り返します。再帰的な美しさが特徴です。',
    isDummy: false,
    
    // p5.jsのsketch関数：pはp5のインスタンス
    sketch: (p) => {
        // グローバル変数：アニメーション全体で使う変数
        let depth = 5; // 再帰の深さ（初期値5）
        let colorOffset = 0; // 色のアニメーション用のオフセット値
        
        /**
         * setup関数：p5.jsで最初に1回だけ実行される初期化関数
         * キャンバスの作成や初期設定を行う
         */
        p.setup = () => {
            // canvasContainerという要素を取得（getElementById: HTML要素を取得するメソッド）
            const container = document.getElementById('canvasContainer');
            // コンテナの幅を取得（offsetWidth: 要素の横幅をピクセルで取得）
            const w = container.offsetWidth - 20; // パディング分を引く
            // 高さを幅の70%に設定（最小300px、最大500px）
            const h = Math.max(300, Math.min(500, w * 0.7));
            
            // p.createCanvas(): 指定したサイズの描画領域を作成するp5.jsメソッド
            p.createCanvas(w, h);
            
            // p.colorMode(): 色の指定方法を設定するp5.jsメソッド
            // HSB = 色相(Hue)、彩度(Saturation)、明度(Brightness)
            // (360, 100, 100, 100) = 色相0-360度、彩度0-100%、明度0-100%、透明度0-100%
            p.colorMode(p.HSB, 360, 100, 100, 100);
            
            // p.angleMode(): 角度の単位を設定するp5.jsメソッド（DEGREES=度、RADIANS=ラジアン）
            p.angleMode(p.DEGREES);
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
        };
        
        /**
         * draw関数：p5.jsで繰り返し実行される描画関数（デフォルトで秒間60回実行）
         * アニメーションのメインループとなる
         */
        p.draw = () => {
            // p.background(): 背景色を設定するp5.jsメソッド（毎フレーム画面をクリア）
            // HSBモード: (色相45度=黄色系, 彩度8%, 明度98%) → 薄いクリーム色
            p.background(45, 8, 98);
            
            // 【インタラクティブ機能1】マウスX座標で再帰の深さを制御
            // Math.floor(): 小数点以下を切り捨てて整数にする
            // p.map(): 値の範囲を別の範囲に変換するp5.jsメソッド
            // (マウスX座標, 0からキャンバス幅, を1から7の範囲に変換)
            depth = Math.floor(p.map(p.mouseX, 0, p.width, 1, 8));
            // p.constrain(): 値を指定範囲内に制限するp5.jsメソッド
            depth = p.constrain(depth, 1, 7); // 念のため1～7の範囲に制限
            
            // 【インタラクティブ機能2】マウスY座標で色相を制御
            // 150～320度の色相範囲（緑→青→紫系のパステルカラー）
            let hueBase = p.map(p.mouseY, 0, p.height, 150, 320);
            
            // 色のアニメーション：毎フレーム0.5度ずつ色相をずらす
            colorOffset += 0.5;
            
            // 【正三角形の頂点座標を計算】
            // キャンバスの80%のサイズで三角形を描画
            let size = Math.min(p.width, p.height) * 0.8; // 一辺の長さ
            
            // 正三角形の高さ = 一辺 × √3/2（三平方の定理より）
            // Math.sqrt(): 平方根を計算（√3 ≈ 1.732）
            let h_triangle = size * Math.sqrt(3) / 2;
            
            // 頂点1 (x1, y1): 上の頂点（中央上部）
            let x1 = p.width / 2; // キャンバスの中央
            let y1 = (p.height - h_triangle) / 2; // 上下中央に配置
            
            // 頂点2 (x2, y2): 左下の頂点
            let x2 = x1 - size / 2; // 中央から左に一辺の半分
            let y2 = y1 + h_triangle; // 上頂点から高さ分下
            
            // 頂点3 (x3, y3): 右下の頂点
            let x3 = x1 + size / 2; // 中央から右に一辺の半分
            let y3 = y1 + h_triangle; // 上頂点から高さ分下
            
            // シェルピンスキーの三角形を再帰的に描画
            drawSierpinski(x1, y1, x2, y2, x3, y3, depth, hueBase);
            
            // 画面左上に情報を表示
            displayInfo(depth);
        };
        
        /**
         * シェルピンスキーの三角形を再帰的に描画する関数
         * 
         * 【再帰とは】
         * 関数が自分自身を呼び出すプログラミング技法。
         * フラクタル図形のような自己相似的な構造の描画に適している。
         * 
         * 【アルゴリズム】
         * - 基底ケース (d === 0): 再帰を終了し、三角形を1つ描画
         * - 再帰ケース (d > 0): 
         *   1. 各辺の中点を計算
         *   2. 3つの小さな三角形に分割
         *   3. それぞれに対して関数を再帰呼び出し（深さを1減らす）
         * 
         * @param {number} x1, y1 - 頂点1の座標（上の頂点）
         * @param {number} x2, y2 - 頂点2の座標（左下の頂点）
         * @param {number} x3, y3 - 頂点3の座標（右下の頂点）
         * @param {number} d - 再帰の深さ（0になるまで分割を繰り返す）
         * @param {number} hue - 色相の基準値（0-360度）
         */
        function drawSierpinski(x1, y1, x2, y2, x3, y3, d, hue) {
            // 【基底ケース】再帰の終了条件：深さが0になったら三角形を描画
            if (d === 0) {
                // 色相にアニメーションオフセットを加算（% 360で0-360度の範囲に収める）
                let currentHue = (hue + colorOffset) % 360;
                
                // p.fill(): 図形の塗りつぶし色を設定するp5.jsメソッド
                // (色相, 彩度35%, 明度95%, 透明度85%) → パステルカラー
                p.fill(currentHue, 35, 95, 85);
                
                // p.noStroke(): 図形の枠線を描画しないp5.jsメソッド
                p.noStroke();
                
                // p.triangle(): 三角形を描画するp5.jsメソッド
                // 引数は(x1, y1, x2, y2, x3, y3)の順で3つの頂点座標
                p.triangle(x1, y1, x2, y2, x3, y3);
                
                // 枠線を追加（やわらかい色で輪郭を強調）
                // p.stroke(): 図形の枠線の色を設定するp5.jsメソッド
                p.stroke(currentHue, 25, 80, 25);
                
                // p.strokeWeight(): 枠線の太さを設定するp5.jsメソッド
                p.strokeWeight(0.5);
                
                // p.noFill(): 図形を塗りつぶさない設定（枠線だけ描画）
                p.noFill();
                p.triangle(x1, y1, x2, y2, x3, y3);
            } else {
                // 【再帰ケース】三角形をさらに分割して再帰呼び出し
                
                // 各辺の中点を計算（2点の座標の平均 = 中点の座標）
                // 辺1-2の中点
                let mx1 = (x1 + x2) / 2;
                let my1 = (y1 + y2) / 2;
                
                // 辺2-3の中点
                let mx2 = (x2 + x3) / 2;
                let my2 = (y2 + y3) / 2;
                
                // 辺3-1の中点
                let mx3 = (x3 + x1) / 2;
                let my3 = (y3 + y1) / 2;
                
                // 色相を20度ずらす（階層ごとに色を変化させる）
                let newHue = (hue + 20) % 360;
                
                // 3つの小さな三角形を再帰的に描画
                // 三角形1: 上の小三角形（頂点1と2つの中点）
                drawSierpinski(x1, y1, mx1, my1, mx3, my3, d - 1, newHue);
                
                // 三角形2: 左下の小三角形（頂点2と2つの中点）
                drawSierpinski(mx1, my1, x2, y2, mx2, my2, d - 1, newHue);
                
                // 三角形3: 右下の小三角形（頂点3と2つの中点）
                drawSierpinski(mx3, my3, mx2, my2, x3, y3, d - 1, newHue);
                
                // 注: 中央の三角形(mx1, my1, mx2, my2, mx3, my3)は描画しない
                // これがシェルピンスキーの三角形の特徴的な「穴」を作る
            }
        }
        
        /**
         * 現在の深さ情報を画面に表示する関数
         * 
         * 【指数関数的増加】
         * 三角形の数 = 3^d
         * - 深さ1: 3個
         * - 深さ2: 9個
         * - 深さ3: 27個
         * - 深さ7: 2187個
         * 
         * @param {number} d - 現在の再帰の深さ
         */
        function displayInfo(d) {
            // p.fill(): テキストの色を設定（HSBで明度40%のグレー）
            p.fill(0, 0, 40);
            
            // p.noStroke(): テキストに枠線をつけない
            p.noStroke();
            
            // p.textSize(): テキストのサイズをピクセルで設定するp5.jsメソッド
            p.textSize(14);
            
            // p.textAlign(): テキストの配置を設定するp5.jsメソッド
            // (LEFT, TOP) = 左上を基準点にする
            p.textAlign(p.LEFT, p.TOP);
            
            // p.text(): テキストを描画するp5.jsメソッド
            // (表示する文字列, x座標, y座標)
            p.text(`再帰の深さ: ${d}`, 10, 10);
            
            p.textSize(12);
            
            // Math.pow(3, d): 3のd乗を計算（3^d）
            // 例: d=5なら 3^5 = 243個の三角形
            p.text(`三角形の数: ${Math.pow(3, d)}個`, 10, 30);
            
            p.text('マウスを動かして調整してね✨', 10, 50);
        }
    }
};
