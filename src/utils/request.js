import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken, removeToken } from '@/utils/auth'
import qs from "qs"
import router from '../router'
// 创建axios实例
const service = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 150000000 // 请求超时时间
});
let isTip = false;
let cookieInfo = {}
// request拦截器
service.interceptors.request.use(config => {
  config.headers['user-token'] = getToken();
  if ((config.method === "post" || config.method === "put") && config.dataType !== 'json') {
    config.data = qs.stringify(config.data);
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    /*
    * code为非20000是抛错 可结合自己业务进行修改
    */
    const res = response.data;
    if (res.errorCode === '400') {
      if (isTip) return;
      isTip = true;
      MessageBox.confirm('请重新登录', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        removeToken();
        router.replace({
          path: '/login'
        });
        isTip = false;
      }).catch(() => {
        isTip = false;
      });;
      return;
    }

    if (!res.isSuccessed) {
      Message({
        message: res.errorDesc || '系统错误',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
