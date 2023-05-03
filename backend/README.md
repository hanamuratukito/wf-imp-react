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

# マイグレーション実行

１．docker-compose build
２．docker-compose up
３．docker-compose run backend rake db:migrate