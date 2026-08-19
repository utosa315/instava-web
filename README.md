# instava-web

Instava のサイト（LP・プライバシーポリシー・利用規約）。

公開 URL: https://instava.tardigrader.com

## 言語別LP

ルートの `index.html` と `landing-locales.js` を編集したら、言語別URLを再生成します。

```sh
node scripts/generate-language-pages.mjs
```

生成先は `/ja/`、`/en/` など、アプリと同じ15言語のサブディレクトリです。
