# wf-imp-reactの環境構築

１．主に以下URLから手順を行う
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


２．https://qiita.com/Co-0/items/db8d36d31b1480b92d64

３．https://rails-ambassador.herokuapp.com/debugs/NoDatabaseError