
// wechat-keepalive.js
// 微信保活脚本，适用于 Loon / Surge / Quantumult X

$httpClient.get({
  url: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU3ODI4NjQ0Nw==&scene=124"
}, function (error, response, data) {
  if (error) {
    console.log("微信保活失败：" + error);
  } else {
    console.log("微信保活成功");
  }
  $done();
});
