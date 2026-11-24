# Kei Igarashi Portfolio

五十嵐啓以のポートフォリオサイトです。Webページ・LP、バナー、ポスターの制作物と、プロフィールをまとめています。

[ポートフォリオを見る](https://dorago-kei-ai.github.io/portfolio/)

## サイトの構成

HTML・SCSS・JavaScriptを使い、Viteで開発しています。作品の切り替えにはSwiper、画像の拡大表示にはPhotoSwipe、タブの操作にはjQueryを使用しています。

- `index.html`：ページの内容、作品画像、説明文
- `src/styles/`：メインビジュアル・制作物・Aboutなどのスタイル
- `src/js/`：タブ、スライダー、画像拡大の処理
- `src/main.js`：スタイルとJavaScriptの読み込み
- `public/images/`：作品画像とスキルアイコン

## ローカルで動かす

Node.js 24を使用しています。リポジトリを取得し、フォルダー内で実行します。

```bash
git clone https://github.com/dorago-kei-ai/portfolio.git
cd portfolio
npm ci
npm run dev
```

ターミナルに表示されるURLから確認できます。
WindowsのPowerShellで `npm.ps1` の実行が制限される場合は、`npm` を `npm.cmd` に置き換えてください。

公開用のビルドを確認するときは、以下を実行します。

```bash
npm run build
npm run preview
```

生成されたファイルは `dist/` に出力されます。

## 更新・公開

`main` にpushすると、GitHub Actionsでビルドし、GitHub Pagesに公開します。公開の設定は `.github/workflows/deploy.yml` にまとめています。

GitHub Pagesの公開パスに合わせて、`vite.config.js` の `base` は `/portfolio/` に設定しています。リポジトリ名や公開先を変える場合は、この設定も変更してください。
