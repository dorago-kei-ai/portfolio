import Swiper from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
);

document.querySelectorAll('.works__panel').forEach((panel) => {
    const carousel = panel.querySelector('.works-carousel');
    if (!carousel) return;

    const slider = carousel.querySelector('.works-slider');
    const slides = [...slider.querySelectorAll('.swiper-slide')];
    const single = slides.length <= 1;
    const isPoster = panel.id === 'works-poster';

    carousel.classList.toggle('is-single', single);

    let swiper;

    function syncActiveSlide(instance) {
    const isPosterPanel =
        instance.el.closest('.works__panel')?.id === 'works-poster';

        instance.slides.forEach((slide, index) => {
            const accessible = isPosterPanel
            ? slide.classList.contains('swiper-slide-visible')
            : index === instance.activeIndex;

            slide.inert = !accessible;
            slide.setAttribute('aria-hidden', String(!accessible));
        });
    }

    function updateSlider() {
        if (panel.hidden) return;

        if (swiper) {
            swiper.update();
            swiper.updateAutoHeight(0);
            return;
        }

        swiper = new Swiper(slider, {
            modules: [Navigation, Pagination, A11y],

            // スマートフォン：1作品＋隣を少し表示
            slidesPerView: single ? 1 : 1.1,

            // ポスターは左揃え、Web・バナーは中央揃え
            centeredSlides: !isPoster,

            slidesPerGroup: 1,
            spaceBetween: 24,

            loop: slides.length >= 3,

            breakpoints: {
                768: {
                    // PC：ポスターは2作品、その他は従来どおり
                    slidesPerView: isPoster
                    ? Math.min(2, slides.length)
                    : single ? 1 : 1.2,
                },
            },
            autoHeight: true,
            allowTouchMove: !single,
            watchOverflow: true,
            watchSlidesProgress: true,
            speed: reduceMotion.matches ? 0 : 350,

            // ドラッグ終了時の誤クリックを防止
            preventClicks: true,
            preventClicksPropagation: true,

            navigation: {
                prevEl: carousel.querySelector('.works-carousel__prev'),
                nextEl: carousel.querySelector('.works-carousel__next'),
            },

            pagination: {
                el: carousel.querySelector('.works-carousel__pagination'),
                type: 'fraction',
            },

            a11y: {
                enabled: true,
                prevSlideMessage: '前の作品',
                nextSlideMessage: '次の作品',
                firstSlideMessage: '最初の作品です',
                lastSlideMessage: '最後の作品です',
                slideLabelMessage: '{{index}} / {{slidesLength}}',
            },

            on: {
                init: syncActiveSlide,
                slideChange: syncActiveSlide,
                loopFix: syncActiveSlide,
                slidesUpdated: syncActiveSlide,
                setTranslate: syncActiveSlide,
                transitionEnd: syncActiveSlide,
            },
        });
    }

    // 最初から表示されているタブ
    updateSlider();

    // 既存のタブ処理によるhiddenの変更を検知
    const observer = new MutationObserver(() => {
        requestAnimationFrame(updateSlider);
    });

    observer.observe(panel, {
        attributes: true,
        attributeFilter: ['hidden'],
    });

    // 画像読み込み後に高さを再計算
    slider.querySelectorAll('img').forEach((img) => {
        img.addEventListener('load', () => {
            if (swiper && !panel.hidden) {
                swiper.updateAutoHeight(0);
            }
        });
    });

    reduceMotion.addEventListener('change', () => {
        if (swiper) {
            swiper.params.speed = reduceMotion.matches ? 0 : 350;
        }
    });
});