own-weather
================================================================================

定期的に自分のTwitterアカウント名に任意の都市の天気アイコンを付与します。

目的
--------------------------------------------------------------------------------

ツイッターを見てるときに一緒に天気も見たい。

システム構成
--------------------------------------------------------------------------------

下記のサービスを利用してBotを作成します。

- Twitter API (変更対象)
- OpenWeatherMap API (気象情報の取得)
- GoogleAppScript (Twitterアカウントのユーザ名の定期的更新トリガー。cronの代用)

Bot起動手順
--------------------------------------------------------------------------------

**※OpenWeatherMapでAPI取得、Twitterでアプリ登録等は完了しているものとする**

1. `script`配下のスクリプトを全部GoogleAppScriptプロジェクトにコピペする。
1. スクリプトエディタで、プロジェクトのプロパティをセットする。  
   プロジェクトのプロパティについては[プロジェクトのプロパティ](#プロジェクトのプロパティ)を参照
1. twitter.gsの「関数の実行」で`authorize`関数を実行する。
1. Ctrl + Enterを押してログに出力されるURLをブラウザで開く。
1. Twitterの認証にOKする。
1. weather.gsの「関数の実行」で`weatherUserName`を実行する。
1. 自分のTwitterのユーザ名の変化を確認する。
1. プロジェクトのトリガーに任意の実行間隔をセットする。
1. 指定の時間おきにTwitterのユーザ名が更新されることを確認する。

プロジェクトのプロパティ
--------------------------------------------------------------------------------

| プロパティ名             | 説明                                       |
|--------------------------|--------------------------------------------|
| OPEN_WEATHER_MAP_API_KEY | OpenWeatherMapで取得したAPIキー            |
| CITY                     | 天気の取得したい都市                       |
| COUNTRY                  | 取得したい国コード(ex: jp)                 |
| TWITTER_API_KEY          | Twitterアプリ登録で取得したAPIキー         |
| TWITTER_API_SECRET       | Twitterアプリ登録で取得したAPIシークレット |
| TWITTER_USER_NAME        | 自身のもともとのTwitterユーザ名            |

