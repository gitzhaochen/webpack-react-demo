import config from '@/config';

const common_url = config.server_url;

export default {
    common_url,
    cities: common_url + '/modood/Administrative-divisions-of-China/master/dist/pcas-code.json',//用户登录
}