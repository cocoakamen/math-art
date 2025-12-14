// 全作品のリスト
const artworks = [
    circleArtwork,
    spiralArtwork,
    mandelbrotArtwork,
    dummyArtwork3,
    dummyArtwork4,
    dummyArtwork5,
    dummyArtwork6,
    dummyArtwork7,
    dummyArtwork8,
    dummyArtwork9
];

let currentP5Instance = null;
let currentArtworkId = null;
let isCreatingArtwork = false; // 作品作成中フラグ

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', () => {
    initArtworkMenu();
});

// 作品メニューの初期化
function initArtworkMenu() {
    const menuElement = document.getElementById('artworkMenu');
    
    artworks.forEach((artwork, index) => {
        const li = document.createElement('li');
        li.textContent = artwork.title;
        li.dataset.artworkId = artwork.id;
        
        if (artwork.isDummy) {
            li.classList.add('coming-soon');
        }
        
        // スマホでの二重起動を防ぐため、clickイベントのみを使用
        li.addEventListener('click', (e) => {
            e.preventDefault(); // デフォルト動作を防止
            selectArtwork(artwork.id);
        }, { passive: false });
        
        menuElement.appendChild(li);
    });
}

// 作品の選択
function selectArtwork(artworkId) {
    // 作品作成中は処理をスキップ（連続クリック防止）
    if (isCreatingArtwork) {
        return;
    }
    
    const artwork = artworks.find(a => a.id === artworkId);
    if (!artwork) return;
    
    // 現在の作品と同じ場合はスクロールのみ
    if (currentArtworkId === artworkId) {
        scrollToArtwork();
        return;
    }
    
    isCreatingArtwork = true; // フラグを立てる
    currentArtworkId = artworkId;
    
    // メニューのアクティブ状態を更新
    updateMenuActiveState(artworkId);
    
    // 作品情報を更新
    updateArtworkInfo(artwork);
    
    // p5.jsインスタンスを再作成
    recreateP5Instance(artwork);
    
    // フラグを下ろす（少し遅延を入れて確実に）
    setTimeout(() => {
        isCreatingArtwork = false;
    }, 500);
    
    // スマホ画面でキャンバスまでスクロール
    scrollToArtwork();
    
    // 戻るボタンを表示
    showBackToMenuButton();
}

// メニューのアクティブ状態を更新
function updateMenuActiveState(artworkId) {
    const menuItems = document.querySelectorAll('#artworkMenu li');
    menuItems.forEach(item => {
        if (item.dataset.artworkId === artworkId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 作品情報の更新
function updateArtworkInfo(artwork) {
    document.getElementById('artworkTitle').textContent = artwork.title;
    document.getElementById('artworkDescription').textContent = artwork.description;
}

// p5.jsインスタンスの再作成
function recreateP5Instance(artwork) {
    // 既存のインスタンスを削除
    if (currentP5Instance) {
        currentP5Instance.remove();
        currentP5Instance = null;
    }
    
    // キャンバスコンテナをクリア
    const container = document.getElementById('canvasContainer');
    container.innerHTML = '';
    
    // 新しいp5.jsインスタンスを作成
    currentP5Instance = new p5(artwork.sketch, 'canvasContainer');
}

// スマホ画面で作品表示エリアまでスクロール
function scrollToArtwork() {
    // 768px以下（タブレット・スマホ）の場合のみスクロール
    if (window.innerWidth <= 768) {
        const canvasContainer = document.getElementById('canvasContainer');
        if (canvasContainer) {
            // キャンバスが完全に見えるように、少し余裕を持ってスクロール
            setTimeout(() => {
                canvasContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center'  // 'start'から'center'に変更
                });
            }, 100); // キャンバス生成を待つ
        }
    }
}

// メニューまでスクロール
function scrollToMenu() {
    const artworkList = document.querySelector('.artwork-list');
    if (artworkList) {
        artworkList.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// 戻るボタンの表示
function showBackToMenuButton() {
    if (window.innerWidth <= 768) {
        const backBtn = document.getElementById('backToMenuBtn');
        if (backBtn) {
            backBtn.style.display = 'block';
            // イベントリスナーが重複しないように一度削除してから追加
            backBtn.onclick = scrollToMenu;
        }
    }
}
