import axios from 'axios'
axios.defaults.baseURL = '/';
axios.defaults.withCredentials = true;

//添加响应拦截器
// axios.interceptors.response.use(function(response){
//     //对响应数据做些事
//     return response
// },util.catchError);

export default axios