import { Toast } from 'vant'
let laoddingToast = ''

function showLoadding (msg, timer = 0) {
  laoddingToast = Toast.loading({
    mask: true,
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    content: '<div calss="aa"><div>',
    message: msg || '倒计时' + timer + '秒'
  })
  timer && Mtimer(timer)
}

function Mtimer (sd) {
  let second = sd || 0
  laoddingToast.timer = setInterval(() => {
    if (second) {
      laoddingToast.message = `倒计时 ${second} 秒`
    } else {
      clearInterval(laoddingToast.timer)
      Toast.clear()
    }
    second--
  }, 1000)
}

function hideLoadding () {
  laoddingToast.timer && clearInterval(laoddingToast.timer)
  Toast.clear()
}

export { showLoadding, hideLoadding }
