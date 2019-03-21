if (process.env.NODE_ENV==='prodution' && 'serviceWorker' in navigator ) {

    let urlB64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    let subscribeUser = (swReg) => {
        let pub='BHX0-kHtRTVaG3MqonGsUDPhZu5oYDuFbxevHwBI4HI9w_nWPe-j1ZtgUp_7Z4e-C31w_limYgWKvhGw28CEKqA'
        const applicationServerKey = urlB64ToUint8Array(pub);
        swReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
            .then(function (subscription) {
                console.log(JSON.stringify(subscription));
            })
            .catch(function (err) {
                console.log('订阅失败: ', err);
            });
    }

    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
            .then(function (registration) {
                // 注册成功
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
                // registration.pushManager.getSubscription()
                //     .then(function (subscription) {
                //         if (subscription) {
                //             console.log(JSON.stringify(subscription));
                //         } else {
                //             console.log('没有订阅');
                //             subscribeUser(registration);
                //         }
                //     });
            })
            .catch(function (err) {
                // 注册失败:(
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
