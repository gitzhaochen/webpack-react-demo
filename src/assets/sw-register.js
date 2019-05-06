if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        //卸载service worker
        // navigator.serviceWorker.getRegistrations().then(function(swRegs) {
        //     for(let swReg of swRegs) {
        //         swReg.unregister()
        //     } })

        navigator.serviceWorker.register('/sw.js', {scope: '/'})
            .then(function (swReg) {
                // 注册成功
                console.log('ServiceWorker注册成功：', swReg);
            })
            .catch(function (err) {
                // 注册失败:(
                console.log('ServiceWorker注册失败：', err);
            });
    });
}
