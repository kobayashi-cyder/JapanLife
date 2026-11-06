# JapanLife 🇯🇵

日本で生活する外国人向けの **日本語 × 生活理解 × 不安解消** アプリ。

**目的**: 旅行ガイドではなく、在留・通学・通勤・住居・買物など実生活に必要な言葉と判断力を育てる。FUD（fear, uncertainty and doubt）は「体験を観察 → 使う言葉を練習 → 公的資料で検証 → 次の行動を決める」の4段階で軽減する。

## 今すぐ使う

このリポジトリの `index.html` をブラウザーで開く。各科目は `subjects/<科目名>/index.html` から単独起動も可能。モバイル対応のシングルページアプリ（オフライン動作、進捗は端末内に保存）。Web版は `python3 -m http.server 8000` などでも配信できる。

GitHub Pages に公開するとオンライン配布できる（公開設定はリポジトリ管理者が有効化する必要がある）。

## v0.3.0 独立した文字学習3科目

JapanLife本体の「文字の科目」から、それぞれ独立した教材を起動できます。Androidでは**総合アプリを含む4種類のデバッグAPK**を同時ビルドします。インストール用パッケージ名と学習進捗は科目別に独立しています。

| 科目 | アプリの入り口 | 初期教材 |
|---|---|---|
| ひらがな | [Hiragana](subjects/hiragana/index.html) | 基本46 + 濁音・半濁音25 + 拗音33 + 小さい「っ」 |
| カタカナ | [Katakana](subjects/katakana/index.html) | 基本46 + 濁音・半濁音25 + 拗音33 + 長音記号「ー」 |
| 漢字 | [Kanji](subjects/kanji/index.html) | 50字を単語・実際の読み・意味の組で学ぶ |

各科目は、ローマ字を先に表示するフラッシュカード、日本語音声再生、四択読み取りクイズ、進捗記録、指・ペン・マウスでのなぞり書きに対応。5言語（日本語・英語・簡体字中国語・ベトナム語・ネパール語）のUIを収録。科目別の独立PWAとしてもインストール可能（HTTPS配信時、ブラウザーの対応に依存）。

漢字の読みは単語ごとに変わるため、表示する読みは**例示語についての読み**であり、文字に一つの音を固定したものではありません。なぞり書きは**手書き自動認識や筆順採点ではありません**。

Androidのソースは `android/app/build.gradle` の productFlavors で4つのapplicationIdを分けています。GitHub Actions の実行結果にある `JapanLife-v0.3.0-four-debug-APKs` に4 APKがまとまります。実機での動作検証・公開用署名・Playストア審査は別途必要です。

## v0.2.1 ローマ字先行表示

学習カードと日常動画の会話練習を **ローマ字 → 日本語（必要に応じてふりがな） → 選択言語の意味** の順に統一。最初に発音の手掛かりがあり、漢字が読めなくても練習を始められます。ふりがなON/OFF、音声読み上げ、5言語対応は維持。更新時はService Workerのキャッシュも切替。

## v0.2.0 多言語化・ふりがな

- **5言語対応**：日本語、英語、簡体字中国語、ベトナム語、ネパール語。画面、学習見出し、12の例文の意味、クイズ選択肢、動画の補足、10の生活ガイド、4つの事実確認、8つの生活タスクを切替可能。
- **ふりがな**：日本語の学習例文と該当する日本語の説明文に HTML `<ruby>` / `<rt>` を利用して読みを表示。ヘッダーの「ふりがなを表示」で ON / OFF 切替、設定は端末に保存。
- **読みを安全に記述**：教材の語句に対して人手で確定した読みを定義。すべての漢字を自動解析する仕組みではないため、未登録語にはふりがなが出ない場合がある。
- **翻訳の位置付け**：中国語・ベトナム語・ネパール語の訳文は初期翻訳の試験版。ネイティブチェック前。法令・医療など重要事項は必ず公式資料で確認。
- **オフライン対応**：UI言語・ふりがな・学習履歴を端末内で管理。外部動画はYouTubeを選択時に開く。
- **自動テスト**：表示言語・訳文項目数・ルビの読み・HTMLのエスケープ・言語設定切替を Node テストで検査。

## 実装

- 日本語の学習カードと三択練習、音声再生、学習済み記録。
- 生活カテゴリ（住宅、買い物、行政、交通、仕事、医療、防災、ごみ、学校など）の実行可能な確認リスト。
- **在日外国人のYouTube日常動画**から住宅・買物・日常文化を学ぶ「見る→話す→確かめる」。動画は外部YouTubeへのリンクのみ。再配信、動画のダウンロード、無断転載はしない。
- 公式資料への参照リンクを生活ガイドに付記。実体験と普遍的な法令・行政手続きは混ぜない。
- ブラウザーのlocalStorageで学習進捗保存。アカウント・追跡・広告なし。
- `android/` はオフラインHTMLを表示するAndroid WebViewの簡易ラッパー（デバッグAPKビルド用）。Play公開用署名・配信は未対応。

## 動画の位置付け

体験動画はあくまで本人・時点・地域の具体例。「東京の家賃」「日本のごみの日」「学校の規則」を全国一律の事実としては扱わない。費用・契約・期限は、居住自治体や関係する公式窓口で最新情報を確認する。

- [Tokidoki Traveller: Moving Apartments in Tokyo is Hard and Expensive](https://www.youtube.com/watch?v=RJOkmOECDFA)（2024年）
- [Sharmeleon: Daily LIFE in JAPAN: Inside a Japanese Home Store!](https://www.youtube.com/watch?v=SShT5HmtV1Q)（2021年）
- [Lou C.: Daily Life in Japan – Grocery Shopping & Apartment Search](https://www.youtube.com/watch?v=C29Xd09eLI8)（2025年）
- [Sharmeleon: daily life in japan – house tour, road trip, home cooking](https://www.youtube.com/watch?v=0pccQjv5RbU)（2024年）

公式情報：
- [出入国在留管理庁 外国人生活支援ポータル](https://www.moj.go.jp/isa/support/portal/)
- [生活・就労ガイドブック](https://www.moj.go.jp/isa/guidebook_all.html)
- [文部科学省 日本語教育の参照枠](https://www.nihongo-ews.mext.go.jp/information/framework_of_reference)
- [気象庁](https://www.jma.go.jp/jma/en/menu.html)

## Androidビルド（開発者向け）

GitHub Actions の **Build debug APK** ワークフローが実行されれば、Java 17・Android SDK 35・Gradleの環境でデバッグ署名APKを生成し、Artifactとして保存する。Android Studioで `android/` を開いても開発できる。**GitHub Actions の初回Androidビルドは成功しましたが、実機検証済み・ストア公開可とは主張しません。**

## 注意と品質基準

- 法務・医療・出入国管理などの個別アドバイスではない。緊急情報や法律変更の自動取得もしない。
- 5言語切替を実装。多言語のネイティブ校閲、制度ごとの正式監修、自治体別の地域対応は未完了。
- YouTubeリンク先の視聴時にはYouTube側の通信とプライバシーポリシーが適用される。
- プロジェクトは政府・動画制作者による監修や認定を受けていない。

ライセンスは公開前に決定します（現時点で未設定）。第三者サイトや動画の権利は各権利者に帰属。