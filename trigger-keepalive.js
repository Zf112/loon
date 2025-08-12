
#!name=wechat_keepalive.js
const KEEPALIVE_URLS = [
  "https://mp.weixin.qq.com/",
  "https://weixin.qq.com/",
  "https://res.wx.qq.com/zh_CN/htmledition/js/wxLogin.js"
];
const TIMEOUT = 6000;
const LOG = false;

function httpGet(url) {
  return new Promise(resolve => {
    if (typeof $task !== "undefined" && $task.fetch) {
      $task.fetch({ url, method: "GET", timeout: TIMEOUT }).then(resp => {
        resolve({ status: resp.statusCode || resp.status, ok: resp.statusCode >= 200 && resp.statusCode < 400 });
      }).catch(e => resolve({ error: e.toString() }));
    } else if (typeof $httpClient !== "undefined") {
      $httpClient.get({ url, timeout: TIMEOUT }, (err, resp) => {
        if (err) resolve({ error: err.toString() });
        else resolve({ status: resp.status, ok: resp.status >= 200 && resp.status < 400 });
      });
    } else {
      fetch(url, { method: "GET", cache: "no-store", mode: "cors" })
        .then(resp => resolve({ status: resp.status, ok: resp.status >= 200 && resp.status < 400 }))
        .catch(e => resolve({ error: e.toString() }));
    }
  });
}

async function keepAlive() {
  let successCount = 0;
  for (const url of KEEPALIVE_URLS) {
    const res = await httpGet(url);
    if (res.ok) successCount++;
    if (LOG) {
      if (res.ok) console.log(`[微信保活] ${url} 返回状态: ${res.status}`);
      else console.log(`[微信保活] ${url} 请求失败: ${res.error || res.status}`);
    }
  }
  if (LOG) console.log(`[微信保活] 成功请求 ${successCount}/${KEEPALIVE_URLS.length} 个`);
}

(async () => {
  await keepAlive();
  if (typeof $done === "function") $done({});
})();
