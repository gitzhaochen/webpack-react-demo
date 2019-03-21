const BASE_URL = {
    //接口base_url
    dev: process.env.NODE_ENV === 'development' ? '/dev_server_url' : '/server_url',
    prod: '/server_url',
}
export default {
    server_url: BASE_URL.prod,
}