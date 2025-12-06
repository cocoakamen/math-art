// 全作品のリスト
const artworks = [
    circleArtwork,
    dummyArtwork1,
    dummyArtwork2,
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
        
        li.addEventListener('click', () => {
            selectArtwork(artwork.id);
        });
        
        menuElement.appendChild(li);
    });
}

// 作品の選択
function selectArtwork(artworkId) {
    const artwork = artworks.find(a => a.id === artworkId);
    if (!artwork) return;
    
    // 現在の作品と同じ場合は何もしない
    if (currentArtworkId === artworkId) return;
    
    currentArtworkId = artworkId;
    
    // メニューのアクティブ状態を更新
    updateMenuActiveState(artworkId);
    
    // 作品情報を更新
    updateArtworkInfo(artwork);
    
    // p5.jsインスタンスを再作成
    recreateP5Instance(artwork);
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
