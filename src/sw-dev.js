workbox.core.skipWaiting();//跳过等待
workbox.core.clientsClaim();//清除旧的workers

workbox.core.setCacheNameDetails({prefix: "my-caches"});//设置cache名称
//self.__precacheManifest 需要缓存的静态文件列表
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
