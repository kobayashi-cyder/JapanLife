# JapanLife 🇯🇵

日本で生活する外国人向けの **日本語 × 生活理解 × 不安解消** アプリ。

**目的**: 旅行ガイドではなく、在留・通学・通勤・住居・買物など実生活に必要な言葉と判断力を育てる。FUD（fear, uncertainty and doubt）は「体験を観察 → 使う言葉を練習 → 公的資料で検証 → 次の行動を決める」の4段階で軽減する。

## 今すぐ使う

このリポジトリの `index.html` をブラウザーで開く。モバイル対応のシングルページアプリ（オフライン動作、進捗は端末内に保存）。Web版は `python3 -m http.server 8000` などでも配信できる。

GitHub Pages に公開するとオンライン配布できる（公開設定はリポジトリ管理者が有効化する必要がある）。

## 実装

- 日本語の学習カードと四択練習、音声再生、学習済み記録。
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

GitHub Actions の **Build debug APK** ワークフローが実行されれば、Java 17・Android SDK 35・Gradleの環境でデバッグ署名APKを生成し、Artifactとして保存する。Android Studioで `android/` を開いても開発できる。**現時点では実機検証済み・ストア公開可とは主張しない。**

## 注意と品質基準

- 法務・医療・出入国管理などの個別アドバイスではない。緊急情報や法律変更の自動取得もしない。
- UIの多言語化と専門家による翻訳チェックは継続課題。現行の表示言語は英語・日本語を中心に構成。
- YouTubeリンク先の視聴時にはYouTube側の通信とプライバシーポリシーが適用される。
- プロジェクトは政府・動画制作者による監修や認定を受けていない。

MIT License（コード）。第三者サイトや動画の権利は各権利者に帰属。