// Soul 保活脚本
$httpClient.get({
  url: "https://api.soulapp.cn/account/info/v4?userId=1"
}, function (error, response, data) {
  console.log(error ? "Soul 保活失败：" + error : "Soul 保活成功");
  $done();
});
