# web-program

## プロジェクトの概要
**web-program** は、Dockerの環境構築、ファイルルーティング、およびコンテンツの配信を総合的に学ぶことを目的としたプロジェクトです。スタティックファイルを効率的に配信し、DockerやNginxを利用した、実用性の高いアプリケーションを構築することがコンセプトです。
各種ドキュメントもご確認ください[web-program wiki](https://github.com/AllmayJapan/web-program/wiki)

## 使用技術スタック
- HTML
- CSS
- JavaScript
- PHP
- MySQL
- Docker
- Nginx

## アピールポイント
- Docker と Nginx を使用した効率的なルーティング
- 近代的なツールを駆使した配信システム
- 追加ファイルのサーバー配信の便利性

## 環境構築

### 必要な前提条件
- DockerがローカルPCにインストール済みであること

### セットアップ
次の手順でプロジェクトを起動できます:
1. リポジトリクローンをクローン
   ```bash
   git clone git@github.com:AllmayJapan/web-program.git
   ```
2. プロジェクトディレクトリに移動
   ```bash
   cd web-program
   ```
3. Docker Compose を実行
   ```bash
   docker-compose up -d
   ```

### ローカルサーバのアクセス
- Dockerを起動した後、ローカルの8080番ポートでリッスンします。
- ブラウザのURL栄に、次のアドレスを入力すると、デフォルトのページが表示されます:
  ```plaintext
  http://localhost:8080
  ```

## 使い方
- 起動後は、`html` ディレクトリにファイルを配置するだけで、ブラウザからアクセス可能になります。

## 公開情報
- このプロジェクトはポートフォリオとして公開される予定です。


