// OAuth1認証用インスタンス
var twitter = TwitterWebService.getInstance(
  PropertiesService.getScriptProperties().getProperty("TWITTER_API_KEY"),
  PropertiesService.getScriptProperties().getProperty("TWITTER_API_SECRET")
);

// 認証を行う（必須）
function authorize() {
  twitter.authorize();
}

// 認証をリセット
function reset() {
  twitter.reset();
}

// 認証後のコールバック（必須）
function authCallback(request) {
  return twitter.authCallback(request);
}

// タイムラインを取得
function getUserTimeline() {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/user_timeline.json');
  Logger.log(JSON.parse(response));
}

// ツイートを投稿
function postUpdateStatus(msg) {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/statuses/update.json', {
    method: 'post',
    payload: { status: msg }
  });
  Logger.log(JSON.parse(response));
}

function getAccountSettings() {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/account/settings.json');
  Logger.log(JSON.parse(response));
}

function getAccountVerifyCredentials() {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/account/verify_credentials.json');
  Logger.log(JSON.parse(response));
}

// プロフィールの更新
function postUpdateUserName(userName) {
  var service  = twitter.getService();
  var response = service.fetch('https://api.twitter.com/1.1/account/update_profile.json', {
    method: 'post',
    payload: { name: userName }
  });
  Logger.log(JSON.parse(response));
}

