# MakeIT_HP

MakeIT_HPは新入生を囲い込むためのホームページです。
キラキラしたものをたくさん載せよう！

# Getting Standard
次のコマンドを実行しdocker composeを起動させます。

## Run the MakeIT_HP app on docker-compose
`docker compose`上に `Apache` `Postgres` `Laravel` `PHP8` `React18` `Node18` がセットアップされます。
```bash
$ docker compose up -d 
```
HTTPサーバー起動後に次のURLにアクセスします。
```bash
# ユーザー側URL
http://localhost:3000

# アドミン側URL
http://localhost:3000/admin
```

## Run the Format
```bash
$ chmod 777 format.sh # このコマンドは初回のみ実行
$ ./format.sh
```

## Run the Unit testing
```bash
$ chmod 777 test.sh # このコマンドは初回のみ実行
$ ./test.sh
```