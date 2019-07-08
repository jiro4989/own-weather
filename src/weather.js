// weatherUserName はTwitterのユーザー名に指定の天気と時刻を付与します。
function weatherUserName() {
  var weather = fetchWeather();
  var weatherIcon = toWeatherIcon(weather);
  
  // DB用途のスプレッドシートからセットするユーザ名に使用するテキストを取得
  var dbSheetId = PropertiesService.getScriptProperties().getProperty("DB_SHEET_ID");
  var dbSheet = SpreadsheetApp.openById(dbSheetId);
  var userName = dbSheet.getRange('B1').getValue();
  postUpdateUserName(userName + weatherIcon + "[" + formatTime(new Date()) + "]");
  
  // 名前が変化しているときだけつぶやきで通知する
  var befName = dbSheet.getRange('B2').getValue();
  if (befName !== userName) {
    var userId = PropertiesService.getScriptProperties().getProperty("TWITTER_USER_ID");
    postTweet('@' + userId + '\n# usermod -l ' + userName + ' ' + befName + '\n# usermod -m -d /home/' + userName + ' ' + userName);
    dbSheet.getRange('B2').setValue(userName);
  }
}

function fetchWeather() {
  var city = PropertiesService.getScriptProperties().getProperty("CITY");
  var country = PropertiesService.getScriptProperties().getProperty("COUNTRY");
  var apiKey = PropertiesService.getScriptProperties().getProperty("OPEN_WEATHER_MAP_API_KEY");
  var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=" + apiKey;
  return UrlFetchApp.fetch(url).getContentText();
}

// 天気データを天気アイコンにする
function toWeatherIcon(json) {
  var jsonData = JSON.parse(json);
  var weatherCode = jsonData.weather[0].id;
  var weatherIcon = getWeatherIcon(weatherCode);
  Logger.log(weatherIcon);
  return weatherIcon;
}

// 都市の天気データを取得する
function getWeatherIcon(weatherCode) {
  var weather = Math.floor(weatherCode / 100);
  switch (weather) {
    case 2:
    case 3:
    case 5:
      return "☔️";
    case 6:
      return "☃️";
    case 7:
      return "🌫️";
    case 8:
      if (weatherCode == 800) return "🌞";
      else return "☁️";
    default:
      return "❓";
  }
}

// formatTime はDate変数から時刻文字列を生成します。
function formatTime(date) {
  var pad = function (n) {
    return ('0' + n).slice(-2);
  };
  var hours    = date.getHours();
  var minutes  = date.getMinutes();
  var seconds  = date.getSeconds();
  var timeText = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  return timeText;
}
