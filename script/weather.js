// weatherUserName はTwitterのユーザー名に指定の天気と時刻を付与します。
function weatherUserName() {
  var city = PropertiesService.getScriptProperties().getProperty("CITY");
  var country = PropertiesService.getScriptProperties().getProperty("COUNTRY");
  var apiKey = PropertiesService.getScriptProperties().getProperty("OPEN_WEATHER_MAP_API_KEY");
  var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=" + apiKey;
  var json = UrlFetchApp.fetch(url).getContentText();
  var jsonData = JSON.parse(json);
  var weatherCode = jsonData.weather[0].id;
  var weather = Math.floor(weatherCode / 100);
  
  var weatherIconString = "";
  switch (weather) {
    case 2:
    case 3:
    case 5:
      weatherIconString = "☔️";
      break;
    case 6:
      weatherIconString = "☃️";
      break;
    case 7:
      weatherIconString = "🌫️";
      break;
    case 8:
      if (weatherCode == 800) weatherIconString = "🌞";
      else weatherIconString = "☁️";
      break;
    default:
      weatherIconString = "❓";
      break;
  }
  Logger.log(weatherIconString);
  
  var userName = PropertiesService.getScriptProperties().getProperty("TWITTER_USER_NAME");
  userName = userName + weatherIconString + "[" + formatTime(new Date()) + "]";
  postUpdateUserName(userName);
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
