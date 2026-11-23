# Portfolio

UI/UXデザイナーの転職活動用ポートフォリオ。
現在は開発環境のみ構築しています。

## 使用技術

- HTML
- SCSS
- JavaScript
- Vite
- GitHub Pages / GitHub Actions

## 必要な環境

- Node.js 24 LTS
- npm
- Git

## 開発手順

```bash
npm ci
npm run dev
```

ターミナルに表示されたURLをブラウザで開きます。

## 本番ビルドと確認

```bash
npm run build
npm run preview
```

ビルド結果は `dist/` に出力されます。

## 主な編集ファイル

- `index.html`：ページの構造・メタ情報
- `src/styles/main.scss`：スタイル
- `src/main.js`：JavaScriptの処理
- `public/`：加工せず配信する静的ファイル

## 公開方法

`main` にpushすると、GitHub Actionsがビルドし、
GitHub Pagesへ自動公開します。

初回はリポジトリの Settings → Pages で、
Sourceを GitHub Actions に設定してください。

公開URL：
https://dorago-kei-ai.github.io/portfolio/

## パスについて

GitHub Pages用に、Viteのbaseを `/portfolio/` に設定しています。
リポジトリ名や公開先を変更する場合は `vite.config.js` を更新してください。