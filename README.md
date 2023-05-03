# wf-imp-reactの環境構築

１．主に以下URLを参考に手順を行う
https://qiita.com/asami___t/items/256f76c3c8a9bd5d0732

https://qiita.com/ren0826jam/items/ddd69ecd59400216a2e6


以下、エラー対処

１．以下の場合、dockerに前ビルドしたnode.jsが残っている。
一度、imageを削除してビルドしなおせば解消する。
参考：https://qiita.com/tifa2chan/items/e9aa408244687a63a0ae

docker-compose run --rm frontend yarn create next-app .
Volume "wf-imp-react_postgres-data"  Creating
Volume "wf-imp-react_postgres-data"  Created
yarn create v1.22.5
[1/4] Resolving packages...
[2/4] Fetching packages...
error create-next-app@13.3.1: The engine "node" is incompatible with this module. Expected version ">=14.18.0". Got "14.15.0"
info Visit https://yarnpkg.com/en/docs/cli/create for documentation about this command.
error Found incompatible module.


２．「failed to solve: rpc error: code = Unknown desc = failed to solve with・・・」の対応
https://qiita.com/Co-0/items/db8d36d31b1480b92d64

３．https://rails-ambassador.herokuapp.com/debugs/NoDatabaseError

４．docker-compose up実行時にfrontend資材で「command-failed-code-127」エラーが発生。npm iをpacage.jsonのある階層で実行すれば解決
https://hatolabo.com/programming/command-failed-code-127


# 導入ライブラリ

１．以下より、redux導入
https://qiita.com/keitakn/items/7433c89ce52073e861a1#%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E6%A7%8B%E6%88%90%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6

# フォルダ構成
https://note.com/ryoppei/n/n2e3e7a66e758

※componentsのファイル名は頭大文字とし、メソッド名も頭大文字とする。

# マテリアルUIの導入

https://qiita.com/tmgauss/items/07d04d78c6df59ba2fb6