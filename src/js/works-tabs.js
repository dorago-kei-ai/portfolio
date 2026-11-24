import $ from 'jquery';

const $works = $('.works');
const $tabs = $works.find('[role="tab"]');
const $panels = $works.find('[role="tabpanel"]');

function activateTab($target, focus = false) {
    if (!$target.length) return;

    $tabs
        .attr('aria-selected', 'false')
        .attr('tabindex', '-1');

    $target
        .attr('aria-selected', 'true')
        .attr('tabindex', '0');

    $panels.prop('hidden', true);

    const panelId = $target.attr('aria-controls');

    $panels
        .filter((_, panel) => panel.id === panelId)
        .prop('hidden', false);

    if (focus) {
        $target[0].focus({ preventScroll: true });
    }
}

function findTab(hash) {
    return $tabs.filter(
        (_, tab) => `#${tab.getAttribute('aria-controls')}` === hash,
    );
}

function scrollToWorks(smooth = false) {
    if (!$works.length) return;

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
    ).matches;

    $works[0].scrollIntoView({
        behavior: smooth && !reduceMotion ? 'smooth' : 'instant',
        block: 'start',
    });
}

// タブをクリック
$tabs.on('click', function () {
    activateTab($(this));
});

// キーボード操作：左右キー・Home・End
$tabs.on('keydown', function (event) {
    const index = $tabs.index(this);
    const last = $tabs.length - 1;

    const destinations = {
        ArrowRight: index === last ? 0 : index + 1,
        ArrowLeft: index === 0 ? last : index - 1,
        Home: 0,
        End: last,
    };

    const next = destinations[event.key];
    if (next === undefined) return;

    event.preventDefault();
    activateTab($tabs.eq(next), true);
});

// MVのカード → 対応するタブを開いて移動
$('a[href^="#works-"]').on('click', function (event) {
    // 別タブで開く操作などはブラウザに任せる
    if (
        event.isDefaultPrevented() ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        (event.button !== undefined && event.button !== 0)
    ) {
        return;
    }

    const $target = findTab($(this).attr('href'));
    if (!$target.length) return;

    event.preventDefault();
    activateTab($target, true);
    scrollToWorks(true);
});

// カテゴリー付きURLを直接開いた場合
function syncHash() {
    const $target = findTab(window.location.hash);
    if (!$target.length) return;

    activateTab($target);
    scrollToWorks();
}

$(window).on('hashchange', syncHash);
syncHash();