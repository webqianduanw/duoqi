const Utils = {};
import axios from "axios";
// 各种环境发布配置
let FaBuStatus = "ceshi";
if (FaBuStatus == 'yufabu') {
  window.faBuStatusLink = "http://gpvuv.huashuangtec.com"; //埋点地址
  window.fileLink = 'http://gfile.huashuangtec.cn'  //文件上传
} else if (FaBuStatus == 'ceshi') {
  window.faBuStatusLink = "http://tpvuv.huashuangtec.com"
  window.fileLink = 'http://tfilemq.bjibei.xyz'
  // window.faBuStatusLink = 'https://tpvuv.letto8.cn'
} else if (FaBuStatus == 'xianshang') {
  window.faBuStatusLink = "http://ppvuv.huashuangtec.com";
  window.fileLink = 'http://pfile.letto8.cn'
  // window.faBuStatusLink = 'https://ppvuvmq.bjibei.xyz'
}

//api数据
window.nativeApiData = {};
window.getConfigFromApp = value => {
  // let objs = window.b64DecodeUnicode(value);
  let obgOri;
  if (typeof value == "string") {
    obgOri = JSON.parse(value);
    // alertMsg("1111"+JSON.stringify(obgOri));
  } else {
    obgOri = value;
    // alertMsg("222222"+JSON.stringify(obgOri));
  }
  window.nativeApiData = obgOri;
  //   window.nativeApiData.channel ? window.nativeApiData.channel += '_h5' : "";
  window.configCallBack();
};
/**
   * 时间戳转换
   * @param {Object} time：时间戳串
   * @param {Object} num：需要的时间格式  eg:'x-x-x'、'x/x/x'、'x年x月x日'等
   */
Utils.formatTime = (time, num) => {
  var yy, mm, dd, hh, min, ss, week
  var formatTime = ''
  if (time != '') {
    time = new Date(parseInt(time))
    yy = time.getFullYear()
    mm = (time.getMonth() + 1)
    if (mm < 10) {
      mm = '0' + mm
    }
    dd = time.getDate()
    if (dd < 10) {
      dd = '0' + dd
    }
    hh = time.getHours()
    if (hh < 10) {
      hh = '0' + hh
    }
    min = time.getMinutes()
    if (min < 10) {
      min = '0' + min
    }
    ss = time.getSeconds()
    if (ss < 10) {
      ss = '0' + ss
    }
    if (num == 10) {
      week = Utils.getWeek(time.getDay())
    }
    switch (num) {
      case 0:
        formatTime = yy + mm + dd + hh + min + ss
        break
      case 1:
        formatTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss
        break
      case 2:
        formatTime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + min + ':' + ss
        break
      case 3:
        formatTime = yy + '年' + mm + '月' + dd + '日' + hh + '时' + min + '分' + ss + '秒'
        break
      case 4:
        formatTime = yy + '-' + mm + '-' + dd
        break
      case 5:
        formatTime = yy + '_' + mm + '_' + dd + ' ' + hh + '_' + min + '_' + ss
        break
      case 6:
        formatTime = mm + '/' + dd
        break
      case 7:
        formatTime = hh + ':' + min + ':' + ss
        break
      case 8:
        formatTime = yy + '.' + mm + '.' + dd
        break
      case 9:
        formatTime = yy + '-' + mm + '-' + dd
        break
      case 10:
        formatTime = yy + '年' + mm + '月' + dd + '日 ' + week
        break
    }
  }
  return formatTime
}
// 获取地址信息
Utils.urlAnalytical =() => {
  var search = "?" + window.location.href.split("?")[1]; //获取location的search属性，保存在search中
  var params = {}; //创建空对象params
  if (search != "") {
    //如果search不是空字符串
    search
      .slice(1)
      .split("&")
      .forEach(
        // ?username=zhangdong&pwd=123456;//search去开头?，按&切割为数组，forEach
        function(val) {
          var arr = val.split("="); //将当前元素值按=切割，保存在arr中
          params[arr[0]] = arr[1]; //向params中添加一个元素,属性名为arr[0],值为arr[1]
        }
      );
  }
  return params;
};
// 判断手机系统，1为android，2为ios
Utils.getOsFrom = () =>{
  let u = navigator.userAgent;
  // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf("Linux") > -1; //android终端
  let isiOS =
    !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf("iPhone") > -1; //ios终端
  if (isiOS) {
    // 返回2是ios
    return 2;
  } else {
    // 返回1是android
    return 1;
  }
}
//调用原生的方法
Utils.nativeAppFun = (str ,dataStr, method) =>{
  let osFrom = Utils.getOsFrom();
  // let agent = userAgent();
  let jsonStr = JSON.stringify({
    method: str,
    params: !dataStr ? "" : JSON.stringify(dataStr),
    callbackfunction: method || ""
  });
  if (osFrom === 1) {
    android.invokeNative(jsonStr);
  } else if (osFrom === 2) {
    window.webkit.messageHandlers.invokeNative.postMessage(jsonStr);

  } else if (!!dataStr && dataStr.url) {
    location.href = dataStr.url;
  }
}

//事件埋点的方法
Utils.h5_maidian_fn = (data1, data2, ob) => {
  if (ob && ob.channelId) {
    ob.channelId = ob.channelId.split("_h5")[0] + "_h5";
  }
  // ob.channelId = ob.channelId.split("_h5")[0] + "_h5";
  // alertMsg(JSON.stringify(objApp)
  let postConfig = {
    "pointCode": data1,
    "pointSubCode": data2,
    "pointInfo": encodeURIComponent(JSON.stringify(ob))
  }
  axios({
    url: window.faBuStatusLink + '/point/add',
    method: 'post',
    data: postConfig
  }).then((response) => {
    // console.log(response.data)
    return response.data
  }).then((json) => {
    // alertMsg('测试toast')
    console.log(json)
  })
};
//页面埋点的方法
//pointCode 埋点方法  intoTime 进入时间  outTime离开时间 appInfo 埋点参数
Utils.h5_pvuv_maidian_fn = (pointCode, intoTime, outTime, appInfo) =>{
  if (appInfo&&appInfo.channelId) {
    appInfo.channelId = appInfo.channelId.split("_h5")[0] + "_h5";
  }
  let postConfig2 = {
    "accessCode": '1001',//不变
    "pointCode": pointCode,
    "fromPointCode": '',//不变
    "intoTime": '' + intoTime + '',
    "outTime": '' + outTime + '',
    "appInfo": encodeURIComponent(JSON.stringify(appInfo))

  }
  axios({
    url: window.faBuStatusLink + '/pagePoint/add',
    method: 'post',
    data: postConfig2
  }).then((response) => {
    // console.log(response.data)
    return response.data
  })
}
export default Utils;
