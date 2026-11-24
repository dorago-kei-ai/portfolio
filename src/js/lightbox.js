import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const lightbox = new PhotoSwipeLightbox({
    gallery: '#works-web, .banner-gallery, #works-poster',
    children: 'a[data-pswp-width]',
    
    pswpModule: () => import('photoswipe'),

    // 最初は画像全体が画面に収まるサイズ
    initialZoomLevel: 'fit',

    // ズーム時は基本的に表示領域の横幅に合わせる
    // 小さい画像は元サイズ以上に拡大しない
    secondaryZoomLevel: (zoomLevel) =>
        Math.min(1, zoomLevel.panAreaSize.x / zoomLevel.elementSize.x),

    maxZoomLevel: 2,
    bgOpacity: 0.94,

    // タブ切り替えによる位置変化にも対応
    showHideAnimationType: 'fade',

    closeTitle: '閉じる',
    zoomTitle: '拡大・縮小',
    arrowPrevTitle: '前の作品',
    arrowNextTitle: '次の作品',
    errorMsg: '画像を読み込めませんでした。',
});

lightbox.init();