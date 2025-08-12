/*
 微信触发型防转圈保活脚本
 检测到微信关键请求时，向核心接口发起轻量 GET 请求，保持连接活跃
*/
const urlList = [
  "https://mp.weixin.qq.com/",
  "https://weixin.qq.com/"
];
const LOG = false;

async function ping(u) {
  return new Promise((resolve) => {
    $httpClient.get(u, (err, resp) => {
      if (err) {
        if (LOG) console.log(`❌ ${u} -> ${err}`);
        resolve(false);
      } else {
        if (LOG) console.log(`✅ ${u} -> ${resp.status}`);
        resolve(resp.status >= 200 && resp.status < 400);
      }
    });
  });
}

(async () => {
  let okCount = 0;
  for (let u of urlList) {
    if (await ping(u)) okCount++;
  }
  if (LOG) console.log(`WeChat KeepAlive: ${okCount}/${urlList.length} OK`);
  $done();
})();
