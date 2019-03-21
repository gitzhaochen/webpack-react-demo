workbox.core.setCacheNameDetails({prefix: "allen-caches"});//设置cache名称

workbox.skipWaiting();//跳过等待
workbox.clientsClaim();//清除旧的workers
//self.__precacheManifest 需要缓存的静态文件列表
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// 添加notificationclick事件监听器，在点击notification时触发
// self.addEventListener('notificationclick', function(event) {
//     // 关闭当前的弹窗
//     event.notification.close();
//     // 在新窗口打开页面
//     event.waitUntil(
//        // clients.openWindow('https://diandao.pro')
//     );
// });
//
//
// self.addEventListener('push', function(event) {
//     const title = event.data.text();
//     const options = {
//         body: event.data.text(),
//         icon: '/assets/images/logo-192.png',
//     };
//
//     event.waitUntil(self.registration.showNotification(title, options));
// });
