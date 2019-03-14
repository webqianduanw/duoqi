import axios from 'axios'
import { Toast } from 'vant'
import { showLoadding, hideLoadding } from "./loading"
const base = ''   // 更改的base
axios.defaults.loaddingNumber = 0
// http request 拦截器
axios.interceptors.request.use(
  config => {
    let time = new Date().getTime();
    config.headers = {
      id: "a_860797030576003_1551347320501_duobei",
      platform: "duobei",
      appName: "duobei",
      appVersion: "100",
      channel: "duobei",
      deviceId: "860797030576003",
      netType: "WIFI",
      deviceType: "HUAWEI#HUAWEI NXT-AL10",
      time: time,
      userName: "7472a42ff9239acf8be0f5b93be2a638",
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBWZXJzaW9uIjoiMTAwIiwidXNlck5hbWUiOiI3NDcyYTQyZmY5MjM5YWNmOGJlMGY1YjkzYmUyYTYzOCIsImRldmljZUlkIjoiODYwNzk3MDMwNTc2MDAzIiwidXNlcklkIjoxMDAyMCwiaXNzIjoi6JKy5YWs6IuxIiwiYXVkIjoi55So5oi3MSIsImV4cCI6MTU1MzkzODYyOSwibmJmIjoxNTUxMzQ2NjI5fQ.ZpfiW1NY2sUjf4t1E9AWxRhxuSKHurB2ClkA7DMEe0U",
      sign:
        "9ffe5e90b83072ad16e5534a525d299bb376b6754af295d27b8cb7499fa5c3bf"
    };
    return config;
  },
  err => {
    hideLoadding()
    return Promise.reject(err);
  });
// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(
  response => {
    //判断此刻的请求状态
    axios.defaults.loaddingNumber--;
    if (axios.defaults.loaddingNumber == 0) {
      hideLoadding();
    }
    let codeState = response && response.data && response.data.result && response.data.result.code;
    if (response && response.status === 200) {
      if (codeState === 4001 || codeState === 4003) {
        return Promise.reject(response);
      } else {
        return Promise.resolve(response);
      }
    } else {
      return Promise.reject(response);
    }
    // return response
  },
  error => {
    //网络异常
    hideLoadding()
    Toast.fail("网络已断开");
    return Promise.reject(error)
  }
)
class API {
  constructor() {
    this.msg = "业务处理成功!";
    //当前接口错误提示
    // this.code = '000000' || '999999';
    // this.loading = '1';
  }
  post(params, callback, isloadding = false, errcallback) {
    // var dailog = dailog;
    if (isloadding && axios.defaults.loaddingNumber == 0) {
      showLoadding('正在加载...')
    }
    axios.defaults.loaddingNumber++
    return axios
      .post(params.url, params.data, params)
      .then(res => {
        let rst = res.data;
        if (rst && rst.result && rst.result.code === 1000) {
          callback && callback(rst.result.data || {});
        } else {
          // Toast.fail(rst.msg);
          // console.log(rst.msg);
          errcallback && errcallback(rst.msg || {});
        }
      })
      .catch(e => {
        //调取原生的方法对于异常进行处理
        console.log(e);
        // Toast.fail(e && e.data && e.data.result&&e.data.result.msg)
      });
  }
  get(params, callback, errcallback) {
    // config.data = params.data||{}
    return axios
      .get(`${base}${params.url}`, { params: params.data }, params)
      .then(res => {
        let rst = res.data;
        if (rst && rst.result && rst.result.code === 1000) {
          callback && callback(rst.result.data || {});
        } else {
          console.log(rst.msg);
          errcallback && errcallback(rst.msg || {});
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
}
const api = new API()

export default api
