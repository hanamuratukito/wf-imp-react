# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# ログイン認証実装（devise）
https://qiita.com/shizuma/items/c8c2e71af8c1dcf3d1c2
※インストールコマンドは「rails g devise:install」で実行

restApiとして使う場合以下を参考
https://qiita.com/kazama1209/items/caa387bb857194759dc5#%E3%83%86%E3%82%B9%E3%83%88api%E3%82%92%E4%BD%9C%E6%88%90
※マイグレーションファイルがdeviseとdevise_token_authで両方で作られた場合、devise_token_authを優先する。（deviseのは削除）

エラー対処
１．【Ruby on Rails エラー】uninitialized constant HomeController
https://nabelog.org/636/

# マイグレーション実行

１．docker-compose build
２．docker-compose up
３．docker-compose run backend rake db:migrate